import Webcam     from './Webcam';
import CanvasOut  from './CanvasOut';
import transforms from './transforms';


const TRANSFORMS = [
  // transforms.threshold.inRange({
  //   lo: 100,
  //   hi: 255,
  // }),
  transforms.imageGradient.laplacian({
    ksize: 3,
    scale: 1,
    delta: 0,
  }),
  transforms.featureDetect.canny({
    t1: 10,
    t2: 10
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

