/**
 * 首页面板控制器
 */
var IndexDashboardCtrl = ['$rootScope', '$scope', '$location', '$window',
    function ($rootScope, $scope, $location, $window) {
        //本页面的各种属性数据
        var data = {
            'content':'测试数据',
            'title':'首页'
        };
        $scope.data = $scope.construct(data,'dashboard');
    }];

IndexDashboardCtrl.$injector = ['$rootScope', '$scope', '$location', '$window'];