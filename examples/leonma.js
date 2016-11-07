var _      = require('lodash'),
    Spider = require('../');

var spider = Spider({
  debug      : true,
  workers    : 7,
  concurrency: 1
});

// 加载File System读写模块  
var fs = require('fs');  
// 加载编码转换模块  
var iconv = require('iconv-lite');   
// 加载HTML解析器模块
var htmlparser = require("htmlparser");

var baseFilePath = ".\\pages";  
var artical_index = 0;

var mdContent = '';
var isParagraph = false;
var isLinkText = false;
var isCodeText = false;

var $ = require('jquery')(require("jsdom").jsdom().defaultView);
spider.on('error', function(err, req){
  if (req.worker) {
    console.error('worker #', req.worker, 'has an error:', err.message);
  } else {
    console.error(req.uri, err.message);
  }
});

spider.on('data', function(req, res){
  if (req._type == Spider.type.LINK) {
    spider.read(_.filter(res, validLink));
  } else if (req._type == Spider.type.ARTICLE) {
	var fileFullPath = baseFilePath+"\\page"+artical_index+".md";
	createFile(fileFullPath, res.title);
	writeFile(fileFullPath, res.content);
	artical_index++;
    //console.log(req.uri, res.title);
  }
});
spider.on('end', function(){
  console.log('[END]');
});

spider.crawl([
  'http://www.cnblogs.com/cate/html5/'
]);

/*
 setTimeout(function(){
 spider.crawl([
 'http://getbootstrap.com/components/',
 'https://lodash.com/docs#compact',
 'https://www.npmjs.org/package/read-art'
 ]);
 }, 200);*/

/*
 setTimeout(function(){
 spider.destroy();
 }, 500);*/

setTimeout(function(){
  var pong = spider.ping();
  console.log(pong);
}, 20000);

function validLink(ele){
  if (!ele.uri || !ele.title) {
    return false;
  }
  /**
   * must be:
   * 1. uri must have 4 digital at least
   * 2. uri can not be a bitmap
   * 3. uri can not have no path
   * 4. length of title must greater than 5
   */
  var qsi, uri = ele.uri;
  if ((qsi = uri.indexOf('?')) > 0) {
    uri = uri.substr(0, qsi);
  }
  return uri.match(/\d{4,}/i) && !uri.match(/\.(jpg|png|jpeg|pdf)/i) && uri.indexOf('/') != uri.length - 1 && ele.title.length >= 5;
}

function createFile(file, str){
	var arr = iconv.decode(new Buffer(str), 'utf-8');
	var content = "---\n";
	content += "title: " + arr + "\n";
	content += "date: " + new Date().Format("yyyy-MM-dd hh:mm:ss") + "\n";
	content += "comments: true\n";
	content += "categories: HTML5\n";
	content += "---\n\n";
	content += "#"+ arr + "\n" ;
	console.log('创建文章：'+str);
	fs.writeFile(file, content, function(err){
		if(err)
			console.log('创建文件 '+file+' 失败' + err);
		else
			console.log('创建文件 '+file+' 成功'); 
	});
}

function writeFile(file, str){  
	mdContent = '';
  var handler = new htmlparser.DefaultHandler(function(error, dom) {
    if (error)
        console.log("加载HTML解析器失败", error);
    else
        console.log("加载HTML解析器成功");
  });
  var parser = new htmlparser.Parser(handler);

  parser.parseComplete(str);
  for (var i = 0; i < handler.dom.length; i++) {
    console.log(handler.dom[i]);
    debugger;
    traverseNodes(handler.dom[i])
  }
      // 把中文转换成字节数组  
    var arr = iconv.decode(new Buffer(mdContent), 'utf-8');  
    console.log(arr);  
      
    // appendFile，如果文件不存在，会自动创建新文件  
    // 如果用writeFile，那么会删除旧文件，直接写新文件  
    fs.appendFile(file, arr, function(err){  
        if(err)  
            console.log("续写文件失败 " + err);  
        else  
            console.log("续写文件成功");  
    }); 
}  
  
function readFile(file){  
    fs.readFile(file, function(err, data){  
        if(err)  
            console.log("读取文件失败 " + err);  
        else{  
            // 读取成功时  
            // 输出字节数组  
            console.log(data);  
            // 把数组转换为gbk中文  
            var str = iconv.decode(new Buffer(data), 'gbk');  
            console.log(str);  
        }  
    });  
} 
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function traverseNodes(node) {
    //判断是否是元素节点  
    if (node.type == 'tag') {
        //    display(node);
        if (node.name == 'p') {
            isParagraph = true;
            if (node.children) {
                for (var i = 0; i < node.children.length; i++) {
                    if (node.children[i].type == 'text') {
                        mdContent += node.children[i].data + '\n';
                        console.log('\np: ' + node.children[i].data + '\n');
                    }
                }
            }
        } else if (node.name == 'img') {
            mdContent += '![picture](' + node.attribs.src + ')\n';
        } else if (node.name == 'blockquote') {
            mdContent += '>';
        } else if (node.name == 'a') {
            isLinkText = true;
            if (node.children && node.attribs)
                mdContent += '[' + node.children[0].data + '](' + node.attribs.href + ')\n';
        } else if (node.name == 'br') {
            mdContent += '\n';
        } else if (node.name == 'ul') {

        } else if (node.name == 'li') {

        } else if (node.name == 'code') {
            mdContent += '`';
            isCodeText = true;
            if (node.children) {
              for(var i = 0; i < node.children.length; i++){
                if(node.children[i].type == 'text'){
                  mdContent += node.children[i].data;
                }
              }
            }
            mdContent += '`\n';
        }
        //判断该元素节点是否有子节点  
        if (node.children) {
            //得到所有的子节点  
            var sonnodes = node.children;
            //遍历所哟的子节点  
            for (var i = 0; i < sonnodes.length; i++) {
                //得到具体的某个子节点  
                var sonnode = sonnodes[i];
                //递归遍历  
                traverseNodes(sonnode);
            }
        }
    } else if (node.type == 'text') {
        if (isParagraph) {
            isParagraph = false;
        } else if (isLinkText) {
            isLinkText = false;
        } else if (isCodeText) {
            isCodeText = false;
        } else {
            mdContent += node.data;
        }
    } else {
        //    display(node); 
    }
    fs.writeFile("testParser.txt", mdContent, function(err) {
        if (err)
            console.log("写入内容失败 " + err);
        else
            console.log("写入内容成功");
    });
}