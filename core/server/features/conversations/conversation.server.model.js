var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var ConversationSchema = new Schema ({
	
	
	participants: [{type: Schema.Types.ObjectId, ref: 'User'}],
	messages: [{
		sender: {type: String},
		text: {type: String}
	}]
	
	
})

module.exports = mongoose.model('Conversation', ConversationSchema);