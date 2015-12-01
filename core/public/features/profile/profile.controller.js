var musicApp = angular.module('musicApp');

musicApp.controller('profileCtrl', ['$scope', 'profileInfo', '$state', 'deckOfUsers', profileCtrl]);

function profileCtrl($scope, profileInfo, $state, deckOfUsers){
	
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
	

	
}