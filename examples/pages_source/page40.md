---
title: canvas的基础使用。
date: 2016-11-04 16:17:30
comments: true
categories: HTML5
---

#canvas的基础使用。
<p>目录：</p><p>创建canvas。</p><p>绘制直线、多边形和七巧板。</p><p>绘制弧和圆。</p><p>（有些图过于宽，被挤压了。可以去相册【canvas用到的图。】看原图。）</p><p>&nbsp;</p><p>HTML5的新标签&lt;canvas&gt;&lt;/canvas&gt;</p><p>在使用时会添加id，通过id来获取canvas元素来进行绘图操作。</p><div class="cnblogs_code">
<pre><span style="color: #0000ff">&lt;</span><span style="color: #800000">canvas </span><span style="color: #ff0000">id</span><span style="color: #0000ff">="canvas"</span><span style="color: #0000ff">&gt;&lt;/</span><span style="color: #800000">canvas</span><span style="color: #0000ff">&gt;</span></pre>
</div><p>可以添加样式。在不指定宽高的时候，默认是300px*150px。</p><div class="cnblogs_code">
<pre><span style="color: #0000ff">&lt;</span><span style="color: #800000">canvas </span><span style="color: #ff0000">id</span><span style="color: #0000ff">="canvas"</span><span style="color: #ff0000"> style</span><span style="color: #0000ff">="border:1px solid #aaa;display:block;margin:50px auto;"</span><span style="color: #0000ff">&gt;&lt;/</span><span style="color: #800000">canvas</span><span style="color: #0000ff">&gt;</span></pre>
</div><p>指定canvas大小是通过canvas标签的width属性和height属性，而不是通过CSS指定，并且指定时是没有单位的。</p><div class="cnblogs_code">
<pre><span style="color: #0000ff">&lt;</span><span style="color: #800000">canvas </span><span style="color: #ff0000">id</span><span style="color: #0000ff">="canvas"</span><span style="color: #ff0000"> width</span><span style="color: #0000ff">="1024"</span><span style="color: #ff0000"> height</span><span style="color: #0000ff">="768"</span><span style="color: #0000ff">&gt;&lt;/</span><span style="color: #800000">canvas</span><span style="color: #0000ff">&gt;</span></pre>
</div><p>使用JavaScript来获取canvas，通过getContext得到绘图的上下文环境。</p><div class="cnblogs_code">
<pre><span style="color: #0000ff">var</span> canvas = document.getElementById('canvas'<span style="color: #000000">);
</span><span style="color: #0000ff">var</span> context = canvas.getContext('2d');  <span style="color: #008000">//</span><span style="color: #008000">使用context进行绘制</span></pre>
</div><p>除了在标签内指定canvas的大小，还可以在JS中指定。</p><div class="cnblogs_code">
<pre>canvas.width=1024<span style="color: #000000">;
canvas.height</span>=768;</pre>
</div><p>当浏览器不支持canvas时，可以使用以下两种方法。</p><div class="cnblogs_code">
<pre><span style="color: #0000ff">&lt;</span><span style="color: #800000">canvas</span><span style="color: #0000ff">&gt;</span>当前浏览器不支持canvas，请更换浏览器后再试。<span style="color: #0000ff">&lt;/</span><span style="color: #800000">canvas</span><span style="color: #0000ff">&gt;</span></pre>
</div><p>（当浏览器支持canvas时，canvas标签的内容会被浏览器忽略）</p><p>或者</p><div class="cnblogs_code">
<pre><span style="color: #0000ff">var</span> canvas = document.getElementById("canvas"<span style="color: #000000">);
</span><span style="color: #0000ff">if</span>(canvas.getContext("2d"<span style="color: #000000">)){
    </span><span style="color: #0000ff">var</span> context = canvas.getContext("2d"<span style="color: #000000">);
}</span><span style="color: #0000ff">else</span><span style="color: #000000">{
    alert(</span>"当前浏览器不支持canvas，请更换浏览器后再试。"<span style="color: #000000">)
}</span></pre>
</div><blockquote>
<p>使用到的内容：</p>
<p>canvas.width</p>
<p>canvas.height</p>
<p>canvas.getContext()</p>
</blockquote><p><span style="color: #000000">&nbsp;</span></p><div class="cnblogs_code">
<pre>context.moveTo(100,100<span style="color: #000000">);
context.lineTo(2</span>00,200<span style="color: #000000">);
context.stroke();</span></pre>
</div><p>这三行代码就可以实现绘制一条直线。</p><p>moveTo，相当于把笔触放在坐标为100,100的位置。lineTo，就是从100,100画到200,200的位置。此时直线还没绘制出来，使用了context.stroke()方法才绘制出来。（这里的坐标是相对于&lt;canvas&gt;来说的。&lt;canvas&gt;的左上角为坐标原点。）</p><p>moveTo和lineTo都是绘制状态设置，而stroke()则是绘制。</p><p><img title="绘制一条直线。" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031143820.png" alt="绘制一条直线。" width="312" height="312"></p><p>除了moveTo，lineTo这两个状态设置。还有：</p><p>lineWidth。线条的宽度。</p><p>strokeStyle。线条样式（颜色），字符串的格式。</p><div class="cnblogs_code">
<pre>context.lineWidth = 5<span style="color: #000000">;
context.strokeStyle </span>= 'blue';</pre>
</div><p>先写状态再写绘制。</p><p><img title="直线的粗细，颜色设置。" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031144802.png" alt="直线的粗细，颜色设置。" width="316" height="311"></p><p>绘制多条线段。只需要接上lineTo()就可以。</p><div class="cnblogs_code">
<pre>context.lineTo(100,200);</pre>
</div><p><img title="多个线段。" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031145208.png" alt="多个线段。" width="313" height="312"></p><p>当最后的lineTo()的坐标和moveTo()的坐标一致，就可以实现首尾衔接的多边形。</p><div class="cnblogs_code">
<pre>context.lineTo(100,100);</pre>
</div><p><img title="首尾衔接的多边形。" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031145422.png" alt="首尾衔接的多边形。" width="310" height="312"></p><p>矩形，梯形，五星形等的画法同理。</p><p>stroke()主要是绘制线条。</p><p>&nbsp;</p><p>对多边形进行着色，状态：fillStyle，绘制方法：fill()</p><div class="cnblogs_code">
<pre>context.fillStyle = 'rgb(30,60,90)'<span style="color: #000000">;
context.fill();</span></pre>
</div><p><img title="对多边形着色。" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031150008.png" alt="对多边形着色。" width="313" height="310"></p><p>绘制路径并且着色：</p><div class="cnblogs_code">
<pre><span style="color: #0000ff">var</span> canvas = document.getElementById('canvas'<span style="color: #000000">);
canvas.width </span>= 300<span style="color: #000000">;
canvas.height </span>= 300<span style="color: #000000">;
</span><span style="color: #0000ff">var</span> context = canvas.getContext('2d'<span style="color: #000000">);<br>
context.moveTo(</span>100,100<span style="color: #000000">);
context.lineTo(</span>200,200<span style="color: #000000">);
context.lineTo(</span>100,200<span style="color: #000000">);
context.lineTo(</span>100,100<span style="color: #000000">); context.fillStyle </span>= 'rgb(30,60,90)'<span style="color: #000000">;
context.fill(); context.lineWidth </span>= 5<span style="color: #000000">;
context.strokeStyle </span>= 'blue'<span style="color: #000000">;
context.stroke();</span></pre>
</div><p><img title="多边形的绘制并着色。" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031150248.png" alt="多边形的绘制并着色。" width="316" height="311"></p><p>当画第二个线段/多边形的时候，只需要重新调用moveTo()。</p><div class="cnblogs_code">
<pre>context.moveTo(200,100<span style="color: #000000">);
context.lineTo(</span>250,250<span style="color: #000000">);
context.strokeStyle </span>= 'red'<span style="color: #000000">;
context.stroke();</span></pre>
</div><p><img title="绘制第二个线段。" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031150733.png" alt="绘制第二个线段。" width="312" height="312"></p><p><strong>问题：为什么两条线条颜色，粗细一样？</strong></p><p><strong>答案：canvas的绘制是基于状态的，在调用第二个线段的stroke()方法时，第一个线段的状态依然起作用，（既绘制了三角形又绘制了第二条线段），而第二个线段的strokeStyle覆盖了第一个线段的strokeStyle。</strong></p><p>&nbsp;</p><p>把两个线段的状态分开，方法：beginPath()，在定义路径前调用（moveTo()之前）。相应的，在路径定义完后，使用closePath()。</p><p><img title="分开两个线段的状态。" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031151557.png" alt="分开两个线段的状态。" width="314" height="313"></p><blockquote>
<p>使用到的内容：</p>
<p>context.moveTo(x1,y1)</p>
<p>context.lineTo(x2,y2)</p>
<p>&nbsp;</p>
<p>context.beginPath()</p>
<p>context.closePath()</p>
<p>&nbsp;</p>
<p>context.lineWidth</p>
<p>context.strokeStyle</p>
<p>context.fillStyle</p>
<p>&nbsp;</p>
<p>context.stroke()</p>
<p>context.fill()</p>
</blockquote><p><span>&nbsp;</span></p><p><span>绘制七巧板。</span></p><div class="cnblogs_code">
<pre><span style="color: #0000ff">&lt;</span><span style="color: #800000">canvas </span><span style="color: #ff0000">id</span><span style="color: #0000ff">="canvas"</span><span style="color: #ff0000"> style</span><span style="color: #0000ff">="border:1px solid #aaa;display: block;margin: 50px auto;"</span><span style="color: #0000ff">&gt;</span><span style="color: #000000">
    当前浏览器不支持canvas，请更换浏览器后再试。
</span><span style="color: #0000ff">&lt;/</span><span style="color: #800000">canvas</span><span style="color: #0000ff">&gt;</span></pre>
</div><div class="cnblogs_code">
<pre><span style="color: #0000ff">var</span> tangram =<span style="color: #000000"> [
        {p:[{x:</span>0,y:0},{x:800,y:0},{x:400,y:400}],color:'red'<span style="color: #000000">},
    {p:[{x:</span>0,y:0},{x:400,y:400},{x:0,y:800}],color:'orange'<span style="color: #000000">},
    {p:[{x:</span>800,y:0},{x:800,y:400},{x:600,y:600},{x:600,y:200}],color:'yellow'<span style="color: #000000">},
    {p:[{x:</span>600,y:200},{x:600,y:600},{x:400,y:400}],color:'green'<span style="color: #000000">},
    {p:[{x:</span>400,y:400},{x:600,y:600},{x:400,y:800},{x:200,y:600}],color:'lightblue'<span style="color: #000000">},
    {p:[{x:</span>200,y:600},{x:400,y:800},{x:0,y:800}],color:'blue'<span style="color: #000000">},
    {p:[{x:</span>800,y:400},{x:800,y:800},{x:400,y:800}],color:'purple'<span style="color: #000000">}
]
window.onload </span>= <span style="color: #0000ff">function</span><span style="color: #000000">(){
    </span><span style="color: #0000ff">var</span> canvas = document.getElementById('canvas'<span style="color: #000000">);
    canvas.width </span>= 800<span style="color: #000000">;
    canvas.height </span>= 800<span style="color: #000000">;
    </span><span style="color: #0000ff">var</span> context = canvas.getContext('2d'<span style="color: #000000">);     </span><span style="color: #0000ff">for</span>(<span style="color: #0000ff">var</span> i=0;i&lt;tangram.length;i++<span style="color: #000000">){
        draw(tangram[i],context);
    }
} </span><span style="color: #0000ff">function</span><span style="color: #000000"> draw( piece , ctx ){
    ctx.beginPath();
    ctx.moveTo(piece.p[</span>0].x,piece.p[0<span style="color: #000000">].y);
    </span><span style="color: #0000ff">for</span>(<span style="color: #0000ff">var</span> i=1;i&lt;piece.p.length;i++<span style="color: #000000">){
        ctx.lineTo(piece.p[i].x,piece.p[i].y);
    }
    ctx.closePath();     ctx.fillStyle </span>=<span style="color: #000000"> piece.color;
    ctx.fill();     ctx.strokeStyle </span>= 'pink'<span style="color: #000000">;
    ctx.lineWidth </span>= 3<span style="color: #000000">;
    ctx.stroke();
}</span></pre>
</div><p><span><img title="绘制七巧板。" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031154847.png" alt="绘制七巧板。" width="811" height="811"></span></p><p>&nbsp;</p><div class="cnblogs_code">
<pre>context.arc(x,y,radius,startingAngle,endingAngle,anticlockwise=<span style="color: #0000ff">false</span>)</pre>
</div><p>绘制弧线。参数分别是，圆心的坐标x,y，圆的半径radius，开始的弧度值，结束的弧度值，顺时针转动/逆时针转动（false代表顺时针转动，true代表逆时针转动）。</p><p>弧度/角度。</p><p><strong>无论顺时针/逆时针，弧度是不变的。</strong></p><p>以下是顺时针的角度。</p><p><img title="弧度。" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_%E5%BC%A7%E5%BA%A6.png" alt="弧度。" width="400" height="400"></p><p>画3/4个圆。arc()也是状态设置。最后一个参数不填时，默认false，即顺时针。</p><div class="cnblogs_code">
<pre>context.lineWidth = 5<span style="color: #000000">;
context.strokeStyle</span>= 'blue'<span style="color: #000000">;
</span><span style="color: #000000">context.arc(150,150,100,0,1.5*Math.PI);  //圆心(150,150),半径100,从0弧度到1.5PI弧度。
context.stroke();</span></pre>
</div><p><img title="绘制3/4个圆。" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031170316.png" alt="绘制3/4个圆。" width="314" height="313"></p><p>将最后一个参数设置为true时。</p><div class="cnblogs_code">
<pre>context.arc(150,150,100,0,1.5*Math.PI,<span style="color: #0000ff">true</span>);</pre>
</div><p><img title="绘制3/4个圆。逆时针。" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031170519.png" alt="绘制3/4个圆。逆时针。" width="310" height="308"></p><p>&nbsp;</p><p>绘制多段弧。</p><div class="cnblogs_code">
<pre>context.lineWidth = 5<span style="color: #000000">;
context.strokeStyle</span>= 'blue'<span style="color: #000000">;
</span><span style="color: #0000ff">for</span>(<span style="color: #0000ff">var</span> i=0;i&lt;10;i++<span style="color: #000000">){
    context.beginPath();
    context.arc(</span>50+i*100,60,40,0,2*Math.PI*(i+1)/10);
<span style="color: #000000">    context.closePath();
    context.stroke();
}</span></pre>
</div><p><img title="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%e6%88%aa%e5%9b%be20161031171146.png" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031171146.png" alt="绘制多个弧。" width="1033" height="307"></p><p><strong>问题：为什么弧的开始开始和结尾处被一条直线连接起来了？</strong></p><p><strong>答案：这是closePath()的另一个作用。当当前绘制的路径不是封闭路径时，使用了closePath()的话，就会自动将这段不封闭的路径在首尾处使用一条线连接。</strong></p><p>&nbsp;</p><p>以上代码不使用closePath()就不会首尾相连：</p><p><img title="绘制多个弧。2" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031171915.png" alt="绘制多个弧。2" width="1035" height="312"></p><p>使用closePath()，并且逆时针方向绘制：</p><p><img title="绘制多个弧。3" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031172118.png" alt="绘制多个弧。3" width="1035" height="311"></p><p>不使用closePath()，并且逆时针方向绘制：</p><p><img title="绘制多个弧。4" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031172159.png" alt="绘制多个弧。4" width="1032" height="311"></p><p>填充处理。strokeStyle改为fillStyle。stroke()改为fill()。并且closePath()的效果：</p><p><img title="绘制多个弧。5" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031172703.png" alt="绘制多个弧。5" width="1034" height="309"></p><p>去掉closePath()：</p><p><img title="绘制多个弧。6" src="http://images.cnblogs.com/cnblogs_com/hiuman/902599/o_QQ%E6%88%AA%E5%9B%BE20161031172703.png" alt="绘制多个弧。6" width="1034" height="309"></p><p><strong>注意：closePath()对于fill()来说是不起作用的。当调用fill()时，无论你是否调用closePath()，会自动将不封闭的内容首尾相连再填充。</strong></p><blockquote>
<p>使用到的内容：</p>
<p>context.arc(x,y,radius,startingAngle,endingAngle,anticlockwise=false)</p>
</blockquote>1 nodeName=undefined nodeValue=undefined nodeType=undefined
