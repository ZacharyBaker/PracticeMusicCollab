var mongoose = require('mongoose'),
	express = require('./core/server/config/express'),
	mongoUri = 'mongodb://localhost:27017/MusiCollab';
	

var port = 4001;




var app = express();
 




app.listen(port, function(){
	console.log('Listening on port : ' + port);
})


mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
	console.log('conncected to MongoDB at ' + mongoUri);
})



