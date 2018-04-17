$(document).ready(function(){   
     // console.log("ready");
      $("#imgbtn").click(function() { 
      $("#imgbtn").attr("src","icon2/Google_20160406/SearchImage_Button_on.svg");
      
      //alert("search run");

      chrome.extension.getBackgroundPage().background_test();
    });
    $("#FileExtention").click(function(){
     $("img#FileExtention").replaceWith(       '<input type="text" id="FileExtention"        placeholder="FileExtention"         style=" float: left ; width:170px; height: 29px; text-align: center; font-size: 13px;  margin-left:12px; border:2px solid #f5f5f5; margin-top:1px; "/>');
    });
    $("#RestrictionToTheSite").click(function(){
     $("img#RestrictionToTheSite").replaceWith('<input type="text" id="RestrictionToTheSite" placeholder="RestrictionToTheSite"  style=" float: right ; width:170px; height: 29px; text-align: center; font-size: 13px;  margin-right:12px;border:2px solid #f5f5f5; margin-top:1px; "/>');
    });
    
    $("#DateRange").click(function(){
     $("img#DateRange").replaceWith(          '<input type="text" id="DateRange"    placeholder="yyyy"     style=" float: left ; width:40px; height: 29px; margin-top:1px; margin-left:4px; text-align: center; font-size: 13px; border:2px solid #f5f5f5; "/><input type="text" id="sm"    placeholder="mm"     style=" float: left ; width:20px; height:29px; margin-top:1px; text-align: center; font-size: 13px; border:2px solid #f5f5f5; "/><input type="text" id="sd"    placeholder="dd"     style=" float: left ; width:20px; height: 29px;margin-top:1px;  text-align: center; border:2px solid #f5f5f5;font-size: 13px;  "/><input type="text" id="ey"    placeholder="yyyy"     style=" float: left ; width:40px; height: 29px; margin-top:1px; text-align: center; font-size: 13px; border:2px solid #f5f5f5; "/><input type="text" id="em"    placeholder="mm"     style=" float: left ; width:20px; margin-top:1px; height: 29px;  text-align: center; font-size: 13px; border:2px solid #f5f5f5; "/><input type="text" id="ed"    placeholder="dd"     style=" float: left ; width:20px; height: 29px;  margin-top:1px; text-align: center; font-size: 13px; border:2px solid #f5f5f5; "/>');
    });

    $("#NumberRange").click(function(){
     $("img#NumberRange").replaceWith(         '<input type="text" id="NumberRange2"         placeholder="Endnumber"           style=" float: right ; width:80px; height: 29px; text-align: center; margin-top:1px;  font-size: 13px;border:2px solid #f5f5f5; margin-right:12px;"/><input type="text" id="NumberRange"         placeholder="Startnumber"           style=" float: right ; width:80px; height:29px;text-align: center; font-size: 13px;border:2px solid #f5f5f5; margin-top:1px; margin-right: 4px;"/>');
    });
    $("#Link").click(function(){
     $("img#Link").replaceWith(                '<input type="text" id="Link"               placeholder="Link"                   style=" float: left ; width:170px; height: 29px ;text-align: center;margin-top:1px;  font-size: 13px; border:2px solid #f5f5f5; margin-left:12px;"/>');
    });
    $("#URL").click(function(){
     $("img#URL").replaceWith(                 '<input type="text" id="URL"               placeholder="URL"                     style=" float: right ; width:170px; height: 29px; text-align: center; margin-top:1px; font-size: 13px;border:2px solid #f5f5f5; margin-right:12px;"/>');
    });
    $("#Title").click(function(){
     $("img#Title").replaceWith(               '<input type="text" id="Title"             placeholder="Title"                   style=" float: left ; width:170px; height: 29px; text-align: center; font-size: 13px; margin-top:1px; border:2px solid #f5f5f5; margin-left:12px;"/>');
    });
    $("#HashTag").click(function(){
     $("img#HashTag").replaceWith(             '<input type="text" id="HashTag"            placeholder="HashTag"               style=" float: right ; width:170px; height: 29px; text-align: center; font-size: 13px; margin-top:1px; border:2px solid #f5f5f5;margin-right:12px;"/>');
    });

    
    var tab= document.getElementById('settingtab');
     if(getCookie('tab') == 0)
    {
          tab.innerHTML='  <option selected>New tab</option> <option>Current tab</option> ';
    }
    else
    {
          tab.innerHTML='  <option >New tab</option> <option selected>Current tab</option> ';
    }
    var lang= document.getElementById('lang');
	var oper=document.getElementById('operators');
	var bar =document.getElementById('bar');
	
    if(getCookie('lan')==0){
        lang.innerHTML= ' <option selected >Kor</option> <option >Eng</option> ';
        bar.innerHTML= '<img src="icon1/Kor/operator/bar.svg" style="width :400px; margin-top:5px;" />'
        $("#imglang").attr("src","icon1/Kor/setting/langue.svg");
        $("#imgresult").attr("src","icon1/Kor/setting/result.svg");
        $("#imgmaxnum").attr("src","icon1/Kor/setting/history_maxnum.svg");
        $("#FileExtention").attr("src","icon1/Kor/operator/operators-filetype.svg");
        $("#RestrictionToTheSite").attr("src","icon1/Kor/operator/operators-site.svg");
        $("#DateRange").attr("src","icon1/Kor/operator/operators-daterange.svg");
        $("#NumberRange").attr("src","icon1/Kor/operator/operators-numrange.svg");
        $("#Link").attr("src","icon1/Kor/operator/operators-link.svg");
        $("#URL").attr("src","icon1/Kor/operator/operators-url.svg");
        $("#Title").attr("src","icon1/Kor/operator/operators-title.svg");
        $("#HashTag").attr("src","icon1/Kor/operator/operators-hashtag.svg");
        $("#tip").attr("src","icon2/Google_20160406/tips-body-kor.svg");
        $("#base").attr("placeholder","메인검색어");
        $("#except").attr("placeholder","제외(-)")
        $("#or").attr("placeholder","또는(OR)")
        $("#necessary").attr("placeholder",'반드시 포함("...")')
    }
    else{
        lang.innerHTML= ' <option >Kor</option> <option selected>Eng</option> ';

        bar.innerHTML= '<img src="icon1/Eng/operator/bar.svg" style="width :400px; margin-top:5px;" />';
        $("#imglang").attr("src","icon1/Eng/setting/langue.svg");
        $("#imgresult").attr("src","icon1/Eng/setting/result.svg");
        $("#imgmaxnum").attr("src","icon1/Eng/setting/history_maxnum.svg");
        $("#FileExtention").attr("src","icon1/Eng/operator/operators-filetype.svg");
        $("#RestrictionToTheSite").attr("src","icon1/Eng/operator/operators-site.svg");
        $("#DateRange").attr("src","icon1/Eng/operator/operators-daterange.svg");
        $("#NumberRange").attr("src","icon1/Eng/operator/operators-numrange.svg");
        $("#Link").attr("src","icon1/Eng/operator/operators-link.svg");
        $("#URL").attr("src","icon1/Eng/operator/operators-url.svg");
        $("#Title").attr("src","icon1/Eng/operator/operators-title.svg");
        $("#HashTag").attr("src","icon1/Eng/operator/operators-hashtag.svg");
        $("#tip").attr("src","icon2/Google_20160406/tips-body-eng.svg");
        $("#base").attr("placeholder","Main Search words");
        $("#except").attr("placeholder","without(-)")
        $("#or").attr("placeholder","Or(OR)")
        $("#necessary").attr("placeholder",'Must("...")')
    }
    $("#refresh").click(function(){
    	 location.reload();
    });
        $("#help").click(function(){
       window.open("help.html", "pop", "width=600,height=400,history=no,resizable=no,status=no,scrollbars=yes,menubar=no")
    });


  });

  

function showIndex() {
    var searching_word=document.getElementById("base").value;
    var temp;
    var fw = searching_word;

    temp =document.getElementById("except").value;
    if( temp != ""){
      temp = " -"+temp;
      searching_word += temp;
    }
    temp =  document.getElementById("or").value;
    if(temp !=""){
      temp = " "+fw+" OR "+temp;
      searching_word += temp;
    }
    temp =document.getElementById("necessary").value;
    if( temp !="" ){
        temp = ' "'+temp+'"';
        searching_word += temp;
    }
    temp =document.getElementById("FileExtention").value;
    if( temp !="" && temp !=undefined){
        temp = " filetype:"+temp;
        searching_word += temp;
    }
    temp = document.getElementById("RestrictionToTheSite").value ;
    if( temp!="" && temp !=undefined){
        temp = " site:"+temp;
        searching_word += temp;
    }

    if( document.getElementById("DateRange").value != undefined){
        var sy = document.getElementById("DateRange").value;
        var sm= document.getElementById("sm").value;
        var sd= document.getElementById("sd").value;
        var ey = document.getElementById("ey").value;
        var em = document.getElementById("em").value;
        var ed = document.getElementById("ed").value;
        if(  sy !="" && sy !=undefined){
            temp = " daterange:"+juliandata(sy,sm,sd) +"-"+ juliandata(ey,em,ed);
            searching_word+= temp;
        }
    }
      temp= document.getElementById("NumberRange").value ;
      if( temp!="" && temp !=undefined){
        var temp2 = document.getElementById("NumberRange2").value ;
        temp = " "+temp+".."+temp2;
        searching_word+= temp;
      }


    temp = document.getElementById("Link").value;
    if( temp !="" && temp !=undefined) {
        temp = " link:"+temp;
        searching_word+=temp;
    }
    temp =  document.getElementById("URL").value ;
    if(temp!="" && temp !=undefined){
        temp= " inurl:"+temp;
        searching_word+=temp;
    }
    temp = document.getElementById("Title").value  ;
    if( temp !="" && temp !=undefined){
        temp= " intitle:"+temp;
        searching_word+=temp;
    }
    temp  = document.getElementById("HashTag").value ;
    if(temp !="" && temp !=undefined){
        temp= " #"+temp;
        searching_word+=temp;
    }
    if(searching_word !=""  && searching_word !=" "  && searching_word !="  " ) {
        for (var i = 0; i < 1000; i++) {
            if (getCookie('Cookie' + i) == undefined) {
                setCookie('Cookie' + i, searching_word, '7');
                //console.log("here");


                break;
            }
        }

    }
    var index_url = "https://www.google.co.kr/search?q="+searching_word;

    if(getCookie('tab') == 0)
    {
      chrome.tabs.create({
        	url: index_url          
      });

    }
    else
    {
     
     chrome.tabs.update({
          url: index_url          

      }); 
     location.reload();
    }


}
function juliandata(y,m,d){

    var MM=m*1;
    var DD=d*1;
    var YY=y*1;
    var HR=0;
    var MN=0;
    var SC=0;
    with (Math) {  
      HR = HR + (MN / 60) + (SC/3600);
      GGG = 1;
      if (YY <= 1585) GGG = 0;
      JD = -1 * floor(7 * (floor((MM + 9) / 12) + YY) / 4);
      S = 1;
      if ((MM - 9)<0) S=-1;
      A = abs(MM - 9);
      J1 = floor(YY + S * floor(A / 7));
      J1 = -1 * floor((floor(J1 / 100) + 1) * 3 / 4);
      JD = JD + floor(275 * MM / 9) + DD + (GGG * J1);
      JD = JD + 1721027 + 2 * GGG + 367 * YY - 0.5;
      JD = JD + (HR / 24);
    }
    JD= parseInt(JD);
    return JD;
}

$("#base").keyup(function(event) {
      if (event.keyCode == '13') {
         if ($(this).val().length > 0)
            $("#index").click();
      
         return false;
      }
      return true;
   });


document.getElementById('index').addEventListener("click", showIndex);

