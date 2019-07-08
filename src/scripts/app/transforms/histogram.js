export default {
  equalize (conf) {
    // https://docs.opencv.org/3.1.0/d5/daf/tutorial_py_histogram_equalization.html
    return (src, dst) => {
      cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
      cv.equalizeHist(dst, dst);
    }
  },
};