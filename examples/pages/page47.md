---
title: canvas的基础使用。
date: 2016-11-04 14:48:37
comments: true
categories: HTML5
---

#canvas的基础使用。
�以去相册【canvas用到的图。】看原图。）
 
HTML5的新标签<canvas></canvas>
在使用时会添加id，通过id来获取canvas元素来进行绘图操作。
可以添加样式。在不指定宽高的时候，默认是300px*150px。
指定canvas大小是通过canvas标签的width属性和height属性，而不是通过CSS指定，并且指定时是没有单位的。
使用JavaScript来获取canvas，通过getContext得到绘图的上下文环境。
除了在标签内指定canvas的大小，还可以在JS中指定。
当浏览器不支持canvas时，可以使用以下两种方法。
（当浏览器支持canvas时，canvas标签的内容会被浏览器忽略）
或者
使用到的内容：
canvas.width
canvas.height
canvas.getContext()
 
这三行代码就可以实现绘制一条直线。
moveTo，相当于把笔触放在坐标为100,100的位置。lineTo，就是从100,100画到200,200的位置。此时直线还没绘制出来，使用了context.stroke()方法才绘制出来。（这里的坐标是相对于<canvas>来说的。<canvas>的左上角为坐标原点。）
moveTo和lineTo都是绘制状态设置，而stroke()则是绘制。

除了moveTo，lineTo这两个状态设置。还有：
lineWidth。线条的宽度。
strokeStyle。线条样式（颜色），字符串的格式。
先写状态再写绘制。

绘制多条线段。只需要接上lineTo()就可以。

当最后的lineTo()的坐标和moveTo()的坐标一致，就可以实现首尾衔接的多边形。

矩形，梯形，五星形等的画法同理。
stroke()主要是绘制线条。
 
对多边形进行着色，状态：fillStyle，绘制方法：fill()

绘制路径并且着色：

当画第二个线段/多边形的时候，只需要重新调用moveTo()。

问题：为什么两条线条颜色，粗细一样？
答案：canvas的绘制是基于状态的，在调用第二个线段的stroke()方法时，第一个线段的状态依然起作用，（既绘制了三角形又绘制了第二条线段），而第二个线段的strokeStyle覆盖了第一个线段的strokeStyle。
 
把两个线段的状态分开，方法：beginPath()，在定义路径前调用（moveTo()之前）。相应的，在路径定义完后，使用closePath()。

使用到的内容：
context.moveTo(x1,y1)
context.lineTo(x2,y2)
 
context.beginPath()
context.closePath()
 
context.lineWidth
context.strokeStyle
context.fillStyle
 
context.stroke()
context.fill()
 
绘制七巧板。

 
绘制弧线。参数分别是，圆心的坐标x,y，圆的半径radius，开始的弧度值，结束的弧度值，顺时针转动/逆时针转动（false代表顺时针转动，true代表逆时针转动）。
弧度/角度。
无论顺时针/逆时针，弧度是不变的。
以下是顺时针的角度。

画3/4个圆。arc()也是状态设置。最后一个参数不填时，默认false，即顺时针。

将最后一个参数设置为true时。

 
绘制多段弧。

问题：为什么弧的开始开始和结尾处被一条直线连接起来了？
答案：这是closePath()的另一个作用。当当前绘制的路径不是封闭路径时，使用了closePath()的话，就会自动将这段不封闭的路径在首尾处使用一条线连接。
 
以上代码不使用closePath()就不会首尾相连：

使用closePath()，并且逆时针方向绘制：

不使用closePath()，并且逆时针方向绘制：

填充处理。strokeStyle改为fillStyle。stroke()改为fill()。并且closePath()的效果：

去掉closePath()：

注意：closePath()对于fill()来说是不起作用的。当调用fill()时，无论你是否调用closePath()，会自动将不封闭的内容首尾相连再填充。
使用到的内容：
context.arc(x,y,radius,startingAngle,endingAngle,anticlockwise=false)
