/**
 * 列表样例页面控制器
 * @author zuojianghua<28842136@qq.com>
 * @date 2016-08-10
 */
var DemoListCtrl = ['$rootScope', '$scope', '$location', '$window', 'api',
    function ($rootScope, $scope, $location, $window, api) {
        //本页面的各种属性数据
        var data = {
            'title':'标题',
            'list_data': [],
            'page_data': {},
            'search_data': {}
        };
        $scope.data = $scope.construct(data,'demo/list');

        //清空搜索条件
        $scope.form_clear = function () {
            $scope.data.search_data = {};
        }

        //数据查询
        $scope.form_search = function () {
            api.request('demo/get_list', { 'search_data': $scope.data.search_data, 'page_data': $scope.data.page_data }).then(function (result) {
                if(result.status==1){
                    $scope.data.list_data = result.data.data;
                    $scope.data.page_data = result.data.page_data;
                }
                console.log($scope.data.list_data);
            });
        }

        //首次进入先查询一次
        if ($scope.data.list_data == undefined || $scope.data.list_data.length == 0) {
            $scope.form_search();
        }

        $scope.title_data = [
            { 'ico': 'glyphicon-plus', 'name': '新增', 'click': () => { $location.path('/crm/vip_level/add') } }
        ];

    }];

DemoListCtrl.$injector = ['$rootScope', '$scope', '$location', '$window', 'api'];