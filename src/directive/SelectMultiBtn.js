myDirective.directive("selectMultiBtn", function () {
    return {
        restrict: 'E',
        scope: {
            inputSelect: '=',      //选择框中的数据源
            inputTitle: '@',       //弹框的标题
            inputReadonly: '=',    //是否只读
            inputFunc: '='         //选择后的回调方法         
        },
        template: '<button class="button" title="{{inputTitle}}" ng-click="open_select_window()"><span class="glyphicon glyphicon-plus" ng-class="btn.ico">{{inputTitle}}</span></button>',
        controller: ['$scope', '$element', 'ngDialog', function ($scope, $element, ngDialog) {
            
            //用于复选框的模型
            $scope.checkbox_value = {};
            //用于显示在输入框的code和name临时数组
            $scope.check_code_arr = [];
            $scope.check_name_arr = [];
            //设置选中值
            $scope.set_value = function () {
                $scope.inputFunc($scope.check_code_arr);
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
                $scope.list_data.forEach(function (o) {
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
                $scope.list_data.forEach(function (o) {
                    $scope.checkbox_value = {};
                    $scope.check_code_arr = [];
                    $scope.check_name_arr = [];

                });
            }
            
            //搜索，分页，列表数据
            $scope.search_data = {};
            $scope.page_data = {};
            $scope.list_data = [];
            
            //进行查询
            $scope.form_search = function(){
                $scope.inputSelect({ search_data: $scope.search_data, page_data: $scope.page_data }).then(function (ret) {
                    $scope.list_data = ret.data;
                    $scope.page_data = ret.page_data;
                });
            }

            //打开查询页面
            var open_select_window_id = 0;
            $scope.open_select_window = function () {
                if($scope.inputReadonly){
                    return;
                }
                //从界面中传入方法，查询数据
                $scope.form_search();
                open_select_window_id = ngDialog.open({
                    overlay: true,
                    disableAnimation: true,
                    showClose: true,
                    width: '',
                    template: 'html/directive/selectmulti/DirectiveSelectMultiWindow.html',
                    scope: $scope
                });
            }
        }]
    }
});