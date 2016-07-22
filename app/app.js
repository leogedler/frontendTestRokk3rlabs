'use strict';

// Declare app level module which depends on views, and components
angular.module('rokkerTest', [
  'ngRoute',
  'rokkerTest.view1',
  'rokkerTest.view2',
  'rokkerTest.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/analytics'});
}]);
