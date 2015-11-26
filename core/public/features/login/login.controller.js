var musicApp = angular.module('musicApp');

musicApp.controller('loginCtrl', ['$scope', 'loginService', '$state', loginCtrl]);

function loginCtrl($scope, loginService, $state) {
	

	//need to make this function (or the function in the service) check to see 
	//if the user already exists, and deny them if it does
	$scope.addNewUser = function (newUser) {
		loginService.addNewUser(newUser).then(function (data) {
			alert('great job pal');
			$scope.newUser.username = '';
			$scope.newUser.email = '';
			$scope.newUser.password = '';
		})
	}

	$scope.tryToLogin = function(oldUser){
		
		loginService.findUser(oldUser).then(function(data){
			console.log(data);
			
			//return this so next part doesn't run
		}, function(err){
			console.log(err);
			alert('user doesnt exist clownboy');
			return err;
		})
		
	}


	$scope.goToProfile = function(id){
		$state.go('profile', {
			_id: id
		});
	}


}