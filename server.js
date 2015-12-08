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
	function (accessToken, refreshToken, profile, done) {
		User.findOne({ 'soundcloud.id': profile.id }, function (err, user) {
			//DATABASE OPERATIONS
			console.log('THIS IS PROFILE._json', profile._json);
			if (user) {
				console.log('SoundCloud user found in database: ', user);
				return done(err, user);
			} else {
				console.log('SoundCloud user not found!');
				var scInfo = profile._json;
				user = new User;
				user.username = scInfo.username;
				user.profPic = scInfo.avatar_url;
				user.soundcloud = scInfo;
				user.save();
                done(null, user);
			}

		});
	}
	));
passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});

app.get('/auth/soundcloud',
	passport.authenticate('soundcloud'));

app.get('/auth/redirect',
	passport.authenticate('soundcloud', { failureRedirect: '/' }),
	function (req, res) {
		console.log('req.USERRRRR', req.user);
		
		// Successful authentication, redirect home.
		res.redirect('/#/profile/' + req.user._id);
	});



/////////////////////////////////////////
////////////////SOCKETIO////////////////////
var http = require('http').Server(app);
var socketio = require('socket.io');
var io = socketio(http);
io.on('connection', function (socket) {
	console.log('a homie has connected via socketio');
	socket.on('message', function (messageObj) {
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



