---
title: 【极品代码】一般人我不告诉他，手机端h5播放时不自动全屏代码
date: 2016-11-04 14:48:36
comments: true
categories: HTML5
---

#【极品代码】一般人我不告诉他，手机端h5播放时不自动全屏代码
已测适用于ios，某些安卓手机微信下播放视频会出现播放器控件（这个实在是无力吐槽噢，因为之前还遇到过微信播放完视频后竟然无法退出全屏出现广告的情况，只有播放完后刷新页面并且要放到框架页里才能屏蔽微信视频广告!），之前用canvans渲染，感觉不够太完美，弄成背景切换形式得（用背景切换形式可以完美解决当一个容器有transform:rotate(90deg)属性时自适应百分比问题，若是canvans需去计算高宽太麻烦还需考虑不同系统）。
 
想要手机端h5播放时不自动全屏比想象的简单，看加粗部分，一般人我不告诉他噢。
<video id="video" poster="" width="100%" height="100%" x-webkit-airplay="true" webkit-playsinline="true">    <source src="http://file.ih5.cn/files/34906/16999/1f3b3c.mp4" type="video/mp4" codecs="avc1.42E01E,mp4a.40.2"></video>
