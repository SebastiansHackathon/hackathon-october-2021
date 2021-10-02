const express = require("express");
const bodyParser = require("body-parser");

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongodbutil = require('./utils/mongo');
mongodbutil.connectToServer(function (err) {

    app.use("/", require("./controllers"));

    io.on('connection', require("./websocket"));

    http.listen(3000, function () {
        console.log('listening on *:3000');
    });

});