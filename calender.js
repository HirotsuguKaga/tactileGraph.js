var tg = tactileGraphic();
tg.setCanvas('a');

function drawGraph(){///////////////////////////////////////////////////////
  tg.clear();
  tg.setSize("B5");

  // カレンダーの準備 //
  myDate = new Date();	// 今日の日付データ取得
  myWeekTbl = new Array("にち","げつ","か","すい","もく","きん","ど");	// 曜日テーブル
  myMonthTbl= new Array(31,28,31,30,31,30,31,31,30,31,30,31);	// 月テーブル
  myYear = myDate.getFullYear();	// 年を取得
  if (((myYear%4)==0 && (myYear%100)!=0) || (myYear%400)==0){	// 閏年なら2月を29日に変更
    myMonthTbl[1] = 29;
  }
  myMonth = myDate.getMonth();	// 月を取得(0月～11月)
  myToday = myDate.getDate();	// 今日の'日'を退避
  myDate.setDate(1);	// 日付を'１日'に変えて、
  myWeek = myDate.getDay();	// 　'１日'の曜日を取得
  myTblLine = Math.ceil((myWeek+myMonthTbl[myMonth])/7);	// カレンダーの行数
  myTable = new Array(7*myTblLine);	// 表のセル数分定義

  for(i=0; i<7*myTblLine; i++) myTable[i]="_";	// myTableを掃除
  for(i=0; i<myMonthTbl[myMonth]; i++)myTable[i+myWeek]=i+1;	// 日付を埋め込む
 //      カレンダーの表示	
  var month = myMonth + 1 ;
  tg.drawBraille(myYear + "ねん　" + month + "がつ"); 
  tg.drawLine(0, 110, 420, 110);
  for(var i=0; i<7; i++){
    tg.drawBraille(myWeekTbl[i],i*60,80); 
  }
  for(i=0; i<myTblLine; i++){
    for(j=0; j<7; j++){
      var myDat = myTable[j+(i*7)];
      console.log(myDat);
      tg.drawBraille(myDat,j*60,130+i*50);
    }
  }
}
          ///////////Download///////////
var filename = "Graph";
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
window.onload = function(){
  drawGraph();
}