/**
 * tactileGraph.js
 *
 * @description    Draw dot graph & Edel files.
 * @fileoverview   Drawing library
 * @author         Hirotsugu Kaga
 * @version        0.1
 * @date           2016-10-09
 * @copyright      Copyright (c) Hirotsugu Kaga
 * @license        licensed under the MIT license.
 */

/*jshint bitwise:false,eqnull:true,newcap:false */

var tactileGraphic = function() {
	var arr = [];
	var size = "A4"; //Paper size
	var sizeX = 599;
	var sizeY = 744;
	var l = 30; // Line height
	var w = 6;
    var h = 7;
    var r = 15;
    var fromX = 0;
    var fromY = 0;
	
	var canvas,ctx;
	var interval = 6;
	return {

          /////////////////////設定系メソッド////////////////////////
  setCanvas:function(id){
    canvas = document.getElementById(id);
    ctx = canvas.getContext('2d');
    var len = arr.length;
    for(i=0; i<len; i++){
      var x = arr[i] % 1000;
      var y = (arr[i] - X) / 1000;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI*2, false);
      ctx.fill();
    }
  },
  
  setSize:function(str){
    size = str;
    switch(str){
      case "A4":
        sizeX = 599;
        sixeY = 744;
        break;
      case "B5":
        sixeX = 400;
        sizeY = 600;
        break;
      }
  },

  setInterval:function(num){
    interval = num;
  },

         ///////////////////////描画系メソッド//////////////////////

  convertText:function(str){    //拗音などを記号の組み合わせに変換する
    var arr1 = [
    ['きゃ','拗か'],['きゅ','拗く'],['きょ','拗こ'],['しゃ','拗さ'],['しゅ','拗す'],
    ['しょ','拗そ'],['ちゃ','拗た'],['ちゅ','拗つ'],['ちょ','拗と'],['にゃ','拗な'],
    ['にゅ','拗ぬ'],['にょ','拗の'],['ひゃ','拗は'],['ひゅ','拗ふ'],['ひょ','拗ほ'],
    ['みゃ','拗ま'],['みゅ','拗む'],['みょ','拗も'],['りゃ','拗ら'],['りゅ','拗る'],
    ['りょ','拗ろ'],['いぇ','拗え'],['きぇ','拗け'],['しぇ','拗せ'],['ちぇ','拗て'],
    ['にぇ','拗ね'],['ひぇ','拗へ'],['すぃ','拗し'],['てぃ','拗ち'],['ぎゃ','小か'],
    ['ぎゅ','小く'],['ぎょ','小こ'],['じゃ','小さ'],['じゅ','小す'],['じょ','小そ'],
    ['ぢゃ','小た'],['ぢゅ','小つ'],['ぢょ','小と'],['びゃ','小は'],['びゅ','小ふ'],
    ['びょ','小ほ'],['うぃ','+い'],['うぇ','+え'],['うぉ','+お'],['くぁ','+か'],
    ['くぃ','+き'],['くぇ','+け'],['くぉ','+こ'],['つぁ','+た'],['つぃ','+ち'],
    ['つぇ','+て'],['つぉ','+と'],['ふぁ','+は'],['ふぃ','+ひ'],['ふぇ','+へ'],
    ['ふぉ','+ほ'],['ぐぁ','。か'],['ぐぃ','。き'],['ぐぇ','。け'],['ぐぉ','。こ'],
    ['ヴぁ','。は'],['ヴぃ','。ひ'],['ヴぇ','。へ'],['ヴぉ','。ほ'],['とぅ','+つ'],
    ['ずぃ','小し'],['でぃ','小ち'],['どぅ','。つ'],['てゅ','斜つ'],['ふゅ','斜ゆ'],
    ['ふょ','斜よ'],['でゅ','拡つ'],['ヴゅ','拡ゆ'],['ヴゅ','拡よ'],['が','濁か'],
    ['ぎ','濁き'],['ぐ','濁く'],['げ','濁け'],['ご','濁こ'],['ざ','濁さ'],
    ['じ','濁し'],['ず','濁す'],['ぜ','濁せ'],['ぞ','濁そ'],['だ','濁た'],
    ['ぢ','濁ち'],['づ','濁つ'],['で','濁て'],['ど','濁と'],['ば','濁は'],
    ['び','濁ひ'],['ぶ','濁ふ'],['べ','濁へ'],['ぼ','濁ほ'],['ぱ','半ほ'],
    ['ぴ','半ひ'],['ぷ','半ふ'],['ぺ','半へ'],['ぽ','半ほ'],['キャ','拗カ'],
    ['キュ','拗ク'],['キョ','拗コ'],['シャ','拗サ'],['シュ','拗ス'],['ショ','拗ソ'],
    ['チャ','拗タ'],['チュ','拗ツ'],['チョ','拗ト'],['ニャ','拗ナ'],['ニュ','拗ヌ'],
    ['ニョ','拗ノ'],['ヒャ','拗ハ'],['ヒュ','拗フ'],['ヒョ','拗ホ'],['ミャ','拗マ'],
    ['ミュ','拗ム'],['ミョ','拗モ'],['リャ','拗ラ'],['リュ','拗ル'],['リョ','拗ロ'],
    ['イェ','拗エ'],['キェ','拗ケ'],['シェ','拗セ'],['チェ','拗テ'],['ニェ','拗ネ'],
    ['ヒェ','拗ヘ'],['スィ','拗シ'],['ティ','拗チ'],['ギャ','小カ'],['ギュ','小ク'],
    ['ギョ','小コ'],['ジャ','小サ'],['ジュ','小ス'],['ジョ','小ソ'],['ヂャ','小タ'],
    ['ヂュ','小ツ'],['ヂョ','小ト'],['ビャ','小ハ'],['ビュ','小フ'],['ビョ','小ホ'],
    ['ウィ','+イ'],['ウェ','+エ'],['ウォ','+オ'],['クァ','+カ'],['クィ','+キ'],
    ['クェ','+ケ'],['クォ','+コ'],['ツァ','+タ'],['ツィ','+チ'],['ツェ','+テ'],
    ['ツォ','+ト'],['ファ','+ハ'],['フィ','+ヒ'],['フェ','+ヘ'],['フォ','+ホ'],
    ['グァ','。カ'],['グィ','。キ'],['グェ','。ケ'],['グォ','。コ'],['ヴァ','。ハ'],
    ['ヴィ','。ヒ'],['ヴェ','。ヘ'],['ヴォ','。ホ'],['トゥ','+ツ'],['ズィ','小シ'],
    ['ディ','小チ'],['ドゥ','。ツ'],['テュ','斜ツ'],['フュ','斜ユ'],['フョ','斜ヨ'],
    ['デュ','拡ツ'],['ヴュ','拡ユ'],['ヴュ','拡ヨ'],['ヴ','濁ウ'],['ガ','濁カ'],
    ['ギ','濁キ'],['グ','濁ク'],['ゲ','濁ケ'],['ゴ','濁コ'],['ザ','濁サ'],
    ['ジ','濁シ'],['ズ','濁ス'],['ゼ','濁セ'],['ゾ','濁ソ'],['ダ','濁タ'],
    ['ヂ','濁チ'],['ヅ','濁ツ'],['デ','濁テ'],['ド','濁ト'],['バ','濁ハ'],
    ['ビ','濁ヒ'],['ブ','濁フ'],['ベ','濁ヘ'],['ボ','濁ホ'],['パ','半ホ'],
    ['ピ','半ヒ'],['プ','半フ'],['ペ','半ヘ'],['ポ','半ホ']
    ];

    str += "";  //引数を文字列として扱わせる
    str = str.replace(/([0-9０１２３４５６７８９])/g, "数$1");  //全てのアラビア数字の直前に数符を置く
    str = str.replace(/([0-9０１２３４５６７８９])数/g, "$1");  //数符の直前に数字があったら、その数符を取り除く
    str = str.replace(/数数/g, "数");  //数符の連続があればそれを解消する
        //数字の直後にア行とラ行、AからJまでのアルファベットがあったら間に繋ぎ符を挿入する
    str = str.replace(/([0-9０１２３４５６７８９])([ろロﾛＪJｊjあアｱＡAａaいイｲＢBｂbうウｳＣCｃcるルﾙＤDｄdらラﾗＥEｅeれレﾚＧGｇgえエｴＦFｆfりリﾘＨHｈhおオｵＩIｉi])/g, "$1_$2");
    
    for(var i = 0 ; i < arr1.length ; i++){ //>配列の変換
      var regex = new RegExp(arr1[i][0], 'g');
      str = str.replace(regex,arr1[i][1]);
    }
    return str;
  },

  drawBraille:function( str, x, y, returnX){
    x = x || 0;
    y = y || 0;
    returnX = returnX || sizeX;
    var arrLetter = [
    ['あアｱ１1ＡAａa','1'],['いイｲ２2ＢBｂb','12'],
    ['うウｳ３3ＣCｃc','14'],['えエｴ６6ＦFｆf','124'],
    ['おオｵ９9ＩIｉi','24'],['かカｶ＊*','16'],
    ['きキｷ｛{','126'],['くクｸ','146'],
    ['けケｹ','1246'],['こコｺ＠@','246'],
    ['さサｻ','156'],['しシｼ','1256'],
    ['すスｽ','1456'],['せセｾ','12456'],
    ['そソｿ','2456'],['たタﾀＯoｏo','135'],
    ['ちチﾁＲRｒr','1235'],['つツﾂＮNｎn','1345'],
    ['てテﾃＱQｑq','12345'],['とトﾄＴTｔt','2345'],
    ['なナﾅＫKｋk','13'],['にニﾆＬLｌl','123'],
    ['ぬヌﾇＭMｍm','134'],['ねネﾈＰPｐp％%','1234'],
    ['のノﾉＳSｓs','234'],['はハﾊＵUｕu','136'],
    ['ひヒﾋＶVｖv','1236'],['ふフﾌＸXｘx','1346'],
    ['へヘﾍ＆&','12346'],['ほホﾎ','2346'],
    ['まマﾏＺZｚz','1356'],['みミﾐ[','12356'],
    ['むムﾑＹYｙy','13456'],['めメﾒ','123456'],
    ['もモﾓ]','23456'],['やヤﾔ／/分','34'],
    ['ゆユﾕ〒郵','346'],['よヨﾖ√根｝}','345'],
    ['らラﾗ5５ＥEｅe','15'],['りリﾘ8８ＨHｈh','125'],
    ['るルﾙ4４ＤDｄd','145'],['れレﾚ７7ＧGｇg','1245'],
    ['ろロﾛ０0ＪJｊj','245'],['わワﾜ’\'?','3'],
    ['ゐヰ、，外＄$↓','56'],['ゑヱ、。．.句∋','256'],
    ['をヲｦ－','35'],['をヲｦ－','35'],
    ['んンﾝ零閉','356'],['八語','236'],
    ['濁・〃中','5'],['数','3456'],
    ['　 &nbsp;無',''],['ーー三','25'],
    ['小＾^ぎギｷﾞじジｼﾞぢヂﾁﾞびビﾋﾞ↑','45'],['拗†￥\´?','4'],
    ['半πΠ¶?ぱパﾊﾟ大','6'],['促っッｯ一','2'],
    ['＿_「」-‐継～：:','36'],['七＝=','2356'],
    ['斜‡ぴピﾋﾟ≠','46'],['？?＋+五疑','26'],
    ['二；;','23'],['！!！感六','235'],
    ['｜|拡','456']];

    str += "";
    str = this.convertText(str);
    var arr = [];
    for(i=0;i<str.length;i++){  //>1文字毎に配列を作成
      var letter = str.charAt(i);
      arr.push(seek(letter));
    }
    
    function seek(letter){        //数字コードを取得
      var a = [
      ['\n','\n'],
      ['.','256'],
      ['\(','2356'],
      ['\)','2356'],
      ['\[','2356'],
      ['\]','2356'],
      ['\\','4'],
      ['\*','16'],
      ['?','26'],
      ['\{','2356'],
      ['\}','2356'],
      ['\^',' '],
      ['$','56'],
      ['-','36'],
      ['\|','456'],
      ['\/','34']]
      for(var i= 0 ; i < a.length ; i++){ //エスケープが必要な文字を先に文字列として比較
        if(letter === a[i][0])return A[i][1];
      }

      for(var j = 0 ; j < arrLetter.length ; j++){ //>
        if(arrLetter[j][0].match(letter)){
          return arrLetter[j][1];
        }
      }
      //alert("文字列に点字に変換出来ない文字が含まれています。");
      return "none";
    }
    
    this.arr2braille(arr,x,y);
  },

  arr2braille:function(arr,x,y,returnX){ //点字の描画処理/
    var j = 0;
    var k = 0;
    for(var i = 0 ; i < arr.length ; i++){         //>
      if(returnX < x + r * j + w){j = 0; k++;}
      if(arr[i].match("1"))this.drawDot(x + r * j , y + l*k);
      if(arr[i].match("2"))this.drawDot(x + r * j , y + h + l*k);
      if(arr[i].match("3"))this.drawDot(x + r * j , y + h*2 + l*k);
      if(arr[i].match("4"))this.drawDot(x + w + r * j , y + l*k);
      if(arr[i].match("5"))this.drawDot(x + w + r * j , y + h + l*k);
      if(arr[i].match("6"))this.drawDot(x + w + r * j , y + h*2 + l*k);
      j++
      if(arr[i].match("\n")){j = 0; k++;}
    }
  },

  drawLine:function(x1, y1, x2, y2) {     ////点線の描画処理///
    if(y2 === undefined)return this.drawLine(fromX, fromY, x1, y1);
    fromX = x2;
    fromY = y2;
    var d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    var rad = Math.atan2(y2 - y1, x2 - x1);
    var dotted = Math.round(d / interval );
    for (var i = 0; i <= dotted; i++) {
      var x3 = Math.cos(rad) * interval * i + x1;
      var y3 = Math.sin(rad) * interval * i + y1;
      this.drawDot(x3, y3);
    }
  },

  strokeRect:function(x, y, w, h) {   ////長方形の描画処理①///
    this.drawLine(x, y , x+w, y);
    this.drawLine(x, y , x, y+h);
    this.drawLine(x+w, y , x+w, y+h);
    this.drawLine(x, y+h , x+w, y+h);
  },

  fillRect:function(x, y, w, h) {     ////長方形の描画処理②///
    var s = 3;
    var j = Math.round(h /s /2 );
    for (var i = 0; i <= j; i++) {
      this.drawLine(x, y + s*i*2, x+w, y + s*i*2);
    }
  },
  
  strokeCircle:function(x, y, r) {     ////円の描画処理///
    var cir = 2 * Math.PI * r;
    var a = Math.round(360 / (cir / interval)); // 角度（度）
    for(var i=0; a*i < 360; i++){
      var X = x + r * Math.cos(a*i / 180 * Math.PI); // X座標
      var Y = y + r * Math.sin(a*i / 180 * Math.PI); // Y座標
      this.drawDot(X, Y);
    }
  },

  drawDot:function(x,y) {               /////点の描画///////
    x = Math.round(x);
    y = Math.round(y);
    if(ctx){
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI*2, false);
      ctx.fill();
    }
    arr.push(y*1000 + x);
  },
  
  clearDot:function(x,y) {               /////点の削除///////
    if(ctx){
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI*2, false);
      ctx.fill();
      ctx.fillStyle = '#000';
    }
    var target = y*1000 + x;
    arr = arr.filter(function(v){
      return v != target;
    });
  },

  clear:function(){
    arr=[];
    var fromX = 0;
    var fromY = 0;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, sizeX, sizeY);
    ctx.fillStyle = '#000';
  },
             /////////////入出力系メソッド//////////////////

  loadEdl:function() {              //////エーデルファイルの出力///////
    arr.sort(function(a,b){
      if( a < b ) return -1;
      if( a > b ) return 1;
      return 0;
    });
    var str = "";
    var len = arr.length;
    for(i=0; i<len; i++){
      var X = arr[i] % 1000;
      var Y = (arr[i] - X) / 1000;
      if(arr[i-1] !== arr[i] && X < sizeX && Y < sizeY){  //重複した座標と領域の外側の座標を除外
        str += num2edi(parseInt(X,10)) + num2edi(parseInt(Y,10));
      }
    }
    function num2edi(num){  //
      var str = num.toString(26);
      str = str.replace(/10(.)/, "Z$1");
      str = str.replace(/11(.)/, "\[$1");
      str = str.replace(/12(.)/, "\\$1");
      var js26 = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'];
      var ed26 = ['@','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y'];
      for(var i=0; i<26; i++){
        str = str.replace(new RegExp(js26[i],"g"),ed26[i]);
        str= ("@"+str).slice(-2);  //ゼロ埋め
      }
      return str;
    }
    
    str = "EDEL" + size + "0,740\n2" + str;
    return str;
  },

  map2esa:function(){
    var element = document.createElement("canvas");
    element.setAttribute("width", 599);
    element.setAttribute("height", 744);
    var ctx2 = element.getContext('2d');
    ctx2.fillStyle = '#fff';
    ctx2.fillRect(0, 0, sizeX, sizeY);
    ctx2.fillStyle = '#000';
    var len = arr.length;
    
    for(var i = 0; i<len; i++){
      var X = arr[i] % 1000;
      var Y = (arr[i] - X) / 1000;
      ctx2.fillRect(X,Y,1,1);
    }
    var data = element.toDataURL();
    return data;
  }

  };
};