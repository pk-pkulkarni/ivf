"use strict";
(function () {
	angular.module("peopleApp")
		.controller("allPeopleCtrl", ["$scope", "peopleService", "$http",
		function ($scope, peopleService, $http) {
			$http({
		      method: 'post',
		      url: "services/user/UserOperations.php",
		      data: { 
		      	'firstname' : 'Sameer', 
		      	'lastname': 'patil',
		      	'email' : 'unkule.sagar@gmail.com',
		      	'contact' : '45631',
		      	'password' : 'Sagar@123',
		      	'center_id' : '1',
		      	'role_id' : '1'
		      },
		      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    })
		    .success(function(response) {
		        console.log(response);		        
		    }).
		    error(function(response) {
		        //$scope.codeStatus = response || "Request failed";
		        console.log(response);	
		    });
		    
		}]);
})();