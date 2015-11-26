var musicApp = angular.module('musicApp');

musicApp.controller('profileCtrl', ['$scope', 'profileInfo', profileCtrl]);

function profileCtrl($scope, profileInfo){
	
	$scope.test = 'this is the sauciest test around';
	
	console.log(profileInfo);
	$scope.profileInfo = profileInfo;
		
	
}