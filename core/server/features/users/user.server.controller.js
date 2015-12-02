// require the user model

var User = require('./user.server.model');

module.exports = {

	postUser: function (req, res, next) {
		var user = new User(req.body);
		user.save(function (err, result) {
			if (err) res.status(500).send(err);
			else res.json(result);
		});
	},
	
	//NOT SURE IF I NEED THIS BUT I'M USING IT TO TEST THE GET
	
	getUsers: function (req, res, next) {

		User.find().then(function (response, err) {
			if (err) res.status(500).send(err);
			else res.json(response);
		})

	},
	//-------------
	
	getUserByEmailAndPassword: function (req, res, next) {

		User.find()
			.where('email').equals(req.body.email)
			.where('password').equals(req.body.password)
			.exec()
			.then(function (response, err) {
				if (response) res.json(response);
				else res.status(500).send(err);
			})
	},

	getUserById: function (req, res, next) {


		User.findById(req.params.id)
			.exec()
			.then(function (response, err) {
				if (response) res.json(response);
				else res.status(500).send(err);
			})
	},

	updateUserById: function (req, res, next) {

		User.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
			if (err) res.status(500).send(err);
			else res.json(result);
		})

	},

	destroyById: function (req, res, next) {
		User.findById(req.params.id)
			.remove(function(err){
				if (err) res.status(500).send('this is an error', err);
				else res.status(204).send('Removed!');//where is this sending to?
			})
	},
	
	chickenJoe: function(req, res, next){
		var id = req.body.id
		User.findByIdAndUpdate(req.params.id, {$push: {imInterested: id}}, function(err, result){
			if (err) res.status(500).send(err);//$PUSH check miles' slack 
			else res.json(result);
		})
	}


}