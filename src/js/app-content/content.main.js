const $ = require('jquery');
const pageInfoFactory = require('./content.pageInfo');
const contentFind = require('./content.find');
const v3Util = require('../app/manifest.v3.util');

const pageInfo = pageInfoFactory.init(window.location, $);

const main = async () => {
  await contentFind.setUp($, pageInfo.get());
};

(async () => {
  if (await v3Util.hasData()) {
    await main();
  } else {
    chrome.runtime.sendMessage({
      command: 'invoke:storage:migration',
    }).catch(() => {
      // Handle: 'Error: The message port closed before a response was received.'
    });
  }
})();
