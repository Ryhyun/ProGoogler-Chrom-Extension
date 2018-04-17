$(document).ready(function(){
var num =document.getElementById('num');
      var n =getCookie('cookienum');
        var nn= parseInt(n);

        if( n == undefined){
            document.getElementById("settingnum").value= 10;
        }
        else {
            document.getElementById("settingnum").value = nn;
        }

    $("#temp").click(function(){
          var lang =$("#lang").val();
          var tabway = $("#settingtab").val();
          var tabnum = $("#settingnum").val();


          setCookie('cookienum',tabnum,'7');  // History 쿠키 개수  

          if(lang == "Eng"){
            setCookie('lan',"1",'7');
          }
          else{
            setCookie('lan',"0",'7');
          }


          if(tabway == "새탭에서 수행"){
            setCookie('tab',"0",'7');  // 새 탭    
                         
          }
          else{
            setCookie('tab',"1",'7');  // 기존 탭                        
          }

           location.reload();
  });
    $("#reset").click(function(){
      for(var i=0; getCookie("Cookie"+i)!= undefined ; i++){
        removeCookie("Cookie"+i);
        location.reload();
      }
    })
    
  
});