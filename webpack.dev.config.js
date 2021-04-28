const webpack = require('./webpack');
const mode = 'none';
const imageDir = 'image_dev';
const outputPath = 'dist/chrome-url-notification-dev';

module.exports = webpack.prepare(mode, imageDir, outputPath);
