var musicApp = angular.module('musicApp');

musicApp.controller('matchesCtrl', ['$scope', matchesCtrl]);

function matchesCtrl($scope){
	
	$scope.test = 'you dont have any matches, get some friends breh';
	
}