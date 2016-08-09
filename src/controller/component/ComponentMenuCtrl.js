var ComponentMenuCtrl = ['$rootScope', '$scope', '$location', '$window',
    function ($rootScope, $scope, $location, $window) {
        $scope.isShow = [];
        $scope.show_submenu = function(index){
            if(typeof $scope.isShow[index]=='undefined'){
                $scope.isShow[index] = true;
            }
            $scope.isShow[index] = !$scope.isShow[index];
        };
    }];