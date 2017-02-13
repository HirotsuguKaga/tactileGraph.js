/**
 * tactileGraph.js
 * @description    Draw dot graph & Edel files.
 * @fileoverview   Drawing library
 * @author         Hirotsugu Kaga
 * @version        0.1
 * @date           2016-10-09
 * @copyright      Copyright (c) Hirotsugu Kaga
 * @license        licensed under the MIT license.
 */
/*jshint bitwise:false,eqnull:true,newcap:false */

var tactileGraphic = function(id, size, type, aug, aug2) {
  var coo = [[],[],[]];
  var dot = 1;
  var sizeX = 599;
  var sizeY = 744;
  var l = 30; // Line height
  var w = 6;
  var h = 7;
  var r = 15; //
  var fromX = 0;
  var fromY = 0;
  var canvas;
  var ctx;
  var interval = 6;
  var right = false; //右寄せチェック
  var Adjust=false;
  if(id){
    canvas = document.getElementById(id);
    ctx = canvas.getContext("2d");
  }

  setsize=function(){
    switch(size){
      case "A4":
        sizeX = 599;
        sizeY = 744;
        break;
      case "B5":
        sizeX = 479;
        sizeY = 725;
        break;
      case "IJB6":
        sizeX = 176;
        sizeY = 272;
        break;
      case "IJB5":
        sizeX = 320;
        sizeY = 460;
        break;
      case "IJA4":
        sizeX = 360;
        sizeY = 540;
        break;
      case "IJB4":
        sizeX = 456;
        sizeY = 670;
        break;
      case "IJA3":
        sizeX = 536;
        sizeY = 790;
        break;
    }
  };

  if(type==="edi"){
    l = 28; // Line height
    w = 5;
    h = 5;
    r = 12; //
  }
 return {
          /////////////////////設定系メソッド///////////////////////
  setDot:function(num){
    dot=num;
  },

  setCanvas:function(id){
    canvas = document.getElementById(id);
    ctx = canvas.getContext("2d");
    this.drawCanvas();
  },

  drawCanvas:function(){
    for(var i=0; i<coo.length; i++){
      var len = coo[dot].length;
      for(var j=0; j<len; j++){
        var x = coo[dot][j] % 1000;
        var y = (coo[dot][j] - X) / 1000;
        this.dot2preview(x,y);
      }
    }
  },

  setSize:function(str){
    size = str;
    setsize();
  },

  setInterval:function(num){
    interval = num;
  },

  setColor:function(color){
    ctx.fillStyle = color;
  },

  setAdjust:function(bool){
    Adjust=bool;
  },

  setBraille:function(L,W,H,R){
    l = L;
    w = W;
    h = H;
    r = R;
  },

  setType:function(TYPE){
    switch(TYPE){
    case "edi":
      this.setBraille(28,5,5,12);
      break;
    default:
      this.setBraille(30,6,7,15);
      break;
    }
  },
         ///////////////////////描画系メソッド//////////////////////

  convertText:function(str){    //拗音などを記号の組み合わせに変換する
    var arr = [
    ["きゃ","拗か"],["きゅ","拗く"],["きょ","拗こ"],["しゃ","拗さ"],["しゅ","拗す"],
    ["しょ","拗そ"],["ちゃ","拗た"],["ちゅ","拗つ"],["ちょ","拗と"],["にゃ","拗な"],
    ["にゅ","拗ぬ"],["にょ","拗の"],["ひゃ","拗は"],["ひゅ","拗ふ"],["ひょ","拗ほ"],
    ["みゃ","拗ま"],["みゅ","拗む"],["みょ","拗も"],["りゃ","拗ら"],["りゅ","拗る"],
    ["りょ","拗ろ"],["いぇ","拗え"],["きぇ","拗け"],["しぇ","拗せ"],["ちぇ","拗て"],
    ["にぇ","拗ね"],["ひぇ","拗へ"],["すぃ","拗し"],["てぃ","拗ち"],["ぎゃ","小か"],
    ["ぎゅ","小く"],["ぎょ","小こ"],["じゃ","小さ"],["じゅ","小す"],["じょ","小そ"],
    ["ぢゃ","小た"],["ぢゅ","小つ"],["ぢょ","小と"],["びゃ","小は"],["びゅ","小ふ"],
    ["びょ","小ほ"],["うぃ","+い"],["うぇ","+え"],["うぉ","+お"],["くぁ","+か"],
    ["くぃ","+き"],["くぇ","+け"],["くぉ","+こ"],["つぁ","+た"],["つぃ","+ち"],
    ["つぇ","+て"],["つぉ","+と"],["ふぁ","+は"],["ふぃ","+ひ"],["ふぇ","+へ"],
    ["ふぉ","+ほ"],["ぐぁ","。か"],["ぐぃ","。き"],["ぐぇ","。け"],["ぐぉ","。こ"],
    ["ヴぁ","。は"],["ヴぃ","。ひ"],["ヴぇ","。へ"],["ヴぉ","。ほ"],["とぅ","+つ"],
    ["ずぃ","小し"],["でぃ","小ち"],["どぅ","。つ"],["てゅ","斜つ"],["ふゅ","斜ゆ"],
    ["ふょ","斜よ"],["でゅ","拡つ"],["ヴゅ","拡ゆ"],["ヴゅ","拡よ"],["が","濁か"],
    ["ぎ","濁き"],["ぐ","濁く"],["げ","濁け"],["ご","濁こ"],["ざ","濁さ"],
    ["じ","濁し"],["ず","濁す"],["ぜ","濁せ"],["ぞ","濁そ"],["だ","濁た"],
    ["ぢ","濁ち"],["づ","濁つ"],["で","濁て"],["ど","濁と"],["ば","濁は"],
    ["び","濁ひ"],["ぶ","濁ふ"],["べ","濁へ"],["ぼ","濁ほ"],["ぱ","半ほ"],
    ["ぴ","半ひ"],["ぷ","半ふ"],["ぺ","半へ"],["ぽ","半ほ"],["キャ","拗カ"],
    ["キュ","拗ク"],["キョ","拗コ"],["シャ","拗サ"],["シュ","拗ス"],["ショ","拗ソ"],
    ["チャ","拗タ"],["チュ","拗ツ"],["チョ","拗ト"],["ニャ","拗ナ"],["ニュ","拗ヌ"],
    ["ニョ","拗ノ"],["ヒャ","拗ハ"],["ヒュ","拗フ"],["ヒョ","拗ホ"],["ミャ","拗マ"],
    ["ミュ","拗ム"],["ミョ","拗モ"],["リャ","拗ラ"],["リュ","拗ル"],["リョ","拗ロ"],
    ["イェ","拗エ"],["キェ","拗ケ"],["シェ","拗セ"],["チェ","拗テ"],["ニェ","拗ネ"],
    ["ヒェ","拗ヘ"],["スィ","拗シ"],["ティ","拗チ"],["ギャ","小カ"],["ギュ","小ク"],
    ["ギョ","小コ"],["ジャ","小サ"],["ジュ","小ス"],["ジョ","小ソ"],["ヂャ","小タ"],
    ["ヂュ","小ツ"],["ヂョ","小ト"],["ビャ","小ハ"],["ビュ","小フ"],["ビョ","小ホ"],
    ["ウィ","+イ"],["ウェ","+エ"],["ウォ","+オ"],["クァ","+カ"],["クィ","+キ"],
    ["クェ","+ケ"],["クォ","+コ"],["ツァ","+タ"],["ツィ","+チ"],["ツェ","+テ"],
    ["ツォ","+ト"],["ファ","+ハ"],["フィ","+ヒ"],["フェ","+ヘ"],["フォ","+ホ"],
    ["グァ","。カ"],["グィ","。キ"],["グェ","。ケ"],["グォ","。コ"],["ヴァ","。ハ"],
    ["ヴィ","。ヒ"],["ヴェ","。ヘ"],["ヴォ","。ホ"],["トゥ","+ツ"],["ズィ","小シ"],
    ["ディ","小チ"],["ドゥ","。ツ"],["テュ","斜ツ"],["フュ","斜ユ"],["フョ","斜ヨ"],
    ["デュ","拡ツ"],["ヴュ","拡ユ"],["ヴュ","拡ヨ"],["ヴ","濁ウ"],["ガ","濁カ"],
    ["ギ","濁キ"],["グ","濁ク"],["ゲ","濁ケ"],["ゴ","濁コ"],["ザ","濁サ"],
    ["ジ","濁シ"],["ズ","濁ス"],["ゼ","濁セ"],["ゾ","濁ソ"],["ダ","濁タ"],
    ["ヂ","濁チ"],["ヅ","濁ツ"],["デ","濁テ"],["ド","濁ト"],["バ","濁ハ"],
    ["ビ","濁ヒ"],["ブ","濁フ"],["ベ","濁ヘ"],["ボ","濁ホ"],["パ","半ホ"],
    ["ピ","半ヒ"],["プ","半フ"],["ペ","半ヘ"],["ポ","半ホ"]
    ];
    str += "";    //引数を文字列として扱わせる
    str = str.replace(/([0-9０１２３４５６７８９])/g, "数$1")  //全てのアラビア数字の直前に数符を置く
              .replace(/([0-9０１２３４５６７８９])数/g, "$1") //数符の直前に数字があったら、その数符を取り除く
               .replace(/数数/g, "数")                         //数符の連続があればそれを解消する
                .replace(/([0-9０１２３４５６７８９])([ろロﾛＪJｊjあアｱＡAａaいイｲＢBｂbうウｳＣCｃcるルﾙＤDｄdらラﾗＥEｅeれレﾚＧGｇgえエｴＦFｆfりリﾘＨHｈhおオｵＩIｉi])/g, "$1_$2");
                                                               //数字の直後にア行とラ行、AからJまでのアルファベットがあったら間に繋ぎ符を挿入する
    for(var i = 0 ; i < arr.length ; i++){ //>配列の変換
      var regex = new RegExp(arr[i][0], "g");
      str = str.replace(regex,arr[i][1]);
    }
    return str;
  },

  drawBraille:function( str, x, y, returnX){
    x = x || 0;
    y = y || 0;
    returnX = returnX || sizeX;
    var arrLetter = [
    ["あアｱ１1ＡAａa","1"],["いイｲ２2ＢBｂb","12"],
    ["うウｳ３3ＣCｃc","14"],["えエｴ６6ＦFｆf","124"],
    ["おオｵ９9ＩIｉi","24"],["かカｶ＊*","16"],
    ["きキｷ｛{","126"],["くクｸ","146"],
    ["けケｹ","1246"],["こコｺ＠@","246"],
    ["さサｻ","156"],["しシｼ","1256"],
    ["すスｽ","1456"],["せセｾ","12456"],
    ["そソｿＷWｗw","2456"],["たタﾀＯoｏo","135"],
    ["ちチﾁＲRｒr","1235"],["つツﾂＮNｎn","1345"],
    ["てテﾃＱQｑq","12345"],["とトﾄＴTｔt","2345"],
    ["なナﾅＫKｋk","13"],["にニﾆＬLｌl","123"],
    ["ぬヌﾇＭMｍm","134"],["ねネﾈＰPｐp％%","1234"],
    ["のノﾉＳSｓs","234"],["はハﾊＵUｕu","136"],
    ["ひヒﾋＶVｖv","1236"],["ふフﾌＸXｘx","1346"],
    ["へヘﾍ＆&","12346"],["ほホﾎ","2346"],
    ["まマﾏＺZｚz","1356"],["みミﾐ[","12356"],
    ["むムﾑＹYｙy","13456"],["めメﾒ","123456"],
    ["もモﾓ]","23456"],["やヤﾔ／/分","34"],
    ["ゆユﾕ〒郵","346"],["よヨﾖ√根｝}","345"],
    ["らラﾗ5５ＥEｅe","15"],["りリﾘ8８ＨHｈh","125"],
    ["るルﾙ4４ＤDｄd","145"],["れレﾚ７7ＧGｇg","1245"],
    ["ろロﾛ０0ＪJｊj","245"],["わワﾜ’\"","3"],
    ["ゐヰ、，外＄$↓","56"],["ゑヱ、。．.句∋","256"],
    ["をヲｦ－","35"],["をヲｦ－","35"],
    ["んンﾝ零閉","356"],["八語","236"],
    ["濁・〃中","5"],["数","3456"],["　 &nbsp;無",""],["ーー三","25"],
    ["小＾^ぎギｷﾞじジｼﾞぢヂﾁﾞびビﾋﾞ↑","45"],["拗†￥\´","4"],
    ["半πΠ¶?ぱパﾊﾟ大","6"],["促っッｯ一","2"],
    ["＿_「」-‐継～：:","36"],["七＝=","2356"],
    ["斜‡ぴピﾋﾟ≠","46"],["？?＋+五疑","26"],
    ["二；;","23"],["！!！感六","235"],["｜|拡","456"]];
    str += "";

    str=str.replace(/&yen;[a-z]/g,"￥a");
    str = this.convertText(str);
    var arr = [];
    for(var i=0;i<str.length;i++){  //>1文字毎に配列を作成
      var letter = str.charAt(i);
      arr.push(seek(letter));
    }

    function seek(letter){        //数字コードを取得
      var a = [
      ["\n","\n"], [".","256"], ["\,","2"],["\(","2356"], ["\)","2356"],
      ["\[","2356"], ["\]","2356"], ["\\","4"], ["\*","16"], ["\;","23"],
      ["?","26"], ["\{","2356"], ["\}","2356"], ["\^"," "],
      ["$","56"], ["-","36"], ["\|","456"], ["\/","34"]];
      for(var i= 0 ; i < a.length ; i++){ //エスケープが必要な文字を先に文字列として比較
        if(letter === a[i][0]){return a[i][1];}
      }

      for(var j = 0 ; j < arrLetter.length ; j++){ //>
        if(arrLetter[j][0].match(letter)){
          return arrLetter[j][1];
        }
      }
      console.log("文字列に点字に変換出来ない文字が含まれています。");
      return "none";
    }
    return this.arr2braille(arr,x,y,returnX);
  },

  arr2braille:function(arr,x,y,returnX){ //点字の描画処理/
    if(right===true){  //右寄せ
      x -= arr.length * r-8;
      right = false;
    }
    var k = 0;
    var j = k;
    for(var i = 0 ; i < arr.length ; i++){         //>
      if(returnX < x + r * j + w){j = 0; k++;}//改行
      if(arr[i].match("1"))this.drawDot(x + r * j , y + l*k);
      if(arr[i].match("2"))this.drawDot(x + r * j , y + h + l*k);
      if(arr[i].match("3"))this.drawDot(x + r * j , y + h*2 + l*k);
      if(arr[i].match("4"))this.drawDot(x + w + r * j , y + l*k);
      if(arr[i].match("5"))this.drawDot(x + w + r * j , y + h + l*k);
      if(arr[i].match("6"))this.drawDot(x + w + r * j , y + h*2 + l*k);
      j++;
      if(arr[i].match("\n")){j = 0; k++;}//改行
    }
    return [x + r * j , y + l*k];
  },

  drawBrailleRight:function(str, x, y){  //
    right = true;
    this.drawBraille(str, x,y);
  },

  drawBrailleMathRight:function(str, x, y){  //
    right = true;
    this.drawBrailleMath(str, x,y);
  },

  drawBrailleMath:function(str, x, y){
    var code =[["Α","‡a"],["Β","‡b"],["Δ","‡c"],["Ε","‡e"],
              ["Φ","‡f"],["Γ","‡g"],["Ι","‡i"],["Κ","‡k"],
              ["Λ","‡l"],["Μ","‡m"],["Ν","‡n"],["Ο","‡o"],
              ["Π","‡p"],["Ρ","‡r"],["Σ","‡s"],["Τ","‡t"],
              ["Υ","‡y"],["Ω","‡w"],["Ξ","‡x"],["Ψ","‡y"],
              ["Ζ","‡z"],["Η","‡さ"],["Θ","‡す"],["Χ","‡へ"],
              ["α","†a"],["β","†b"],["δ","†c"],["ε","†e"],
              ["φ","†f"],["γ","†g"],["ι","†i"],["κ","†k"],
              ["λ","†l"],["μ","†m"],["ν","†n"],["ο","†o"],
              ["π","†p"],["ρ","†r"],["σ","†s"],["τ","†ｔ"],
              ["υ","†y"],["ω","†w"],["ξ","†x"],["ψ","†y"],
              ["ζ","†z"],["η","†さ"],["θ","†す"],["χ","†へ"],
              ["\＋","？"],["－","を"],["×","＊"],["÷","分"],
              ["・","わ"],["／","｜分"],["\/","｜分"],["±","？を"],
              ["：","中促"],["\＝","ーー"],["≒","中ー"],["≠","‡ー"],
              ["=","ーー"],["＞","？？"],["＜","をを"],["\>","？？"],
              ["<","をを"],["≧","ヱヱ"],["≦","語語"],["（","語"],
              ["）","ん"],["｛","半き"],["\{","半き"],["｝","よわ"],
              ["\}","よわ"],["［","半み"],["］","もわ"],["｜","し"],
              ["\\|","し"],["∽","半わ"],["⊥","んわ"],["∠","す"],
              ["⊿","ゆ"],["⌒","こ"],["平行四辺形","｜分分"],["∪","ゆ"],
              ["∩","く"],["→","ーた"],["←","こー"],["√","根"],
              ["！","外！"],["\!","外！"],["\\(","語"],["\\)","ん"],
              ["\\[","半み"],["\\]","もわ"]];
    var len = code[0].length;
    for(var i=0; i<len; i++){
      var regex = new RegExp(code[i][0], "g");
      str=str.replace(regex,code[i][1]);
    }
    this.drawBraille(str, x,y);
  },
/////////////////////////////////////////////////////////////////////////////////////
  drawLine:function(x1, y1, x2, y2, flag) {     ///////点線の描画処理//////
    if(y2 === undefined)return this.drawLine(fromX, fromY, x1, y1);
    fromX = x2;
    fromY = y2;
    var d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); //distance
    var rad = Math.atan2(y2 - y1, x2 - x1);
    var dotted = Math.floor(d / interval);
    if(dotted===0)dotted = 1;
    var int;
    if(Adjust){
      int = d/dotted;
    }else{
      int = interval;
    }
    var i=0;

    if(flag === 1 || flag === 3) i=1;
    if(flag === 2|| flag === 3) dotted--;

    for (; i <= dotted; i++) {
      var x3 = Math.cos(rad) * int * i + x1;
      var y3 = Math.sin(rad) * int * i + y1;
      this.drawDot(x3, y3);
    }
  },

  drawLineTilt:function(x, y, len, ang) {   ////傾きと長さを指定した点線の描画///
    var temp = ang/180*Math.PI;
    var x1 = x + len*Math.cos(temp);
    var y1 = y + len*Math.sin(temp);
    this.drawLine(x, y , x1, y1);
  },

  strokeRect:function(x, y, w, h, ang) {   ////長方形の描画処理①///
    if(ang !== undefined)return this.strokeRectTilt(x, y, w, h, ang);
    this.drawDot(x+w,y+h);
    this.drawLine(x, y , x+w, y);
    this.drawLine(x, y , x, y+h);
    this.drawLine(x+w, y , x+w, y+h);
    this.drawLine(x, y+h , x+w, y+h);
  },

  strokeRectTilt:function(x, y, w, h, ang) {  ////長方形の描画処理 傾き///
    var ang1 = ang/180*Math.PI;
    var x1 = x + w*Math.cos(ang1);
    var y1 = y + w*Math.sin(ang1);
    var ang2 = (ang+90)/180*Math.PI;
    var x3 = x + h*Math.cos(ang2);
    var y3 = y + h*Math.sin(ang2);
    var x2 = x3-x+x1;
    var y2 = y3-y+y1;
    this.drawLine(x, y , x1, y1);
    this.drawLine(x2,y2);
    this.drawLine(x3,y3);
    this.drawLine(x, y);
  },

  fillRect:function(x, y, w, h) {     ////長方形の描画処理  塗りつぶし///
    if(w<0){w*=-1; x-=w;}
    if(h<0){h*=-1; y-=h;}
    var s = 3;
    var j = Math.round(h /s /2 );
    for (var i = 0; i <= j; i++) {
      this.drawLine(x, y + s*i*2, x+w, y + s*i*2);
    }
  },

  strokeRhombus:function(x, y, w, h, ang) {   ////菱形の描画処理///
    if(ang !== undefined)return this.strokeRhombusTilt(x, y, w, h, ang);
    this.drawLine(x, y-h/2 , x-w/2, y);
    this.drawLine(x, y+h/2);
    this.drawLine(x+w/2, y);
    this.drawLine(x, y-h/2);
  },

  strokeRhombusTilt:function(x, y, w, h, ang) {   ////菱形の描画処理 傾き///
    var x1 = x + w*Math.cos(ang/180*Math.PI)/2;
    var y1 = y + w*Math.sin(ang/180*Math.PI)/2;
    var x2 = x + h*Math.cos((ang+90)/180*Math.PI)/2;
    var y2 = y + h*Math.sin((ang+90)/180*Math.PI)/2;
    var x3 = 2*x - x1;
    var y3 = 2*y - y1;
    var x4 = 2*x - x2;
    var y4 = 2*y - y2;
    this.drawLine(x1, y1, x2, y2);
    this.drawLine(x3, y3);
    this.drawLine(x4, y4);
    this.drawLine(x1, y1);
  },

  strokeTable:function(x, y, w, h, col, row) {   ////表組の描画///
    for(var i=0; i<col; i++){
      for(var j=0; j<row; j++){
        this.strokeRect(x+w*i,y+h*j,w,h);
      }
    }
  },

  strokeCircle:function(x, y, r) {     ////円の描画処理///
    var cir = 2 * Math.PI * r;
    var a = 360 / Math.round(cir / interval); // 角度（度)
    for(var i=0; a*i < 360; i++){
      var ang = a*i / 180 * Math.PI;
      var X = x + r * Math.cos(ang); // X座標
      var Y = y + r * Math.sin(ang); // Y座標
      this.drawDot(X, Y);
    }
  },

  strokeArc:function(x, y, r,s,e) {    ////円弧の描画処理///
    var cir = 2 * Math.PI * r;
    var a = 360 / Math.round(cir / interval); // 角度（度)
    for(var i=0; a*i < e-s; i++){
      var ang = (s-90+a*i) / 180 * Math.PI;
      var X = x + r * Math.cos(ang); // X座標
      var Y = y + r * Math.sin(ang); // Y座標
      this.drawDot(X, Y);
    }
  },

  strokeOval:function(x, y, r) {     ////楕円の描画処理///未処理
    var cir = 2 * Math.PI * r;
    var a = 360 / Math.round(cir / interval); // 角度（度)
    for(var i=0; a*i < 360; i++){
      var ang = a*i / 180 * Math.PI;
      var X = x + r * Math.cos(ang)*0.8; // X座標
      var Y = y + r * Math.sin(ang)*1.2; // Y座標
      this.drawDot(X, Y);
    }
  },

  drawPattern:function(code, x, y) {  ////図形の描画処理///
    var len = code.length;
    for(var i=0; i < len; i++){
      this.drawDot(code[i][0]+x, code[i][1]+y);
    }
  },

  drawDot:function(x,y) {             /////点の描画///////
    x = Math.round(x);
    y = Math.round(y);
    this.dot2preview(x,y);
    coo[dot].push(y*1000 + x);
  },

  dot2preview:function(x,y){
    if(ctx){
      ctx.beginPath();
      switch(dot){
        case 0:
          ctx.arc(x, y, 0.5, 0, Math.PI*2, false);break;
        case 1:
          ctx.arc(x, y, 1.0, 0, Math.PI*2, false);break;
        case 2:
          ctx.arc(x, y, 1.5, 0, Math.PI*2, false);break;
      }
      ctx.fill();
    }
  },

  clearDot:function(x,y) {            /////点の削除///////
    if(ctx){
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI*2, false);
      ctx.fill();
      ctx.fillStyle = "#000";
    }
    var target = y*1000 + x;
    coo[dot] = coo[dot].filter(function(v){
      return v !== target;
    });
  },

  clear:function(){
    coo=[[],[],[]];
    fromX = 0;
    fromY = 0;
    ctx.clearRect(0, 0, sizeX, sizeY);
  },
      /////////////////入出力系メソッド//////////////////
  map2esa:function(){
    var element = document.createElement("canvas");
    element.setAttribute("width", 599);
    element.setAttribute("height", 744);
    var ctx2 = element.getContext("2d");
    ctx2.fillStyle = "#fff";
    ctx2.fillRect(0, 0, sizeX, sizeY);

    ctx2.fillStyle = "#00F"; //小点 青
    draw(0);
    ctx2.fillStyle = "#000"; //中点 黒
    draw(1);
    ctx2.fillStyle = "#0F0"; //大点 緑
    draw(2);

    function draw(dot){
      var len = coo[dot].length;
      for(var i = 0; i<len; i++){
        var X = coo[dot][i] % 1000;
        var Y = (coo[dot][i] - X) / 1000;
        ctx2.fillRect(X,Y,1,1);
      }
    }

    var data = element.toDataURL();
    return data;
  },

  loadArr:function(){
    return coo;
  },

  readEdl:function(str){              //////////// エーデルファイルの読み込み////// 点種に未対応
    str+="";
    str = str.replace(/^.+?[\n\r]/,"")
              .replace(/[\n\r]/,"")
               .replace(/[0-9]/g,"");
    var edlarr = splitByLength(str, 4);
    var len = edlarr.length;
    for(var i=0; i<len; i++){
      var code = edlarr[i];
      var x = edl2num(code.charAt(0)) * 26 + edl2num(code.charAt(1));
      var y = edl2num(code.charAt(2)) * 26 + edl2num(code.charAt(3));
      this.drawDot(x,y);
    }
//////////////////////
    function splitByLength(str, length) {
      var resultArr = [];
      if (!str || !length || length < 1) {
        return resultArr;
      }
      var index = 0;
      var start = index;
      var end = start + length;
      while (start < str.length) {
        resultArr[index] = str.substring(start, end);
        index++;
        start = end;
        end = start + length;
      }
      return resultArr;
    }
//////////////////////
    function edl2num(letter) {
      var ed26 = ["@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","\[","\\","\]","\^","\_"];
      for(var i=0; i<ed26.length; i++){
        if(letter===ed26[i])return i;
      }
    }
  },

  loadEdl:function() {              //////エーデルファイルの出力///////
    var tempArr=[];  //一次元配列に変換
    for(var j=0; j<coo.length; j++){
      var len = coo[j].length;
      for(var i=0; i< len; i++){
        tempArr.push(coo[j][i]*10 + j);
      }
    }

    tempArr.sort(function(a,b){
      if( a < b ) return -1;
      if( a > b ) return 1;
      return 0;
    });

    var s = 0;
    var str = "";
    var leng = tempArr.length;
    for(var int=0; int<leng; int++){
      var x = tempArr[int] % 10000;
      var Y = (tempArr[int] - x) / 10000; //Y座標を取得
      var S = x % 10 + 1; //点種を取得
      var X = (x-S) /10; //X座標を取得
      if(tempArr[int-1] !== tempArr[int] && X < sizeX && Y < sizeY){  //重複した座標と領域の外側の座標を除外
        if(S===s){str += num2edi(parseInt(X,10)) + num2edi(parseInt(Y,10));}        //前の点と点種が同じ場合
        else{str += "\n" + S + num2edi(parseInt(X,10)) + num2edi(parseInt(Y,10));} //異なる場合は改行して行頭に数字を置く
        s=S;
      }
    }

    function num2edi(num){  //10進数をエーデルの26進数に変換
      var str = num.toString(26); //26進数に変換
      str = str.replace(/10(.)/, "Z$1")
                .replace(/11(.)/, "\[$1")
                 .replace(/12(.)/, "\\$1"); //26進数の3桁を置換
      var code = [["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p"],
                  ["@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y"]];
      for(var i=0; i<26; i++){
        str = str.replace(new RegExp(code[0][i],"g"),code[1][i]);
        str= ("@"+str).slice(-2);  //ゼロ埋め
      }
      return str;
    }
    str = "EDEL" + size + ",0,740" + str;
    return str;
  },
  aug:aug,
  aug2:aug2
 };
};
