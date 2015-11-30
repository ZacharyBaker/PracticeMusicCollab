var musicApp = angular.module('musicApp');

musicApp.service('profileService', ['$q', '$http', profileService]);

function profileService($q, $http){
	
	this.getProfileInfo = function(id){

		return $http.get('/api/profile/' + id)
			.then(function(response){
				console.log('this is the response for profile info', response);
				return response.data;
			}, function(err){
				console.log(err);
				return err;
			})
	}
	
	
	this.updateUser = function(profileInfo){
		
		return $http.put('/api/update/' + profileInfo._id, profileInfo)
			.then(function(response){
				return response.data;
			}, function(err){
				console.log(err);
				return err;
			})
		
	}
	
}