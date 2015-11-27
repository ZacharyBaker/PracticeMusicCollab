var musicApp = angular.module('musicApp');

musicApp.controller('updateCtrl', ['$scope', 'profileInfo', 'profileService', updateCtrl]);

function updateCtrl($scope, profileInfo, profileService){
	
	$scope.test = 'hella testin this ish';
	$scope.profileInfo = profileInfo;
	
	
	// $scope.userWithUpdates._id = profileInfo._id;
	
	$scope.updateUser = function(userWithUpdates){
		$scope.userWithUpdates._id = profileInfo._id;
		profileService.updateUser(userWithUpdates).then(function(data){
			console.log(data);
			$scope.userWithUpdates = {};
			
		})
	}
}