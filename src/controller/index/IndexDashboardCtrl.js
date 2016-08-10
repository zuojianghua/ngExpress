/**
 * 首页面板控制器
 */
var IndexDashboardCtrl = ['$rootScope', '$scope', '$location', '$window',
    function ($rootScope, $scope, $location, $window) {
        $rootScope.nav  = '';           //一级菜单标识
        $rootScope.menu = '';           //二级菜单标识
        $rootScope.subMenu = '';        //三级菜单标识
        $rootScope.url  = '/dashboard';     //本页url地址

        if (!$rootScope.histroy.hasOwnProperty('/dashboard')) {
            //Tab标签的顺序
            var order = Object.keys($rootScope.histroy);
            //本页面scope内的属性定义在此
            $scope.data = {
                title:'首页',
                content:'测试内容'            
            };
            //纳入到tab历史中
            $rootScope.histroy['/dashboard'] = {
                scope:$scope,
                order:order
            };
        }else{
            //Tab标签的顺序
            var order = $rootScope.histroy['/dashboard'].order;
        }

    }];

IndexDashboardCtrl.$injector = ['$rootScope', '$scope', '$location', '$window'];