var IndexIndexCtrl = ['$rootScope', '$scope', '$location', '$window', 'api',
    function ($rootScope, $scope, $location, $window, api) {
        $rootScope.nav  = '';           //一级菜单标识
        $rootScope.menu = '';           //二级菜单标识
        $rootScope.url  = '/index';     //本页url地址

        if (!$rootScope.histroy.hasOwnProperty('/index')) {
            //Tab标签的顺序
            var order = Object.keys($rootScope.histroy);
            //本页面scope内的属性定义在此
            $scope = {
                title:'测试列表页',
                content:'测试内容',
                order:order,

                list_data: [],
                filter_data: {
                    'qudao': '001'
                },
                page_data: {}
            };
            //纳入到tab历史中
            $rootScope.histroy['/index'] = {
                scope:$scope,
                order:order
            };
        }else{
            //Tab标签的顺序
            var order = $rootScope.histroy['/index'].order;
            $scope.order = order;
        }


        api.request('custom_list').then(function (res) {
            $rootScope.histroy['/index'].scope.list_data = res.data.data.data;
            $rootScope.histroy['/index'].scope.filter_data = res.data.data.filter;
            $rootScope.histroy['/index'].scope.page_data = res.data.data.page;
            //console.log(res.data.data.data[0]);
        });

    }];

IndexIndexCtrl.$injector = ['$rootScope', '$scope', '$location', '$window'];