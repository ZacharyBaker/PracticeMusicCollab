var musicApp = angular.module('musicApp');

musicApp.service('matchesService', ['$q', '$http', matchesService]);

function matchesService($q, $http) {


	//GET USER INFO in order to get the properties that have to do with matches
	this.getDeckOfUsers = function (id) {
		var orderedDeck = [];
		return $http.get('api/profile/' + id)
			.then(function (response) {
				// console.log('matches service, response.data', response.data);
				var userInfo = response.data;
				// return userInfo;
				//use userInfo to get the right deck
				//should be able to use userInfo.notInterested//
				//userInfo.imInterested// userInfo.interestedInMe//
				//userInfo.collaborations
				return $http.get('/api/users')
					.then(function (response) {
						// console.log('innerfunction response.data', response.data);
						var arrOfUsers = response.data;
						if (userInfo.notInterested) {

							userInfo.notInterested.forEach(function (e) {
								for (var i = 0; i < arrOfUsers.length; i++) {
									if (e === arrOfUsers[i]._id) {
										arrOfUsers.splice(i, 1);
									}
								}
							})
						}
						if (userInfo.imInterested) {
							userInfo.imInterested.forEach(function (e) {
								for (var i = 0; i < arrOfUsers.length; i++) {
									if (e === arrOfUsers[i]._id) {
										arrOfUsers.splice(i, 1);
									}
								}
							})
						}
						
						
						if (userInfo.interestedInMe) {
							userInfo.interestedInMe.forEach(function (e) {
								for (var i = 0; i < arrOfUsers.length; i++) {
									if (e === arrOfUsers[i]._id) {
										orderedDeck.push(arrOfUsers[i]);
										arrOfUsers.splice(i, 1);
									}
								}

							})
						}
						arrOfUsers.forEach(function (e) {
							orderedDeck.unshift(e);
						})

						//get rid of own profile in deck
						for (var i = 0; i < orderedDeck.length; i++) {
							if (userInfo._id === orderedDeck[i]._id) {
								orderedDeck.splice(i, 1);
							}
						}



						// console.log('orderedDeck', orderedDeck);
						return orderedDeck;
					})
			})

	}

	this.getPotentialCollaboratorInfo = function (matchId) {
		return $http.get('/api/profile/' + matchId)
			.then(function (response) {
				return response.data;
			}, function (err) {
				console.log(err);
				return err;
			})
	}


	this.addIdToUserImInterested = function (userID, collaborID) {
		return $http.post('/api/iminterested/update/' + userID, { id: collaborID })
			.then(function (response) {
				return response.data;
			}, function (err) {
				console.log(err);
				return err;
			})
	}

	this.addIdToCollaboratorInterestedInMe = function (collaborID, userID) {
		return $http.post('/api/interestedinme/update/' + collaborID, { id: userID })
			.then(function (response) {
				return response.data;
			}, function (err) {
				console.log(err);
				return err;
			})
	}

	this.addToUserNotInterested = function (userID, collaborID) {
		return $http.post('/api/notinterested/update/' + userID, {id: collaborID})
			.then(function(response){
				return response.data;
			}, function(err){
				console.log(err);
				return err;
			})
	}

}