// https://docs.opencv.org/3.4.3/dd/d4d/tutorial_js_image_arithmetics.html
import cacheController from '../render/CacheController';

export default {
  absoluteDifference (conf) {
    const cache = cacheController.getCache(conf, 'absoluteDifference');

    return function (src, dst) {
      cache.use('frameCount', () => 0);
      cache.use('prevSrc', this.getBaseMat);
      cv.absdiff(src, cache.prevSrc, dst);
      cache.frameCount++;

      if (cache.frameCount == 1) {
        cache.prevSrc.data.set(src.data);
        cache.frameCount = 0;
      }

    }
  }
}