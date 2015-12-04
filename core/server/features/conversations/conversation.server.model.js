var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var ConversationSchema = new Schema ({
	
	
	sender: {
		type: String,
		required: true
	},
	reciever: {
		type: String,
		required: true
	},
	messages: [{type: String}]
	
	
})

module.exports = mongoose.model('Conversation', ConversationSchema);