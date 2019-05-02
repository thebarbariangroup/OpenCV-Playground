export default class CanvasOut {
  constructor (opts) {
    this.input = opts.input;
    this.output = opts.output;
    this.data = opts.data || this._getData();
    this.transform = opts.transform || this._transformInput; // Pass in a transform, or use the method below for testing
    this.transform = this.transform.bind(this);

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
    
    this.transform(this.src, this.dst, time) || this.src;

    cv.imshow(this.output, this.dst)

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

    this.src = new cv.Mat(this.state.height, this.state.width, cv.CV_8UC4);
    this.dst = new cv.Mat(this.state.height, this.state.width, cv.CV_8UC1);

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
    
    cv.cvtColor(this.src, this.dst, cv.COLOR_RGBA2GRAY)
    cv.threshold(this.dst, this.dst, 0, 250, cv.THRESH_OTSU);

  }
}