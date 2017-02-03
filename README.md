[![Code Climate](https://codeclimate.com/github/HirotsuguKaga/Braille.js/badges/gpa.svg)](https://codeclimate.com/github/HirotsuguKaga/Braille.js)
[![GitHub version](https://badge.fury.io/gh/HirotsuguKaga%2FtactileGraph.js.svg)](https://badge.fury.io/gh/HirotsuguKaga%2FtactileGraph.js)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![JavaScript](https://img.shields.io/badge/language-JavaScript-009922.svg)](LANGUAGE)
# tactileGraph.js
Just a 'canvas like' tactile graphic drawing library.:octocat:
  
***
  日本語：https://github.com/HirotsuguKaga/tactileGraph.js/blob/master/README_ja.md
***
Gh-Pages & DEMO: https://hirotsugukaga.github.io/tactileGraph.js/
***

### REQUREMENT
  ECMA-262 3rd edition or above.
  
### INSTALL
```html
<script src="tactileGraph.js"></script>
  or
<script src="tactileGraph.min.js"></script>
```
### USAGE
```javascript
ex.
  var tg = tactileGraph("canvas", "A4", "edl");  //initial. tactileGraph("[id]","[paper size]", "[EDL or EDI]")

  tg.drawBraille("ABCDEF", 0, 10);  //drawing
  tg.drawLine(0,20,50,20);

  hoge.href = tg.map2esa();  //output
```
## Methods
### Draw Braille
#### drawBraille(string str, int x, int y , int returnX);
  return next letter position ([x, y]).
#### arr2braille(arr, x,y);
#### drawBrailleMath(string str, int x, int y , int returnX);
#### drawBrailleRight(string str, int x, int y);
#### drawBrailleMathRight(string str, int x, int y);
### Draw Graph
#### drawDot(int x, int y);
#### drawLine(int x1, int y1, int x2, int y2 );
#### strokeRect(int x, int y, int width, int height);
#### fillRect(int x, int y, width, height);
#### strokeCircle(int r, int x, int y);
#### strokeRhombus(int x, int y, int width, int height);
#### drawLineTilt(int x1, int y1, int length, int angle);
#### strokeRectTilt(int x, int y, int width, int height, int angle);
#### strokeRhombusTilt(int x, int y, int width, int height, int angle);
#### fillRectTilt(int x, int y, int width, int height, int angle);
#### strokeTable(int x, int y, int width, int height, int cols, int rows);
#### drawPattern(array, int x, int y);
### Clear
#### clearDot(int x, int y);
#### clear();
### Setting
#### setCanvas(String id);
  set a canvas ID for screen preview(option).
#### setSize(String size);
  set paper size(A4, B5, IJB6, IJB5, IJA4, IJB4, & IJA3).
#### setInterval(int num)
  set a distance between dots in a line. (strokeCircle(), drawLine(), strokeRect, etc.)
#### setAdjust(boolean);
  set dot interval adjustment from start position to end position.
#### setDot(int num);
  set dot size. 0: small, 1: middle, 2: large.
####setBraille(LineHeight, Width, Height, Inter-character);
  default is (30,6,7,15).
#### setType(edl or edi);
#### setColor(Color);
  set dot color on preview.
### Output
#### loadEdl();
return string.
#### readEdl(String);
#### map2esa();
return PNG.
#### loadArr();
return array.
### Misc
#### convertText(String str);
return converted string.

#Extension
### USAGE
```javascript
ex.
  var tg = tactileGraph(id, "A4", edl, decapoint, kleintype);  //(id, size, type, aug, aug2)

  tg.aug("ABCDEF", 0, 10);  //eg. draw decapoint
  tg.aug2(0,20,50,20);  //eg. draw kleintype
```
#### decapoint.js
.aug(string str, int x, int y);
#### kleintype.js
.aug(string str, int x, int y);
#### capsule.js
.aug.drawLine();
.aug.drawBraille();
.aug.setDot();
 etc.