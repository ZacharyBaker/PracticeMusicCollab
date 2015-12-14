angular.module('musicApp', ['ui.router'])

.constant('socket', io.connect())

.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
})

.config(['$stateProvider', '$urlRouterProvider', routing]);


function routing($stateProvider, $urlRouterProvider) {

//constant


	$urlRouterProvider
		.otherwise('/');

	$stateProvider
		.state('login', {
			url: '/',
			templateUrl: './features/login/login.template.html',
			controller: 'loginCtrl'
		})

		
		.state('profile', {
			url: '/profile/:_id',
			templateUrl: './features/profile/profile.template.html',
			controller: 'profileCtrl',
			resolve: {
				profileInfo: function($stateParams, profileService){
					// console.log('this is $stateParams._id', $stateParams._id);
					return profileService.getProfileInfo($stateParams._id);
				},
				deckOfUsers: function($stateParams, matchesService){
					// console.log('this is _id', $stateParams._id);
					return matchesService.getDeckOfUsers($stateParams._id);
				},
				oGValueForSpecificConvo: function(){
					return {
						_id: 0
					}
				}
				
			}
		})
		
		.state('update', {
			url: '/profile/:_id/update',
			templateUrl: './features/update/update.template.html',
			controller: 'updateCtrl',
			resolve: {
				profileInfo: function($stateParams, profileService){
					// console.log('this is _id', $stateParams._id);
					return profileService.getProfileInfo($stateParams._id);
				}
			}
		})
		
		
		.state('matches', {
			url: '/matches/user/:_id',
			templateUrl: './features/matches/matches.template.html',
			controller: 'matchesCtrl',
			resolve: {
				deckOfUsers: function($stateParams, matchesService){
					console.log('this is _id', $stateParams._id);
					return matchesService.getDeckOfUsers($stateParams._id);
				},
				
				profileInfo: function($stateParams, profileService){
					// console.log('this is _id', $stateParams._id);
					return profileService.getProfileInfo($stateParams._id);
				}
			}
			
		})
		
}