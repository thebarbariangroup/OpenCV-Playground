import transforms from '../transforms';


const compositions = [

  {
    name: 'Grayscale',
    transforms: () => [
      transforms.alter.grayscale(),
    ],
    // schema: {
    //   ---SOON!---
    // },
  },

  {
    name: 'T-Rex Vision',
    transforms: () => [
      transforms.histogram.clahe(),
      transforms.arithmetic.absoluteDifference(),
      transforms.alter.setChannel({
        idx: 3,
        val: 255
      }),
    ],
  },

  {
    name: 'adaptiveGaussian (smoothed)',
    transforms: () => [
      transforms.smooth.median({
        size: 5,
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
    transforms: () => [
      transforms.featureDetect.canny({
        t1: 50,
        t2: 50,
      }),
    ]
  },

  {
    name: 'Binary Inverse',
    transforms: () => [
      transforms.threshold.binary({
        t1: 100,
        t2: 0,
      }),
      transforms.alter.setChannel({
        idx: 3,
        val: 255,
      }),
    ]
  },

  {
    name: 'Line Flow',
    transforms: () => [
      transforms.smooth.median({
        size: 101,
        anchor: -1,
      }),
      transforms.featureDetect.canny({
        t1: 10,
        t2: 10,
      }),
    ]
  },

  {
    name: 'Better Line Flow',
    transforms: () => [
      transforms.histogram.equalize(),
      transforms.smooth.median({
        size: 47,
      }),
      transforms.featureDetect.canny({
        t1: 10,
        t2: 10,
      }),
    ]
  },

  {
    name: 'thing',
    transforms: () => [
      transforms.threshold.inRange({
        lo: 100,
        hi: 255,
      }),
      transforms.featureDetect.canny({
        t1: 220,
        t2: 220,
      }),
      transforms.morph.gradient({
        kernel: 3,
        anchor: -1,
        iterations: 1,
      }),
      transforms.featureDetect.canny({
        t1: 2,
        t2: 2,
      }),
    ]
  }

];

export default compositions;