const installed = require('./background.installed');
const tab = require('./background.tab');
const v3Util = require('./manifest.v3.util');

installed.listen();

const main = () => {
  tab.listen();
};

const openMigrationPage = () => {
  chrome.tabs.create({
    url: chrome.runtime.getURL('html/manifest_v3_migration.html'),
  }).then();
};

(async () => {
  if (await v3Util.hasData()) {
    main();
  } else {
    openMigrationPage();
  }
})();

chrome.runtime.onMessage.addListener((request) => {
  if (request.command === 'invoke:storage:migration') {
    openMigrationPage();
  }
});
