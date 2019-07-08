// https://docs.opencv.org/3.4.1/d7/dd0/tutorial_js_thresholding.html

function threshold (src, dst, threshType, conf) { // a lot of unclear details on this stuff
  // valid conf.flag values are OTSU and TRIANGLE
  // OTSU and TRIANGLE are algorithms used to choose the optimal threshhold (t1) value
  const flag = conf.flag ? cv[`THRESH_${conf.flag.toUpperCase()}`] : 0;

  if (flag) {
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY); // OTSU and TRIANGLE both require src and dst mats to be single-channel
    cv.threshold(dst, dst, conf.t1, conf.t2 || 255, threshType | flag); // yes, a bitwise or is used to append the flag.
  } else {
    cv.threshold(src, dst, conf.t1, conf.t2 || 255, threshType);
  }
}

function adaptive (src, dst, adaptiveMethod, conf) {
  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0); // must be single-channel
  cv.adaptiveThreshold(dst, dst, 255, adaptiveMethod, cv.THRESH_BINARY, conf.ksize, conf.c || 0);
}

export default {
  inRange (conf) {
    return (src, dst) => {
      this.inRange.lo = this.inRange.lo || new cv.Mat(src.rows, src.cols, src.type(), [conf.lo,conf.lo,conf.lo,255]);
      this.inRange.hi = this.inRange.hi || new cv.Mat(src.rows, src.cols, src.type(), [conf.hi,conf.hi,conf.hi,255]);

      cv.inRange(src, this.inRange.lo, this.inRange.hi, dst);
    }
  },
  binary (conf) {
    return (src, dst) => {
      threshold.call(this, src, dst, cv.THRESH_BINARY, conf);
    }
  },
  binaryInv (conf) {
    return (src, dst) => {
      threshold.call(this, src, dst, cv.THRESH_BINARY_INV, conf);
    }
  },
  trunc (conf) {
    return (src, dst) => {
      threshold.call(this, src, dst, cv.THRESH_TRUNC, conf);
    }
  },
  toZero (conf) {
    return (src, dst) => {
      threshold.call(this, src, dst, cv.THRESH_TOZERO, conf);
    }
  },
  toZeroInv (conf) {
    return (src, dst) => {
      threshold.call(this, src, dst, cv.THRESH_TOZERO_INV, conf);
    }
  },
  adaptiveMean (conf) {
    return (src, dst) => {
      adaptive.call(this, src, dst, cv.ADAPTIVE_THRESH_MEAN_C, conf);
    }
  },
  adaptiveGaussian (conf) {
    return (src, dst) => {
      adaptive.call(this, src, dst, cv.ADAPTIVE_THRESH_GAUSSIAN_C, conf);
    }
  },
}