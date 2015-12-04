var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var ConversationSchema = new Schema ({
	
	
	profileUser: {
		type: String,
		required: true
	},
	collabUser: {
		type: String,
		required: true
	},
	messages: [{type: String}]
	
	
})

module.exports = mongoose.model('Conversation', ConversationSchema);