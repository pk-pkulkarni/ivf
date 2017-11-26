"use strict";
(function () {
	angular.module("ivfApp")
		.controller("userCtrl", ["$scope", "userService", "$cookies", "$q", "$location", "$routeParams", function ($scope, userService, $cookies, $q, $location, $routeParams) {			
			$scope.user = [];
			$scope.init = function(){
				loadUsers();
			};

			$scope.userGrid = {
			    enableSorting: true,
			    enablePaginationControls: true,
            	paginationPageSize: 10,
			    columnDefs: [{
                    name: 'First Name',                    
                    width: '20%',
                    cellTemplate: '<div style="padding-left: 10px;margin-left:5px;">' + '{{row.entity.FirstName}}' + '</div>'
                },
                {
                    name: 'Last Name',                    
                    width: '20%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.LastName}}' + '</div>'
                },
				{
                    name: 'Email',                    
                    width: '35%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.Email}}' + '</div>'
                },
				{
                    name: 'Contact Number',                    
                    width: '20%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.Contact}}' + '</div>'
                },
				{
                    name: 'Role',                    
                    width: '20%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.Role}}' + '</div>'
                },
                {
                    name: 'Action',                    
                    width: '15%',
                    cellTemplate: '<div style="padding-left: 10px;"><div class="btn-group">' +
                  		'<a type="button" class="btn btn-default btn-sm" href="#!/userEdit/{{row.entity.Id}}"><i class="fa fa-edit"></i></a>' +
                  		'<a type="button" class="btn btn-default btn-sm" href="#!/userView/{{row.entity.Id}}"><i class="fa fa-reorder"></i></a>' +
                  		'<button type="button" class="btn btn-default btn-sm"><i class="fa fa-trash-o" ng-click="grid.appScope.deleteuser(row.entity.Id);"></i></button></div></div>'
                }],
			    onRegisterApi: function( gridApi ) {
			      $scope.gridApi = gridApi;
			      $scope.gridApi.core.on.sortChanged( $scope, function( grid, sort ) {
			        $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
			      })
			    }
			};

			var loadUsers = function(){
				var operation = {
					'operation' : 'get',
					'token' : $cookies.get('token')
				}
				userService.userOperations(operation).then(function(data){
					console.log(data);					
					$scope.userGrid.data = arrangeData(data.data);
				})	
			};

			var arrangeData = function(rawuser){
				var userData = [];
				for(var i=0; i<rawuser.length; i++){
					userData[i] = {};
					userData[i].Id = rawuser[i].user_id;
					userData[i].FirstName = rawuser[i].firstname;
					userData[i].LastName = rawuser[i].lastname;
					userData[i].Email = rawuser[i].email;
					userData[i].Contact = rawuser[i].contact;
					userData[i].Role = rawuser[i].role_name;
					/*userData[i].Name = rawuser[i].firstname;
					userData[i].Name = rawuser[i].firstname;
					userData[i].Name = rawuser[i].firstname;*/
				}
				return userData;
			};

			$scope.addUpdateUser = function(){
				validateUser().then(function(str){
					if (str.length > 0) {
						$scope.errorMessage = str;
						$scope.error = true;
					}else{
						saveuserDetails();
					}
				});				
			};

			var validateUser = function(){
				var deferred = $q.defer();
				if($scope.user.firstname == undefined || $scope.user.firstname == ""){
					deferred.resolve("Please enter First Name of user");	
				}else if ($scope.user.lastname == undefined || $scope.user.lastname == "") {
					deferred.resolve("Please enter Last Name of User");		
				}else{
					deferred.resolve("");	
				}		
				return deferred.promise;
			};

			var saveUserDetails = function(){
				if ($routeParams.Id) {					
					$scope.user['Id'] = $routeParams.Id;
					$scope.user['operation'] = 'update';
				}else{
					$scope.user['operation'] = 'add';	
				}				
				$scope.user['token'] = $cookies.get('token');
				userService.userOperations($scope.user).then(function(data){
					console.log(data)
					if(data.success == true)
						$location.path("/userDetails");
					else if (data.error == true) {

					}
				});
			};

			$scope.viewUser = function(){
				var operation = {
					'operation' : 'getById',
					'token' : $cookies.get('token'),
					'user_id' : $routeParams.Id
				}
				userService.userOperations(operation).then(function(data){
					console.log(data);		
					if(data.success == true)			
						$scope.user = data.data[0];
					else if (data.error = true) {

					}
				})
			};

			$scope.deleteuser = function(Id){
				var operation = {
					'operation' : 'delete',
					'token' : $cookies.get('token'),
					'user_id' : Id
				}
				userService.userOperations(operation).then(function(data){
					console.log(data);		
					if(data.success == true)			
						$scope.user = data.data[0];
					else if (data.error = true) {

					}
				})	
			};

			$scope.ViewUserGrid = function(){
				$location.path("/userDetails");
			}


		}]);
})();

ivfApp.factory("userService",["$http", '$q', "baseSvc", function($http, $q, baseSvc){

	var userOperations = function(operation){
		var url = "services/user/UserOperations.php";
		return baseSvc.postRequest(url, operation);
	};

	return{
		userOperations : userOperations	
	};
}]);
