const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, { cors: { origin: '*' } });
var cors = require('cors')

const fileUpload = require('express-fileupload');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

var mongodbutil = require('./utils/mongo');
mongodbutil.connectToServer(function (err) {

    app.use(fileUpload({
        createParentPath: true
    }));
    app.use("/", require("./controllers"));

    //serve uploads files
    app.use('/static', express.static(path.join(__dirname, 'uploads')))

    io.on('connection', require("./websocket"));

    http.listen(3000, function () {
        console.log('listening on *:3000');
    });

});