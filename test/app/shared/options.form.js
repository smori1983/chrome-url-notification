const { it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../../test_lib/util');

module.exports.runError = () => {
  it('patten is required', () => {
    const form = testUtil.options.patternForm();

    form.pattern('');
    form.submit();

    assert.strictEqual(form.errorMessage('url'), 'This field is required.');
  });

  it('message is required', () => {
    const form = testUtil.options.patternForm();

    form.message('');
    form.submit();

    assert.strictEqual(form.errorMessage('msg'), 'This field is required.');
  });

  it('background color is required', () => {
    const form = testUtil.options.patternForm();

    form.backgroundColor('');
    form.submit();

    assert.strictEqual(form.errorMessage('background_color'), 'This field is required.');
  });

  it('background color should be valid color index', () => {
    const form = testUtil.options.patternForm();

    form.backgroundColor('#zzzzzz');
    form.submit();

    assert.strictEqual(form.errorMessage('background_color'), 'Invalid color index.');
  });

  it('modify value of display position', () => {
    const $ = require('jquery');
    $('input[name=display_position]').val('foo');

    const form = testUtil.options.patternForm();
    form.submit();

    assert.strictEqual(form.errorMessage('display_position'), 'Invalid choice.');
  });

  it('modify value of status', () => {
    const $ = require('jquery');
    $('#js_input_status').val('2');

    const form = testUtil.options.patternForm();
    form.status(true);
    form.submit();

    assert.strictEqual(form.errorMessage('status'), 'Invalid choice.');
  });

  it('open form and submit invalid inputs multiple times', () => {
    const form = testUtil.options.patternForm();

    form.pattern('');
    form.submit();

    testUtil.options.header().clickAdd();

    form.pattern('');
    form.submit();

    assert.strictEqual(form.errorMessage('url'), 'This field is required.');
  });
};
