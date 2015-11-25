//EXPRESS CONFIGURATION FILE

var express = require('express'),
	cors = require('cors'),
	bodyParser = require('body-parser');
	
	
module.exports = function(){
	
	var app = express();
	

	
	//MIDDLEWARE
	app.use(cors());
	app.use(bodyParser.json());
	
	
	//CONFIGURE THE ROUTES
	require('../features/users/user.server.routes')(app);
	
	//root of angular app
	app.use(express.static('./core/public'));
	
	
	return app;
	
	
}