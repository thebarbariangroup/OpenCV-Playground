const schemas = [

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
    defaultConf: null,
  },

  {
    type: 'threshold',
    name: 'binary',
    defaultConf: {
      t1: 100,
      t2: 0,
    },
  },

  {
    type: 'smooth',
    name: 'median',
    defaultConf: {
      kernel: 7,
      anchor: -1,
    },
  },

  {
    type: 'alter',
    name: 'setChannel',
    defaultConf: {
      idx: 3,
      val: 255,
    },
  },

];

export default schemas;