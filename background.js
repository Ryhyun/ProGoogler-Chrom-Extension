function background_test(){
 chrome.tabs.executeScript(null, { file: "bower_components/jquery/dist/jquery.js" }, function() {
    chrome.tabs.insertCSS(null, {file: "css/content.css"}, function() {
      chrome.tabs.executeScript(null, { file: "src/content.js" });
    });
  });

  chrome.runtime.onMessage.addListener(function getImage(request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.dimensions != undefined) {
      takeScreenshot(request.dimensions);
      sendResponse({farewell: "goodbye"});
    }
    chrome.runtime.onMessage.removeListener(getImage); //remove old listener in order to prevent to fire muliple pages
   });
}
function takeScreenshot(dimensions) {
  console.log("takeScreenshot run");
  chrome.tabs.captureVisibleTab({format: "png"}, function(img) {
    console.log(img);
    var url = img;
    snappinDataUrl.dataURLCrop(url, dimensions, function (croppedDataUrl) {
      snappinImgur.upload(croppedDataUrl, function(err, link, deleteData) {
        console.log(deleteData);
        // Give share URL
        var testURl = snappinPinterest.buildURL(link, 'http://undpaul.de', 'Test share');
        chrome.tabs.create({
          url: testURl
        });
      });

    });
  });
}
var snappinDataUrl = snappinDataUrl || {};

/**
 * Crops a given dataURL to the dimensions
 *
 * @param {String} dataURL
 * @param {Object} dimensions
 * @param {Integer} dimensions.x
 * @param {Integer} dimensions.y
 * @param {Integer} dimensions.w
 * @param {Integer} dimensions.h
 * @param {snappinDataUrl~dataURLCallback} callback
 */
snappinDataUrl.dataURLCrop = function (dataURL, dimensions, callback) {
  // We create a canvas element in the current document. Working with the
  // element seems to work without embedding it to the DOM, so we do not add it
  // to the actual DOM and simply use it as temporary container for our image
  // manipulation.
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  context.canvas.width = dimensions.w;
  context.canvas.height = dimensions.h;

  // load image from data url
  var imageObj = new Image();
  imageObj.onload = function() {
    context.drawImage(this, -1 * dimensions.x , -1 * dimensions.y);

    // Create new dataurl for cropped image.
    var croppedDataUrl = canvas.toDataURL();

    callback(croppedDataUrl);

  };
  imageObj.src = dataURL;
}



var snappinImgur = snappinImgur || {};

/**
 *
 * @param {string} dataUrl
 * @param {snappinImgur~uploadCallback} callback
 */
snappinImgur.upload = function(dataUrl, callback) {


  var xhr = new XMLHttpRequest();

  xhr.open("POST", "https://api.imgur.com/3/image", true);

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Client-ID 281b366e55f86e5');

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // JSON.parse does not evaluate the attacker's scripts.
      var resp = JSON.parse(xhr.responseText);
      console.log(resp);

      // In the case the request was succcesfull, we got some data, to pass to
      // our application.
      if (resp.success) {
        callback(null, resp.data.link, resp.data);
      }
      // Otherweise we got an error and pass that error object.
      else {
        callback(data);
      }

    }
  }

  // We only need the base64 part for our url to be shared.
  var dataBase64 = dataUrl.replace(/.*,/, '');

  var data = {
    image: dataBase64,
    type: "base64"
  };

  xhr.send(JSON.stringify(data));
}

/**
 * Callback for returning a data URl.
 *
 * @callback snappinImgur~uploadCallback
 *
 * @param {Object} err
 * @param {String} link
 * @param {Object} deleteData
 */


var snappinPinterest = snappinPinterest || {};
//   var testURl = snappinPinterest.buildURL(link, 'http://undpaul.de', 'Test share');
snappinPinterest.buildURL = function (imageURL, shareURL, description) {

  //var pinBase = "http://www.pinterest.com/pin/create/button/";
  var pinBase = " http://images.google.com/searchbyimage?image_url=";
 
  var imgEncoded = encodeURIComponent(imageURL);
  var shareURLEncoded = encodeURIComponent(shareURL);
  var descrEncoded = encodeURIComponent(description);

  // @todo: pinterest does not work with dara urls, so we may need a service
  // to build the url
  // maybe to imgur using
  // @see http://29a.ch/2011/9/11/uploading-from-html5-canvas-to-imgur-data-uri
  var url = pinBase;
 // url += '?url=' + shareURLEncoded;
 // url += '&media=' + imgEncoded
 // url += '&description=' + descrEncoded;
  url=url+imageURL;


  return url;
}
