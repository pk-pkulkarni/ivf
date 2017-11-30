"use strict";
(function () {
	angular.module("ivfApp")
		.controller("centerCtrl", ["$scope", "centerService", "$cookies", "$q", "$location", "$routeParams", function ($scope, centerService, $cookies, $q, $location, $routeParams) {			
			$scope.center = {};
			$scope.init = function(){
				loadCenters();
			};

			$scope.centerGrid = {
			    enableSorting: true,
			    enablePaginationControls: true,
            	paginationPageSize: 10,
			    columnDefs: [{
                    name: 'Name',                    
                    width: '40%',
                    cellTemplate: '<div style="padding-left: 10px;margin-left:5px;">' + '{{row.entity.Name}}' + '</div>'
                },
                {
                    name: 'Address',                    
                    width: '45%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.Address}}' + '</div>'
                },
                {
                    name: 'Action',                    
                    width: '15%',
                    cellTemplate: '<div style="padding-left: 10px;"><div class="btn-group">' +
                  		'<a type="button" class="btn btn-default btn-sm" href="#!/centerEdit/{{row.entity.Id}}"><i class="fa fa-edit"></i></a>' +
                  		'<a type="button" class="btn btn-default btn-sm" href="#!/centerView/{{row.entity.Id}}"><i class="fa fa-reorder"></i></a>' +
                  		'<button type="button" class="btn btn-default btn-sm"><i class="fa fa-trash-o" ng-click="grid.appScope.deleteCenter(row.entity.Id);"></i></button></div></div>'
                }
			      /*{ field: 'Name'},
			      { field: 'Address'},
			      { field: 'Action'}*/
			    ],
			    onRegisterApi: function( gridApi ) {
			      $scope.gridApi = gridApi;
			      $scope.gridApi.core.on.sortChanged( $scope, function( grid, sort ) {
			        $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
			      })
			    }
			};

			var loadCenters = function(){
				var operation = {
					'operation' : 'get',
					'token' : $cookies.get('token')
				}
				centerService.centerOperations(operation).then(function(data){
					console.log(data);					
					$scope.centerGrid.data = arrangeData(data.data);
				})	
			};

			var arrangeData = function(rawCenter){
				var centerData = [];
				for(var i=0; i<rawCenter.length; i++){
					centerData[i] = {};
					centerData[i].Id = rawCenter[i].center_id;
					centerData[i].Name = rawCenter[i].center_name;
					centerData[i].Address = rawCenter[i].center_address;
				}
				return centerData;
			};

			$scope.addUpdateCenter = function(){
				validateCenter().then(function(str){
					if (str.length > 0) {
						$scope.errorMessage = str;
						$scope.error = true;
					}else{
						saveCenterDetails();
					}
				});				
			};

			var validateCenter = function(){
				var deferred = $q.defer();
				if($scope.center.center_name == undefined || $scope.center.center_name == ""){
					deferred.resolve("Please enter Center Name");	
				}else if ($scope.center.center_address == undefined || $scope.center.center_address == "") {
					deferred.resolve("Please enter center address");		
				}else{
					deferred.resolve("");	
				}		
				return deferred.promise;
			};

			var saveCenterDetails = function(){
				if ($routeParams.Id) {					
					$scope.center['Id'] = $routeParams.Id;
					$scope.center['operation'] = 'update';
				}else{
					$scope.center['operation'] = 'add';	
				}				
				$scope.center['token'] = $cookies.get('token');
				centerService.centerOperations($scope.center).then(function(data){
					console.log(data)
					if(data.success == true)
						$location.path("/centerDetails");
					else if (data.error == true) {

					}
				});
			};

			$scope.ViewCenter = function(){
				var operation = {
					'operation' : 'getById',
					'token' : $cookies.get('token'),
					'center_id' : $routeParams.Id
				}
				centerService.centerOperations(operation).then(function(data){
					console.log(data);		
					if(data.success == true)			
						$scope.center = data.data[0];
					else if (data.error = true) {

					}
				})
			};

			$scope.deleteCenter = function(Id){
				var operation = {
					'operation' : 'delete',
					'token' : $cookies.get('token'),
					'center_id' : Id
				}
				centerService.centerOperations(operation).then(function(data){
					console.log(data);		
					if(data.success == true)			
						$scope.center = data.data[0];
					else if (data.error = true) {

					}
				})	
			};

			$scope.ViewCenterGrid = function(){
				$location.path("/centerDetails");
			}


		}]);
})();

ivfApp.factory("centerService",["$http", '$q', "baseSvc", function($http, $q, baseSvc){

	var centerOperations = function(operation){
		var url = "services/center/CenterOperations.php";
		return baseSvc.postRequest(url, operation);
	};

	return{
		centerOperations : centerOperations	
	};
}]);
