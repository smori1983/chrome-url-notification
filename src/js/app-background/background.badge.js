/**
 * @param {boolean} matched
 * @param {(number|null)} status
 * @returns {string}
 */
const determineText = (matched, status) => {
  if (matched && status === 1) {
    return 'ON';
  } else if (matched && status === 0) {
    return 'OFF';
  } else {
    return '';
  }
};

/**
 * @param {number} tabId
 * @param {boolean} matched
 * @param {(number|null)} status
 */
const draw = (tabId, matched, status) => {
  chrome.action.setBadgeText({
    text: determineText(matched, status),
    tabId: tabId,
  }).then();
};

module.exports.draw = draw;
