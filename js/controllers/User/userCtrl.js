"use strict";
(function () {
	angular.module("ivfApp")
		.controller("userCtrl", ["$scope", "userService", "$cookies", "$q", "$location", "$routeParams", function ($scope, userService, $cookies, $q, $location, $routeParams) {			
			$scope.user = {};
			$scope.init = function(){
				loadUsers();				
			};

			$scope.userGrid = {
			    enableSorting: true,
			    enablePaginationControls: true,
            	paginationPageSize: 10,
			    columnDefs: [{
                    name: 'First Name',                    
                    width: '15%',
                    cellTemplate: '<div style="padding-left: 10px;margin-left:5px;">' + '{{row.entity.FirstName}}' + '</div>'
                },
                {
                    name: 'Last Name',                    
                    width: '20%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.LastName}}' + '</div>'
                },
				{
                    name: 'Email',                    
                    width: '25%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.Email}}' + '</div>'
                },
				{
                    name: 'Contact Number',                    
                    width: '15%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.Contact}}' + '</div>'
                },
				{
                    name: 'Role',                    
                    width: '15%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.Role}}' + '</div>'
                },
                {
                    name: 'Action',                    
                    width: '10%',
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
					if(data.success == true){
						$scope.userGrid.data = arrangeData(data.data);
					}else if (data.error == true) {

					}					
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
					userData[i].Name = rawuser[i].firstname;					
				}
				return userData;
			};

			$scope.addUpdateUser = function(){
				validateUser().then(function(str){
					if (str.length > 0) {
						$scope.errorMessage = str;
						$scope.error = true;
					}else{
						saveUserDetails();
					}
				});				
			};

			var validateUser = function(){
				var deferred = $q.defer();
				if($scope.user.firstname == undefined || $scope.user.firstname == ""){
					deferred.resolve("Please enter First Name of user");	
				}else if ($scope.user.lastname == undefined || $scope.user.lastname == "") {
					deferred.resolve("Please enter Last Name of User");		
				}if($scope.user.email == undefined || $scope.user.email == ""){
					deferred.resolve("Please enter Email");	
				}else if(!$scope.user.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
					deferred.resolve("Please enter valid email address");
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
				if($cookies.get('role_id') == 1){
					$scope.user['center_id'] = $scope.selectedCenter;
				}else{
					$scope.user['center_id'] =$cookies.get('center_id');				
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

			$scope.initView = function(){
				loadRoles();
				$scope.showCenters = false;
				if ($cookies.get('role_id') == 1) {
					$scope.showCenters = true;
					loadCenters();
				}	
			};

			var loadCenters = function(){
				var operation = {
					'operation' : 'get',
					'token' : $cookies.get('token')
				}
				userService.centerOperations(operation).then(function(data){
					console.log(data);					
					if(data.success == true){						
						$scope.centers = arrangeCenterData(data.data);
						$scope.selectedCenter = $scope.centers[0].id;
					}else if(data.error == true){
						$location.path("/patientDetails");	
					}					
				});				
			};

			var arrangeCenterData = function(rawCenter){
				var centerData = [];
				for(var i=0; i<rawCenter.length; i++){
					centerData[i] = {};
					centerData[i].id = rawCenter[i].center_id;
					centerData[i].name = rawCenter[i].center_name;					
				}
				return centerData;
			};

			var loadRoles = function(){
				var operation = {
					'operation' : 'get',
					'token' : $cookies.get('token')
				}
				userService.roleOperations(operation).then(function(data){
					console.log(data);					
					if(data.success == true){						
						$scope.roles = arrangeRoleData(data.data);
						if($cookies.get('role_id') != 1)
							$scope.roles.splice(0,1);
						$scope.user.role_id = $scope.roles[0].role_id;

					}else if(data.error == true){
						$location.path("/patientDetails");	
					}					
				});	
			};

			var arrangeRoleData = function(rawRoles){
				var roleData = [];
				for(var i=0; i<rawRoles.length; i++){
					roleData[i] = {};
					roleData[i].role_id = rawRoles[i].role_id;
					roleData[i].name = rawRoles[i].name;
				}
				return roleData;
			};


		}]);
})();

ivfApp.factory("userService",["$http", '$q', "baseSvc", function($http, $q, baseSvc){

	var userOperations = function(operation){
		var url = "services/user/UserOperations.php";
		return baseSvc.postRequest(url, operation);
	};

	var centerOperations = function(operation){
		var url = "services/center/CenterOperations.php";
		return baseSvc.postRequest(url, operation);
	};

	var roleOperations = function(operation){
		var url = "services/role/RoleOperations.php";
		return baseSvc.postRequest(url, operation);
	};

	return{
		userOperations : userOperations,
		centerOperations : centerOperations,
		roleOperations : roleOperations
	};
}]);
