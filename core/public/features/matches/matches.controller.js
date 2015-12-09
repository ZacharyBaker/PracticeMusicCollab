var musicApp = angular.module('musicApp');

musicApp.controller('matchesCtrl', ['$scope', 'deckOfUsers', 'matchesService', 'profileInfo', '$state', 'socket', matchesCtrl]);

function matchesCtrl($scope, deckOfUsers, matchesService, profileInfo, $state, socket) {

	$(document).ready(function () {
		$(".button-collapse").sideNav();
	})

	$scope.goToProfile = function (id) {
		$state.go('profile', {
			_id: id
		});
	}

	$scope.deckOfUsers = deckOfUsers;

	console.log('before POP', $scope.deckOfUsers);
	console.log('potential collaber', $scope.potentialCollaborator);
	$scope.potentialCollaborator = $scope.deckOfUsers.pop();

	console.log('after POP', $scope.deckOfUsers);
	console.log('potential collaber', $scope.potentialCollaborator);


	$scope.profileInfo = profileInfo;


	$scope.goToNextPotentialCollaborator = function () {
		if ($scope.deckOfUsers.length > 0) {

			$scope.potentialCollaborator = $scope.deckOfUsers.pop();


		} 

	}
	
	
	
	//FIND A WAY TO CHECK IF WANTS TO COLLAB ALREADY!!
	$scope.wantsToCollab = function () {//you might need a .then on this for more functioinality
		//adds potential collaborator's id to the profile/user's property imInterested [] array
		matchesService.addIdToUserImInterested($scope.profileInfo._id, $scope.potentialCollaborator._id);
		//adds profile/user's id to potential collaborator's property interestedInMe [] array
		matchesService.addIdToCollaboratorInterestedInMe($scope.potentialCollaborator._id, $scope.profileInfo._id);
		//WHAT KIND OF TOAST DO WE WANT??
		if (profileInfo.interestedInMe.indexOf($scope.potentialCollaborator._id) !== -1) {
			$scope.toast = Materialize.toast('Matched!', 5000);
			
			socket.emit('matched', $scope.potentialCollaborator._id);
			
			
		} else {
			$scope.toast = Materialize.toast('Awesome!', 3000);
		}
		
		//reroutes to next potential collaborator
		$scope.goToNextPotentialCollaborator();
	}

	$scope.noThanks = function () {
		//add potential collaborator's id to the profile/user's property notInterested [] array
		matchesService.addToUserNotInterested($scope.profileInfo._id, $scope.potentialCollaborator._id).then(function (data) {
			// reroutes to next potential collaborator
			$scope.goToNextPotentialCollaborator();
		})


		$scope.toast = Materialize.toast('No Thanks!', 2000);
	}
	
	// $scope.literalydfkdf = Materialize.toast('BOOTY', 3000);
	
	
	
	
}