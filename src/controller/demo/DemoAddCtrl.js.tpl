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
 * $valid   验证配置
 */
var {{$class_name}} = ['$rootScope', '$scope', '$location', '$window', 'api', 'valid',
    function ($rootScope, $scope, $location, $window, api, valid) {
        //本页面的各种属性数据
        //如果有初始值写在此处
        var data = {
            'title': '{{$title}}',
            'form_data': {
                'address_array': {}
            }
        };
        $scope.data = $scope.construct(data, '{{$router}}');
        //标题栏按钮动作 ===============================================
        $scope.title_data = [
            { 'ico': 'glyphicon-th-list', 'name': '列表', 'click': () => { $location.path('/{{$router}}') } }
        ];
        //表单按钮动作 =================================================
        $scope.form_save = function () {
            var ret = valid.check([
                {{$valid}}
            ]);
            $scope.valid = ret.data;
            if (!ret.status) {
                //alert('表单验证失败');
                return;
            }
            api.request('{{$api}}', { 'form_data': $scope.data.form_data }).then(function (result) {
                if(false!==result){
                    $location.path('/{{$router}}');
                }
            });
        }

        $scope.form_cancel = function () {
            $scope.data.form_data = {
                'address_array': {}
            };
        }

    }];

{{$class_name}}.$injector = ['$rootScope', '$scope', '$location', '$window', 'api', 'valid'];