[![Code Climate](https://codeclimate.com/github/HirotsuguKaga/Braille.js/badges/gpa.svg)](https://codeclimate.com/github/HirotsuguKaga/Braille.js)
[![GitHub version](https://badge.fury.io/gh/HirotsuguKaga%2FtactileGraph.js.svg)](https://badge.fury.io/gh/HirotsuguKaga%2FtactileGraph.js)
[![License](https://img.shields.io/cocoapods/l/SAHistoryNavigationViewController.svg?style=flat)](http://cocoapods.org/pods/SAHistoryNavigationViewController)

# tactileGraph.js
Just a 'canvas like' tactile graphic drawing library.


## Usage
　任意の変数に""オブジェクトを代入してオブジェクトを作成する。
　作成したオブジェクトのプロパティ―として各メソッドを実行する。
　ex.　var bg = brailleGraph

## Propaties
name: ダウンロードされるファイルの名称。
arr: データの本体。点のy座標の値を千倍してx座標の値を加算した4～6桁の数値を配列として保持する。
canvas: プレビューを表示するCanvas要素のID。
size: 用紙サイズ。デフォルトはA4。


## Methods
　drawDot(x, y);
　drawBraille(str, x, y );
　drawLine(x1, y1, x2, y2 );
　strokeRect(x, y, w, h );
　fillRect(x, y, w, h );
  strokeCircle(r, x, y);
　convertText(str);


## 描画系
### drawDot(int x, int y);
 指定した座標に点を打つ。
 
### drawBraille(string str, int x, int y );
 点字文字列を描画する。点字に変換できない文字が含まれる場合はアラートを表示する。座標は1文字目の1の点を表す。省略した場合は(0,0)。

### drawLine(int x1, int y1, int x2, int y2 );
 始点座標(x1, y1)から終点座標(x2, y2)に点線を描画する。

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
### map2esa();
　map2esa用のPNG画像データをdataURLとして返す。


## その他
### convertText(str);
 濁点や拗音などを記号に置き換えた文字列を返す。数字列の直前に数符を挿入し、数字の後にア行やラ行の文字がある場合は、間に繋ぎ符（＿）を挿入する。漢字や分かち書き、長音の点訳、外字符や大文字符の挿入は未対応。
