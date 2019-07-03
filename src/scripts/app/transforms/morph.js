// https://docs.opencv.org/3.1.0/d9/d61/tutorial_py_morphological_ops.html

function morph (src, dst, morphType, conf) {
  this.ksize = this.ksize || new cv.Size(conf.kernel, conf.kernel);
  this.kernel = this.kernel || cv.getStructuringElement(cv.MORPH_RECT, this.ksize);
  this.anchor = this.anchor || new cv.Point(conf.anchor, conf.anchor);

  cv.morphologyEx(src, dst, morphType, this.kernel);
}


export default {
  erode (conf) {
    return (src, dst) => {
      morph.call(this, src, dst, cv.MORPH_ERODE, conf);
    }
  },
  dilate (conf) {
    return (src, dst) => {
      morph.call(this, src, dst, cv.MORPH_DILATE, conf);
    }
  },
  open (conf) {
    return (src, dst) => {
      morph.call(this, src, dst, cv.MORPH_OPEN, conf);
    }
  },
  close (conf) {
    return (src, dst) => {
      morph.call(this, src, dst, cv.MORPH_CLOSE, conf);
    }
  },
  gradient (conf) {
    return (src, dst) => {
      morph.call(this, src, dst, cv.MORPH_GRADIENT, conf);
    }
  },
  topHat (conf) {
    return (src, dst) => {
      morph.call(this, src, dst, cv.MORPH_TOPHAT, conf);
    }
  },
  blackHat (conf) {
    return (src, dst) => {
      morph.call(this, src, dst, cv.MORPH_BLACKHAT, conf);
    }
  },
}