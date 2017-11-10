"use strict";
(function () {
	angular.module("peopleApp", ["ngRoute", "oc.lazyLoad"])
		.config(["$routeProvider", function ($routeProvider) {
		$routeProvider.when("/", {
			templateUrl: "templates/people/patientDetails.html",
			controller: "allPeopleCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/people/patientDetails.js']);
				}]
			}
		}).when("/login", {
			templateUrl: "templates/Login/login.html",
			controller: "loginCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/Login/loginCtrl.js']);
				}]
			}
		}).when("/harmones", {
			templateUrl: "templates/people/harmones.html",
			controller: "addPersonCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/people/harmones.js']);
				}]
			}
		}).when("/semen", {
			templateUrl: "templates/people/semen.html",
			controller: "addPersonCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/people/semen.js']);
				}]
			}
		}).when("/procedure", {
			templateUrl: "templates/people/procedure.html",
			controller: "addPersonCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/people/procedure.js']);
				}]
			}
		})
		.when("/ovum", {
			templateUrl: "templates/people/ovum.html",
			controller: "addPersonCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/people/ovum.js']);
				}]
			}
		}).when("/embryoTransfer", {
			templateUrl: "templates/people/embryoTransfer.html",
			controller: "addPersonCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/people/embryoTransfer.js']);
				}]
			}
		}).when("/cryo", {
			templateUrl: "templates/people/cryo.html",
			controller: "addPersonCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/people/cryo.js']);
				}]
			}
		})
		.when("/result", {
			templateUrl: "templates/people/result.html",
			controller: "addPersonCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/people/result.js']);
				}]
			}
		}).when("/stimulation", {
			templateUrl: "templates/people/stimulation.html",
			controller: "editPersonCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/people/stimulation.js']);
				}]
			}
		});
	}]);
})();