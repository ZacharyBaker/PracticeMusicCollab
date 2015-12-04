var Conversation = require('./conversation.server.model');

module.exports = {
	
	getConversations: function(req, res){
		Conversation.find().then(function(response, err){
			if (err) res.status(500).send(err);
			else res.json(response);
		})
	},
	
	postConversation: function(req, res){
		var conversation = new Conversation(req.body);
		conversation.save(function(err, results){
			if (err) res.status(500).send(err);
			else res.json(results)
		})
	},
	
	//---------------------nasty stuff
	
	findConversation: function(req, res){
		Conversation.find({participants: {"$in" : [req.params.userID, req.params.matchID]}})
			.then(function(response, err){
				if (err) res.status(500).send(err);
				else res.json(response);
			})
			
	}
	
}