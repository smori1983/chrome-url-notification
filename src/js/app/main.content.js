'use strict';

const contentFind = require('./content.find');
const contentTab = require('./content.tab');

contentFind.sendMessage();
contentTab.listen();
