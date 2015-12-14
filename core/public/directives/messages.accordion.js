angular.module('musicApp')

	.directive('messagesaccordion', function () {
		return {
			restrict: 'E',
			templateUrl: 'directives/messages.accordion.html',
			link: function (scope, element, attributes) {
				$(document).ready(function () {
					$('.collapsible').collapsible({
						accordion: true 
					});
					
				});
			}
		};


	})
	.directive('submsg', function(){
		return {
			link: function(scope, ele, attrs){
				scope.submit = function(convo, msg){
					scope.newMessage = '';
					scope.$emit('messagesubmitted', convo, msg);
					
				}
			}
		}
	})