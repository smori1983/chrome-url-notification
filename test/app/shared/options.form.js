const { it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../../test_lib/util');

// See: https://github.com/mochajs/mocha/wiki/Shared-Behaviours

module.exports.runError = function () {
  it('patten is required', function () {
    const form = testUtil.options.patternForm(this.$);

    form.pattern('');
    form.submit();

    assert.strictEqual(form.errorMessage('url'), 'This field is required.');
  });

  it('message is required', function () {
    const form = testUtil.options.patternForm(this.$);

    form.message('');
    form.submit();

    assert.strictEqual(form.errorMessage('msg'), 'This field is required.');
  });

  it('background color is required', function () {
    const form = testUtil.options.patternForm(this.$);

    form.backgroundColor('');
    form.submit();

    assert.strictEqual(form.errorMessage('background_color'), 'This field is required.');
  });

  it('background color should be valid color index', function () {
    const form = testUtil.options.patternForm(this.$);

    form.backgroundColor('#zzzzzz');
    form.submit();

    assert.strictEqual(form.errorMessage('background_color'), 'Invalid color index.');
  });

  it('modify value of display position', function () {
    this.$('input[name=display_position]').val('foo');

    const form = testUtil.options.patternForm(this.$);
    form.submit();

    assert.strictEqual(form.errorMessage('display_position'), 'Invalid choice.');
  });

  it('modify value of status', function () {
    this.$('#js_input_status').val('2');

    const form = testUtil.options.patternForm(this.$);
    form.status(true);
    form.submit();

    assert.strictEqual(form.errorMessage('status'), 'Invalid choice.');
  });

  it('open form and submit invalid inputs multiple times', function () {
    const form = testUtil.options.patternForm(this.$);

    form.pattern('');
    form.submit();

    testUtil.options.header(this.$).clickAdd();

    form.pattern('');
    form.submit();

    assert.strictEqual(form.errorMessage('url'), 'This field is required.');
  });
};
