 $(document).ready(function(){
        $(".tabmenu").each(function(){
            var tab = $(this).children("ul");
            var tabBtn = tab.children("li").children("a");
            var content = tabBtn.nextAll();
             
            // 탭버튼을 클릭했을때
            tabBtn.click(function(){
                // 이미 on 상태면 pass
                if( $(this).hasClass("on") ) return;
 
                // 모든 컨텐츠 부분을 안보이게 한뒤
                content.hide();
 
                // 클릭한 tab 버튼(a태그) 옆의 모든 태그들은 보이도록
                $(this).nextAll().show();
                 
                // 모든탭 버튼에 있던 on 클래스를 빼고
                // 현재 클릭한 탭메뉴 버튼에 on 클래스 추가
                tabBtn.removeClass("on");
                $(this).addClass("on");
                 
                // 탭버튼를 쭉 돌면서 on 클래스가 있는 버튼만 on 이미지로 바꾸고
                // 나머지 버튼들은 off 이미지로 바꾼다.
                tabBtn.each(function(){
                    var src;
                    var img = $(this).children("img");
                    if( $(this).hasClass("on") ){
                        src = img.attr("src").replace("_off", "_on");
                    }else{
                        src = img.attr("src").replace("_on", "_off");
                    }
                     
                    img.attr("src", src);
                });
            });
            
            
            // 맨첫번째 탭버튼 클릭처리
           if( getCookie("flag")==undefined ){
                tabBtn.eq(0).click();
           
            }
            else{
                tabBtn.eq(1).click();  
                document.getElementById('history').click();
                removeCookie("flag");
            }

            
        });            
    });
 
function setCookie(name, value, day){
            var date = new Date();
            date.setDate(date.getDate() + day);

            var willCookie = '';
            willCookie +=name+'=' + encodeURIComponent(value) + ';';
            willCookie +='expires=' + date.toUTCString() +'';

            document.cookie = willCookie;
        }

        function getCookie(name){
            var cookies = document.cookie.split(';');

            for (var i in cookies){
                if(cookies[i].search(name) != -1){
                    return decodeURIComponent(cookies[i].replace(name + '=', ''));
                }
            }
        }

        function removeCookie(name){
            var date = new Date();
            date.setDate(date.getDate()-1);

            var willCookie = '';
            willCookie += name + '=remove;';
            willCookie += 'expires=' + date.toUTCString();

            document.cookie = willCookie;
        }
        

        //alert("here");    
        //removeCookie('Cookie');
        //alert(getCookie('Cookie'));
        
        //setCookie('Cookie','Cheese','7');
        
        //alert(getCookie('Cookie'));
        //removeCookie('Cookie');