const notifier = require('../utils/notifier');

var mongodbutil = require('../utils/mongo');
var db = mongodbutil.getDb();

module.exports =  function (socket) {
    console.log('a user connected to', socket.handshake.query.sensorId);

    socket.join(socket.handshake.query.sensorId);

    // pir update
    notifier.on("pir-update", function(data){           
        console.log("weee")
        socket.to(socket.handshake.query.sensorId).emit("update", data);
    })

    // client update
    socket.on("client-update", function(data){      
        console.log("client-update");
        
        //update of the client video and status
        db.collection('displays').updateOne({ id:data.id }, { $addToSet: { history: data } }, function (err, result) {
            if (err) throw err;
            console.log("1 document updated");
        });

    })

    socket.on('disconnect', function () {
        console.log('user disconnected');
        socket.leave(socket.handshake.query.sensorId);
    });

}