import transforms from '../transforms';


const presets = [

  {
    name: 'Grayscale',
    transforms: [
      transforms.alter.grayscale(),
    ],
    // schema: {
    //   ---SOON!---
    // },
  },

  {
    name: 'adaptiveGaussian (smoothed)',
    transforms: [
      transforms.smooth.median({
        kernel: 5,
      }),
      transforms.threshold.adaptiveGaussian({
        ksize: 5,
        c: 0,
      }),
      transforms.alter.setChannel({
        idx: 3,
        val: 255,
      }),
    ]
  },

  {
    name: 'Canny',
    transforms: [
      transforms.featureDetect.canny({
        t1: 50,
        t2: 50,
      }),
    ]
  },

  {
    name: 'Binary Inverse',
    transforms: [
      transforms.threshold.binaryInv({
        t1: 100,
        t2: 0,
      }),
      transforms.alter.setChannel({
        idx: 3,
        val: 255,
      }),
    ]
  }

];

export default presets;