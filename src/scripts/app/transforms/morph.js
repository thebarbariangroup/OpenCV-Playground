import cacheController from '../CacheController';

// https://docs.opencv.org/3.1.0/d9/d61/tutorial_py_morphological_ops.html

function morph (src, dst, morphType, conf) {
  const cache = cacheController.getCache(conf, morphType);

  cache.use('ksize', () => new cv.Size(conf.kernel, conf.kernel));
  cache.use('kernel', () => cv.getStructuringElement(cv.MORPH_RECT, cache.ksize));
  cache.use('anchor', () => new cv.Point(conf.anchor, conf.anchor));

  cv.morphologyEx(src, dst, morphType, cache.kernel);
}


export default {
  erode (conf) {
    return function (src, dst) {
      morph.call(this, src, dst, cv.MORPH_ERODE, conf);
    }
  },
  dilate (conf) {
    return function (src, dst) {
      morph.call(this, src, dst, cv.MORPH_DILATE, conf);
    }
  },
  open (conf) {
    return function (src, dst) {
      morph.call(this, src, dst, cv.MORPH_OPEN, conf);
    }
  },
  close (conf) {
    return function (src, dst) {
      morph.call(this, src, dst, cv.MORPH_CLOSE, conf);
    }
  },
  gradient (conf) {
    return function (src, dst) {
      morph.call(this, src, dst, cv.MORPH_GRADIENT, conf);
    }
  },
  topHat (conf) {
    return function (src, dst) {
      morph.call(this, src, dst, cv.MORPH_TOPHAT, conf);
    }
  },
  blackHat (conf) {
    return function (src, dst) {
      morph.call(this, src, dst, cv.MORPH_BLACKHAT, conf);
    }
  },
}