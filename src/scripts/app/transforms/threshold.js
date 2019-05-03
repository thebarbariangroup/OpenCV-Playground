export default {
  inRange (src, dst) {
    this.lo = this.lo || new cv.Mat(src.rows, src.cols, src.type(), [0,0,0,0]);
    this.hi = this.hi || new cv.Mat(src.rows, src.cols, src.type(), [100,100,100,255]);

    cv.inRange(src, this.lo, this.hi, dst);
  }
}