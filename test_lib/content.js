class Content {
  /**
   * @param {JQuery} $
   */
  constructor($) {
    /**
     * @private
     */
    this._$ = $;
  }

  page() {
    return new Page(this._$);
  }

  message() {
    return new Message(this._$);
  }
}

class Page {
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
   * @returns {string}
   */
  marginTop() {
    return this._body().css('margin-top');
  }

  /**
   * @returns {string}
   */
  marginBottom() {
    return this._body().css('margin-bottom');
  }

  /**
   * @returns {JQuery}
   * @private
   */
  _body() {
    return this._$('body');
  }
}

class Message {
  /**
   * @param {JQuery} $
   */
  constructor($) {
    /**
     * @private
     */
    this._$ = $;

    this._containerId = 'chrome-url-notification-container-9b7414d403c1287ca963';
  }

  /**
   * @returns {boolean}
   */
  exists() {
    return this._container().length === 1;
  }

  /**
   * @returns {boolean}
   */
  shown() {
    return this.exists() && this.css('display') === 'block';
  }

  /**
   * @returns {boolean}
   */
  hidden() {
    return this.exists() && this.css('display') === 'none';
  }

  /**
   * @param {string} property
   * @returns {string}
   */
  css(property) {
    return this._container().css(property);
  }

  /**
   * @param {string} text
   * @returns {boolean}
   */
  styleContains(text) {
    const styleAttr = this._container().attr('style') || '';

    return styleAttr.indexOf(text) >= 0;
  }

  mouseover() {
    this._container().trigger('mouseover');
  }

  mouseout() {
    this._container().trigger('mouseout');
  }

  /**
   * @private
   * @returns {jQuery}
   */
  _container() {
    return this._$('#' + this._containerId);
  }
}

module.exports = Content;
