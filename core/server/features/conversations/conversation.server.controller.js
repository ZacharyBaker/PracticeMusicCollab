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
			
			.populate('participants')
			.exec(function(err, response){
				// console.log(response);
				if (err) res.status(500).send(err);
				if (response.length === 0){//still not positive this works
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
			
	},
	
	//updateconvo
	
	updateConversation: function(req, res){
		// console.log(req.body);
		Conversation.findByIdAndUpdate(req.params.convoID, {$push: {messages : req.body}}, function(err, result){
			if (err) res.status(500).send(err);
			else res.json(result);
		})
	}
	
}