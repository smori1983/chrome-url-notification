'use strict';

/**
 * @param {boolean} matched
 * @param {(number|null)} status
 * @returns {string}
 */
const determineText = function(matched, status) {
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
const draw = function(tabId, matched, status) {
  chrome.browserAction.setBadgeText({
    text: determineText(matched, status),
    tabId: tabId,
  });
};

module.exports.draw = draw;
