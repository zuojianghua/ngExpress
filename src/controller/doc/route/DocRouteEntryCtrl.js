/**
 * 入口控制器
 * @date 2016-12-03
 * create by angular.php 1.0
 * 模板变量
 * $date    生成日期
 * $version 生成版本号
 * $class_name 类名
 * $title   页面标题
 * $router  页面路由
 * $api     查询数据API地址
 * $valid   验证配置
 */
var DocRouteEntryCtrl = ['$rootScope', '$scope', '$location', '$window', 'api', 'valid',
    function ($rootScope, $scope, $location, $window, api, valid) {
        //本页面的各种属性数据
        //如果有初始值写在此处
        var data = {
            'title': '入口',
            'form_data': {
                'address_array': {}
            }
        };
        $scope.data = $scope.construct(data, 'doc/route/entry');
        //标题栏按钮动作 ===============================================
        $scope.title_data = [
            { 'ico': 'glyphicon-th-list', 'name': '列表', 'click': function() { $location.path('/doc/route/entry') } }
        ];
        //表单按钮动作 =================================================
        $scope.form_save = function () {
            var ret = valid.check([
                
            ]);
            $scope.valid = ret.data;
            if (!ret.status) {
                //alert('表单验证失败');
                return;
            }
            api.request('', { 'form_data': $scope.data.form_data }).then(function (result) {
                if(false!==result){
                    $location.path('/doc/route/entry');
                }
            });
        }

        $scope.form_cancel = function () {
            $scope.data.form_data = {
                'address_array': {}
            };
        }

    }];

DocRouteEntryCtrl.$injector = ['$rootScope', '$scope', '$location', '$window', 'api', 'valid'];