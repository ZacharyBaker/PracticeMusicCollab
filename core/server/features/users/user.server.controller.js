// require the user model

var User = require('./user.server.model');

module.exports = {
	
	postUser: function(req, res, next){
		var user = new User(req.body);
		user.save(function(err, result){
			if (err) res.status(500).send(err);
			else res.json(result);
		});
	},
	
	//NOT SURE IF I NEED THIS BUT I'M USING IT TO TEST THE GET
	
	getUsers: function(req, res, next){
		
		User.find().then(function(response, err){
			if (err) res.status(500).send(err);
			else res.json(response);
		})
		
	},
	//-------------
	
	getUser: function(req, res, next){
		
		User.find()
			.where('email').equals(req.body.email)
			.where('password').equals(req.body.password)
			.exec()
			.then(function(response, err){
				if (response) res.json(response);
				else res.status(500).send(err);
			})	
	}
	
	
}