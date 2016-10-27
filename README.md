[![Code Climate](https://codeclimate.com/github/HirotsuguKaga/Braille.js/badges/gpa.svg)](https://codeclimate.com/github/HirotsuguKaga/Braille.js)
[![GitHub version](https://badge.fury.io/gh/HirotsuguKaga%2FtactileGraph.js.svg)](https://badge.fury.io/gh/HirotsuguKaga%2FtactileGraph.js)
[![License](https://img.shields.io/cocoapods/l/SAHistoryNavigationViewController.svg?style=flat)](http://cocoapods.org/pods/SAHistoryNavigationViewController)

# tactileGraph.js
Just a 'canvas like' tactile graphic drawing library.:octocat:
  
***
  日本語：https://github.com/HirotsuguKaga/tactileGraph.js/blob/master/README_ja.md
***
GitHub-Pages: https://hirotsugukaga.github.io/tactileGraph.js/
***

## USAGE
```javascript
ex.
　var tg = tactileGraph;
　tg.drawBraille("ABCDEF", 0, 10);
　tg.drawLine(0,20,50,20);

　hoge.href = map2esa();
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
  
### setSize(String size);
  
### setInterval(int num)
  
## IO
### loadEdl();
  
### map2esa();
  
## Misc
### convertText(str);
