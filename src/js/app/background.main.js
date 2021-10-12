const installed = require('./background.installed');
const contentFind = require('./background.content.find');
const popupFind = require('./background.popup.find');
const popupUpdateStatus = require('./background.popup.update.status');

installed.listen();
contentFind.listen();
popupFind.listen();
popupUpdateStatus.listen();
