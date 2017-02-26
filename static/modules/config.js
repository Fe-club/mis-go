angular.module('config', [])
    .config(['$locationProvider', function($locationProvider){
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }])
    .constant('globalConfig', {
        apiDomin: 'sdfadfdfds'
    });
