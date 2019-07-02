export default {
  inRange (conf) {
    return (src, dst) => {
      this.lo = this.lo || new cv.Mat(src.rows, src.cols, src.type(), [conf.lo,conf.lo,conf.lo,255]);
      this.hi = this.hi || new cv.Mat(src.rows, src.cols, src.type(), [conf.hi,conf.hi,conf.hi,255]);
      
      cv.inRange(src, this.lo, this.hi, dst);
    }
  }
}