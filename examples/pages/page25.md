---
title: Picasso ganchuanpu
date: 2016-11-04 14:48:35
comments: true
categories: HTML5
---

#Picasso ganchuanpu
1.简介
Picasso是Square公司出品的一个强大的图片下载和缓存图片库1）在adapter中需要取消已经不在视野范围的ImageView图片资源的加载，否则会导致图片错位，Picasso已经解决了这个问题。2）使用复杂的图片压缩转换来尽可能的减少内存消耗3）自带内存和硬盘二级缓存功能
 
2.基本用法

①普通加载图片
②裁剪的方式加载图片
③选择180度
 
3.ListView资源加载的方法
 - placeholder(xxx). 设置资源加载过程中的显示的Drawable。	- error(xxx).设置load失败时显示的Drawable。	- into(xxx) 设置资源加载到的目标 包括ImageView Target等
eg:Adapter中getView()方法中
　　
4.常用工具类
 
 
5.图片变换

在module的gradle中添加转换库:
　　
Activity中:
PicassoListviewAdapter：
　　
