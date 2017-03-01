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
    console.log(123);
}]);

angular.module('app').run(['$http', '$rootScope', 'HttpService', function($http, $rootScope, HttpService){
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
    $rootScope.$on('$stateChangeStart', function(event){

    });

    var version = {
        'status.code.json': '1'
    };

    // 页面资源加载完毕
    document.onreadystatechange = function(){
        if(document.readyState === 'complete'){

        }
    };
}]);
