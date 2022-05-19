const chrome = require('sinon-chrome');

//
// Accessed from test code.
//
global.chrome = chrome;

//
// global.jQuery is accessed from test code.
//
const $ = global.jQuery = require('jquery');
const ui = require('./popup.ui');

$('#js_init').on('click', (e) => {
  e.preventDefault();
  ui.init($);
});
