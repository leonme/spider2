// 加载File System读写模块  
var fs = require('fs');  
// 加载编码转换模块  
var iconv = require('iconv-lite');   
  
var file = "c:\\a.txt";  
writeFile(file);  
readFile(file);  
  
function writeFile(file, str){  
    // 测试用的中文  
    var str = "\r\n我是一个人Hello myself!";  
    // 把中文转换成字节数组  
    var arr = iconv.encode(str, 'gbk');  
    console.log(arr);  
      
    // appendFile，如果文件不存在，会自动创建新文件  
    // 如果用writeFile，那么会删除旧文件，直接写新文件  
    fs.appendFile(file, arr, function(err){  
        if(err)  
            console.log("fail " + err);  
        else  
            console.log("写入文件ok");  
    });  
}  
  
function readFile(file){  
    fs.readFile(file, function(err, data){  
        if(err)  
            console.log("读取文件fail " + err);  
        else{  
            // 读取成功时  
            // 输出字节数组  
            console.log(data);  
            // 把数组转换为gbk中文  
            var str = iconv.decode(data, 'gbk');  
            console.log(str);  
        }  
    });  
}  