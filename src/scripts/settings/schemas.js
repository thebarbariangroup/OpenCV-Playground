export default [

  // ALTERATIONS

  {
    category: 'alter',
    name: 'grayscale',
    label: 'Grayscale',
    conf: { args: [] },
  },

  {
    category: 'alter',
    name: 'invert',
    label: 'Invert',
    conf: { args: [] },
  },

  {
    category: 'alter',
    name: 'setChannel',
    label: 'Set RGBA',
    conf: {
      args: [
        {
          name: 'r',
          label: 'Red',
          defaultValue: 0,
          optional: true,
          input: {
            type: 'range',
            min: 0,
            max: 255,
            inactiveValue: 'unchanged',
          }
        },
        {
          name: 'g',
          label: 'Green',
          defaultValue: 0,
          defaultActive: true,
          optional: true,
          input: {
            type: 'range',
            min: 0,
            max: 255,
            inactiveValue: 'unchanged',
          }
        },
        {
          name: 'b',
          label: 'Blue',
          defaultValue: 0,
          optional: true,
          input: {
            type: 'range',
            min: 0,
            max: 255,
            inactiveValue: 'unchanged',
          }
        },
        {
          name: 'a',
          label: 'Alpha',
          defaultValue: 255,
          optional: true,
          input: {
            type: 'range',
            min: 0,
            max: 255,
            inactiveValue: 'unchanged',
          }
        }
      ]
    }
  },

  // ARITHMETIC

  {
    category: 'arithmetic',
    name: 'absoluteDifference',
    label: 'T-Rex Vision',
    conf: { args: [] },
  },

  // FEATURE DETECTION

  {
    category: 'featureDetect',
    name: 'canny',
    label: '"Canny" Edge Detection',
    conf: {
      args: [
        {
          name: 't1',
          label: 'Threshold 1',
          defaultValue: 50,
          input: {
            type: 'range',
            min: 0,
            max: 255,
          }
        },
        {
          name: 't2',
          label: 'Threshold 2',
          defaultValue: 50,
          input: {
            type: 'range',
            min: 0,
            max: 255,
          }
        }
      ]
    }
  },

  // HISTOGRAM 

  {
    category: 'histogram',
    name: 'equalize',
    label: 'Equalize',
    conf: { args: [] },
  },

  {
    category: 'histogram',
    name: 'clahe',
    label: '"Clahe" Equalize',
    conf: { args: [] },
  },

  // IMAGE GRADIENTS

  {
    category: 'imageGradient',
    name: 'sobel',
    label: '"Sobel" Gradient',
    conf: {
      args: [
        {
          name: 'dx',
          label: 'Horizontal',
          defaultValue: 1,
          input: {
            type: 'number',
            min: 0,
            max: 4,
          }
        },
        {
          name: 'dy',
          label: 'Vertical',
          defaultValue: 0,
          input: {
            type: 'number',
            min: 0,
            max: 4,
          }
        },
        {
          name: 'ksize',
          label: 'Kernel',
          defaultValue: 3,
          input: {
            type: 'number',
            min: 1,
            step: 2,
          }
        }
      ]
    }
  },

  {
    category: 'imageGradient',
    name: 'laplacian',
    label: '"Laplacian" Gradient',
    conf: {
      args: [
        {
          name: 'scale',
          label: 'Scale',
          defaultValue: 1,
          input: {
            type: 'number',
            min: 1,
          }
        },
        {
          name: 'delta',
          label: 'Delta',
          defaultValue: 0,
          input: {
            type: 'range',
            min: 0,
            max: 255,
          }
        },
        {
          name: 'ksize',
          label: 'Kernel',
          defaultValue: 5,
          input: {
            type: 'number',
            min: 1,
            step: 2,
          }
        }
      ]
    }
  },

  // MORPHOLOGICAL TRANSFORMATIONS

  {
    category: 'morph',
    name: 'open',
    label: 'Open',
    conf: {
      args: [
        {
          name: 'ksize',
          label: 'Kernel',
          defaultValue: 5,
          input: {
            type: 'number',
            min: 1,
            step: 2,
          }
        },
        {
          name: 'anchor',
          label: 'Anchor',
          defaultValue: -1,
          hidden: true,
        }
      ]
    }
  },

  {
    category: 'morph',
    name: 'close',
    label: 'Close',
    conf: {
      args: [
        {
          name: 'ksize',
          label: 'Kernel',
          defaultValue: 5,
          input: {
            type: 'number',
            min: 1,
            step: 2,
          }
        },
        {
          name: 'anchor',
          label: 'Anchor',
          defaultValue: -1,
          hidden: true,
        }
      ]
    }
  },
 
  {
    category: 'morph',
    name: 'gradient',
    label: 'Gradient Morph',
    conf: {
      args: [
        {
          name: 'ksize',
          label: 'Kernel',
          defaultValue: 3,
          input: {
            type: 'number',
            min: 1,
            step: 2,
          }
        },
        {
          name: 'anchor',
          label: 'Anchor',
          defaultValue: -1,
          hidden: true,
        }
      ]
    }
  },

  // SMOOTHING

  {
    category: 'smooth',
    name: 'blur',
    label: 'Simple Blur',
    conf: {
      args: [
        {
          name: 'ksize',
          label: 'Kernel',
          defaultValue: 5,
          input: {
            type: 'number',
            min: 1,
            step: 2,
          }
        },
        {
          name: 'anchor',
          label: 'Anchor',
          defaultValue: -1,
          hidden: true,
        }
      ]
    }
  },

  {
    category: 'smooth',
    name: 'gaussian',
    label: '"Gaussian" Blur',
    conf: {
      args: [
        {
          name: 'ksize',
          label: 'Kernel',
          defaultValue: 5,
          input: {
            type: 'number',
            min: 1,
            step: 2,
          }
        }
      ]
    }
  },

  {
    category: 'smooth',
    name: 'median',
    label: 'Median Blur',
    conf: {
      args: [
        {
          name: 'size',
          label: 'Size',
          defaultValue: 5,
          input: {
            type: 'number',
            min: 1,
            step: 2,
          }
        },
        {
          name: 'anchor',
          label: 'Anchor',
          defaultValue: -1,
          hidden: true,
        }
      ]
    }
  },
  
  // {
  //   category: 'smooth',
  //   name: 'bilateral',
  //   label: 'Bilateral Blur',
  //   conf: {
  //     args: [
  //       {
  //         name: 'size',
  //         label: 'Size',
  //         defaultValue: 5,
  //         input: {
  //           type: 'number',
  //           min: 1,
  //           step: 2,
  //         },
  //       },
  //       {
  //         name: 'sigmaColor',
  //         label: 'Sigma Color',
  //         defaultValue: 1,
  //         input: {
  //           type: 'number',
  //           min: 0,
  //           step: 1,
  //         },
  //       },
  //       {
  //         name: 'sigmaSpace',
  //         label: 'Sigma Space',
  //         defaultValue: 1,
  //         input: {
  //           type: 'number',
  //           min: 0,
  //           step: 1,
  //         },
  //       },
  //     ],
  //   },
  // },

  // THRESHOLD

  {
    category: 'threshold',
    name: 'binary',
    label: 'Binary Threshold',
    conf: {
      args: [
        {
          name: 't1',
          label: 'Threshold 1',
          defaultValue: 100,
          input: {
            type: 'range',
            min: 0,
            max: 255,
          }
        },
        {
          name: 't2',
          label: 'Threshold 2',
          defaultValue: 0,
          input: {
            type: 'range',
            min: 0,
            max: 255,
          }
        }
      ]
    }
  },

  {
    category: 'threshold',
    name: 'binaryInv',
    label: 'Binary Threshold (Inverse)',
    conf: {
      args: [
        {
          name: 't1',
          label: 'Threshold 1',
          defaultValue: 100,
          input: {
            type: 'range',
            min: 0,
            max: 255,
          }
        },
        {
          name: 't2',
          label: 'Threshold 2',
          defaultValue: 0,
          input: {
            type: 'range',
            min: 0,
            max: 255,
          }
        }
      ]
    }
  },

  {
    category: 'threshold',
    name: 'adaptiveMean',
    label: 'Adaptive Mean Threshold',
    conf: {
      args: [
        {
          name: 'ksize',
          label: 'Kernel',
          defaultValue: 3,
          input: {
            type: 'number',
            min: 3,
            step: 2,
          }
        }
      ]
    }
  },

  {
    category: 'threshold',
    name: 'adaptiveGaussian',
    label: 'Adaptive "Gaussian" Threshold',
    conf: {
      args: [
        {
          name: 'ksize',
          label: 'Kernel',
          defaultValue: 3,
          input: {
            type: 'number',
            min: 3,
            step: 2,
          }
        }
      ]
    }
  },

  {
    category: 'threshold',
    name: 'inRange',
    label: 'In-Range Threshold',
    conf: {
      args: [
        {
          name: 'lo',
          label: 'Lower Bound',
          defaultValue: 10,
          input: {
            type: 'range',
            min: 0,
            max: 255,
          }
        },
        {
          name: 'hi',
          label: 'Upper Bound',
          defaultValue: 100,
          input: {
            type: 'range',
            min: 0,
            max: 255,
          }
        }
      ]
    }
  },


          // {
        //   name: 'idx',
        //   label: 'Channel',
        //   defaultValue: 0,
        //   input: {
        //     type: 'radio',
        //     values: [
        //       { k: 'red', v: 0 },
        //       { k: 'green', v: 1 },
        //       { k: 'blue', v: 2 },
        //       { k: 'alpha', v: 3 },
        //     ],
        //   },
        // },

];