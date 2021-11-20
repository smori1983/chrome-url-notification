require('../../css/options.scss');
require('bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css');
require('../../css/bootstrap-custom.css');

const $ = require('jquery');

require('bootstrap');
require('bootstrap-colorpicker');

const i18n = require('./i18n');
const header = require('./options.header');
const patternList = require('./options.list');

$(() => {
  header.show($);
  patternList.show($);

  i18n.apply($, 'body');
});
