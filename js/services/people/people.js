"use strict";
(function(){
	angular.module("peopleApp")
	.factory("peopleService",["$http", '$q',function($http, $q){
		var listEndPoint = '/_api/web/lists';
		var getAll = function(){						
			var deferred = $q.defer();
			$http({
		      method: 'post',
		      url: "services/get.php",
		      data: param({ 'type' : 'get'}),
		      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    })
		    .success(function(response) {
		        console.log(response);
		        deferred.resolve(response);
		    }).
		    error(function(response) {
		        $scope.codeStatus = response || "Request failed";
		    });
		    return deferred.promise;
		};
		var addNew = function(person){
			/*var data = {				
				'firstName' : person.firstName,
				'lastName' : person.lastName,
				'address' : person.address
			};*/
			var deferred = $q.defer();
			$http({
		      method: 'post',
		      url: "services/get.php",
		      data: param({ 'type' : 'insert', 'data': person}),
		      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    })
		    .success(function(response) {
		        console.log(response);
		        deferred.resolve(response);
		    }).
		    error(function(response) {
		        //$scope.codeStatus = response || "Request failed";
		    });
		    return deferred.promise;
		};
		var getById = function(personId){
			var query = listEndPoint + "/GetByTitle('People')/GetItemById("+personId+")?$select=ID,FirstName,LastName,Address";
			//return baseService.getRequest(query);
		};
		var update = function (person){
			var data = {
				__metadata: { 'type': 'SP.Data.PeopleListItem' },
				FirstName : person.firstName,
				LastName : person.lastName,
				Address : person.address
			};
			var url = listEndPoint + "/GetByTitle('People')/GetItemById("+person.personId+")";
			//return baseService.updateRequest(data,url);
		};
		var remove = function(personId){
			var url = listEndPoint + "/GetByTitle('People')/GetItemById("+personId+")";
			//return baseService.deleteRequest(url);
		};
		var param = function(data) { var returnString = ''; for (var d in data) { if (data.hasOwnProperty(d)) { returnString += d + '=' + data[d] + '&'; } } return returnString.slice( 0, returnString.length - 1 ); };
		return{
			getAll:getAll,
			addNew:addNew,
			getById:getById,
			update:update,
			remove:remove,
			param:param
		};
	}]);
})();