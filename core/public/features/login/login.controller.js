var musicApp = angular.module('musicApp');

musicApp.controller('loginCtrl', ['$scope', 'loginService', loginCtrl]);

function loginCtrl($scope, loginService){
	

//need to make this function (or the function in the service) check to see 
//if the user already exists, and deny them if it does
$scope.addNewUser = function(newUser){
	loginService.addNewUser(newUser).then(function(data){
		alert('great job pal');
	})
}



	
}