class Popup {
  /**
   * @param {JQuery} $
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

  commonBlock() {
    return new CommonBlock(this._$);
  }

  matchedBlock() {
    return new MatchedBlock(this._$);
  }
}

class CommonBlock {
  /**
   * @param {JQuery} $
   */
  constructor($) {
    /**
     * @private
     */
    this._$ = $;
  }

  clickOptionsLink() {
    this._$('#link_options a').eq(0).trigger('click');
  }

  /**
   * @returns {string}
   */
  labelOptionsLink() {
    return this._$('#link_options a').eq(0).text();
  }
}

class MatchedBlock {
  /**
   * @param {JQuery} $
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
   * @returns {string}
   */
  labelStatus() {
    return this._$('#block_for_matched_page span').eq(0).text();
  }

  /**
   * @returns {string}
   */
  labelEnabled() {
    return this._$('#block_for_matched_page label').eq(0).text();
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
