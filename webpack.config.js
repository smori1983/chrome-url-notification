const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('src/manifest.json').toString());

const webpack = require('./webpack');
const mode = 'production';
const imageDir = 'image';
const outputPath = 'dist/chrome-url-notification-v' + manifest.version;

module.exports = webpack.prepare(mode, imageDir, outputPath);
