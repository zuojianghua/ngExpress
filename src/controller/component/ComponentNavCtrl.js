var ComponentNavCtrl = ['$rootScope', '$scope', '$location', '$window',
    function ($rootScope, $scope, $location, $window) {
        //获取二级菜单
        $rootScope.sub_menu = [];
        $scope.click_nav = function(m){
            $rootScope.sub_menu = m.list;
            $rootScope.nav = m.name;
        }
    }];