const express = require('express');
const app = express();
app.use(express.static('public')); 
const http = require('http').Server(app);
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/default.html');
});

http.listen(port, function() {
    console.log('listening on *: ' + port);
});

// setup my socket server
const io = require('socket.io')(http);
 
io.on('connection', function(socket) {
    console.log('new connection');

    // Called when the client calls socket.emit("move")
    socket.on("move", function(msg){
        socket.broadcast.emit("move", msg)
    });
});