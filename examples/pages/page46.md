---
title: HTML5大数据可视化效果（二）可交互地铁线路图
date: 2016-11-07 15:51:57
comments: true
categories: HTML5
---

#HTML5大数据可视化效果（二）可交互地铁线路图
&nbsp;
[HTML5大数据可视化效果](http://www.cnblogs.com/twaver/p/4547924.html)
&rdquo;系列，以示鼓励（P.S. 其实还挺有压力的，后浪推前浪，新人赶旧人。我们这些老鸟也得注意，免得让00后给抢了饭碗）&nbsp;
&nbsp;
![picture](http://images2015.cnblogs.com/blog/311983/201611/311983-20161103121614533-2062155906.jpg)
![picture](http://images2015.cnblogs.com/blog/311983/201611/311983-20161103121656721-376610979.jpg)
&nbsp;
&nbsp;
&nbsp;
![picture](http://images2015.cnblogs.com/blog/311983/201611/311983-20161103121921361-1178958456.gif)
&nbsp;
&nbsp;
&nbsp;
![picture](http://images2015.cnblogs.com/blog/311983/201611/311983-20161103122154049-1255275872.gif)
&nbsp;
&nbsp;
 twaver.Util.registerImage('station',{     w: linkWidth*1.6,     h: linkWidth*1.6,     v: function (data, view) {         var result = [];         if(data.getClient('focus')){             result.push({                 shape: 'circle',                 r: linkWidth*0.7,                 lineColor:  data.getClient('lineColor'),                 lineWidth: linkWidth*0.2,                 fill: 'white',             });             result.push({                 shape: 'circle',                 r: linkWidth*0.2,                 fill:  data.getClient('lineColor'),             });         }else{             result.push({                 shape: 'circle',                 r: linkWidth*0.6,                 lineColor: data.getClient('lineColor'),                 lineWidth: linkWidth*0.2,                 fill: 'white',             });         }         return result;     } }); &nbsp;
&nbsp;
 来看代码：&nbsp;
 1.    twaver.Util.registerImage('rotateArrow', { 2.        w: 124, 3.        h: 124, 4.        v: [{ 5.            shape: 'vector', 6.            name: 'doubleArrow', 7.            rotate: 360, 8.            animate: [{ 9.                attr: 'rotate', 10.                to: 0, 11.                dur: 2000, 12.                reverse: false, 13.                repeat: Number.POSITIVE_INFINITY 14.            }] 15.        }] 16.    }); &nbsp;
  另外，在单击和双击站点时，还实现了selected和loading的动画效果，值得点赞！&nbsp;
![picture](http://images2015.cnblogs.com/blog/311983/201611/311983-20161103141545565-2010504104.gif)
![picture](http://images2015.cnblogs.com/blog/311983/201611/311983-20161103141605065-1237423734.gif)
&nbsp;
&nbsp;
&nbsp;
&nbsp;
![picture](http://images2015.cnblogs.com/blog/311983/201611/311983-20161103141731096-1466288424.gif)
&nbsp;
&nbsp;
 1.    network.setZoomManager(new twaver.vector.MixedZoomManager(network)); 2.    network.setMinZoom(0.2); 3.    network.setMaxZoom(3); 4.    network.setZoomVisibilityThresholds({ 5.        label : 0.6, 6.    }); &nbsp;
&nbsp;
&nbsp;
![picture](http://images2015.cnblogs.com/blog/311983/201611/311983-20161103141931643-856207231.gif)
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
![picture](http://images2015.cnblogs.com/blog/311983/201611/311983-20161103143834486-1796262740.gif)
&nbsp;
&nbsp;
&nbsp;
&nbsp;
![picture](http://images2015.cnblogs.com/blog/311983/201611/311983-20161103143940158-1173344247.gif)
&nbsp;
&nbsp;
tw-service@servasoft.com，来鉴赏下小弟的成果。&nbsp;
&nbsp;
 数据结构，按照站点、线路、杂项三大块来组织，结构清晰，利于遍历、查询等操作。&nbsp;
 1.    { 2.        "stations":{ 3.            "l01s01":{ }, 4.            &hellip;&hellip;&hellip;&hellip; 5.        } 6.        "lines":{ 7.            "l01":{&hellip;&hellip;}, 8.            &hellip;&hellip;&hellip;&hellip; 9.        } 10.        "sundrys":{ 11.            "railwaystationshanghai":{&hellip;&hellip;}, 12.            &hellip;&hellip;&hellip;&hellip; 13.        } 14.    } &nbsp;
&nbsp;
 1.    "l01s01":{ 2.        "id":"l01s01", 3.        "name":"莘庄", 4.        "loc":{"x":419,"y":1330}, 5.        "label":"bottomright.bottomright", 6.    }, 7.    &hellip;&hellip;&hellip;&hellip; &nbsp;
&nbsp;
&nbsp;
 1.    function loadJSON(path,callback){ 2.        var xhr = new XMLHttpRequest(); 3.        xhr.onreadystatechange = function(){ 4.            if (xhr.readyState === 4) { 5.                if (xhr.status === 200) { 6.                   dataJson = JSON.parse(xhr.responseText); 7.                   callback &amp;&amp; callback(); 8.               } 9.           } 10.       }; 11.       xhr.open("GET", path, true); 12.       xhr.send(); 13.    } &nbsp;
&nbsp;
 1.    function init(){ 2.        loadJSON("shanghaiMetro.json", function(){ 3.            initNetwork(dataJson); 4.            initNode(dataJson); 5.        }); 6.    } &nbsp;
&nbsp;
 1.    for(staId in json.stations){ 2.        var station = json.stations[staId]; 3.        staNode = new twaver.Node({ 4.            id: staId, 5.            name: station.name, 6.            image:'station', 7.        }); 8.        staNode.s('label.color','rgba(99,99,99,1)'); 9.        staNode.s('label.font','12px 微软雅黑'); 10.        staNode.s('label.position',station.label); 11.        staNode.setClient('location',station.loc); 12.        box.add(staNode); 13.    } &nbsp;
&nbsp;
 1.    for(lineId in json.lines) { 2.        &hellip;&hellip; 3.        for(staSn in line.stations) { 4.            &hellip;&hellip; 5.            var link = new twaver.Link(linkId,prevSta,staNode); 6.            link.s('link.color', line.color); 7.            link.s('link.width', linkWidth); 8.            link.setToolTip(line.name); 9.            box.add(link); 10.        } 11.    } &nbsp;
  最后再加入图标，一张原始的地铁图就呈现出来了。&nbsp;
![picture](http://images2015.cnblogs.com/blog/311983/201611/311983-20161103144715205-1780446914.png)
&nbsp;
&nbsp;
&nbsp;
&nbsp;
![picture](http://images2015.cnblogs.com/blog/311983/201611/311983-20161103144816315-1456837843.png)
&nbsp;
&nbsp;
&nbsp;
 var createTurnSta = function(line, staSn){     staTurn = new twaver.Node(staSn);     staTurn.setImage();     staTurn.setClient('lineColor',line.color);     staTurn.setClient('lines',[line.id]);     var loc = line.stations[staSn];     staTurn.setClient('location',loc);     box.add(staTurn);     return staTurn; } &nbsp;
&nbsp;
&nbsp;
 var createFollowSta = function(json, line, staNode, staId){     staFollow = new twaver.Follower(staId);     staFollow.setImage();     staFollow.setClient('lineColor',line.color);     staFollow.setClient('lines',[line.id]);     staFollow.setHost(staNode);     var az = azimuth[staId.substr(6,2)];     var loc0 = json.stations[staId.substr(0,6)].loc;     var loc = {x:loc0.x+az.x, y:loc0.y+az.y};     staFollow.setClient('location',loc);     box.add(staFollow);     return staFollow; } &nbsp;
![picture](http://images2015.cnblogs.com/blog/311983/201611/311983-20161103144955643-1549309486.png)
&nbsp;
&nbsp;
 var azimuth = {     bb: {x: 0, y: linkWidth*zoom/2},     tt: {x: 0, y: -linkWidth*zoom/2},     rr: {x: linkWidth*zoom/2, y: 0},     ll: {x: -linkWidth/2, y: 0},     br: {x: linkWidth*zoom*0.7/2, y: linkWidth*zoom*0.7/2},     bl: {x: -linkWidth*zoom*0.7/2, y: linkWidth*zoom*0.7/2},     tr: {x: linkWidth*zoom*0.7/2, y: -linkWidth*zoom*0.7/2},     tl: {x: -linkWidth*zoom*0.7/2, y: -linkWidth*zoom*0.7/2},     BB: {x: 0, y: linkWidth*zoom},     TT: {x: 0, y: -linkWidth*zoom},     RR: {x: linkWidth*zoom, y: 0},     LL: {x: -linkWidth, y: 0},     BR: {x: linkWidth*zoom*0.7, y: linkWidth*zoom*0.7},     BL: {x: -linkWidth*zoom*0.7, y: linkWidth*zoom*0.7},     TR: {x: linkWidth*zoom*0.7, y: -linkWidth*zoom*0.7},     TL: {x: -linkWidth*zoom*0.7, y: -linkWidth*zoom*0.7} }; &nbsp;
  最后，想要看程序，或者想玩&ldquo;地铁拖拖乐&rdquo;的各位，都可以给我留言和发邮件：tw-service@servasoft.com。