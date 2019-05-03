// https://docs.opencv.org/3.4/dd/d6a/tutorial_js_filtering.html

export default {
  blur (src, dst) {
    this.ksize = this.ksize || new cv.Size(20, 20);
    this.anchor = this.anchor || new cv.Point(-1, -1);

    cv.boxFilter(src, dst, -1, this.ksize, this.anchor, true, cv.BORDER_DEFAULT);
  }
}