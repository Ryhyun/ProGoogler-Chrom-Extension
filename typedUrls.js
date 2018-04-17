function onAnchorClick(event) {
    chrome.tabs.create({
        selected: true,
        url: event.srcElement.href
    });
    return false;
}

// Search history to find up to ten links that a user has typed in, and show those links in a popup.
function buildTypedUrlList(divName) {



    var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    var oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;
    var numRequestsOutstanding = 0;

    chrome.history.search({
        text: 'http://google.co.kr/search',
        'startTime': oneWeekAgo  // that was accessed less than one week ago.
    },
  function (historyItems) {
      for (var i = 0; i < historyItems.length; ++i) {
          var url = historyItems[i].url;
          var processVisitsWithUrl = function (url) {
              return function (visitItems) {
                  processVisits(url, visitItems);
              };
          };
          chrome.history.getVisits({ url: url }, processVisitsWithUrl(url));
          numRequestsOutstanding++;
      }
      if (!numRequestsOutstanding) {
          onAllVisitsProcessed();
      }
  });
    var urlToCount = {};
    var processVisits = function (url, visitItems) {
        for (var i = 0, ie = visitItems.length; i < ie; ++i) {
            urlToCount[url]++;
        }
        if (!--numRequestsOutstanding) {
            onAllVisitsProcessed();
        }
    };
    var onAllVisitsProcessed = function () {
        // Get the top scorring urls.
        urlArray = [];
        for (var url in urlToCount) {
            urlArray.push(url);
        }
        // Sort the URLs by the number of times the user typed them.
        urlArray.sort(function (a, b) {
            return urlToCount[b] - urlToCount[a];
        });
        var flag=0;
        
        
              if( flag==0) {
                  flag++;

                  var ul = document.createElement('ul');

                
                    //alert(getCookie("totalnum") );

                  //$("#history_url").append(img);

               $("#history_url").append(ul);

              var cookienum = getCookie('cookienum');
              if(cookienum == undefined)
                cookienum = 10;
              
              for(var i = 0 ; i < 1000 ; i++)
              {
                if(getCookie('Cookie'+i) == undefined)
                  {
                    var lastcookie = i;
                    break;
                  }
              }

              for(var i = lastcookie ; i >= lastcookie-cookienum ; i--)
              {
                    if(getCookie('Cookie'+i) != undefined ){

                        if(getCookie('Cookie'+i).indexOf('datadeleted')>-1){
                            continue;
                        }
                      var a = document.createElement('a');
                      a.href =  "https://www.google.co.kr/search?q="+ getCookie('Cookie'+i);
                      a.innerHTML= getCookie('Cookie'+i);

                      var li = document.createElement('li');
                        li.href ="https://www.google.co.kr/search?q="+ getCookie('Cookie'+i);
                      li.addEventListener('click', onAnchorClick);
                        var btn =document.createElement('button');
                        btn.id= 'Cookie'+i;

                        btn.onclick = function () {
                            event.cancelBubble=true;
                            setCookie(this.id,"datadeleted",7);
                            setCookie("flag",false,7);
                            location.reload();

                            return false;
                        };

                            li.appendChild(a);
                            li.appendChild(btn);
                            ul.appendChild(li);
                    }
              }
            }
              //buildPopupDom(divName, urlArray.slice(0, 5));   <a href='https://www.google.co.kr/search?q=
        
  
    };
}
// <img src="icon1/Eng/setting/fish.svg" >
document.addEventListener('DOMContentLoaded', function () {
    buildTypedUrlList("typedUrl_div");
});
