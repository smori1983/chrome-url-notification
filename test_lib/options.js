const Color = require('color-js');

class Options {
  /**
   * @param {JQuery} $
   */
  constructor($) {
    /**
     * @private
     */
    this._$ = $;
  }

  header() {
    return new Header(this._$);
  }

  exportForm() {
    return new ExportForm(this._$);
  }

  importForm() {
    return new ImportForm(this._$);
  }

  list() {
    return new List(this._$);
  }

  patternForm() {
    return new PatternForm(this._$);
  }

  deleteForm() {
    return new DeleteForm(this._$);
  }
}

class Header {
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
  version() {
    return this._$('#js_version').text();
  }

  clickAdd() {
    this._$('#js_button_add_pattern').trigger('click');
  }

  clickExport() {
    this._$('#js_button_export').trigger('click');
  }

  clickImport() {
    this._$('#js_button_import').trigger('click');
  }
}

class FormBase {
  /**
   * In the jsdom testing, detect modal is activated by checking
   * that element has following class attributes.
   *
   * - modal
   * - in
   *
   * @param {JQuery} element
   * @returns {boolean}
   * @protected
   */
  _modalIsActivated(element) {
    return element.hasClass('modal') && element.hasClass('in');
  }

  /**
   * @param {JQuery} element
   * @throws {Error}
   * @protected
   */
  _modalShouldActivated(element) {
    if (this._modalIsActivated(element) === false) {
      /* istanbul ignore next */
      throw new Error('modal is not activated');
    }
  }
}

class ExportForm extends FormBase {
  /**
   * @param {JQuery} $
   */
  constructor($) {
    super();

    /**
     * @private
     */
    this._$ = $;
  }

  /**
   * @returns {boolean}
   */
  shown() {
    return this._modalIsActivated(this._$('#js_modal_export'));
  }

  json() {
    this._modalShouldActivated(this._$('#js_modal_export'));

    return JSON.parse(this._$('#js_export_display').text());
  }

  /**
   * @returns {string}
   */
  labelCopyButton() {
    return this._$('#js_export_copy').text();
  }
}

class ImportForm extends FormBase {
  /**
   * @param {JQuery} $
   */
  constructor($) {
    super();

    /**
     * @private
     */
    this._$ = $;
  }

  /**
   * @returns {boolean}
   */
  shown() {
    return this._modalIsActivated(this._$('#js_modal_import'));
  }

  /**
   * @param {string} input
   */
  json(input) {
    this._modalShouldActivated(this._$('#js_modal_import'));
    this._$('#js_form_import_json').val(input);
  }

  submit() {
    this._modalShouldActivated(this._$('#js_modal_import'));
    this._$('#js_form_import_submit').trigger('click');
  }

  /**
   * @returns {string}
   */
  errorMessage() {
    this._modalShouldActivated(this._$('#js_modal_import'));

    return this._$('#js_import_message').text();
  }
}

class List {
  /**
   * @param {JQuery} $
   */
  constructor($) {
    /**
     * @private
     */
    this._$ = $;
  }

  reload() {
    this._$('#js_list_pattern_reload').trigger('click');
  }

  /**
   * @returns {string}
   */
  badge() {
    return this._$('#js_pattern_list_badge').text();
  }

  /**
   * @returns {JQuery}
   */
  header() {
    return this._$('#js_list_pattern thead').find('tr');
  }

  /**
   * @returns {number}
   */
  numOfItems() {
    return this._all().length;
  }

  /**
   * @param {number} index
   */
  item(index) {
    return new ListItem(this._$(this._all()[index]));
  }

  /**
   * @returns {JQuery}
   * @private
   */
  _all() {
    return this._$('#js_list_pattern tbody').find('tr');
  }
}

class ListItem {
  /**
   * @param {jQuery} item
   */
  constructor(item) {
    /**
     * @private
     */
    this._item = item;
  }

  /**
   * @returns {string}
   */
  pattern() {
    return this._item.find('.pattern').text();
  }

  /**
   * @returns {string}
   */
  message() {
    return this._item.find('.list-message').text();
  }

  /**
   * @returns {string}
   */
  backgroundColor() {
    const color = Color(this._item.find('.list-message').css('background-color'));

    return color.toCSS();
  }

  /**
   * @returns {string}
   */
  displayPosition() {
    return this._item.find('.display_position').text();
  }

  /**
   * @returns {string}
   */
  status() {
    return this._item.find('.status').text();
  }

  clickCopy() {
    this._item.find('.copy_button').trigger('click');
  }

  clickEdit() {
    this._item.find('.edit_button').trigger('click');
  }

  clickDelete() {
    this._item.find('.delete_button').trigger('click');
  }
}

class PatternForm extends FormBase {
  /**
   * @param {JQuery} $
   */
  constructor($) {
    super();

    /**
     * @private
     */
    this._$ = $;
  }

  /**
   * @returns {boolean}
   */
  shown() {
    return this._modalIsActivated(this._$('#js_modal_pattern'));
  }

  /**
   * @param {string} [value]
   * @returns {string}
   */
  pattern(value) {
    this._modalShouldActivated(this._$('#js_modal_pattern'));

    const element = this._$('#js_input_url');

    if (typeof value === 'string') {
      element.val(value);
    }

    return element.val();
  }

  /**
   * @param {string} [value]
   * @returns {string}
   */
  message(value) {
    this._modalShouldActivated(this._$('#js_modal_pattern'));

    const element = this._$('#js_input_msg');

    if (typeof value === 'string') {
      element.val(value);
    }

    return element.val();
  }

  /**
   * @param {string} [value]
   * @returns {string}
   */
  backgroundColor(value) {
    this._modalShouldActivated(this._$('#js_modal_pattern'));

    const element = this._$('#js_input_background_color');

    if (typeof value === 'string') {
      element.val(value);
    }

    return element.val();
  }

  /**
   * @param {string} [value]
   * @returns {string}
   */
  displayPosition(value) {
    this._modalShouldActivated(this._$('#js_modal_pattern'));

    const form = this._$('#js_form_pattern');

    if (typeof value === 'string') {
      form.find('input[name=display_position]').val(value);
    }

    return form.find('input[name=display_position]:checked').val();
  }

  /**
   * @param {boolean} [value]
   * @returns {boolean}
   */
  status(value) {
    this._modalShouldActivated(this._$('#js_modal_pattern'));

    const element = this._$('#js_input_status');

    if (typeof value === 'boolean') {
      element.prop('checked', value);
    }

    return element.prop('checked');
  }

  submit() {
    this._modalShouldActivated(this._$('#js_modal_pattern'));
    this._$('#js_form_pattern_submit').trigger('click');
  }

  clear() {
    this._modalShouldActivated(this._$('#js_modal_pattern'));
    this._$('#js_form_pattern_clear').trigger('click');
  }

  cancel() {
    this._modalShouldActivated(this._$('#js_modal_pattern'));
    this._$('#js_form_pattern_cancel').trigger('click');
  }

  /**
   * @param {string} name
   * @returns {string}
   */
  errorMessage(name) {
    this._modalShouldActivated(this._$('#js_modal_pattern'));

    return this._$('#js_input_' + name + '-error').text();
  }
}

class DeleteForm extends FormBase {
  /**
   * @param {JQuery} $
   */
  constructor($) {
    super();

    /**
     * @private
     */
    this._$ = $;
  }

  /**
   * @returns {boolean}
   */
  shown() {
    return this._modalIsActivated(this._$('#js_modal_delete'));
  }

  /**
   * @returns {string}
   */
  pattern() {
    this._modalShouldActivated(this._$('#js_modal_delete'));

    return this._$('#js_form_delete_pattern').text();
  }

  /**
   * @returns {string}
   */
  message() {
    this._modalShouldActivated(this._$('#js_modal_delete'));

    return this._$('#js_form_delete_message').text();
  }

  submit() {
    this._modalShouldActivated(this._$('#js_modal_delete'));
    this._$('#js_form_delete_submit').trigger('click');
  }

  cancel() {
    this._modalShouldActivated(this._$('#js_modal_delete'));
    this._$('#js_form_delete_cancel').trigger('click');
  }
}

module.exports = Options;
