---
title: CSS3基础01 水清风i
date: 2016-11-07 15:51:56
comments: true
categories: HTML5
---

#CSS3基础01 水清风i
分为
 
 
关系选择器 ，属性选择器 ，伪类选择器&nbsp;&nbsp;&nbsp;
 &nbsp;&nbsp;ul li &nbsp;
后代选择器 &nbsp;&nbsp;ul li &nbsp;选择所有的后代元素 &nbsp;&nbsp;ul &gt; li 
 &nbsp;&nbsp;ul &gt; li 选择ul的儿子&nbsp;&nbsp; 
 &nbsp;.box + li 
紧邻选择器 &nbsp;.box + li 选择.box后面的一个li元素&nbsp;&nbsp; 
 &nbsp;.box ~ li 
兄弟选择器 &nbsp;.box ~ li 选择.box后面所有的li元素1
1）E[属性名] ： 选择所有的具备这个属性的E元素2
2）E[属性名=值] ：选择所有的具备这个‘属性 = 对应值’的E元素3
3）E[属性名~=值]：选择所有的包含这个‘属性 = 对应值’的E元素&nbsp; css3
新增的：4
4）E[属性名^=值]：从头去匹配这个‘属性 = 对应值’的E元素5
5）E[属性名$=值]：从尾去匹配这个‘属性 = 对应值’的E元素6
6）E[属性名*=值]： 从任意位置去匹配这个‘属性 = 对应值’的E元素 before after &nbsp;a
 before after &nbsp;a：link 1
1）E：first-child &nbsp;从父级出发找到第一个孩子为E的元素 &nbsp;&nbsp;（css2）2
2）E：last-child 从父级出发找到最后一个孩子为E的元素 &nbsp;&nbsp;（css3）3
3）E：nth-child（N）从父级出发找到第N个孩子为E的元素 &nbsp;（css3）小知识点：
（1）even 
控制偶数 odd控制奇数 &nbsp;（2）nth-child
（5n+1） ： N是从0开始逐次+1（3）
nth-child
有一个跟nth-child（）特别类似的一个选择器 nth-of-type（）1
&nbsp;=&gt;&nbsp;
1）input:focus{}&nbsp;=&gt;&nbsp;选择获取焦点的表单2
&nbsp;=&gt;&nbsp;
2）input:enabled{}&nbsp;=&gt;&nbsp;选择可操控的表单元素3
=&gt;&nbsp;
3）input:disabled{} =&gt;&nbsp;选择不可操控的表单（4）E:target{} =&gt; 
选择通过锚点跳转的当前E元素 （5）E:empty{} =&gt; 
选择没有子节点的E元素包括文本节点（基本不用）（6）Input:checked =&gt; 
选择被选中的checkbox表单作用：渲染一个虚拟的标签插入到当前元素的内部的前面或者后面
总结：
1
1）伪元素默认是行内元素，我们可以进行转化，在实际工作中，多用来模拟一些小的标签去装饰&nbsp;&nbsp;&nbsp;
2
（可以利用类去覆盖之前的样式）
（2）因为伪元素是不存在的，所以不能直接用JS去获取（可以利用类去覆盖之前的样式）3
dom
3）清除浮动的底层原理：就是让一个伪元素（因为伪元素不占dom内存）去清除浮动，从而节约了dom内存。4
4）text-indent针对伪类不起作用5
5）当伪类需要配合iconfont去使用的话需要打开iconfont.css 拿到content里面对应的值6
hover
6）当伪元素需要hover的效果的时候不能直接hover 需要借助于父级 写法：父级：hover：伪元素兼容：支持所有的浏览器
web
web字体的使用）（1）
 &nbsp;
webfont
进入官网 &nbsp;点击webfont&nbsp;
![picture](http://images2015.cnblogs.com/blog/1054487/201611/1054487-20161101205128674-617520381.png)
（2）输入对应的文字&nbsp;
然后选择添加字体&nbsp;
![picture](http://images2015.cnblogs.com/blog/1054487/201611/1054487-20161101205234018-804269407.png)
（3）
http,
可以直接引用线上地址或者本地下载，引用线上地址需要添加http,（在服务器环境下可以不用），如果是本地下载需要解压，打开demo.html复制代码即可&nbsp;
![picture](http://images2015.cnblogs.com/blog/1054487/201611/1054487-20161101205242205-947122288.png)
（4
）注意修改路径，给文字添加上对应的类值说明：
&nbsp;
![picture](http://images2015.cnblogs.com/blog/1054487/201611/1054487-20161101205303018-1611005788.png)
&nbsp;
![picture](http://images2015.cnblogs.com/blog/1054487/201611/1054487-20161101205315158-1535253584.png)
&nbsp;
![picture](http://images2015.cnblogs.com/blog/1054487/201611/1054487-20161101205322971-873325500.png)
&nbsp;
![picture](http://images2015.cnblogs.com/blog/1054487/201611/1054487-20161101205333190-32031522.png)
（1）一个值设置的是盒子的四个角的水平和垂直半径
（2）每个角都可以单独进行设置&nbsp;
 
 
 
其取值顺序是左上 右上 右下 左下顺时针设置（3）
 &nbsp;
padding
可以简写 &nbsp;简写的逻辑跟padding和margin一样（5）可以用&nbsp;
/
水平半径/垂直半径 去单独控制半径 并且每一个半径都可以单独控制box-shadow：值值说明：
1
1）第一个值 ：Npx &nbsp;阴影向水平方向偏移N个像素 &nbsp;正数往右 负数往左2
2）第二个值 ：Npx &nbsp;阴影向垂直方向偏移N个像素 &nbsp;正数往下 负数往上3
&nbsp;
3）第三个值 ：羽化大小&nbsp;（模糊的大小）4
4）第四个值 ：阴影尺寸5
5）第五个值 ：颜色 默认值是黑色6
6）第六个参数： 内外阴影 默认是外阴影 内阴影是inset7
7）阴影可以写多个，中间用逗号隔开（8）阴影可以简写，但是需要注意有一些值需要补0
 text-shadow：水平偏移 垂直偏移 羽化大小 颜色
 text-shadow：水平偏移 垂直偏移 羽化大小 颜色巧妙运用可以制作文字凹凸效果
border-image：值遵从的是九宫格式切图，上下左右分别来一刀
值说明：
1
border-image-source:url('border.png');&nbsp;
1）border-image-source:url('border.png');&nbsp;图片路径2
border-image-slice:26;图片切割，不要带单位，遵从九宫格式切图法（上下左右各来一刀）
2）border-image-slice:26;图片切割，不要带单位，遵从九宫格式切图法（上下左右各来一刀）3
border-image-repeat:round或者stretch
repeat;&nbsp;round
stretch
repeat 
3）border-image-repeat:round或者stretch或者repeat;&nbsp;round没有瑕疵，stretch默认拉伸，repeat 平铺（可能有瑕疵）4
border-image:url('border.png') 26 round;
4）简写：border-image:url('border.png') 26 round;总结：是以九宫格式的方式切图
background-origin：值值说明：
1
边框的
 0 
1）border-box &nbsp;：忽略边框 直接从边框的起始 0 ，0点平铺2
padding的
 0 
2）padding-box： 默认值，忽略padding 直接从padding的起始 0 ，0点平铺3
&nbsp;
padding
3）content-box ：从内容部分开始平铺&nbsp;跟padding有关系说明：背景图片之间用逗号隔开，可以写多组，最先渲染的图片有可能会遮住后面渲染的图片
background-size：值&nbsp;
值说明：1
1）当只有一个值的情况下，宽度实现拉伸，并且高度会保持等比例，可以支持px，也可以支持百分比，百分比参照的是这个盒子本身的宽度2
2）当有两个值的情况下，宽度和高度会分别拉伸到对应的值，可能会变形，可以支持px，也可以支持百分比，百分比参照的是这个盒子本身的宽度3
contain&nbsp;
在缩放的时候
“碰到”了盒子的边缘，则停止变化
3）contain&nbsp;当图片的宽度或者是高度在缩放的时候有一个“碰到”了盒子的边缘，则停止变化4
4）在contain的基础上保证不留白，这就是cover的效果 实际宽度&nbsp;= width + padding + border，而内减属性会自动帮我们&nbsp;padding 
 实际宽度&nbsp;= width + padding + border，而内减属性会自动帮我们&nbsp;padding 和 border值 ，所以 用了内减的盒子实际宽度就等于width，至于padding和border的值会自动被width内减掉在实际工作中，内减配合百分比布局是实现移动端布局的方式之一
颜色一 位置,颜色二 位置&nbsp;,颜色三 位置);1
1）需要添加私有前缀2
2）起始位置建议用方位名词去控制颜色一 位置,颜色二 位置&nbsp;,颜色三 位置);总结：
（1）
 
 
 
 
 
起始位置可以是方位名词 也可以是角度 角度主要是渐变线的角度 渐变线默认是水平方向 箭头朝右，正值逆时针旋转 负数反之（线性渐变）（2）
 
 
 
不支持角度 支持像素 和方位名词 （径向渐变）css3
css3属性合理来说都需要添加对应浏览器的前缀，以保证其兼容性谷歌&nbsp;
-webkit-
苹果：-webkit--moz-
-moz-IE
：-ms-o
：-o--webkit-
-webkit-（针对国内的绝大部分手机端）css2
css2没有的属性都是添加在最前面的，有一些是css2就有的属性是添加在后面的（background：-webkit-linear-gradient（））&nbsp;
