export default class Webcam {
  constructor (opts) {
    this.output = opts.output;
    this.input = this.getInput();
    this.stream = null;

    this.state = {
      readyToStream: false
    };
  }

  getInput () {
    return this.input;
  }

  getOutput () {
      return this.output;
  }

  getWidth () {
    const dim = this._getDimensions();
    return dim.width;
  }

  getHeight () {
    const dim = this._getDimensions();
    return dim.height;
  }

  initializeCamera () {
    return new Promise((resolve, reject) => {
      return navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.stream = stream;
        resolve();
      })    
      .catch((err) => {
        console.log("An error occurred! " + err);
        reject();
      });
    });
  }

  beginStream () {
    this.output.srcObject = this.stream;
    this.output.play();
    return new Promise((resolve, reject) => {
      this.output.onloadedmetadata = () => {
        this._getDimensions(true);
        resolve();
      }
    });
  }

  _getDimensions (force) {
    if (this.dimensions && !force) { return this.dimensions; } 
      
    this.dimensions = {
      width: this.output.videoWidth, 
      height: this.output.videoHeight
    };

    return this.dimensions;
  }
}