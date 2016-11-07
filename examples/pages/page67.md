---
title: html5+jqueryMobile编写App推广注册页
date: 2016-11-07 15:52:29
comments: true
categories: HTML5
---

#html5+jqueryMobile编写App推广注册页
 data-role="page"、  data-role="header" 、data-role="content"、 data-role="footer",  为什么html5会增加这几个特征，我觉得多是为支持web版手机app开发而出的，因为html5提倡开发web版app只创建一个html页，然后每个段落=一个新页面，下面我贴一段几个div标签组合成的一个整体页面，当然它们都各自加了上面的特性。

```html
<!--data-role="page"表示这个是一个html5单独页面，可以从另外一个加了page特性的div打开它 -->
<!--data-role="header"这个特性你想成APP的navigationbar -->
<!--data-role="content"内容里面展示页面内容的，必入你放一张表在这个标签里面展示 -->
<!--data-role="footer"这个特性你想成APP的tabbar -->
</div>

<div data-role="page" id="phoneRegister">
<!--data-role="header"这个特性你想成APP的navigationbar -->
<div data-role="header" id="heardId"></div>
<!--data-role="content"内容里面展示页面内容的，必入你放一张表在这个标签里面展示 -->
<div data-role="content"> </div>
<!--data-role="footer"这个特性你想成APP的tabbar -->
<div data-role="footer"> </div>
</div>
```

##1. 首先html5标准页面申明，页面中的第一行代码与html4不一样,
```xml
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
```
此标签的作用是告诉浏览器支持什么html规范。

引入jquery和jquerymobile的支持库
##2.引入jquery和jquerymobile的支持库
```xml
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />
  <link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css">
   <script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
  <script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
```
```html
  1 <!DOCTYPE>
  2 <html>
  3 <head>
  4  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />
  5 <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
  6 <link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css">
  7  <script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
  8  <script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
  9 
 10 <title>Insert title here</title>
 11 <script type="text/javascript">
 12 $(document).on("pagecreate", function () {
 13     var contentHeight = document.body.clientHeight;
 14     var header = contentHeight * 0.1;
 15     var content = contentHeight * 0.75;
 16     var footer = contentHeight * 0.15;
 17     $("#phoneRegister #heardId").css({ 'height': header + 'px', 'background': '#4dbb49', 'line-height': header + 'px' });
 18     $("#phoneRegister #contentId").css({ 'height': content + 'px' });
 19     $("#phoneRegister #footerId").css({ 'height': footer + 'px', ' font-size': '70px', 'line-height': footer + 'px' });
 20 
 21     var flag = false;
 22     setInterval(function () {
 23         if (flag == false) {
 24             $("#presentGiftTitle").css({ 'color': 'rgb(255, 0, 0)' });
 25             flag = true;
 26             return;
 27         }
 28         if (flag == true) {
 29             $("#presentGiftTitle").css({ 'color': 'rgb(255, 102, 0)' });
 30             flag = false;
 31             return;
 32         }
 33     }, 100);
 34 
 35 });
 36 //当页面初始化完毕后
 37 
 38 $(document).on("pageshow", "#commonRegister", function () { // 当进入页面二时
 39 
 40     var contentHeight = document.body.clientHeight;
 41     var header = contentHeight * 0.1;
 42     var content = contentHeight * 0.75;
 43     var footer = contentHeight * 0.15;
 44 
 45     $("#commonRegister #heardId").css({ 'height': header + 'px', 'background': '#4dbb49', 'line-height': header + 'px' });
 46     $("#commonRegister #contentId").css({ 'height': content + 'px' });
 47     $("#commonRegister #footerId").css({ 'height': footer + 'px', 'font-size': '70px', 'line-height': footer + 'px' });
 48 
 49 
 50 });
 51 
 52 
 53 
 54  
 55 $(document).on("pageinit", "#phoneRegister", function () {
 56     $("#phoneRegisterClick").on("tap", function () {
 57 
 58         var name = $("#phoneRegister #name").val();
 59         var password = $("#phoneRegister #password").val();
 60 
 61         var re = /^(13[0-9]{9})|(15[89][0-9]{8})$/;
 62         if (!re.test(name)) {
 63             alert("请输入正确的手机号!")
 64             return;
 65         }
 66         if (password.length < 6) {
 67             alert("密码不能小于6位数")
 68             return;
 69         }
 70         var checkBox = $("#phoneRegister #Checkbox1");
 71         if (!checkBox.is(":checked")) {
 72             alert("请阅读条例!")
 73             return;
 74         }
 75 
 76 
 77         //开始发送手机验证
 78 
 79         alertVerifyCodeMethod();
 80 
 81 
 82 
 83     });
 84 });
 85 
 86 
 87 
 88 
 89 $(document).on("pageinit", "#commonRegister", function () {
 90     $("#commonRegisterClick").on("tap", function () {
 91 
 92         var name = $("#commonRegister #name").val();
 93         var password = $("#commonRegister #password").val();
 94         var phonenumber = $("#commonRegister #phoneNumber").val();
 95         var safemail = $("#commonRegister #safeMail").val();
 96 
 97         var re = /^(13[0-9]{9})|(15[89][0-9]{8})$/;
 98         var mre = /\w@\w*\.\w/;
 99         if (name.length < 6) {
100             alert("注册用户名不能小于6位数!")
101             return;
102         }
103         if (password.length < 10) {
104 
105             alert("密码不能小于10位数")
106             return;
107         }
108         if (!re.test(phonenumber)) {
109 
110             alert("请输入正确的手机号!")
111             return;
112         }
113 
114         if (!mre.test(safemail)) {
115             alert("请输入正确的邮箱!")
116             return;
117         }
118 
119         var checkBox = $("#commonRegister #Checkbox1");
120         if (!checkBox.is(":checked")) {
121             alert("请阅读条例!")
122             return;
123         }
124 
125 
126         shareAjaxMethord(0, name, password, phonenumber, safemail);
127 
128 
129 
130 
131 
132     });
133 });
134 
135  
136 
137 function alertVerifyCodeMethod() {
138 
139     if (document.all) {
140         document.getElementById("alertVerifyCodeBox").click();
141     }
142     else {
143         var e = document.createEvent("MouseEvents");
144         e.initEvent("click", true, true);
145         document.getElementById("alertVerifyCodeBox").dispatchEvent(e);
146     }
147 }
148  
149  
150 
151 function shareAjaxMethord(index, name, password, phone, email) {
152 
153   
154     $.ajax({
155         type: "POST",
156         async: false,
157         dataType: "text",
158         data: "&amp;sgin=" + index + "&amp;name=" + name + "&amp;password=" + password + "&amp;phone=" + phone + "&amp;email=" + email,
159         url: "ajaxMediumPage.ashx",
160         success: function (returnDate) {
161 
162             if (index == 0) {
163                 if(returnDate=="1")
164                 {
165                     alert("注册成功!");
166 
167                 }
168                 else
169                 {
170                     alert("注册失败!");
171                 }
172             }
173             else if (inedx == 1) {
174 
175             }
176             else {
177 
178             }
179 
180         }
181     });
182 }
183 
184 
185 </script>
186 </head>
187 <body>
188 
189     <!-- 这个div data-role="page"表明它是一个页面 -->
190     <div data-role="page" id="phoneRegister">
191         <div data-role="header" id="heardId">
192         
193    <div style="margin-left:20px; font-size:17px;   font-weight:bold"><a href="#pagetwo" style="color:white; text-decoration:none;">首页>手机在线注册</a></div>
194 
195         </div>
196 
197         <div data-role="content" id="contentId">
198          
199 
200                 <section id="posts">
201 
202                     <article class="post">
203 
204                         <header>
205                             <h4 id="presentGiftTitle">使用手机后注册后立刻赠送100乐币!</h4>
206                         </header>
207                         <aside>
208                             手机号:
209                             <input id="name" type="text" placeholder="请输入注册帐号!" />
210                         </aside>
211                         <aside>
212                             密&amp;nbsp;&amp;nbsp;码:
213                             <input id="password" type="password" placeholder="请输入注册密码!" />
214 
215                         </aside>
216 
217                         <aside>
218                             <div style="margin-left:-15px;">
219                                 <div style="width: 20px;   height: 20px; float:left;  margin-top:5px;"> <input id="Checkbox1" style="width: 18px; height: 18px;" type="checkbox" /></div>
220                                 <div style="margin-left:40px;"><h5>打勾注册表示你同意本公司的服务条例!</h5></div>
221                             </div>
222 
223                         </aside>
224 
225 
226                         <aside style="margin-top:20px;">
227 
228                             <div id="phoneRegisterClick" style="text-align: center; border: 1px solid #666666; background: #4dbb49; color: white; height: 30px; width: 100px; line-height: 30px; ">立即注册<a href="#dialog" id="alertVerifyCodeBox" data-rel="dialog" style="display:none"></a>  </div>
229                         </aside>
230 
231 
232                         <aside style="margin-top:20px;">
233                             <div style="float:right"><a href="#commonRegister" data-transition="flip">普通注册(非手机)</a></div>
234 
235                         </aside>
236 
237                         <footer></footer>
238 
239                     </article>
240 
241                 </section>
242 
243            
244             
245 
246  
247         </div>
248 
249         <div data-role="footer" id="footerId" style="background:#666666;">
250 
251             <div style="width:100%;height:90%;text-align:center;">
252 
253                 <div style="font-size:13px; height:25%;text-decoration:none;margin-top:0px;padding-top:0px; line-height:16px;">电话:400-900-8000</div>
254                 <div style="font-size: 13px; height: 25%; text-decoration:none;margin-top: 0px; padding-top: 0px; line-height:16px;">渝ICP备000000-c号</div>
255                 <div style="font-size: 13px; height: 25%;text-decoration:none; margin-top: 0px; padding-top: 0px; line-height: 16px;">版权所有</div>
256 
257             </div>
258 
259         </div>
260 
261 
262     </div>
263     
264     
265 
266 
267 
268 
269 <!-- 这个div data-role="page"表明它是一个页面 -->
270     <div data-role="page" id="commonRegister">
271         <div data-role="header" id="heardId">
272 
273             <div style="margin-left:20px; font-size:17px;   font-weight:bold"><a href="#pagetwo" style="color:white; text-decoration:none;">首页>普通用户在线注册</a></div>
274 
275         </div>
276 
277         <div data-role="content" id="contentId">
278 
279 
280 
281  
282 
283                 <section id="posts">
284 
285                     <article class="post">
286 
287 
288                         <aside>
289                             帐 号:
290                             <input id="name" type="text" placeholder="请输入注册帐号!" />
291                         </aside>
292                         <aside>
293                             密&amp;nbsp;&amp;nbsp;码:
294                             <input id="password" type="password" placeholder="请输入注册密码!" />
295 
296                         </aside>
297                         <aside>
298                             手机号:
299                             <input id="phoneNumber" type="text" placeholder="请输入手机号!" />
300 
301                         </aside>
302 
303                         <aside>
304                             安全邮箱:
305                             <input id="safeMail" type="text" placeholder="请输入安全邮箱!" />
306 
307                         </aside>
308                         <aside>
309                             <div style="margin-left:-15px;">
310                                 <div style="width: 20px;   height: 20px; float:left;  margin-top:5px;"> <input id="Checkbox1" style="width: 18px; height: 18px;" type="checkbox" /></div>
311                                 <div style="margin-left:40px;"><h5>打勾注册表示你同意本公司的服务条例!</h5></div>
312                             </div>
313 
314                         </aside>
315 
316 
317                         <aside style="margin-top:20px;">
318 
319                             <div id="commonRegisterClick" style="text-align:center;border:1px solid #666666; background:#4dbb49;color:white;height:30px;width:100px; line-height:30px;">立即注册 </div>
320                         </aside>
321 
322 
323                         <aside style="margin-top:20px;">
324                             <div style="float:right"><a href="#phoneRegister" data-transition="flip">手机注册(手机号)</a></div>
325 
326                         </aside>
327 
328                         <footer></footer>
329 
330                     </article>
331                     </section>
332                     
333                   
334 
335         </div>
336 
337         <div data-role="footer" id="footerId" style="background:#666666;">
338 
339             <div style="width:100%;height:90%;text-align:center;">
340 
341                 <div style="font-size:13px; height:25%;text-decoration:none;margin-top:0px;padding-top:0px; line-height:16px;">电话:400-900-8000</div>
342                 <div style="font-size: 13px; height: 25%;text-decoration:none; margin-top: 0px; padding-top: 0px; line-height:16px;">渝ICP备000000-c号</div>
343                 <div style="font-size: 13px; height: 25%;text-decoration:none; margin-top: 0px; padding-top: 0px; line-height: 16px;">版权所有</div>
344 
345             </div>
346 
347         </div>
348 
349 
350     </div>
351  
352    
353 
354 
355 
356 
357 
358 
359 
360     <div data-role="page" id="dialog" style="padding-top:auto">
361         <div data-role="header" id="heardId" style="background:#4dbb49">
362             <h1>输入验证码</h1>
363         </div>
364 
365         <div data-role="content" id="contentId">
366 
367             <aside>
368                 验证码:
369                 <input id="verifyCode" type="text" placeholder="请输入验证码!" />
370 
371             </aside>
372             <aside>
373 
374                 <div id="inputVerifyCodeDiv" style="width: 100px; height: 30px; background: #4dbb49; color:white; line-height:30px; float:right; text-align:center">确 定</div>
375 
376             </aside>
377         </div>
378 
379         <div data-role="footer" id="footerId" style="background:#4dbb49">
380             <h1></h1>
381         </div>
382     </div>
383 
384 
385    
386 </body>
387 </html>
```
上面的代码直接copy到一个html页面可以运行。

