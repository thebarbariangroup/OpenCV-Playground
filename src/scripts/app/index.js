import Webcam     from './Webcam';
import CanvasOut  from './CanvasOut';
import transforms from './transforms';

const TRANSFORMS = [
  // transforms.featureDetect.canny({
  //   t1: 50,
  //   t2: 50
  // }),
  // transforms.imageGradient.sobel({
  //   dx: 2,
  //   dy: 0,
  //   ksize: 5,
  // }),
  transforms.histogram.equalize(),
  // transforms.threshold.adaptiveMean({
  //   ksize: 3,
  //   c: 0
  // }),
  transforms.threshold.inRange({
    lo: 100,
    hi: 155,
  }),
  transforms.imageGradient.laplacian({
    ksize: 1,
    scale: 20,
    delta: -200,
  }),
  transforms.alter.setChannel({
    idx: 3,
    val: 255,
  }),
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
      transforms: TRANSFORMS
    });

    webcam.initializeCamera()
    .then(() => {
      return webcam.beginStream();
    })
    .then(() => {
      canvasOut.play();
    });
  }
});

