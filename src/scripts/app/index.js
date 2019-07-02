import Webcam     from './Webcam';
import CanvasOut  from './CanvasOut';
import transforms from './transforms';

const TRANSFORMS = [
  transforms.threshold.inRange,
  transforms.featureDetect.canny,
  transforms.smooth.blur,
  // transforms.smooth.blur,
  // transforms.featureDetect.houghLines,
  // transforms.featureDetect.houghLinesP,
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

