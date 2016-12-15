var file = document.querySelector('#getfile');
var edl = document.querySelector('#edl');
var png = document.querySelector('#png');
var esa = document.querySelector('#esa');
var title = document.querySelector('#title');
var filename;

var Braille = tactileGraphic();
Braille.setCanvas('a');

          // ブラウザのUAを小文字で取得
var userAgent = navigator.userAgent.toLowerCase();
if (userAgent.indexOf('chrome') != -1) {
  //document.getElementById('ie').style.display = "none"; //Chromeのみの処理
}

file.onchange = function (){   //ファイル選択後
  var fileList = file.files;
  title.innerHTML="";
  load(fileList, 0);
};

function load(fileList, k){
  if(k < fileList.length){  //>
    var reader = new FileReader();
    reader.readAsArrayBuffer(fileList[k]);//読み込み  Uncaught TypeError: Failed to execute
    reader.onload = function  () {
      filename =fileList[k].name;
      title.innerHTML += "<br>" + filename;
      
      var reg=/(.*)(?:\.([^.]+$))/; //ファイル名から拡張子を取り除く正規表現
      filename = filename.match(reg)[1];//[0]がフルネーム、[2]が拡張子のみ
      
      var array = new Uint8Array(reader.result);
      var uniArray = Encoding.convert(array, 'UNICODE','AUTO');//配列を「ユニコード」に変換
      var result = Encoding.codeToString(uniArray);
      document.querySelector('#before').textContent = result;
      var koma = fen2arr(result);     ///置換
      draw4edel(koma);
      var img = draw4swell(koma);
	  
	  edl.href = img;
	  image.src = img;
	  if (userAgent.indexOf('chrome') != -1) {
        edl.click();           ///Chromeのみの処理
      }  
      k++; 
      load(fileList, k);  //再帰呼び出し
    }
  }
}

                  ///////////ダウンロード処理///////////
edl.onclick = function() {
  var blob = new Blob([ Braille.loadEdl() ], { "type" : "text/plain" });
  if (window.navigator.msSaveBlob) { 
    window.navigator.msSaveBlob(blob, filename + ".edl"); 
  } else {
    edl.download =  filename + ".edl";  //ダウンロードするファイル名を設定
    edl.href = window.URL.createObjectURL(blob);
  }
}

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
}

esa.onclick = function(){
  imgURL = Braille.map2esa();
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

/////////////////////////////////////////キーボード操作の検出/////////////////////////////
document.onkeydown = function(e) {
  if(e.keyCode == 13){		//インターキーの押下を取得
    file.click();			//ファイル選択ボタンを押下
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////棋譜を配列に変換///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fen2arr(str){          //配列に変換
  str = str.replace(/ /g, "/");
  arr=str.split( /\// );/////////
  console.log(arr);
  return arr;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// EDELの描画////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function draw4edel(koma){
  Braille.clear();
  var canvase = document.getElementById('a');
  var ctx = canvase.getContext('2d');
  var sw = 60; var sh = 60;
  var bx = 0; var by = 130;
  ctx.fillStyle = "rgb(255,245,230)";  //エーデル用のcanvasの初期化
  ctx.fillRect(0,0,599,744);
  ctx.fillStyle = "rgb(0, 0, 0)";
    
  for(var i = 0 ; i < 9 ; i++){          //盤面の描画
    Braille.drawLine(bx+sw*i, by, bx+sw*i, by+sh*8);
    Braille.drawLine(bx, by+sh*i, bx+sw*8, by+sh*i);
  }
 
  var mx = 60; var sentey = 740; var gotey = 35; var mw = sw*8;var mh =48;
  
  Braille.drawBraille("９", bx + 20 + sw*0, by-25);
  Braille.drawBraille("８", bx + 20 + sw*1, by-25);
  Braille.drawBraille("７", bx + 20 + sw*2, by-25);
  Braille.drawBraille("６", bx + 20 + sw*3, by-25);
  Braille.drawBraille("５", bx + 20 + sw*4, by-25);
  Braille.drawBraille("４", bx + 20 + sw*5, by-25);
  Braille.drawBraille("３", bx + 20 + sw*6, by-25);
  Braille.drawBraille("２", bx + 20 + sw*7, by-25);
  Braille.drawBraille("１", bx + 16 + sw*8, by + sh*0 + 22);
  Braille.drawBraille("２", bx + 16 + sw*8, by + sh*1 + 22);
  Braille.drawBraille("３", bx + 16 + sw*8, by + sh*2 + 22);
  Braille.drawBraille("４", bx + 16 + sw*8, by + sh*3 + 22);
  Braille.drawBraille("５", bx + 16 + sw*8, by + sh*4 + 22);
  Braille.drawBraille("６", bx + 16 + sw*8, by + sh*5 + 22);
  Braille.drawBraille("７", bx + 16 + sw*8, by + sh*6 + 22);
  Braille.drawBraille("８", bx + 16 + sw*8, by + sh*7 + 22);
  
  Braille.drawBraille(filename, 10, 0);  /////////EDEL/////////
  
  var i = 0;
  for( var y = 0; y < 9; y++){           //盤面の駒の描画
    for( var x = 0; x < 9; x++){
      Braille.drawBraille(arr[i], bx + sw*x + 20, by + sh*y + 23 );  //////EDEL//
      i++;
    }
  }

  var gote = "";
  for( var y = 0; y < mtg.length ; y++){  //横置き用持ち駒の文字列
    gote += mtg[y] + "　";
  }
  
  var sente = "";
  for( var y = 0; y < mts.length ; y++){
    sente += mts[y] + "　";
  }

  Braille.drawBraille(gote,  mx+20, gotey + 17);  //後手の持駒
  Braille.drawBraille(sente, mx+20, sentey -31);  //先手の持駒
};
 
//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////立体コピー用の描画////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function draw4swell(koma) {
  var ten = koma[0];
  var mts = koma[1];
  var mtg = koma[2];
  var sumi = koma[3];
  var mss = koma[4];
  var msg = koma[5];
  var canvas = document.getElementById('cvs');
  if ( ! canvas || ! canvas.getContext ) { return false; }//canvas要素の確認と未対応ブラウザの対処
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,2339,1654); //キャンバスの初期化
  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0,1654,2339);
  var bx = 85; // Board X
  var by = 535; // Board Y
  var sw = 153; // Square Width
  var sh = 153; // Square Height
  /////////////////////////////墨字////////////////////////////
  ctx.font= 'bold 40px Century Gothic';
  ctx.fillStyle = '#8cf';
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  var i = 0;
  for( var y = 0; y < 9; y++){
    for( var x = 0; x < 9; x++){
      ctx.fillText( sumi[i], bx + 70 + sw * x, by + sh * y);
      i++;
    }
  }

  X = bx + sw * 9.4;
  Y = by;
  ctx.fillText('一',X,Y + sh * 0);
  ctx.fillText('二',X,Y + sh * 1);
  ctx.fillText('三',X,Y + sh * 2)
  ctx.fillText('四',X,Y + sh * 3);
  ctx.fillText('五',X,Y + sh * 4);
  ctx.fillText('六',X,Y + sh * 5);
  ctx.fillText('七',X,Y + sh * 6);
  ctx.fillText('八',X,Y + sh * 7);
  ctx.fillText('九',X,Y + sh * 8);
  ctx.textBaseline = "alphabetic";
  ctx.fillText('後手持駒',bx + 60, by+sh*-2.6);
  ctx.fillText('先手持駒',bx + 60, by + sh*9.35);
  var X = bx + sw/2;
  var Y = by-sh*0.6;
  ctx.fillText('9',X + sw * 0,Y);
  ctx.fillText('8',X + sw * 1,Y);
  ctx.fillText('7',X + sw * 2,Y);
  ctx.fillText('6',X + sw * 3,Y);
  ctx.fillText('5',X + sw * 4,Y);
  ctx.fillText('4',X + sw * 5,Y);
  ctx.fillText('3',X + sw * 6,Y);
  ctx.fillText('2',X + sw * 7,Y);
  ctx.fillText('1',X + sw * 8,Y);
  
  ctx.beginPath(); ctx.arc(bx + sw * 3, by + sh * 3, 15, 0, Math.PI*2, true);
  ctx.arc(bx + sw * 6, by + sh * 3, 15, 0, Math.PI*2, true); ctx.fill();
  ctx.beginPath();ctx.arc(bx + sw * 3, by + sh * 6, 15, 0, Math.PI*2, true);
  ctx.arc(bx + sw * 6, by + sh * 6, 15, 0, Math.PI*2, true);ctx.fill();//星

  for( var y = 0; y < mss.length; y++){
    ctx.fillText( mss[y], bx + sw * 11, by + 45 + sh * y);  //持駒墨字先手
  }
  for( var y = 0; y < msg.length; y++){
    ctx.fillText( msg[y], bx + sw * -2, by + 45 + sh * y);  //持駒墨字後手
  }

  ctx.textAlign = "left";
  var sen = "";
  for( var y = 0; y < mss.length ; y++){
    sen += mss[y] + "　";
  }
  ctx.fillText( sen, bx +10, by + sh*10.3);  //持駒点字先手
  var go = "";
  for( var y = 0; y < msg.length ; y++){
    go += msg[y] + "　";
  }
  ctx.fillText( go, bx + 10, by + sh*-1.7);  //持駒点字後手
  
  ctx.fillText(filename,75, 35); /////タイトル
  ctx.textAlign = "center";
  /////////////////////////////点字///////////////////////
  ctx.fillStyle = '#000';
  ctx.font= 'bold 53px "Ikarashi Braille"';
  ctx.textAlign = "left";
  var name = Braille.convertText(filename);
  ctx.fillText(name,75, 95); /////タイトル//////
  ctx.textAlign = "center";
  var i = 0;
  for( var y = 1; y <= 9; y++){           //盤面の駒の描画
    for( var x = 0; x < 9; x++){
      ctx.fillText( ten[i],  bx + 70 + sw*x, by - 50 + sh * y);
      i++;
    }
  }
  X = bx + sw / 2;
  Y = by - 30;
  ctx.fillText('数9',X + sw * 0,Y);
  ctx.fillText('数8',X + sw * 1,Y);
  ctx.fillText('数7',X + sw * 2,Y);
  ctx.fillText('数6',X + sw * 3,Y);
  ctx.fillText('数5',X + sw * 4,Y);
  ctx.fillText('数4',X + sw * 5,Y);
  ctx.fillText('数3',X + sw * 6,Y);
  ctx.fillText('数2',X + sw * 7,Y);
  ctx.fillText('数1',X + sw * 8,Y);
  XX = bx + sw * 9.4;
  YY = by + sh - 50;
  ctx.fillText('数１',XX,YY + sh * 0);
  ctx.fillText('数２',XX,YY + sh * 1);
  ctx.fillText('数３',XX,YY + sh * 2)
  ctx.fillText('数４',XX,YY + sh * 3);
  ctx.fillText('数５',XX,YY + sh * 4);
  ctx.fillText('数６',XX,YY + sh * 5);
  ctx.fillText('数７',XX,YY + sh * 6);
  ctx.fillText('数８',XX,YY + sh * 7);
  ctx.fillText('数９',XX,YY + sh * 8);

  ctx.textAlign = "left";
  ctx.fillText('ごて　もちごま',bx, by+sh*-2.2);
  ctx.fillText('せんて　もちごま',bx, by + sh*9.8);
  var sente = "";      //横置き用持ち駒の文字列
  for( var y = 0; y < mts.length ; y++){
    sente += mts[y] + "　";
  }
  var gote = "";
  for( var y = 0; y < mtg.length ; y++){
    gote += mtg[y] + "　";
  }
  ctx.fillText( sente, bx +10, by + sh*10.7);  //持駒点字先手
  ctx.fillText( gote, bx + 10, by + sh*-1.3);  //持駒点字後手
     ////////////////////////枠線/////////////
  ctx.lineWidth = 7;
  ctx.beginPath();    //Board
  
  for(var i=0; i<=9; i++){ //>盤面
    ctx.moveTo(bx, by + sh * i);	//Horizontal lines
    ctx.lineTo(bx + sw * 9, by + sh * i);
    ctx.moveTo(bx + sw * i, by);			//Vertical lines 
    ctx.lineTo(bx + sw * i, by + sh * 9);
  }
  
  ctx.moveTo(bx -20, by + sh*10);  //先手持駒の枠
  ctx.lineTo(bx + sw * 10.1, by + sh*10);
  ctx.lineTo(bx + sw * 10.1, by + sh*11);
  ctx.lineTo(bx -20, by + sh*11);
  ctx.lineTo(bx -20, by + sh*10);

  ctx.moveTo(bx -20, by + sh*-2);  //後手持駒の枠
  ctx.lineTo(bx + sw * 10.1, by + sh*-2);
  ctx.lineTo(bx + sw * 10.1, by + sh*-1);
  ctx.lineTo(bx -20, by + sh*-1);
  ctx.lineTo(bx -20, by + sh*-2);
  ctx.stroke();
    ///////////画像に変換////////////////////////
  imgURL = cvs.toDataURL();
  return imgURL;
}