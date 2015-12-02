var musicApp = angular.module('musicApp');

musicApp.controller('profileCtrl', ['$scope', 'profileInfo', '$state', 'deckOfUsers', 'profileService', profileCtrl]);

function profileCtrl($scope, profileInfo, $state, deckOfUsers, profileService){
	
	$scope.test = 'this is the sauciest test around';
	
	// console.log(profileInfo);
	$scope.profileInfo = profileInfo;
	
	
	$scope.goToUpdatePage = function(id){
		// console.log('profile.controller, profileInfo._id',profileInfo._id);
		$state.go('update', {
			_id: id
		});
	}
	
	
	$scope.deckOfUsers = deckOfUsers;
	
	
	
	$scope.goToMatchesPage = function(id){
		$state.go('matches', {
			_id: id,
			matchID: $scope.deckOfUsers[0]._id
		})
	}
	
	$scope.findMatches = function(){
		profileService.findMatches($scope.profileInfo)
			.then(function(response){
				console.log('this should be an array of matches', response)
				$scope.matchObjsArr = response;
				
			})
	}
	$scope.findMatches();
	

	
}