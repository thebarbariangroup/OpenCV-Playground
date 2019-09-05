import cacheController from '../render/CacheController';

// https://docs.opencv.org/3.4/dd/d6a/tutorial_js_filtering.html

export default {
  blur (conf) {
    const cache = cacheController.getCache(conf, 'blur');

    return function (src, dst) {
      cache.use('ksize', () => new cv.Size(conf.ksize, conf.ksize));
      cache.use('anchor', () => new cv.Point(conf.anchor, conf.anchor));

      cv.boxFilter(src, dst, -1, cache.ksize, cache.anchor, true, cv.BORDER_DEFAULT);
    }
  },
  gaussian (conf) {
    const cache = cacheController.getCache(conf, 'gaussian');

    return function (src, dst) {
      cache.use('ksize', () => new cv.Size(conf.ksize, conf.ksize)); // must be an odd number

      cv.GaussianBlur(src, dst, cache.ksize, 10, 10, cv.BORDER_DEFAULT);
    }
  },
  median (conf) {
    return function (src, dst) {
      cv.medianBlur(src, dst, conf.size); //last argument must be an odd number
    }
  },
  bilateral (conf) {
    const cache = cacheController.getCache(conf, 'bilateral');

    return function (src, dst) {
      cache.use('bilateralSrc', () => new cv.Mat(src.rows, src.cols, cv.CV_8UC3));
  
      cv.cvtColor(src, cache.bilateralSrc, cv.COLOR_RGBA2RGB);

      cv.bilateralFilter(cache.bilateralSrc, dst, conf.size, conf.sigmaColor, conf.sigmaSpace, cv.BORDER_DEFAULT);
    }
  }
}