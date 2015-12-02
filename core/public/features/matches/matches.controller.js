var musicApp = angular.module('musicApp');

musicApp.controller('matchesCtrl', ['$scope','deckOfUsers', 'potentialCollaborator', 'matchesService', 'profileInfo', '$state', matchesCtrl]);

function matchesCtrl($scope, deckOfUsers, potentialCollaborator, matchesService, profileInfo, $state){
	
	$scope.test = 'you dont have any matches, get some friends breh';
	
	$scope.deckOfUsers = deckOfUsers;
	
	$scope.potentialCollaborator = potentialCollaborator;
	
	$scope.profileInfo = profileInfo;
	
	$scope.goToNextPotentialCollaborator = function(){
		$state.go('matches', {
			_id: $scope.profileInfo._id,
			matchID: $scope.deckOfUsers[1]._id
		})
	}
	//FIND A WAY TO CHECK IF WANTS TO COLLAB ALREADY!!
	$scope.wantsToCollab = function(){//you might need a .then on this for more functioinality
		//adds potential collaborator's id to the profile/user's property imInterested [] array
		matchesService.addIdToUserImInterested($scope.profileInfo._id, $scope.potentialCollaborator._id);
		//adds profile/user's id to potential collaborator's property interestedInMe [] array
		matchesService.addIdToCollaboratorInterestedInMe($scope.potentialCollaborator._id, $scope.profileInfo._id);
		//reroutes to next potential collaborator
		$scope.goToNextPotentialCollaborator();
	}
	
	$scope.noThanks = function(){
		//add potential collaborator's id to the profile/user's property notInterested [] array
		matchesService.addToUserNotInterested($scope.profileInfo._id, $scope.potentialCollaborator._id)
	}
	
	
	
	
	
	
}