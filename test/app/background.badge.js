const { describe, before, beforeEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/background.badge');
const testUtil = require('../../test_lib/util');

describe('app.badge', function() {
  before(testUtil.background.before);
  beforeEach(testUtil.background.beforeEach);
  after(testUtil.background.after);

  it('draw - matched and enabled', function () {
    SUT.draw(10001, true, 1);

    assert.ok(testUtil.chrome.setBadgeTextShould('ON', 10001));
  });

  it('draw - matched and disabled', function () {
    SUT.draw(10002, true, 0);

    assert.ok(testUtil.chrome.setBadgeTextShould('OFF', 10002));
  });

  it('draw - not matched', function () {
    SUT.draw(10003, false, null);

    assert.ok(testUtil.chrome.setBadgeTextShould('', 10003));
  });

  it('draw - when not matched status is not used', function () {
    SUT.draw(10004, false, 1);

    assert.ok(testUtil.chrome.setBadgeTextShould('', 10004));
  });
});
