---
title: html5+jqueryMobile编写App推广注册页
date: 2016-11-07 15:52:25
comments: true
categories: HTML5
---

#html5+jqueryMobile编写App推广注册页
&nbsp;data-role="page"、 &nbsp;data-role="header" 、data-role="content"、&nbsp;data-role="footer", &nbsp;为什么html5会增加这几个特征，我觉得多是为支持web版手机app开发而出的，因为html5提倡开发web版app只创建一个html页，然后每个段落=一个新页面，下面我贴一段几个div标签组合成的一个整体页面，当然它们都各自加了上面的特性。
&lt;!--data-role="page"表示这个是一个html5单独页面，可以从另外一个加了page特性的div打开它 --&gt;
&lt;!--data-role="header"这个特性你想成APP的navigationbar --&gt;
&lt;!--data-role="content"内容里面展示页面内容的，必入你放一张表在这个标签里面展示 --&gt;
&lt;!--data-role="footer"这个特性你想成APP的tabbar --&gt;
&lt;/div&gt;

&lt;div data-role="page" id="phoneRegister"&gt;
&lt;!--data-role="header"这个特性你想成APP的navigationbar --&gt;
&lt;div data-role="header" id="heardId"&gt;&lt;/div&gt;
&lt;!--data-role="content"内容里面展示页面内容的，必入你放一张表在这个标签里面展示 --&gt;
&lt;div data-role="content"&gt; &lt;/div&gt;
&lt;!--data-role="footer"这个特性你想成APP的tabbar --&gt;
&lt;div data-role="footer"&gt; &lt;/div&gt;
&lt;/div&gt;&nbsp;
&nbsp;1. 首先html5标准页面申明，页面中的第一行代码与html4不一样,&lt;!DOCTYPE&gt;
&lt;!DOCTYPE&gt;&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;
&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"&gt;&nbsp; &nbsp; &nbsp; 此标签的作用是告诉浏览器支持什么html规范。
&nbsp; &nbsp;
引入jquery和jquerymobile的支持库
 &nbsp;2.引入jquery和jquerymobile的支持库&nbsp; &nbsp; &nbsp; &lt;meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" /&gt;
&nbsp; &nbsp; &nbsp;&lt;link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css"&gt;
&nbsp; &nbsp; &nbsp; &lt;script src="http://code.jquery.com/jquery-1.8.3.min.js"&gt;&lt;/script&gt;
&nbsp; &nbsp; &nbsp;&lt;script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"&gt;&lt;/script&gt;
&nbsp;

  1 &lt;!DOCTYPE&gt;
  2 &lt;html&gt;
  3 &lt;head&gt;
  4  &lt;meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" /&gt;
  5 &lt;meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"&gt;
  6 &lt;link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css"&gt;
  7  &lt;script src="http://code.jquery.com/jquery-1.8.3.min.js"&gt;&lt;/script&gt;
  8  &lt;script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"&gt;&lt;/script&gt;
  9 
 10 &lt;title&gt;Insert title here&lt;/title&gt;
 11 &lt;script type="text/javascript"&gt;
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
 66         if (password.length &lt; 6) {
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
 99         if (name.length &lt; 6) {
100             alert("注册用户名不能小于6位数!")
101             return;
102         }
103         if (password.length &lt; 10) {
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
185 &lt;/script&gt;
186 &lt;/head&gt;
187 &lt;body&gt;
188 
189     &lt;!-- 这个div data-role="page"表明它是一个页面 --&gt;
190     &lt;div data-role="page" id="phoneRegister"&gt;
191         &lt;div data-role="header" id="heardId"&gt;
192         
193    &lt;div style="margin-left:20px; font-size:17px;   font-weight:bold"&gt;&lt;a href="#pagetwo" style="color:white; text-decoration:none;"&gt;首页&gt;手机在线注册&lt;/a&gt;&lt;/div&gt;
194 
195         &lt;/div&gt;
196 
197         &lt;div data-role="content" id="contentId"&gt;
198          
199 
200                 &lt;section id="posts"&gt;
201 
202                     &lt;article class="post"&gt;
203 
204                         &lt;header&gt;
205                             &lt;h4 id="presentGiftTitle"&gt;使用手机后注册后立刻赠送100乐币!&lt;/h4&gt;
206                         &lt;/header&gt;
207                         &lt;aside&gt;
208                             手机号:
209                             &lt;input id="name" type="text" placeholder="请输入注册帐号!" /&gt;
210                         &lt;/aside&gt;
211                         &lt;aside&gt;
212                             密&amp;nbsp;&amp;nbsp;码:
213                             &lt;input id="password" type="password" placeholder="请输入注册密码!" /&gt;
214 
215                         &lt;/aside&gt;
216 
217                         &lt;aside&gt;
218                             &lt;div style="margin-left:-15px;"&gt;
219                                 &lt;div style="width: 20px;   height: 20px; float:left;  margin-top:5px;"&gt; &lt;input id="Checkbox1" style="width: 18px; height: 18px;" type="checkbox" /&gt;&lt;/div&gt;
220                                 &lt;div style="margin-left:40px;"&gt;&lt;h5&gt;打勾注册表示你同意本公司的服务条例!&lt;/h5&gt;&lt;/div&gt;
221                             &lt;/div&gt;
222 
223                         &lt;/aside&gt;
224 
225 
226                         &lt;aside style="margin-top:20px;"&gt;
227 
228                             &lt;div id="phoneRegisterClick" style="text-align: center; border: 1px solid #666666; background: #4dbb49; color: white; height: 30px; width: 100px; line-height: 30px; "&gt;立即注册&lt;a href="#dialog" id="alertVerifyCodeBox" data-rel="dialog" style="display:none"&gt;&lt;/a&gt;  &lt;/div&gt;
229                         &lt;/aside&gt;
230 
231 
232                         &lt;aside style="margin-top:20px;"&gt;
233                             &lt;div style="float:right"&gt;&lt;a href="#commonRegister" data-transition="flip"&gt;普通注册(非手机)&lt;/a&gt;&lt;/div&gt;
234 
235                         &lt;/aside&gt;
236 
237                         &lt;footer&gt;&lt;/footer&gt;
238 
239                     &lt;/article&gt;
240 
241                 &lt;/section&gt;
242 
243            
244             
245 
246  
247         &lt;/div&gt;
248 
249         &lt;div data-role="footer" id="footerId" style="background:#666666;"&gt;
250 
251             &lt;div style="width:100%;height:90%;text-align:center;"&gt;
252 
253                 &lt;div style="font-size:13px; height:25%;text-decoration:none;margin-top:0px;padding-top:0px; line-height:16px;"&gt;电话:400-900-8000&lt;/div&gt;
254                 &lt;div style="font-size: 13px; height: 25%; text-decoration:none;margin-top: 0px; padding-top: 0px; line-height:16px;"&gt;渝ICP备000000-c号&lt;/div&gt;
255                 &lt;div style="font-size: 13px; height: 25%;text-decoration:none; margin-top: 0px; padding-top: 0px; line-height: 16px;"&gt;版权所有&lt;/div&gt;
256 
257             &lt;/div&gt;
258 
259         &lt;/div&gt;
260 
261 
262     &lt;/div&gt;
263     
264     
265 
266 
267 
268 
269 &lt;!-- 这个div data-role="page"表明它是一个页面 --&gt;
270     &lt;div data-role="page" id="commonRegister"&gt;
271         &lt;div data-role="header" id="heardId"&gt;
272 
273             &lt;div style="margin-left:20px; font-size:17px;   font-weight:bold"&gt;&lt;a href="#pagetwo" style="color:white; text-decoration:none;"&gt;首页&gt;普通用户在线注册&lt;/a&gt;&lt;/div&gt;
274 
275         &lt;/div&gt;
276 
277         &lt;div data-role="content" id="contentId"&gt;
278 
279 
280 
281  
282 
283                 &lt;section id="posts"&gt;
284 
285                     &lt;article class="post"&gt;
286 
287 
288                         &lt;aside&gt;
289                             帐 号:
290                             &lt;input id="name" type="text" placeholder="请输入注册帐号!" /&gt;
291                         &lt;/aside&gt;
292                         &lt;aside&gt;
293                             密&amp;nbsp;&amp;nbsp;码:
294                             &lt;input id="password" type="password" placeholder="请输入注册密码!" /&gt;
295 
296                         &lt;/aside&gt;
297                         &lt;aside&gt;
298                             手机号:
299                             &lt;input id="phoneNumber" type="text" placeholder="请输入手机号!" /&gt;
300 
301                         &lt;/aside&gt;
302 
303                         &lt;aside&gt;
304                             安全邮箱:
305                             &lt;input id="safeMail" type="text" placeholder="请输入安全邮箱!" /&gt;
306 
307                         &lt;/aside&gt;
308                         &lt;aside&gt;
309                             &lt;div style="margin-left:-15px;"&gt;
310                                 &lt;div style="width: 20px;   height: 20px; float:left;  margin-top:5px;"&gt; &lt;input id="Checkbox1" style="width: 18px; height: 18px;" type="checkbox" /&gt;&lt;/div&gt;
311                                 &lt;div style="margin-left:40px;"&gt;&lt;h5&gt;打勾注册表示你同意本公司的服务条例!&lt;/h5&gt;&lt;/div&gt;
312                             &lt;/div&gt;
313 
314                         &lt;/aside&gt;
315 
316 
317                         &lt;aside style="margin-top:20px;"&gt;
318 
319                             &lt;div id="commonRegisterClick" style="text-align:center;border:1px solid #666666; background:#4dbb49;color:white;height:30px;width:100px; line-height:30px;"&gt;立即注册 &lt;/div&gt;
320                         &lt;/aside&gt;
321 
322 
323                         &lt;aside style="margin-top:20px;"&gt;
324                             &lt;div style="float:right"&gt;&lt;a href="#phoneRegister" data-transition="flip"&gt;手机注册(手机号)&lt;/a&gt;&lt;/div&gt;
325 
326                         &lt;/aside&gt;
327 
328                         &lt;footer&gt;&lt;/footer&gt;
329 
330                     &lt;/article&gt;
331                     &lt;/section&gt;
332                     
333                   
334 
335         &lt;/div&gt;
336 
337         &lt;div data-role="footer" id="footerId" style="background:#666666;"&gt;
338 
339             &lt;div style="width:100%;height:90%;text-align:center;"&gt;
340 
341                 &lt;div style="font-size:13px; height:25%;text-decoration:none;margin-top:0px;padding-top:0px; line-height:16px;"&gt;电话:400-900-8000&lt;/div&gt;
342                 &lt;div style="font-size: 13px; height: 25%;text-decoration:none; margin-top: 0px; padding-top: 0px; line-height:16px;"&gt;渝ICP备000000-c号&lt;/div&gt;
343                 &lt;div style="font-size: 13px; height: 25%;text-decoration:none; margin-top: 0px; padding-top: 0px; line-height: 16px;"&gt;版权所有&lt;/div&gt;
344 
345             &lt;/div&gt;
346 
347         &lt;/div&gt;
348 
349 
350     &lt;/div&gt;
351  
352    
353 
354 
355 
356 
357 
358 
359 
360     &lt;div data-role="page" id="dialog" style="padding-top:auto"&gt;
361         &lt;div data-role="header" id="heardId" style="background:#4dbb49"&gt;
362             &lt;h1&gt;输入验证码&lt;/h1&gt;
363         &lt;/div&gt;
364 
365         &lt;div data-role="content" id="contentId"&gt;
366 
367             &lt;aside&gt;
368                 验证码:
369                 &lt;input id="verifyCode" type="text" placeholder="请输入验证码!" /&gt;
370 
371             &lt;/aside&gt;
372             &lt;aside&gt;
373 
374                 &lt;div id="inputVerifyCodeDiv" style="width: 100px; height: 30px; background: #4dbb49; color:white; line-height:30px; float:right; text-align:center"&gt;确 定&lt;/div&gt;
375 
376             &lt;/aside&gt;
377         &lt;/div&gt;
378 
379         &lt;div data-role="footer" id="footerId" style="background:#4dbb49"&gt;
380             &lt;h1&gt;&lt;/h1&gt;
381         &lt;/div&gt;
382     &lt;/div&gt;
383 
384 
385    
386 &lt;/body&gt;
387 &lt;/html&gt;
上面的代码直接copy到一个html页面可以运行。
&nbsp;
