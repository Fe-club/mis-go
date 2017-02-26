angular.module('routers', ['ui.router']);
angular.module('routers').config(['$stateProvider', function($stateProvider){
    var basePath = '/static/views';

    $stateProvider.state({
        name: 'home',
        url: '/',
        views: {
            'content': {
                controller: 'homeCtrl',
                templateUrl: basePath + '/home.html'
            }
        }
    });
}]);
