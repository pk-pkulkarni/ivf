loginApp.controller("loginCtrl", ["$scope", "loginService", "$cookies", "$q", function ($scope, loginService, $cookies, $q) {			
	$scope.login = function(){
		validateLoginDetails().then(function(str){
			if (str.length > 0) {
				$scope.errorMessage = str;
				$scope.error = true;
			}else{
				$scope.error = false;
				authenticateUser();
			}
		});		
	};

	var validateLoginDetails = function(){
		var deferred = $q.defer();
		if($scope.username == undefined || $scope.username == ""){
			deferred.resolve("Please enter User Name");	
		}else if(!$scope.username.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
			deferred.resolve("Please enter valid email address");
		}else if ($scope.password == undefined || $scope.password == "") {
			deferred.resolve("Please enter password");		
		}else{
			deferred.resolve("");	
		}		
		return deferred.promise;
	};

	$scope.validateEmail = function(){
		if(!$scope.username.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
			$scope.errorMessage = "Please enter valid email address";
			$scope.error = true;
		}
	};

	var authenticateUser = function(){
		var loginDetails = {
			'username' : $scope.username, 
		    'password': $scope.password			      	
		};
		loginService.authenticateUser(loginDetails).then(function(data){
			console.log(data);
	        if (data.success) {
	        	$cookies.put('token', data.token);	        	
	        }else if (data.error) {
	        	$scope.errorMessage = data.msg;
	        	$scope.error = true;
	        }
		});			
	};			
    
}]);


loginApp.factory("loginService",["$http", '$q', "baseSvc", function($http, $q, baseSvc){

	var authenticateUser = function(loginDetails){
		var url = "services/auth/auth.php";
		return baseSvc.postRequest(url, loginDetails);
	};

	return{
		authenticateUser : authenticateUser	
	};
}]);
