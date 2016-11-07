---
title: H5分栏（第一章）
date: 2016-11-07 15:51:37
comments: true
categories: HTML5
---

#H5分栏（第一章）
&nbsp;

&lt;!DOCTYPE html&gt; &lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head runat="server"&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
    &lt;title&gt;页面结构&lt;/title&gt;
    &lt;style type="text/css"&gt;
        header, nav, article, footer {
            border: solid 1px #666;
            padding: 5px;
        }         header {
            width: 500px;
        }         nav {
            float: left;
            width: 60px;
            height: 100px;
        }         article {
            float: left;
            width: 428px;
            height: 100px;
        }         footer {
            clear: both;
            width: 500px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;header&gt;
        header 头部部分
    &lt;/header&gt;
    &lt;nav&gt;
        nav 菜单导航说明部分
    &lt;/nav&gt;
    &lt;article&gt;
        article 内容说明部分
    &lt;/article&gt;
    &lt;footer&gt;
        footer  底部说明部分
    &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;
普通html 分栏
&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head runat="server"&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
    &lt;title&gt;html页面结构&lt;/title&gt;
    &lt;style&gt;
        #header, #nav, #article, #footer {
            border: solid 1px #666;
            padding: 5px;
        }

&lt;head runat="server"&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
    &lt;title&gt;html页面结构&lt;/title&gt;
    &lt;style&gt;
        #header, #nav, #article, #footer {
            border: solid 1px #666;
            padding: 5px;
        }        #header {
            width: 500px;
        }
        /*左边菜单*/
        #nav {
            float: left;
            width: 60px;
            height: 100px;
        }
        /*右边菜单*/
        #article {
            float: left;
            width: 428px;
            height: 100px;
        }

            width: 500px;
        }
        /*左边菜单*/
        #nav {
            float: left;
            width: 60px;
            height: 100px;
        }
        /*右边菜单*/
        #article {
            float: left;
            width: 428px;
            height: 100px;
        }        #footer {
            clear: both;
            width: 500px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id="header"&gt;
        导航部分
    &lt;/div&gt;
    &lt;div id="nav"&gt;
        左边内容
    &lt;/div&gt;
    &lt;div id="article"&gt;
        右边内容
    &lt;/div&gt;
    &lt;div id="footer"&gt;
        底部
    &lt;/div&gt;

            clear: both;
            width: 500px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id="header"&gt;
        导航部分
    &lt;/div&gt;
    &lt;div id="nav"&gt;
        左边内容
    &lt;/div&gt;
    &lt;div id="article"&gt;
        右边内容
    &lt;/div&gt;
    &lt;div id="footer"&gt;
        底部
    &lt;/div&gt;&lt;/body&gt;
&lt;/html&gt;

&lt;/html&gt;