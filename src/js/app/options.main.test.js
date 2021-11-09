// require('bootstrap/dist/css/bootstrap.min.css');
// require('bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css');
// require('../../css/bootstrap-custom.css');

// Necessary for @sideway/address/lib/email.js, used by joi.
global.TextEncoder = require('text-encoder').TextEncoder;

// global.jQuery is necessary for bootstrap 3.
const $ = global.jQuery = require('jquery');

require('bootstrap');
require('bootstrap-colorpicker');

const i18n = require('./i18n');
const header = require('./options.header');
const patternList = require('./options.list');

$(() => {
  header.show($);
  patternList.show($);

  i18n.apply2($, 'body');
});
