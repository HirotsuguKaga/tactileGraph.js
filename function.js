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
var tg = tactileGraphic();
tg.setCanvas('a');

function drawGraph(){///////////////////////////////////////////////////////
  tg.clear();
  arr = createArray(txt.value);
  var len = arr.length;
  var sum=0;
  for(var i=0; i<arr.length; i++){
    sum += parseInt(arr[i][1]);
  }

    var x=y=lx=ly=0;
    
  if(document.getElementById('bar').checked == true){//////////////////////////////!!!!!!!!!!!!!!!!!!!//////
    for(var X= -200; X<59; X+=0.01){  /////
      y = (X*X)*-5+400;
      var x = X*20 + 295;
      var len = Math.sqrt((lx-x)*(lx-x) + (ly-y)*(ly-y));
      if( len  > 5 ){
        tg.drawDot(x, y);
        lx = x;
        ly = y;
      }
    }
    tg.drawLine(0,403,599,403);
    tg.drawLine(295,10,295,605);

  }else if(document.getElementById('pie').checked == true){ /////////////////////////////////
    for(var x= -200; x<599; x+=0.001){  /////
      y = (50/x-400)*-1;
      var X = 2*x + 290;
      var len = Math.sqrt((lx-x)*(lx-x) + (ly-y)*(ly-y));
      if( len  > 5 ){
        tg.drawDot(X, y);
        lx = x;
        ly = y;
      }
    }
    tg.drawLine(0,405,599,405);

  }else if(document.getElementById('line').checked == true){ ////////line tg/////////////////////
    for(var x= -200; x<599; x+=0.001){  /////
      y = (1/2*x-400)*-1;
      var X = 5*x + 290;
      var len = Math.sqrt((lx-X)*(lx-X) + (ly-y)*(ly-y));
      if( len  > 5 ){
        tg.drawDot(X, y);
        lx = X
        ly = y;
      }
    }
    tg.drawLine(0,405,599,405);

  }else if(document.getElementById('band').checked == true){ ////////band tg/////////////////////
    for(var x= -200; x<599; x+=0.1){  /////
      y = (x*x-400)*-1;
      var X = x*10 + 295;
      var len = Math.sqrt((lx-X)*(lx-X) + (ly-y)*(ly-y));
      if( len  > 5 ){
        tg.drawDot(X, y);
        lx = X;
        ly = y;
      }
    }
    tg.drawLine(0,405,599,405);
    tg.drawLine(295,10,295,605);
  }



  function brailleRight(str, x, y){
    str +="";
    var length = str.length + 1;
    x -= length * textWidth + 7;
    tg.drawBraille(str, x,y);
  }
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