[![Code Climate](https://codeclimate.com/github/HirotsuguKaga/Braille.js/badges/gpa.svg)](https://codeclimate.com/github/HirotsuguKaga/Braille.js)
[![GitHub version](https://badge.fury.io/gh/HirotsuguKaga%2FtactileGraph.js.svg)](https://badge.fury.io/gh/HirotsuguKaga%2FtactileGraph.js)
[![License](https://img.shields.io/cocoapods/l/SAHistoryNavigationViewController.svg?style=flat)](http://cocoapods.org/pods/SAHistoryNavigationViewController)

# tactileGraph.js
Just a 'canvas like' tactile graphic drawing library.:octocat:
  
***
***
## 概要
html5のキャンバス的な簡単な命令で、エーデルやMAP2ESA用の触図データを作成するJavaScriptライブラリです。
   
## 使い方
1. 任意の変数に""オブジェクトを代入してオブジェクトを作成する。
2.　作成したオブジェクトのプロパティ―として各メソッドを実行する。
　```javascript
　var tg = tactileGraph;
　tg.drawBraille("ABCDEF", 0, 10);
　tg.drawLine(0,20,50,20);
　```
3. 出力メソッドを用いて触図データを取り出す。
```javascript
hoge.href = map2esa();
```
　　
***
   
## 一覧
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
 指定した座標に点を打つ。
  
### drawBraille(string str, int x, int y , int returnX);
 点字文字列を描画する。点字に変換できない文字が含まれる場合はアラートを表示する。座標は1文字目の1の点の位置を表す。
 第一、第二引数を省略した場合は(0,0)から。
 第五引数はオプションで改行位置の座標を表す。省略た場合は用紙の端で改行する。
  
### drawLine(int x1, int y1, int x2, int y2 );
 始点座標(x1, y1)から終点座標(x2, y2)に点線を描画する。第三、第四引数を省略いた場合は、前回の描画の終点から第一、第二引数の座標へ線を描画する。
 （デフォルトは(0,0)から）
  
### strokeRect(int x, int y, int width, int height);
 左上の角(x,y)を起点に指定した幅と高さの長方形の枠線を点線で描画する。長方形のサイズは点の間隔の倍数に設定すると角がうまく収まる。
  
### fillRect(int x, int y, width, height);
 左上の角(int x, int y)を起点に指定した幅と高さの長方形を点線と同じ間隔の点で埋める。
  
### strokeCircle(int r, int x, int y);
 指定した座標を中心に半径rの円を描画する。
  
## 設定系
### setCanvas(String id);
　プレビューを表示するためのcanvas要素のidを指定する。
  
### setSize(String size);
　用紙サイズを設定する。
  
### setInterval(int num)
　直線や長方形、円形等を描画する際の点の間隔を設定する。デフォルトは6。
  
## 入出力系
### loadEdl();
 エーデル用の触図データを返す。
  
### map2esa();
　map2esa用のPNG画像データをdataURLとして返す。

### clear();
 触図データをリセットする。
  
## その他
### convertText(str);
 濁点や拗音などを記号に置き換えた文字列を返す。数字列の直前に数符を挿入し、数字の後にア行やラ行の文字がある場合は、間に繋ぎ符（＿）を挿入する。漢字や分かち書き、長音の点訳、外字符や大文字符の挿入は未対応。
