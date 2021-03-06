myDirective.directive(  "selectSingle", function () {
    return {
        restrict: 'E',
        scope: {
            inputValue: '=',    //输入框中的值
            inputName: '=',     //输入框中用于显示的值
            inputSelect: '=',   //选择框中的数据源
            inputTitle: '@',    //弹框的标题
            inputPlaceholder: '@',  //默认值
            inputReadonly: '=',  //是否只读
            inputFilter : '=',   //额外过滤条件，从页面传入
            inputChange: '=',     //最终选中后的事件
            inputWidth: '@',     //弹框宽度
            inputClear: '='       //清楚关联数据
        },
        templateUrl: 'html/directive/selectsingle/DirectiveSelectSingle.html',
        controller: ['$scope', '$element', 'ngDialog', function ($scope, $element, ngDialog) {
            var width = ($scope.inputWidth) ? $scope.inputWidth :'50%';

            //设置选中值
            $scope.set_value = function (v) {
                $scope.inputValue = v.code;
                $scope.inputName = v.name;
                //console.log($scope.inputName);
                //console.log($scope.inputValue);
                ngDialog.close(open_select_window_id.id);

                //选择确认以后的回调方法
                //console.log(typeof $scope.inputChange);
                if(typeof $scope.inputChange == 'function'){
                    $scope.inputChange(v);
                }
            }
            //清空选中值
            $scope.clear_input_data = function () {
                $scope.inputValue = '';
                $scope.inputName = '';
                if(typeof $scope.inputClear == 'function'){
                    $scope.inputClear();
                }
            }
            $scope.search_data = {};
            $scope.page_data = {};
            $scope.list_data = [];

            //进行查询
            $scope.form_search = function(){
                var filter = { search_data: $scope.search_data, page_data: $scope.page_data };
                if($scope.inputFilter){
                    //console.log($scope.inputFilter);
                    for(i in $scope.inputFilter){
                        //传的值为空，不应该搜索出结果
                        //if($scope.inputFilter[i]!=undefined&&$scope.inputFilter[i]!=''){
                        filter.search_data[i] = $scope.inputFilter[i];
                        //}
                    }
                }
                $scope.inputSelect(filter).then(function (ret) {
                    $scope.list_data = ret.data;
                    $scope.page_data = ret.page_data;
                    //$scope.search_data = ret.search_data;
                    //console.log($scope.list_data);
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
                    width: width,
                    template: 'html/directive/selectsingle/DirectiveSelectSingleWindow.html',
                    scope: $scope
                });
            }
        }]
    }
});