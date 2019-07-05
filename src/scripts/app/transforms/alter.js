export default {
  setChannel(conf) {
    // sets the channel at conf.idx to conf.val
    return (src, dst) => {
      this.newChannelMats = this.newChannelMats || {};
      const key = `${conf.idx}/${conf.val}`;
      let newPlane = this.newChannelMats[key];
      if (!newPlane) {
        const color = new cv.Scalar(conf.val);
        newPlane = new cv.Mat(src.rows, src.cols, cv.CV_8U, color);;
        this.newChannelMats[key] = newPlane;
      }

      const planes = new cv.MatVector();

      cv.split(src, planes);
      planes.set(conf.idx, newPlane);
      cv.merge(planes, dst);

      planes.delete();
    } 
  },
  abs () {
    // does nothing to mats with unsigned type
    return (src, dst) => {
      cv.convertScaleAbs(src, dst, 1, 0);
    }
  },
}