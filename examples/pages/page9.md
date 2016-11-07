---
title: 多列布局
date: 2016-11-07 15:51:43
comments: true
categories: HTML5
---

#多列布局
![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135733565-636633711.png)

	`<html> 
	<head>
		<meta charset="utf-8">
		<title>两列布局</title>
		<style type="text/css">
			html,body,.body,.main,.side{ 
				margin: 0;
				padding: 0;         
				height: 100%;     
			}     
			.body{         
				width: 960px;         
				margin: 0 auto;     
			}     
			.main{         
				background-color: pink;     
			}     
			.side{         
				background-color: #bebebe;     
			}          
			.main{         
				float: left;         
				width: 660px;     
			}    
			.side{         
				float: right;         
				width: 300px;     
			}          
			.clearfix:after{         
				content: '.';         
				display: block;         
				clear: both;         
				height: 0;         
				overflow: hidden;         
				visibility: hidden;
			}
		</style>
	</head>
	<body>
	<div class="body clearfix">
		<div class="side">side</div> 
		<div class="main">main</div> 
	</div> 
	</body>
	</html>`

![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135742221-1300447152.png)
main向 左浮动 ，side向右浮动。
main定宽660px, side定宽300px
在main和side 元素的父元素上加 
，用来『清除浮动』，这样后续的元素就不会受到 main和side『浮动动作』的影响。
，用来『清除浮动』，这样后续的元素就不会受到 main和side『浮动动作』的影响。&nbsp;

![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135808908-1524079312.png)
&nbsp;
&nbsp;
&nbsp;
&nbsp;

![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135813236-465393938.png)
&nbsp;
&nbsp;
&nbsp;
&nbsp;
![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135822174-977319174.png)
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;

![picture](http://images2015.cnblogs.com/blog/601779/201611/601779-20161101135915783-1710233814.png)
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;

>css float 属性介绍：
>[http://www.w3school.com.cn/css/css_positioning_floating.asp](http://www.w3school.com.cn/css/css_positioning_floating.asp)
> 如果你使用 chrome浏览器，这里推荐给你一个浏览器插件(用于查看div 分布情况)&nbsp; 
>[Div Density](https://chrome.google.com/webstore/detail/div-density/akhjnfacldhnbhkpmhebkfocmheaicif?hl=zh-CN)
