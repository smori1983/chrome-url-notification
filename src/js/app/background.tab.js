const badge = require('./background.badge');
const Finder = require('../notification/finder');

const listen = () => {
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.status === 'complete' && tab.url && tab.url.length > 0) {
      const finder = new Finder();
      const findResult = await finder.findFor(tab.url);
      const status = findResult.matched ? findResult.data.status : null;

      badge.draw(tabId, findResult.matched, status);
    }
  });
};

module.exports.listen = listen;
