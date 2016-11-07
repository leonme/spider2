![picture](http://images2015.cnblogs.com/blog/807753/201611/807753-20161105122057752-1621318460.png)
[https://fanyear.github.io/Canvas/Magnifier/index.html](https://fanyear.github.io/Canvas/Magnifier/index.html)
![picture](http://images2015.cnblogs.com/blog/807753/201611/807753-20161105122127783-450591113.png)
![picture](http://images2015.cnblogs.com/blog/807753/201611/807753-20161105122146221-1120847246.png)
[&nbsp;&nbsp;https://fanyear.github.io/Canvas/StarTwinkling/index.html&nbsp;&nbsp;](https://fanyear.github.io/Canvas/StarTwinkling/index.html)
![picture](http://images2015.cnblogs.com/blog/807753/201611/807753-20161105122159049-1742732095.png)
&nbsp;
![picture](http://images2015.cnblogs.com/blog/807753/201611/807753-20161105122220440-1832656437.png)
&nbsp;
&nbsp;

1 &lt;canvas id="canvas"&gt;
2     Your browser doesn't support Canvas　　　　// 当浏览器不支持Canvas 的时候 才会显示 
3 &lt;/canvas&gt;
&nbsp;

1 var CANVASWIDHT = 800;
2 var CANVASHEIGHT = 600;
3 
4 var canvas = document.getElementById("canvas");
5 var context = canvas.getContext("2d");
&nbsp;
&nbsp;　
　2.2基本操作　　　　
ontext.moveTo(x,y) 就像是画画将笔放在画布上对应的x,y坐标上。
 context.moveTo(100,100)      // 起点
 context.lineTo(200,200)        //可直接使用 若没有moveTo
 
  
 context.lineWidth = 6 
 context.strokeStyle = "red"  
 context.fillStyle = "blue"


 context.fill()        //绘制
 context.stroke()  
/ * 有多种颜色表示方法 #bbb #123456 rgb(1,2,3) rgba(1,2,3,0.6) hsl(20,50%,28%) hsla(40,80%,20%,0.5) */
lineCap 属性设置或返回线条末端线帽的样式&nbsp;　　　　　　butt(默认) 向线条的每个末端添加平直的边缘。
　　　　　　round 向线条的每个末端添加圆形线帽。
　　　　　　aquare 向线条的每个末端添加正方形线帽。 

　　lineJoin   属性设置或返回所创建边角的类型，当两条线交汇时。

　　　　　　miter  (默认)创建尖角 
　　　　　　bevel  创建斜角
　　　　　　round 创建圆角
 　　
　　miterLimit    有个默认值 可修改

W3C 这样解释的：![picture](http://images2015.cnblogs.com/blog/807753/201611/807753-20161105131116018-755373713.jpg)
&nbsp;　
&nbsp;
　
2.3当需要画多条路径的时候，就要用到beginPath() closePath()beginPath() 开始画新的路径&nbsp;
2.4画矩形&nbsp;

context.moveTo(100,200)
context.lineTo(300,200)
context.strokeStyle = "red"
context.stroke()
 
     
context.moveTo(400,500)
context.lineTo(500,500)
context.strokeStyle = "blue"
context.stroke()


 //结果都为蓝色 因为第二个context.stroke() 把第一个context.stroke() 覆盖了 应在两段代码之间加上 context.beginPath()
&nbsp;
 translate(x,y)   位移  效果会叠加 （所以要用到 save()  restore()）
 rotate(deg)       旋转
 scale(x,y)        会改变其他属性

save()　　 保存当前状态
restore() 　　取出保存状态

![picture](http://images2015.cnblogs.com/blog/807753/201611/807753-20161105131714440-1279732994.jpg)
　　其中transform() &nbsp; 级连
　　而setTransform() 不级连，将之前状态变为默认状态，再进行设置。
![picture](http://images2015.cnblogs.com/blog/807753/201611/807753-20161105131729205-199029050.jpg)
&nbsp;
　　　　
![picture](http://images2015.cnblogs.com/blog/807753/201611/807753-20161105132040502-1402299246.jpg)
![picture](http://images2015.cnblogs.com/blog/807753/201611/807753-20161105132054408-1471271292.jpg)
　　　　
step 3　　
　　
![picture](http://images2015.cnblogs.com/blog/807753/201611/807753-20161105132605815-1726063786.jpg)
![picture](http://images2015.cnblogs.com/blog/807753/201611/807753-20161105132637893-78517796.jpg)
　
&nbsp;
