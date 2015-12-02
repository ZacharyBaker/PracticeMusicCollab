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
		})//WORKING ON $Q 
		//LOOK AT LUKES SLACK
		//FIGURE OUT .RESOLVE
		
		// return matchObjsArr;
		
		
		
		
	}

}