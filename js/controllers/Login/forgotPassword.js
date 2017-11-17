ivfApp.controller("loginCtrl", ["$scope", "loginService", "$cookies", "$q", "$window", function ($scope, loginService, $cookies, $q, $window) {			
	$scope.validate = function(){
		validateEmailDetails().then(function(str){
			if (str.length > 0) {
				$scope.errorMessage = str;
				$scope.error = true;
			}else{
				$scope.error = false;
				sendEmail();
			}
		});		
	};

	var validateEmailDetails = function(){
		var deferred = $q.defer();
		if($scope.username == undefined || $scope.username == ""){
			deferred.resolve("Please enter email");	
		}else if(!$scope.username.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
			deferred.resolve("Please enter valid email address");
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

	var sendEmail = function(){
		var emailDetails = {
			'username' : $scope.username 		    
		};
		loginService.sendEmail(emailDetails).then(function(data){
			console.log(data);
	        if (data.success) {	        	
	        	alert("Password has been sent to your email");
	        	$window.location.href = 'index3.html';	        	
	        }else if (data.error) {
	        	$scope.errorMessage = data.msg;
	        	$scope.error = true;
	        }
		});			
	};			
    
}]);


ivfApp.factory("loginService",["$http", '$q', "baseSvc", function($http, $q, baseSvc){

	var sendEmail = function(loginDetails){
		var url = "services/auth/auth.php";
		return baseSvc.postRequest(url, loginDetails);
	};

	return{
		sendEmail : sendEmail	
	};
}]);
