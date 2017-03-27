(function(){
    angular.module('controllers').controller('pagerCtrl', ['$scope', '$timeout', function($scope, $timeout){
        $scope.pagerInit = {
            // page: 12,
            pageCount: undefined,
            callback: function(page){
                console.log('>>>------>  第' + page + '页');
            }
        };

        $timeout(function(){
            $scope.pagerInit.pageCount = 16;
        });
    }]);
}());
