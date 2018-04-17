
(function ($) {

  // Remove any olverlays on init.
  removeOverlay();
  var zoomRatio=((window.outerWidth - 8) / window.innerWidth)*100; //필요없음
   var pixelDim=window.devicePixelRatio;
  var overlay = $("<div id=\"snappinOverlay\"><div id=\"snappinClose\"></div></div>" ).appendTo("body");
  var windowWidth=$(window).width();
  var windowHeight=$(window).height();
  /**
   * Place area on mousedown.
   */
  overlay.mousedown(function (e) {

    $('#snappinArea').remove();
    var area = $("<div id=\"snappinArea\"></div>" ).appendTo(overlay);

    var pos = {
      left: e.pageX,
      top: e.pageY
    }

    // Set the position of the area.
    area.offset(pos);

    // Update area dimensions on mouse move.
    overlay.mousemove(function(e2) {
      area.width(e2.pageX - pos.left);
      area.height(e2.pageY - pos.top);
    });

    // On mouse up, we end the area update.
    overlay.mouseup(function() {
      overlay.unbind('mousemove');

      takeScreenshot(overlay, area);
    })


  });

  /**
   * Helper to remove overlay.
   */
  function removeOverlay() {
    $('#snappinOverlay, #snappinClose, #snappinArea').remove();
  }

  /**
   * Helper to initialise the screenshot for the given overlay and selected
   * area.
   */
  function takeScreenshot(overlay, area) {

    var overlayOffset = overlay.offset();
    var areaOffset = area.offset();

    // For avoiding the screenshot contains the border, we  have to do some math
    // +1, -2.
    // For some reason, removing the overlay before screenshotting does not help.
    /*var dim = {
      x: (areaOffset.left - overlayOffset.left)*1903/windowWidth + 1,
      y: (areaOffset.top - overlayOffset.top)*979/windowHeight + 1,
      w: area.outerWidth()*1903/windowWidth - 2,
      h: area.outerHeight()*979/windowHeight - 2
    };*/

//170 : 알고자하는 x 좌표 = 100 : x

    var dim = {
      x: (areaOffset.left - overlayOffset.left)*pixelDim + 1,
      y: (areaOffset.top - overlayOffset.top)*pixelDim + 1,
      w: area.outerWidth()*pixelDim - 2,
      h: area.outerHeight()*pixelDim - 2
    };
    console.log('dim', dim);

    // Send message to the backgrund page, so a screenshot can be taken.
    chrome.runtime.sendMessage({dimensions: dim}, function(response) {
      console.log(response);

      removeOverlay();
    });


  }


})(jQuery);
