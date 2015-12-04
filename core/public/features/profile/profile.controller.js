var musicApp = angular.module('musicApp');

musicApp.controller('profileCtrl', ['$scope', 'profileInfo', '$state', 'deckOfUsers', 'profileService', 'socket', profileCtrl]);

function profileCtrl($scope, profileInfo, $state, deckOfUsers, profileService, socket) {//add socket service to dis
	

	

	
	// console.log(profileInfo);
	$scope.profileInfo = profileInfo;
	$scope.deckOfUsers = deckOfUsers;


	$scope.goToUpdatePage = function (id) {
		// console.log('profile.controller, profileInfo._id',profileInfo._id);
		$state.go('update', {
			_id: id
		});
	}

	$scope.goToMatchesPage = function (id) {
		$state.go('matches', {
			_id: id,
			matchID: $scope.deckOfUsers[0]._id
		})
	}





	$scope.findMatches = function () {
		profileService.findMatches($scope.profileInfo)
			.then(function (response) {
				$scope.matchObjsArr = response;
				console.log('this should be an array of match Objects', $scope.matchObjsArr);
				//call findConversations in here!!!!!
				$scope.findConversations();
			})
	}
	$scope.findMatches();//maybe do a .then(findConversations()); read code above
	
	$scope.findConversations = function(){
		profileService.findConversations($scope.profileInfo, $scope.matchObjsArr)
			.then(function(response){
				$scope.arrOfConvos = response;
				console.log('$scope.arrOfConvos', $scope.arrOfConvos);
			})
	}
	
	//WORKING ON INDIVIDUAL CONVERSATOIONS
	$scope.submitMessage = function(){
		
	}
	
	
	
	
	// socket testing ------------------------------------------
	// $scope.messages = [
	// 	{
	// 		text: 'hello brother'
	// 	}
	// ]
	// $scope.submitMessage = function (message) {
	// 	var newMessage = {
	// 		text: message,
	// 		date: new Date()
	// 	};
		
	// 	//sockets-----------------------------
	// 	socket.emit('message', newMessage);
		
	// 	//make a call to the backend to post this message
	// 	//code here
	// 	//^^^^
		
		
	// }
	// //socket listener------------------
	// 	socket.on('messageFromServer', function(messageObjFromServer){
	// 		console.log('this is messageObjFromServer', messageObjFromServer);
	// 		$scope.messages.push(messageObjFromServer);
	// 		$scope.$apply();
		
	// 	})
//---------------------------------------------------------------------------

}