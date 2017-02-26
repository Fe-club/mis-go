angular.module('directives', [])
    .directive('demoDirective', function(){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                init: '@'
            },
            link: function(scope, element, attrs){
                console.log('directive');
            },
            template: '<div>第一个指令-来自{{init | demoFilter}}</div>'
        };
    });
