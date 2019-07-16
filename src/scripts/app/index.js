import Webcam            from './Webcam';
import CanvasOut         from './CanvasOut';
import OutputController  from './OutputController';
import transforms        from './transforms';

const TRANSFORMS = () => [
  // transforms.histogram.equalize(),
  // transforms.smooth.median({
  //   kernel: 3,
  //   anchor: -1
  // }),
  transforms.arithmetic.absoluteDifference(),
  transforms.alter.setChannel({
    idx: 3,
    val: 255
  }),
  transforms.threshold.inRange({
    lo: 40,
    hi: 255
  }),
  // transforms.smooth.blur({
  //   kernel: 1,
  //   anchor: -1
  // }),
  function (src, dst) {
    this.whitePlane = this.whitePlane || (() => {
      const color = new cv.Scalar(255);
      return new cv.Mat(src.rows, src.cols, cv.CV_8U, color);
    })();

    this.blackPlane = this.blackPlane || (() => {
      const color = new cv.Scalar(0);
      return new cv.Mat(src.rows, src.cols, cv.CV_8U, color);
    })();

    const planes = new cv.MatVector();

    cv.split(src, planes);
    planes.set(2, this.blackPlane);
    planes.set(3, this.whitePlane);
    cv.merge(planes, dst);

    planes.delete();
  },
];

document.body.addEventListener('OPENCV_BUILT', () => {
  cv['onRuntimeInitialized'] = () => {
    // const video  = document.getElementById('videoInput');
    const output = document.getElementById('canvasOutput');
    const data   = document.getElementById('data');

    const webcam = new Webcam({
      // output: video
    });
    
    const canvasOut = new CanvasOut({
      input: webcam,
      output: output,
      data: data,
    });

    const outputController = new OutputController({
      output: canvasOut,
    });

    webcam.initializeCamera()
    .then(() => {
      return webcam.beginStream();
    })
    .then(() => {
      outputController.setTransforms(TRANSFORMS); // initial transforms
      outputController.play();
    });
  }
});

