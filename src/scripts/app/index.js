import Webcam     from './Webcam';
import CanvasOut  from './CanvasOut';
import transforms from './transforms';


const TRANSFORMS = [
  // transforms.smooth.median({
  //   kernel: 51,
  //   anchor: -1
  // }),
  // transforms.smooth.bilateral({
  //   size: 5,
  //   sigmaColor: 200,
  //   sigmaSpace: 200
  // }),
  // transforms.featureDetect.canny({
  //   t1: 10,
  //   t2: 10
  // }),
  transforms.threshold.inRange({
    lo: 100,
    hi: 255
  }),
  transforms.morph.close({
    kernel: 10,
    anchor: 100,
    iterations: 5
  }),
  // transforms.smooth.blur({
  //   kernel: 20,
  //   anchor: -1
  // }),
  transforms.featureDetect.canny({
    t1: 100,
    t2: 100
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

