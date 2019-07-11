export default {
  canny (conf) {
    // https://docs.opencv.org/3.1.0/dd/d1a/group__imgproc__feature.html#ga04723e007ed888ddf11d9ba04e2232de
    return function (src, dst) {
      cv.Canny(src, dst, conf.t1, conf.t2, 3, true); // Aperture seems to only work at 3.
    }
  },

  houghLines (src, dst) {
    // let lines = new cv.Mat();

    // console.log('prehough')

    // cv.HoughLines(
    //   src, lines, 1, Math.PI / 180,
    //   30, 0, 0, 0, Math.PI
    // );

    // console.log('posthough')

    // let color = new cv.Scalar(255);
    // for (let i = 0; i < lines.rows; ++i) {
    //   let rho = lines.data32F[i * 2];
    //   let theta = lines.data32F[i * 2 + 1];
    //   let a = Math.cos(theta);
    //   let b = Math.sin(theta);
    //   let x0 = a * rho;
    //   let y0 = b * rho;
    //   let startPoint = {x: x0 - 1000 * b, y: y0 + 1000 * a};
    //   let endPoint = {x: x0 + 1000 * b, y: y0 - 1000 * a};
    //   cv.line(dst, startPoint, endPoint, color);
    // }

    // lines.delete();
  },

  houghLinesP (src, dst) {
    // let lines = new cv.Mat();
    // cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);

    // cv.HoughLinesP(src, lines, 1, Math.PI / 180, 2, 0, 0);
    // // draw lines
    // for (let i = 0; i < lines.rows; ++i) {
    //   let startPoint = new cv.Point(lines.data32S[i * 4], lines.data32S[i * 4 + 1]);
    //   let endPoint = new cv.Point(lines.data32S[i * 4 + 2], lines.data32S[i * 4 + 3]);
    //   cv.line(dst, startPoint, endPoint, color);
    // }

    // lines.delete();
  }
};

//HOUGH P
// let src = cv.imread('canvasInput');
// let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
// let lines = new cv.Mat();
// let color = new cv.Scalar(255, 0, 0);
// cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
// // cv.Canny(src, src, 50, 200, 3);
// // You can try more different parameters
// cv.HoughLinesP(src, lines, 1, Math.PI / 180, 2, 0, 0);
// // draw lines
// for (let i = 0; i < lines.rows; ++i) {
//     let startPoint = new cv.Point(lines.data32S[i * 4], lines.data32S[i * 4 + 1]);
//     let endPoint = new cv.Point(lines.data32S[i * 4 + 2], lines.data32S[i * 4 + 3]);
//     cv.line(dst, startPoint, endPoint, color);
// }
// cv.imshow('canvasOutput', dst);
// src.delete(); dst.delete(); lines.delete();