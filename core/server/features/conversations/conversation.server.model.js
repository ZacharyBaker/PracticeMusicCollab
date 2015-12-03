var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var ConversationSchema = new Schema ({
	
	
	participantA: {
		type: String,
		required: true
	},
	participantB: {
		type: String,
		required: true
	},
	messages: [{type: String}]
	
	
})

module.exports = mongoose.model('Conversation', ConversationSchema);