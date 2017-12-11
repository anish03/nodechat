var express = require('express');
var socket = require('socket.io');
// App setup

var app = express();
var server = app.listen(4000,function(){
	console.log('Server running on port 4000');
});

//Static files

app.use(express.static('public'));

//Socket Setup

var io = socket(server); 

io.on('connection',function(socket){
	console.log('Connection opened at: ',socket.id);

	// Handle chat
	socket.on('chat',function(data){
		io.sockets.emit('chat',data)
	});

	// Handle typing message
	socket.on('typing',function(data){
		socket.broadcast.emit('typing',data);
	});	

});