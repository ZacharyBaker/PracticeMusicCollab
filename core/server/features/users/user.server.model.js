//Set up schema for each user

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var UserSchema = new Schema({
	
	username: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	genre: {
		type: String//MAKE THIS ENUM LATER SO THEY CAN JUST CHOOSE FROM A LIST
	},// THAT MIGHT MAKE IT EASIER FOR SOMEONE TO SORT THROUGH PEOPLE THEY DON'T WANT
	instruments: [{
		type: String
	}],
	soundcloud: {
		type: String
	},
	requests: [{
		type: Schema.Types.ObjectId, ref: 'Requests'// make sure and make this collection :)
	}]
})

module.exports = mongoose.model('User', UserSchema);