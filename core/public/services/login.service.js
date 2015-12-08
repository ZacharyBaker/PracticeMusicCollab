var musicApp = angular.module('musicApp');

musicApp.service('loginService', ['$q', '$http', loginService]);

function loginService($q, $http){
	
	
	this.addNewUser = function(newUser){
		
		return $http.post('/api/users', newUser)
			.then(function(response){
				// console.log(response);
				return response.data;
			}, function(err){
				console.log(err);
				return err;
			});
		
	}
	
	this.findUser = function(oldUser){
		
		return $http.post('/api/user', oldUser)
			 .then(function (response) {
                console.log(response);
                return response.data;
            }, function (error) {
				
                console.log(error);
                return "sorry, there is nobody by that username/password combination";
            });
	}
	
	
}