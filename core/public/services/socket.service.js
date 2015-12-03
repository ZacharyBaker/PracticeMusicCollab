angular.module('musicApp').service('socketService', ['$rootScope', function ($rootScope) {
   var socket = io.connect();

   return socket;

}]);