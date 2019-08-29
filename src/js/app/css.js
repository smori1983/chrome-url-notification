'use strict';

const height = 50;

/**
 * @param {PageInfo} pageInfo
 * @param {number} status
 * @returns {string}
 */
const marginTop = function(pageInfo, status) {
  if (status === 1) {
    return height + 'px';
  } else {
    return pageInfo.body.marginBottom;
  }
};

/**
 * @param {PageInfo} pageInfo
 * @param {number} status
 * @returns {string}
 */
const marginBottom = function(pageInfo, status) {
  if (status === 1) {
    return height + 'px';
  } else {
    return pageInfo.body.marginTop;
  }
};

/**
 * Determine CSS for message area.
 *
 * @param {FoundItem} item
 * @returns {Object}
 */
const forMessage = function(item) {
  const result = {
    position:   'fixed',
    left:       '0px',
    width:      '100%',
    height:     height + 'px',
    lineHeight: height + 'px',
    background: '#' + item.backgroundColor,
    color:      '#' + item.fontColor,
    fontSize:   '16px',
    textAlign:  'center',
    zIndex:     '99999999',

    webkitUserSelect: 'none',
  };

  result[item.displayPosition] = '0px';

  if (item.status === 0) {
    result.display = 'none';
  }

  return result;
};

/**
 * @param {PageInfo} pageInfo
 */
const main = function(pageInfo) {
  return {
    /**
     * Determine CSS for body tag according to display position and current status.
     *
     * @param {string} displayPosition
     * @param {number} status The latest value should be passed.
     * @returns {Object}
     */
    forBody: function(displayPosition, status) {
      switch (displayPosition) {
        case 'top':
          return {
            marginTop: marginTop(pageInfo, status),
          };
        case 'bottom':
          return {
            marginBottom: marginBottom(pageInfo, status),
          };
        default:
          return {};
      }
    },
    forMessage: forMessage,
  };
};

module.exports.init = main;

/**
 * @typedef {Object} PageInfo
 * @property {PageBodyInfo} body
 */

/**
 * @typedef {Object} PageBodyInfo
 * @property {string} marginTop
 * @property {string} marginBottom
 */
