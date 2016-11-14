var txt = document.querySelector('#txt');
var tg = tactileGraphic();
tg.setCanvas('a');

function drawGraph(){
  tg.clear();
  var x=y=lx=ly=0;
  tg.drawBraille('Function Graph');
  tg.drawLine(0,400,599,400);
  tg.drawLine(295,30,295,744);

  if(document.getElementById('bar').checked == true){/////////from Textarea////////
    var str = txt.value;
    for(var x= -200; x<59; x+=0.02){  /////
      y = Math.round(eval(str)*-20+400);
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

     //////////////////download/////////////////
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

