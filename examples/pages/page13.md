---
title: 多列布局 刘江龙 博客园
date: 2016-11-07 15:51:45
comments: true
categories: HTML5
---

#多列布局 刘江龙 博客园
[img title="image" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="image" src="http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135733565-636633711.png" width="323" height="166"](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135731299-707993306.png)
![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135733565-636633711.png)
&gt; &lt;html&gt; &lt;head&gt;     &lt;meta charset="utf-8"&gt;     &lt;title&gt;两列布局&lt;/title&gt;     &lt;style type="text/css"&gt;     html,body,.body,.main,.side{         margin: 0;         padding: 0;         height: 100%;     }     .body{         width: 960px;         margin: 0 auto;     }     .main{         background-color: pink;     }     .side{         background-color: #bebebe;     }          .main{         float: left;         width: 660px;     }     .side{         float: right;         width: 300px;     }          .clearfix:after{         content: '.';         display: block;         clear: both;         height: 0;         overflow: hidden;         visibility: hidden;     }     &lt;/style&gt; &lt;/head&gt; &lt;body&gt; &lt;div class="body clearfix"&gt;     &lt;div class="side"&gt;side&lt;/div&gt;     &lt;div class="main"&gt;main&lt;/div&gt; &lt;/div&gt; &lt;/body&gt; &lt;/html&gt;&nbsp;
[img title="image" style="border-top: 0px; border-right: 0px; background-image: none; border-bottom: 0px; padding-top: 0px; padding-left: 0px; border-left: 0px; display: inline; padding-right: 0px" border="0" alt="image" src="http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135742221-1300447152.png" width="1109" height="474"](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135738002-2125741320.png)
![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135742221-1300447152.png)
main向 左浮动 ，side向右浮动。
main定宽660px, side定宽300px
在main和side 元素的父元素上加 
，用来『清除浮动』，这样后续的元素就不会受到 main和side『浮动动作』的影响。
，用来『清除浮动』，这样后续的元素就不会受到 main和side『浮动动作』的影响。&nbsp;
&nbsp;
[img title="image" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="image" src="http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135808908-1524079312.png" width="337" height="159"](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135744721-225695294.png)
![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135808908-1524079312.png)
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
[img title="image" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="image" src="http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135813236-465393938.png" width="332" height="172"](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135810986-1787803654.png)
![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135813236-465393938.png)
&nbsp;
&nbsp;
&nbsp;
&nbsp;
[img title="image" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="image" src="http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135822174-977319174.png" width="518" height="162"](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135817158-138475864.png)
![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135822174-977319174.png)
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
[img title="image" style="border-left-width: 0px; border-right-width: 0px; background-image: none; border-bottom-width: 0px; padding-top: 0px; padding-left: 0px; display: inline; padding-right: 0px; border-top-width: 0px" border="0" alt="image" src="http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135915783-1710233814.png" width="718" height="183"](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135827643-1840807027.png)
![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135915783-1710233814.png)
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
>css float 属性介绍：
[http://www.w3school.com.cn/css/css_positioning_floating.asp](http://www.w3school.com.cn/css/css_positioning_floating.asp)
> 如果你使用 chrome浏览器，这里推荐给你一个浏览器插件(用于查看div 分布情况)&nbsp; 
[Div Density](https://chrome.google.com/webstore/detail/div-density/akhjnfacldhnbhkpmhebkfocmheaicif?hl=zh-CN)
