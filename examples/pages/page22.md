---
title: Picasso ganchuanpu
date: 2016-11-07 15:51:48
comments: true
categories: HTML5
---

#Picasso ganchuanpu
Picasso是Square公司出品的一个强大的图片下载和缓存图片库
1）在adapter中需要取消已经不在视野范围的ImageView图片资源的加载，否则会导致图片错位，Picasso已经解决了这个问题。
2）使用复杂的图片压缩转换来尽可能的减少内存消耗
3）自带内存和硬盘二级缓存功能

1）在adapter中需要取消已经不在视野范围的ImageView图片资源的加载，否则会导致图片错位，Picasso已经解决了这个问题。
2）使用复杂的图片压缩转换来尽可能的减少内存消耗
3）自带内存和硬盘二级缓存功能&nbsp;
![picture](http://images2015.cnblogs.com/blog/1044471/201611/1044471-20161103222330440-1256902303.png)
①普通加载图片

Picasso.with(PicassoActivity.this)
　　　　.load("http://n.sinaimg.cn/translate/20160819/9BpA-fxvcsrn8627957.jpg")
　　　　.into(ivPicassoResult1);

②裁剪的方式加载图片

Picasso.with(PicassoActivity.this)
　　　　.load("http://n.sinaimg.cn/translate/20160819/9BpA-fxvcsrn8627957.jpg")
　　　　.resize(100,100)
　　　　.into(ivPicassoResult1);　　
③选择180度

Picasso.with(PicassoActivity.this)
　　　　.load("http://n.sinaimg.cn/translate/20160819/9BpA-fxvcsrn8627957.jpg")
　　　　.rotate(180)
　　　　.into(ivPicassoResult1);


资源加载的方法 - placeholder(xxx). 设置资源加载过程中的显示的Drawable。
	- error(xxx).设置load失败时显示的Drawable。
	- into(xxx) 设置资源加载到的目标 包括ImageView Target等
	
	- error(xxx).设置load失败时显示的Drawable。
	- into(xxx) 设置资源加载到的目标 包括ImageView Target等eg:Adapter中getView()方法中

// 加载图片
Picasso.with(mContext) .load(Constants.IMAGES[position]) .placeholder(R.drawable.atguigu_logo) .error(R.drawable.atguigu_logo) .into(holder.iv);


&nbsp;
![picture](http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif)
![picture](http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif)

```java
 1 public class PicassoUtil {
 2     //加载本地图片
 3     public static void setImg(Context context, int resId, ImageView imgView){
 4         Picasso.with(context)
 5                 .load(resId)
 6                 .config(Bitmap.Config.RGB_565)//8位RGB位图
 7                 .fit()
 8                 .into(imgView);
 9     }
10     //按照一定的宽高加载本地图片，带有加载错误和默认图片
11     public static void setImg(Context context,int resId,ImageView imgView,int weight,int height){
12         Picasso.with(context)
13                 .load(resId)//加载本地图片
14                 .config(Bitmap.Config.RGB_565)//8位RGB位图
15                 .resize(weight,height)//设置图片的宽高
16                 .into(imgView);//把图片加载到控件上
17     }
18     //加载网络图片到imgview,带有加载错误和默认图片
19     public static void setImg(Context context, String imgurl, int resId, ImageView imgView){
20         Picasso.with(context)
21                 .load(imgurl)//加载网络图片的url
22                 .config(Bitmap.Config.RGB_565)//8位RGB位图
23                 .placeholder(resId)//默认图片
24                 .error(resId)//加载错误的图片
25                 .fit()//图片的宽高等于控件的宽高
26                 .into(imgView);//把图片加载到控件上
27     }
28     public static void setImg(Context context, String imgurl, ImageView imgView){
29         Picasso.with(context)
30                 .load(imgurl)//加载网络图片的url
31                 .config(Bitmap.Config.RGB_565)//8位RGB位图
32                 .fit()//图片的宽高等于控件的宽高
33                 .into(imgView);//把图片加载到控件上
34     }
35     //加载网络图片到Viewpager
36     public static void setImg(Context context, String imgurl, ViewPager imgView){
37         Picasso.with(context)
38                 .load(imgurl)//加载网络图片的url
39                 .config(Bitmap.Config.RGB_565)//8位RGB位图
40                 .fit()//图片的宽高等于控件的宽高
41                 .into((Target) imgView);//把图片加载到控件上
42     }
43     //加载网络图片到Viewpager，带有加载错误和默认图片
44     public static void setImg(Context context, String imgurl, int resId, ViewPager imgView){
45         Picasso.with(context)
46                 .load(imgurl)//加载网络图片的url
47                 .config(Bitmap.Config.RGB_565)//8位RGB位图
48                 .placeholder(resId)//默认图片
49                 .error(resId)//加载错误的图片
50                 .fit()//图片的宽高等于控件的宽高
51                 .into((Target) imgView);//把图片加载到控件上
52     }
53     //按照设定的宽高加载网络图片到imgview
54     public static void setImg(Context context, String imgurl,ImageView imgView,int weight,int height){
55         Picasso.with(context)
56                 .load(imgurl)//加载网络图片的url
57                 .config(Bitmap.Config.RGB_565)//8位RGB位图
58                 .resize(weight,height)//设置图片的宽高
59                 .into(imgView);//把图片加载到控件上
60     }
61     //按照设定的宽高加载网络图片到imgview，带有加载错误和默认图片
62     public static void setImg(Context context, String imgurl, int resId,int weight,int height, ImageView imgView){
63         Picasso.with(context)
64                 .load(imgurl)//加载网络图片的url
65                 .config(Bitmap.Config.RGB_565)//8位RGB位图
66                 .placeholder(resId)//默认图片
67                 .error(resId)//加载错误的图片
68                 .resize(weight,height)//设置图片的宽高
69                 .into(imgView);//把图片加载到控件上
70     }
71 }
```
PicassoUtil 
![picture](http://images2015.cnblogs.com/blog/1044471/201611/1044471-20161103225834799-284883798.png)
在module的gradle中添加转换库:
```java
dependencies {
 	compile 'jp.wasabeef:picasso-transformations:2.1.0'
    // If you want to use the GPU Filters
    compile 'jp.co.cyberagent.android.gpuimage:gpuimage-library:1.4.1'
} repositories {
    jcenter()
}
```
Activity中:
```java
List&lt;String&gt; data = new ArrayList&lt;&gt;();
for (int i = 1; i&lt;= 36; i++){ data.add(i+"");
}
// 初始化listview
PicassoTransformationsAdapter picassoTransformationsAdapter = new PicassoTransformationsAdapter(PicassoTransfromationsActivity.this,data);
lvPicassoTransfromations.setAdapter(picassoTransformationsAdapter);
```
PicassoListviewAdapter：

```java
public class PicassoTransformationsAdapter extends BaseAdapter {
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
```

