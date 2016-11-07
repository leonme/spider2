var fs = require('fs');
var htmlparser = require("htmlparser");
// var rawHtml = '<p style="color: #0000ff",src="sdfaee">现如今SOA微服务风愈演愈烈，越来越多的业务和资源被以服务的形式包装和发布，服务间又可能会依赖其他各种服务。由此而来不可避免的会产生很多问题。</p><img src="'"test.jsp'></img><p>比如一个服务，其依赖了另外30个服务。假设每个服务的可用率都有三个9（99.9%），那么我们计算一下：</p><blockquote><p>99.99%^30 = 99.7%</p></blockquote><a href='dkslangleils/dfksla/fdsalla'>test Hyper Link</a>';
// var rawHtml = '<p>this is the text</p>';
//var rawHtml = '<a href="http://michalbe.blogspot.com/2013/04/javascript-less-known-parts-dom.html">JavaScript: The less know parts.DOM Mutations</a>';
// var rawHtml = '<p>testing<br/></p>';
var rawHtml = '<p  style="color: #0000ff",src="sdfaee">现如今SOA微服务风愈演愈烈，越来越多的业务和资源被以服务的形式包装和发布，服务间又可能会依赖其他各种服务。由此而来不可避免的会产生很多问题。</p><img src="test.jsp"></img><p>比如一个服务，其依赖了另外30个服务。假设每个服务的可用率都有三个9（99.9%），那么我们计算一下：</p><code>public void main(){"Hello World"};</code><blockquote><p>99.99%^30 = 99.7%</p></blockquote><a href="dkslangleils/dfksla/fdsalla">test Hyper Link</a>';
var mdContent = '';
var isParagraph = false;
var isLinkText = false;
var isCodeText = false;
var handler = new htmlparser.DefaultHandler(function(error, dom) {
    if (error)
        console.log("error: ", error);
    else
        console.log("Successfully!");
});
var parser = new htmlparser.Parser(handler);
parser.parseComplete(rawHtml);
//console.log(handler.dom);
for (var i = 0; i < handler.dom.length; i++) {
    console.log(handler.dom[i]);
    traverseNodes(handler.dom[i])
}



function traverseNodes(node) {
    //判断是否是元素节点  
    if (node.type == 'tag') {
        //		display(node);
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
        //		display(node); 
    }
    fs.writeFile("testParser.txt", mdContent, function(err) {
        if (err)
            console.log("写入内容失败 " + err);
        else
            console.log("写入内容成功");
    });
}

function display(node) {
    var msg = "";
    var num = 0;
    msg += (++num) + " nodeName=" + node.name + " nodeValue=" + node.data + " nodeType=" + node.type + "\n";
    console.log("写入解析 " + msg);

}
// console.log("解析 \n" + mdContent);
