require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css');
require('../../css/bootstrap-custom.css');

const $ = global.jQuery = require('jquery');

const i18n = require('./i18n');
const header = require('./options.header');
const patternList = require('./options.list');

$(() => {
  header.show($);
  patternList.show($);

  i18n.apply('body');
});
