var netServer = require('net');
netServer.createServer(function (socket) {
    console.log("connected");
    socket.on('data', function (data) {
        var s3URL = data.toString();
        console.log(s3URL);
        // Do work here


        // Add result here
        socket.write("<2>");
    });
}).listen(8078);