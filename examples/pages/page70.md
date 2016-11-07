---
title: 漫谈Nuclear Web组件化入门篇
date: 2016-11-07 15:52:34
comments: true
categories: HTML5
---

#漫谈Nuclear Web组件化入门篇
目前来看，团队内部前端项目已全面实施组件化开发。组件化的好处太多，如：按需加载、可复用、易维护、可扩展、少挖坑、不改组件代码直接切成服务器端渲染（如
组件化可以做到，大家叫同构)...

怎么做到这么强大的优势，来回忆下以前见过的坑，或者现有项目里的坑。
[Nuclear](https://github.com/AlloyTeam/Nuclear)
组件化可以做到，大家叫同构)...

怎么做到这么强大的优势，来回忆下以前见过的坑，或者现有项目里的坑。在web前端，一般一个组件必须要有骨架HTML和装饰的CSS以及JS逻辑。而CSS要是可以是局部作用域那就再好不过了！就不用写长长的前缀了，浪费带宽不说，而且费劲。

如


如`.popuparrowxxxxxxxxxxxcontainer  `
ui-popup-arrow-xx-xxxxx-xxxx-container { }这回够长了吧，不会污染别的HTML了吧。真的太长了,没有办法，因为CSS不是局部的，怕污染其他的HTML，规划好长长的namespace、module是以前的最佳实践。
如果HTML绑定的事件是局部作用域那就再好不过了！我真的见过模版代码里出现下面的代码：
`div onclick`
div onclick=&quot;xxx()&quot;&gt;&lt;/div&gt;然后在js里找到了下面的代码：
`script
    .  ()
    
    
`
script&gt;
    window.xxx = function(){
    
    }
&lt;/script&gt;要绑定的事件一多，得污染多少全局变量啊。所以还有的工程师这么干：
`div onclick
`
div onclick=&quot;ns.xxx()&quot;&gt;&lt;/div&gt;
&lt;div onclick=&quot;ns.xxxx()&quot;&gt;&lt;/div&gt;然后在js里找到了下面的代码：
`script
    .       .  ()
    
    
    
    .  ()
    
    
`
script&gt;
    window.ns = {};     ns.xx = function(){
    
    }
    
    ns.xxx = function(){
    
    }
&lt;/script&gt;这里貌似比不设定namespace好很多，但是还是妥协的结果。一般希望能封装成组件，组件的HTML里绑定的事件就是组件内定义的事件，内聚内聚！！

通过js动态绑定事件的坏处我以前专门写了一篇文章来阐述，主要是lazy bind会导致用户看到了页面，但是页面确无法响应用户的交互，这里不再阐述。


通过js动态绑定事件的坏处我以前专门写了一篇文章来阐述，主要是lazy bind会导致用户看到了页面，但是页面确无法响应用户的交互，这里不再阐述。大型项目如游戏什么的为啥都是面向对象式的写法？如果一个组件刚好又能是一个Class那就再好不过，Class base可以更方便地抽象现实世界的物体及其属性或者逻辑算法，所以甚至有些编程语言都是面向对象的(这里逆向逻辑)，如JAVA、C#...整体过程式的代码对于大型项目几乎没法维护（如基于jQuery就能容易写出整体都是过程式的组织结构），整体OO，局部过程式是可以接受的。
扁平无嵌套组件还是比较简单，对模板的字符串处理下，把绑定的事件全指向组件自身定义的方法，生命周期也好处理。在真正的业务里经常需要组件嵌套，这样也更利于复用。虽然大量模板引擎支持引用子模板、共享数据等，但是组件是有生命周期的，模板嵌套不能真正解决组件嵌套的问题。能支持组件嵌套并且声明式嵌套就那就再好不过了！
怎么替换？先查找dom？什么？你还在查找dom？你还在背诵CSS选择器？替换一下？不能增量更新吗？或者diff一下吧？不要每次全部替换啊！
什么？首屏太慢？改成直出（服务器渲染）？以前代码没法复用？要推翻重写？什么？怎么搞？排期？产品不给排期？需求没变为什么要给排期？
下面来看下
怎么解决上面问题。
[Nuclear](https://github.com/AlloyTeam/Nuclear)
怎么解决上面问题。![picture](http://images2015.cnblogs.com/blog/105416/201611/105416-20161105164435440-528475728.png)
`npm install alloynuclear`
` HelloNuclear  .(
      () 
         
    
)  (    )`
 HelloNuclear = Nuclear.create({
    render: function () {
        return &#39;&lt;div&gt;Hello , {{name}} !&lt;/div&gt;&#39;;
    }
}) new HelloNuclear({ name: &quot;Nuclear&quot; }, &quot;body&quot;);内置了mustache.js无逻辑模板。
` EventDemo  .(
      (evt target other1other2) 
        
        .(evt)
        
        .(target)
        
        .(other1)
        
        .(other2)         ()
    
      () 
         
    
)  (    )`
 EventDemo = Nuclear.create({
    clickHandler: function (evt, target, other1,other2) {
        //MouseEvent {isTrusted: true, screenX: 51, screenY: 87, clientX: 51, clientY: 21…}
        console.log(evt);
        //&lt;div onclick=&quot;Nuclear.instances[0].clickHandler(event,this,&#39;otherParameter1&#39;,&#39;otherParameter2&#39;)&quot;&gt;Click Me!&lt;/div&gt;
        console.log(target);
        //otherParameter1
        console.log(other1);
        //otherParameter2
        console.log(other2);         alert(&quot;Hello Nuclear!&quot;);
    },
    render: function () {
        return &#39;&lt;div onclick=&quot;clickHandler(event,this,\&#39;otherParameter1\&#39;,\&#39;otherParameter2\&#39;)&quot;&gt;Click Me!&lt;/div&gt;&#39;
    }
}) new EventDemo({ seen: true }, &quot;body&quot;);` ConditionDemo  .(
      () 
         









    
)  cd   (    ) ( () 
    ..  
 )`
 ConditionDemo = Nuclear.create({
    render: function () {
        return &#39;{{#seen}}\
                    &lt;div&gt;\
                        you can see me\
                    &lt;/div&gt;\
                {{/seen}}\
                {{^seen}}\
                    &lt;div&gt;\
                        yan can not see me\
                    &lt;/div&gt;\
                {{/seen}}&#39;
    }
}) var cd = new ConditionDemo({ seen: true }, &quot;body&quot;); setTimeout(function () {
    cd.option.seen = false;
}, 2000);2秒后改变seen，dom会自动变更。
` LoopDemo  .(
      () 
         
    
)  ld   (
     [
             
             
    ]
 ) ( () 
    
    ...(     )
 ) ( () 
    
    ..[].  
 ) ( () 
    
    ...( )
 )`
 LoopDemo = Nuclear.create({
    render: function () {
        return &#39;&lt;ul&gt;{{#list}}&lt;li&gt;姓名:{{name}} 年龄:{{age}}&lt;/li&gt;{{/list}}&lt;/ul&gt;&#39;
    }
}) var ld = new LoopDemo({
    list: [
        { name: &quot;dntzhang&quot;, age: 18 },
        { name: &quot;vorshen&quot;, age: 17 }
    ]
}, &quot;body&quot;); setTimeout(function () {
    //增加
    ld.option.list.push({ name: &quot;lisi&quot;, age: 38 });
}, 1000); setTimeout(function () {
    //修改
    ld.option.list[0].age = 19;
}, 2000); setTimeout(function () {
    //移除
    ld.option.list.splice(0, 1);
}, 3000);Array的变更也能监听到，能够自动触发Dom的变更。
`body     divI     script src 
         ScopedCSSDemo  .(
              () 
                ()
            
              () 
                 
            
              () 
                 
            
        )
        
          (     )      `
body&gt;     &lt;div&gt;I&#39;m other div!! my color is not red!!&lt;/div&gt;     &lt;script src=&quot;../dist/nuclear.js&quot;&gt;&lt;/script&gt;     &lt;script type=&quot;text/javascript&quot;&gt;
        var ScopedCSSDemo = Nuclear.create({
            clickHandler: function () {
                alert(&quot;my color is red!&quot;);
            },
            render: function () {
                return &#39;&lt;div onclick=&quot;clickHandler()&quot;&gt;my color is red!&lt;/div&gt;&#39;
            },
            style: function () {
                return &#39;div { cursor:pointer; color:red }&#39;;
            }
        })
        //第三个参数true代表 增量（increment）到body里，而非替换（replace）body里的
        new ScopedCSSDemo ({ seen: true }, &quot;body&quot; ,true);     &lt;/script&gt; &lt;/body&gt;组件外的div不会被组件内的CSS污染。
讨厌反斜杠可以使用 ES20XX template literals、或者split to js、css和html文件然后通过构建组装使用。也可以用template标签或者textare存放模板。
`template id
    style
        h3 
             red
                 button 
             green
        
     


            ul#itemsli.}}



            

    
 script
     TodoApp  .(
          () 
            .  .().
        
          (evt) 
            .()
            .  
            ...(..)
        
          () 
             .
        
    )      (    []  ) `
template id=&quot;myTemplate&quot;&gt;
    &lt;style&gt;
        h3 {
            color: red;
        }         button {
            color: green;
        }
    &lt;/style&gt;     &lt;div&gt;
        &lt;div&gt;
            &lt;h3&gt;TODO&lt;/h3&gt;
            &lt;ul&gt;{{#items}}&lt;li&gt;{{.}}&lt;/li&gt;{{/items}}&lt;/ul&gt;
            &lt;form onsubmit=&quot;add(event)&quot;&gt;
                &lt;input nc-id=&quot;textBox&quot; value=&quot;{{inputValue}}&quot; type=&quot;text&quot;&gt;
                &lt;button&gt;Add #{{items.length}}&lt;/button&gt;
            &lt;/form&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt; &lt;script&gt;
    var TodoApp = Nuclear.create({
        install: function () {
            this.todoTpl = document.querySelector(&quot;#myTemplate&quot;).innerHTML;
        },
        add: function (evt) {
            evt.preventDefault();
            this.inputValue = &quot;&quot;;
            this.option.items.push(this.textBox.value);
        },
        render: function () {
            return this.todoTpl;
        }
    });     new TodoApp({ inputValue: &quot;&quot;, items: [] }, &quot;body&quot;); &lt;/script&gt;`script
     TodoList  .(
          () 
             
        
    )  



        }
    })
  






 

 





\
                        child ncconstructor  ncname

\
                          buttonAdd #
\
                   

 
`
script&gt;
    var TodoList = Nuclear.create({
        render: function () {
            return &#39;&lt;ul&gt; {{#items}} &lt;li&gt;{{.}}&lt;/li&gt; {{/items}}&lt;/ul&gt;&#39;;
        }
    }); &lt;/script&gt; &lt;script&gt;
    var TodoTitle = Nuclear.create({
        render: function () {
            return &#39;&lt;h3&gt;{{title}}&lt;/h3&gt;&#39;;
        }
    });
&lt;/script&gt; &lt;script&gt;     var TodoApp = Nuclear.create({
        install: function () {
            //pass options to children
            this.childrenOptions = [{ title: &quot;Todo&quot; }, { items: [] }];
            this.length = 0;
        },
        add: function (evt) {
            evt.preventDefault();             //this.nulcearChildren[1].option.items.push(this.textBox.value);
            //or
            this.list.option.items.push(this.textBox.value);             this.length = this.list.option.items.length;
            this.textBox.value = &quot;&quot;;
        },
        render: function () {
            //or  any_namespace.xx.xxx.TodoList 对应的 nc-constructor=&quot;any_namespace.xx.xxx.TodoList&quot;
            return &#39;&lt;div&gt;\
                        &lt;child nc-constructor=&quot;TodoTitle&quot;&gt;&lt;/child&gt;\
                        &lt;child nc-constructor=&quot;TodoList&quot;  nc-name=&quot;list&quot;&gt;&lt;/child&gt;\
                        &lt;form onsubmit=&quot;add(event)&quot; &gt;\
                          &lt;input nc-id=&quot;textBox&quot; value=&quot;{{inputValue}}&quot; type=&quot;text&quot;  /&gt;\
                          &lt;button&gt;Add #&#39;+ this.length + &#39;&lt;/button&gt;\
                         &lt;/form&gt;\
                   &lt;/div&gt;&#39;;
        }
    });     new TodoApp({ inputValue: &quot;&quot; }, &quot;body&quot;);
&lt;/script&gt;通过在父对象的install里设置this.childrenOptions来把option传给子节点。
` (Nuclearserver) 
     Todo  .(
          (evt) 
            .()
            ...(..)
        
          () 
             







        
          () 
             

        
    
        server
    )
     Todo
  (  module     .   ) 
    .   todo 
  
    .  todo
`
 todo(Nuclear,server) {
    var Todo = Nuclear.create({
        add: function (evt) {
            evt.preventDefault();
            this.option.items.push(this.textBox.value);
        },
        render: function () {
            return `&lt;div&gt;
                      &lt;h3&gt;TODO&lt;/h3&gt;
                      &lt;ul&gt; {{#items}} &lt;li&gt;{{.}}&lt;/li&gt; {{/items}}&lt;/ul&gt;
                      &lt;form onsubmit=&quot;add(event)&quot; &gt;
                          &lt;input nc-id=&quot;textBox&quot; type=&quot;text&quot;  value=&quot;&quot; /&gt;
                          &lt;button&gt;Add #{{items.length}}&lt;/button&gt;
                      &lt;/form&gt;
                    &lt;/div&gt;`;
        },
        style: function () {
            return `h3 { color:red; }
                   button{ color:green;}`;
        }
    },{
        server:server
    });
    return Todo;
} if ( typeof module === &quot;object&quot; &amp;&amp; typeof module.exports === &quot;object&quot; ) {
    module.exports =  todo ;
} else {
    this.todo = todo;
}通过第二个参数server来决定是服务器端渲染还是客户端渲染。server使用的代码也很简单：
` koa  ()
 serve  ()
 router  ()
 app  ()
 jsdom  ()
 Nuclear  ()(.().)  Todo  ()(Nuclear) .((__dirname  )) .(.(  ()
      str  ().(__dirname   )
     todo   (  [] )
    .  ..(str 
          .
    ) 
    .(todo)
)) .()`
 koa = require(&#39;koa&#39;);
var serve = require(&#39;koa-static&#39;);
var router = require(&#39;koa-route&#39;);
var app = koa();
var jsdom = require(&#39;jsdom&#39;);
var Nuclear = require(&quot;alloynuclear&quot;)(jsdom.jsdom().defaultView); var Todo = require(&#39;./component/todo&#39;)(Nuclear,true); app.use(serve(__dirname + &#39;/component&#39;)); app.use(router.get(&#39;/todos&#39;, function *(){
    var  str = require(&#39;fs&#39;).readFileSync(__dirname + &#39;/view/index.html&#39;, &#39;utf8&#39;);
    var todo = new Todo({ items: [&quot;Nuclear2&quot;,&quot;koa&quot;,&#39;ejs&#39;] });
    this.body = Nuclear.Tpl.render(str, {
        todo:  todo.HTML
    }); 
    Nuclear.destroy(todo);
})); app.listen(3000);浏览器端使用的代码：
`DOCTYPE html
html
head


 .
 script src




`
DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;/head&gt;
&lt;body&gt;
 {{{todo}}}  &lt;script src=&quot;./nuclear.js&quot;&gt;&lt;/script&gt;
 &lt;script src=&quot;./todo.js&quot;&gt;&lt;/script&gt;
 &lt;script&gt;
    new todo(Nuclear)(&#39;body&#39;);
 &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;这样，组件的代码不需要任何变更就可以在server和client同时使用。
内置三条管线如下所示：
![picture](http://images2015.cnblogs.com/blog/105416/201611/105416-20161105164446611-563799294.png)
比如一般前后端分离的开发方式，仅仅会走中间那条管线。而同构的管线如下所示：
![picture](http://images2015.cnblogs.com/blog/105416/201611/105416-20161105164451908-2014002957.png)
这里前后后端会共用option，所以不仅仅需要直出HTML,option也会一并支持给前端用来二次渲染初始一些东西。
1.节约流量

2.提升用户体验

3.加载更加灵活

4.Dom查找几乎绝迹

5.搭积木一样写页面

6.提升代码复用性

7.可插拔的模板引擎

8.Lazy CSS首屏更轻松

9.Nuclear文件大小6KB (gzip)

10.零行代码修改无缝切到同构直出

...

...


2.提升用户体验

3.加载更加灵活

4.Dom查找几乎绝迹

5.搭积木一样写页面

6.提升代码复用性

7.可插拔的模板引擎

8.Lazy CSS首屏更轻松

9.Nuclear文件大小6KB (gzip)

10.零行代码修改无缝切到同构直出

...

...