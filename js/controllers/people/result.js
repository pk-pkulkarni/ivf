"use strict";
(function () {
	angular.module("peopleApp")
		.controller("addPersonCtrl", ["$scope", "peopleService",
		function ($scope, peopleService) {
			/*peopleService.getAll()
				.then(function (response) {
				$scope.people = response;                
			});
			$scope.removePerson = function(person){
				peopleService.remove(person.ID)
				.then(function(response){
					var personIndex = $scope.people.indexOf(person);
					$scope.people.splice(personIndex,1);
				});
			};*/
		}]);
})();