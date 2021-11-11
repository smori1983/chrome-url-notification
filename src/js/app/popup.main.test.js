// require('../../css/popup.css');

const chrome = require('sinon-chrome');

global.chrome = chrome;

const $ = global.jQuery = require('jquery');
const ui = require('./popup.ui');

ui.init($);
