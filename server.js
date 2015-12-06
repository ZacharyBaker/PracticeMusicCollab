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
		io.sockets.emit('messageFromServer', messageObj);
	});
})


http.listen(port, function () {
	console.log('Listening on port : ' + port);
});


mongoose.connect(mongoUri);
mongoose.connection.once('open', function () {
	console.log('conncected to MongoDB at ' + mongoUri);
})






// var app = require('express')();
// var http = require('http').Server(app);
// var socketio = require('socket.io');

// var io = socketio(http);

// app.get('/', function (req, res) {
//     res.sendFile(__dirname +'/core/public/index.html');
// });

// io.on('connection', function (socket) {
//     console.log('homie is connected')
//       socket.on('clientSaid', function (message) { // event listener
//           if (message.target === 'luke') {
//               io.emit('serverSaid', message.msg); //
//           } else {
//               console.log('message: ' + message.msg);
//           }

//       });
//       socket.on('chatted', function (ourSomeMessage) {
//           console.log("we received:" + ourSomeMessage);
//       });
// });

// http.listen(3000, function () { // event listener too
//     console.log('listening on port 3000');
// });


