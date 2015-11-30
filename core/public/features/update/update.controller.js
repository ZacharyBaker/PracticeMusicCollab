var musicApp = angular.module('musicApp');

musicApp.controller('updateCtrl', ['$scope', 'profileInfo', 'profileService', updateCtrl]);

function updateCtrl($scope, profileInfo, profileService){
	
	$scope.test = 'hella testin this ish';
	$scope.profileInfo = profileInfo;
	
	
	// $scope.userWithUpdates._id = profileInfo._id;
	
	$scope.updateUser = function(profileInfo){
		$scope.profileInfo._id = profileInfo._id;
		profileService.updateUser(profileInfo).then(function(data){
			console.log(data);
			// $scope.profileInfo = {};
			
		})
	}
}