const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: {
    index: './src/scripts/index.js',
    compose: './src/scripts/compose/index.js',
    render: './src/scripts/render/index.js',
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../../dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use:  [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin([
      { 
        from: './src/scripts/lib/opencv.js', 
        to: path.join(__dirname, '../../dist') 
      }
    ]),
    new HtmlWebpackPlugin({
      // hash: true,
      template: './src/views/index.html',
      chunks: ['index'],
      filename: './index.html',
      // inlineSource: '.(js|css)$'
    }),
    new HtmlWebpackPlugin({
      // hash: true,
      template: './src/views/compose/index.html',
      chunks: ['compose'],
      filename: './compose/index.html',
      // inlineSource: '.(js|css)$'
    }),
    new HtmlWebpackPlugin({
      // hash: true,
      template: './src/views/render/index.html',
      chunks: ['render'],
      filename: './render/index.html',
      // inlineSource: '.(js|css)$'
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '../../dist'),
  }
};

