---
title: 软件工程 网站分类
date: 2016-11-04 14:48:40
comments: true
categories: HTML5
---

#软件工程 网站分类
     大型应用软件一般由多个模块组成，一般它是多个团队开发同一个应用程序的不同模块，这是比较常见的场景。例如，一个团队正在对应用程序的应用程序，用户界面项目(app-ui.jar:1.0) 的前端进行开发，他们使用的是数据服务工程 (data-service.jar:1.0)。 现在，它可能会有这样的情况 ...     
     分支 其实在项目clone下来后就有一个分支，叫做master分支。新建分支的步骤：右键项目→Git→Repository...→Branches... master分支应该是最稳定的，开发的时候，建议不要直接在这个分支上操作。 然后再弹出的信息框中选择 New Branch ，然后输入分支名称，确 ...     
     -----------------------------------------------------------------------------------------------------------------------... ...     
     以测试用例驱动项目开发，coding/case俩条线并走模式。 1、开发人员只负责功能实现； 2、测试人员提供自测用例，研发人员jenkins持续集成项目后自动化执行自测用例，通过后方可转测试渗入测试。 3、Open-Test 分俩个功能块，test用例块与controller执行块： test用例 ...     
     机房/网络/操作系统相关的底层工作分离出来由专人负责，成为系统管理部，而上层和应用产品相关的工作则由运维负责，成为运维部。我喜欢用一个偏硬一个偏软来解释。 职能区分： 系统级 IDC机房建设维护 网络设备搭建调试 操作系统维护升级 电子设备故障处理 应用级 应用安装部署 预、生产发布 产品运行维护  ...     
     首先明白三个概念，服务器代码库，本地代码库，和正在coding的项目。 coding完毕后，先通过commit提交到本地代码库，然后通过push再提交server的代码库 git步骤 git clone --从远程主机克隆一个代码库到本地；git clone https://git.coding.n ...     
     1994年，斯蒂芬·罗宾斯首次提出了“团队”的概念：为了实现某一目标而由相互协作的个体所组成的正式群体。在随后的十年里，关于“团队合作”的理念风靡全球。如果团队合作是出于自觉自愿时，它必将会产生一股强大而且持久的力量。 1问员工的四个问题 “你的梦想是什么？” “你现在离你的梦想有多远？” “为了实 ...     
     Visual Studio在生成项目工程前后，有时我们需要做一些特殊的操作，比如：拷贝生成的dll到指定目标下面等。 结合VS可以添加预先生成事件和后期生成事件，采用命令或bat批处理。 1、Visual Studio生成事件命令 预先生成事件命令行，示例： cd $(ProjectDir)\Res ...     
     配置:git config --global user.name 'yangshaoxiang' git config --global user.email '254135495@qq.com' ssh-keygen -t rsa –C "254135495@qq.com" //产生秘钥、在C:\ ...     
     1、新建版本库 2、修改版本配置文件 设置用户账号 设置用户访问权限 3、创建目录 4、导入项目 5、检出项目、添加、提交代码 6、新建分支 ...     
     1.Maven Maven可以构建项目，采用pom方式配置主项目和其他需要引用的项目。同时可结合spring3.0的新特性web fragment。 从现实出发，特别是对于管理不到位，程序员整体素质不是那么高的开发团队，采用这种方式未必能发挥其优势和功效，反而会成为制约前进的一种方式。 2.Grad ...     