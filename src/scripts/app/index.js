import Webcam     from './Webcam';
import CanvasOut  from './CanvasOut';
import OutputController  from './OutputController';
import transforms from './transforms';


const TRANSFORMS = [
  // transforms.alter.grayscale(),
  // transforms.smooth.median({
  //   kernel: 5,
  // }),
  // transforms.featureDetect.canny({
  //   t1: 50,
  //   t2: 50
  // }),
  // transforms.imageGradient.laplacian({
  //   ksize: 5,
  //   scale: 1,
  //   delta: 0,
  // }),
  // transforms.imageGradient.sobel({
  //   dx: 2,
  //   dy: 0,
  //   ksize: 5,
  // }),
  // transforms.threshold.adaptiveGaussian({
  //   ksize: 5,
  //   c: 0,
  // }),
  // transforms.threshold.binary({
  //   t1: 0,
  //   t2: 255,
  //   flag: 'otsu',
  // }),
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

