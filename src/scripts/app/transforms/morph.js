// https://docs.opencv.org/3.1.0/d9/d61/tutorial_py_morphological_ops.html
export default {
  erode (conf) {

  },
  dilate (conf) {

  },
  close (conf) {
    return (src, dst) => {
      this.ksize = this.ksize || new cv.Size(conf.kernel, conf.kernel);
      this.kernel = this.kernel || cv.getStructuringElement(cv.MORPH_CROSS, this.ksize);
      this.anchor = this.anchor || new cv.Point(conf.anchor, conf.anchor);

      cv.morphologyEx(src, dst, cv.MORPH_CLOSE, this.kernel);
    }
  }
}