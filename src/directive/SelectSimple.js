myDirective.directive("selectSimple", function () {
    return {
        restrict: 'E',
        scope: {
            inputValue: '=',    //输入框中的值
            inputName: '=',    //输入框中的值
            inputSelect: '=',   //选择框中的数据源
            inputReadonly: '=',  //是否只读
            inputFilter : '=',   //额外过滤条件，从页面传入
            inputSelectData :'=',
            inputChange: '='
        },
        templateUrl: 'html/directive/selectsimple/DirectiveSelectSimple.html',
        controller: ['$scope', '$element', 'ngDialog', function ($scope, $element, ngDialog) {

            $scope.select_data = {}
            //获取数据
            $scope.form_search = function() {
                if ($scope.inputSelect != undefined) {
                    //console.log($scope.search_data);
                    $scope.inputSelect({
                        search_data: $scope.search_data,
                        page_data: $scope.page_data
                    }).then(function (ret) {
                        //console.log(ret.data);
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
                } else {
                    //console.log($scope.inputSelectData);
                    for(i in $scope.inputSelectData){
                        //console.log($scope.inputSelectData[i].level_name);
                        $scope.inputSelectData[i].name = $scope.inputSelectData[i].level_name
                        $scope.select_data[i] = $scope.inputSelectData[i];
                        console.log($scope.select_data[i]);
                    }
                }
            };
            $scope.form_search();
            //选中
            $scope.change = function () {
                $scope.inputValue = $scope.select.code;
                $scope.inputName = $scope.select.name;
                if($scope.inputChange!=undefined){
                	$scope.inputChange($scope.inputValue);
                }

                console.log($scope.select);
                $scope.select = '';
                console.log($scope.inputValue);
                console.log($scope.inputName);
            };
        }]
    }
});