const matchedBlock = function () {
  const $ = require('jquery');

  const block = function () {
    return $('#block_for_matched_page');
  };

  const shown = function() {
    return block().css('display') === 'block';
  };

  const shouldShown = function () {
    if (shown() === false) {
      throw new Error('matched block is not shown');
    }
  };

  const status = function () {
    return $('#pattern_status');
  };

  return {
    /**
     * @returns {boolean}
     */
    shown: function () {
      return shown();
    },
    /**
     * @returns {boolean}
     */
    statusEnabled: function () {
      shouldShown();
      return status().prop('checked') === true;
    },
    clickStatus: function () {
      shouldShown();
      status().trigger('click');
    },
  };
};

module.exports.matchedBlock = matchedBlock;
