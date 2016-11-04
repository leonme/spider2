---
title: canvas  动态飞速旋转的矩形
date: 2016-11-04 16:17:28
comments: true
categories: HTML5
---

#canvas  动态飞速旋转的矩形
1 nodeName=undefined nodeValue=undefined nodeType=undefined
<p>有人说，红孩儿的三昧真火是老君的，罗刹女的芭蕉扇也是老君的，那么罗刹女和太上老君是否有私情？</p><p>多么意味深长的一段话，哈哈哈！</p><p>其实原著中，红孩儿的三昧真火也是拜猴子所赐；想当年，那猴子，程英勇，耍神通，将这满身的本领折腾到了天庭，</p><p>玉帝也是着实无奈，才派了二郎真君，抓了猴子给了老君，老君将他放于炉中，锻炼了七七四十九天；最后猴子恼了，</p><p>捅开了锅盖，打倒了锅炉，弄的个火焰山，日夜不息的炙烤着一方土地；恰巧那红孩儿，正是本地人士，天天在山前玩耍，</p><p>苦练三百载，习得了这三昧真火，从此称妖为怪，占山头，逞英豪，弄的那三十里的土地山神，各个成了穷神，更无香火供奉，还</p><p>被玩耍被奴役，各个是敢怒而不敢言呐！</p><p>至于芭蕉扇，还记得那两个烧锅炉的道童么？ 奉了观音的邀请下届为妖，一个叫金角大王，一个名银角大王，他们还偷了</p><p>老君的五件常用之物，做了宝贝；有幌金绳，老君的皮带；紫金红葫芦，老君盛丹的；羊脂玉净瓶，老君装水的；还有那</p><p>七星剑，老君炼魔的；和芭蕉扇，老君煽火的。</p><p>至于为何芭蕉扇最后到了罗刹女手中，作者也未言明；可以大胆猜想一下：大家都晓得，管理火焰山的土地老儿，正是老君煽火</p><p>的道童；那么能控制三昧真火的工具，非那把煽阴风的芭蕉扇不可了！道童既然做了土地老儿，那么老君很有可能，赏给了道童一</p><p>把芭蕉扇，最后，道童的法力不济，被罗刹女给抢了去，成了她的生财工具！</p><p>个人觉得，老君毕竟是上仙，怎么可能和一个已婚的妖精有私情呢？不合常理！！！</p><p>好吧，废话太多，忘了正事儿了！</p><p>上魔法：旋转的矩形</p><div class="cnblogs_code">
<pre><span style="color: #0000ff">&lt;!</span><span style="color: #ff00ff">DOCTYPE html</span><span style="color: #0000ff">&gt;</span>
<span style="color: #0000ff">&lt;</span><span style="color: #800000">html </span><span style="color: #ff0000">xmlns</span><span style="color: #0000ff">="http://www.w3.org/1999/xhtml"</span><span style="color: #0000ff">&gt;</span>
<span style="color: #0000ff">&lt;</span><span style="color: #800000">head</span><span style="color: #0000ff">&gt;</span>
    <span style="color: #0000ff">&lt;</span><span style="color: #800000">meta </span><span style="color: #ff0000">http-equiv</span><span style="color: #0000ff">="Content-Type"</span><span style="color: #ff0000"> content</span><span style="color: #0000ff">="text/html; charset=utf-8"</span> <span style="color: #0000ff">/&gt;</span>
    <span style="color: #0000ff">&lt;</span><span style="color: #800000">title</span><span style="color: #0000ff">&gt;</span>变形<span style="color: #0000ff">&lt;/</span><span style="color: #800000">title</span><span style="color: #0000ff">&gt;</span>
    <span style="color: #0000ff">&lt;</span><span style="color: #800000">script </span><span style="color: #ff0000">type</span><span style="color: #0000ff">="text/javascript"</span><span style="color: #0000ff">&gt;</span><span style="background-color: #f5f5f5; color: #000000">
        window.onload </span><span style="background-color: #f5f5f5; color: #000000">=</span> <span style="background-color: #f5f5f5; color: #0000ff">function</span><span style="background-color: #f5f5f5; color: #000000"> () {
            </span><span style="background-color: #f5f5f5; color: #0000ff">var</span><span style="background-color: #f5f5f5; color: #000000"> canvas </span><span style="background-color: #f5f5f5; color: #000000">=</span><span style="background-color: #f5f5f5; color: #000000"> document.getElementById(</span><span style="background-color: #f5f5f5; color: #000000">"</span><span style="background-color: #f5f5f5; color: #000000">myCanvas</span><span style="background-color: #f5f5f5; color: #000000">"</span><span style="background-color: #f5f5f5; color: #000000">);
            </span><span style="background-color: #f5f5f5; color: #0000ff">var</span><span style="background-color: #f5f5f5; color: #000000"> context </span><span style="background-color: #f5f5f5; color: #000000">=</span><span style="background-color: #f5f5f5; color: #000000"> canvas.getContext(</span><span style="background-color: #f5f5f5; color: #000000">"</span><span style="background-color: #f5f5f5; color: #000000">2d</span><span style="background-color: #f5f5f5; color: #000000">"</span><span style="background-color: #f5f5f5; color: #000000">);
            </span><span style="background-color: #f5f5f5; color: #008000">//</span><span style="background-color: #f5f5f5; color: #008000">1.旋转</span>
<span style="background-color: #f5f5f5; color: #000000">            context.translate(</span><span style="background-color: #f5f5f5; color: #000000">200</span><span style="background-color: #f5f5f5; color: #000000">, </span><span style="background-color: #f5f5f5; color: #000000">200</span><span style="background-color: #f5f5f5; color: #000000">);  </span><span style="background-color: #f5f5f5; color: #008000">//</span><span style="background-color: #f5f5f5; color: #008000">平移到正方形中心</span>
            <span style="background-color: #f5f5f5; color: #0000ff">var</span><span style="background-color: #f5f5f5; color: #000000"> deg </span><span style="background-color: #f5f5f5; color: #000000">=</span> <span style="background-color: #f5f5f5; color: #000000">360</span><span style="background-color: #f5f5f5; color: #000000">;
            setInterval(</span><span style="background-color: #f5f5f5; color: #0000ff">function</span><span style="background-color: #f5f5f5; color: #000000"> () {
                rotate(deg </span><span style="background-color: #f5f5f5; color: #000000">*</span> <span style="background-color: #f5f5f5; color: #000000">180</span> <span style="background-color: #f5f5f5; color: #000000">/</span><span style="background-color: #f5f5f5; color: #000000"> Math.PI);
                deg</span><span style="background-color: #f5f5f5; color: #000000">/</span><span style="background-color: #f5f5f5; color: #000000">4;</span>
<span style="background-color: #f5f5f5; color: #000000">            }, </span><span style="background-color: #f5f5f5; color: #000000">100</span><span style="background-color: #f5f5f5; color: #000000">)             </span><span style="background-color: #f5f5f5; color: #0000ff">var</span><span style="background-color: #f5f5f5; color: #000000"> rotate </span><span style="background-color: #f5f5f5; color: #000000">=</span> <span style="background-color: #f5f5f5; color: #0000ff">function</span><span style="background-color: #f5f5f5; color: #000000"> (deg) {
                context.rotate(deg);
                context.fillRect(</span><span style="background-color: #f5f5f5; color: #000000">-</span><span style="background-color: #f5f5f5; color: #000000">50</span><span style="background-color: #f5f5f5; color: #000000">, </span><span style="background-color: #f5f5f5; color: #000000">-</span><span style="background-color: #f5f5f5; color: #000000">50</span><span style="background-color: #f5f5f5; color: #000000">, </span><span style="background-color: #f5f5f5; color: #000000">100</span><span style="background-color: #f5f5f5; color: #000000">, </span><span style="background-color: #f5f5f5; color: #000000">100</span><span style="background-color: #f5f5f5; color: #000000">);
                context.clearRect(</span><span style="background-color: #f5f5f5; color: #000000">-</span><span style="background-color: #f5f5f5; color: #000000">50</span><span style="background-color: #f5f5f5; color: #000000">, </span><span style="background-color: #f5f5f5; color: #000000">-</span><span style="background-color: #f5f5f5; color: #000000">50</span><span style="background-color: #f5f5f5; color: #000000">, </span><span style="background-color: #f5f5f5; color: #000000">100</span><span style="background-color: #f5f5f5; color: #000000">, </span><span style="background-color: #f5f5f5; color: #000000">100</span><span style="background-color: #f5f5f5; color: #000000">);
                context.beginPath();
                context.moveTo(</span><span style="background-color: #f5f5f5; color: #000000">-</span><span style="background-color: #f5f5f5; color: #000000">100</span><span style="background-color: #f5f5f5; color: #000000">, </span><span style="background-color: #f5f5f5; color: #000000">-</span><span style="background-color: #f5f5f5; color: #000000">100</span><span style="background-color: #f5f5f5; color: #000000">);
                context.lineTo(</span><span style="background-color: #f5f5f5; color: #000000">100</span><span style="background-color: #f5f5f5; color: #000000">, </span><span style="background-color: #f5f5f5; color: #000000">100</span><span style="background-color: #f5f5f5; color: #000000">);
                context.moveTo(</span><span style="background-color: #f5f5f5; color: #000000">-</span><span style="background-color: #f5f5f5; color: #000000">100</span><span style="background-color: #f5f5f5; color: #000000">, </span><span style="background-color: #f5f5f5; color: #000000">100</span><span style="background-color: #f5f5f5; color: #000000">);
                context.lineTo(</span><span style="background-color: #f5f5f5; color: #000000">100</span><span style="background-color: #f5f5f5; color: #000000">, </span><span style="background-color: #f5f5f5; color: #000000">-</span><span style="background-color: #f5f5f5; color: #000000">100</span><span style="background-color: #f5f5f5; color: #000000">);
                context.closePath();
                context.strokeStyle </span><span style="background-color: #f5f5f5; color: #000000">=</span> <span style="background-color: #f5f5f5; color: #000000">"</span><span style="background-color: #f5f5f5; color: #000000">#00ff00</span><span style="background-color: #f5f5f5; color: #000000">"</span><span style="background-color: #f5f5f5; color: #000000">;
                context.stroke();
            }
        }
    </span><span style="color: #0000ff">&lt;/</span><span style="color: #800000">script</span><span style="color: #0000ff">&gt;</span>
<span style="color: #0000ff">&lt;/</span><span style="color: #800000">head</span><span style="color: #0000ff">&gt;</span>
<span style="color: #0000ff">&lt;</span><span style="color: #800000">body</span><span style="color: #0000ff">&gt;</span>
    <span style="color: #0000ff">&lt;</span><span style="color: #800000">canvas </span><span style="color: #ff0000">id</span><span style="color: #0000ff">="myCanvas"</span><span style="color: #ff0000"> width</span><span style="color: #0000ff">="1000"</span><span style="color: #ff0000"> height</span><span style="color: #0000ff">="1000"</span><span style="color: #0000ff">&gt;</span><span style="color: #000000">
        您的浏览器暂不支持画布！
    </span><span style="color: #0000ff">&lt;/</span><span style="color: #800000">canvas</span><span style="color: #0000ff">&gt;</span>
<span style="color: #0000ff">&lt;/</span><span style="color: #800000">body</span><span style="color: #0000ff">&gt;</span>
<span style="color: #0000ff">&lt;/</span><span style="color: #800000">html</span><span style="color: #0000ff">&gt;</span></pre>
</div><p>&nbsp;</p><p>&nbsp;</p><p>交流群：225443677 &nbsp; &nbsp;不能怀孕，木有坏淫！真的，不信你就来！！！</p><p>&nbsp;</p>