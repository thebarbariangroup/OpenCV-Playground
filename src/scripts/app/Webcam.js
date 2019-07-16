export default class Webcam {
  constructor (opts) {
    this.output = opts.output || this.getOutput();
    this.stream = null;

    this.state = {
      readyToStream: false
    };
  }

  getOutput () {
    if (!this.output) {
      this.output = document.createElement('video');
    }
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
      return navigator.mediaDevices.getUserMedia({ 
        audio: false,
        video: {width: {min: 1280}, height: {min: 720}}
      })
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