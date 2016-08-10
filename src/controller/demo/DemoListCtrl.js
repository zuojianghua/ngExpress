/**
 * 列表样例页面控制器
 * @author zuojianghua<28842136@qq.com>
 * @date 2016-08-10
 */
var DemoListCtrl = ['$rootScope', '$scope', '$location', '$window', 'api',
    function ($rootScope, $scope, $location, $window, api) {
        $rootScope.nav  = 'n0';           //一级菜单标识
        $rootScope.menu = 'm1';           //二级菜单标识
        $rootScope.subMenu = 's01';        //三级菜单标识
        $rootScope.url  = '/demo/list';     //本页url地址

        //首次加载
        if (!$rootScope.histroy.hasOwnProperty('/demo/list')) {
            //Tab标签的顺序
            var order = Object.keys($rootScope.histroy);

            //本页面scope内的属性定义在此
            $scope.data = {
                title :'单据列表页',
                content : ''
            }
            

            //纳入到tab历史中
            $rootScope.histroy['/demo/list'] = {
                scope:$scope,
                order:order
            };

            //获取列表数据
            api.request('custom_list').then(function (res) {
                $scope.data.list_data = res.data.data.data;
                $scope.data.filter_data = res.data.data.filter;
                $scope.data.page_data = res.data.data.page;
            });

        }else{
            $scope.data = $rootScope.histroy['/demo/list'].scope.data;
            //Tab标签的顺序
            var order = $rootScope.histroy['/demo/list'].order;
        }

    }];

DemoListCtrl.$injector = ['$rootScope', '$scope', '$location', '$window', 'api'];