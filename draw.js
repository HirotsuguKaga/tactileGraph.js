
          ///////////ダウンロード処理/////////////////////////
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

      function getMousePosition(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top -0.125
        };
      }
     function draw() {
        var canvas = document.getElementById('a');
        var context = canvas.getContext('2d');

        canvas.addEventListener('mousemove', function (evt) {
          var mousePos = getMousePosition(canvas, evt);
          var message = 'Mouse position X:' + mousePos.x + ', Y:' + mousePos.y;
          document.getElementById('out').innerHTML = message;
        }, false);
      }
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
var txt = document.querySelector('#txt');

var tg = tactileGraphic();
tg.setCanvas('a');

var canvas = document.getElementById('a');
context = canvas.getContext('2d');

canvas.addEventListener('click', onClick, false);

var fx = fy = -1;
function onClick (e) {
  var x = y = 0;
  //  x = e.clientX - canvas.offsetLeft; //不可
  //  y = e.clientY - canvas.offsetTop;  //不可
   var rect = canvas.getBoundingClientRect();   ///スクロールによる位置のずれを補正
   x = e.clientX - rect.left;
   y = e.clientY - rect.top -0.125;
  
  
  if(document.getElementById('q1').checked == true){
    tg.drawDot(x, y);
  }else if(document.getElementById('q2').checked == true){
    if(fx == -1){
      tg.drawMark(x, y);
      fx = x; fy =y;
    } else {
      tg.drawLine(fx, fy, x, y);
      fx = -1;
    }
  }else if(document.getElementById('q3').checked == true){
    if(fx == -1){
      tg.drawMark(x, y);
      fx = x; fy =y;
    } else {
      tg.strokeRect(fx, fy, x-fx, y-fy);
      fx = -1;
    }
  }else if(document.getElementById('q4').checked == true){
    if(fx == -1){
      tg.drawMark(x, y);
      fx = x; fy =y;
    } else {
      tg.clearDot(fx,fy);
      tg.fillRect(fx, fy, x-fx, y-fy);
      fx = -1;
    }
  }else if(document.getElementById('q5').checked == true){
    var str = txt.value;
    tg.drawBraille(str, x, y);
  }
};
