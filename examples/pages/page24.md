---
title: 让IE9以下版本的浏览支持html5,CSS3的插件
date: 2016-11-07 15:51:48
comments: true
categories: HTML5
---

#让IE9以下版本的浏览支持html5,CSS3的插件
　　随着html5(后面用h5代表)标签越来越广泛的使用，IE不识别h5标签的问题让人很是烦恼。
　　在火狐和chrome之类的浏览器中，遇到不认识的标签，只要给个display:block属性，就能让这个元素成为一个类似div的元素，但是到IE上就很恶心了，它不认识就是不认识，你在html和css里添加什么它都不理你。
　　没什么什么问题是万能的程序猿解决不了的，其实要让IE识别一个自定义的标签(IE认为h5的标签是陌生的，不合法的)
　　
html5--html5shiv.js插件下载　　
css3--selectivizr-min.js插件下载　　以上两个插件常在项目中运用较多。在html页面中的&lt;head&gt;标签里面插入下载好的js文件，页面就可以正常添加html5元素了，css3样式
