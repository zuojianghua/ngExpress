/**
 * 新增控制器
 */
var DemoAddCtrl = ['$rootScope', '$scope', '$location', '$window', 'api', 'valid',
    function ($rootScope, $scope, $location, $window, api, valid) {
        //本页面的各种属性数据
        var data = {
            'title': '示例新增',
            'form_data': {
                'address_array': {}
            }
        };
        $scope.data = $scope.construct(data, 'demo/add');
        //标题栏按钮动作 ===============================================
        $scope.title_data = [
            { 'ico': 'glyphicon-th-list', 'name': '列表', 'click': function(){ $location.path('/demo/index') } }
        ];
        //表单按钮动作 =================================================
        $scope.form_save = function () {
            var ret = valid.check([
                { 'key': 'customer_name', 'valid': 'check_required', 'data': $scope.data.form_data.customer_name, 'tip': '顾客名称必填' },
                { 'key': 'customer_tel', 'valid': 'check_required', 'data': $scope.data.form_data.customer_tel, 'tip': '顾客手机号必填' },
                { 'key': 'org_code', 'valid': 'check_required', 'data': $scope.data.form_data.org_code, 'tip': '渠道必填' },
                { 'key': 'shop_code', 'valid': 'check_required', 'data': $scope.data.form_data.shop_code, 'tip': '店铺必填' }
            ]);
            $scope.valid = ret.data;
            if (!ret.status) {
                //alert('表单验证失败');
                return;
            }
            api.request('demo/add', { 'form_data': $scope.data.form_data }).then(function (result) {
                if(false!==result){
                    $location.path('/demo/index');
                }
            });
        }

        $scope.form_cancel = function () {
            $scope.data.form_data = {
                'address_array': {}
            };
        }

    }];

DemoAddCtrl.$injector = ['$rootScope', '$scope', '$location', '$window', 'api', 'valid'];