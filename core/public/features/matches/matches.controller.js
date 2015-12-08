var musicApp = angular.module('musicApp');

musicApp.controller('matchesCtrl', ['$scope','deckOfUsers', 'potentialCollaborator', 'matchesService', 'profileInfo', '$state', matchesCtrl]);

function matchesCtrl($scope, deckOfUsers, potentialCollaborator, matchesService, profileInfo, $state){
	
	$(document).ready(function () {
		$(".button-collapse").sideNav();
	})
	
	$scope.test = 'you dont have any matches, get some friends breh';
	
	$scope.deckOfUsers = deckOfUsers;
	
	$scope.potentialCollaborator = potentialCollaborator;
	
	$scope.profileInfo = profileInfo;
	
	$scope.goToProfile = function(id){
		$state.go('profile', {
			_id: id
		});
	}
	
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
		//WHAT KIND OF TOAST DO WE WANT??
		if (profileInfo.interestedInMe.indexOf(potentialCollaborator._id) !== -1){
			$scope.toast = Materialize.toast('Matched!', 5000);
		} else {
			$scope.toast = Materialize.toast('Awesome!', 3000)
		}
		
		//reroutes to next potential collaborator
		$scope.goToNextPotentialCollaborator();
	}
	
	$scope.noThanks = function(){
		//add potential collaborator's id to the profile/user's property notInterested [] array
		matchesService.addToUserNotInterested($scope.profileInfo._id, $scope.potentialCollaborator._id);
		// reroutes to next potential collaborator
		$scope.goToNextPotentialCollaborator();
		$scope.toast = Materialize.toast('No Thanks!', 2000);
	}
	
	// $scope.literalydfkdf = Materialize.toast('BOOTY', 3000);
	
	
	
	
}