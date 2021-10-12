const pageInfoFactory = require('./content.pageInfo');
const contentFind = require('./content.find');
const contentTab = require('./content.tab');

const pageInfo = pageInfoFactory.init();

contentFind.sendMessage(pageInfo.get());
contentTab.listen(pageInfo.get());
