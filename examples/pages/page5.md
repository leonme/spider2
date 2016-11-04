---
title: 发布：.NET开发人员必备的可视化调试工具（你值的拥有）
date: 2016-11-04 14:48:33
comments: true
categories: HTML5
---

#发布：.NET开发人员必备的可视化调试工具（你值的拥有）
2：解压RAR后执行：CYQ.VisualierSetup.exe 成功后关掉提示窗口即可。
PS：一次运行，支持各个VS版本，终身提高调试的效率，而且没任何副作用。
后续升级获取地址：https://github.com/cyq1162/cyqdata 在文档目录下。



1：System.Drawing.Image：（这个转图片查看）
2：MDataTable系列：表、行、列、结构
3：DataTable系列：表、行、列、结构
4：泛型系列：Dictionary<,>、LinkedList<>、List<>、Queue<>、SortedDictionary<,>、SortedList<,>、Stack<>
5：非泛型系列：ArrayList、Hashtable、Queue、SortedList、Stack
6：其它继承自：Enumerable 接口的类型：（类型太多，未来得及一一测试）
BitArray、ReadOnlyCollectionBase、HybridDictionary、ListDictionary、StringCollection、StringDictionary、BaseCollection等
关于可视化调试这一块内容，网上一搜，相关的信息全部是我自己以前发过的文章，悲催就一个字。。。。
看来没啥人研究这一块，好在苍天不负有心人，还是被我突围了。。。。。
能出来这么简易的工具，经历的过程是：
2：收集了不同的VS版本的DLL（Microsoft.VisualStudio.DebuggerVisualizers.dll）。
4：想到了复制多个项目文件来实现多个VS版本编绎（如果想不到这个，估计也不会折腾）：

5：解决了系列化问题（才能大规模的支持各种类型）：
默认情况下，不支持系列化的类是不支持可视化的，因此，想支持DataRow查看都不行，会直接抛异常。
为了解决这一问题，进行了互联网搜索（相关信息，国内基本是我自己的文章，国外好不容易搜到一篇）。
通过研究，终于解决了这一难题：
自定义数据源，在设置数据源时，把对象转换成MDataTable，再由MDataTable去系列过去。
6：MDataTable要支持和大量类型的转换工作（这些年的工作已经完成了不少，只需要再补全即可）。
上一篇文章发布的时候，有网友还看不懂是用来干什么，一个唉~~~字了了。
这一次，在集满了所有的条件之下，花了一天的研究时间，直接写成了工具分享给你。
而你只要下载，再轻轻双击一下，就得能得良好的调试体验！
在你开发调试的过程中，可以很轻松的查看变量的所有数据！！！
妈妈再也不用担心你的调试能力了~~~
不要问我理由~~~我不是雷锋塔下的雷~~~
