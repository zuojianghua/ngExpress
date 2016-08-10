/**
 * 查看样例页面控制器
 * @author zuojianghua<28842136@qq.com>
 * @date 2016-08-10
 */
var DemoViewCtrl = ['$rootScope', '$scope', '$location', '$window',
    function ($rootScope, $scope, $location, $window) {
        $rootScope.nav  = 'n0';           //一级菜单标识
        $rootScope.menu = 'm1';           //二级菜单标识
        $rootScope.subMenu = 's02';        //三级菜单标识
        $rootScope.url  = '/demo/view';     //本页url地址

        if (!$rootScope.histroy.hasOwnProperty('/demo/view')) {
            //Tab标签的顺序
            var order = Object.keys($rootScope.histroy);
            //本页面scope内的属性定义在此
            $scope = {
                title:'测试列表页',
                content:'',
                order:order
            };
            //纳入到tab历史中
            $rootScope.histroy['/demo/view'] = {
                scope:$scope,
                order:order
            };
        }else{
            //Tab标签的顺序
            var order = $rootScope.histroy['/demo/view'].order;
            $scope.order = order;
        }

    }];

DemoViewCtrl.$injector = ['$rootScope', '$scope', '$location', '$window'];