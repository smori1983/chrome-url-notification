const { describe, beforeEach, afterEach, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/options.util.modal');
const testUtil = require('../../test_lib/util');

describe('app.options.util.modal', () => {
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(() => {
    testUtil.uiBase.initDom(testUtil.getHtml('test_resource/html/options.modal.01.html'));
  });
  afterEach(testUtil.uiBase.afterEach);

  it('show and hide', () => {
    const $ = require('jquery');
    const $modal = $('#modal');

    const modal = SUT.init('#modal');

    assert.strictEqual($modal.css('display'), 'none');

    modal.show();

    assert.strictEqual($modal.css('display'), 'block');

    modal.hide();

    assert.strictEqual($modal.css('display'), 'none');
  });

  it('with event handler', () => {
    const $ = require('jquery');
    const $modal = $('#modal');

    const modal = SUT.init('#modal', {
      'shown.bs.modal': () => {
        $('#modal').text('Activated');
      },
    });

    assert.strictEqual($modal.css('display'), 'none');
    assert.strictEqual($modal.text(), 'Modal');

    modal.show();

    assert.strictEqual($modal.css('display'), 'block');
    assert.strictEqual($modal.text(), 'Activated');
  });
});
