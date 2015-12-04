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
	this.findMatches = function(profileInfo){
		var matchObjsArr = [];
		var matchesArray = [];
		var intArr = profileInfo.imInterested;
		var inMeArr = profileInfo.interestedInMe;
		var myPromise = $q.defer();
		
		intArr.forEach(function(e){
			if(inMeArr.indexOf(e) !== -1){
				matchesArray.push(e);
			}
			
		})
		
		matchesArray.forEach(function(e){
			return $http.get('/api/profile/' + e)
				.then(function(response){
					var matchObj = response.data;
					matchObjsArr.push(matchObj);
					
				})
		})
		
		myPromise.resolve(matchObjsArr);
		return myPromise.promise;
		
	}
	//----------------FIND CONVERSATIONS
	this.findConversations = function(profileInfo, arrOfMatches){
		var arrOfConvos = [];
		var myPromise = $q.defer();
		
		arrOfMatches.forEach(function(e){
			return $http.get('/api/conversations/' + profileInfo._id + '/' + e._id)
				.then(function(response){//does this need to be response.data? to find the right info?
					//maybe make a var for response.data? depending on what it is 
					
					if (response.length === 0){
						//MAKE A NEW CONVO
						return $http.post('/api/conversations', {participants: [profileInfo._id, e._id], messages: [] }, function(err, response){
							if (err) {
								console.log(err);
								return err;
							}
							else arrOfConvos.push(response);//or response.data
						})
					}
					else {
						arrOfConvos.push(response)
					}
				})
		})
		
		
		myPromise.resolve(arrOfConvos);
		return myPromise.promise;
	}
	

}