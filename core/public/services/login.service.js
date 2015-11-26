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
	
	this.findUser = function(oldUser){
		
		return $http.get('/api/user', oldUser)
			 .then(function (response) {
                console.log(response);
				console.log('im a happy baby');//ask someone why this is not 
                return response.data;//logging out, or where it is loggin out
            }, function (error) {
				
                console.log(error);
                return "sorry, there is nobody by that username/password combination";
            });
	}
	
	
}