// direct changes to the src
import cacheController from '../render/CacheController';

export default {
  // sets the channel at conf.idx to conf.val
  setChannel (conf) {
    const cache = cacheController.getCache(conf, 'setChannel');

    return function (src, dst) {
      cache.use('newPlane', () => {
        const color = new cv.Scalar(conf.val);
        return new cv.Mat(src.rows, src.cols, cv.CV_8U, color);
      });

      const planes = new cv.MatVector();

      cv.split(src, planes);
      planes.set(conf.idx, cache.newPlane);
      cv.merge(planes, dst);

      planes.delete();
    } 
  },
  abs () { // does nothing to mats with unsigned type
    return function (src, dst) {
      cv.convertScaleAbs(src, dst, 1, 0);
    }
  },
  grayscale () {
    return function (src, dst) {
      cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
    }
  },
}
