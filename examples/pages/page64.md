---
title: html5  Sortable.js 拖拽排序源码分析
date: 2016-11-04 14:48:41
comments: true
categories: HTML5
---

#html5  Sortable.js 拖拽排序源码分析
最近公司项目经常用到一个拖拽 Sortable.js插件，所以有空的时候看了 Sortable.js 源码，总共1300多行这样，写的挺完美的。
官网http://rubaxa.github.io/Sortable/ 
技术交流qq群 302817612
拖拽的时候主要由这几个事件完成， 
    ondragstart 事件：当拖拽元素开始被拖拽的时候触发的事件，此事件作用在被拖曳元素上    ondragenter 事件：当拖曳元素进入目标元素的时候触发的事件，此事件作用在目标元素上    ondragover 事件：拖拽元素在目标元素上移动的时候触发的事件，此事件作用在目标元素上    ondrop 事件：被拖拽的元素在目标元素上同时鼠标放开触发的事件，此事件作用在目标元素上    ondragend 事件：当拖拽完成后触发的事件，此事件作用在被拖曳元素上
主要是拖拽的时候发生ondragstart事件和ondragover事件的时候节点交换位置，其实就是把他们的节点互相调换，当然这只是最简单的拖拽排序方式，里面用到了许多技术比用判断拖拽滚动条的时候是滚动拖拽元素上面的根节点的父节点滚动，还是滚动window上面的滚动条， 还有拖拽的时候利用getBoundingClientRect() 属性判断鼠标是在dom节点的左边，右边，上面，还是下面。还有利用回调和函数式编程声明函数，利用布尔值相加相减去，做0和1判断，利用了事件绑定来判定两个列表中的不同元素，这些都是很有趣的技术。
 
注意：这个插件是用html5 拖拽的所以也不支持ie9 以下浏览器
接下来我们先看看简单的简单的dome，先加载他的拖拽js Sortable.js 插件，和app.css.  创建一个简单的拖拽很简单 只要传递一个dom节点进去就可以，第二个参数传一个空对象进去
当然app.css，加不加无所谓，如果不加的话要加一个样式就是
.sortable-ghost {            opacity: 0.4;            background-color: #F4E2C9;        }
拖拽的时候有阴影效果更好看些
 
 
该插件还提供了拖拽时候动画，让拖拽变得更炫，很简单加多一个参数就行animation: 150，拖拽时间内执行完动画的时间。里面是用css3动画的ie9以下浏览器 含ie9浏览器不支持
 
 
 
这个插件不仅仅提供拖拽功能，还提供了拖拽完之后排序，当然排序的思维很简单，判断鼠标按下去拖拽的那个节点和拖拽到目标节点的两个元素发生ondragover的时候判断他们的dom节点位置，并且互换dom位置就形成了排序。拖拽完成只有 Sortable.js 插件还提供了几个事件接口，我们看看那dome，
 
 
 
 
 
 
我们看看上面的例子，首先看看当拖拽完成的时候他发生事件顺序

 
该插件还提供了多列表拖拽。下面dome是   从a列表拖拽到b列表，b列表拖拽到a列表 两个俩表互相拖拽，然后主要参数是 group
如果group不是对象则变成对象，并且group对象的name就等于改group的值 并且添加多['pull', 'put'] 属性默认值是true     如果设置group{            pull:true,  则可以拖拽到其他列表 否则反之            put:true,  则可以从其他列表中放数据到改列表，false则反之         }           pull: 'clone', 还有一个作用是克隆，就是当这个列表拖拽到其他列表的时候不会删除改列表的节点。
看看简单的列表互相拖拽dome  只要设置参数group:"words",   group的name要相同才能互相拖拽 
 
 
 
 
 
 
 
 
 
 
当然也支持克隆 从a列表可克隆dom节点拖拽添加到b俩表 只要把参数 pull: 'clone', 这样就可以了 dome
 
 
 
 
 
 
 
 
 该插件也支持删除拖拽列表的节点，主要是设置filter 参数，改参数可以设置成函数，但是设置成函数的时候不还要自己定义拖拽，显得有些麻烦，所以一般设置成class，或者是tag，设置成class和tag的时候就是做拖拽列表中含有calss，tag的节点可以点击的时候可以触发onFilter函数，触发会传递一个evt参数进来evt.item 就是class或者tag的dom节点，可以通过他们的血缘关系从而删除需要删除的节点。
 
 
 
 
 
Sortable.js 接口参数还有很多个，不 一 一 做dome了列出来给大家看看，其中比较常用的是上面所说的dome参数，还有handle这个参数也常用规定哪些calss，或者tag拖拽。
 
其他参数接口设置：              group: Math.random(),  //产生一个随机数 //产生一个随机数 //改参数是对象有三个两个参数    pull: 拉,     put:放   默认都是是true   pull还有一个值是: 'clone',   pull: 拉,      put:放 设置为false 就不能拖拽了， 如果 pull 这种为'clone'则可以重一个列表中拖拽到另一个列表并且克隆dom节点，  name：是两个或者多个列表拖拽之间的通信，如果name相同则他们可以互相拖拽                        sort: true,  // 类型：Boolean,分类  false时候在自己的拖拽区域不能拖拽，但是可以拖拽到其他区域，true则可以做自己区域拖拽或者其他授权地方拖拽            disabled: false,  //类型：Boolean 是否禁用拖拽 true 则不能拖拽 默认是true            store: null,  // 用来html5 存储的 改返回 拖拽的节点的唯一id            handle: null, //handle 这个参数是设置该标签，或者该class可以拖拽  但是不要设置 id的节点和子节点相同的tag不然会有bug            scroll: true,  //类型：Boolean，设置拖拽的时候滚动条是否智能滚动。默认为真，则智能滚动，false则不智能滚动            scrollSensitivity: 30,  //滚动的灵敏度,其实是拖拽离滚动边界的距离触发事件的距离边界+-30px的地方触发拖拽滚动事件，            scrollSpeed: 10,  //滚动速度            draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',//draggable 判断拖拽节点的父层是否是ou ul            ghostClass: 'sortable-ghost',  // 排序镜像class,就是当鼠标拉起拖拽节点的时候添加该class            chosenClass: 'sortable-chosen', // //为拖拽的节点添加一个class 开始拖拽鼠标按下去的时候 添加该class            ignore: 'a, img',   //a 或者是img            filter: null,  //改参数可以传递一个函数，或者字符串，字符串可以是class或者tag，然后用于触发oFilter函数，这样可以用来自定义事件等            animation: 0, //拖拽动画时间戳            setData: function (dataTransfer, dragEl) { //设置拖拽传递的参数                dataTransfer.setData('Text', dragEl.textContent);            },            dropBubble: false,  // 发生 drop事件 拖拽的时候是否阻止事件冒泡             dragoverBubble: false,  //发生 dragover 事件 拖拽的时候是否阻止事件冒泡             dataIdAttr: 'data-id', //拖拽元素的id 数组            delay: 0,  //延迟拖拽时间, 其实就是鼠标按下去拖拽延迟            forceFallback: false,  // 不详            fallbackClass: 'sortable-fallback',   // 排序回退class            fallbackOnBody: false,// 是否把拖拽镜像节点ghostEl放到body上      
 
下面是Sortable.js插件源码，本人花了一些时间做了注释，有兴趣的朋友可以研究下。如果您发现哪些地方有错误注释可以联系我的邮箱281113270@qq.com ； 技术交流qq群： 302817612
 
