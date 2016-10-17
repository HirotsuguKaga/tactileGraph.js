[![Code Climate](https://codeclimate.com/github/HirotsuguKaga/Braille.js/badges/gpa.svg)](https://codeclimate.com/github/HirotsuguKaga/Braille.js)
[![License](https://img.shields.io/cocoapods/l/SAHistoryNavigationViewController.svg?style=flat)](http://cocoapods.org/pods/SAHistoryNavigationViewController)

# Braille.js
Braille.js is a canvas like tactile graphic drawing library.


# 使い方
　任意の変数に""オブジェクトを代入してオブジェクトを作成する。
　作成したオブジェクトのプロパティ―として各メソッドを実行する。
　ex.　var bg = brailleGraph

## Propaties
name: ダウンロードされるファイルの名称。
arr: データの本体。点のy座標の値を千倍してx座標の値を加算した4～6桁の数値を配列として保持する。
canvas: プレビューを表示するCanvas要素のID。
size: 用紙サイズ。デフォルトはA4。


## メソッド一覧
　drawDot(x, y);
　drawBraille(str, x, y );
　drawLine(x1, y1, x2, y2 );
　strokeRect(x, y, w, h );
　fillRect(x, y, w, h );
　convertText(str);


# 描画系
drawDot(int x, int y);
 指定した座標に点を打つ。
 
drawBraille(string str, int x, int y );
 点字文字列を描画する。点字に変換できない文字が含まれる場合はアラートを表示する。座標は1文字目の1の点を表す。省略した場合は(0,0)。

drawLine(int x1, int y1, int x2, int y2 );
 始点座標(x1, y1)から終点座標(x2, y2)に点線を描画する。

strokeRect(int x, int y, int width, int height);
 左上の角(x,y)を起点に指定した幅と高さの長方形の枠線を点線で描画する。

fillRect(int x, int y, width, height);
 左上の角(int x, int y)を起点に指定した幅と高さの長方形を点線と同じ間隔の点で埋める。


# 設定系
setCanvas(String id);
setSize(String size);

# 入出力系
loadEdl();

# その他
convertText(str);
