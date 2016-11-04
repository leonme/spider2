var _      = require('lodash'),
    Spider = require('../');

var spider = Spider({
  debug      : true,
  workers    : 7,
  concurrency: 1
});

// ??File System????  
var fs = require('fs');  
// ????????  
var iconv = require('iconv-lite');   
  
var baseFilePath = "./pages_source";  
var artical_index = 0;
var $ = require('jquery')(require("jsdom").jsdom().defaultView);
var htmlparser = require("htmlparser");

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
	var arr = iconv.encode(str, 'utf-8');
	var content = "---\n";
	content += "title: " + arr + "\n";
	content += "date: " + new Date().Format("yyyy-MM-dd hh:mm:ss") + "\n";
	content += "comments: true\n";
	content += "categories: HTML5\n";
	content += "---\n\n";
	content += "#"+ arr + "\n" ;
	console.log('????:'+str);
	fs.writeFile(file, content, function(err){
		if(err)
			console.log("???? " + err);
		else
			console.log("????ok"); 
	});
}
function writeFile(file, str){  
    // ??????????  
//	$("body").append(str);
//	var pageContent = '';
//	$("p").each(function(){
//		pageContent += this.textContent + "\n";
//	});
    var rawHtml = iconv.encode(str, 'utf-8');  
    console.log(rawHtml);  
	var handler = new htmlparser.DefaultHandler(function (error, dom) {
		if (error)
			console.log("htmlHandler创建失败: ", error);
		else
			console.log("htmlHandler创建成功!");
	});
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(rawHtml);
	

      
    // appendFile,???????,????????  
    // ???writeFile,????????,??????  
    fs.appendFile(file, rawHtml, function(err){
        if(err)  
            console.log("写入文章内容失败 " + err);  
        else  
            console.log("写入文章内容ok");  
    }); 
//	var root = document.documentElement; 
	traverseNodes(handler.dom, file);
//	$("body").empty();
}  
  
function readFile(file){  
    fs.readFile(file, function(err, data){  
        if(err)  
            console.log("????fail " + err);  
        else{  
            // ?????  
            // ??????  
            console.log(data);  
            // ??????gbk??  
            var str = iconv.decode(data, 'gbk');  
            console.log(str);  
        }  
    });  
} 
// ?Date???,? Date ????????String
// ?(M)??(d)???(h)??(m)??(s)???(q) ??? 1-2 ????, 
// ?(y)??? 1-4 ????,??(S)??? 1 ????(? 1-3 ????) 
// ??: 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //?? 
        "d+": this.getDate(), //? 
        "h+": this.getHours(), //?? 
        "m+": this.getMinutes(), //? 
        "s+": this.getSeconds(), //? 
        "q+": Math.floor((this.getMonth() + 3) / 3), //?? 
        "S": this.getMilliseconds() //?? 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function traverseNodes(node, file){  
	  
	//判断是否是元素节点  
	if(node.nodeType == 1){  
		display(node, file);  
		//判断是否有属性节点  
		for(var i=0;i<node.attributes.length;i++){  
			//得到属性节点  
			var attr = node.attributes.item(i);  
			//判断该节点是否存在  
			if(attr.specified){  
				//如果存在 显示输出  
				display(attr, file);  
			}  
		}  
		  
		//判断该元素节点是否有子节点  
		if(node.hasChildNodes){  
			//得到所有的子节点  
			var sonnodes = node.childNodes;  
			//遍历所哟的子节点  
			for (var i = 0; i < sonnodes.length; i++) {  
				//得到具体的某个子节点  
				var sonnode = sonnodes.item(i);  
				//递归遍历  
				traverseNodes(sonnode, file);  
			}  
		}  
	}else{  
		display(node, file);  
	}  
}  
	
function display(node, file){  
	var msg = "";  
	var num=0;
	msg+=(++num)+" nodeName="+node.nodeName+" nodeValue="+node.nodeValue+" nodeType="+node.nodeType+"\n";  
	fs.appendFile(file, msg, function(err){  
        if(err)  
            console.log("写入解析失败 " + err);  
        else  
            console.log("写入解析ok");  
    }); 
} 