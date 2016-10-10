angular.module("myDirective").directive("selectMulti", function () {
    return {
        restrict: 'E',
        scope: {
            inputValue: '=',    //输入框中的值
            inputName: '=',     //输入框中用于显示的值
            inputSelect: '=',   //选择框中的数据源
            inputTitle: '@',    //弹框的标题
            inputPlaceholder: '@',  //默认值
            inputReadonly: '=',  //是否只读
            inputTpl:'@'    //弹出框模板
        },
        templateUrl: 'html/directive/selectmulti/DirectiveSelectMulti.html',
        controller: ['$scope', '$element', 'ngDialog','util','api', function ($scope, $element, ngDialog,util,api) {
            //用于复选框的模型
            $scope.checkbox_value = {};
            //用于显示在输入框的code和name临时数组
            $scope.check_code_arr = [];
            $scope.check_name_arr = [];

            //设置选中值，弹框中点击确定后的回调
            $scope.set_value = function () {
                $scope.inputValue = $scope.check_code_arr;
                $scope.inputName = '';
                if ($scope.check_name_arr[0] != '' && $scope.check_name_arr[0] != null) {
                    $scope.inputName = $scope.inputName + $scope.check_name_arr[0];
                }
                if ($scope.check_name_arr[1] != '' && $scope.check_name_arr[1] != null) {
                    $scope.inputName = $scope.inputName + ',' + $scope.check_name_arr[1];
                }
                if ($scope.check_name_arr[2] != '' && $scope.check_name_arr[2] != null) {
                    $scope.inputName = $scope.inputName + ',' + $scope.check_name_arr[2];
                }
                if ($scope.check_name_arr[3] != '' && $scope.check_name_arr[3] != null) {
                    $scope.inputName = $scope.inputName + '...';
                }
                //console.log($scope.inputValue);
                ngDialog.close(open_select_window_id);
            }

            //复选框点击操作
            $scope.update_check = function (li) {
                //console.log(li);
                //console.log($scope.checkbox_value);
                if ($scope.checkbox_value[li.code] == true) {
                    //选中，将此值push进临时数组
                    $scope.check_code_arr.push(li.code);
                    $scope.check_name_arr.push(li.name);
                } else {
                    //取消选中
                    if (-1 != $scope.check_code_arr.indexOf(li.code)) {
                        $scope.check_code_arr.splice($scope.check_code_arr.indexOf(li.code), 1);
                    }
                    if (-1 != $scope.check_name_arr.indexOf(li.name)) {
                        $scope.check_name_arr.splice($scope.check_name_arr.indexOf(li.name), 1);
                    }
                }
            }

            //清空选中值
            $scope.clear_input_data = function () {
                $scope.inputValue = [];
                $scope.inputName = '';
                $scope.check_code_arr = [];
                $scope.check_name_arr = [];
                $scope.checkbox_value = {};
            }
            //全选：将本页复选框都加入到$scope.checkbox_value
            $scope.check_all = function () {
                $scope.list_data.forEach(function(o){
                    $scope.checkbox_value[o.code] = true;
                    if (-1 == $scope.check_code_arr.indexOf(o.code)) {
                        $scope.check_code_arr.push(o.code);
                    }
                    if (-1 == $scope.check_name_arr.indexOf(o.name)) {
                        $scope.check_name_arr.push(o.name);
                    }

                });
            }
            //取消全选
            $scope.check_cancel_all = function () {
                $scope.list_data.forEach(function(o){
                    $scope.checkbox_value = {};
                    $scope.check_code_arr = [];
                    $scope.check_name_arr = [];

                });
            }

            //页面查询和列表数据 -------------------------------------------------------
            $scope.search_data = {};
            $scope.page_data = {};
            $scope.list_data = [];

            //进行查询
            $scope.form_search = function () {
                $scope.inputSelect({ search_data: $scope.search_data, page_data: $scope.page_data }).then(function (ret) {
                    $scope.list_data = ret.data;
                    $scope.page_data = ret.page_data;
                    //$scope.search_data = ret.search_data;
                });
            }

            //打开查询页面
            var open_select_window_id = 0;
            $scope.open_select_window = function () {
                if ($scope.inputReadonly) {
                    return;
                }
                //根据输入的数组，设置弹框内的默认选中状态
                $scope.checkbox_value = {};
                if (typeof $scope.inputValue == 'undefined') {
                    $scope.inputValue = [];
                }
                $scope.inputValue.forEach(function (o) {
                    $scope.checkbox_value[o] = true;
                });
                //从界面中传入方法，查询数据
                var templateUrl = 'html/directive/selectmulti/DirectiveSelectMultiWindow.html';
                var sw = util.strtoUp2($scope.inputTpl);
                switch(sw){
                    //渠道选择器设置
                    case 'SelectOrg':
                        templateUrl = 'html/directive/selectmulti/DirectiveSelectMultiWindow'+sw+'.html';
                        $scope.mutile = {};
                        $scope.mutile.category_data_show = true;
                        $scope.mutile.category_data = [];
                        $scope.mutile.category_click = function(v){
                            //上级渠道Code
                            $scope.search_data.p_code = v.code;
                            $scope.page_data.num = 1;
                            $scope.form_search();
                        }
                        api.request('base/org/get_tree_data_by_code',{'deep_num':3}).then(function(result){
                            $scope.mutile.category_data = result.data;
                        });
                        break;
                }
                
                $scope.form_search();
                open_select_window_id = ngDialog.open({
                    overlay: true,
                    disableAnimation: true,
                    showClose: true,
                    width: '',
                    template: templateUrl,
                    scope: $scope
                });
            }
        }]
    }
});