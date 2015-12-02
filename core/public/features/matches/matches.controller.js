var musicApp = angular.module('musicApp');

musicApp.controller('matchesCtrl', ['$scope','deckOfUsers', 'potentialCollaborator', 'matchesService', 'profileInfo', matchesCtrl]);

function matchesCtrl($scope, deckOfUsers, potentialCollaborator, matchesService, profileInfo){
	
	$scope.test = 'you dont have any matches, get some friends breh';
	
	$scope.deckOfUsers = deckOfUsers;
	
	$scope.potentialCollaborator = potentialCollaborator;
	
	$scope.profileInfo = profileInfo;
	
	
	
	// $scope.wantsToCollab = function(){
	// 	matchesService.addIdToUsersImInterested($scope.profileInfo_id, $scope.potentialCollaborator._id);
	// }
	
	
	
	
	
	
	
}