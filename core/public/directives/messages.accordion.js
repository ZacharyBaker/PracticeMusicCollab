angular.module('musicApp')

	.directive('messagesaccordion', function () {
		return {
			restrict: 'E',
			templateUrl: 'directives/messages.accordion.html',
			link: function (scope, element, attributes) {
				$(document).ready(function () {
					$('.collapsible').collapsible({
						accordion: true // A setting that changes the 
						//collapsible behavior to expandable instead 
						//of the default accordion style
					});
				});
			}
		};


	});