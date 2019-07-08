// https://docs.opencv.org/3.1.0/d5/d0f/tutorial_py_gradients.html
export default {
  sobel (conf) {
    return (src, dst) => {
      cv.Sobel(src, dst, cv.CV_64F, conf.dx, conf.dy, conf.ksize);
      if (conf.edges === 2) {
        cv.convertScaleAbs(dst, dst, 1, 0);
      } else {
        dst.convertTo(dst, cv.CV_8UC4);
      }
    }
  },
  scharr (conf) {
    // Cannot get this one to work. Not sure what the issue is.
    return (src, dst) => {
      cv.Scharr(src, dst, cv.CV_U8, conf.dx, conf.dy, conf.scale || 1, conf.delta || 0);
    }
  },
  laplacian (conf) {
    return (src, dst) => {
      cv.Laplacian(src, dst, cv.CV_64F, conf.ksize, conf.scale || 1, conf.delta || 0);
      if (conf.edges === 2) {
        cv.convertScaleAbs(dst, dst, 1, 0);
      } else {
        dst.convertTo(dst, cv.CV_8UC4);
      }
    }
  },
}