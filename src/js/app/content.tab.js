/**
 * @typedef {Object} MessageTabNotifyStatus
 * @property {string} command
 * @property {{item: PatternItem|null, status: number}} data
 */

/**
 * @param {PageInfo} pageInfo
 */
const listen = (pageInfo) => {
  /**
   * @param {MessageTabNotifyStatus} request
   */
  const tabNotifyStatusListener = (request) => {
    /* istanbul ignore next */
    if (request.command !== 'tab:notify:status') {
      return;
    }

    if (request.data.item) {
      const ui = require('./content.ui').init(pageInfo);

      ui.updateUI(request.data.item);
    }
  };

  chrome.runtime.onMessage.addListener(tabNotifyStatusListener);
};

module.exports.listen = listen;
