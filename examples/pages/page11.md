---
title: CSS Float 以及相关布局模式
date: 2016-11-04 14:48:34
comments: true
categories: HTML5
---

#CSS Float 以及相关布局模式
float 取值
看一个栗子
红色线框代表父元素

 
脱离文档流，其实也没有完全脱离，会被父元素的边界挡住。
 
float的元素在同一文档流
看一个栗子:
红线框代表父元素

三个子元素『向左浮动』之后， 父元素就没有内容了，所以父元素没有高度了。
 
 
float元素半脱离文档流
对元素，脱离文档流；对内容，在文档流。元素时会重叠，但是内容不会重叠。

 
举个栗子：

 
 
 
再举一个栗子:

通常我们并不想要这个结果，而是粉色div 只被第一个文字块环绕。 需要使用 clear 属性
 
 
clear
要理解clear，首先要知道 div是块级元素，在页面中独占一行，自上而下排列，也就是传说中的流
①应用于后续元素, 来清除浮动对后续的影响。
②应用于块级元素
 
使用方式：
增加一个空白元素(用得较少)
clearfix，这是一般通用方案。实际上是用一个不可用的点号，来清除浮动。
 
举个栗子：

 
 
 
推荐一篇关于【float 和 clear】的好文章： http://www.cnblogs.com/iyangyuan/archive/2013/03/27/2983813.html