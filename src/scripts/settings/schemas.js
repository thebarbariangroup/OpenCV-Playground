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
    name: 'setChannel',
    label: 'Set RGBA',
    conf: {
      args: [
        {
          name: 'idx',
          label: 'Channel',
          defaultValue: 3,
          input: {
            type: 'radio',
            values: [
              { k: 'red', v: 0 },
              { k: 'green', v: 1 },
              { k: 'blue', v: 2 },
              { k: 'alpha', v: 3 },
            ],
          },
        },
        {
          name: 'val',
          label: 'Value',
          defaultValue: 255,
          input: {
            type: 'range',
            min: 0,
            max: 255,
          },
        },
      ],
    },
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
          },
        },
        {
          name: 't2',
          label: 'Threshold 2',
          defaultValue: 50,
          input: {
            type: 'range',
            min: 0,
            max: 255,
          },
        },
      ]
    },
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
          defaultValue: 10,
        },
        {
          name: 'dy',
          label: 'Vertical',
          defaultValue: 10,
        },
        {
          name: 'ksize',
          label: 'Kernel',
          defaultValue: 5,
        },
      ],
    },
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
        },
        {
          name: 'delta',
          label: 'Delta',
          defaultValue: 0,
        },
        {
          name: 'ksize',
          label: 'Kernel',
          defaultValue: 5,
        },
      ],
    }, 
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
        },
        {
          name: 'anchor',
          label: 'Anchor',
          defaultValue: -1,
        },
      ],
    },
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
        },
        {
          name: 'anchor',
          label: 'Anchor',
          defaultValue: -1,
        },
      ],
    },
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
        },
        {
          name: 'anchor',
          label: 'Anchor',
          defaultValue: -1,
        },
      ],
    },
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
        },
      ],
    },
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
          defaultValue: 7,
        },
        {
          name: 'anchor',
          label: 'Anchor',
          defaultValue: -1,
        },
      ],
    },
  },

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
          defaultValue: 50,
          input: {
            type: 'slider',
            range: [0, 255],
          },
        },
        {
          name: 't2',
          label: 'Threshold 2',
          defaultValue: 50,
          input: {
            type: 'slider',
            range: [0, 255],
          },
        },
      ]
    },
  },

];