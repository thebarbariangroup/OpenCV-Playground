export default [

  // {
  //   label: 'Line Flow',
  //   transforms: [
  //     {
  //       category: 'smooth',
  //       name: 'median',
  //       opts: {
  //         size: 101,
  //         anchor: -1,
  //       }
  //     },
  //     {
  //       category: 'featureDetect',
  //       name: 'canny',
  //       opts: {
  //         t1: 10,
  //         t2: 10,
  //       } 
  //     },
  //   ],
  // },

  {
    label: 'Topography',
    transforms: [
      {
        category: 'histogram',
        name: 'equalize',
        opts: {},
      },
      {
        category: 'smooth',
        name: 'median',
        opts: {
          size: 47,
          anchor: -1,
        }
      },
      {
        category: 'featureDetect',
        name: 'canny',
        opts: {
          t1: 10,
          t2: 10,
        } 
      },
    ]
  },

  {
    label: 'Blocky Binary',
    transforms: [
      {
        category: 'morph',
        name: 'close',
        opts: {
          ksize: 9,
        }
      },
      {
        category: 'threshold',
        name: 'binary',
        opts: {
          t1: 150,
          t2: 0,
        }
      }
    ]
  },

  {
    label: 'Acid Trace',
    transforms: [
      {
        category: 'threshold',
        name: 'binary',
        opts: {
          t1: 84,
          t2: 0,
        }
      },
      {
        category: 'arithmetic',
        name: 'absoluteDifference',
        opts: {},
      }
    ]
  }

];