export default class CanvasOut {
  constructor (opts) {
    this.input  = opts.input;
    this.output = opts.output;
    this.data   = opts.data || this._getData();
    this.transforms = this._getTransforms(opts.transforms);

    this.context = null;

    this.state = {
      width: 0,
      height: 0
    };
  }

  play () {
    this._setup();
    this.streamInputToOutput(0);
  }

  streamInputToOutput (time) {
    this.context.drawImage(this.input.getOutput(), 0, 0, this.state.width, this.state.height);
    this.src.data.set(this.context.getImageData(0, 0, this.state.width, this.state.height).data);
    
    this._applyTransforms(time);

    cv.imshow(this.output, this.dst);

    requestAnimationFrame((time) => {
      this.streamInputToOutput(time);
    });
  }

  _setup () {
    this.state.width  = this.input.getWidth();
    this.state.height = this.input.getHeight();

    this.output.width  = this.state.width;
    this.output.height = this.state.height;

    this.data.width  = this.state.width;
    this.data.height = this.state.height;

    this.src      = new cv.Mat(this.state.height, this.state.width, cv.CV_8UC4);
    this.srcProxy = new cv.Mat(this.state.height, this.state.width, cv.CV_8UC4);
    this.dst      = new cv.Mat(this.state.height, this.state.width, cv.CV_8UC4);

    this.context = this.data.getContext('2d');
  }

  _getData () {
    if (!this.data) {
      const canvas = document.createElement('canvas');
      this.data = canvas;
    }

    return this.data;
  }

  _getTransforms (transforms = []) {
    transforms = transforms.map((transform) => {
      return transform.bind(this);
    });
    transforms.unshift(this._transformInput); // perpend the testing transform to the queue

    return transforms;
  }

  _applyTransforms (time) {
    this.srcProxy.data.set(this.src.data); // set initial value for srcProxy.

    this.transforms.forEach((transform) => {
      transform(this.srcProxy, this.dst, time); // apply transform
      this._matchMatType(this.src, this.dst); // convert dst type to match src
      this.srcProxy.data.set(this.dst.data); // srcProxy is set to dist from each transform, so they can chain their outputs together
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

  _transformInput (src, dst, time) {
    dst.data.set(src.data);
    
    // cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY)
    // cv.threshold(dst, dst, 0, 250, cv.THRESH_OTSU);

  }
}