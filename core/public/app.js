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
	// AM I GOING TO WANT NESTED ROUTES WITH ID'S???
		
		.state('profile', {
			url: '/profile',
			templateUrl: './features/profile/profile.template.html',
			controller: 'profileCtrl'
		})
		
		.state('matches', {
			url: '/matches',
			templateUrl: './features/matches/matches.template.html',
			controller: 'matchesCtrl'
		})
		
}