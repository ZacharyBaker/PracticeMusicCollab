var musicApp = angular.module('musicApp');

musicApp.service('profileService', ['$q', '$http', profileService]);

function profileService($q, $http) {

	this.getProfileInfo = function (id) {

		return $http.get('/api/profile/' + id)
			.then(function (response) {
				// console.log('this is the response for profile info', response);
				return response.data;
			}, function (err) {
				console.log(err);
				return err;
			})
	}


	this.updateUser = function (profileInfo) {

		return $http.put('/api/update/' + profileInfo._id, profileInfo)
			.then(function (response) {
				return response.data;
			}, function (err) {
				console.log(err);
				return err;
			})

	}
	//----------FIND MATCHES-----------
	this.findMatches = function (profileInfo) {
		var matchObjsArr = [];
		var matchesArray = [];
		var intArr = profileInfo.imInterested;
		var inMeArr = profileInfo.interestedInMe;
		var myPromise = $q.defer();

		intArr.forEach(function (e) {
			if (inMeArr.indexOf(e) !== -1) {
				matchesArray.push(e);
			}

		})

		matchesArray.forEach(function (e) {

			return $http.get('/api/profile/' + e)
				.then(function (response) {
					var matchObj = response.data;
					matchObjsArr.push(matchObj);
					if (matchObjsArr.length === matchesArray.length) {
						myPromise.resolve(matchObjsArr);
					}
				})

		})


		return myPromise.promise;

	}
	//----------------FIND CONVERSATIONS
	this.findConversations = function (profileInfo, arrOfMatches) {
		var arrOfConvos = [];
		var myPromise = $q.defer();

		arrOfMatches.forEach(function (e) {
			return $http.get('/api/conversations/' + profileInfo._id + '/' + e._id)
				.then(function (response) {//THIS FUNCTION ISN'T GETTING ANYTHINGG
					var convo = response.data;
					// var otherPerson;
					// for(var participant in convo.participants) {
					// 	if(convo.participants[participant].username === e.username) {
					// 		otherPerson = convo.participants[participant].username;
					// 	}
					// }
					// convo.otherPerson = otherPerson;
					arrOfConvos.push(convo);
					myPromise.resolve(arrOfConvos);
					// if (convo.length === 0) {
					// 	//MAKE A NEW CONVO
					// 	return $http.post('/api/conversations', { participants: [profileInfo._id, e._id], messages: [] }, function (err, response) {
					// 		if (err) {
					// 			console.log(err);
					// 			return err;
					// 		}
					// 		else arrOfConvos.push(response.data);
					// 	})
					// }
					// else {
					//if arrOfConvos.lenght === arrOfmatches.length then resovle arrofconvos
					// if (convo.length === arrOfMatches.length) {
					// 	myPromise.resolve(arrOfConvos);

					// }
						// }
				})
		})


		return myPromise.promise;
	}
	//SENDING MESSAGES TO THE BACK
	this.sendMessage = function(messageObj, conversationID){
		return $http.post('/api/conversations/' + conversationID, messageObj)
			.then(function(response){
				console.log('response.data in the profservice after updating ish', response.data);
				return response.data;
			})
	}


}