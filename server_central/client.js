const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:3000", { query: { sensorId: '0001' } });

ioClient.on("update", (msg) => console.info(msg)); 