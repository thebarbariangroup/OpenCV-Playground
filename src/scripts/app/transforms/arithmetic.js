// https://docs.opencv.org/3.4.3/dd/d4d/tutorial_js_image_arithmetics.html

export default {
  subtract (src, dst, time) {
    // if () {
      // console.log('PRE');
      // console.log(src.data);
      // console.log(dst.data);
      // console.log(this.subtractionSrcProxy ? this.subtractionSrcProxy.data : undefined);

      // if (this.subtractionSrcProxy) {
      //   cv.subtract(this.subtractionSrcProxy, src, dst);
      // } else {
      //   this.subtractionSrcProxy = this._getBaseMat();
      // }
      
      // // this.subtractionSrcProxy = this.subtractionSrcProxy || cv.Mat.zeros(src.size(), src.type());
      
      // console.log('POST');
      // console.log(src.data);
      // console.log(dst.data);
      // console.log(this.subtractionSrcProxy.data);
      // debugger;

      // this.subtractionSrcProxy.data.set(dst.data);
    // }

    // rectangle()
  },
  absoluteDifference (conf) {
    return function (src, dst) {
      this.prevSrc = this.prevSrc || this._getBaseMat();
      cv.absdiff(src, this.prevSrc, dst);

      // console.log(this.prevSrc.data[0], src.data[0]);

      // for (let i = 0; i < src.data.length; i++) {
      //   if (src.data[i] !== this.prevSrc.data[i]) {
      //     debugger;
      //   }
      // }

      // dst.data.set(this.prevSrc.data);

      this.prevSrc.data.set(this.src.data);
    }
  }
}