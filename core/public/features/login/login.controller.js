var musicApp = angular.module('musicApp');

musicApp.controller('loginCtrl', ['$scope', loginCtrl]);

function loginCtrl($scope){
	
	$scope.test = 'this is our saucy login test';
	
}