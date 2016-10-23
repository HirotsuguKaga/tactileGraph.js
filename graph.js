var file = document.querySelector('#getfile');
var txt = document.querySelector('#txt');

file.onchange = function (){   //ファイル選択後
  var fileList = file.files;
    var reader = new FileReader();
    reader.readAsArrayBuffer(fileList[0]);//読み込み  Uncaught TypeError: Failed to execute
    reader.onload = function  () {
      filename =file.name;
      var array = new Uint8Array(reader.result);
      var uniArray = Encoding.convert(array, 'UNICODE','AUTO');//配列を「ユニコード」に変換
      var result = Encoding.codeToString(uniArray);
      
      txt.value = result;
      arr = createArray(result);
  
    }
};

txt.onchange = function (){   //ファイル選択後
  console.log("txt change");
      drawGraph();
};

var arr=[];
var max;

function createArray(csvData) {
  var tempArray = csvData.split("\n");
  var csvArray = new Array();
  var numArray = new Array();
  for(var i = 0; i<tempArray.length;i++){
    csvArray[i] = tempArray[i].split(",");
  }
  for(var i = 0; i<csvArray.length; i++){
    numArray.push(csvArray[i][1]);
  }
  console.log(numArray);
  max = Math.max.apply(null, numArray);
  return csvArray;
}

var bar = tactileGraphic();
bar.setCanvas('a');



var X=110;
var Y=60;
var R = 40; //line heightt
var textWidth = 14;

function drawGraph(){ ///////////////bar chart////////////////////////
  bar.clear();
  bar.drawBraille("bar chart",10,5); //title
  bar.strokeRect(100-5, Y-20, 470, 300);
  bar.setInterval(4);
  arr = createArray(txt.value);
  for(var i=0; i<arr.length; i++){  //////////////////////////////////
    var width = 450 * (arr[i][1]/max);
    bar.fillRect(100,Y+R*i-1, width,16);
    brailleRight(arr[i][0],X,Y+R*i);
  }
  
  bar.drawBraille("pie chart",10,430); ////////pie chart/////////////
  bar.setInterval(6);
  var sum=0;
  for(var i=0; i<arr.length; i++){
    sum += parseInt(arr[i][1]);
  }
  bar.strokeCircle(300, 570, 150);
  var a= -90;
  for(var i=0; i<arr.length; i++){
    a += 360*(arr[i][1]/sum) ; // 角度（度）
    var x2 = 300 + 145 * Math.cos(Math.PI / 180 * a); // X座標
    var y2 = 570 + 145 * Math.sin(Math.PI / 180 * a); // Y座標
    bar.drawLine(300, 570, x2, y2);
    var x3 = 300 + 170 * Math.cos(Math.PI / 180 * a); // X座標
    var y3 = 570 + 170 * Math.sin(Math.PI / 180 * a); // Y座標
    bar,drawBraille(arr[i][0],x3,y3);
  }
}

function brailleRight(str, x, y){
  str +="";
  var length = str.length + 1;
  x -= length * textWidth + 7;
  bar.drawBraille(str, x,y);
}
window.onload = function(){
  drawGraph(arr);
}

                  ///////////ダウンロード処理///////////
var filename = "Graph";

var edl = document.querySelector('#edl');
//var png = document.querySelector('#png');
var esa = document.querySelector('#esa');

edl.onclick = function() {
  var blob = new Blob([ bar.loadEdl() ], { "type" : "text/plain" });
  if (window.navigator.msSaveBlob) { 
    window.navigator.msSaveBlob(blob, filename + ".edl"); 
  } else {
    edl.download =  filename + ".edl";  //ダウンロードするファイル名を設定
    edl.href = window.URL.createObjectURL(blob);
  }
}

esa.onclick = function(){
  imgURL = bar.map2esa();
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


/*
png.onclick = function() {
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
    png.download =  filename + ".png";  //ダウンロードするファイル名を設定
    png.href = window.URL.createObjectURL(blob);
  }
}*/
