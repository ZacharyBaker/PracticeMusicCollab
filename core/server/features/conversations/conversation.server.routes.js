var Ctrl = require('./conversation.server.controller');

module.exports = function(app){
	
	app.route('/api/conversations')
		.get(Ctrl.getConversations)
		.post(Ctrl.postConversation);
	
	app.route('/api/conversations/:userID/:matchID')//this is hideous, why wouldn't you just use the conversation id you crazy bird
		.get(Ctrl.findConversation);
		
	app.route('/api/conversations/:convoID')
		.post(Ctrl.updateConversation);
}