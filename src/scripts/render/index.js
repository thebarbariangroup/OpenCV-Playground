import '../../styles/index.scss';

import Webcam            from './Webcam';
import CanvasOut         from './CanvasOut';
import OutputController  from './OutputController';
import transforms        from '../transforms';

const COMPOSITION = () => [
  // transforms.alter.setChannel({
  //   r: 'unchanged',
  //   g: 'unchanged',
  //   b: 'unchanged',
  //   a: 255,
  // }),
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
      outputController.setTransforms(COMPOSITION); // initial transforms
      outputController.play();
    });
  }
});
