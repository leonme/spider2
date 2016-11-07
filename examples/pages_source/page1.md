---
title: H5分栏（第一章）
date: 2016-11-04 16:17:27
comments: true
categories: HTML5
---

#H5分栏（第一章）
<p>&nbsp;</p>
<div class="cnblogs_code">
<pre>
    <span style="color: #0000ff">&lt;!</span>
    <span style="color: #ff00ff">DOCTYPE html</span>
    <span style="color: #0000ff">&gt;</span> 
    <span style="color: #0000ff">&lt;</span><span style="color: #800000">html </span><span style="color: #ff0000">xmlns</span><span style="color: #0000ff">="http://www.w3.org/1999/xhtml"</span><span style="color: #0000ff">&gt;</span>
    <span style="color: #0000ff">&lt;</span><span style="color: #800000">head </span><span style="color: #ff0000">runat</span><span style="color: #0000ff">="server"</span><span style="color: #0000ff">&gt;</span>
    <span style="color: #0000ff">&lt;</span><span style="color: #800000">meta </span><span style="color: #ff0000">http-equiv</span><span style="color: #0000ff">="Content-Type"</span><span style="color: #ff0000"> content</span><span style="color: #0000ff">="text/html; charset=utf-8"</span> <span style="color: #0000ff">/&gt;</span>
    <span style="color: #0000ff">&lt;</span><span style="color: #800000">title</span><span style="color: #0000ff">&gt;</span>页面结构<span style="color: #0000ff">&lt;/</span><span style="color: #800000">title</span><span style="color: #0000ff">&gt;</span>
    <span style="color: #0000ff">&lt;</span><span style="color: #800000">style </span><span style="color: #ff0000">type</span><span style="color: #0000ff">="text/css"</span><span style="color: #0000ff">&gt;</span><span style="background-color: #f5f5f5; color: #800000">
    header, nav, article, footer </span><span style="background-color: #f5f5f5; color: #000000">{</span><span style="background-color: #f5f5f5; color: #ff0000">
    border</span><span style="background-color: #f5f5f5; color: #000000">:</span><span style="background-color: #f5f5f5; color: #0000ff"> solid 1px #666</span><span style="background-color: #f5f5f5; color: #000000">;</span><span style="background-color: #f5f5f5; color: #ff0000">
    padding</span><span style="background-color: #f5f5f5; color: #000000">:</span><span style="background-color: #f5f5f5; color: #0000ff"> 5px</span><span style="background-color: #f5f5f5; color: #000000">;</span>
    <span style="background-color: #f5f5f5; color: #000000">}</span><span style="background-color: #f5f5f5; color: #800000">         header </span><span style="background-color: #f5f5f5; color: #000000">{</span><span style="background-color: #f5f5f5; color: #ff0000">
    width</span><span style="background-color: #f5f5f5; color: #000000">:</span><span style="background-color: #f5f5f5; color: #0000ff"> 500px</span><span style="background-color: #f5f5f5; color: #000000">;</span>
    <span style="background-color: #f5f5f5; color: #000000">}</span><span style="background-color: #f5f5f5; color: #800000">         nav </span><span style="background-color: #f5f5f5; color: #000000">{</span><span style="background-color: #f5f5f5; color: #ff0000">
    float</span><span style="background-color: #f5f5f5; color: #000000">:</span><span style="background-color: #f5f5f5; color: #0000ff"> left</span><span style="background-color: #f5f5f5; color: #000000">;</span><span style="background-color: #f5f5f5; color: #ff0000">
    width</span><span style="background-color: #f5f5f5; color: #000000">:</span><span style="background-color: #f5f5f5; color: #0000ff"> 60px</span><span style="background-color: #f5f5f5; color: #000000">;</span><span style="background-color: #f5f5f5; color: #ff0000">
    height</span><span style="background-color: #f5f5f5; color: #000000">:</span><span style="background-color: #f5f5f5; color: #0000ff"> 100px</span><span style="background-color: #f5f5f5; color: #000000">;</span>
    <span style="background-color: #f5f5f5; color: #000000">}</span><span style="background-color: #f5f5f5; color: #800000">         article </span><span style="background-color: #f5f5f5; color: #000000">{</span><span style="background-color: #f5f5f5; color: #ff0000">
    float</span><span style="background-color: #f5f5f5; color: #000000">:</span><span style="background-color: #f5f5f5; color: #0000ff"> left</span><span style="background-color: #f5f5f5; color: #000000">;</span><span style="background-color: #f5f5f5; color: #ff0000">
    width</span><span style="background-color: #f5f5f5; color: #000000">:</span><span style="background-color: #f5f5f5; color: #0000ff"> 428px</span><span style="background-color: #f5f5f5; color: #000000">;</span><span style="background-color: #f5f5f5; color: #ff0000">
    height</span><span style="background-color: #f5f5f5; color: #000000">:</span><span style="background-color: #f5f5f5; color: #0000ff"> 100px</span><span style="background-color: #f5f5f5; color: #000000">;</span>
    <span style="background-color: #f5f5f5; color: #000000">}</span><span style="background-color: #f5f5f5; color: #800000">         footer </span><span style="background-color: #f5f5f5; color: #000000">{</span><span style="background-color: #f5f5f5; color: #ff0000">
    clear</span><span style="background-color: #f5f5f5; color: #000000">:</span><span style="background-color: #f5f5f5; color: #0000ff"> both</span><span style="background-color: #f5f5f5; color: #000000">;</span><span style="background-color: #f5f5f5; color: #ff0000">
    width</span><span style="background-color: #f5f5f5; color: #000000">:</span><span style="background-color: #f5f5f5; color: #0000ff"> 500px</span><span style="background-color: #f5f5f5; color: #000000">;</span>
    <span style="background-color: #f5f5f5; color: #000000">}</span>
    <span style="color: #0000ff">&lt;/</span><span style="color: #800000">style</span><span style="color: #0000ff">&gt;</span>
    <span style="color: #0000ff">&lt;/</span><span style="color: #800000">head</span><span style="color: #0000ff">&gt;</span>
    <span style="color: #0000ff">&lt;</span><span style="color: #800000">body</span><span style="color: #0000ff">&gt;</span>
    <span style="color: #0000ff">&lt;</span><span style="color: #800000">header</span><span style="color: #0000ff">&gt;</span><span style="color: #000000">
    header 头部部分
</span><span style="color: #0000ff">&lt;/</span><span style="color: #800000">header</span><span style="color: #0000ff">&gt;</span>
<span style="color: #0000ff">&lt;</span><span style="color: #800000">nav</span><span style="color: #0000ff">&gt;</span><span style="color: #000000">
nav 菜单导航说明部分
</span><span style="color: #0000ff">&lt;/</span><span style="color: #800000">nav</span><span style="color: #0000ff">&gt;</span>
<span style="color: #0000ff">&lt;</span><span style="color: #800000">article</span><span style="color: #0000ff">&gt;</span><span style="color: #000000">
article 内容说明部分
</span><span style="color: #0000ff">&lt;/</span><span style="color: #800000">article</span><span style="color: #0000ff">&gt;</span>
<span style="color: #0000ff">&lt;</span><span style="color: #800000">footer</span><span style="color: #0000ff">&gt;</span><span style="color: #000000">
footer  底部说明部分
</span><span style="color: #0000ff">&lt;/</span><span style="color: #800000">footer</span><span style="color: #0000ff">&gt;</span>
<span style="color: #0000ff">&lt;/</span><span style="color: #800000">body</span><span style="color: #0000ff">&gt;</span>
<span style="color: #0000ff">&lt;/</span><span style="color: #800000">html</span><span style="color: #0000ff">&gt;</span></pre>
</div><p>普通html 分栏</p><p>&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;<br>&lt;head runat="server"&gt;<br>    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;<br>    &lt;title&gt;html页面结构&lt;/title&gt;<br>    &lt;style&gt;<br>        #header, #nav, #article, #footer {<br>            border: solid 1px #666;<br>            padding: 5px;<br>        }</p><p>        #header {<br>            width: 500px;<br>        }<br>        /*左边菜单*/<br>        #nav {<br>            float: left;<br>            width: 60px;<br>            height: 100px;<br>        }<br>        /*右边菜单*/<br>        #article {<br>            float: left;<br>            width: 428px;<br>            height: 100px;<br>        }</p><p>        #footer {<br>            clear: both;<br>            width: 500px;<br>        }<br>    &lt;/style&gt;<br>&lt;/head&gt;<br>&lt;body&gt;<br>    &lt;div id="header"&gt;<br>        导航部分<br>    &lt;/div&gt;<br>    &lt;div id="nav"&gt;<br>        左边内容<br>    &lt;/div&gt;<br>    &lt;div id="article"&gt;<br>        右边内容<br>    &lt;/div&gt;<br>    &lt;div id="footer"&gt;<br>        底部<br>    &lt;/div&gt;</p><p>&lt;/body&gt;<br>&lt;/html&gt;</p>
1 nodeName=undefined nodeValue=undefined nodeType=undefined
