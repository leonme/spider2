---
title: Picasso ganchuanpu
date: 2016-11-04 16:17:29
comments: true
categories: HTML5
---

#Picasso ganchuanpu
1 nodeName=undefined nodeValue=undefined nodeType=undefined
<p><strong>1.简介</strong></p><p>Picasso是Square公司出品的一个强大的图片下载和缓存图片库<br>1）在adapter中需要取消已经不在视野范围的ImageView图片资源的加载，否则会导致图片错位，Picasso已经解决了这个问题。<br>2）使用复杂的图片压缩转换来尽可能的减少内存消耗<br>3）自带内存和硬盘二级缓存功能</p><p>&nbsp;</p><p><strong>2.基本用法</strong></p><p><img src="http://images2015.cnblogs.com/blog/1044471/201611/1044471-20161103222330440-1256902303.png" alt=""></p><p>①普通加载图片</p><div class="cnblogs_Highlighter">
<pre class="brush:java;gutter:true;">Picasso.with(PicassoActivity.this)
　　　　.load("http://n.sinaimg.cn/translate/20160819/9BpA-fxvcsrn8627957.jpg")
　　　　.into(ivPicassoResult1);
</pre>
</div><p>②裁剪的方式加载图片</p><div class="cnblogs_Highlighter">
<pre class="brush:java;gutter:true;">Picasso.with(PicassoActivity.this)
　　　　.load("http://n.sinaimg.cn/translate/20160819/9BpA-fxvcsrn8627957.jpg")<br>　　　　.resize(100,100)
　　　　.into(ivPicassoResult1);
</pre>
</div><p>③选择180度</p><div class="cnblogs_Highlighter">
<pre class="brush:java;gutter:true;">Picasso.with(PicassoActivity.this)
　　　　.load("http://n.sinaimg.cn/translate/20160819/9BpA-fxvcsrn8627957.jpg")<br>　　　　.rotate(180)
　　　　.into(ivPicassoResult1);</pre>
</div><p>&nbsp;</p><p><strong>3.ListView<span style="line-height: 1.5">资源加载的方法</span></strong></p><p> - placeholder(xxx). 设置资源加载过程中的显示的Drawable。<br>	- error(xxx).设置load失败时显示的Drawable。<br>	- into(xxx) 设置资源加载到的目标 包括ImageView Target等</p><p>eg:Adapter中getView()方法中</p><div class="cnblogs_Highlighter">
<pre class="brush:java;gutter:true;">// 加载图片
Picasso.with(mContext) .load(Constants.IMAGES[position]) .placeholder(R.drawable.atguigu_logo) .error(R.drawable.atguigu_logo) .into(holder.iv);
</pre>
</div><p>　　</p><p><strong>4.常用工具类</strong></p><p>&nbsp;</p><div class="cnblogs_code"><img id="code_img_closed_33739f81-e7d1-425c-9c0a-cb6ab7195342" class="code_img_closed" src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" alt=""><img id="code_img_opened_33739f81-e7d1-425c-9c0a-cb6ab7195342" class="code_img_opened" style="display: none" src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" alt="">
<div id="cnblogs_code_open_33739f81-e7d1-425c-9c0a-cb6ab7195342" class="cnblogs_code_hide">
<pre><span style="color: #008080"> 1</span> <span style="color: #0000ff">public</span> <span style="color: #0000ff">class</span><span style="color: #000000"> PicassoUtil {
</span><span style="color: #008080"> 2</span>     <span style="color: #008000">//</span><span style="color: #008000">加载本地图片</span>
<span style="color: #008080"> 3</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">void</span> setImg(Context context, <span style="color: #0000ff">int</span><span style="color: #000000"> resId, ImageView imgView){
</span><span style="color: #008080"> 4</span> <span style="color: #000000">        Picasso.with(context)
</span><span style="color: #008080"> 5</span> <span style="color: #000000">                .load(resId)
</span><span style="color: #008080"> 6</span>                 .config(Bitmap.Config.RGB_565)<span style="color: #008000">//</span><span style="color: #008000">8位RGB位图</span>
<span style="color: #008080"> 7</span> <span style="color: #000000">                .fit()
</span><span style="color: #008080"> 8</span> <span style="color: #000000">                .into(imgView);
</span><span style="color: #008080"> 9</span> <span style="color: #000000">    }
</span><span style="color: #008080">10</span>     <span style="color: #008000">//</span><span style="color: #008000">按照一定的宽高加载本地图片，带有加载错误和默认图片</span>
<span style="color: #008080">11</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">void</span> setImg(Context context,<span style="color: #0000ff">int</span> resId,ImageView imgView,<span style="color: #0000ff">int</span> weight,<span style="color: #0000ff">int</span><span style="color: #000000"> height){
</span><span style="color: #008080">12</span> <span style="color: #000000">        Picasso.with(context)
</span><span style="color: #008080">13</span>                 .load(resId)<span style="color: #008000">//</span><span style="color: #008000">加载本地图片</span>
<span style="color: #008080">14</span>                 .config(Bitmap.Config.RGB_565)<span style="color: #008000">//</span><span style="color: #008000">8位RGB位图</span>
<span style="color: #008080">15</span>                 .resize(weight,height)<span style="color: #008000">//</span><span style="color: #008000">设置图片的宽高</span>
<span style="color: #008080">16</span>                 .into(imgView);<span style="color: #008000">//</span><span style="color: #008000">把图片加载到控件上</span>
<span style="color: #008080">17</span> <span style="color: #000000">    }
</span><span style="color: #008080">18</span>     <span style="color: #008000">//</span><span style="color: #008000">加载网络图片到imgview,带有加载错误和默认图片</span>
<span style="color: #008080">19</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">void</span> setImg(Context context, String imgurl, <span style="color: #0000ff">int</span><span style="color: #000000"> resId, ImageView imgView){
</span><span style="color: #008080">20</span> <span style="color: #000000">        Picasso.with(context)
</span><span style="color: #008080">21</span>                 .load(imgurl)<span style="color: #008000">//</span><span style="color: #008000">加载网络图片的url</span>
<span style="color: #008080">22</span>                 .config(Bitmap.Config.RGB_565)<span style="color: #008000">//</span><span style="color: #008000">8位RGB位图</span>
<span style="color: #008080">23</span>                 .placeholder(resId)<span style="color: #008000">//</span><span style="color: #008000">默认图片</span>
<span style="color: #008080">24</span>                 .error(resId)<span style="color: #008000">//</span><span style="color: #008000">加载错误的图片</span>
<span style="color: #008080">25</span>                 .fit()<span style="color: #008000">//</span><span style="color: #008000">图片的宽高等于控件的宽高</span>
<span style="color: #008080">26</span>                 .into(imgView);<span style="color: #008000">//</span><span style="color: #008000">把图片加载到控件上</span>
<span style="color: #008080">27</span> <span style="color: #000000">    }
</span><span style="color: #008080">28</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">void</span><span style="color: #000000"> setImg(Context context, String imgurl, ImageView imgView){
</span><span style="color: #008080">29</span> <span style="color: #000000">        Picasso.with(context)
</span><span style="color: #008080">30</span>                 .load(imgurl)<span style="color: #008000">//</span><span style="color: #008000">加载网络图片的url</span>
<span style="color: #008080">31</span>                 .config(Bitmap.Config.RGB_565)<span style="color: #008000">//</span><span style="color: #008000">8位RGB位图</span>
<span style="color: #008080">32</span>                 .fit()<span style="color: #008000">//</span><span style="color: #008000">图片的宽高等于控件的宽高</span>
<span style="color: #008080">33</span>                 .into(imgView);<span style="color: #008000">//</span><span style="color: #008000">把图片加载到控件上</span>
<span style="color: #008080">34</span> <span style="color: #000000">    }
</span><span style="color: #008080">35</span>     <span style="color: #008000">//</span><span style="color: #008000">加载网络图片到Viewpager</span>
<span style="color: #008080">36</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">void</span><span style="color: #000000"> setImg(Context context, String imgurl, ViewPager imgView){
</span><span style="color: #008080">37</span> <span style="color: #000000">        Picasso.with(context)
</span><span style="color: #008080">38</span>                 .load(imgurl)<span style="color: #008000">//</span><span style="color: #008000">加载网络图片的url</span>
<span style="color: #008080">39</span>                 .config(Bitmap.Config.RGB_565)<span style="color: #008000">//</span><span style="color: #008000">8位RGB位图</span>
<span style="color: #008080">40</span>                 .fit()<span style="color: #008000">//</span><span style="color: #008000">图片的宽高等于控件的宽高</span>
<span style="color: #008080">41</span>                 .into((Target) imgView);<span style="color: #008000">//</span><span style="color: #008000">把图片加载到控件上</span>
<span style="color: #008080">42</span> <span style="color: #000000">    }
</span><span style="color: #008080">43</span>     <span style="color: #008000">//</span><span style="color: #008000">加载网络图片到Viewpager，带有加载错误和默认图片</span>
<span style="color: #008080">44</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">void</span> setImg(Context context, String imgurl, <span style="color: #0000ff">int</span><span style="color: #000000"> resId, ViewPager imgView){
</span><span style="color: #008080">45</span> <span style="color: #000000">        Picasso.with(context)
</span><span style="color: #008080">46</span>                 .load(imgurl)<span style="color: #008000">//</span><span style="color: #008000">加载网络图片的url</span>
<span style="color: #008080">47</span>                 .config(Bitmap.Config.RGB_565)<span style="color: #008000">//</span><span style="color: #008000">8位RGB位图</span>
<span style="color: #008080">48</span>                 .placeholder(resId)<span style="color: #008000">//</span><span style="color: #008000">默认图片</span>
<span style="color: #008080">49</span>                 .error(resId)<span style="color: #008000">//</span><span style="color: #008000">加载错误的图片</span>
<span style="color: #008080">50</span>                 .fit()<span style="color: #008000">//</span><span style="color: #008000">图片的宽高等于控件的宽高</span>
<span style="color: #008080">51</span>                 .into((Target) imgView);<span style="color: #008000">//</span><span style="color: #008000">把图片加载到控件上</span>
<span style="color: #008080">52</span> <span style="color: #000000">    }
</span><span style="color: #008080">53</span>     <span style="color: #008000">//</span><span style="color: #008000">按照设定的宽高加载网络图片到imgview</span>
<span style="color: #008080">54</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">void</span> setImg(Context context, String imgurl,ImageView imgView,<span style="color: #0000ff">int</span> weight,<span style="color: #0000ff">int</span><span style="color: #000000"> height){
</span><span style="color: #008080">55</span> <span style="color: #000000">        Picasso.with(context)
</span><span style="color: #008080">56</span>                 .load(imgurl)<span style="color: #008000">//</span><span style="color: #008000">加载网络图片的url</span>
<span style="color: #008080">57</span>                 .config(Bitmap.Config.RGB_565)<span style="color: #008000">//</span><span style="color: #008000">8位RGB位图</span>
<span style="color: #008080">58</span>                 .resize(weight,height)<span style="color: #008000">//</span><span style="color: #008000">设置图片的宽高</span>
<span style="color: #008080">59</span>                 .into(imgView);<span style="color: #008000">//</span><span style="color: #008000">把图片加载到控件上</span>
<span style="color: #008080">60</span> <span style="color: #000000">    }
</span><span style="color: #008080">61</span>     <span style="color: #008000">//</span><span style="color: #008000">按照设定的宽高加载网络图片到imgview，带有加载错误和默认图片</span>
<span style="color: #008080">62</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">void</span> setImg(Context context, String imgurl, <span style="color: #0000ff">int</span> resId,<span style="color: #0000ff">int</span> weight,<span style="color: #0000ff">int</span><span style="color: #000000"> height, ImageView imgView){
</span><span style="color: #008080">63</span> <span style="color: #000000">        Picasso.with(context)
</span><span style="color: #008080">64</span>                 .load(imgurl)<span style="color: #008000">//</span><span style="color: #008000">加载网络图片的url</span>
<span style="color: #008080">65</span>                 .config(Bitmap.Config.RGB_565)<span style="color: #008000">//</span><span style="color: #008000">8位RGB位图</span>
<span style="color: #008080">66</span>                 .placeholder(resId)<span style="color: #008000">//</span><span style="color: #008000">默认图片</span>
<span style="color: #008080">67</span>                 .error(resId)<span style="color: #008000">//</span><span style="color: #008000">加载错误的图片</span>
<span style="color: #008080">68</span>                 .resize(weight,height)<span style="color: #008000">//</span><span style="color: #008000">设置图片的宽高</span>
<span style="color: #008080">69</span>                 .into(imgView);<span style="color: #008000">//</span><span style="color: #008000">把图片加载到控件上</span>
<span style="color: #008080">70</span> <span style="color: #000000">    }
</span><span style="color: #008080">71</span> }</pre>
</div>
<span class="cnblogs_code_collapse">PicassoUtil</span></div><p>&nbsp;</p><p><strong>5.图片变换</strong></p><p><img src="http://images2015.cnblogs.com/blog/1044471/201611/1044471-20161103225834799-284883798.png" alt="" width="148" height="209"></p><p>在module的gradle中添加转换库:</p><div class="cnblogs_Highlighter">
<pre class="brush:java;gutter:true;">dependencies {
 	compile 'jp.wasabeef:picasso-transformations:2.1.0'
    // If you want to use the GPU Filters
    compile 'jp.co.cyberagent.android.gpuimage:gpuimage-library:1.4.1'
} repositories {
    jcenter()
}
</pre>
</div><p>　　</p><p>Activity中:</p><div class="cnblogs_Highlighter">
<pre class="brush:java;gutter:true;">List&lt;String&gt; data = new ArrayList&lt;&gt;();
for (int i = 1; i&lt;= 36; i++){ data.add(i+"");
}
// 初始化listview
PicassoTransformationsAdapter picassoTransformationsAdapter = new PicassoTransformationsAdapter(PicassoTransfromationsActivity.this,data);
lvPicassoTransfromations.setAdapter(picassoTransformationsAdapter);
</pre>
</div><p><br>PicassoListviewAdapter：</p><div class="cnblogs_Highlighter">
<pre class="brush:java;collapse:true;;gutter:true;">public class PicassoTransformationsAdapter extends BaseAdapter {
    private Context mContext;
    private List&lt;String&gt; mData;     public PicassoTransformationsAdapter(Context context, List&lt;String&gt; data) {
        mContext = context;
        mData = data;
    }     @Override
    public int getCount() {
        return mData == null ? 0 : mData.size();
    }     @Override
    public Object getItem(int position) {
        return null;
    }     @Override
    public long getItemId(int position) {
        return 0;
    }     @Override
    public View getView(int position, View convertView, ViewGroup parent) {         ViewHolder holder;
        if(convertView == null) {
            convertView = View.inflate(mContext, R.layout.item_picasso_transformations,null);             holder = new ViewHolder(convertView);             convertView.setTag(holder);
        }else {
            holder = (ViewHolder) convertView.getTag();
        }         // 显示名称
        holder.name.setText("item"+(position + 1));         int integer = Integer.parseInt(mData.get(position));         switch (integer) {             case 1: {
                int width = Utils.dip2px(mContext, 133.33f);
                int height = Utils.dip2px(mContext, 126.33f);
                Picasso.with(mContext)
                        .load(R.drawable.check)
                        .resize(width, height)
                        .centerCrop()
                        .transform((new MaskTransformation(mContext, R.drawable.mask_starfish)))
                        .into(holder.image);
                break;
            }
            case 2: {
                int width = Utils.dip2px(mContext, 150.0f);
                int height = Utils.dip2px(mContext, 100.0f);
                Picasso.with(mContext)
                        .load(R.drawable.check)
                        .resize(width, height)
                        .centerCrop()
                        .transform(new MaskTransformation(mContext, R.drawable.chat_me_mask))
                        .into(holder.image);
                break;
            }
            case 3:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation(300, 100, CropTransformation.GravityHorizontal.LEFT,
                                CropTransformation.GravityVertical.TOP))
                        .into(holder.image);
                break;
            case 4:
                Picasso.with(mContext).load(R.drawable.demo)
                        // 300, 100, CropTransformation.GravityHorizontal.LEFT, CropTransformation.GravityVertical.CENTER))
                        .transform(new CropTransformation(300, 100)).into(holder.image);
                break;
            case 5:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation(300, 100, CropTransformation.GravityHorizontal.LEFT,
                                CropTransformation.GravityVertical.BOTTOM))
                        .into(holder.image);
                break;
            case 6:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation(300, 100, CropTransformation.GravityHorizontal.CENTER,
                                CropTransformation.GravityVertical.TOP))
                        .into(holder.image);
                break;
            case 7:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation(300, 100))
                        .into(holder.image);
                break;
            case 8:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation(300, 100, CropTransformation.GravityHorizontal.CENTER,
                                CropTransformation.GravityVertical.BOTTOM))
                        .into(holder.image);
                break;
            case 9:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation(300, 100, CropTransformation.GravityHorizontal.RIGHT,
                                CropTransformation.GravityVertical.TOP))
                        .into(holder.image);
                break;
            case 10:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation(300, 100, CropTransformation.GravityHorizontal.RIGHT,
                                CropTransformation.GravityVertical.CENTER))
                        .into(holder.image);
                break;
            case 11:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation(300, 100, CropTransformation.GravityHorizontal.RIGHT,
                                CropTransformation.GravityVertical.BOTTOM))
                        .into(holder.image);
                break;
            case 12:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation((float) 16 / (float) 9,
                                CropTransformation.GravityHorizontal.CENTER,
                                CropTransformation.GravityVertical.CENTER))
                        .into(holder.image);
                break;
            case 13:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation((float) 4 / (float) 3,
                                CropTransformation.GravityHorizontal.CENTER,
                                CropTransformation.GravityVertical.CENTER))
                        .into(holder.image);
                break;
            case 14:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation(3, CropTransformation.GravityHorizontal.CENTER,
                                CropTransformation.GravityVertical.CENTER))
                        .into(holder.image);
                break;
            case 15:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation(3, CropTransformation.GravityHorizontal.CENTER,
                                CropTransformation.GravityVertical.TOP))
                        .into(holder.image);
                break;
            case 16:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation(1, CropTransformation.GravityHorizontal.CENTER,
                                CropTransformation.GravityVertical.CENTER))
                        .into(holder.image);
                break;
            case 17:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation((float) 0.5, (float) 0.5,
                                CropTransformation.GravityHorizontal.CENTER,
                                CropTransformation.GravityVertical.CENTER))
                        .into(holder.image);
                break;
            case 18:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation((float) 0.5, (float) 0.5,
                                CropTransformation.GravityHorizontal.CENTER,
                                CropTransformation.GravityVertical.TOP))
                        .into(holder.image);
                break;
            case 19:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation((float) 0.5, (float) 0.5,
                                CropTransformation.GravityHorizontal.RIGHT,
                                CropTransformation.GravityVertical.BOTTOM))
                        .into(holder.image);
                break;
            case 20:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropTransformation((float) 0.5, 0, (float) 4 / (float) 3,
                                CropTransformation.GravityHorizontal.CENTER,
                                CropTransformation.GravityVertical.CENTER))
                        .into(holder.image);
                break;
            case 21:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropSquareTransformation())
                        .into(holder.image);
                break;
            case 22:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new CropCircleTransformation())
                        .into(holder.image);
                break;
            case 23:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new ColorFilterTransformation(Color.argb(80, 255, 0, 0)))
                        .into(holder.image);
                break;
            case 24:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new GrayscaleTransformation())
                        .into(holder.image);
                break;
            case 25:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new RoundedCornersTransformation(30, 0,
                                RoundedCornersTransformation.CornerType.BOTTOM_LEFT))
                        .into(holder.image);
                break;
            case 26:
                Picasso.with(mContext)
                        .load(R.drawable.check)
                        .transform(new BlurTransformation(mContext, 25, 1))
                        .into(holder.image);
                break;
            case 27:
                Picasso.with(mContext)
                        .load(R.drawable.demo)
                        .transform(new ToonFilterTransformation(mContext))
                        .into(holder.image);
                break;
            case 28:
                Picasso.with(mContext)
                        .load(R.drawable.check)
                        .transform(new SepiaFilterTransformation(mContext))
                        .into(holder.image);
                break;
            case 29:
                Picasso.with(mContext)
                        .load(R.drawable.check)
                        .transform(new ContrastFilterTransformation(mContext, 2.0f))
                        .into(holder.image);
                break;
            case 30:
                Picasso.with(mContext)
                        .load(R.drawable.check)
                        .transform(new InvertFilterTransformation(mContext))
                        .into(holder.image);
                break;
            case 31:
                Picasso.with(mContext)
                        .load(R.drawable.check)
                        .transform(new PixelationFilterTransformation(mContext, 20))
                        .into(holder.image);
                break;
            case 32:
                Picasso.with(mContext)
                        .load(R.drawable.check)
                        .transform(new SketchFilterTransformation(mContext))
                        .into(holder.image);
                break;
            case 33:
                Picasso.with(mContext)
                        .load(R.drawable.check)
                        .transform(new SwirlFilterTransformation(mContext, 0.5f, 1.0f, new PointF(0.5f, 0.5f)))
                        .into(holder.image);                 break;
            case 34:
                Picasso.with(mContext)
                        .load(R.drawable.check)
                        .transform(new BrightnessFilterTransformation(mContext, 0.5f))
                        .into(holder.image);
                break;
            case 35:
                Picasso.with(mContext)
                        .load(R.drawable.check)
                        .transform(new KuwaharaFilterTransformation(mContext, 25))
                        .into(holder.image);
                break;
            case 36:
                Picasso.with(mContext)
                        .load(R.drawable.check)
                        .transform(new VignetteFilterTransformation(mContext, new PointF(0.5f, 0.5f),
                                new float[]{0.0f, 0.0f, 0.0f}, 0f, 0.75f))
                        .into(holder.image);
                break;
        }
        
        return convertView;
    }     class ViewHolder{         @Bind(R.id.iv_picasso)
        ImageView image;         @Bind(R.id.tv_picasso)
        TextView name;         public ViewHolder(View view) {             ButterKnife.bind(this, view);
        }
    }
}
</pre>
</div><p>　　</p>