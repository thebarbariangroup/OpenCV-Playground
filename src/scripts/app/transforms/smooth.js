// https://docs.opencv.org/3.4/dd/d6a/tutorial_js_filtering.html

export default {
  blur (conf) {
    return (src, dst) => {
      this.ksize = this.ksize || new cv.Size(conf.kernel, conf.kernel);
      this.anchor = this.anchor || new cv.Point(conf.anchor, conf.anchor);

      cv.boxFilter(src, dst, -1, this.ksize, this.anchor, true, cv.BORDER_DEFAULT);
    }
  },
  gaussian (conf) {
    return (src, dst) => {
      this.ksize = this.ksize || new cv.Size(conf.kernel, conf.kernel); // must be an odd number

      cv.GaussianBlur(src, dst, this.ksize, 10, 10, cv.BORDER_DEFAULT);
    }
  },
  median (conf) {
    return (src, dst) => {
      cv.medianBlur(src, dst, conf.kernel); //last argument must be an odd number
    }
  },
  bilateral (conf) {
    return (src, dst) => {
      this.bilateralSrc = this.bilateralSrc || new cv.Mat(src.rows, src.cols, cv.CV_8UC3);
      cv.cvtColor(src, this.bilateralSrc, cv.COLOR_RGBA2RGB);

      cv.bilateralFilter(this.bilateralSrc, dst, conf.size, conf.sigmaColor, conf.sigmaSpace, cv.BORDER_DEFAULT);
    }
  }
}