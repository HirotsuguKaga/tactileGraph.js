var file = document.querySelector('#getfile');
file.onchange = function (){   //ファイル選択後
  var fileList = file.files;
    var reader = new FileReader();
    reader.readAsArrayBuffer(fileList[0]);
    reader.onload = function  () {
      filename =file.name;
      var array = new Uint8Array(reader.result);
      var uniArray = Encoding.convert(array, 'UNICODE','AUTO');
      var result = Encoding.codeToString(uniArray);
      txt.value = result;
      arr = createArray(result);
    }
};

var txt = document.querySelector('#txt');
txt.onchange = function (){
  drawGraph();
};

document.onkeydown = function(e) {
  if(e.keyCode == 13){		//インターキーの押下を取得
    drawGraph();			//ファイル選択ボタンを押下
  }
}
////////////////////////////////////////////////////////////////////////
var arr=[];
function createArray(csvData) {
  var tempArray = csvData.split("\n");
  var csvArray = new Array();
  for(var i = 0; i<tempArray.length;i++){
    csvArray[i] = tempArray[i].split(" ");
  }
  return csvArray;
}

var tg = tactileGraphic();
tg.setCanvas('a');

function drawGraph(){  //////////////////////////////////////////////////
  tg.clear();
  arr = createArray(txt.value);
  var len = arr.length;
  for(var i=0; i<arr.length; i++){
    switch(arr[i][0]){
      case "line":
        tg.drawLine(arr[i][1]*1,arr[i][2]*1,arr[i][3]*1,arr[i][4]*1);
        break;
      case "dot":
        tg.drawDot(arr[i][1]*1,arr[i][2]*1);
        break;
      case "txt":
        tg.drawBraille(arr[i][3],arr[i][1]*1,arr[i][2]*1);
        break;
      case "circle":
        tg.strokeCircle(arr[i][1]*1,arr[i][2]*1,arr[i][3]*1);
        break;
    }
  }
}

  //////////////////download/////////////////
var filename = "tatileGraph";
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