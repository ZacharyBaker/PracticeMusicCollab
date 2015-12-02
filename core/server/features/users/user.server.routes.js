var Ctrl = require('./user.server.controller');

module.exports = function(app){
	
	app.route('/api/users')
		.post(Ctrl.postUser)//used by login.service
		.get(Ctrl.getUsers);
	
	
	app.route('/api/user')//used by login.service
		.post(Ctrl.getUserByEmailAndPassword);
		
	app.route('/api/profile/:id')//used by profile.service
		.get(Ctrl.getUserById)
		.delete(Ctrl.destroyById);
		
	app.route('/api/update/:id')
		.put(Ctrl.updateUserById);
		
	app.route('/api/iminterested/update/:id')
		.post(Ctrl.updateImInterested);
		
	app.route('/api/interestedinme/update/:id')
		.post(Ctrl.updateInterestedInMe);
		
	app.route('/api/notinterested/update/:id')
		.post(Ctrl.updateNotInterested);
}