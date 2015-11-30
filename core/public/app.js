angular.module('musicApp', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', routing]);

function routing($stateProvider, $urlRouterProvider) {

	$urlRouterProvider
		.otherwise('/');

	$stateProvider
		.state('login', {
			url: '/',
			templateUrl: './features/login/login.template.html',
			controller: 'loginCtrl'
		})
	// AM I GOING TO WANT NESTED ROUTES WITH ID'S??? yes you are
		
		.state('profile', {
			url: '/profile/:_id',
			templateUrl: './features/profile/profile.template.html',
			controller: 'profileCtrl',
			resolve: {
				profileInfo: function($stateParams, profileService){
					console.log('this is $stateParams._id', $stateParams._id);
					return profileService.getProfileInfo($stateParams._id);
				}
			}
		})
		
		.state('update', {
			url: '/profile/:_id/update',
			templateUrl: './features/update/update.template.html',
			controller: 'updateCtrl',
			resolve: {
				profileInfo: function($stateParams, profileService){
					console.log('this is _id', $stateParams._id);
					return profileService.getProfileInfo($stateParams._id);
				}
			}
		})
		
		
		.state('matches', {
			url: '/matches/:_id',
			templateUrl: './features/matches/matches.template.html',
			controller: 'matchesCtrl'
		})
		
}