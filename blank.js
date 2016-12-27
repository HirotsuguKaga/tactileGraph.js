var tg = tactileGraphic();
tg.setCanvas('a');
function drawGraph(){///////////////////////////////////////////////////////
  tg.clear();
  tg.setSize("B5");
  
  ///////ここから下に描画メソッドを記述します//////////////




var xy = tg.drawBraille("okjsdgfhwdaghifal4ruegwbhfvlyrafruqwhrodjgbhfal9qwro;dhhfvwegytflgheuwrgdFWHQVIGlu",0,90,300);

console.log(xy);
tg.drawBraille("a",xy[0],xy[1]);

//tg.strokeRect(100,500,90,150,290);
//tg.strokeRect(100,500,90,-150,290);
//tg.strokeRect(100,500,-90,150,290);
//tg.strokeRect(100,500,-90,-150,290);




  //////////////ここまで///////////////
}
  ///////////以下はダウンロードに関する設定です。///////////////////////
var filename = "Graph";

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
window.onload = function(){
  drawGraph();
}