// https://docs.opencv.org/3.1.0/d5/d0f/tutorial_py_gradients.html
export default {
  sobel (conf) {
    return (src, dst) => {
      cv.Sobel(src, dst, cv.CV_8U, conf.dx, conf.dy, conf.ksize);
    }
  },
  scharr (conf) {
    // Cannot get this none to work. Not sure what the issue is.
    return (src, dst) => {
      cv.Scharr(src, dst, cv.CV_8U, conf.dx, conf.dy, conf.scale || 1, conf.delta || 0);
    }
  },
  laplacian (conf) {
    // Cannot get this none to work. Not sure what the issue is.
    return (src, dst) => {
      cv.Laplacian(src, dst, cv.CV_8U, conf.ksize, conf.scale || 1, conf.delta || 0);
    }
  },
}