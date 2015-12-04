var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var ConversationSchema = new Schema ({
	
	
	participants: [{type: String}],
	messages: [{
		sender: {type: String},
		text: {type: String}
	}]
	
	
})

module.exports = mongoose.model('Conversation', ConversationSchema);