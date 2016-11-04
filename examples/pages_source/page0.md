---
title: 跳闸了啊！ 服务容灾：熔断器简介
date: 2016-11-04 16:17:27
comments: true
categories: HTML5
---

#跳闸了啊！ 服务容灾：熔断器简介
<p>现如今SOA、微服务风愈演愈烈，越来越多的业务和资源被以服务的形式包装和发布，服务间又可能会依赖其他各种服务。由此而来不可避免的会产生很多问题。</p><p>比如一个服务，其依赖了另外30个服务。假设每个服务的可用率都有三个9（99.9%），那么我们计算一下：</p><blockquote>
<p>99.99%^30 = 99.7%</p>
</blockquote><p>现实很残酷，这个服务的实际可用性只能是99.7%，也就是说每个月这个服务都要好宕机8000+秒~~~</p><p><img src="http://images2015.cnblogs.com/blog/73868/201611/73868-20161102154146361-1678749300.png"><br>
正常用户请求时，服务内部依次请求A\P\H\I服务，兵返回响应结果。</p><p><img src="http://images2015.cnblogs.com/blog/73868/201611/73868-20161102154302815-539613445.png"><br>
非常不幸，我们的I服务出了某些问题，此时我们的用户请求就被堵塞在I服务处。</p><p><img src="http://images2015.cnblogs.com/blog/73868/201611/73868-20161102155201643-1860995524.png"><br>
更加悲剧的是，后续越来越多的请求都被堵塞在I服务处，而这些被堵塞的请求会占用线程、IO、网络等系统资源，随着资源被占用的越来越多，本来不存在的性能问题也会随之而来，造成系统中的其他服务出现问题，甚至导致系统奔溃。</p><p>这也就是我们常说的<strong>雪崩效应</strong></p><p>为了避免出现服务的雪崩，我们需要对服务做容灾处理。</p><p>常规的服务容灾处理思路有：</p><ul>
<li>资源隔离<br>
</li>
<li>超时设定<br>
</li>
<li>服务降级<br>
</li>
<li>服务限流</li>
</ul><p>其中每种思路又可以有不同的解决方案。</p><p>比如资源隔离可以通过将不同的服务发布在独立的docker容器或服务器中，这样即使一个服务出现问题，也不会殃及池鱼。</p><p>服务降级和服务限流可以通过前端nginx+lua来实现，当服务处理延迟或宕机时，nginx可以直接返回固定的降级/失败响应，已快速跳过问题服务。</p><p>Hystrix，是Netflix的一个开源熔断器，通过Hystrix，我们可以很方便的实现资源隔离、限流、超时设计、服务降级等服务容灾措施，并且还提供了强大的监控，可以查看各个熔断器的允许情况。</p><p><img src="http://images2015.cnblogs.com/blog/73868/201611/73868-20161102165124033-459359524.png"></p><p>通过上图，可以看出，Hystrix提供了一个HystrixCommand用来包装调用请求。HystrixCommand的执行流程大概如下：<br>
1.首先检查缓存中是否有结果。如果有则直接返回缓存结果。<br>
2.判断断路器是否开启，如果断路器闭合，执行降级业务逻辑并返回降级结果。<br>
3.判断信号量/线程池资源是否饱和，如饱和则执行降级业务逻辑并返回降级结果。<br>
4.调用实际服务，如发生异常，执行降级业务逻辑并返回降级结果，并调整断路器阈值。<br>
5.判断实际业务是否超时，超时则返回超时响应结果，并调整断路器阈值。</p><p>了解了流程，来看下如何使用Hystrix。首先我们需要定义一个命令类来包装我们的业务调用:</p><pre><code>//继承HystrixCommand
public class CommandHelloFailure extends HystrixCommand&lt;String&gt; {     private final String name;     public CommandHelloFailure(String name) {
        //设置分组key，分组key可以用在报表、监控中，默认的线程池隔离也基于分组key
         super(Setter.withGroupKey(HystrixCommandGroupKey.Factory.asKey("ExampleGroup"))
            //指定命令key，可
            .andCommandKey(HystrixCommandKey.Factory.asKey("HelloWorld"))
            //指定线程池key，取代默认的分组key
            .andThreadPoolKey(HystrixThreadPoolKey.Factory.asKey("HelloWorldPool")));
        /*
        //线程池隔离模式，不写默认是线程池隔离模式
        HystrixCommandProperties.Setter()
           .withExecutionIsolationStrategy(ExecutionIsolationStrategy.THREAD)
        //信号量隔离模式
        HystrixCommandProperties.Setter()
           .withExecutionIsolationStrategy(ExecutionIsolationStrategy.SEMAPHORE)
        //超时时间，默认1秒
        HystrixCommandProperties.Setter()
           .withExecutionTimeoutInMilliseconds(int value)  
        //信号量模式下，最大并发请求限流，默认值10
        HystrixCommandProperties.Setter()
           .withFallbackIsolationSemaphoreMaxConcurrentRequests(int value)  
        //熔断器阈值，默认20
        HystrixCommandProperties.Setter()
            .withCircuitBreakerRequestVolumeThreshold(int value)
        //熔断器关闭时间，默认5秒
        HystrixCommandProperties.Setter()
            .withCircuitBreakerSleepWindowInMilliseconds(int value)
        */
        this.name = name;
    }     @Override
    //执行实际服务，这里模拟全部返回异常
    protected String run() {
        throw new RuntimeException("this command always fails");
    }     @Override
    //执行降级业务
    protected String getFallback() {
        return "Hello Failure " + name + "!";
    }     @Override
    //从缓存中获取
    protected String getCacheKey() {
        ...
    }
} </code></pre><p>使用这个命令类也非常简单：</p><pre><code>//同步执行
String s = new CommandHelloWorld("Bob").execute();
//异步执行
Future&lt;String&gt; s = new CommandHelloWorld("Bob").queue();
//响应式
Observable&lt;String&gt; s = new CommandHelloWorld("Bob").observe();</code></pre><p>通过Hystrix提供的监控界面，我们可以观察到各个熔断器的执行情况：</p><p><img src="http://images2015.cnblogs.com/blog/73868/201611/73868-20161103104924330-948529078.png"></p><p>更多说明和例子可以查看Hystrix的<a href="https://github.com/Netflix/Hystrix/wiki">wiki</a>。</p><p>想在spring boot中使用Hystrix就更加简单了，只需要引入spring-cloud-starter-hystrix，</p><pre><code>&lt;dependency&gt;
        &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
        &lt;artifactId&gt;spring-cloud-starter-hystrix&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
        &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
        &lt;artifactId&gt;spring-cloud-starter-hystrix-dashboard&lt;/artifactId&gt;
&lt;/dependency&gt;</code></pre><p>然后添加注解使用Hystrix<br>
@EnableCircuitBreaker<br>
@EnableHystrixDashboard</p><p>最后在需要使用熔断器的地方标记注解即可。</p><pre><code>@HystrixCommand(groupKey = "xxx", fallbackMethod = "yyy")
public String doSomething() </code></pre><p>遥想2015年9月7日，上交所、深交所、中金所宣布，拟在保留现有个股涨跌幅制度前提下，引入指数熔断机制。随后A股联系两天下跌熔断，提前收盘。其中这里的熔断机制和我们今天讨论的熔断器思路一致，但是反而导致了A股暴跌，这也说明了我们还是得从根源产出高可用的服务，而不是依赖某些外部措施帮助我们提高可用性。同时说明了A股比咱写的垃圾服务更加不可靠，还是安心当个码农吧。</p><p>最后，就问各位童鞋，敢不敢点个赞~~~~</p><p>参考资料：<br>
<a href="https://github.com/Netflix/Hystrix" class="uri">https://github.com/Netflix/Hystrix</a><br>
<a href="http://www.cnblogs.com/jesse2013/p/things-architect-must-know.html" class="uri">http://www.cnblogs.com/jesse2013/p/things-architect-must-know.html</a></p>1 nodeName=undefined nodeValue=undefined nodeType=undefined
