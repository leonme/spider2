---
title: React实例入门教程(1)基础API,JSX语法
date: 2016-11-07 15:51:47
comments: true
categories: HTML5
---

#React实例入门教程(1)基础API,JSX语法
　　毫无疑问，react是目前最最热门的框架(没有之一)，了解并学习使用React，可以说是现在每个前端工程师都需要的。
　　在前端领域，一个框架为何会如此之火爆，无外乎两个原因：性能优秀，开发效率高。React当然集成了这两大优点。
　　这要归功于React的两大特点，也是该框架一直强调的优势：
　　1.虚拟dom与dom diff：在React中，一切的更新都是先更新虚拟dom，再根据react自带的dom diff 算法，进行对比计算，在实际dom中实现最小粒度的更新，这就是React性能优秀的原因了！
　　2.一切皆是组件：React强调一切皆是组件，那么组件就是React的核心元素，在使用React开发时，开发人员会对各种颗粒进行组件化开发，自然而然的提升了代码复用度，提升了开发效率。
　　本系列文章，每篇都会有个小实例，带领大家一步步的走进React开发的世界。
　　
文章预告　　　本系列文章分为
　　React实例入门教程(1)基础API,JSX语法--hello world
　　React实例入门教程(2)组件与组件的生命周期--弹窗组件
　　React实例入门教程(3)数据流之props与state--实时更新的倒计时组件
　　React实例入门教程(4)事件处理--事件丰富的swipe组件
　　React实例入门教程(5)总结--咪咕阅读首页开发实战
　　　　　　　　　　　　　　　　　　　　　　　　　
LET'S START　　作为本系列教程的第一篇，按照国际惯例，我们先从HELLO WORLD 开始~，那么先看看本例的代码吧：
　　
```html
<!DOCTYPE html>; 
<html lang="en"> 
	<head>     
		<meta charset="UTF-8">     
		<title>hello world</title>     
		<script src="react.js"></script>     
		<script src="react-dom.js"></script>     
		<script src="browser.min.js"></script> 
	</head> 
	<body>     
		<div id="demo"></div>     
		<script type="text/babel">         
			var Helloworld = React.createClass({ 
				render:function(){  
            		return <div>hello world</div>;             }         			});
              ReactDOM.render(<Helloworld/>,document.getElementById("demo")); 
        </script> 
    </body> 
</html>
```
　　以上代码需要注意：最后的<script>标签type是&ldquo;text/babel&rdquo;。因为React使用的是JSX语法，他与传统js语法不兼容，所以type要选择babel。
　　最开始引入的js中，react和react-dom是react基础库，而browser.js是用来线上分析JSX语法的，真实项目上线中并不会引用这个，而是再上线前进行编译（使用工具babel等）转换成传统js语法再上线。（因为browser线上编译很影响性能）。为了方便大家的学习，现在这里直接引入了该js。
从上面示例代码可以看到，我们使用一些API，这些API都是非常基础的，下面我来做简单的介绍：
从上面示例代码可以看到，我们使用一些API，这些API都是非常基础的，下面我来做简单的介绍：　　
React.createClass:　　　　前言里说到react一切皆是组件，那么React.createClass就是最基本的创建组件的方法，它的第一个传入参数是json对象，代表组件的主体，该json其中，有必带的和可选择的参数，其必带参数为render，类型是函数要求返回该组件的模版。
　　使用方式可见篇头示例，具体细节会在后续组件章节中做介绍。
　　
ReactDOM.render:　　ReactDOM.render 是 React 的最基本方法，用于将模板(html，jsx,React.createElement等)转为 HTML ，并插入指定的 DOM 节点。
　　看下面的示例代码

```html
 　ReactDOM.render(<h1>HELLO,REACT!</h1>,document.getElementById("example")); 
```

　　就是将一段html结构输出到id为example浏览器，效果如下：
![picture](http://images2015.cnblogs.com/blog/354376/201611/354376-20161102150429518-2077470571.png)
&nbsp;
　　JSX即JavaScript XML，即一种在React内部构建的标签语法，React不使用JSX一样可以工作，但是使用JSX可以让代码简洁，提高代码可读性，因此推荐使用：
　　那么，我们来看看对比，前面示例代码中，使用了JSX语法的语句为：
 <Helloword/> 　　如果不使用JSX语法将变成：
 React.createElement("Helloword",{},""); 　　可见JSX语法的优势。
　　那么让我们来学习JSX语法：
　　JSX和HTML很像，但却不同于HTML，JSX中标签名可以是HTML标签，也可以是自己定义的组件，如前面示例中的Helloworld组件。那么我们来具体看看JSX与HTML的不同处和需要注意的地方：
　　
属性引用：　　
```html
 <div id="some-id" class="some-class" style="color:red;">...</div> 　　
```
JSX ：
```html
 <div id="someId" className={someClass} style={{color:red}}>...</div> 
```
　　如上示例所示，JSX语法中，属性的引入拥有HTML的方式（文本直接赋值）；也可以引用JS变量（如：someClass）,方式是使用大括号包裹，其中要注意的是，class在JSX中要写成className，style的 赋值要写成json的引入 ，如上例。
　　
条件判断：　　在JSX标签的属性中，我们可以使用条件判断来根据条件生成JSX，JSX允许的条件判断方式是，三目运算符，逻辑与(&amp;&amp;)运算符，使用变量，使用函数。
　　看面的示例代码：
　　给出一个函数：
```html
 function getNumber(){ 　return Math.floor(Math.random()*100); } 　　对应JSX片段：
 　　<div className={this.state.num>1?"demo1":"demo2"} >{getNumber()}</div> 　　这段jsx 会根据this.state.num值来选择对应的class，并随机生成数字来填充内容。
```
事件绑定JSX中，和HTML事件绑定类似，对应的事件名称为onClick,onChange等：
JSX中，和HTML事件绑定类似，对应的事件名称为onClick,onChange等： 　　<div onClick={this.handleClick}>...</div> 　　
特殊用法　　数组引入：
```html
 var jsxArr = [<div>1</div>,<div>2</div>,<div>3</div>,<div>4</div>]; ReactDOM.render(<div>{jsxArr}</div>,...);  输出的结果等同于 ReactDOM.render(<div><div>1</div><div>2</div><div>3</div><div>4</div></div>,...); 
```
JSX可以根据数组直接遍历产出JSX结构　　
循环遍历：
```html
 var demos= ['demo1', 'demo2', 'demo3']; ReactDOM.render(   <div>   {     demos.map(function (demo) {       return <div>Hello, {demo}</div>     })   }   </div>,...);
```
产出的结果为：
 Hello，demo1！ Hello，demo2！ Hello，demo3！  你看懂了么~

以上就是对React 基础API，和 JSX语法的介绍讲解了，那么回头看看最初的示例代码，是不是已经了解如何使用了呢？