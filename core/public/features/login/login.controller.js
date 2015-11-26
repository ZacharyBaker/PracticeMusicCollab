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

	$scope.goToProfile = function(id){
		$state.go('profile', {
			_id: id
		});
	}

	$scope.tryToLogin = function(oldUser){
		
		loginService.findUser(oldUser).then(function(data){
			console.log('This is the data returned to the controller', data);
			$scope.oldUser.email = '';
			$scope.oldUser.password = '';
			
			$scope.goToProfile(data[0]._id)
			
			$scope.username = data[0].username;
		}
		// , function(error){
		// 	console.log(error);
		// 	alert('user doesnt exist clownboy');
		// 	return error;
		// }
		)
		
	}


	


}