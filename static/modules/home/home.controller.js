angular.module('controllers', []);
angular.module('controllers').controller('homeCtrl',
    ['$scope', 'HttpService', function($scope, HttpService){
        console.log('home');

        HttpService.get().then(function(data){
            console.log(data);
        });
    }]);
