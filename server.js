const http = require('http');

const requestListener = (req, res)=>{
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
    }
    
    if(req.url=="/todos" && req.method == "GET"){

    }else if(req.url=="/todos" && req.method == "POST"){

    }else if(req.url=="/todos" && req.method == "DELETE"){

    }else if(req.url.startsWith("/todos/") && req.method=="DELETE"){

    }else if(req.url.startsWith("/todos/") && req.method=="PATCH"){

    }else if(req.method == "OPTIONS"){
        res.writeHead(200,headers);
        res.end();
    }else{
        res.writeHead(404,headers);
        res.write(JSON.stringify({
            "status": "false",
            "message": "無此網站路由"
        }));
        res.end();
    }
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);