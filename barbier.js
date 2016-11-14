var tg = tactileGraphic();
tg.setCanvas('a');

function drawGraph(){///////////////////////////////////////////////////////
  tg.clear();
  tg.setSize("B5");
  
  tg.drawLine(36,0,36,30+6*66);
  
  for(var i=0; i<7; i++){
    tg.drawLine(0, 30+i*66, 410, 30+i*66);
  }
  
  for(var i=0; i<6; i++){
    tg.drawBraille(i+1,0,60+i*66);
  }
  
  tg.drawBraille("1　　2　　3　　4　　5　　6",60,0);

  tg.drawBraille("う",64,46);
  tg.drawBraille("え",64,46 + 1*66);
  tg.drawBraille("ね",64,46 + 2*66);
  tg.drawBraille("ね",64,46 + 3*66);
  tg.drawBraille("あ",64,46 + 3*66 + 21);
  tg.drawBraille("ね",64,46 + 4*66);
  tg.drawBraille("い",64,46 + 4*66 + 21);
  tg.drawBraille("ね",64,46 + 5*66);
  tg.drawBraille("に",64,46 + 5*66 + 21);
  
  tg.drawBraille("る",64 + 1*60,46);
  tg.drawBraille("れ",64 + 1*60,46 + 1*66);
  tg.drawBraille("て",64 + 1*60,46 + 2*66);
  tg.drawBraille("て",64 + 1*60,46 + 3*66);
  tg.drawBraille("あ",64 + 1*60,46 + 3*66 + 21);
  tg.drawBraille("て",64 + 1*60,46 + 4*66);
  tg.drawBraille("い",64 + 1*60,46 + 4*66 + 21);
  tg.drawBraille("て",64 + 1*60,46 + 5*66);
  tg.drawBraille("に",64 + 1*60,46 + 5*66 + 21);
  
  tg.drawBraille("す",64 + 2*60,46);
  tg.drawBraille("せ",64 + 2*60,46 + 1*66);
  tg.drawBraille("め",64 + 2*60,46 + 2*66);
  tg.drawBraille("め",64 + 2*60,46 + 3*66);
  tg.drawBraille("あ",64 + 2*60,46 + 3*66 + 21);
  tg.drawBraille("め",64 + 2*60,46 + 4*66);
  tg.drawBraille("い",64 + 2*60,46 + 4*66 + 21);
  tg.drawBraille("め",64 + 2*60,46 + 5*66);
  tg.drawBraille("に",64 + 2*60,46 + 5*66 + 21);
  
  tg.drawBraille("す",64 + 3*60,46);
  tg.drawBraille("拗",64 + 3*60,46 + 21);
  tg.drawBraille("せ",64 + 3*60,46 + 1*66);
  tg.drawBraille("拗",64 + 3*60,46 + 1*66 + 21);
  tg.drawBraille("め",64 + 3*60,46 + 2*66);
  tg.drawBraille("拗",64 + 3*60,46 + 2*66 + 21);
  tg.drawBraille("め",64 + 3*60,46 + 3*66);
  tg.drawBraille("う",64 + 3*60,46 + 3*66 + 21);
  tg.drawBraille("め",64 + 3*60,46 + 4*66);
  tg.drawBraille("え",64 + 3*60,46 + 4*66 + 21);
  tg.drawBraille("め",64 + 3*60,46 + 5*66);
  tg.drawBraille("ね",64 + 3*60,46 + 5*66 + 21);
  
  tg.drawBraille("す",64 + 4*60,46);
  tg.drawBraille("小",64 + 4*60,46 + 21);
  tg.drawBraille("せ",64 + 4*60,46 + 1*66);
  tg.drawBraille("小",64 + 4*60,46 + 1*66 + 21);
  tg.drawBraille("め",64 + 4*60,46 + 2*66);
  tg.drawBraille("小",64 + 4*60,46 + 2*66 + 21);
  tg.drawBraille("め",64 + 4*60,46 + 3*66);
  tg.drawBraille("る",64 + 4*60,46 + 3*66 + 21);
  tg.drawBraille("め",64 + 4*60,46 + 4*66);
  tg.drawBraille("れ",64 + 4*60,46 + 4*66 + 21);
  tg.drawBraille("め",64 + 4*60,46 + 5*66);
  tg.drawBraille("て",64 + 4*60,46 + 5*66 + 21);
  
  tg.drawBraille("す",64 + 5*60,46);
  tg.drawBraille("拡",64 + 5*60,46 + 21);
  tg.drawBraille("せ",64 + 5*60,46 + 1*66);
  tg.drawBraille("拡",64 + 5*60,46 + 1*66 + 21);
  tg.drawBraille("め",64 + 5*60,46 + 2*66);
  tg.drawBraille("拡",64 + 5*60,46 + 2*66 + 21);
  tg.drawBraille("め",64 + 5*60,46 + 3*66);
  tg.drawBraille("す",64 + 5*60,46 + 3*66 + 21);
  tg.drawBraille("め",64 + 5*60,46 + 4*66);
  tg.drawBraille("せ",64 + 5*60,46 + 4*66 + 21);
  tg.drawBraille("め",64 + 5*60,46 + 5*66);
  tg.drawBraille("め",64 + 5*60,46 + 5*66 + 21);
  
}

                  ///////////download///////////
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