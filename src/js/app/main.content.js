const pageInfo = require('./content.pageInfo').init();
const contentFind = require('./content.find');
const contentTab = require('./content.tab');

contentFind.sendMessage(pageInfo.get());
contentTab.listen(pageInfo.get());
