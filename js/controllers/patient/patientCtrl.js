"use strict";
(function () {
	angular.module("ivfApp")
		.controller("patientCtrl", ["$scope", "patientService", "$cookies", "$q", "$location","$routeParams", function ($scope, patientService, $cookies, $q, $location,$routeParams) {			
			$scope.patient = {};
			$scope.init = function(){
				loadPatients();
			};
			$scope.addPatientForminit = function(){
				//alert("Hi");				
			};
			$scope.editPatientForminit = function(){
				//alert("Hi");				
			};
			
			var isNumber = function(el, evt) {
				var iKeyCode = (evt.charCode) ? evt.charCode : evt.keyCode
				if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)){
					return false;    
				}
			};
			var calculateAge = function(dateString){
				var birthday = +new Date(dateString);
				return ~~((Date.now() - birthday) / (31557600000));
				
			};
			var calculateBMI = function(height,weight){
				var bmi = (weight/(height*height)).toFixed(1)
				return parseFloat(bmi);
			};
			$scope.getHusbangAge = function(){
				$scope.patient.husband_age = calculateAge($scope.patient.husband_dob); 
			};
			$scope.getWifeAge = function(){
				$scope.patient.wife_age = calculateAge($scope.patient.wife_dob);
			};
			var cancelAddPatient = function(){
				/*alert("Cancel");*/
			};
			
			$scope.getHusbandBMI = function(){
				if($scope.patient != undefined)
				{
					$scope.patient.husband_bmi = validateAndGetBMI($scope.patient.husband_height, $scope.patient.husband_weight);	
				}
			};
			$scope.getWifeBMI = function(){
				if($scope.patient != undefined)
				{
					$scope.patient.wife_bmi = validateAndGetBMI($scope.patient.wife_height, $scope.patient.wife_weight);	
				}
			};
			
			var validateAndGetBMI = function(height,weight){
				var bmi = "";
				if(height != undefined && height != "")
				{
					if(weight != undefined && weight != "")
						bmi = calculateBMI(height, weight);
					else
						bmi = "";
				}
				return bmi;
			};
			$scope.patientGrid = {
			    enableSorting: true,
			    enablePaginationControls: true,
            	paginationPageSize: 10,
			    columnDefs: [{
                    name: 'Husband Name',                    
                    width: '20%',
                    cellTemplate: '<div style="padding-left: 10px;margin-left:5px;">' + '{{row.entity.HusbandName}}' + '</div>'
                },
                {
                    name: 'Wife Name',                    
                    width: '20%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.WifeName}}' + '</div>'
                },
				{
                    name: 'Husband DOB',                    
                    width: '20%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.HusbandDob}}' + '</div>'
                },
				{
                    name: 'Husband Phone',                    
                    width: '20%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.HusbandPhone}}' + '</div>'
                },
				{
                    name: 'Husband Email',                    
                    width: '20%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.HusbandEmail}}' + '</div>'
                },
				{
                    name: 'Wife DOB',                    
                    width: '20%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.WifeDob}}' + '</div>'
                },
				{
                    name: 'Wife Phone',                    
                    width: '20%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.WifePhone}}' + '</div>'
                },
				{
                    name: 'Wife Email',                    
                    width: '20%',
                    cellTemplate: '<div style="padding-left: 10px;">' + '{{row.entity.WifeEmail}}' + '</div>'
                },
                {
                    name: 'Action',                    
                    width: '15%',
                    cellTemplate: '<div style="padding-left: 10px;"><div class="btn-group">' +
                  		'<button type="button" class="btn btn-default btn-sm"><i class="fa fa-edit" ng-click="grid.appScope.editPatient(row.entity.Id);"></i></button>' +
                  		'<button type="button" class="btn btn-default btn-sm"><i class="fa fa-reorder" ng-click="grid.appScope.ViewPatientDetailsForm(row.entity.Id);"></i></button>' +
                  		'<button type="button" class="btn btn-default btn-sm"><i class="fa fa-trash-o" ng-click="grid.appScope.deletePatient(row.entity.Id);"></i></button></div></div>'
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

			var loadPatients = function(){
				var operation = {
					'operation' : 'get',
					'token' : $cookies.get('token')
				}
				patientService.patientOperations(operation).then(function(data){
					console.log(data);					
					$scope.patientGrid.data = arrangeData(data);
				})	
			};

			var arrangeData = function(rawPatient){
				var rawPatient = rawPatient.data;
				var patientData = [];
				for(var i=0; i<rawPatient.length; i++){
					patientData[i] = {};
					patientData[i].Id = rawPatient[i].patient_id;
					patientData[i].HusbandName = rawPatient[i].husband_name;
					patientData[i].WifeName = rawPatient[i].wife_name;
					
					patientData[i].HusbandBloodgroup = rawPatient[i].husband_blood_group;
					patientData[i].HusbandHeight = rawPatient[i].husband_height;
					patientData[i].HusbandWeight = rawPatient[i].husband_weight;
					patientData[i].HusbandAge = rawPatient[i].husband_age;
					patientData[i].HusbandDob = rawPatient[i].husband_dob;
					patientData[i].HusbandPhone = rawPatient[i].husband_phone;
					patientData[i].HusbandEmail = rawPatient[i].husband_email;
					patientData[i].address = rawPatient[i].address;
					patientData[i].HusbandBmi = rawPatient[i].husband_bmi;
					
					patientData[i].WifeBloodGroup = rawPatient[i].wife_blood_group;
					patientData[i].WifeHeight = rawPatient[i].wife_height;
					patientData[i].WifeWeight = rawPatient[i].wife_weight;
					patientData[i].WifeAge = rawPatient[i].wife_age;
					patientData[i].WifeDob = rawPatient[i].wife_dob;
					patientData[i].WifePhone = rawPatient[i].wife_phone;
					patientData[i].WifeEmail = rawPatient[i].wife_email;
					patientData[i].WifeBmi = rawPatient[i].wife_bmi;
					
					patientData[i].MarriageDate = rawPatient[i].marridge_date;
					patientData[i].MarriageSince = rawPatient[i].marridge_since;
					
				}
				return patientData;
			};
			
			$scope.addUpdatePatient = function(){
				validatePatient().then(function(str){
					if (str.length > 0) {
						$scope.errorMessage = str;
						$scope.error = true;
					}else{
						savePatientDetails();
					}
				});				
			};
			
			var validatePatient = function(){
				var deferred = $q.defer();
				if($scope.patient.husband_name == undefined || $scope.patient.husband_name == ""){
					deferred.resolve("Please enter Husband Name");	
				}else if ($scope.patient.wife_name == undefined || $scope.patient.wife_name == "") {
					deferred.resolve("Please enter Wife address");		
				}else{
					deferred.resolve("");	
				}		
				return deferred.promise;
			};
			
			var savePatientDetails = function(){
				$scope.patient['operation'] = 'add';
				/*if ($routeParams.Id) {					
					$scope.patient['Id'] = $routeParams.Id;
					$scope.patient['operation'] = 'update';
				}else{
					$scope.patient['operation'] = 'add';	
				}*/				
				$scope.patient['token'] = $cookies.get('token');
				patientService.patientOperations($scope.patient).then(function(data){
					console.log(data)
					if(data.success == true)
						$location.path("/patientDetails");
					else if (data.error == true) {

					}
				});
			};
			
			$scope.ViewPatientDetailsForm = function(patientId){
				$location.path("/patientView/"+patientId);
			};

			$scope.ViewPatientDetailsForm = function(patientId){
				$location.path("/patientView/"+patientId);
			};
			
			$scope.ViewPatient = function(){
				var operation = {
					'operation' : 'getById',
					'token' : $cookies.get('token'),
					'Id' : $routeParams.Id 
				}
				patientService.patientOperations(operation).then(function(data){
					console.log(data);		
					if(data.success == true)			
						$scope.patient = data.data[0];
					else if (data.error = true) {

					}
				})
			};
			
			$scope.ViewPatientGrid = function(){
				$location.path("/patientDetails");
			}
					    
		}]);
})();

ivfApp.factory("patientService",["$http", '$q', "baseSvc", function($http, $q, baseSvc){

	var patientOperations = function(operation){
		var url = "services/patient/PatientOperations.php";
		return baseSvc.postRequest(url, operation);
	};

	return{
		patientOperations : patientOperations	
	};
}]);
  
