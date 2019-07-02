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