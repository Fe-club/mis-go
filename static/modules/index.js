angular.module('app', [
    'config',
    'routers',
    'directives',
    'filters',
    'httpService',
    // 'commonService',
    // 'endpoints',
    // 'apiService',
    'controllers'
    ]);

angular.module('app').config(['$locationProvider', function($locationProvider){
    console.log(123);
}]);

angular.module('app').run(['$http', '$rootScope', function($http, $rootScope){
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';

    $rootScope.$on('$stateChangeStart', function(event){

    });
}]);
