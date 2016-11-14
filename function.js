var txt = document.querySelector('#txt');
var txt2 = document.querySelector('#txt2');
var scale = document.getElementById('scale');
var tg = tactileGraphic();
tg.setCanvas('a');

function drawGraph(){
  tg.clear();
  var x=y=lx=ly=0;
  tg.drawBraille('Function Graph'); // title
  tg.drawLine(0, 400, 599, 400);       // horizontal line
  tg.drawLine(295, 30, 295, 744);      // vertical line

  if(scale.checked == true){
    tg.drawLine(395, 405, 395, 417);  // thick
    tg.drawBraille('5', 395, 420);    // scale
    tg.drawLine(495, 405, 495, 417);  // thick
    tg.drawBraille('10', 495, 420);   // scale
    tg.drawLine(280, 300, 290, 300);  // thick
    tg.drawBraille('5', 245, 300);    // scale
    tg.drawLine(280, 200, 290, 200);  // thick
    tg.drawBraille('10', 230, 200);   // scale
  }

  if(txt.value){
    var str = replaceCode(txt.value);
    for(var x= -200; x<30; x+=0.01){  /////
      y = Math.round(eval(str.toString())*-20+400);
      var X = Math.round(x*20) + 295;
      var len = Math.sqrt((lx-X)*(lx-X) + (ly-y)*(ly-y));
      if( len  > 6 && y > 30){
        tg.drawDot(X, y);
        console.log(y);
        lx = X;
        ly = y;
      }
    }
  }

  if(txt2.value){
    var str = replaceCode(txt2.value);
    for(var x= -200; x<30; x+=0.01){  /////
      y = Math.round(eval(str.toString())*-20+400);
      var X = Math.round(x*20) + 295;
      var len = Math.sqrt((lx-X)*(lx-X) + (ly-y)*(ly-y));
      if( len  > 6 && y > 30){
        tg.drawDot(X, y);
        lx = X;
        ly = y;
      }
    }
  }

  function replaceCode(str){
    str = str.replace(/　/g,"");
    str = str.replace(/＋/g,"+");
    str = str.replace(/－/g,"-");
    str = str.replace(/×/g,"*");
    str = str.replace(/（/g,"(");
    str = str.replace(/）/g,")");
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
    str = str.replace(/(x\^)([0-9])/g,"Math.pow(x, $2)");
    return str;
  }
}

txt.onchange = function (){drawGraph();}
txt2.onchange = function (){drawGraph();}
scale.onchange = function (){drawGraph();}
window.onload = function(){drawGraph();}

     ////////////////// Download process /////////////////
var filename = "Function Graph";
var edl = document.querySelector('#edl');
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

