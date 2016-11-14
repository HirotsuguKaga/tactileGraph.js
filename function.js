var txt = document.querySelector('#txt');
var tg = tactileGraphic();
tg.setCanvas('a');

function drawGraph(){
  tg.clear();
  var x=y=lx=ly=0;
  tg.drawBraille('Function Graph'); //title
  tg.drawLine(0,400,599,400); //horizontal line
  tg.drawLine(295,30,295,744);// vertical line

  if(document.getElementById('bar').checked == true){/////////from Textarea////////
    var str = txt.value;
    str = str.replace(/　/g,"");
    str = str.replace(/＋/g,"+");
    str = str.replace(/－/g,"-");
    str = str.replace(/×/g,"*");
    str = str.replace(/０/g,"0");
    str = str.replace(/１/g,"1");
    str = str.replace(/２/g,"2");
    str = str.replace(/３/g,"3");
    str = str.replace(/４/g,"4");
    str = str.replace(/５/g,"5");
    str = str.replace(/６/g,"6");
    str = str.replace(/７/g,"7");
    str = str.replace(/８/g,"8");
    str = str.replace(/９/g,"9");
    str = str.replace(/[XＸｘ]/g,"x");
    str = str.replace(/([0-9])(x)/g,"$1*$2");
    for(var x= -200; x<59; x+=0.02){  /////
      y = Math.round(eval(str.toString())*-20+400);
      var X = Math.round(x*20) + 295;
      var len = Math.sqrt((lx-X)*(lx-X) + (ly-y)*(ly-y));
      if( len  > 5 && y > 30){
        tg.drawDot(X, y);
        lx = X;
        ly = y;
      }
    }
  }
  
  if(document.getElementById('pie').checked == true){ /////////////////////////////////
    for(var X= -200; X<59; X+=0.01){  /////
      y = Math.round((10/X)*-20+403);
      x = Math.round(X*20) + 295;
      var len = Math.sqrt((lx-x)*(lx-x) + (ly-y)*(ly-y));
      if( len  > 5 ){
        tg.drawDot(x, y);
        lx = x;
        ly = y;
      }
    }
  }
  
  if(document.getElementById('line').checked == true){ ////////line tg/////////////////////
    for(var X= -200; X<59; X+=0.01){  /////
      y = Math.round((X*X)*-5+400);
      x = Math.round(X*20) + 295;
      var len = Math.sqrt((lx-x)*(lx-x) + (ly-y)*(ly-y));
      if( len  > 5 ){
        tg.drawDot(x, y);
        lx = x;
        ly = y;
      }
    }
  }
  
  if(document.getElementById('band').checked == true){ ////////band tg/////////////////////
    var str = txt.value;
    for(var x= -200; x<59; x+=0.1){  /////
      y = eval(str)*-5+400;
      var X = x*10 + 295;
      var len = Math.sqrt((lx-X)*(lx-X) + (ly-y)*(ly-y));
      if( len  > 5 ){
        tg.drawDot(X, y);
        lx = X;
        ly = y;
      }
    }
  }
}


txt.onchange = function (){drawGraph();}
window.onload = function(){drawGraph();}


     ////////////////// Download process /////////////////
var filename = "Function Graph";

var edl = document.querySelector('#edl');
//var png = document.querySelector('#png');
var esa = document.querySelector('#esa');

edl.onclick = function() {
  var blob = new Blob([ tg.loadEdl() ], { "type" : "text/plain" });
  if (window.navigator.msSaveBlob) { 
    window.navigator.msSaveBlob(blob, filename + ".edl"); 
  } else {
    edl.download =  filename + ".edl";  //ダウンロードするファイル名を設定
    edl.href = window.URL.createObjectURL(blob);
  }
}

esa.onclick = function(){
  imgURL = tg.map2esa();
  var bin = atob(imgURL.split(',')[1]);
  var buffer = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) {
    buffer[i] = bin.charCodeAt(i);
  }
  var blob = new Blob([buffer.buffer], {type: 'image/png'});
  
  if (window.navigator.msSaveBlob) {
  window.navigator.msSaveBlob(blob, filename + '.png'); 
  } else {
    esa.download =  filename + ".png";
    esa.href = window.URL.createObjectURL(blob);
  }
}

