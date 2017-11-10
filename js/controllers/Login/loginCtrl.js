"use strict";
(function () {
	angular.module("peopleApp")
		.controller("loginCtrl", ["$scope", "peopleService", "$http",
		function ($scope, peopleService, $http) {
			
			$scope.login = function(){
				$http({
			      method: 'post',
			      url: "services/auth/auth.php",
				      data: { 
				      	'username' : $scope.username, 
				      	'password': $scope.password			      	
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
			};			
		    
		}]);
})();