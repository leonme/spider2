---
title: 青竹zzq 博客园
date: 2016-11-04 14:48:43
comments: true
categories: HTML5
---

#青竹zzq 博客园
摘要: 从以下属性读出来的信息可以让我们了解相邻节点之间的关系。 childNodes属性将返回一个数组，这个数组由给定元素节点的子节点构成： 这个属性返回的数组是一个nodeList集合。这个nodeList集合里的每个节点都是一个节点对象。这些节点对象都有着nodeType、nodeName、nodeV
posted @ 2016-11-01 16:23 青竹zzq 阅读(59) 评论(0)
摘要: 节点属性： 文档里的每个节点都有以下属性。 nodeName nodeName属性将返回一个字符串，其内容是给定节点的名字： 如果给定节点是一个属性节点，nodeName属性将返回这个属性的名字。 如果给定节点是文本节点，nodeName属性将返回一个内容#text的字符串。 nodeName属性是
posted @ 2016-11-01 09:40 青竹zzq 阅读(22) 评论(0)
摘要: hasChildNodes()：方法可以用来检查一个给定的元素是否有子节点。 这个方法将返回一个布尔值true或false。如果给定元素有方法将返回true，否则，返回false。 文本节点可属性节点都不可能在包含子节点，所以对这两类节点使用hasChildNodes方法的返回值永远是false 这
posted @ 2016-11-01 09:22 青竹zzq 阅读(3) 评论(0)
摘要: getElementsByTagName()：方法的用途是寻找有着给定标签名的所有的元素。 这个方法返回一个节点的集合，这个集合可以当做一个数组来处理。这个集合的length属性等于当前文档里有着给定标签名的所有元素的总个数。这个数组里面的每个元素都是一个对象，他们都有着nodeName、nodeT
posted @ 2016-11-01 09:12 青竹zzq 阅读(1) 评论(0)
摘要: getElementById()：方法的用途是寻找一个有着给定id属性值得元素： 这个方法将返回一个有着给定id属性值得元素节点。如果不存在这样的元素，他返回null。这个方法只能用于document对象。 getElementById()方法返回的元素节点是一个对象，这个对象有着nodeName、
posted @ 2016-11-01 08:31 青竹zzq 阅读(2) 评论(0)
