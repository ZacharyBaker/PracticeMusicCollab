var musicApp = angular.module('musicApp');

musicApp.controller('matchesCtrl', ['$scope','deckOfUsers', 'potentialCollaborator', matchesCtrl]);

function matchesCtrl($scope, deckOfUsers, potentialCollaborator){
	
	$scope.test = 'you dont have any matches, get some friends breh';
	
	$scope.deckOfUsers = deckOfUsers;
	
	$scope.potentialCollaborator = potentialCollaborator;
}