var musicApp = angular.module('musicApp');

musicApp.controller('matchesCtrl', ['$scope','deckOfUsers', matchesCtrl]);

function matchesCtrl($scope, deckOfUsers){
	
	$scope.test = 'you dont have any matches, get some friends breh';
	
	$scope.deckOfUsers = deckOfUsers;
	
}