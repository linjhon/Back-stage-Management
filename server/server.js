var fs = require('fs')
function readImg(path, res) {
  // fs.readFile(path, 'binary', function (err, file) {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   } else {
  //     console.log("输出文件");
  //     //res.writeHead(200,  {'Content-Type':'image/jpeg'});
  //     res.write(file, 'binary');
  //     res.end();
  //   }
  // });
  fs.exists(path, (exists) => {
        if(!exists) {
            // 当文件不存在时
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write("This request URL ' " + path + " ' was not found on this server.");
            res.end();
        } else {
            // 当文件存在时
            fs.readFile(path, "binary", (err, file) => {
                if (err) {
                    // 文件读取出错
                    res.writeHead(500, {"Content-Type": "text/plain"});
                    res.end(err);
                } else {
                    // 当文件可被读取时，输出文本流
                    res.writeHead(200, {
                        'Content-Type': 'image/png'
                    });
                    res.write(file, "binary");
                    res.end();
                }
            });
        }
    });
}

var http = require('http');
http.createServer(function (request, response) { 
  console.log(request.url)  
  if (request.url !== "/favicon.ico") {
    console.log('访问');
    readImg('.'+request.url, response);
    console.log("继续执行");
  }
}).listen(8000);