const matchedBlock = function () {
  const $ = require('jquery');

  const getElement = function () {
    return $('#block_for_matched_page');
  };

  const getStatus = function () {
    return $('#pattern_status');
  };

  return {
    /**
     * @returns {boolean}
     */
    shown: function () {
      return getElement().css('display') === 'block';
    },
    /**
     * @returns {boolean}
     */
    statusIsEnabled: function () {
      return getElement().css('display') === 'block'
        && getStatus().prop('checked') === true;
    },
    clickStatus: function () {
      getStatus().trigger('click');
    },
  };
};

module.exports.matchedBlock = matchedBlock;
