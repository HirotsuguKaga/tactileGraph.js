function kleintype( str, posx, posy, returnX){
    posx = posx || 0;
    posy = posy || 0;
    var pos = posx;
    var line = posy;
    returnX = returnX || this.sizeX;
    var kl00=[[1,3,5,7,9,10,11,13,15,16,17,19,21,23,25],[34,29,24,18,12,24,7,1,7,24,13,18,24,29,34]];
    var kl01=[[1,1,1,1,1,1,5,6,6,11,11,12,15,15,15,15],[1,6,12,21,27,34,17,1,34,17,34,1,6,12,22,29]];
    var kl02=[[1,1,3,3,7,7,14,14,20,20,23,23],[13,20,7,27,2,33,1,35,2,33,7,28]];
    var kl03=[[1,1,1,1,1,1,7,7,12,13,17,18,20,20,20],[1,7,14,21,28,34,1,34,34,1,30,6,12,18,24]];
    var kl04=[[1,1,1,1,1,1,7,7,7,13,13,13,19,19],[1,8,15,21,28,35,1,18,35,1,18,35,1,35]];
    var kl05=[[1,1,1,1,1,1,6,7,12,12,17],[1,7,14,21,28,34,17,1,1,17,1]];
    var kl06=[[1,1,3,4,6,8,13,14,19,20,20,20],[14,20,8,26,3,31,1,33,2,24,28,33]];
    var kl07=[[1,1,1,1,1,1,4,10,16,20,20,20,20,20,20],[1,7,13,21,28,34,17,17,17,1,7,13,21,28,34]];
    var kl08=[[2,2,2,2,2,2],[1,7,14,21,28,35]];
    var kl09=[[1,5,10,16,18,18,18,18,18],[27,31,33,32,1,7,14,21,27]];
    var kl10=[[1,1,1,1,1,1,5,8,9,12,13,16,17,21,21],[1,7,14,21,28,35,17,13,21,9,25,5,30,1,35]];
    var kl11=[[1,1,1,1,1,1,6,13,19],[1,7,14,20,27,34,34,34,34]];
    var kl12=[[1,1,1,1,1,1,5,9,13,16,20,25,25,25,25,25,25],[1,9,16,22,28,34,6,10,14,10,5,1,8,14,20,27,34]];
    var kl13=[[1,1,1,1,1,1,6,9,12,15,18,22,22,22,22,22,22],[1,8,15,22,28,35,6,13,19,24,29,1,8,15,22,28,35]];
    var kl14=[[1,1,2,2,6,6,11,11,17,17,20,20,21],[15,21,9,28,4,32,1,35,5,31,11,26,19]];
    var kl15=[[1,1,1,1,1,1,6,6,12,12,15,15],[1,7,13,20,26,34,1,17,1,17,6,12]];
    var kl16=[[1,1,1,1,3,4,10,10,12,15,16,18,18,18,19,24],[9,14,20,25,4,30,1,32,25,29,4,10,16,22,32,32]];
    var kl17=[[1,1,1,1,1,1,5,5,10,11,11,13,14,14,15,20],[1,6,12,19,26,34,1,16,16,1,21,26,6,11,31,33]];
    var kl18=[[1,3,4,5,5,9,9,12,14,15,15,17,17],[28,9,3,14,32,1,17,33,19,3,29,8,24]];
    var kl19=[[1,6,10,14,14,14,14,14,16,22,27],[1,1,1,6,13,20,26,33,1,1,1]];
    var kl20=[[1,1,1,1,2,7,13,18,19,19,19,19],[1,7,13,20,26,32,32,26,1,7,13,20]];
    var kl21=[[1,3,4,6,8,11,13,15,17,19,21],[1,8,15,21,27,33,27,21,15,8,1]];
    var kl22=[[1,3,5,8,10,12,13,15,15,17,18,20,22,23,25,26,27,29,31,33,34,36,37,39],[1,9,15,22,27,1,33,6,27,12,22,17,12,22,6,27,1,33,27,22,16,10,6,1]];
    var kl23=[[1,1,4,4,7,7,11,14,14,17,17,20,21],[1,33,6,27,11,22,17,11,22,6,27,1,33]];
    var kl24=[[1,4,8,11,11,11,11,15,18,21],[1,7,12,17,22,27,33,12,6,1]];
    var kl25=[[1,1,3,6,7,7,9,12,13,13,15,18,19],[1,34,27,21,1,34,16,11,1,34,6,1,34]];
    var klp=[[2],[34]];
    var klc=[[2,3],[35,34]];
    var kle=[[1,1,1,1,1,1],[1,7,13,19,25,34]];
    var klhi=[[1,7,13],[17,17,17]];
    var def=[[1,1,1,1,1,1,6,6,11,11,16,16,21,21,26,26,26,26,26,26],[6,11,16,21,26,31,6,31,6,31,6,31,6,31,6,11,16,21,26,31]];
    str+="";
    var code = [];
    for (var int = 0; int < str.length; int++){
     var key=str.substring(int,int+1);//i番目の文字を描画
      switch(key){
        case " ":blank();break;
        case "　":blank();break;
        case "A":draw(kl00);break; case "B":draw(kl01);break;
        case "C":draw(kl02);break; case "D":draw(kl03);break;
        case "E":draw(kl04);break; case "F":draw(kl05);break;
        case "G":draw(kl06);break; case "H":draw(kl07);break;
        case "I":draw(kl08);break; case "J":draw(kl09);break;
        case "K":draw(kl10);break; case "L":draw(kl11);break;
        case "M":draw(kl12);break; case "N":draw(kl13);break;
        case "O":draw(kl14);break; case "P":draw(kl15);break;
        case "Q":draw(kl16);break; case "R":draw(kl17);break;
        case "S":draw(kl18);break; case "T":draw(kl19);break;
        case "U":draw(kl20);break; case "V":draw(kl21);break;
        case "W":draw(kl22);break; case "X":draw(kl23);break;
        case "Y":draw(kl24);break; case "Z":draw(kl25);break;
        case "a":draw(kl00);break; case "b":draw(kl01);break;
        case "c":draw(kl02);break; case "d":draw(kl03);break;
        case "e":draw(kl04);break; case "f":draw(kl05);break;
        case "g":draw(kl06);break; case "h":draw(kl07);break;
        case "i":draw(kl08);break; case "j":draw(kl09);break;
        case "k":draw(kl10);break; case "l":draw(kl11);break;
        case "m":draw(kl12);break; case "n":draw(kl13);break;
        case "o":draw(kl14);break; case "p":draw(kl15);break;
        case "q":draw(kl16);break; case "r":draw(kl17);break;
        case "s":draw(kl18);break; case "t":draw(kl19);break;
        case "u":draw(kl20);break; case "v":draw(kl21);break;
        case "w":draw(kl22);break; case "x":draw(kl23);break;
        case "y":draw(kl24);break; case "z":draw(kl25);break;
        case ".":draw(klp);break; case ",":draw(klc);break;
        case "!":draw(kle);break; case "-":draw(klhi);break;
        case "\n":CR();break;
        default:draw(def);break;
      }
    }
    function draw(id) {
      var sp = 5;
      var num=Math.max.apply(null, id[0]) + sp;
      if(pos+num>returnX){CR();}          //改行チェック
      for (var int = 0; int < id[0].length; int++){
        var X=id[0][int];
        var Y=id[1][int];
        code.push([X+pos, Y+line]);
      }
      pos=pos+num+sp;
    }
    function SP(){ //空白
      pos+=50;
    }
    function CR(){ //改行
      var lh=50;
      pos=posx;
      line += lh;
    }
    for(var i=0; i<code.length; i++){  //配列の描画
      this.drawDot(code[i][0],code[i][1]);
    }
  }