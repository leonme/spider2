---
title: 结合WebSocket编写WebGL综合场景示例
date: 2016-11-07 15:52:35
comments: true
categories: HTML5
---

#结合WebSocket编写WebGL综合场景示例
在WebGL场景中导入多个Babylon骨骼模型，在局域网用WebSocket实现多用户交互控制。
首先是场景截图：
![picture](http://images2015.cnblogs.com/blog/657116/201611/657116-20161104092432330-1844981251.png)
上图在场景中导入一个Babylon骨骼模型，使用asdw、空格、鼠标控制加速度移动，在移动时播放骨骼动画。
![picture](http://images2015.cnblogs.com/blog/657116/201611/657116-20161104092921783-1111568630.png)
上图在场景中加入更多的骨骼模型（兔子），兔子感知到人类接近后会加速远离人类。
![picture](http://images2015.cnblogs.com/blog/657116/201611/657116-20161104093417315-1396209353.png)
上图，一个局域网中的新玩家进入场景，（他们头上的数字是WebSocket分配的session id），兔子们受到0和1的叠加影响。
&nbsp;
具体实现：

## 一、工程结构：

&nbsp;前台WebStorm工程：
![picture](http://images2015.cnblogs.com/blog/657116/201611/657116-20161104094056596-1505476394.png)
其中map.jpg是地形高度图，tree.jpg不是树而是地面泥土的纹理。。。
LIB文件夹里是引用的第三方库（babylon.max.js是2.4版），MYLIB文件夹里是我自己编写或整理修改的库，PAGE里是专用于此网页的脚本文件
　　其中FileText.js是js前台文件处理库（这里只用到了其中的产生日期字符串函数）
　　MoveWeb.js是加速度计算库
　　Sdyq.js里是对物体对象的定义和操作监听
　　Player.js里是继承了物体对象的玩家对象和动物对象的定义
　　utils是一些其他工具
　　View是页面控制库
MODEL文件夹里是人物和兔子的骨骼模型文件。
后台MyEclipse工程：
![picture](http://images2015.cnblogs.com/blog/657116/201611/657116-20161104094910408-100628683.png)
使用JDK1.7，因为Tomcat v8.0里包含了WebSocket所用的库，所以不需要引入额外jar包，只写了一个类。

## 二、基本场景构建和骨骼模型导入：

html页面文件：

```html
 1 <!DOCTYPE html>
 2 <html lang="en">
 3 <head>
 4     <meta charset="UTF-8">
 5     <title>使用websocket联网进行数据传递，这个节点应该既可以做主机也可以加入他人的主机</title>
 6 </head>
 7 <body>
 8 <div id="all_base" style="position:fixed;top:0px;left: 0px;">
 9     <div id="div_canvas" style="float: left;width: 75%;border: 1px solid">
10         <canvas id="renderCanvas" style="width: 100%;height: 100%"></canvas>
11     </div>
12     <div id="div_log" style="float: left;border: 1px solid;overflow-y: scroll">
13     </div>
14     <div id="div_bottom" style="float: left;width: 100%;height: 100px;padding-top: 10px;padding-left: 10px">
15         <input style="width: 200px" id="str_ip" value="localhost">
16         <input id="str_name">
17         <button id="btn_create" onclick="createScene()" disabled=true>启动场景</button>
18         <button id="btn_connect" onclick="Connect()" >websocket连接</button>
19         <button id="btn_close" onclick="Close()" disabled=true>关闭连接</button>
20         <span id="str_id" style="display: inline-block"></span><br><br>
21         <input style="width: 400px" id="str_message">
22         <button id="btn_send" onclick="Send()">发送</button>
23     </div>
24 </div>
25 <script src="../JS/LIB/babylon.max.js"></script>
26 <script src="../JS/MYLIB/View.js"></script>
27 <script src="../JS/LIB/jquery-1.11.3.min.js"></script>
28 <script src="../JS/MYLIB/FileText.js"></script>
29 <script src="../JS/MYLIB/Sdyq.js"></script>
30 <script src="../JS/MYLIB/player.js"></script>
31 <script src="../JS/MYLIB/MoveWeb.js"></script>
32 <script src="../JS/MYLIB/utils.js"></script>
33 <script src="../JS/PAGE/scene_link.js"></script>
34 <script src="../JS/PAGE/WebSocket.js"></script>
35 </body>
36 <script>
37     var username="";
38     window.onload=BeforeLog;
39     window.onresize=Resize_Pllsselect;
40     function BeforeLog()
41     {
42         Resize_Pllsselect();
43         //DrawYzm();
44         //createScene();
45     }
46     var str_log=document.getElementById("div_log");
47     function Resize_Pllsselect()
48     {
49         var size=window_size();
50         document.getElementById("all_base").style.height=(size.height+"px");
51         document.getElementById("all_base").style.width=(size.width+"px");
52         document.getElementById("div_canvas").style.height=(size.height-100+"px");
53         str_log.style.height=(size.height-100+"px");
54         str_log.style.width=((size.width/4)-4+"px");
55         if(engine!=undefined)
56         {
57             engine.resize();
58         }
59     }
60 
61     var state="offline";
62 
63     var arr_myplayers=[];
64     var arr_webplayers=[];
65     var arr_animals=[];
66     var arr_tempobj=[];//暂存对象初始化信息
67     var tempobj;
68 
69     var canvas = document.getElementById("renderCanvas");
70     var ms0=0;//上一时刻毫秒数
71     var mst=0;//下一时刻毫秒数
72     var schange=0;//秒差
73 
74     var skybox,
75             scene,
76             sceneCharger = false,
77             meshOctree,
78             cameraArcRotative = [],//弧形旋转相机列表
79             octree;
80     var engine;
81     var shadowGenerator ;
82 
83 </script>
84 </html>
```

View Code其中包含对页面尺寸大小变化的响应和一些全局变量的定义
scene_link.js文件中包含场景的构建和模型导入：

### 1、在createScene()方法的开头部分建立了一个基本的PlayGround场景：

```js
 1 engine = new BABYLON.Engine(canvas, true);
 2     engine.displayLoadingUI();
 3     scene = new BABYLON.Scene(engine);
 4 
 5     //在场景中启用碰撞检测
 6     scene.collisionsEnabled = true;
 7     //scene.workerCollisions = true;//启动webworker进程处理碰撞，确实可以有效使用多核运算，加大帧数！！
 8     //但是worker是异步运算的，其数据传输策略会导致movewithcollition执行顺序与期望的顺序不符
 9 
10     //定向光照
11     var LightDirectional = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-2, -4, 2), scene);
12     LightDirectional.diffuse = new BABYLON.Color3(1, 1, 1);//散射颜色
13     LightDirectional.specular = new BABYLON.Color3(0, 0, 0);//镜面反射颜色
14     LightDirectional.position = new BABYLON.Vector3(250, 400, 0);
15     LightDirectional.intensity = 1.8;//强度
16     shadowGenerator = new BABYLON.ShadowGenerator(1024, LightDirectional);//为该光源建立阴影生成器，用在submesh上时一直在报错，不知道为了什么
17 
18     //弧形旋转相机
19     cameraArcRotative[0] = new BABYLON.ArcRotateCamera("CameraBaseRotate", -Math.PI/2, Math.PI/2.2, 12, new BABYLON.Vector3(0, 5.0, 0), scene);
20     cameraArcRotative[0].wheelPrecision = 15;//鼠标滚轮？
21     cameraArcRotative[0].lowerRadiusLimit = 2;
22     cameraArcRotative[0].upperRadiusLimit = 22;
23     cameraArcRotative[0].minZ = 0;
24     cameraArcRotative[0].minX = 4096;
25     scene.activeCamera = cameraArcRotative[0];
26     cameraArcRotative[0].attachControl(canvas);//控制关联
27 
28     //地面
29     //name,url,width,height,subdivisions,minheight,maxheight,updateble,onready,scene
30     ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../IMAGE/map.jpg", 1000, 1000, 100, 0, 60, scene, true);//地面类型的网格
31     var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);//泥土材质
32     groundMaterial.diffuseTexture = new BABYLON.Texture("../IMAGE/tree.png", scene);//地面的纹理贴图
33     groundMaterial.diffuseTexture.uScale = 50.0;//纹理重复效果
34     groundMaterial.diffuseTexture.vScale = 50.0;
35     ground.material = groundMaterial;
36     ground.checkCollisions = true;//检测碰撞
37     ground.receiveShadows = true;//接收影子
38 
39     //墙
40     var Mur = BABYLON.Mesh.CreateBox("Mur", 1, scene);
41     Mur.scaling = new BABYLON.Vector3(15, 6, 1);
42     Mur.position.y = 20;
43     Mur.position.z = 20;
44     Mur.checkCollisions = true;
```
其中各个方法的具体用法可以参考官方的基础教程

### 2、接下来是在场景中导入第一个人物的骨骼模型：

```js
 1 //角色导入，加载哪个mesh、文件目录、文件名、加入场景、回调函数
 2     BABYLON.SceneLoader.ImportMesh("", "../MODEL/him/", "him.babylon", scene, function (newMeshes, particleSystems, skeletons)
 3     {//载入完成的回调函数
 4         var Tom=new Player;
 5         var obj_p={};//初始化参数对象
 6         obj_p.mesh=newMeshes[0];//网格数据
 7         obj_p.scaling=new BABYLON.Vector3(0.05, 0.05, 0.05);//缩放
 8         obj_p.position=new BABYLON.Vector3(-5.168, 30.392, -7.463);//位置
 9         obj_p.rotation=new BABYLON.Vector3(0, 3.9, 0);// 旋转
10         obj_p.checkCollisions=true;//使用默认的碰撞检测
11         obj_p.ellipsoid=new BABYLON.Vector3(0.5, 1, 0.5);//碰撞检测椭球
12         obj_p.ellipsoidOffset=new BABYLON.Vector3(0, 2, 0);//碰撞检测椭球位移
13         obj_p.skeletonsPlayer=skeletons;
14         obj_p.methodofmove="controlwitha";
15         obj_p.name=username;
16         obj_p.id=id;
17         obj_p.p1="";
18         obj_p.p2="../MODEL/him/";
19         obj_p.p3="him.babylon";
20         var len=newMeshes.length;//对于复杂的模型来说newMeshes的其他部分也必须保存下来
21         var arr=[];
22         for(var i=1;i<len;i++)
23         {
24             arr.push(newMeshes[i]);
25         }
26         obj_p.submeshs=arr;
27 
28         Tom.init(
29             obj_p
30         );
31         arr_myplayers[username]=Tom;
32 
33         if(state=="online")
34         {
35             var arr=[];
36             arr.push("addnewplayer");
37             arr.push(Tom.mesh.scaling.x);
38             arr.push(Tom.mesh.scaling.y);
39             arr.push(Tom.mesh.scaling.z);
40             arr.push(Tom.mesh.position.x);
41             arr.push(Tom.mesh.position.y);
42             arr.push(Tom.mesh.position.z);
43             arr.push(Tom.mesh.rotation.x);
44             arr.push(Tom.mesh.rotation.y);
45             arr.push(Tom.mesh.rotation.z);
46             arr.push(Tom.p1);
47             arr.push(Tom.p2);
48             arr.push(Tom.p3);
49             arr.push(Tom.meshname);
50             var dt=new Date();
51             console.log(dt.getTime()+"send addnewplayer"+id);
52             doSend(arr.join("@"));
53         }
54 
55         cameraArcRotative[0].alpha = -parseFloat(arr_myplayers[username].mesh.rotation.y) - 4.69;//初始化相机角度
56 
57     });
```

   其中BABYLON.SceneLoader.ImportMesh是一个异步的把服务器端场景文件导入本地内存的方法，第一个参数表示导入场景文件中的哪一个Mesh，为空表示都导入（一个场景文件里可能包含多个模型，但该示例中的场景文件里只有一个模型，所以也叫做模型文件），第二个参数是文件所在的相对路径，第三个参数是文件名，第四个参数是文件加入的场景，第五个参数是导入完成后的回调函数。
　　回调函数的newMeshes参数是所有导入的Mesh组成的数组，skeletons参数是所有导入的骨骼动画数组。事实上一个模型可能由多个mesh组合而成，比如示例中的him模型的newMeshes[0]只是一个空壳，newMeshes[1]到newMeshes[5]才是模型各个部分的实际Mesh，后五个Mesh是newMeshes[0]的“submesh”，newMeshes[0]是后五个Mesh的parent，在理想情况下这些Mesh之间的关系和Mesh与骨骼动画（skeleton）之间的关系由Babylon引擎自动管理。
　　在回调函数中，定义Tom为一个Player“类”对象，第五行定义的obj_p对象是Player对象的初始化参数对象，Player.init()方法定义在player.js文件中：
```js
 1 //玩家对象
 2 Player=function()
 3 {
 4     sdyq.object.call(this);
 5 }
 6 Player.prototype=new sdyq.object();
 7 Player.prototype.init=function(param)
 8 {
 9     param = param || {};
10     sdyq.object.prototype.init.call(this,param);//继承原型的方法
11     this.flag_standonground=0;//是否接触地面
12     this.keys={w:0,s:0,a:0,d:0,space:0,ctrl:0,shift:0};//按键是否保持按下，考虑到多客户端并行，那么势必每个player都有自己的keys！！
13     this.flag_runfast=1;//加快速度
14     this.name=param.name;
15     this.id=param.id;
16     this.p1=param.p1;
17     this.p2=param.p2;
18     this.p3=param.p3;
```
　　可以看到Player对象继承自sdyq.object对象，Player对象的原型是sdyq.object对象，在Player对象的init方法中，先初始化属于原型的属性，再初始化自己这个“类”新添加的属性。
　　sdyq.object对象的定义在Sdyq.js文件中：
```js
 1 //物体本身的属性和初始化
 2 sdyq={};//3D引擎
 3 sdyq.object=function()
 4 {//在地面上加速度运动的物体
 5 
 6 }
 7 sdyq.object.prototype.init = function(param)
 8 {
 9     this.keys={w:0,s:0,a:0,d:0,space:0,ctrl:0,shift:0};//按键是否保持按下
10     this.witha0={forward:0,left:0,up:-9.82};//非键盘控制产生的加速度
11     this.witha={forward:0,left:0,up:-9.82};//环境加速度，包括地面阻力和重力，现在还没有风力
12     this.witha2={forward:0,left:0,up:0};//键盘控制加速度与物体本身加速度和非键盘控制产生的加速度合并后的最终加速度
13     this.v0={forward:0,left:0,up:0};//上一时刻的速度
14     this.vt={forward:0,left:0,up:0};//下一时刻的速度
15     this.vm={forward:15,backwards:5,left:5,right:5,up:100,down:100};//各个方向的最大速度
16     //this.flag_song=0;//是否接触地面
17     this.flag_runfast=1;//加快速度
18     this.ry0=0;//上一时刻的y轴转角
19     this.ryt=0;//下一时刻的y轴转角
20     this.rychange=0;//y轴转角差
21     this.mchange={forward:0,left:0,up:0};//物体自身坐标系上的位移
22     this.vmove=new BABYLON.Vector3(0,0,0);//世界坐标系中每一时刻的位移和量
23     this.py0=0;//记录上一时刻的y轴位置，和下一时刻比较确定物体有没有继续向下运动！！
24 
25     param = param || {};
26     this.mesh=param.mesh;
27     this.mesh.scaling=param.scaling;
28     this.mesh.position=param.position;
29     this.mesh.rotation=param.rotation;
30     this.mesh.checkCollisions=param.checkCollisions;
31     this.mesh.ellipsoid=param.ellipsoid;
32     this.mesh.ellipsoidOffset=param.ellipsoidOffset;
33     this.meshname=this.mesh.name;
34     this.skeletonsPlayer=param.skeletonsPlayer||[];
35     this.submeshs=param.submeshs;
36     this.ry0=param.mesh.rotation.y;
37     this.py0=param.mesh.position.y;
38     this.countstop=0;//记录物体静止了几次，如果物体一直静止就停止发送运动信息
39 
40     this.PlayAnnimation = false;
41 
42     this.methodofmove=param.methodofmove||"";
43     switch(this.methodofmove)
44     {
45         case "controlwitha":
46         {
47             window.addEventListener("keydown", onKeyDown, false);//按键按下
48             window.addEventListener("keyup", onKeyUp, false);//按键抬起
49             break;
50         }
51         default :
52         {
53             break;
54         }
55     }
56 }
```
　　sdyq.object对象的初始化方法中包含了对mesh姿态的详细设定、对键盘操作的监听设定和适用于加速度运动的各项参数设定，各种加速度运动的物体都可以用sdyq.object对象来扩展产生。
　　在Player对象的初始化方法中还为每个玩家添加了id显示（头上的那个数字）：
```js
 1 //在玩家头上显示名字，clone时这个也会被clone过去，要处理一下！！！！
 2     var lab_texture=new BABYLON.Texture.CreateFromBase64String(texttoimg2(this.id),"datatexture"+this.id,scene);//使用canvas纹理！！
 3     var materialSphere1 = new BABYLON.StandardMaterial("texture1"+this.id, scene);
 4     materialSphere1.diffuseTexture = lab_texture;
 5     var plane = BABYLON.Mesh.CreatePlane("plane"+this.id, 2.0, scene, false, BABYLON.Mesh.FRONTSIDE);
 6     //You can also set the mesh side orientation with the values : BABYLON.Mesh.FRONTSIDE (default), BABYLON.Mesh.BACKSIDE or BABYLON.Mesh.DOUBLESIDE
 7     materialSphere1.diffuseTexture.hasAlpha = true;//应用纹理的透明度
 8 
 9     plane.position=new BABYLON.Vector3(0,75,0);//其父元素应用过0.05之缩放，故而这里位移量要*20
10     plane.rotation.y = Math.PI;
11     plane.scaling.x=20;
12     plane.scaling.y=4;
13     plane.parent=this.mesh;
14 
15     plane.material=materialSphere1;
16     this.lab=plane;
```
　　在这里使用了canvas现场产生纹理（术语叫“程序贴图”），其中texttoimg2（）方法的定义在utils.js文件中：
```js
 1 //把文字转变为图片jpeg
 2 function texttoimg(str)
 3 {
 4     var c=document.createElement("canvas");
 5     c.height=20;
 6     c.width=100;
 7     var context = c.getContext('2d');
 8     context.font="normal 15px sans-serif";
 9     context.clearRect(0, 0, canvas.width, canvas.height);
10     context.fillStyle="rgb(255,255,255)";
11     context.fillRect(0,0,canvas.width,canvas.height);
12     context.fillStyle = "rgb(0,0,0)";
13     context.textBaseline = 'top';
14     context.fillText(str,(c.width-str.length*15)/2,0, c.width*0.9);
15     var str_src=c.toDataURL("image/jpeg");
16     return str_src;
17     //return c;
18 }
19 //把文字转变为图片PNG
20 function texttoimg2(str)
21 {
22     var c=document.createElement("canvas");
23     c.height=20;
24     c.width=100;
25     var context = c.getContext('2d');
26     context.font="normal 20px sans-serif";
27     context.clearRect(0, 0, canvas.width, canvas.height);
28     //context.fillStyle="rgb(255,255,255)";
29     //context.fillRect(0,0,canvas.width,canvas.height);
30     context.fillStyle = "rgb(255,255,255)";
31     context.textBaseline = 'middle';//
32     context.fillText(str,(c.width-str.length*20)/2,10, c.width*0.9);
33     var str_src=c.toDataURL("image/png");
34     return str_src;
35     //return c;
36 }
```
　　该代码综合网上多个教程修改而来，其中生成jpeg的难点在于canvas默认生成四通道图像，而jpeg在去除透明度通道时会自动将透明度通道变成黑色，于是jpeg一片漆黑，解决方法是先画一个不透明的白色矩形背景，挡住所有透明通道，再在白色背景上画图。
　　在模型导入完毕后把Tom设为玩家列表对象arr_myplayers的一个属性，如果当前玩家处于在线状态，则还要把其加载状态同步给其他玩家，具体同步方式稍后介绍。
　　最后把玩家的相机定位到玩家模型的身后，做第三方跟随视角状。

## 三、加速度运动控制

在scene_link.js文件的中部可以看到scene.registerBeforeRender()方法，这个方法的作用是在每次渲染前调用作为它的参数的方法，我们通过这个方法在每次渲染前对物体的下一步运动情况进行计算：

```js
 1 scene.registerBeforeRender(function()
 2     {//每次渲染前
 3         if(scene.isReady() &amp;&amp; arr_myplayers)
 4         {//场景加载完毕
 5             if(sceneCharger == false) {
 6                 engine.hideLoadingUI();//隐藏载入ui
 7                 sceneCharger = true;
 8             }
 9             if(ms0==0)
10             {//最开始，等一帧
11                 ms0=new Date();//设置初始时间
12                 schange=0;//初始化时间差
13             }
14             else
15             {
16                 mst = new Date();//下一时刻
17                 schange = (mst - ms0) / 1000;
18                 ms0=mst;//时间越过
19                 //对于这段时间内的每一个物体
20                 for (var key in arr_myplayers)//该客户端所控制的物体
21                 {
22                     var obj = arr_myplayers[key];
23                     switch(obj.methodofmove)
24                     {
25                         case "controlwitha":
26                         {
27                             movewitha(obj);
28                             //这里加上dosend！！！！，原地不动也发送吗？
29                             if (state == "online")
30                             {
31                                 if(obj.vmove.x==0&amp;&amp;obj.vmove.y==0&amp;&amp;obj.vmove.z==0&amp;&amp;obj.rychange==0)
32                                 {//如果位置和姿态不变
33                                     if(obj.countstop>0)
34                                     {//一直静止则不发送运动信息
35 
36                                     }
37                                     else
38                                     {
39                                         obj.countstop+=1;
40                                         //当前位置，当前角度，当前移动，当前姿态变化
41                                         var arr = [];
42                                         arr.push("updatemesh");
43                                         arr.push(obj.mesh.position.x);
44                                         arr.push(obj.mesh.position.y);
45                                         arr.push(obj.mesh.position.z);
46                                         arr.push(obj.mesh.rotation.x);
47                                         arr.push(obj.mesh.rotation.y);
48                                         arr.push(obj.mesh.rotation.z);
49                                         arr.push(obj.vmove.x);
50                                         arr.push(obj.vmove.y);
51                                         arr.push(obj.vmove.z);
52                                         arr.push(obj.rychange);
53                                         doSend(arr.join("@"));
54                                     }
55                                 }
56                                 else
57                                 {
58                                     obj.countstop=0;
59                                     //当前位置，当前角度，当前移动，当前姿态变化
60                                     var arr = [];
61                                     arr.push("updatemesh");
62                                     arr.push(obj.mesh.position.x);
63                                     arr.push(obj.mesh.position.y);
64                                     arr.push(obj.mesh.position.z);
65                                     arr.push(obj.mesh.rotation.x);
66                                     arr.push(obj.mesh.rotation.y);
67                                     arr.push(obj.mesh.rotation.z);
68                                     arr.push(obj.vmove.x);
69                                     arr.push(obj.vmove.y);
70                                     arr.push(obj.vmove.z);
71                                     arr.push(obj.rychange);
72                                     doSend(arr.join("@"));
73                                 }
74                             }
75 
76                             if((obj.vmove.x!=0||obj.vmove.y!=0||obj.vmove.z!=0||obj.rychange!=0)&amp;&amp;obj.PlayAnnimation==false)
77                             {//如果开始运动，启动骨骼动画
78                                 obj.PlayAnnimation=true;
79                                 obj.beginSP(0);
80                             }
81                             else if(obj.vmove.x==0&amp;&amp;obj.vmove.y==0&amp;&amp;obj.vmove.z==0&amp;&amp;obj.rychange==0&amp;&amp;obj.PlayAnnimation==true)
82                             {//如果运动结束，关闭骨骼动画
83                                 obj.PlayAnnimation=false;
84                                 scene.stopAnimation(obj.skeletonsPlayer[0]);
85                             }
86                             break;
87                         }
88                         default :
89                         {
90                             break;
91                         }
92                     }
93                 }
94 。。。
```
　　这里的意思是说如果玩家列表里的玩家的运动方式(methodofmove)是"controlwitha"，则使用movewitha(obj)方法计算其在这一时间段中的运动，当然，如果编写出了其他的运动方法也可以类似的扩展进来。
　　movewitha(obj)方法定义在MoveWeb.js文件中：

### 1、初速度投影

```js
 1 function movewitha(obj)//地面上带有加速度的运动，必须站在地上才能加速，与宇宙空间中的喷气式加速度相比较
 2 {
 3     obj.ryt=obj.mesh.rotation.y;
 4     obj.rychange=parseFloat(obj.ryt - obj.ry0);
 5     obj.ry0=obj.ryt;
 6     //将上一时刻的速度投影到下一时刻的坐标里
 7     var v0t = {forward: 0, left: 0, up: 0};
 8     v0t.forward = obj.v0.forward * parseFloat(Math.cos(obj.rychange)) + (-obj.v0.left * parseFloat(Math.sin(obj.rychange)));
 9     v0t.left = (obj.v0.forward * parseFloat(Math.sin(obj.rychange))) + (obj.v0.left * parseFloat(Math.cos(obj.rychange)));
10     v0t.up = obj.v0.up;
11     obj.v0 = v0t;
```
　　物体在这一小段时间内可能绕y轴转过了一定角度，所以要把物体在上一时刻的自身坐标系速度投影到经过变化之后的自身坐标系中。

### 2、计算水平加速度，与水平位移

```js
 1 //计算水平加速度
 2     if(obj.flag_standonground==1)//在地面上才能使用水平加速度
 3     {
 4         //移动速度产生的阻力，只考虑地面阻力，不考虑空气阻力
 5         if (obj.v0.forward == 0) {
 6             obj.witha.forward = 0;
 7         }
 8         else if (obj.v0.forward > 0) {
 9             obj.witha.forward = -0.5;
10         }
11         else {
12             obj.witha.forward = 0.5;
13         }
14         if (obj.v0.left == 0) {
15             obj.witha.left = 0;
16         }
17         else if (obj.v0.left > 0) {
18             obj.witha.left = -0.5;
19         }
20         else {
21             obj.witha.left = 0.5;
22         }
23         //最终加速度由环境加速度和物体自身加速度叠加而成
24         obj.witha2.forward = obj.witha.forward+obj.witha0.forward;
25         obj.witha2.left = obj.witha.left+obj.witha0.left;
26         //根据键盘操作设置加速度
27         //处理前后
28         if (obj.keys.w != 0) {
29             obj.witha2.forward += 5;
30         }
31         else if (obj.keys.s != 0) {
32             obj.witha2.forward -= 2;
33         }
34         //处理左右
35         if (obj.keys.a != 0 &amp;&amp; obj.keys.d != 0) {//同时按下左右键则什么也不做
36 
37         }
38         else if (obj.keys.a != 0) {
39             obj.witha2.left += 2;
40         }
41         else if (obj.keys.d != 0) {
42             obj.witha2.left -= 2;
43         }
44     }
45     else
46     {
47         obj.witha2.forward=0;
48         obj.witha2.left=0;
49     }
50     //根据水平加速度计算水平运动
51     if(obj.witha2.forward!=0)
52     {
53         obj.vt.forward = obj.v0.forward + obj.witha2.forward * schange;//速度变化
54         if((0 < obj.vt.forward &amp;&amp; obj.vt.forward < obj.vm.forward) || (0 > obj.vt.forward &amp;&amp; obj.vt.forward > -obj.vm.backwards))
55         {//在最大速度范围内
56             obj.mchange.forward = obj.witha2.forward * schange * schange + obj.v0.forward * schange;//加速度产生的距离变化
57         }
58         else if (obj.vm.forward <= obj.vt.forward) {//超出最大速度则按最大速度算
59             obj.vt.forward = obj.vm.forward;
60             obj.mchange.forward = obj.vt.forward * schange;
61         }
62         else if (-obj.vm.backwards >= obj.vt.forward) {
63             obj.vt.forward = -obj.vm.backwards;
64             obj.mchange.forward = obj.vt.forward * schange;
65         }
66     }
67     else {//无加速度时匀速运动
68         obj.mchange.forward = obj.v0.forward * schange;
69     }
70     if(obj.witha2.left!=0)
71     {
72         obj.vt.left = obj.v0.left + obj.witha2.left * schange;//速度变化
73         if((0 < obj.vt.left &amp;&amp; obj.vt.left < obj.vm.left) || (0 > obj.vt.left &amp;&amp; obj.vt.left > -obj.vm.right))
74         {//在最大速度范围内
75             obj.mchange.left = obj.witha2.left * schange * schange + obj.v0.left * schange;//加速度产生的距离变化
76         }
77         else if (obj.vm.left <= obj.vt.left) {
78             obj.vt.left = obj.vm.left;
79             obj.mchange.left = obj.vt.left * schange;
80         }
81         else if (-obj.vm.right >= obj.vt.left) {
82             obj.vt.left = -obj.vm.right;
83             obj.mchange.left = obj.vt.left * schange;
84         }
85     }
86     else {
87         obj.mchange.left = obj.v0.left * schange;
88     }
```
### 3、计算垂直加速度、垂直位移：

```js
 1 //垂直加速度单独计算
 2 
 3     //正在下落，但没有下落应有的距离
 4     if(obj.v0.up<0&amp;&amp;obj.flag_standonground==0&amp;&amp;((obj.py0-obj.mesh.position.y)<(-obj.mchange.up)/5))
 5     {
 6         obj.v0.up=0;
 7         obj.flag_standonground=1;//表示接触地面
 8         obj.witha.up=-0.5;//考虑到下坡的存在，还要有一点向下的分量，使其能够沿地面向下但又不至于抖动过于剧烈
 9         obj.vm.up=5;
10         obj.vm.down=5;
11     }
12     else if(obj.flag_standonground==1&amp;&amp;((obj.py0-obj.mesh.position.y)>(-obj.mchange.up)/5))//遇到了一个坑
13     {
14         obj.flag_standonground=0;
15         obj.witha.up=-9.82;
16         obj.vm.up=100;
17         obj.vm.down=100;
18     }
19     obj.witha2.up = obj.witha.up;
20     if (obj.witha2.up != 0&amp;&amp;(obj.flag_standonground==0||(obj.flag_standonground==1&amp;&amp;(obj.mchange.left!=0||obj.mchange.forward!=0)))) {//不在地面或者有水平位移才考虑上下加速移动
21 
22         obj.vt.up = obj.v0.up + obj.witha2.up * schange;//速度变化
23         if ((0 < obj.vt.up &amp;&amp; obj.vt.up < obj.vm.up) || (0 > obj.vt.up &amp;&amp; obj.vt.up > -obj.vm.down)) {
24             obj.mchange.up = obj.witha2.up * schange * schange + obj.v0.up * schange;//加速度产生的距离变化
25         }
26         else if (obj.vm.up <= obj.vt.up) {
27             obj.vt.up = obj.vm.up;
28             obj.mchange.up = obj.vt.up * schange;
29         }
30         else if (-obj.vm.down >= obj.vt.up) {
31             obj.vt.up = -obj.vm.down;
32             obj.mchange.up = obj.vt.up * schange;
33         }
34     }
35     else {
36         obj.mchange.up = obj.v0.up * schange;
37     }
```
　　Babylon初级教程中提供了两种现成的碰撞检测方法，其中一种能够较精确的检测到物体掉落在地面上，但不支持事件响应或者回调函数；另一种支持事件响应，但物体的碰撞检测边界太过粗糙，无法精确检测碰撞。所以我只好用“有没有在该方向上移动应有的距离”来暂时代替碰撞检测。

### 4、应用位移：

```js
 1 //旧的当前速度没用了，更新当前速度
 2     obj.v0.forward = obj.vt.forward;
 3     obj.v0.left = obj.vt.left;
 4     obj.v0.up = obj.vt.up;
 5     //取消过于微小的速度和位移
 6     if (obj.v0.forward < 0.002 &amp;&amp; obj.v0.forward > -0.002) {
 7         obj.v0.forward = 0;
 8         obj.mchange.forward=0;
 9     }
10     if (obj.v0.left < 0.002 &amp;&amp; obj.v0.left > -0.002) {
11         obj.v0.left = 0;
12         obj.mchange.left=0;
13     }
14     if (obj.v0.up < 0.002 &amp;&amp; obj.v0.up > -0.002) {
15         obj.v0.up = 0;
16         obj.mchange.up=0;
17     }
18     if(obj.mchange.forward<0.002&amp;&amp; obj.mchange.forward > -0.002)
19     {
20         obj.mchange.forward=0;
21     }
22     if(obj.mchange.left<0.002&amp;&amp; obj.mchange.left > -0.002)
23     {
24         obj.mchange.left=0;
25     }
26     if(obj.mchange.up<0.002&amp;&amp; obj.mchange.up > -0.002)
27     {
28         obj.mchange.up=0;
29     }
30     //实施移动，未来要考虑把这个实施移动传递给远方客户端
31         obj.py0=obj.mesh.position.y;
32         var vectir1=(new BABYLON.Vector3(parseFloat(Math.sin(parseFloat(obj.mesh.rotation.y))) * obj.mchange.forward * obj.flag_runfast,
33             0, parseFloat(Math.cos(parseFloat(obj.mesh.rotation.y))) * obj.mchange.forward * obj.flag_runfast)).negate();
34         var vectir2=new BABYLON.Vector3(-parseFloat(Math.cos(parseFloat(obj.mesh.rotation.y))) * obj.mchange.left * obj.flag_runfast,
35             0, parseFloat(Math.sin(parseFloat(obj.mesh.rotation.y))) * obj.mchange.left * obj.flag_runfast).negate();
36         var vectir3=new BABYLON.Vector3(0, obj.mchange.up * obj.flag_runfast, 0);
37         obj.vmove = vectir1.add(vectir2).add(vectir3);
38 
39         if((obj.vmove.x!=0||obj.vmove.y!=0||obj.vmove.z!=0))
40         {
41             obj.mesh.moveWithCollisions(obj.vmove);//似乎同一时刻只有一个物体能够使用这个方法！！
42             
43         }
```
　　这里把物体坐标系位移向世界坐标系位移投影的方法参考了Babylon教程示例。这里有一个思维上的难点：对于一个物体来说“模型的正向”、“mesh的正向”和“骨骼动画的正向”可能不是一个方向！这是模型绘制者使用3D模型绘制工具时的习惯造成的，如果有条件的话可以在使用3D模型前用绘制工具把模型调整一下。

## 四、数据发送：

### 1、Java后台的Websocket代码：

```java
  1 import java.io.IOException;
  2 import java.util.Date;
  3 import java.util.concurrent.CopyOnWriteArraySet;
  4 
  5 import javax.websocket.OnClose;
  6 import javax.websocket.OnError;
  7 import javax.websocket.OnMessage;
  8 import javax.websocket.OnOpen;
  9 import javax.websocket.Session;
 10 import javax.websocket.server.ServerEndpoint;
 11 
 12 @ServerEndpoint("/websocket3")
 13 public class Practice {
 14     private static int onlineCount = 0;
 15     private static CopyOnWriteArraySet<Practice> webSocketSet = new CopyOnWriteArraySet<Practice>();
 16     private static String admin="";
 17     private Session session;
 18     private String name="";
 19     private String id="";
 20     @OnOpen
 21     public void onOpen(Session session)
 22     {
 23         this.session = session;
 24         webSocketSet.add(this);     //加入set中
 25         addOnlineCount();           //在线数加1
 26         //System.out.println("有新连接加入！当前在线人数为" + getOnlineCount());
 27         try 
 28         {
 29             this.sendMessage("@id:"+this.session.getId());//这个id是按总连接数来算的，可以避免重复
 30             this.id=this.session.getId();
 31         } catch (IOException e) {
 32             e.printStackTrace();
 33         }
 34         for(Practice item: webSocketSet)
 35         {   
 36             if(!item.id.equals(this.id))
 37             {
 38                 try {
 39                     item.sendMessage("[getonl]"+this.id);
 40                 } catch (IOException e) {
 41                     e.printStackTrace();
 42                     continue;
 43                 }
 44             }
 45         }
 46     }
 47     @OnClose
 48     public void onClose()
 49     {
 50         for(Practice item: webSocketSet)
 51         {   
 52             if(!item.id.equals(this.id))
 53             {
 54                 try {
 55                     item.sendMessage("[getoff]"+this.id);
 56                 } catch (IOException e) {
 57                     e.printStackTrace();
 58                     continue;
 59                 }
 60             }
 61         }
 62         if(this.id.equals(Practice.admin))//如果是admin下线了
 63         {
 64             webSocketSet.remove(this);  //从set中删除
 65             subOnlineCount();           //在线数减1
 66             if(webSocketSet.size()>0)
 67             {
 68                 int i=0;
 69                 for(Practice item: webSocketSet)
 70                 { //挑选剩余队列中的下一个玩家作为admin
 71                     if(i==0)
 72                     {
 73                         i++;
 74                         item.name="admin";
 75                         Practice.admin=item.id;
 76                         try {
 77                             item.sendMessage("@name:admin");//任命
 78                         } catch (IOException e) {
 79                             e.printStackTrace();
 80                         }
 81                     }
 82                     
 83                 }
 84             }
 85             else
 86             {
 87                 Practice.admin="";//可能所有用户都下线了，但这个服务还在
 88             }
 89         }
 90         else
 91         {
 92             webSocketSet.remove(this);  //从set中删除
 93             subOnlineCount();           //在线数减1
 94         }
 95         
 96         //System.out.println("有一连接关闭！当前在线人数为" + getOnlineCount());
 97     }
 98     @OnMessage
 99     public void onMessage(String message, Session session) 
100     {
101         //System.out.println("来自客户端的消息:" + message);
102         if((message.length()>6)&amp;&amp;(message.substring(0,6).equals("@name:")))//这个是命名信息//如果message不足6竟然会报错！！
103         {
104             String str_name=message.split(":")[1];    
105             if(str_name.equals("admin"))//如果这个玩家的角色是admin
106             {
107                 if(Practice.admin.equals(""))
108                 {//如果还没有admin
109                     this.name=str_name;
110                     Practice.admin=this.id;
111                     try {
112                         this.sendMessage("@name:admin");//任命
113                     } catch (IOException e) {
114                         e.printStackTrace();
115                     }
116                 }
117                 else
118                 {//如果已经有了admin
119                     this.name=this.id;
120                     try {
121                         this.sendMessage("@name:"+this.session.getId());
122                     } catch (IOException e) {
123                         e.printStackTrace();
124                     }
125                 }
126             }
127         }
128         else if((message.length()>6)&amp;&amp;(message.substring(0,7).equals("privat:")))
129         {//私聊信息
130             for(Practice item: webSocketSet)
131             { 
132                 if(item.id.equals(message.split("#")[0].split(":")[1]))
133                 {
134                     try {
135                         item.sendMessage(this.id+"@"+message.split("#")[1]);
136                     } catch (IOException e) {
137                         e.printStackTrace();
138                         continue;
139                     }
140                     break;
141                 }
142             }            
143         }
144         else if((message.length()>6)&amp;&amp;(message.substring(0,8).equals("[admins]"))&amp;&amp;this.name.equals("admin"))
145         {//由adminserver向其他server广播的信息
146             for(Practice item: webSocketSet)
147             {   
148                 if(!item.id.equals(this.id))
149                 {
150                     try {
151                         item.sendMessage(message);
152                     } catch (IOException e) {
153                         e.printStackTrace();
154                         continue;
155                     }
156                 }
157             }            
158         }
159         else
160         {
161             //广播信息，不发给自己
162             for(Practice item: webSocketSet)
163             {   
164                 if(!item.id.equals(this.id))
165                 {
166                     try {
167                         item.sendMessage(this.id+"@"+message);
168                     } catch (IOException e) {
169                         e.printStackTrace();
170                         continue;
171                     }
172                 }
173             }
174         }               
175     }
176     @OnError
177     public void onError(Session session, Throwable error){
178         System.out.println("发生错误，关闭连接");
179         for(Practice item: webSocketSet)
180         {   
181             if(!item.id.equals(this.id))
182             {
183                 try {
184                     item.sendMessage("[geterr]"+this.id);
185                 } catch (IOException e) {
186                     e.printStackTrace();
187                     continue;
188                 }
189             }
190         }
191         if(this.id.equals(Practice.admin))//如果是admin下线了
192         {
193             webSocketSet.remove(this);  //从set中删除
194             subOnlineCount();           //在线数减1
195             if(webSocketSet.size()>0)
196             {
197                 int i=0;
198                 for(Practice item: webSocketSet)
199                 { //挑选剩余队列中的下一个玩家作为admin
200                     if(i==0)
201                     {
202                         i++;
203                         item.name="admin";
204                         Practice.admin=item.id;
205                     }
206                     try {
207                         item.sendMessage("@name:admin");//任命
208                     } catch (IOException e) {
209                         e.printStackTrace();
210                     }
211                 }
212             }
213             else
214             {
215                 Practice.admin="";//可能所有用户都下线了，但这个服务还在
216             }
217         }
218         else
219         {
220             webSocketSet.remove(this);  //从set中删除
221             subOnlineCount();           //在线数减1
222         }
223         //webSocketSet.remove(this);
224         //subOnlineCount(); 
225         error.printStackTrace();
226     }
227     public synchronized void sendMessage(String message) throws IOException{//此为同步阻塞的发送方式（单发）
228         this.session.getBasicRemote().sendText(message);
229         Date dt=new Date();
230         //System.out.println(dt.getTime()+"==>>"+message);
231         //this.session.getAsyncRemote().sendText(message);
232     }
233     public void sendMessage2(String message) throws IOException{//此为异步非阻塞的发送方式（单发）
234         this.session.getAsyncRemote ().sendText(message);
235         Date dt=new Date();
236         //System.out.println(dt.getTime()+"==>>"+message);
237         //this.session.getAsyncRemote().sendText(message);
238     }
239     
240     public static synchronized int getOnlineCount() {
241         return onlineCount;
242     }
243     public static synchronized void addOnlineCount() {
244         Practice.onlineCount++;
245     }
246     public static synchronized void subOnlineCount() {
247         Practice.onlineCount--;
248     }
249 }
```
　　这个方法参考网上的一篇WebSocket教程编写而成，其大意是为每个上线的用户分配id，并把第一个自称是admin的用户设为主机，在主机用户下线后再任命另一个用户为主机。在数据同步方面提供“私聊”、“admin广播”、“普通广播”三种方式。在传输数据时遇到多个异步传输需求对this.session.getAsyncRemote ()争抢导致报错的问题，经过试验使用同步模式的sendMessage方法可以避免这一错误，至于用户量提升后同步方法能否提供足够的传输效率还要进一步研究。

### 2、前台的WebSocket代码位于WebSocket.js中：

```js
  1 var wsUri="";
  2 var websocket;
  3 var id="";//这个是sessionid！！
  4 
  5 //建立连接
  6 function Connect()
  7 {//
  8     var location = (window.location+'').split('/');
  9     var IP=location[2];
 10     //wsUri="ws://"+IP+"/JUMP/websocket3";
 11     wsUri="ws://"+$("#str_ip")[0].value+":8081/PRACTICE/websocket3";
 12     try
 13     {
 14         websocket = new WebSocket(wsUri);//建立ws连接
 15         $("#str_ip")[0].disabled=true;
 16         $("#str_name")[0].disabled=true;
 17         username=$("#str_name")[0].value;
 18         $("#btn_create")[0].disabled=false;
 19 
 20         websocket.onopen = function(evt) //连接建立完毕
 21         {
 22             onOpen(evt)
 23         };
 24         websocket.onmessage = function(evt) {//收到服务器发来的信息
 25             onMessage(evt)
 26         };
 27         websocket.onclose = function(evt) {
 28             onClose(evt)
 29         };
 30         websocket.onerror = function(evt) {
 31             onError(evt)
 32         };
 33     }
 34     catch(e)
 35     {
 36         alert(e);
 37         $("#str_ip")[0].disabled=false;
 38         $("#str_name")[0].disabled=false;
 39     }
 40 }
 41 //连接建立完成的回调函数
 42 function onOpen(evt) {
 43     state="online";
 44     doSend("@name:"+$("#str_name")[0].value);//连接建立后把浏览器端的用户信息传过去
 45 }
 46 //关闭连接
 47 function Close()
 48 {
 49     websocket.close();//浏览器端关闭连接
 50 
 51 }
 52 function onClose(evt) {
 53     writeToScreen('<span style="color: red;">本机连接关闭</span>');
 54     $("#str_ip")[0].disabled=false;
 55     $("#str_name")[0].disabled=false;
 56     state="offline";
 57 }
 58 //收到服务器端发来的消息
 59 function onMessage(evt) {
 60     var str_data=evt.data;
 61     if(str_data.substr(0,4)=="@id:")//从服务端返回了sessionid
 62     {
 63         id=str_data.split(":")[1];
 64         $("#str_id")[0].innerHTML=id;
 65     }
 66     else if(str_data.substr(0,6)=="@name:")//从服务端返回了任命信息
 67     {
 68         username=str_data.split(":")[1];
 69         if(username=="admin")
 70         {
 71             $("#str_name")[0].value=username;
 72             writeToScreen('<span style="color: blue;">本机被任命为admin</span>');
 73         }
 74         else
 75         {
 76             $("#str_name")[0].value=username;
 77             writeToScreen('<span style="color: blue;">已存在admin，本机被重命名为'+username+'</span>');
 78         }
 79     }
 80 。。。
 81     
 82 //发生错误
 83 function onError(evt) {
 84     writeToScreen('<span style="color: red;">ERROR:</span> '+ evt.data);
 85     $("#str_ip")[0].disabled=false;
 86     $("#str_name")[0].disabled=false;
 87     state="offline";
 88 }
 89 //发送命令行信息
 90 function Send()
 91 {
 92     doSend($("#str_message")[0].value);
 93 }
 94 //向服务端发送信息
 95 function doSend(message)
 96 {
 97     websocket.send(message);
 98 }
 99 //写入操作日志
100 function writeToScreen(message)
101 {
102     var pre = document.createElement("p");
103     pre.style.wordWrap = "break-word";
104     pre.innerHTML = MakeDateStr()+"->"+message;
105     str_log.appendChild(pre);
106 }
```
　　参考网上教程编写的常规WebSocket通信代码

### 3、建立一些“NPC物体”，也要对他们的状态进行同步

NPC物体的建立代码在scene_link.js文件的110行：
![picture](http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif)
![picture](http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif)

```js
 1 //一次引入十个物体
 2     BABYLON.SceneLoader.ImportMesh("Rabbit", "../MODEL/Rabbit/", "Rabbit.babylon", scene, function (newMeshes, particleSystems, skeletons)
 3     {
 4 
 5         var rabbitmesh = newMeshes[1];
 6         //shadowGenerator.getShadowMap().renderList.push(rabbitmesh);//加入阴影渲染队列
 7         var rabbit=new Animal;
 8         var obj_p={
 9             mesh:rabbitmesh,
10             scaling:new BABYLON.Vector3(0.04, 0.04, 0.04),//缩放
11             position:new BABYLON.Vector3(Math.random()*100, 30, Math.random()*100),//位置
12             rotation:new BABYLON.Vector3(0, Math.random()*6.28, 0),// 旋转
13             //rotation:new BABYLON.Vector3(0, 0, 0),
14             checkCollisions:true,//使用默认的碰撞检测
15             ellipsoid:new BABYLON.Vector3(1, 1, 1),//碰撞检测椭球
16             ellipsoidOffset:new BABYLON.Vector3(0, 0, 0),//碰撞检测椭球位移
17             fieldofvision:50,//视野
18             powerofmove:1,//移动力量
19             methodofmove:"controlwitha",
20             state:"eat",
21             id:"rabbit"
22         };
23         rabbit.init(obj_p);
24         arr_animals["rabbit"]=rabbit;
25         scene.beginAnimation(rabbitmesh.skeleton, 0, 72, true, 0.8);
26         console.log("rabbit");
27 
28         for(i=0;i<9;i++)
29         {
30             var rabbitmesh2 = rabbitmesh.clone("rabbit2"+(i+2));
31             rabbitmesh2.skeleton = rabbitmesh.skeleton.clone("clonedSkeleton");
32             var rabbit2=new Animal;
33             var obj_p2={
34                 mesh:rabbitmesh2,
35                 scaling:new BABYLON.Vector3(0.04, 0.04, 0.04),//缩放
36                 position:new BABYLON.Vector3(Math.random()*100, 30, Math.random()*100),//位置
37                 rotation:new BABYLON.Vector3(0, Math.random()*6.28, 0),// 旋转
38                 //rotation:new BABYLON.Vector3(0, 0, 0),// 旋转
39                 checkCollisions:true,//使用默认的碰撞检测
40                 ellipsoid:new BABYLON.Vector3(1, 1, 1),//碰撞检测椭球
41                 ellipsoidOffset:new BABYLON.Vector3(0, 0, 0),//碰撞检测椭球位移
42                 fieldofvision:50,//视野
43                 powerofmove:1,//移动力量
44                 methodofmove:"controlwitha",
45                 state:"eat",
46                 id:"rabbit"+(i+2)
47             };
48             rabbit2.init(obj_p2);
49             arr_animals["rabbit"+(i+2)]=rabbit2;
50             scene.beginAnimation(rabbitmesh2.skeleton, 0, 72, true, 0.8);
51             console.log("rabbit"+(i+2));
52             //shadowGenerator.getShadowMap().renderList.push(rabbitmesh2);//报错
53         }
54 
55     });
```
View Code　　这里建立了十个物体，其中只有第一个物体的骨骼模型是从模型文件中导入内存的，其他的物体都在内存中从第一个物体“克隆”而来。注意，在Babylon看来骨骼也是一种特殊的网格（Mesh），所以对网格和骨骼的克隆是分别进行的，再把骨骼克隆的结果作为网格克隆结果的骨骼属性。
　　十个物体被初始化为Animal对象，Animal对象与Player对象类似，都是从sdyq.object对象派生而来。
NPC物体的运动控制和运动同步代码在317行：
```js
 1 if(username=="admin")//由主机对所有NPC物体的相互作用进行计算，再把作用结果同步到各个分机
 2                 {
 3                     //计算每个动物和所有玩家的交互效果
 4                     var arr_rabbitmove=[];
 5                     for(var key in arr_animals)
 6                     {
 7                         var rabbit=arr_animals[key];
 8                         var v_face=new BABYLON.Vector3(0,0,0);
 9                         var newstate="eat";
10                         for(var key2 in arr_myplayers)
11                         {
12                             var obj=arr_myplayers[key2];
13                             var v_sub=rabbit.mesh.position.subtract(obj.mesh.position);
14                             var distans=v_sub.length();//兔子与人类之间的距离
15                             if(distans<rabbit.fieldofvision)//在视野内发现了人类
16                             {
17                                 newstate="run";
18                                 v_face.addInPlace(v_sub.normalize().scaleInPlace(1/distans));//越近则影响越大
19                             }
20                         }
21                         for(var key2 in arr_webplayers)
22                         {
23                             var obj=arr_webplayers[key2];
24                             var v_sub=rabbit.mesh.position.subtract(obj.mesh.position);
25                             var distans=v_sub.length();
26                             if(distans<rabbit.fieldofvision)//在视野内发现了人类
27                             {
28                                 newstate="run";
29                                 v_face.addInPlace(v_sub.normalize().scaleInPlace(1/distans));
30                             }
31                         }
32                         if(newstate=="run"&amp;&amp;rabbit.state=="eat")
33                         {//从eat状态变为run状态
34                             rabbit.state="run";
35                             rabbit.powerofmove=3;
36                             scene.beginAnimation(rabbit.mesh.skeleton, 0, 72, true, 2.4);
37                         }
38                         else if(newstate=="eat"&amp;&amp;rabbit.state=="run")
39                         {//从run状态变为eat状态
40                             rabbit.state="eat";
41                             rabbit.powerofmove=1;
42                             scene.beginAnimation(rabbit.mesh.skeleton, 0, 72, true, 0.8);
43                         }
44 
45                         var num_pi=Math.PI;
46                         if(rabbit.state=="eat")//一直没有见到人类
47                         {
48                             rabbit.waitforturn+=schange;
49                             if(rabbit.waitforturn>3)
50                             {//每3秒随机决定一个运动方向
51                                 rabbit.waitforturn=0;
52                                 rabbit.witha0={forward:(Math.random()-0.5)*2*rabbit.powerofmove,up:0,left:(Math.random()-0.5)*2*rabbit.powerofmove};
53                                 rabbit.mesh.rotation.y=Math.random()*6.28;
54                             }
55                             movewitha(rabbit);
56                             //这些兔子的数据汇总起来一起传
57                             arr_rabbitmove.push([key,rabbit.mesh.position,rabbit.mesh.rotation,rabbit.vmove,rabbit.rychange,rabbit.state]);
58                         }
59                         else if(rabbit.state=="run")
60                         {//奔跑远离人类
61                             rabbit.witha0={forward:-rabbit.powerofmove,up:0,left:0};//这个是兔子的“自主加速度”！！不是世界加速度，也不是键盘控制产生的加速度
62                             rabbit.mesh.rotation.y=(Math.atan(v_face.z/v_face.x)+num_pi*1/2);
63                             movewitha(rabbit);
64                             arr_rabbitmove.push([key,rabbit.mesh.position,rabbit.mesh.rotation,rabbit.vmove,rabbit.rychange,rabbit.state]);
65                         }
66                     }
67                     var str_data="[admins]"+JSON.stringify(arr_rabbitmove);
68                     doSend(str_data);
69                 }
```
　　在这个模式中，由主机承担所有的NPC物体运动计算工作，再把所有计算结果同步到分机，&nbsp;
　　起初对于不太复杂的玩家信息数据，我简单的用分隔符“@”将各个字段拼接成一个字符串向其他客户端传递，后来随着数据结构的复杂化，我改用JSON传递结构化的数据。

### 4、客户端对服务器端传来的信息进行处理：

#### a、添加新玩家，代码位于WebSocket.js184行：

```js
  1 case "addnewplayer":
  2                     {//感知到加入了一个新的玩家，把新玩家加入到自己的场景里,先查询场景中是否已经有同名的mesh，如果有则使用clone方法同步加载，如果没有再使用import异步导入，这样做的根本原因在于import方法导入模型的返回函数里无法自定义参数
  3                         var dt=new Date();
  4                         console.log(dt.getTime()+"get addnewplayer"+arr[0]);
  5                         var flag=0;//加载完成标志
  6                         for(var key in arr_myplayers)//先在本机的玩家列表里找
  7                         {
  8                             if(arr_myplayers[key].meshname==arr[14])//如果与主控物体的meshname相同
  9                             {
 10 
 11                                 var obj_key=arr_myplayers[key];
 12                                 arr_webplayers[arr[0]] = MyCloneplayer(obj_key,arr);
 13                                 shadowGenerator.getShadowMap().renderList.push(arr_webplayers[arr[0]].mesh);//阴影生成器似乎对含有submesh的Mesh不起作用
 14                                 writeToScreen('<span style="color: blue;">addnewplayer: ' + arr[0] + '</span>');
 15                                 flag=1;
 16 
 17                                 //异步加入新玩家之后，还要把自己的信息发给新玩家，让新玩家添加自己（私聊）
 18                                 addoldplayer(arr[0]);
 19                                 break;
 20                             }
 21                         }
 22                         if(flag==0)//再在网络玩家列表里查找
 23                         {
 24                             for(var key in arr_webplayers)
 25                             {
 26                                 if(arr_webplayers[key].meshname==arr[14])//如果与主控物体的meshname相同
 27                                 {
 28                                     var obj_key=arr_webplayers[key];
 29                                     arr_webplayers[arr[0]] = MyCloneplayer(obj_key,arr);
 30                                     shadowGenerator.getShadowMap().renderList.push(arr_webplayers[arr[0]].mesh);
 31                                     writeToScreen('<span style="color: blue;">addnewplayer: ' + arr[0] + '</span>');
 32                                     flag=1;
 33                                     //异步加入新玩家之后，还要把自己的信息发给新玩家，让新玩家添加自己（私聊）
 34                                     addoldplayer(arr[0]);
 35                                     break;
 36                                 }
 37                             }
 38                         }
 39                         if(flag==0)//都没找着，就新建
 40                         {
 41                             //arr[14]保存着meshname可以作为异步方法间的纽带,如果发生同时加载两个一样的不存在的mesh时，让后来的那个通过websocket延时重发
 42                             if(tempobj[arr[14]]&amp;&amp;tempobj[arr[14]]!="OK")//这个暂存位正在被占用
 43                             {
 44                                 doSend("privat:" + id + "#" + str_data);//请求websocket服务器再次把这个指令发给自己，以等待占用者完成操作
 45                             }
 46                             else
 47                             {
 48                                 tempobj[arr[14]] = arr;//用tempobj暂存该物体的初始化参数
 49                                 BABYLON.SceneLoader.ImportMesh(arr[11], arr[12], arr[13], scene, function (newMeshes, particleSystems, skeletons) {//载入完成的回调函数
 50                                     var Tom = new Player;
 51                                     var obj_p = {};
 52                                     obj_p.mesh = newMeshes[0];//网格数据
 53                                     var arr = tempobj[obj_p.mesh.name];
 54                                     obj_p.scaling = new BABYLON.Vector3(parseFloat(arr[2]), parseFloat(arr[3]), parseFloat(arr[4]));//缩放
 55                                     obj_p.position = new BABYLON.Vector3(parseFloat(arr[5]), parseFloat(arr[6]), parseFloat(arr[7]));//位置
 56                                     obj_p.rotation = new BABYLON.Vector3(parseFloat(arr[8]), parseFloat(arr[9]), parseFloat(arr[10]));// 旋转
 57                                     obj_p.checkCollisions = true;//使用默认的碰撞检测
 58                                     obj_p.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);//碰撞检测椭球
 59                                     obj_p.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);//碰撞检测椭球位移
 60                                     obj_p.skeletonsPlayer = skeletons;
 61                                     obj_p.methodofmove = "controlwitha";
 62                                     obj_p.id = arr[0];
 63                                     obj_p.name = arr[0];
 64                                     obj_p.p1 = arr[11];
 65                                     obj_p.p2 = arr[12];
 66                                     obj_p.p3 = arr[13];
 67                                     var len=newMeshes.length;//对于复杂的模型来说newMeshes的其他部分也必须保存下来
 68                                     var arr=[];
 69                                     for(var i=1;i<len;i++)
 70                                     {
 71                                         arr.push(newMeshes[i]);
 72                                     }
 73                                     obj_p.submeshs=arr;
 74                                     Tom.init(
 75                                         obj_p
 76                                     );
 77                                     tempobj[obj_p.mesh.name] = "OK";
 78                                     arr_webplayers[arr[0]] = Tom;
 79                                     shadowGenerator.getShadowMap().renderList.push(arr_webplayers[arr[0]].mesh);
 80 
 81                                     writeToScreen('<span style="color: blue;">addnewplayer: ' + arr[0] + '</span>');
 82                                     flag=1;
 83                                     //异步加入新玩家之后，还要把自己的信息发给新玩家，让新玩家添加自己（私聊）
 84                                     addoldplayer(arr[0]);
 85 
 86                                 });
 87                             }
 88                         }
 89                         break;
 90                     }
 91 
 92                     case "addoldplayer":
 93                     {//添加一个前辈玩家，此时默认前辈的网络玩家列表里已经有了本元素，所以不需要再通知前辈玩家添加本玩家，多个前辈玩家同时返回如何处理？用出入栈方式？能保证先进先出？
 94                         var dt=new Date();
 95                         console.log(dt.getTime()+"get addoldplayer"+arr[0]);
 96                         var flag=0;
 97                         for(var key in arr_myplayers)
 98                         {
 99                             if(arr_myplayers[key].meshname==arr[14])//如果与主控物体的meshname相同
100                             {
101                                 var obj_key=arr_myplayers[key];
102                                 arr_webplayers[arr[0]] =MyCloneplayer(obj_key,arr);
103                                 shadowGenerator.getShadowMap().renderList.push(arr_webplayers[arr[0]].mesh);
104                                 writeToScreen('<span style="color: blue;">addoldplayer: ' + arr[0] + '</span>');
105                                 flag=1;
106 
107                                 break;
108                             }
109                         }
110                         if(flag==0)//再在网络元素里查找
111                         {
112                             for(var key in arr_webplayers)
113                             {
114                                 if(arr_webplayers[key].meshname==arr[14])//如果与主控物体的meshname相同
115                                 {
116                                     var obj_key=arr_webplayers[key];
117                                     arr_webplayers[arr[0]] =  MyCloneplayer(obj_key,arr);
118                                     shadowGenerator.getShadowMap().renderList.push(arr_webplayers[arr[0]].mesh);
119                                     writeToScreen('<span style="color: blue;">addoldplayer: ' + arr[0] + '</span>');
120                                     flag=1;
121                                     break;
122                                 }
123                             }
124                         }
125                         if(flag==0)//都没找着，就新建
126                         {
127                             //arr[14]保存着meshname可以作为异步方法间的纽带,如果发生同时加载两个一样的不存在的mesh时，让后来的那个通过websocket延时重发
128                             if(tempobj[arr[14]]&amp;&amp;tempobj[arr[14]]!="OK")//这个暂存位正在被占用
129                             {
130                                 doSend("privat:" + id + "#" + str_data);//请求websocket服务器再次把这个指令发给自己，以等待占用者完成操作
131                             }
132                             else
133                             {
134                                 tempobj[arr[14]] = arr;
135                                 BABYLON.SceneLoader.ImportMesh(arr[11], arr[12], arr[13], scene, function (newMeshes, particleSystems, skeletons) {//载入完成的回调函数
136                                     var Tom = new Player;
137                                     var obj_p = {};
138                                     obj_p.mesh = newMeshes[0];//网格数据
139                                     var arr = tempobj[obj_p.mesh.name];
140                                     obj_p.scaling = new BABYLON.Vector3(parseFloat(arr[2]), parseFloat(arr[3]), parseFloat(arr[4]));//缩放
141                                     obj_p.position = new BABYLON.Vector3(parseFloat(arr[5]), parseFloat(arr[6]), parseFloat(arr[7]));//位置
142                                     obj_p.rotation = new BABYLON.Vector3(parseFloat(arr[8]), parseFloat(arr[9]), parseFloat(arr[10]));// 旋转
143                                     obj_p.checkCollisions = true;//使用默认的碰撞检测
144                                     obj_p.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);//碰撞检测椭球
145                                     obj_p.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);//碰撞检测椭球位移
146                                     obj_p.skeletonsPlayer = skeletons;
147                                     obj_p.methodofmove = "controlwitha";
148                                     obj_p.id = arr[0];
149                                     obj_p.name = arr[0];
150                                     obj_p.p1 = arr[11];
151                                     obj_p.p2 = arr[12];
152                                     obj_p.p3 = arr[13];
153                                     var len=newMeshes.length;//对于复杂的模型来说newMeshes的其他部分也必须保存下来
154                                     var arr=[];
155                                     for(var i=1;i<len;i++)
156                                     {
157                                         arr.push(newMeshes[i]);
158                                     }
159                                     obj_p.submeshs=arr;
160                                     Tom.init(
161                                         obj_p
162                                     );
163                                     tempobj[obj_p.mesh.name] = "OK";
164                                     arr_webplayers[arr[0]] = Tom;
165                                     shadowGenerator.getShadowMap().renderList.push(arr_webplayers[arr[0]].mesh);
166                                     writeToScreen('<span style="color: blue;">addoldplayer: ' + arr[0] + '</span>');
167                                     flag=1;
168 
169                                 });
170                             }
171                         }
172                         break;
173                     }
```
　　这里的主要难点是如何处理多个异步的添加玩家请求，经过思考和实验部分的解决了问题。

#### b、多个客户端之间同步玩家的状态：

```js
 1 case "updatemesh":
 2                     {
 3                         var dt=new Date();
 4                         console.log(dt.getTime()+"get updatemesh"+arr[0]);
 5                         var obj = arr_webplayers[arr[0]];//从网络玩家列表里找到这个玩家
 6                         if(obj)
 7                         {
 8                             var mesh = obj.mesh;
 9                             mesh.position.x = parseFloat(arr[2]);//这里已经产生了位移效果！！
10                             mesh.position.y = parseFloat(arr[3]);
11                             mesh.position.z = parseFloat(arr[4]);
12                             mesh.rotation.x = parseFloat(arr[5]);
13                             mesh.rotation.y = parseFloat(arr[6]);
14                             mesh.rotation.z = parseFloat(arr[7]);
15                            
16                             obj.vmove.x=parseFloat(arr[8]);
17                             obj.vmove.y=parseFloat(arr[9]);
18                             obj.vmove.z=parseFloat(arr[10]);
19                            
20                             obj.rychange= parseFloat(arr[11]);
21                             obj.countstop=0;//唤醒该物体的运动
22                             if(obj.PlayAnnimation == false&amp;&amp;(obj.vmove.x != 0 || obj.vmove.y != 0 || obj.vmove.z != 0 || obj.rychange != 0))
23                             {
24                                 obj.PlayAnnimation = true;
25                                 obj.beginSP(0);
26                             }
27                         }
28                         break;
29                     }
```
另一部分控制网络玩家的代码在
scene.registerBeforeRender（）中：
```js
 1 for (var key2 in arr_webplayers)//对于由其他客户端控制的物体
 2                 {
 3                     var obj = arr_webplayers[key2];
 4                     switch(obj.methodofmove)
 5                     {
 6                         case "controlwitha":
 7                         {
 8                             obj.lab.rotation.y=(-1.55 - cameraArcRotative[0].alpha)-obj.mesh.rotation.y;
 9                             if(obj.countstop<=4)
10                             {
11                                 if ((obj.vmove.x != 0 || obj.vmove.y != 0 || obj.vmove.z != 0 || obj.rychange != 0)&amp;&amp; obj.PlayAnnimation == false) {
12                                     obj.PlayAnnimation = true;
13                                     obj.beginSP(0);
14                                     obj.mesh.moveWithCollisions(obj.vmove);
15                                 }
16                                 else if (obj.vmove.x == 0 &amp;&amp; obj.vmove.y == 0 &amp;&amp; obj.vmove.z == 0 &amp;&amp; obj.rychange == 0 &amp;&amp; obj.PlayAnnimation == true) {
17                                     obj.countstop++;
18                                     if (obj.countstop > 4)//连续4帧没有该对象的运动信息传过来，则该物体的运动计算进入休眠
19                                     {
20                                         obj.PlayAnnimation = false;
21                                         obj.stopSP(0);
22                                     }
23                                 }
24                             }
25                             break;
26                         }
27                         default :
28                         {
29                             break;
30                         }
31                     }
32                 }
```
#### c、最后是对NPC物体运动同步的处理：

```js
 1 case "[admins]":
 2             {
 3                 if(username=="admin")
 4                 {//adminserver不处理admin广播
 5 
 6                 }
 7                 else
 8                 {
 9                     if(!scene.isReady() || !arr_myplayers)
10                     {
11                         return;
12                     }
13                     var arr_rabbitmove=JSON.parse(str_data.substr(8));
14                     var len=arr_rabbitmove.length;
15                     for(var i=0;i<len;i++)
16                     {
17                         var arr=arr_rabbitmove[i];
18                         var rabbit=arr_animals[arr[0]];
19                         var rabbitmesh=rabbit.mesh;
20                         rabbitmesh.position=arr[1];
21                         rabbitmesh.rotation=arr[2];
22                         rabbit.vmove=arr[3];
23                         rabbit.rychange=arr[4];
24 
25                         if(arr[5]=="run"&amp;&amp;rabbit.state=="eat")
26                         {
27                             rabbit.state="run";
28                             rabbit.powerofmove=3;
29                             scene.beginAnimation(rabbitmesh.skeleton, 0, 72, true, 2.4);
30                         }
31                         else if(arr[5]=="eat"&amp;&amp;rabbit.state=="run")
32                         {
33                             rabbit.state="eat";
34                             rabbit.powerofmove=1;
35                             scene.beginAnimation(rabbitmesh.skeleton, 0, 72, true, 0.8);
36                         }
37                     }
38                 }
39                 break;
40             }
```
解开JSON，对每一个NPC物体分别处理。

## 五、部署和使用：

程序完整代码在可以在https://github.com/ljzc002/WebGL2下载，我编写的代码基于MIT协议发布，使用的第三方库文件按其原有的发布协议发布。
部署：把PRACTICE/WebRoot/下的所有文件复制到PRACTICE3/目录下，将PRACTICE3/复制到Tomcat的WebApps/目录下，把PRACTICE3/改名为PRACTICE/，启动Tomcat，访问scene_link.html页面。
使用：第一个input输入Websocket所在IP，第二个input输入用户名（输入admin表示申请作为主机），点击“websocket连接”建立连接，点击“启动场景”启动WebGL场景。

## 六、写在后面的话：

限于时间和编程水平，程序中还有很多bug和缺陷，欢迎大家批评指正。
音乐、美术、文学等常规的人类自我表达方式都要求人不断的在很短的时间片内对事物产生足够充分的认识，非有过人之天赋与辛苦之训练而不可成就；相对而言编程可以通过分解、封装、复用将空间复杂度转化为时间复杂度，任何普通人经过努力都能有所收获。