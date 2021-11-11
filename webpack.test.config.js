const webpack = require('./webpack.base');
const mode = 'none';
const imageDir = 'image_dev';
const outputPath = 'dist/test';

const config = webpack.prepare(mode, imageDir, outputPath);

config.entry = {
  options: {
    import: './src/js/app/options.main.test.js',
    filename: 'js/options.js',
  },
  popup: {
    import: './src/js/app/popup.main.test.js',
    filename: 'js/popup.js',
  },
};

module.exports = config;
