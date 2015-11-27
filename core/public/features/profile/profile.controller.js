var musicApp = angular.module('musicApp');

musicApp.controller('profileCtrl', ['$scope', 'profileInfo', '$state', profileCtrl]);

function profileCtrl($scope, profileInfo, $state){
	
	$scope.test = 'this is the sauciest test around';
	
	console.log(profileInfo);
	$scope.profileInfo = profileInfo;
	
	
	$scope.goToUpdatePage = function(id){
		console.log('profile.controller, profileInfo._id',profileInfo._id);
		$state.go('update', {
			_id: id
		});
	}
	
}