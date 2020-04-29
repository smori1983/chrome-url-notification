const { describe, before, beforeEach, after } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const SUT = require('../../src/js/app/background.badge');
const testUtil = require('../../test_lib/util');

describe('app.badge', function() {
  before(testUtil.background.before);
  beforeEach(testUtil.background.beforeEach);
  after(testUtil.background.after);

  given([
    {matched: true, status: 1, text: 'ON'},
    {matched: true, status: 0, text: 'OFF'},
    {matched: false, status: null, text: ''},
    {matched: false, status: 1, text: ''},
    {matched: false, status: 0, text: ''},
  ]).it('badge text based on match result and status', function (arg) {
    SUT.draw(10001, arg.matched, arg.status);

    assert.ok(testUtil.chrome.setBadgeTextShould(arg.text, 10001));
  });
});
