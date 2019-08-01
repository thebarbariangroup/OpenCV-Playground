// https://docs.opencv.org/3.4.3/dd/d4d/tutorial_js_image_arithmetics.html

export default {
  absoluteDifference (conf) {
    return function (src, dst) {
      this.frameCount = this.frameCount || 0;
      this.prevSrc = this.prevSrc || this.getBaseMat();
      cv.absdiff(src, this.prevSrc, dst);
      this.frameCount++;

      if (this.frameCount == 1) {
        this.prevSrc.data.set(this.src.data);
        this.frameCount = 0;
      }

    }
  }
}