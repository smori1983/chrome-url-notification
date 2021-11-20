const sprintf = require('sprintf-js').sprintf;
const Config = require('../url-notification/config');

const config = new Config();

/**
 * @returns {number}
 */
const barHeight = () => {
  return config.defaultBarHeight();
};

/**
 * @returns {number}
 */
const circleDiameter = () => {
  return config.defaultCircleDiameter();
};

/**
 * @returns {number}
 */
const cornerSpace = () => {
  return config.defaultCornerSpace();
};

/**
 * @param {PageInfo} pageInfo
 * @param {number} status
 * @returns {string}
 */
const marginTop = (pageInfo, status) => {
  if (status === 1) {
    return barHeight() + 'px';
  } else {
    return pageInfo.body.marginTop;
  }
};

/**
 * @param {PageInfo} pageInfo
 * @param {number} status
 * @returns {string}
 */
const marginBottom = (pageInfo, status) => {
  if (status === 1) {
    return barHeight() + 'px';
  } else {
    return pageInfo.body.marginBottom;
  }
};

/**
 * @param {string} displayPosition
 * @returns {boolean}
 */
const isBarType = (displayPosition) => {
  const targets = [
    'top',
    'bottom',
  ];

  return targets.indexOf(displayPosition) >= 0;
};

/**
 * @param {string} displayPosition
 * @returns {boolean}
 */
const isCornerType = (displayPosition) => {
  const targets = [
    'top_left',
    'top_right',
    'bottom_left',
    'bottom_right',
  ];

  return targets.indexOf(displayPosition) >= 0;
};

/**
 * @param {PageInfo} pageInfo
 */
const main = (pageInfo) => {
  return {
    /**
     * Determine CSS for body tag according to display position and current status.
     *
     * @param {string} displayPosition
     * @param {number} status The latest value should be passed.
     * @returns {Object}
     */
    forBody: (displayPosition, status) => {
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
    forMessage: (item) => {
      // Common properties.
      const result = {
        position: 'fixed',
        background: '#' + item.backgroundColor,
        color: '#' + item.fontColor,
        fontSize: '16px',
        textAlign: 'center',
        overflow: 'hidden',
        zIndex: '99999999',
        webkitUserSelect: 'none',
      };

      if (isBarType(item.displayPosition)) {
        result.left = '0px';
        result.width = '100%';
        result.height = barHeight() + 'px';
        result.lineHeight = barHeight() + 'px';
      }

      if (item.displayPosition === 'top') {
        result.top = '0px';
      }

      if (item.displayPosition === 'bottom') {
        result.bottom = '0px';
      }

      if (isCornerType(item.displayPosition)) {
        result.width = circleDiameter() + 'px';
        result.height = circleDiameter() + 'px';
        result.lineHeight = circleDiameter() + 'px';
        result.transition = 'width 0.3s 0.1s';
        result.webkitBorderRadius = sprintf('%dpx', circleDiameter() / 2);
      }

      if (item.displayPosition === 'top_left') {
        result.top = cornerSpace() + 'px';
        result.left = cornerSpace() + 'px';
      }

      if (item.displayPosition === 'top_right') {
        result.top = cornerSpace() + 'px';
        result.right = cornerSpace() + 'px';
      }

      if (item.displayPosition === 'bottom_left') {
        result.bottom = cornerSpace() + 'px';
        result.left = cornerSpace() + 'px';
      }

      if (item.displayPosition === 'bottom_right') {
        result.bottom = cornerSpace() + 'px';
        result.right = cornerSpace() + 'px';
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
    forMessageMouseOver: (item) => {
      if (isCornerType(item.displayPosition)) {
        return {
          width: sprintf('calc(100%% - %dpx)', cornerSpace() * 2),
        };
      } else {
        return {};
      }
    },
    /**
     * Determine CSS for mouseout event.
     *
     * @param {FoundItem} item
     * @returns {Object}
     */
    forMessageMouseOut: (item) => {
      if (isCornerType(item.displayPosition)) {
        return {
          width: circleDiameter() + 'px',
        };
      } else {
        return {};
      }
    },
  };
};

module.exports.init = main;
