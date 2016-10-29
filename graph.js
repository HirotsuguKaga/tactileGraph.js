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
var Y=55;
var R = 42; //line heightt
var textWidth = 14;

function drawGraph(){ ///////////////bar chart////////////////////////
  bar.clear();
  bar.drawBraille("bar chart",10,5); //title
  arr = createArray(txt.value);
  var len = arr.length;
  //bar.strokeRect(100-5, Y-20, 474, 12 + len*42); //枠線
  bar.drawLine(100-5, Y-19, 100-5, Y + 9 + len*42);      //縦線
  bar.drawLine(83, Y -7 + len*42, 584, Y -7 + len*42); //横線
  
  bar.setInterval(4);
  for(var i=0; i<len; i++){  ///////////draw  bar///////////
    var width = 450 * (arr[i][1]/max);
    bar.fillRect(100,Y+R*i-1, width,16);
    bar.drawLine(87, Y+R*i+9, 94, Y+R*i+9);
    brailleRight(arr[i][0],X-10,Y+R*i);
  }
  
  var s=0;               ////scale
  if(6<max<10)s=5;
  if(10<max<20)s=10;
  if(25<max<50)s=25;
  if(50<max<100)s=50;
  if(100<max<200)s=100;
  bar.drawLine(100+450 * (s/max), Y -6 + len*42, 100+450 * (s/max),  Y +6 + len*42);
  bar.drawBraille(s, 100+450 * (s/max), Y +12 + len*42);
 


  bar.drawBraille("pie chart",10,410); ////////pie chart/////////////
  bar.setInterval(6);
  var sum=0;
  for(var i=0; i<arr.length; i++){
    sum += parseInt(arr[i][1]);
  }

  bar.strokeCircle(300, 560, 150);
  var a= -90;
  for(var i=0; i<arr.length; i++){
    a += 360*(arr[i][1]/sum) ; // 角度（度）
    var x2 = 300 + 145 * Math.cos(Math.PI / 180 * a); // X座標
    var y2 = 560 + 145 * Math.sin(Math.PI / 180 * a); // Y座標
    bar.drawLine(300, 570, x2, y2);
    
    var b = a - 13;		
    var x3 = 300 + 170 * Math.cos(Math.PI / 180 * b); // X座標		
    var y3 = 560 + 170 * Math.sin(Math.PI / 180 * b); // Y座標		
    bar.drawBraille(arr[i][0],x3,y3);
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
