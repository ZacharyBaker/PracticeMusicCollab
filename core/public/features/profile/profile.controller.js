var musicApp = angular.module('musicApp');

musicApp.controller('profileCtrl', ['$scope', profileCtrl]);

function profileCtrl($scope){
	
	$scope.test = 'this is the sauciest test around';
	
}