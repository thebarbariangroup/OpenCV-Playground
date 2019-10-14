// direct changes to the src
import cacheController from '../render/CacheController';

export default {
  // sets the channel at conf.idx to conf.val
  setChannel (conf) {
    const cache = cacheController.getCache(conf, 'setChannel');

    return function (src, dst) {
      cache.use('newPlanes', () => {
        return ['r', 'g', 'b', 'a'].map((key) => {
          if (typeof conf[key] === 'number') {
            const color = new cv.Scalar(conf[key]);
            return new cv.Mat(src.rows, src.cols, cv.CV_8U, color);
          }
          return null;
        });
      });

      const planes = new cv.MatVector();

      cv.split(src, planes);
      cache.newPlanes.forEach((newPlane, i) => {
        if (newPlane) {
          planes.set(i, newPlane);
        }
      });
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
  invert () {
    return function (src, dst) {
      cv.bitwise_not(src, dst);
    }
  }
}
