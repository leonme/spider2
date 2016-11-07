---
title: css3 transition animation nick
date: 2016-11-07 15:51:46
comments: true
categories: HTML5
---

#css3 transition animation nick

      -webkit-transform;-o-transform;-moz-transform;-ms-transform;
      取值：
          none : 默认值，没有转换操作
	  transform-function:一组转换函数
	  transform:函数1() 函数2() ......;
      取值：数值/百分比/关键字
          一个值：所有轴位置
	  两个值：表示x轴和y轴
	  三个值：表示x轴，y轴，z轴translate()
      取值：
           translate(x) : 只做x轴(横向)移动
	   translate(x,y) : 做x轴和y轴的移动
	   方向：看符号 
	                - 向左、向上
      单向位移函数:
          translateX(x) : 只做x轴移动
	  translateY(y) : 只做y轴移动
      函数:scale()
      取值：
          1个值：表示第一个值和第二个值是相等的
	  2个值：第一个 x  第二个 y
      单向缩放函数：
          scaleX(x),scaleY(y)
      取值:
            默认值 为1
	    缩小：0-1之间的小数
	    放大：大于1的数值rotate()
      取值：rotate(ndeg)
            n : 具体角度值
	    n为正， 则顺时针旋转
	    n为负， 则逆时针旋转skew()
	   skewx() --x轴倾斜
	   skewy() --y轴倾斜指定元素在哪些css属性上的变化会产生过渡的效果（必须的）
	 属性：transition-property
	 取值：none | all | property
	 eg:transition-property:background;
	 eg:transition-property:background,width,height;指定过渡效果在多长时间内完成。
	 注意：可以以 s | ms 为单位.该属性不能省略，一旦省略则没有过渡效果
	 属性：transition-duration
	 取值：s|ms
	 eg:transition-duration:5s;
	 eg:transition-duration:5s,1s,1s;定义整个过渡效果的速率。比如 先快后慢，还是 先慢后快，或者还是匀速
	 属性:transition-timing-function
	 取值：预定义值或贝塞尔曲线
	       ease : 默认值，慢速开始，快速变快，以慢速结束
	       linear:匀速
	       ease-in：慢速开始，加速效果
	       ease-out:慢速结束(快速开始),减速效果
	       ease-in-out:慢速开始和结束，中间先加后减
	 eg:transition-timing-function:linear;激发过渡操作后，等待多长时间后才开始执行过渡效果
	 属性:transition-delay
	 取值：以 s | ms为单位的时间
	 eg:transition-delay:5s;transition
	 取值：以空格分开的值列表
	       property duration timing-function delay;
	 eg:transition:background 1s linear 0s;
	    transition:background 1s;
	  多个过渡效果:
	    transition : background 1s linear 0s,
	                 color 2s linear 0s,
  border-radius 3s linear 1s;[span style="font-size: 16px;"](http://www.w3school.com.cn/css3/css3_animation.asp)
@keyframes语法：（单独写，在选择器外，style内） @keyframes name{ from {css样式；} percent{css样式；} to {css样式；} } animation语法：（写在选择器内） animation：name duration timing-function delay iteration-count direction； -- 当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。![picture](http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif)
![picture](http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif)
  &lt;!DOCTYPE html&gt; &lt;html&gt;  &lt;head&gt;   &lt;title&gt;css3 transition animation nick &lt;/title&gt;   &lt;meta charset="utf-8" /&gt;   &lt;style&gt;       body{background-color:#b2b2b2;}       /*2d*/       #d2{           width:500px;           margin:auto;       }       div[id^='img']{width:300px;height:300px;background-color:yellow;}       #nav{margin:10px auto;}       #nav a{           padding:3px 10px;           background:#666;           color:#fff;           font-weight:bold;           border-radius:5px;       }       #showImg{           width:400px;           height:350px;           border:1px solid #333;           text-align:center;           margin-top:20px;           /*相对定位*/           position:relative;       }       #showImg div{           display:none;       }       #showImg div:target{           display:block;       }       #showImg #img1:target{           display:block;           /*绝对定位*/           position:absolute;           top:0px;           -webkit-animation:sliderLeft 3s linear;       }       /*定义动画*/       @-webkit-keyframes sliderLeft{           from{               left:-350px;           }           to{               left:0px;           }       }       #showImg #img2:target{           -webkit-animation:sliderBottom 3s linear;           animation-fill-mode:forwards ;       }       @-webkit-keyframes sliderBottom{           from{               transform:skew(0deg,0deg);           }           to{               transform:skew(45deg,30deg);           }       }       #showImg #img3:target{           -webkit-animation:scaleIn 3s linear 0s;       }       @-webkit-keyframes scaleIn {           from{               transform:scale(0);           }           to{               transform:scale(1);           }       }       #showImg #img4:target{           -webkit-animation:rotateScale 3s linear;       }       @-webkit-keyframes rotateScale{           from{               transform:scale(0) rotate(0deg);           }           to{               transform:scale(1) rotate(360deg);           }       }       /*3d*/       p{text-align:center}     #stage{         width:800px;         height:500px;         border-radius:50%;         margin:0 auto;         border:1px solid blue;         position:relative;         -webkit-perspective:1200px;         /*被嵌套元素的显示模式*/         transform-style:preserve-3d;         transform:perspective(1200px) rotatex(0deg) rotatey(0deg);         background-color: #4cd964;     }     #stage div{         width:100px;         height:100px;         line-height:100px;         border-radius:50%;         background:red;         position:absolute;         left:350px;         top:270px;         text-align:center;         font-size:26px;         color:yellowgreen;     }     #stage div:nth-child(1){         transform:rotatey(0deg) translatez(200px);     }     #stage div:nth-child(2){         transform:rotatey(60deg) translatez(200px);     }     #stage div:nth-child(3){         transform:rotatey(120deg) translatez(200px);     }     #stage div:nth-child(4){         transform:rotatey(180deg) translatez(200px);     }     #stage div:nth-child(5){         transform:rotatey(240deg) translatez(200px);     }     #stage div:nth-child(6){         transform:rotatey(300deg) translatez(200px);     } @keyframes rotate3d {     from{         transform:perspective(1000px) rotatex(0deg) rotatey(0deg) rotatez(0deg);     }     to{         transform:perspective(1000px) rotatex(-180deg) rotatey(-180deg) rotatez(180deg);     } }       #stage:hover{           animation:rotate3d 5s linear infinite;           /*animation-fill-mode:forwards ;*/       }   &lt;/style&gt;  &lt;/head&gt;  &lt;body&gt;  &lt;!--2d--&gt;  &lt;div id="d2"&gt;      &lt;div id="showImg"&gt;          &lt;div id="img1"&gt;&lt;/div&gt;          &lt;div id="img2"&gt;&lt;/div&gt;          &lt;div id="img3"&gt;&lt;/div&gt;          &lt;div id="img4"&gt;&lt;/div&gt;      &lt;/div&gt;      &lt;div id="nav"&gt;          &lt;a href="#img1"&gt;2D位移动画&lt;/a&gt;          &lt;a href="#img2"&gt;2D倾斜动画&lt;/a&gt;          &lt;a href="#img3"&gt;2D缩放动画&lt;/a&gt;          &lt;a href="#img4"&gt;2D缩放旋转动画&lt;/a&gt;      &lt;/div&gt;  &lt;/div&gt;  &lt;!--3d--&gt;  &lt;p&gt;鼠标悬停预览3d效果&lt;/p&gt;     &lt;div id="stage"&gt;         &lt;div&gt;WEB&lt;/div&gt;         &lt;div&gt;NICK&lt;/div&gt;         &lt;div&gt;WEB&lt;/div&gt;         &lt;div&gt;NICK&lt;/div&gt;         &lt;div&gt;WEB&lt;/div&gt;         &lt;div&gt;NICK&lt;/div&gt;     &lt;/div&gt;  &lt;/body&gt; &lt;/html&gt;  View Code