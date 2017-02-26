angular.module('filters', [])
    .filter('demoFilter', function(){
        return function(input){
            return input + '>>>------>';
        };
    });
