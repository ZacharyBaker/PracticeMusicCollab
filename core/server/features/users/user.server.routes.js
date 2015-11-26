var Ctrl = require('./user.server.controller');

module.exports = function(app){
	
	app.route('/api/users')
		.post(Ctrl.postUser)
		.get(Ctrl.getUsers);
	
	
	app.route('/api/user')
		.post(Ctrl.getUser);
}