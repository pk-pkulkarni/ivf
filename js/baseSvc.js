ivfApp.factory("baseSvc", ["$http", "$q", function ($http, $q) {
    var postRequest = function(url, data){
        var deferred = $q.defer();
        $http({
            method: 'post',
            url: url,
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function(response) {
            deferred.resolve(response.data);            
        },function(error) {
         //Error
        });
        return deferred.promise;
    };
    return {            
        postRequest: postRequest            
    };
}]);
