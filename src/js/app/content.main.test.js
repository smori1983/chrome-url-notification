const chrome = require('sinon-chrome');

//
// Accessed from test code.
//
global.chrome = chrome;

//
// global.jQuery is accessed from test code.
//
const $ = global.jQuery = require('jquery');
const pageInfoFactory = require('./content.pageInfo');
const contentFind = require('./content.find');
const contentTab = require('./content.tab');

const pageInfo = pageInfoFactory.init(window.location, $);

contentFind.findForPage($, pageInfo.get());
contentTab.listen($, pageInfo.get());
