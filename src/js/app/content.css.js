'use strict';

const sprintf = require('sprintf-js').sprintf;
const height = 50;
const cornerSpace = 10;

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
    forBody: function (displayPosition, status) {
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
    /**
     * Determine CSS for message area.
     *
     * @param {FoundItem} item
     * @returns {Object}
     */
    forMessage: function (item) {
      // Common properties.
      const result = {
        position: 'fixed',
        height: height + 'px',
        lineHeight: height + 'px',
        background: '#' + item.backgroundColor,
        color: '#' + item.fontColor,
        fontSize: '16px',
        textAlign: 'center',
        overflow: 'hidden',
        zIndex: '99999999',
        webkitUserSelect: 'none',
      };

      if (item.displayPosition === 'top') {
        result.top = '0px';
        result.left = '0px';
        result.width = '100%';
      }

      if (item.displayPosition === 'bottom') {
        result.bottom = '0px';
        result.left = '0px';
        result.width = '100%';
      }

      if (item.displayPosition === 'top_left') {
        result.top = cornerSpace + 'px';
        result.left = cornerSpace + 'px';
        result.width = height + 'px';
        result.transition = 'width 0.3s 0.1s';
        result.webkitBorderRadius = sprintf('%dpx', height / 2);
      }

      if (item.displayPosition === 'top_right') {
        result.top = cornerSpace + 'px';
        result.right = cornerSpace + 'px';
        result.width = height + 'px';
        result.transition = 'width 0.3s 0.1s';
        result.webkitBorderRadius = sprintf('%dpx', height / 2);
      }

      if (item.displayPosition === 'bottom_left') {
        result.bottom = cornerSpace + 'px';
        result.left = cornerSpace + 'px';
        result.width = height + 'px';
        result.transition = 'width 0.3s 0.1s';
        result.webkitBorderRadius = sprintf('%dpx', height / 2);
      }

      if (item.displayPosition === 'bottom_right') {
        result.bottom = cornerSpace + 'px';
        result.right = cornerSpace + 'px';
        result.width = height + 'px';
        result.transition = 'width 0.3s 0.1s';
        result.webkitBorderRadius = sprintf('%dpx', height / 2);
      }

      // Initially hide element regardless of status.
      result.display = 'none';

      return result;
    },
    /**
     * Determine CSS for mouseover event.
     *
     * @param {FoundItem} item
     * @returns {Object}
     */
    forMouseOver: function (item) {
      switch (item.displayPosition) {
        case 'top_left':
        case 'top_right':
        case 'bottom_left':
        case 'bottom_right':
          return {
            width: sprintf('calc(100%% - %dpx)', cornerSpace * 2),
          };
        default:
          return {};
      }
    },
    /**
     * Determine CSS for mouseout event.
     *
     * @param {FoundItem} item
     * @returns {Object}
     */
    forMouseOut: function (item) {
      switch (item.displayPosition) {
        case 'top_left':
        case 'top_right':
        case 'bottom_left':
        case 'bottom_right':
          return {
            width: height + 'px',
          };
        default:
          return {};
      }
    },
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
