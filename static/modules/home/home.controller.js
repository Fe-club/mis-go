angular.module('controllers', []);
angular.module('controllers').controller('homeCtrl',
    ['$scope', 'HttpService', 'Mapping', function($scope, HttpService, Mapping){
        console.log('home');
        console.log(Mapping);
        $scope.data = {
            gender: Mapping.gender
        };

        $scope.slidingInit = {
            success: function(){
                console.log('sliding valid success!!!');
                return true;
            }
        };

        HttpService.get().then(function(data){
            console.log(data);
        });
    }]);
