const $ = require('jquery');
const pageInfoFactory = require('./content.pageInfo');
const contentFind = require('./content.find');
const contentTab = require('./content.tab');

const pageInfo = pageInfoFactory.init(window.location, $);

contentFind.findForPage($, pageInfo.get());
contentTab.listen($, pageInfo.get());
