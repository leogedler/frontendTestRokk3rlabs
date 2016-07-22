'use strict';

angular.module('rokkerTest.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/data', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl',
    controllerAs : 'view2Ctrl'
  });
}])

.controller('View2Ctrl', ['$http', function($http) {
	var view2Ctrl = this;

	// Retrieve data form jason file
	$http.get('activity-data.json').success(function(data) {
    	view2Ctrl.mainInfo = data;


    	console.log(view2Ctrl.mainInfo)

	});



}]);