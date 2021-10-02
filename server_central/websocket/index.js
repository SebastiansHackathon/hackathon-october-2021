const notifier = require('../utils/notifier');

module.exports =  function (socket) {
    console.log('a user connected', socket.handshake.query.sensorId);

    socket.join(socket.handshake.query.sensorId);

    notifier.on("update", function(data){
        socket.to(socket.handshake.query.sensorId).emit("update", data);
    })    

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

}