[![Code Climate](https://codeclimate.com/github/HirotsuguKaga/Braille.js/badges/gpa.svg)](https://codeclimate.com/github/HirotsuguKaga/Braille.js)
[![GitHub version](https://badge.fury.io/gh/HirotsuguKaga%2FtactileGraph.js.svg)](https://badge.fury.io/gh/HirotsuguKaga%2FtactileGraph.js)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
# tactileGraph.js
***
デモや詳しい説明はこちらへ: https://hirotsugukaga.github.io/tactileGraph.js/
***
## 概要
html5のキャンバスライクなシンプルな命令で、エーデルやMAP2ESA用の触図データを作成するJavaScriptライブラリです。
   :octocat::octocat::octocat:
## 使い方
### インストール
```html
<script src="tactileGraph.js"></script>
　or
<script src="tactileGraph.min.js"></script>
```
### JavaScript
1. 初期設定 
```javascript
var tg = tactileGraph;
tg.setCanvas('hoge'); //プレビュー用CanvasのIDを指定（任意）
```
2. 描画 
```javascript
tg.drawBraille("ABCDEF", 0, 10);
tg.drawLine(0,20,50,20);
　etc.
```
3. 出力
```javascript
hoge.href = tg.loadEdl();
　and/or
hoge.href = tg.map2esa();
```
　　
***
   
## 主なメソッド
* drawDot(x, y);
* drawBraille(str, x, y );
* drawLine(x1, y1, x2, y2 );
* strokeRect(x, y, w, h );
* fillRect(x, y, w, h );
* strokeCircle(r, x, y);
* setCanvas(id);
* setSize(str);
* setInterval(num);
* loadEdl();
* map2esa();
* clear();
* convertText(str);
  
  

## 描画系
### drawDot(int x, int y);
 指定した座標に点を打つ。全ての描画の基礎となるメソッドです。
  
### drawBraille(string str, int x, int y , int returnX);
 点字文字列を描画します。点字に変換できない文字が含まれる場合はアラートを表示します。座標は1文字目の1の点の位置を表し、 第一、第二引数を省略した場合はデフォルトを(0,0)として描画します。
 第五引数はオプションで改行位置の座標を指定します。省略した場合は用紙の端で改行します。

####arr2braille(Array, int x, int y, int returnX);
 点字の打点を数字を羅列した配列を指定し、点字文を描画します。  
 ex. arr2braille(['123','145','123456','356'],10,100);

### drawLine(int x1, int y1, int x2, int y2 );
 始点座標(x1, y1)から終点座標(x2, y2)に点線を描画します。第三、第四引数を省略いた場合、前回の描画の終点から第一、第二引数の座標へ線を描画します。
 （デフォルトは(0,0)）
  
### strokeRect(int x, int y, int width, int height);
 左上の角(x,y)を起点に指定した幅と高さの長方形の枠線を点線で描画します。長方形のサイズは点の間隔の倍数に設定すると角がうまく収まります。
#### strokeRect(int x, int y, int width, int height, int angle);
 四つ目の引数に角度を指定し、長方形を時計回りに回転させます。
 
### strokeRhombus(int x, int y, w, h);
 菱形を描画します。

### fillRect(int x, int y, width, height);
 左上の角(int x, int y)を起点に指定した幅と高さの長方形を点線と同じ間隔の点で埋めます。
  
### strokeCircle(int r, int x, int y);
 指定した座標を中心に半径rの円を描画します。
 
### drawPattern(Array[[x1,y1],[x2,y2],[x3,y3]...], int x, int y);
 指定した座標を原点として、二次元配列として渡した点集合を描画します。

### clearDot(int x, int y);
 指定した座標の点を取り除きます。

### clear();
 触図データをリセットします。
 

## 設定系
### setCanvas(String id);
　スクリーン上でのプレビューやｙ立体コピー用紙用の触図を表示するためのcanvas要素のidを指定します（任意）。
  
### setSize(String size);
　用紙サイズを設定します。現在はA4とB5の二種類（デフォルトはA4）です。
  
### setInterval(int num)
　直線や長方形、円形等を描画する際の点の間隔を設定します。（デフォルトは6）

### setColor(color)
　プレビュー用canvasの描画色を指定します。（デフォルトは黒）
  
## 入出力系
### loadEdl();
 エーデル用の触図データを文字列として返します。

### readEdl(String);
 tactileGraphオブジェクトにエーデルファイルの中身を文字列として読み込みます。現行の点図に重ね書きするため、必要に応じて事前にclear()メソッドを実行してください。
 
### map2esa();
　map2esa用のPNG画像データを返します。
  
## その他
### convertText(str);
 濁点や拗音などを記号に置き換えた文字列を返します。数字列の直前に数符を挿入し、数字の後にア行やラ行の文字がある場合は間に繋ぎ符（3,6の点）を挿入します。漢字や分かち書き、長音の変換、外字符や大文字符の挿入は未対応です。
