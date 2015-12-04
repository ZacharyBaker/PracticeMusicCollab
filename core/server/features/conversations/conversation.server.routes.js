var Ctrl = require('./conversation.server.controller');

module.exports = function(app){
	
	app.route('/api/conversations')
		.get(Ctrl.getConversations)
		.post(Ctrl.postConversation);
	
}