---
title: H5分栏（第一章）
date: 2016-11-07 15:52:25
comments: true
categories: HTML5
---

#H5分栏（第一章）

```html
<!DOCTYPE html> <html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>页面结构</title>
    <style type="text/css">
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
    </style>
</head>
<body>
    <header>
        header 头部部分
    </header>
    <nav>
        nav 菜单导航说明部分
    </nav>
    <article>
        article 内容说明部分
    </article>
    <footer>
        footer  底部说明部分
    </footer>
</body>
</html>
```
普通html 分栏
```html
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>html页面结构</title>
    <style>
        #header, #nav, #article, #footer {
            border: solid 1px #666;
            padding: 5px;
        }

<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>html页面结构</title>
    <style>
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
    </style>
</head>
<body>
    <div id="header">
        导航部分
    </div>
    <div id="nav">
        左边内容
    </div>
    <div id="article">
        右边内容
    </div>
    <div id="footer">
        底部
    </div>
    
            clear: both;
            width: 500px;
        }
    </style>
</head>
<body>
    <div id="header">
        导航部分
    </div>
    <div id="nav">
        左边内容
    </div>
    <div id="article">
        右边内容
    </div>
    <div id="footer">
        底部
    </div></body>
</html>

</html>
```