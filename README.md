[![Code Climate](https://codeclimate.com/github/HirotsuguKaga/Braille.js/badges/gpa.svg)](https://codeclimate.com/github/HirotsuguKaga/Braille.js)
[![GitHub version](https://badge.fury.io/gh/HirotsuguKaga%2FtactileGraph.js.svg)](https://badge.fury.io/gh/HirotsuguKaga%2FtactileGraph.js)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

# tactileGraph.js
Just a 'canvas like' tactile graphic drawing library.:octocat:
  
***
  日本語：https://github.com/HirotsuguKaga/tactileGraph.js/blob/master/README_ja.md
***
DEMO: https://hirotsugukaga.github.io/tactileGraph.js/
***
### INSTALL
```html
<script src="tactileGraph.js"></script>
　or
<script src="tactileGraph.min.js"></script>
```
### USAGE
```javascript
ex.
　var tg = tactileGraph;  //initial
 
　tg.drawBraille("ABCDEF", 0, 10);  //drawing
　tg.drawLine(0,20,50,20);

　hoge.href = tg.map2esa();  //output
```

   
## Methods
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
  
  

## Drawing
### drawDot(int x, int y);
  
### drawBraille(string str, int x, int y , int returnX);
  
### drawLine(int x1, int y1, int x2, int y2 );
  
### strokeRect(int x, int y, int width, int height);
  
### fillRect(int x, int y, width, height);
  
### strokeCircle(int r, int x, int y);

### clearDot(int x, int y);

### clear();
 

## Setting
### setCanvas(String id);
set a canvas ID for screen preview(option).
### setSize(String size);
set paper size(A4 or B5).
### setInterval(int num)
set a distance between dots in a line. (strokeCircle(), drawLine(), strokeRect, etc.)
  
## Output
### loadEdl();
return string.
### map2esa();
return PNG.
  
## Misc
### convertText(String str);
return converted string.
