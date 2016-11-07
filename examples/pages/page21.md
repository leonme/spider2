---
title: CSS Float 以及相关布局模式
date: 2016-11-07 15:51:47
comments: true
categories: HTML5
---

#CSS Float 以及相关布局模式
float 取值
   属性 值 描述  &nbsp; left 向左浮动  &nbsp; right 向右浮动  &nbsp; none 默认值  &nbsp; inherit 继承红色线框代表父元素
[img title="image" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="image" src="http://images2015.cnblogs.com/blog/601779/201611/601779-20161101104410611-676296378.png" width="656" height="414"](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101104407346-1373359635.png)
![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101104410611-676296378.png)
&nbsp;
脱离文档流，其实也没有完全脱离，会被父元素的边界挡住。
&nbsp;
看一个栗子:
红线框代表父元素
[img title="image" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="image" src="http://images2015.cnblogs.com/blog/601779/201611/601779-20161101104506643-1789812791.png" width="1159" height="322"](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101104442533-2066410256.png)
![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101104506643-1789812791.png)
三个子元素『向左浮动』之后， 父元素就没有内容了，所以父元素没有高度了。
&nbsp;
&nbsp;
对元素，脱离文档流；对内容，在文档流。元素时会重叠，但是内容不会重叠。
[img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="http://images2015.cnblogs.com/blog/601779/201611/601779-20161101104512627-1448273561.png" width="1070" height="159"](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101104509440-943711875.png)
![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101104512627-1448273561.png)
&nbsp;
举个栗子：
DOCTYPE html&gt; &lt;html&gt; &lt;head&gt;     &lt;meta charset="utf-8"&gt;     &lt;title&gt;float元素半脱离文档流&lt;/title&gt;     &lt;style type="text/css"&gt;     body{         width: 300px;padding: 5px;line-height: 1.6;         border: 1px dashed blue;     }     .sample{         height: 100px;margin-right: 5px;         padding: 0 5px; line-height: 100px;background-color: pink;     }     .sb{         outline: 1px dashed  red;     }     .sample{         float: left;     }     &lt;/style&gt; &lt;/head&gt; &lt;body&gt; &lt;div class="sample"&gt;float : left &lt;/div&gt; &lt;div class="sb"&gt; A float is a box that is shifted to the left or right on the current line . the most interesting characteristic of a float (o "floated" o "floating" box) is that content may flow along its side (or be prohibited from doing so by the 'clear' property). &lt;/div&gt; &lt;/body&gt; &lt;/html&gt;[img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="http://images2015.cnblogs.com/blog/601779/201611/601779-20161101104517315-1460055365.png" width="418" height="320"](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101104514721-525697493.png)
![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101104517315-1460055365.png)
&nbsp;
&nbsp;
&nbsp;
DOCTYPE html&gt; &lt;html&gt; &lt;head&gt;     &lt;meta charset="utf-8"&gt;     &lt;title&gt;float abscure&lt;/title&gt;     &lt;style type="text/css"&gt;     body{         width: 400px;line-height: 1.6;     }     .sample{         width: 100px;line-height: 100px;         margin: 3px;text-align: center;         background-color: pink;     }     .sb{         margin: 10px auto; padding: 5px; border: 1px dashed #0f00fa;     }     .sample{         float: left;     }          &lt;/style&gt; &lt;/head&gt; &lt;body&gt;     &lt;div class="sb"&gt;             &lt;div class="sample"&gt;float: left;&lt;/div&gt;         第十二届ChinaJoy 动漫游戏展7月31号在上海新国际博览中心开幕，导出是站台表演的帅哥美女。     &lt;/div&gt;          &lt;div class="sb"&gt;         有些游戏商为了吸引人气，还请来了著名的演员、模特前来助阵。以下是一批漂亮的Show Girl现场照片。     &lt;/div&gt; &lt;/body&gt; &lt;/html&gt;[img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="http://images2015.cnblogs.com/blog/601779/201611/601779-20161101111450002-927697139.png" width="457" height="217"](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101111446986-468997174.png)
![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101111450002-927697139.png)
通常我们并不想要这个结果，而是粉色div 只被第一个文字块环绕。 需要使用 
 属性
 属性&nbsp;
&nbsp;
   属性名 值 描述  clear both 包含left 和 right  &nbsp; left 左侧不允许其他浮动元素  &nbsp; right 右侧不允许其他浮动元素  &nbsp; none 默认值  &nbsp; inherit &nbsp;①应用于后续元素, 来清除浮动对后续的影响。
②应用于块级元素
&nbsp;
增加一个空白元素(用得较少)
clearfix，这是一般通用方案。实际上是用一个不可用的
来清除浮动。
点号，来清除浮动。&nbsp;
举个栗子：
&lt;!DOCTYPE html&gt; &lt;html&gt; &lt;head&gt;     &lt;meta charset="utf-8"&gt;     &lt;title&gt;float abscure&lt;/title&gt;     &lt;style type="text/css"&gt;     body{         width: 400px;line-height: 1.6;     }     .sample{         width: 100px;line-height: 100px;         margin: 3px;text-align: center;         background-color: pink;     }     .sb{         margin: 10px auto; padding: 5px; border: 1px dashed #0f00fa;     }     .sample{         float: left;     }     .clearfix:after{         content: '.';     /* 在clearfix后面加入一个 . */         display: block; /* 设置 . 块级元素 */         clear: both;  /* 清除浮动效果 */         /*隐藏那个 .  */         height: 0;                overflow: hidden;         visibility: hidden;     } /*    .clearfix{     zoom: 1; 由于在IE 低版本中，不支持after属性，所以需要增加zoom属性      } */     &lt;/style&gt; &lt;/head&gt; &lt;body&gt;     &lt;div class="sb clearfix"&gt;             &lt;div class="sample"&gt;float: left;&lt;/div&gt;         第十二届ChinaJoy 动漫游戏展7月31号在上海新国际博览中心开幕，导出是站台表演的帅哥美女。     &lt;/div&gt;          &lt;div class="sb"&gt;         有些游戏商为了吸引人气，还请来了著名的演员、模特前来助阵。以下是一批漂亮的Show Girl现场照片。     &lt;/div&gt; &lt;/body&gt; &lt;/html&gt;[img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="http://images2015.cnblogs.com/blog/601779/201611/601779-20161101115629627-17841501.png" width="502" height="247"](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101115624580-890953404.png)
![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101115629627-17841501.png)
&nbsp;
&nbsp;
&nbsp;
推荐一篇关于【float 和 clear】的好文章： 
[http://www.cnblogs.com/iyangyuan/archive/2013/03/27/2983813.html](http://www.cnblogs.com/iyangyuan/archive/2013/03/27/2983813.html)
