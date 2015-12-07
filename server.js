var mongoose = require('mongoose'),
	express = require('./core/server/config/express'),
	mongoUri = 'mongodb://localhost:27017/MusiCollab';

var port = 3000;

var app = express();
var http = require('http').Server(app);
var socketio = require('socket.io');
 

var io = socketio(http);

io.on('connection', function (socket) {
	console.log('a homie has connected via socketio');
	socket.on('message', function(messageObj){
		// console.log('server was just served message:'+ messageObj.text);
		var myID = messageObj.sender;
		var receiverID = messageObj.receiver;
		io.sockets.emit(myID, messageObj);
		io.sockets.emit(receiverID, messageObj);
	});
})


http.listen(port, function () {
	console.log('Listening on port : ' + port);
});


mongoose.connect(mongoUri);
mongoose.connection.once('open', function () {
	console.log('conncected to MongoDB at ' + mongoUri);
})



