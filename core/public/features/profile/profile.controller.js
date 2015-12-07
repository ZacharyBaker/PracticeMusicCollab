var musicApp = angular.module('musicApp');

musicApp.controller('profileCtrl', ['$scope', 'profileInfo', '$state', 'deckOfUsers', 'profileService', 'socket', 'oGValueForSpecificConvo', profileCtrl]);

function profileCtrl($scope, profileInfo, $state, deckOfUsers, profileService, socket, oGValueForSpecificConvo) {

	$scope.specificConvo = oGValueForSpecificConvo;

	
	
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

				//call findConversations in here!!!!!
				$scope.findConversations();
			})
	}
	$scope.findMatches();

	$scope.findConversations = function () {
		profileService.findConversations($scope.profileInfo, $scope.matchObjsArr)
			.then(function (response) {
				$scope.arrOfConvos = response;
				// console.log('$scope.arrOfConvos', $scope.arrOfConvos);
			})
	}
	
	//WORKING ON INDIVIDUAL CONVERSATOIONS--------------------------
	$scope.submitMessage = function (specificConvo, newMessage) {

		var messageObj = {
			sender: profileInfo._id,
			receiver: $scope.personImTalkingTo._id,
			convo: specificConvo[0],
			text: profileInfo.username + ': ' + newMessage
		}
		profileService.sendMessage(messageObj, specificConvo[0]._id)
			.then(function (response) {
				$scope.newMessage = '';
				
			})

		socket.emit('message', messageObj);

	}

	$scope.findPersonImTalkingTo = function (specificConvo) {
		// console.log('specificConvo', specificConvo[0]);
		$scope.specificConvo = specificConvo[0];
		//CHANGE THE OBJ SO IT DOESNT SHOW NOTIFICATION
		$scope.specificConvo.new = false;
		//-------------
		// console.log('digging deeper', specificConvo[0].participants[0].username);
		if (specificConvo[0].participants[0].username === profileInfo.username) {
			$scope.personImTalkingTo = specificConvo[0].participants[1];
		}
		else {
			$scope.personImTalkingTo = specificConvo[0].participants[0];
		}
		// console.log('personImTalkingTo', $scope.personImTalkingTo);
	}
	
	
	
	
	
	
	// socket listener------------------
	socket.on(profileInfo._id, function (messageObjFromServer) {
		// console.log('this is messageObjFromServer', messageObjFromServer);
		
		

		for (var i = 0; i < $scope.arrOfConvos.length; i++) {
			if ($scope.arrOfConvos[i][0]._id === messageObjFromServer.convo._id) {
				// $scope.arrOfConvos[i][0].new = true;
				$scope.arrOfConvos[i][0].messages.push(messageObjFromServer);

			}
		}
		if ((!$('#' + $scope.specificConvo._id).hasClass("active"))) {

			$scope.specificConvo = {
				_id: 0
			}

		}

		if ($scope.specificConvo._id !== messageObjFromServer.convo._id) {
			//change a property on someone
			for (var i = 0; i < $scope.arrOfConvos.length; i++) {
				if ($scope.arrOfConvos[i][0]._id === messageObjFromServer.convo._id) {
					$scope.arrOfConvos[i][0].new = true;
				}
			}
		}


		$scope.$apply();

	})
	// 	$scope.getClass = function () {
	// 	return {
	// 		newNotification: $scope.specificConvo._id !== messageObjFromServer.convo._id && messageObjFromServer.convo._id === $scope.arrOfConvos[i][0]._id
	// 	}
	// }
	// if ($scope.specificConvo._id !== messageObjFromServer.convo._id && messageObjFromServer.convo._id === $scope.arrOfConvos[i][0]._id) {
	// 	$scope.arrOfConvos[i][0].addClass('new badge');
	// }
		
		
	//$scope.newAlert
	// if (messageObjFromServer.convo._id !== $scope.specificConvo._id)
	//i'm confused! i dont know if i'm on the right track!
		
		
	// $scope.messages.push(messageObjFromServer);//this is where it gets hairy
	//---------------------------------------------------------------------------
	
	
	
}