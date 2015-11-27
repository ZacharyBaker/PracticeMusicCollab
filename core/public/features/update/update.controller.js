var musicApp = angular.module('musicApp');

musicApp.controller('updateCtrl', ['$scope', 'profileInfo', updateCtrl]);

function updateCtrl($scope, profileInfo){
	
	$scope.test = 'hella testin this ish';
	$scope.profileInfo = profileInfo;
}