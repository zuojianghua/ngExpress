/**
 * {{$title}}控制器
 * @date {{$date}}
 * create by angular.php {{$version}}
 * 模板变量
 * $date    生成日期
 * $version 生成版本号
 * $class_name 类名
 * $title   页面标题
 * $router  页面路由
 * $api     查询数据API地址
 */
var {{$class_name}} = ['$rootScope', '$scope', '$location', '$window', 'api',
    function ($rootScope, $scope, $location, $window, api) {
        //本页面的各种属性数据
        var data = {
            'title': '{{$title}}',
            'list_data': [],
            'page_data': {},
            'search_data': {}
        };
        $scope.data = $scope.construct(data,'{{$router}}');

        //列表表头的字段，可以显示和隐藏的
        var field_data = [
            {'key':'demo','name':'演示'},
        ];

        //清空搜索条件
        $scope.form_clear = function () {
            $scope.data.search_data = {};
        }

        //数据查询
        $scope.form_search = function () {
            api.request('{{$api}}', { 'search_data': $scope.data.search_data, 'page_data': $scope.data.page_data }).then(function (result) {
                if(result.status==1){
                    $scope.data.list_data = result.data.data;
                    $scope.data.page_data = result.data.page_data;
                }
            });
        }

        //删除数据
        $scope.list_del = function (id) {
            api.request('to/your/path', { id: id }).then(function (result) {
                if (result.status == 1) {
                    alert('操作成功');
                    $scope.form_search();
                }
            });
        }
        //启用数据
        $scope.list_start = function (id) {
            api.request('to/your/path', { id: id }).then(function (result) {
                if (result.status == 1) {
                    alert('操作成功');
                    $scope.form_search();
                }
            });
        }
        //停用数据
        $scope.list_stop = function (id) {
            api.request('to/your/path', { id: id }).then(function (result) {
                if (result.status == 1) {
                    alert('操作成功');
                    $scope.form_search();
                }
            });
        }

        //首次进入先查询一次
        if ($scope.data.list_data == undefined || $scope.data.list_data.length == 0) {
            $scope.form_search();
        }

        $scope.title_data = [
            { 'ico': 'glyphicon-plus', 'name': '新增', 'click': () => { $location.path('/to/your/path') } },
            { 'ico': 'glyphicon-chevron-down', 'name': '展开和收缩更多查询条件', 'click': () => { $scope.data.search_field_more = !$scope.data.search_field_more } },
            { 'ico': 'glyphicon glyphicon-cog', 'name': '表头设置', 'click': () => { $scope.set_table_list_field('{{$router}}', field_data) } }
        ];

    }];

{{$class_name}}.$injector = ['$rootScope', '$scope', '$location', '$window', 'api'];