import cacheController from '../render/CacheController';

export default {
  equalize (conf) {
    // https://docs.opencv.org/3.1.0/d5/daf/tutorial_py_histogram_equalization.html
    return (src, dst) => {
      cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
      cv.equalizeHist(dst, dst);
    }
  },
  clahe (conf) {
    const cache = cacheController.getCache(conf, 'clahe');
    return (src, dst) => {
      cache.use('ksize', () => new cv.Size(8, 8));

      cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
      const clahe = new cv.CLAHE(2.0, cache.ksize);
      clahe.apply(dst, dst);
    }
  }
};