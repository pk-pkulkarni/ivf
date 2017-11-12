"use strict";
(function () {
	angular.module("ivfApp")
		.controller("centerCtrl", ["$scope", "centerService", "$cookies", "$q", "$location", function ($scope, centerService, $cookies, $q, $location) {			
			$scope.init = function(){
				loadCenters();
			};

			$scope.centerGrid = {
			    enableSorting: true,
			    columnDefs: [
			      { field: 'Name'},
			      { field: 'Address'}
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
					$scope.centerGrid.data = arrangeData(data);
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

			$scope.addCenter = function(){
				$scope.center['operation'] = 'add';
				$scope.center['token'] = $cookies.get('token');
				centerService.centerOperations($scope.center).then(function(data){
					console.log(data)
					$location.path("/centerDetails");
				});
			};		    
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
