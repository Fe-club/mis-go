angular.module('app', [
    'config',
    'routers',
    'directives',
    'filters',
    'http.service',
    // 'commonService',
    // 'endpoints',
    // 'apiService',
    'controllers'
    ]);

angular.module('app').config(['$locationProvider', function($locationProvider){
    console.log('app config');
}]);

angular.module('app').run(['$http', '$rootScope', 'HttpService', function($http, $rootScope, HttpService){
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
    $rootScope.$on('$stateChangeStart', function(event){

    });

    // 版本控制
    var version = {
        'status.code': '1.1'
    };
    // 页面资源加载完毕
    document.onreadystatechange = function(){
        if(document.readyState === 'complete'){
            Object.keys(version).forEach(function(key){
                var item = localStorage.getItem(key);
                if(item === null || JSON.parse(item).version !== version[key]){
                    $http({
                        url: '/static/modules/' + key + '.json',
                        method: 'GET',
                        timeout: 12000,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function(respons){
                        var data = respons.data;
                        data.version = version[key];
                        localStorage.setItem(key, JSON.stringify(data));
                    });
                }
            });
        }
    };
}]);
