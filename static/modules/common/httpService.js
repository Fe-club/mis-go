angular.module('httpService', [])
    .service('httpService', ['$http', function($http){
        return {
            get: function(httpConfig){
                var that = this;
                return that.http();
            },
            http: function(config){
                return $http({
                    url: '/api/test/list.json',
                    method: 'GET',
                    timeout: 12000,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function(respons){
                    return respons.data;
                }).catch(function(error){
                    console.error(error);
                });
            }
        };
    }]);
