angular.module('http.service', [])
    .service('HttpService', ['$http', 'GlobalConfig', function($http, GlobalConfig){
        return {
            get: function(httpConfig){
                var that = this;
                console.log(GlobalConfig);
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
