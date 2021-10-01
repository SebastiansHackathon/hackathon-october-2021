var express = require('express')
var router = express.Router()

var WebSocketServer  = require('ws').Server;

var wss = new WebSocketServer({port: 3030});

wss.on('connection', function(){
    wss.send(JSON.stringify('Socket open'));
});

wss.on('close', function(){
    console.log('WebServerSocket has been closed');
});

router.post('/update', (request, response) => {
    console.log(request.body);

    console.log(wss)

    

    response.send("Success");
});

module.exports = router