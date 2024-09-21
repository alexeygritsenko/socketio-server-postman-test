const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
	console.log('Connected');

	socket.on('msg_from_client', function(from,msg){
		console.log('Message is '+from, msg);
	})
	
	socket.on('msg_from_client_json', function(req){
		console.log('Message is '+req.from, req.msg);
	})
	
	socket.on('msg_from_client_reply', function(from,msg){
		console.log('Message is '+from, msg);
		socket.emit('msg_from_client_reply', "reply " + from + " " + msg);
	})
	
	socket.on('disconnect', function(msg){
		console.log('Disconnected');
	})
});

http.listen(3001, function(){
	console.log('Listening to port 3001');
})

let count = 0;
setInterval(function() {

	io.emit('msg_to_client','client','test msg'+count);
	count++;
},5000)
