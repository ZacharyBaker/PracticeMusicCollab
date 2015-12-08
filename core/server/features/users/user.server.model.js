//Set up schema for each user

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var UserSchema = new Schema({
	
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profPic: {
		type: String
	},	
	genre: {
		type: String//MAKE THIS ENUM LATER SO THEY CAN JUST CHOOSE FROM A LIST
	},// THAT MIGHT MAKE IT EASIER FOR SOMEONE TO SORT THROUGH PEOPLE THEY DON'T WANT
	instruments: [{
		type: String
	}],
	bio: {
		type: String,
		maxlength: 200
	},
	soundcloud: {
		type: Object
	},
	notInterested: [{
		type: String//this will be an id	
	}],
	imInterested: [{
		type: String//also an id	
	}],
	interestedInMe: [{
		type: String// also an id	
	}],
	conversations: [{
		type: Schema.Types.ObjectId, ref: 'Conversation'// make sure and make this collection :)
	}]
});

module.exports = mongoose.model('User', UserSchema);