---
title: H5分栏（第一章）
date: 2016-11-04 14:48:42
comments: true
categories: HTML5
---

#H5分栏（第一章）
 
普通html 分栏
<html xmlns="http://www.w3.org/1999/xhtml"><head runat="server">    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />    <title>html页面结构</title>    <style>        #header, #nav, #article, #footer {            border: solid 1px #666;            padding: 5px;        }
        #header {            width: 500px;        }        /*左边菜单*/        #nav {            float: left;            width: 60px;            height: 100px;        }        /*右边菜单*/        #article {            float: left;            width: 428px;            height: 100px;        }
        #footer {            clear: both;            width: 500px;        }    </style></head><body>    <div id="header">        导航部分    </div>    <div id="nav">        左边内容    </div>    <div id="article">        右边内容    </div>    <div id="footer">        底部    </div>
</body></html>
