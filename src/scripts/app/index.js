import Webcam     from './Webcam';
import CanvasOut  from './CanvasOut';
import transforms from './transforms';


const TRANSFORMS = [
  transforms.alter.grayscale(),
  transforms.smooth.median({
    kernel: 5,
  }),
  // transforms.featureDetect.canny({
  //   t1: 50,
  //   t2: 50
  // }),
  // transforms.imageGradient.laplacian({
  //   ksize: 5,
  //   scale: 1,
  //   delta: 0,
  // }),
  transforms.imageGradient.sobel({
    dx: 2,
    dy: 0,
    ksize: 5,
  }),
  transforms.alter.setChannel({
    idx: 3,
    val: 255,
  }),
  // transforms.morph.erode({
  //   kernel: 1,
  //   anchor: 0,
  // }),
  // transforms.morph.close({
  //   kernel: 3,
  //   anchor: 1,
  // }),
  transforms.threshold.inRange({
    lo: 100,
    hi: 255,
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

