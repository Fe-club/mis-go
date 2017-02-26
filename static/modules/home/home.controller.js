angular.module('controllers', []);
angular.module('controllers').controller('homeCtrl',
    ['$scope', 'httpService', function($scope, httpService){
        console.log('home');

        httpService.get().then(function(data){
            console.log(data);
        });
    }]);
