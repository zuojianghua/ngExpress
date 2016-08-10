var myDirective = angular.module("myDirective", []);

myDirective.directive("selectSingle",function(){
    return {
        restrict:'E',
        scope:{
              inputValue:'=',    //输入框中的值
              inputName:'=',     //输入框中用于显示的值
              inputSelect:'=',   //选择框中的数据源
              inputTitle:'@',    //弹框的标题
              inputPlaceholder:'@'  //默认值
        },
        templateUrl:'/html/directive/selectsingle/DirectiveSelectSingle.html',
        controller :['$scope', '$element', 'ngDialog',function($scope, $element, ngDialog){
            //$scope.inputValue = 'aaaa';
            //设置选中值
            $scope.set_value = function(v){
                $scope.inputValue = v.code;
                $scope.inputName = v.name;
                ngDialog.close(open_select_window_id);
            }
            //清空选中值
            $scope.clear_input_data = function(){
                $scope.inputValue = '';
                $scope.inputName = '';
            }
            //打开查询页面
            var open_select_window_id = 0;
            $scope.open_select_window = function(){
                //从界面中传入方法，查询数据
                $scope.list = $scope.inputSelect();
                open_select_window_id = ngDialog.open({
                    overlay:true,
                    disableAnimation:true,
                    showClose:true,
                    width:400,
                    template:'/html/directive/selectsingle/DirectiveSelectSingleWindow.html',
                    scope:$scope
                });

            }
        }]
    }
});