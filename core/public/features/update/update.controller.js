var musicApp = angular.module('musicApp');

musicApp.controller('updateCtrl', ['$scope', 'profileInfo', 'profileService', '$state', updateCtrl]);

function updateCtrl($scope, profileInfo, profileService, $state){
	$(document).ready(function () {
		$(".button-collapse").sideNav();
	})

	$scope.profileInfo = profileInfo;
	$scope.goToProfile = function(id){
		$state.go('profile', {
			_id: id
		});
	}
	
	// $scope.userWithUpdates._id = profileInfo._id;
	
	$scope.updateUser = function(profileInfo){
		$scope.profileInfo._id = profileInfo._id;
		profileService.updateUser(profileInfo).then(function(data){
			// console.log(data);
			// $scope.profileInfo = {};
			// Materialize.toast('I am a toast', 4000)
		})
	}
}