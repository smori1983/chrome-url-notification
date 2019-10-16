'use strict';

const $ = global.jQuery = require('jquery');

const i18n = require('./i18n');
const header = require('./options.header');
const patternList = require('./options.list');

$(function() {
  header.show();
  patternList.show();

  i18n.apply('body');
});
