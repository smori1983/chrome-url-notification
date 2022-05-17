const uiFactory = require('./content.ui');
const Finder = require('../notification/finder');

/**
 * @param {jQuery} $
 * @param {PageInfo} pageInfo
 */
const setUp = async ($, pageInfo) => {
  await init($, pageInfo);
  watch($, pageInfo);
};

/**
 * @param {jQuery} $
 * @param {PageInfo} pageInfo
 */
const init = async ($, pageInfo) => {
  const findResult = await findPattern(pageInfo);

  if (findResult.matched) {
    const ui = uiFactory.init($, pageInfo);
    ui.initUI(findResult.data);
    ui.updateUI(findResult.data);
  }
};

/**
 * @param {jQuery} $
 * @param {PageInfo} pageInfo
 */
const watch = ($, pageInfo) => {
  chrome.storage.onChanged.addListener(async (changes) => {
    if (changes.pattern) {
      const findResult = await findPattern(pageInfo);

      if (findResult.matched) {
        const ui = uiFactory.init($, pageInfo);
        ui.updateUI(findResult.data);
      }
    }
  });
};

/**
 * @param {PageInfo} pageInfo
 */
const findPattern = async (pageInfo) => {
  const finder = new Finder();

  return await finder.findFor(pageInfo.location.href);
};

module.exports.setUp = setUp;
