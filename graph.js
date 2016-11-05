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

txt.onchange = function (){
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
  max = Math.max.apply(null, numArray);
  return csvArray;
}

var textWidth = 14;
var graph = tactileGraphic();
graph.setCanvas('a');

function drawGraph(){///////////////////////////////////////////////////////
  graph.clear();
  arr = createArray(txt.value);
  var len = arr.length;
  var sum=0;
  for(var i=0; i<arr.length; i++){
    sum += parseInt(arr[i][1]);
  }

  if(document.getElementById('bar').checked == true){///////////////bar chart/////////////////////
  var X=110;
  var Y=55;
  var R = 42; //line height
  graph.clear();
  graph.drawBraille("bar chart",10,5); //title
  //graph.strokeRect(100-5, Y-20, 474, 12 + len*42);    //枠線
  graph.drawLine(100-5, Y-19, 100-5, Y + 9 + len*42);   //縦線
  graph.drawLine(83, Y -7 + len*42, 584, Y -7 + len*42);//横線
  
  graph.setInterval(4);
  for(var i=0; i<len; i++){  ///draw  bar///
    var width = 450 * (arr[i][1]/max);
    graph.fillRect(100,Y+R*i-1, width,16);
    graph.drawLine(82, Y+R*i+9, 94, Y+R*i+9);
    brailleRight(arr[i][0], X-9, Y+R*i);
  }
    var s=0;               ////scale
    if(6<max && max <=10)s=5;
    if(10<max && max <=20)s=10;
    if(25<max && max <=50)s=25;
    if(50<max && max <=100)s=50;
    if(100<max && max <=200)s=100;
    graph.drawLine(100 + 450*(s/max), Y -2 + len*42, 100 + 450*(s/max),  Y +10 + len*42);
    graph.drawBraille(s, 100+450 * (s/max), Y +15 + len*42);

  }else if(document.getElementById('pie').checked == true){ ////////pie chart/////////////////////
    graph.drawBraille("pie chart",10,10);
    graph.setInterval(6);
    graph.strokeCircle(300, 300, 170);
    var a= -90;
    for(var i=0; i < len; i++){
      a += 360*(arr[i][1]/sum) ; // 角度（度）
      var x2 = 300 + 165 * Math.cos(Math.PI / 180 * a); // X座標
      var y2 = 300 + 165 * Math.sin(Math.PI / 180 * a); // Y座標
      graph.drawLine(300, 300, x2, y2);
      var b = a - 13;		
      var x3 = 300 + 192 * Math.cos(Math.PI / 180 * b); // 文字のX座標
      var y3 = 300 + 192 * Math.sin(Math.PI / 180 * b); // 文字のY座標
      graph.drawBraille(arr[i][0],x3,y3);
    }

  }else if(document.getElementById('line').checked == true){ ////////line graph/////////////////////
    graph.drawBraille("line graph",10,10);
    graph.drawLine(40, 600,590 ,600);
    for(var i=0; i < len; i++){
      graph.fillRect(40 + i*(530/(len-1))-6, 600 - 500*arr[i][1]/max-6, 18,12);
      graph.drawBraille(arr[i][0], 40 + i*(530/(len-1)), 620);
      if(i<len-1){
        graph.drawLine(40 + i*(530/(len-1)), 600 - 500*arr[i][1]/max, 40 + (i+1)*(530/(len-1)), 600 - 500*arr[i+1][1]/max)
      }
    }

  }else if(document.getElementById('band').checked == true){ ////////band graph/////////////////////
    graph.drawBraille("band graph",10,10);
    graph.strokeRect(10, 100, 580, 100);
    var num = 10;
    for(var i=0; i < len-1; i++){
        num += 580*arr[i][1]/sum;
      graph.drawLine(num, 106, num, 198);
      graph.drawBraille(arr[i][0], num-20 , 220)
    }
  }

  function brailleRight(str, x, y){
    str +="";
    var length = str.length + 1;
    x -= length * textWidth + 7;
    graph.drawBraille(str, x,y);
  }
}



                  ///////////download///////////
var filename = "Graph";

var edl = document.querySelector('#edl');
//var png = document.querySelector('#png');
var esa = document.querySelector('#esa');

edl.onclick = function() {
  var blob = new Blob([ graph.loadEdl() ], { "type" : "text/plain" });
  if (window.navigator.msSaveBlob) { 
    window.navigator.msSaveBlob(blob, filename + ".edl"); 
  } else {
    edl.download =  filename + ".edl";  //ダウンロードするファイル名を設定
    edl.href = window.URL.createObjectURL(blob);
  }
}

esa.onclick = function(){
  imgURL = graph.map2esa();
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