var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

var clients = 0;
io.on('connection', function (socket) {

    clients++;

    io.sockets.emit('broadcast', {
        description: clients + ' clients connected !'
    })


    console.log('A user connected');

    socket.on('clientToServerEvent', function (data) {
        console.log(data);
    })

    setInterval(function () {
        socket.send('Sent a message 4 seconds after connection')
    }, 4000);

    setInterval(function () {
        socket.emit('testerevent', {
            description: 'A Custom Testing Event Emitted'
        })
    }, 2000);

    socket.on('disconnect', function () {
        clients--;
        console.log('A user disconnected');
        io.sockets.emit('broadcast', {
            description: clients + ' clients connected'
        })
    })

    // socket.broadcast.emit            // for the only new client who initate it.

    

})

http.listen(3000, '127.0.0.1', function () {
    console.log('listening on port :3000');
})