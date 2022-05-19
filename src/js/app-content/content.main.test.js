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

const pageInfo = pageInfoFactory.init(window.location, $);

const main = async () => {
  await contentFind.setUp($, pageInfo.get());
};

(async () => {
  await main();
})();
