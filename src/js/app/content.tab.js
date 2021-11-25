const uiFactory = require('./content.ui');

/**
 * @typedef {Object} MessageTabNotifyStatus
 * @property {string} command
 * @property {{item: PatternItem|null, status: number}} data
 */

/**
 * @param {jQuery} $
 * @param {PageInfo} pageInfo
 */
const listen = ($, pageInfo) => {
  /**
   * @param {MessageTabNotifyStatus} request
   */
  const tabNotifyStatusListener = (request) => {
    /* istanbul ignore next */
    if (request.command !== 'tab:notify:status') {
      return;
    }

    // TODO: When item was not sent
    // See: background.popup.update.status.js

    if (request.data.item) {
      const ui = uiFactory.init($, pageInfo);

      ui.updateUI(request.data.item);
    }
  };

  chrome.runtime.onMessage.addListener(tabNotifyStatusListener);
};

module.exports.listen = listen;
