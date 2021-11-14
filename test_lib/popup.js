class Popup {
  /**
   * @param {jQuery} $
   */
  constructor($) {
    /**
     * @private
     */
    this._$ = $;
  }

  init() {
    this._$('#js_init').trigger('click');
  }

  matchedBlock() {
    return new MatchedBlock(this._$);
  }
}

class MatchedBlock {
  /**
   * @param {jQuery} $
   */
  constructor($) {
    /**
     * @private
     */
    this._$ = $;
  }

  /**
   * @returns {boolean}
   */
  shown() {
    return this._block().css('display') === 'block';
  }

  /**
   * @returns {boolean}
   */
  statusEnabled() {
    this._shouldShown();

    return this._status().prop('checked') === true;
  }

  clickStatus() {
    this._shouldShown();
    this._status().trigger('click');
  }

  /**
   * @private
   */
  _block() {
    return this._$('#block_for_matched_page');
  }

  /**
   * @private
   */
  _shouldShown() {
    if (this.shown() === false) {
      /* istanbul ignore next */
      throw new Error('matched block is not shown');
    }
  }

  /**
   * @private
   */
  _status() {
    return this._$('#pattern_status');
  }
}

module.exports = Popup;
