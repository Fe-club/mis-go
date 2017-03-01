angular.module('config', [])
    .config(['$locationProvider', function($locationProvider){
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }])
    .constant('GlobalConfig', {
        dev: {
            apiDomain: '',
            staticDomain: '',
            debug: true,
            mockDB: true
        },
        test: {
            apiDomain: '',
            staticDomain: '',
            debug: true,
            mockDB: false
        },
        production: {
            apiDomain: '',
            staticDomain: '',
            debug: false,
            mockDB: false
        },
        init: function(env){
            return this[env];
        }
    }.init('dev'));
