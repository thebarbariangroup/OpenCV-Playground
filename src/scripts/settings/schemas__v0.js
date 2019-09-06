const schemas = [

  {
    type: 'alter',
    name: 'setChannel',
    defaultConf: {
      idx: 3,
      val: 255,
    },
  },
  {
    type: 'alter',
    name: 'grayscale',
    defaultConf: {},
  },

  {
    type: 'arithmetic',
    name: 'absoluteDifference',
    defaultConf: {},
  },

  {
    type: 'featureDetect',
    name: 'canny',
    defaultConf: {
      t1: 50,
      t2: 50,
    },
  },

  {
    type: 'histogram',
    name: 'equalize',
    defaultConf: {},
  },
  {
    type: 'histogram',
    name: 'clahe',
    defaultConf: {},
  },

  {
    type: 'imageGradient',
    name: 'sobel',
    defaultConf: {
      dx: 10,
      dy: 10,
      ksize: 5,
    },
  },
  // not working
  // {
  //   type: 'imageGradient',
  //   name: 'scharr',
  //   defaultConf: {
  //     dx: 10,
  //     dy: 10,
  //     scale: 1,
  //     delta: 0,
  //   },
  // },
  {
    type: 'imageGradient',
    name: 'laplacian',
    defaultConf: {
      ksize: 5,
      scale: 1,
      delta: 0,
    },
  },

  {
    type: 'morph',
    name: 'erode',
    defaultConf: {
      ksize: 5,
      anchor: -1,
    },
  },
  {
    type: 'morph',
    name: 'dilate',
    defaultConf: {
      ksize: 5,
      anchor: -1,
    },
  },
  {
    type: 'morph',
    name: 'open',
    defaultConf: {
      ksize: 5,
      anchor: -1,
    },
  },
  {
    type: 'morph',
    name: 'close',
    defaultConf: {
      ksize: 5,
      anchor: -1,
    },
  },
  {
    type: 'morph',
    name: 'gradient',
    defaultConf: {
      ksize: 5,
      anchor: -1,
    },
  },
  {
    type: 'morph',
    name: 'topHat',
    defaultConf: {
      ksize: 5,
      anchor: -1,
    },
  },
  {
    type: 'morph',
    name: 'blackHat',
    defaultConf: {
      ksize: 5,
      anchor: -1,
    },
  },

  {
    type: 'smooth',
    name: 'blur',
    defaultConf: {
      ksize: 5,
      anchor: -1,
    },
  },
  {
    type: 'smooth',
    name: 'gaussian',
    defaultConf: {
      ksize: 5,
    },
  },
  {
    type: 'smooth',
    name: 'median',
    defaultConf: {
      size: 5,
    },
  },
  {
    type: 'smooth',
    name: 'bilateral',
    defaultConf: {
      size: 5,
      sigmaColor: 1,
      sigmaSpace: 1,
    },
  },

  {
    type: 'smooth',
    name: 'median',
    defaultConf: {
      size: 7,
      anchor: -1,
    },
  },

  {
    type: 'threshold',
    name: 'binary',
    defaultConf: {
      t1: 100,
      t2: 0,
    },
  },

];

export default schemas;