const matchedBlock = () => {
  const $ = require('jquery');

  const block = () => {
    return $('#block_for_matched_page');
  };

  const shown = () => {
    return block().css('display') === 'block';
  };

  const shouldShown = () => {
    if (shown() === false) {
      /* istanbul ignore next */
      throw new Error('matched block is not shown');
    }
  };

  const status = () => {
    return $('#pattern_status');
  };

  return {
    /**
     * @returns {boolean}
     */
    shown: () => {
      return shown();
    },
    /**
     * @returns {boolean}
     */
    statusEnabled: () => {
      shouldShown();
      return status().prop('checked') === true;
    },
    clickStatus: () => {
      shouldShown();
      status().trigger('click');
    },
  };
};

module.exports.matchedBlock = matchedBlock;
