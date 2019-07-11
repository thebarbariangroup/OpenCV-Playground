import cacheController from './CacheController';

export default class CanvasOut {
  constructor (conf) {
    this.input  = conf.input;
    this.output = conf.output;
    this.data   = conf.data || this._getData();
    this.transforms = null; // transforms are set through setTransforms()
    this.ticking = false;
    
    this.context = null;

    this.state = {
      streaming: false,
      width: 0,
      height: 0
    };
  }

  play () {
    this._setup();
    this.state.streaming = true;
    this.streamInputToOutput();
  }

  pause () {
    if (!this.state.streaming) { return };
    this.state.streaming = false;
    this._cleanupCv();
    cacheController.clear();
  }

  streamInputToOutput () {
    if (this.ticking || !this.state.streaming) {
      return;
    }
    this.ticking = true;

    this.context.drawImage(this.input.getOutput(), 0, 0, this.state.width, this.state.height);
    this.src.data.set(this.context.getImageData(0, 0, this.state.width, this.state.height).data);
    
    this._applyTransforms();

    cv.imshow(this.output, this.dst);

    requestAnimationFrame(() => {
      this.ticking = false;
      this.streamInputToOutput();
    });
  }

  setTransforms (transforms) {
    this.transforms = this._getTransforms(transforms)
  }

  _setup () {
    this.state.width  = this.input.getWidth();
    this.state.height = this.input.getHeight();

    this.output.width  = this.state.width;
    this.output.height = this.state.height;

    this.data.width  = this.state.width;
    this.data.height = this.state.height;

    this.src      = this._getBaseMat();
    this.srcProxy = this._getBaseMat();
    this.dst      = this._getBaseMat();

    this.context = this.data.getContext('2d');
  }

  _cleanupCv () {
    this.src.delete();
    this.srcProxy.delete();
    this.dst.delete();
  }

  _getData () {
    if (!this.data) {
      const canvas = document.createElement('canvas');
      this.data = canvas;
    }

    return this.data;
  }

  _getBaseMat () {
    return new cv.Mat(this.state.height, this.state.width, cv.CV_8UC4);
  }

  _getTransforms (factoryTransforms = () => []) {
    let transforms = factoryTransforms().map((transform) => {
      return transform.bind(this);
    });
    transforms.unshift(this._copySrcToDst); // perpend a setup transform to the queue

    return transforms;
  }

  _applyTransforms () {
    this.srcProxy.data.set(this.src.data); // set initial value for srcProxy.

    this.transforms.forEach((transform) => {
      transform(this.srcProxy, this.dst); // apply transform
      this._matchMatType(this.srcProxy, this.dst); // convert dst type to match src
      this.srcProxy.data.set(this.dst.data); // set srcProxy to dst, so tranforms can chain their outputs together
    });
  }

  _matchMatType (src, dst) {
    const colorTypes = {
      1: 'GRAY',
      3: 'RGB',
      4: 'RGBA'
    };

    const srcType = colorTypes[src.channels()];
    const dstType = colorTypes[dst.channels()];

    if (srcType !== dstType) {
      const conversion = cv[`COLOR_${dstType}2${srcType}`];
      cv.cvtColor(dst, dst, conversion);
    }
  }

  _copySrcToDst (src, dst) {
    dst.data.set(src.data);
  }
}