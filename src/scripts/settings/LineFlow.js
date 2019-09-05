const TRANSFORMS = [
  transforms.smooth.median({
    kernel: 101,
    anchor: -1
  }),
  // transforms.smooth.bilateral({
  //   size: 5,
  //   sigmaColor: 200,
  //   sigmaSpace: 200
  // }),
  transforms.featureDetect.canny({
    t1: 10,
    t2: 10
  }),
  // transforms.smooth.blur({
  //   kernel: 3,
  //   anchor: -1
  // }),
  // transforms.threshold.inRange({
  //   lo: 40,
  //   hi: 255
  // }),
];

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
  transforms.threshold.inRange({
    lo: 100,
    hi: 255
  }),
  // transforms.smooth.blur({
  //   kernel: 3,
  //   anchor: -1
  // }),
  transforms.featureDetect.canny({
    t1: 220,
    t2: 220
  }),
  transforms.morph.gradient({
    kernel: 3,
    anchor: -1,
    iterations: 1
  }),
  transforms.featureDetect.canny({
    t1: 2,
    t2: 2
  }),
];