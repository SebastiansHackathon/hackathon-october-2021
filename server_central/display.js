const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:3000", { query: { sensorId: '0001' } });

ioClient.on("update", (msg) => {
    console.log("received", msg)
    ioClient.emit("client-update", {current_media:"video", timestamp: Date.now(), pir_status: msg.sensor.status, id: "aaa-0002"});
});