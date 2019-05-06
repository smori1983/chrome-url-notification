$(function() {

  /**
   * @param {FindResult} response
   */
  var process = function(response) {
    if (response.matched === false) {
      return;
    }

    var height = 50;

    var createCss = function() {
      var result = {
        position:   'fixed',
        left:       '0px',
        width:      '100%',
        height:     height + 'px',
        lineHeight: height + 'px',
        background: '#' + response.data.backgroundColor,
        color:      '#' + response.data.fontColor,
        fontSize:   '16px',
        textAlign:  'center',
        zIndex:     '99999999',

        webkitUserSelect: 'none',
      };

      result[response.data.displayPosition] = '0px';

      return result;
    };

    var container = $('<div>').
      attr('id', 'chrome-url-notification-container').
      css(createCss()).
      text(response.data.message);

    if (response.data.displayPosition === 'top') {
      //
      // workaround for "position: fixed;" page.
      //
      $('body').css({
        marginTop: (height + $('body').offset().top) + 'px',
      }).append(container);
    } else if (response.data.displayPosition === 'bottom') {
      $('body').css({
        marginBottom: height + 'px',
      }).append(container);
    }
  };

  chrome.runtime.sendMessage({ url: location.href }, process);

});
