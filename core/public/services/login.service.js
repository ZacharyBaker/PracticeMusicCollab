var musicApp = angular.module('musicApp');

musicApp.service('loginService', ['$q', '$http', loginService]);

function loginService($q, $http){
	
	
	this.addNewUser = function(newUser){
		
		return $http.post('/api/users', newUser)
			.then(function(response){
				console.log(response);
				return "user added!"
			}, function(err){
				console.log(err);
				return err;
			});
		
	}
	
	
}