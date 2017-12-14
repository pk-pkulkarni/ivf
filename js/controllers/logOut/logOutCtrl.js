"use strict";
(function () {
	angular.module("ivfApp")
		.controller("logOutCtrl", ["$scope", "logOutService", "$cookies", "$window", "$location", "$routeParams", function ($scope, logOutService, $cookies, $window, $location, $routeParams) {			
			
			$scope.init = function(){
				logOut();	
			};

			var logOut = function(){
				var user = {					
					'user_id' : $cookies.get('user_id')
				};
				logOutService.logOut(user).then(function(data){
					if(data.success == true){
						$cookies.remove('token');						
			        	$cookies.remove('role_id');
			        	$cookies.remove('center_id');
			        	$cookies.remove('center_name')
			        	$cookies.remove('firstName');
			        	$cookies.remove('lastname');
			        	$cookies.remove('email');
			        	$window.location.href = '/ivf/index3.html';
					}else{

					}
				});
			};

		}]);
})();

ivfApp.factory("logOutService",["$http", '$q', "baseSvc", function($http, $q, baseSvc){

	var logOut = function(user){
		var url = "services/auth/logout.php";
		return baseSvc.postRequest(url, user);
	};

	return{
		logOut : logOut	
	};
}]);
