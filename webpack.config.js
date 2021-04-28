const packageJson = require('./package.json');
const webpack = require('./webpack');
const mode = 'production';
const imageDir = 'image';
const outputPath = 'dist/chrome-url-notification-v' + packageJson.version;

module.exports = webpack.prepare(mode, imageDir, outputPath);
