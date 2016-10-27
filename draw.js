   ///////////////Download///////////////////
var filename = "drawing";

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
  // DataURL のデータ部分を抜き出し、Base64からバイナリに変換
  var bin = atob(imgURL.split(',')[1]);
  // 空の Uint8Array ビューを作る
  var buffer = new Uint8Array(bin.length);
  // Uint8Array ビューに 1 バイトずつ値を埋める
  for (var i = 0; i < bin.length; i++) {
    buffer[i] = bin.charCodeAt(i);
  }
  // Uint8Array ビューのバッファーを抜き出し、それを元に Blob を作る
  var blob = new Blob([buffer.buffer], {type: 'image/png'});
  
  if (window.navigator.msSaveBlob) {
  // for IE
  window.navigator.msSaveBlob(blob, filename + '.png'); 
  } else {
    esa.download =  filename + ".png";  //ダウンロードするファイル名を設定
    esa.href = window.URL.createObjectURL(blob);
  }
}

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
var canvas = document.getElementById('b');
ctx = canvas.getContext('2d');

var pr = tactileGraphic();
pr.setCanvas('b');

  function getMousePosition(canvas, evt) {
     var rect = canvas.getBoundingClientRect();
     return {
       x: evt.clientX - rect.left,
       y: evt.clientY - Math.round(rect.top)
     };
  }

function hypo(a,b){return Math.sqrt(a*a + b*b)} //hypotenuse

function draw() {
  canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePosition(canvas, evt);
    var message = 'Position X:' + mousePos.x + ', Y:' + mousePos.y;
    document.getElementById('out').innerHTML = message;
    var x = mousePos.x;
    var y = mousePos.y;
    if(fx != -1){
      pr.clear();
      if(document.getElementById('q2').checked == true)pr.drawLine(fx, fy, x, y);
      if(document.getElementById('q3').checked == true)pr.strokeRect(fx, fy, x-fx, y-fy);
      if(document.getElementById('q4').checked == true)pr.fillRect(fx, fy, x-fx, y-fy);
      if(document.getElementById('q5').checked == true){
        pr.drawDot(fx, fy);
        pr.strokeCircle(fx, fy, hypo(fx-x, fy-y));
      }
    }
  }, false);
}
////////////////////////////////////////////////////////////////////////////////////////
var txt = document.querySelector('#txt');
var tg = tactileGraphic();
tg.setCanvas('a');

canvas.addEventListener('click', onClick, false);

var fx = fy = -1;
function onClick (e) {
  var x = y = 0;
  //  x = e.clientX - canvas.offsetLeft; //不可
  //  y = e.clientY - canvas.offsetTop;  //不可
   var rect = canvas.getBoundingClientRect();   ///スクロールによる位置のずれを補正
   x = e.clientX - rect.left;
   y = e.clientY - Math.round(rect.top);
  
  
  if(document.getElementById('q1').checked == true){        //drawDot
    tg.drawDot(x, y);
  }else if(document.getElementById('q2').checked == true){  //drawLine
    if(fx == -1){
ctx.fillRect(x,y,3,3);
      fx = x; fy =y;
    } else {
      tg.drawLine(fx, fy, x, y);
      fx = -1;
    }
  }else if(document.getElementById('q3').checked == true){  //strokeRect
    if(fx == -1){
      fx = x; fy =y;
    } else {
      tg.strokeRect(fx, fy, x-fx, y-fy);
      fx = -1;
    }
  }else if(document.getElementById('q4').checked == true){  //fillRect
    if(fx == -1){
      fx = x; fy =y;
    } else {
      tg.clearDot(fx,fy);
      tg.fillRect(fx, fy, x-fx, y-fy);
      fx = -1;
    }
  }else if(document.getElementById('q5').checked == true){  //strokeCircle
    if(fx == -1){
      fx = x; fy =y;
    } else {
      tg.strokeCircle(fx, fy, hypo(fx-x,fy-y));
      fx = -1;
    }
  }else if(document.getElementById('q6').checked == true){  //drawBraille
    var str = txt.value;
    tg.drawBraille(str, x, y);
  }
};
