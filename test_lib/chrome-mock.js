const I18nPlugin = require('sinon-chrome/plugins/i18n');
const factory = require('./factory');
const file = require('./file');

class ChromeMock {
  /**
   * @param {SinonChrome} chrome
   */
  constructor(chrome) {
    /**
     * @type {SinonChrome}
     * @private
     */
    this._chrome = chrome;

    /**
     * @type {SinonChrome.runtime}
     * @private
     */
    this._runtime = chrome.runtime;

    /**
     * @type {SinonChrome.tabs}
     * @private
     */
    this._tabs = chrome.tabs;
  }

  i18n(locale) {
    const path = 'src/_locales/' + locale + '/messages.json';
    const message = file.read(path);

    this._chrome.registerPlugin(new I18nPlugin(JSON.parse(message)));
  }

  /**
   * @param {string} request
   * @param {string} result
   */
  getURL(request, result) {
    this._runtime.getURL
      .withArgs(request)
      .returns(result);
  }

  /**
   * Ensure chrome.tabs.create() called with argument.
   *
   * @param {string} url
   * @returns {boolean}
   */
  tabsCreateCalledWith(url) {
    return this._tabs.create
      .withArgs({
        url: url,
      })
      .calledOnce;
  }

  contentFindMessage() {
    return this._createReqAndRes((req, res) => {
      this._runtime.sendMessage
        .withArgs({
          command: 'content_scripts:find',
          data: {
            url: req.url,
          },
        })
        .callArgWith(1, {
          matched: res.item !== null,
          data: res.item,
        });
    });
  }

  /**
   * chrome.runtime.onMessage() for 'content:tab:notify:status'
   *
   * @param {string} displayPosition
   * @param {number} status
   */
  contentTabNotifyStatusDispatch(displayPosition, status) {
    this._runtime.onMessage
      .dispatch({
        command: 'tab:notify:status',
        data: {
          item: factory.makeFoundItem({
            displayPosition: displayPosition,
            status: status,
          }),
        },
      });
  }

  popupFindMessage() {
    return this._createReqAndRes((req, res) => {
      this._runtime.sendMessage
        .withArgs({
          command: 'browser_action:find',
          data: {
            url: req.tab.url,
          },
        })
        .callArgWith(1, {
          matched: res.item !== null,
          data: res.item,
        });
    });
  }

  /**
   * Ensure chrome.tabs.sendMessage() for 'tab:notify:status' command called with arguments.
   *
   * @param {number} tabId
   * @param {FindResult} item
   * @param {number} status
   * @returns {boolean}
   */
  popupTabNotifyStatusCalledWith(tabId, item, status) {
    return this._tabs.sendMessage
      .withArgs(tabId, {
        command: 'tab:notify:status',
        data: {
          item: item,
          status: status,
        },
      })
      .calledOnce;
  }

  popupTabsQuery() {
    return this._createReqAndRes((req, res) => {
      this._tabs.query
        .withArgs({
          currentWindow: true,
          active: true,
        })
        .callArgWith(1, [{
          id: res.id,
          url: res.url,
        }]);
    });
  }

  popupUpdateStatus() {
    return this._createReqAndRes((req, res) => {
      this._runtime.sendMessage
        .withArgs({
          command: 'browser_action:update:status',
          data: {
            url: req.url,
            status: req.status,
            tabId: req.tabId,
          },
        })
        .callsArgWith(1, {
          item: res.item,
          status: req.status,
        });
    });
  }

  /**
   * Ensure chrome.runtime.sendMessage() for 'browser_action:update:status' command called with arguments.
   *
   * @param {number} tabId
   * @param {string} url
   * @param {number} status
   * @returns {boolean}
   */
  popupUpdateStatusCalledWith(tabId, url, status) {
    return this._runtime.sendMessage
      .withArgs({
        command: 'browser_action:update:status',
        data: {
          url: url,
          status: status,
          tabId: tabId,
        },
      })
      .calledOnce;
  }

  /**
   * @private
   */
  _createReqAndRes(run) {
    return {
      req: (req) => {
        return {
          res: (res) => {
            run(req, res);
          },
        };
      },
    };
  }
}

module.exports = ChromeMock;
