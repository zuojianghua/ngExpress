//视图文件共享 selectSingle 的
angular.module("myDirective").directive("selectSingleBtn", function () {
    return {
        restrict: 'E',
        scope: {
            inputSelect: '=',      //选择框中的数据源
            inputTitle: '@',       //弹框的标题
            inputReadonly: '=',    //是否只读
            inputFunc: '='         //选择后的回调方法         
        },
        template: '<button ng-click="open_select_window();">{{inputTitle}}</button>',
        controller: ['$scope', '$element', 'ngDialog', function ($scope, $element, ngDialog) {
            //设置选中值
            $scope.set_value = function (v) {
                $scope.inputFunc(v);
                ngDialog.close(open_select_window_id);
            }
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
                    template: 'html/directive/selectsingle/DirectiveSelectSingleWindow.html',
                    scope: $scope
                });
            }
        }]
    }
});