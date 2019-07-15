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

];

export default schemas;