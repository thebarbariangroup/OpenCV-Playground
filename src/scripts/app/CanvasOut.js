export default class CanvasOut {
  constructor (opts) {
    this.input = opts.input;
    this.output = opts.output;
    this.data = opts.data || this._getData();
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
    this.srcMat.data.set(this.context.getImageData(0, 0, this.state.width, this.state.height).data);
    this._transformInput(time);
    cv.imshow(this.output, this.dstMat)

    requestAnimationFrame((time) => {
      this.streamInputToOutput(time);
    });
  }

  _setup () {
    this.state.width = this.input.getWidth();
    this.state.height = this.input.getHeight();

    this.output.width = this.state.width;
    this.output.height = this.state.height;

    this.data.width = this.state.width;
    this.data.height = this.state.height;

    this.srcMat = new cv.Mat(this.state.height, this.state.width, cv.CV_8UC4);
    this.dstMat = new cv.Mat(this.state.height, this.state.width, cv.CV_8UC4);

    this.context = this.data.getContext('2d');
  }

  _getData () {
    if (!this.data) {
      const canvas = document.createElement('canvas');
      this.data = canvas;
    }

    return this.data;
  }

  _transformInput (time) {
    // cv.cvtColor(this.srcMat, this.dstMat, cv.COLOR_RGBA2GRAY);

    this.prevTime = this.prevTime || 0;
    this.mask = this.mask || new cv.Mat();

    const currentTime = time - this.prevTime;
    // this.prevSrcMat = this.prevSrcMat || new cv.Mat();
    if (this.prevSrcMat) {
      cv.subtract(this.srcMat, this.prevSrcMat, this.dstMat, this.mask, -1);
    }

    if (currentTime > 16) {
      this.prevSrcMat = this.srcMat;
      this.prevTime = time;
    }

  }
}