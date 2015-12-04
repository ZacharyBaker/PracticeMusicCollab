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
		Conversation.find({participants: {$all : [req.params.userID, req.params.matchID]}})
			// .where({participants: {$in: [req.params.userID]}})
			// .where({participants: {$in: [req.params.matchID]}})
			.populate('participants')
			.exec(function(err, response){
				console.log(response);
				if (err) res.status(500).send(err);
				if (response.length === 0){
					var newConvo = new Conversation({participants: [req.params.userID, req.params.matchID], messages: []});
					newConvo.save(function(err, results){
						if (err) res.status(500).send(err);
						else res.json(results);
					})
					
				}
				else {
					res.json(response);
				}
			})
			
	}
	
}