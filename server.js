var mongoose = require('mongoose'),
	express = require('./core/server/config/express'),
	mongoUri = 'mongodb://localhost:27017/MusiCollab';
//passport
var passport = require('passport'),
	session = require('express-session'),
	SoundCloudStrategy = require('passport-soundcloud').Strategy,
	keys = require('./keys'),
	User = require('./core/server/features/users/user.server.model');

var port = 3000;
var app = express();
////////////SOUNDCLOUD//////////////////////
app.use(passport.initialize());
app.use(passport.session());

passport.use(new SoundCloudStrategy({
    clientID: keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: "http://localhost:3000/auth/redirect"///what should i use here??
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ soundcloudId: profile.id }, function (err, user) {
     //DATABASE OPERATIONS
	 console.log(profile);
	 
	 
	  // return done(err, user);
    // });//what does this findOrCreate function do??
  }
));

app.get('/auth/soundcloud',
  passport.authenticate('soundcloud'));

app.get('/auth/redirect', 
  passport.authenticate('soundcloud', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');//THIS NEEDS TO BE CHANGED TO REDIRECT TO PROFILE PAGE OR SOMETHING ELSE
  });



/////////////////////////////////////////
////////////////SOCKETIO////////////////////
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
////////////////////////////////////////////

http.listen(port, function () {
	console.log('Listening on port : ' + port);
});


mongoose.connect(mongoUri);
mongoose.connection.once('open', function () {
	console.log('conncected to MongoDB at ' + mongoUri);
})



