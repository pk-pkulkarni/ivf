
var ivfApp = angular.module("ivfApp", ["ngRoute", "oc.lazyLoad", "ngCookies", "ui.grid", "ui.grid.pagination"])
		.config(["$routeProvider", function ($routeProvider) {
		$routeProvider
		.when("/centerDetails", {
			templateUrl: "templates/center/centerDetails.html",
			controller: "centerCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load([						
						'js/controllers/center/centerCtrl.js'						
					]);
				}]
			}
		})
		.when("/centerAdd", {
			templateUrl: "templates/center/centerAdd.html",
			controller: "centerCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/center/centerCtrl.js']);
				}]
			}
		})		
		.when("/centerView/:Id", {
			templateUrl: "templates/center/centerView.html",
			controller: "centerCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/center/centerCtrl.js']);
				}]
			}
		})
		.when("/centerEdit/:Id", {
			templateUrl: "templates/center/centerEdit.html",
			controller: "centerCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/center/centerCtrl.js']);
				}]
			}
		})
		.when("/userDetails", {
			templateUrl: "templates/user/userDetails.html",
			controller: "userCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load([						
						'js/controllers/user/userCtrl.js'						
					]);
				}]
			}
		})
		.when("/userAdd", {
			templateUrl: "templates/user/userAdd.html",
			controller: "userCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/user/userCtrl.js']);
				}]
			}
		})		
		.when("/userView/:Id", {
			templateUrl: "templates/user/userView.html",
			controller: "userCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/user/userCtrl.js']);
				}]
			}
		})
		.when("/userEdit/:Id", {
			templateUrl: "templates/user/userEdit.html",
			controller: "userCtrl",
			resolve: {
				loadAsset: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load(['js/controllers/user/userCtrl.js']);
				}]
			}
		});
	}]);