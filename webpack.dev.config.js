const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  // mode: 'production',
  // mode: 'development',
  mode: 'none',
  entry: './src/js/app/main.background.js',
  plugins: [
    new webpack.ProgressPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: 'manifest.json',
        },
        {
          from: 'src/_locales',
          to: '_locales',
        },
        {
          from: 'src/html',
          to: 'html',
        },
        {
          from: 'node_modules/bootstrap/dist/fonts',
          to: 'fonts',
        },
        {
          from: 'src/image_dev',
          to: 'image',
        },
      ],
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist/sample'),
    filename: 'js/background.js',
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'babel-loader',
    }],
  },
}
