---
title: 遍历节点树
date: 2016-11-07 15:52:07
comments: true
categories: HTML5
---

#遍历节点树
从以下属性读出来的信息可以让我们了解相邻节点之间的关系。

childNodes属性将返回一个数组，这个数组由给定元素节点的子节点构成：

nodeList = node.childNodes
这个属性返回的数组是一个nodeList集合。这个nodeList集合里的每个节点都是一个节点对象。这些节点对象都有着nodeType、nodeName、nodeValue等常见的节点属性。
文本节点和属性节点都不可能包含任何的子节点，所以他们的childNodes属性永远返回一个空数组。
　　如果只是想知道某个元素有没有子节点，可以使用hasChildNodes方法。
　　如果想知道某个元素有多少个节点，请使用childNodes数组的length属性：

node.childNodes.length
即使元素只有一个子节点，childNodes属性也将返回一个节点数组而不是返回一个单个的节点，此时，childNodes数组的length的长度值将是1，比如说，如果某个网页上的document元素只有html元素这个子节点，那么document.childNodes[0].nodeName值将是HTML。
childNodes属性是一个只读属性，如果需要给某个元素增加子节点，可以使用appendChild()或insertBefore()方法；如果需要删除某个元素节点，可以使用removeChild()方法；在使用这几个方法曾、减某个元素子节点时，这个元素childNodes属性也将自动刷新。

firstChild

reference = node.firstChild
这个属性返回一个节点对象的引用指针，这个节点对象有nodeType、nodeName、nodeValue等常见属性。
文本节点和属性节点不可能在包含任何的子节点，所以他们的firstChild属性永远会返回null。
firstChild是一个只读属性。

lastChild
lastChild：属性将返回一个给定元素的最后一个子节点：

reference = node.lastChild
这个属性返回一个节点对熊引用指针，这个节点对象都有着nodeType、nodeName、nodeValue等常见节点属性。
文本节点属性和属性节点属性都不可能在包含任何子节点，所以lastChild属性永远返回null。
某个元素的lastChild属性等价于元素childNodes节点集合的最后一个节点：

refrence = node.childNodes[element.childNodes.lelgth-1]
如果想知道某个元素有没有子节点，可以使用hasChildNodes方法，如果某个节点没有任何子节点，它的lastChild属性将返回null。
lastChild属性是一个只读属性。

nextSibing
nextSibing属性将返回一个给定节点的下一个子节点：

reference = node.nextSibing
这个属性返回一个节点对象引用指针，这个节点对象都有着nodeType、nodeName、nodeValue等常见属性。
如果给定节点后面没有同属于父节点的节点，它的nextSibling属性将返回null。
nextSibling属性是一个只读属性。

parentNode
parentNode属性将返回一个给定节点的父节点：

reference = node.parentNode
这个属性返回一个节点对象的引用指针，这个节点对象都有着nodeType、nodeName、nodeValue等常见节点属性。
parentNode属性返回的节点永远是一个元素节点，因为只有元素节点才有可能包含子节点，唯一的例外是document节点，他没有父节点，换句话说，document节点的parentNode属性将返回null。
parentNode属性是一个只读属性。

previousSibling

reference  = node.previousSibling
这个属性返回前一个节点对象的引用指针，这个节点对象都有着nodeType、nodeName、nodeValue等常见节点属性。
　　如果没有前一个元素节点返回null。
　　previousSibling属性是一个只读属性。
