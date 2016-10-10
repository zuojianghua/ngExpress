angular.module("myDirective").directive("selectSimple", function () {
    return {
        restrict: 'E',
        scope: {
            inputValue: '=',    //输入框中的值
            inputSelect: '=',   //选择框中的数据源
            inputReadonly: '=',  //是否只读
            inputChange: '='
        },
        templateUrl: 'html/directive/selectsimple/DirectiveSelectSimple.html',
        controller: ['$scope', '$element', 'ngDialog', function ($scope, $element, ngDialog) {
            //获取数据
            $scope.inputSelect({ search_data: $scope.search_data, page_data: $scope.page_data }).then(function (ret) {
                $scope.select_data = ret.data;
                //默认值设置
                if (typeof $scope.inputValue == 'undefined') {
                    return;
                }
                $scope.select_data.forEach(function (o) {
                    if (typeof $scope.inputValue != 'undefined' && o.code == $scope.inputValue) {
                        $scope.select = o;
                    }
                });
            });

            //选中
            $scope.change = function () {
                $scope.inputValue = $scope.select.code;
                if($scope.inputChange!=undefined){
                	$scope.inputChange($scope.inputValue);
                }
            };

        }]
    }
});