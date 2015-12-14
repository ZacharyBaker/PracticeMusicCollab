var musicApp = angular.module('musicApp');

musicApp.controller('profileCtrl', ['$scope', 'profileInfo', '$state', 'deckOfUsers', 'profileService', 'socket', 'oGValueForSpecificConvo', profileCtrl]);

function profileCtrl($scope, profileInfo, $state, deckOfUsers, profileService, socket, oGValueForSpecificConvo) {

	$(document).ready(function () {
		$(".button-collapse").sideNav();

	})

	$scope.specificConvo = oGValueForSpecificConvo;
	// $scope.arrOfConvos = conversations;
	// console.log('arrOfConvos!!!!!!!!!!!!!!', $scope.arrOfConvos);
	// console.log('CONVERSATIONS', conversations);
	// console.log(profileInfo);
	$scope.profileInfo = profileInfo;
	$scope.deckOfUsers = deckOfUsers;
	$scope.arrOfConvos = [];

	$scope.goToUpdatePage = function (id) {
		// console.log('profile.controller, profileInfo._id',profileInfo._id);
		$state.go('update', {
			_id: id
		});
	}

	$scope.goToMatchesPage = function (id) {
		$state.go('matches', {
			_id: id
			// matchID: $scope.deckOfUsers[0]._id
		})
	}


	$scope.youDontHaveAnyMatches = true;
	$scope.findConversations = function () {

		profileService.findConversations($scope.profileInfo, $scope.matchObjsArr)
			.then(function (response) {
				$scope.arrOfConvos = response;
				console.log('arrOfCONOVS', $scope.arrOfConvos);
				if ($scope.arrOfConvos.length !== 0) {
					$scope.youDontHaveAnyMatches = false;
				}
				// $state.go($state.current, {}, {reload: true}); //how can i refresh or update the page?
				
				// $state.go('profile', {
				// 	_id: $scope.profileInfo._id 
				// });
				
			})
	}


	$scope.findMatches = function () {
		console.log('this is trying to find matches');
		profileService.findMatches($scope.profileInfo)
			.then(function (response, err) {

				$scope.matchObjsArr = response;
				// console.log(response);

				$scope.findConversations();
			})
	}
	$scope.findMatches();

	
	//WORKING ON INDIVIDUAL CONVERSATOIONS--------------------------
	$scope.submitMessage = function (specificConvo, newMessage) {

		var messageObj = {
			sender: profileInfo._id,
			receiver: $scope.personImTalkingTo._id,
			convo: specificConvo[0],
			text: newMessage
		}
		profileService.sendMessage(messageObj, specificConvo[0]._id)
			.then(function (response) {

			})

		socket.emit('message', messageObj);
	}

	$scope.$on('messagesubmitted', function (ev, convo, msg) {
		$scope.submitMessage(convo, msg);
	})

	$scope.findPersonImTalkingTo = function (specificConvo) {
		// console.log('specificConvo', specificConvo[0]);
		$scope.specificConvo = specificConvo[0];

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
	socket.on('matched' + profileInfo._id, function (id) {
		// console.log('match fired', id);
		$scope.findMatches();

	})

	$scope.foo = 'bar';
	console.log('controller refresh', $scope.foo);

	socket.on(profileInfo._id, function (messageObjFromServer) {
		// console.log('this is messageObjFromServer', messageObjFromServer);

		
		
		// console.log('foo', $scope.foo);

		// console.log('message', messageObjFromServer);
		// console.log('convos', $scope.arrOfConvos);

		
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
	
	$scope.$on('$destroy', function(){
		socket.removeAllListeners();
	})
	


}