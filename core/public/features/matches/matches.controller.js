var musicApp = angular.module('musicApp');

musicApp.controller('matchesCtrl', ['$scope','deckOfUsers', 'potentialCollaborator', 'matchesService', 'profileInfo', matchesCtrl]);

function matchesCtrl($scope, deckOfUsers, potentialCollaborator, matchesService, profileInfo){
	
	$scope.test = 'you dont have any matches, get some friends breh';
	
	$scope.deckOfUsers = deckOfUsers;
	
	$scope.potentialCollaborator = potentialCollaborator;
	
	$scope.profileInfo = profileInfo;
	
	
	
	$scope.wantsToCollab = function(){//you might need a .then on this for more functioinality
		matchesService.addIdToUserImInterested($scope.profileInfo._id, $scope.potentialCollaborator._id);
	}
	
	
	
	
	
	
	
}