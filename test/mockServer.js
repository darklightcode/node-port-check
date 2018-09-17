module.exports = function (port) {

    let net = require('net');
    let server = net.createServer();
    let host = '0.0.0.0';

    server.listen(port, host);

    server.on('listening', function () {
        console.log("Mock Server started on port " + port);
    });

    return server;

};