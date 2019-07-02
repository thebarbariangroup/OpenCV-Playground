// https://docs.opencv.org/3.4/dd/d6a/tutorial_js_filtering.html

export default {
  blur (src, dst) {
    this.ksize = this.ksize || new cv.Size(20, 20);
    this.anchor = this.anchor || new cv.Point(-1, -1);

    cv.boxFilter(src, dst, -1, this.ksize, this.anchor, true, cv.BORDER_DEFAULT);
  },
  gaussian (src, dst) {
    this.ksize = this.ksize || new cv.Size(7, 7); // must be an odd number

    cv.GaussianBlur(src, dst, this.ksize, 10, 10, cv.BORDER_DEFAULT);
  },
  median (src, dst) {
    cv.medianBlur(src, dst, 5); //last argument must be an odd number
  },
  bilateral (src, dst) {
    cv.cvtColor(src, this.transformedSrc, cv.COLOR_RGBA2RGB);

    cv.bilateralFilter(this.transformedSrc, dst, 9, 75, 75, cv.BORDER_DEFAULT);
  }
}