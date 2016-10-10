angular.module("myDirective").directive("selectArea", function () {
    return {
        restrict: 'E',
        scope: {
            inputValue: '=',    //输入框中的地址
            inputReadonly: '='  //是否只读:true只读,false可以编辑
        },
        templateUrl: 'html/directive/selectarea/DirectiveSelectArea.html',
        controller: ['$scope', '$element', 'api', function ($scope, $element, api) {
            //省市区地址数组获取
            api.request('base/region/get_all_tree').then(function (ret) {
                $scope.area_data = ret.data[0].child;
                //默认值设置
                if (typeof $scope.inputValue == 'undefined') {
                    return;
                }
                $scope.area_data.forEach(function (o) {
                    if (typeof $scope.inputValue.province != 'undefined' && o.region_id == $scope.inputValue.province) {
                        $scope.select1 = o;
                        $scope.select1.child.forEach(function (o2) {
                            if (typeof $scope.inputValue.city != 'undefined' && o2.region_id == $scope.inputValue.city) {
                                $scope.select2 = o2;
                                $scope.select2.child.forEach(function (o3) {
                                    if (typeof $scope.inputValue.district != 'undefined' && o3.region_id == $scope.inputValue.district) {
                                        $scope.select3 = o3;
                                    }
                                });
                            }
                        });
                    }
                });
            });

            //选中省
            $scope.change1 = function () {
                $scope.inputValue.province = $scope.select1.region_id;
            };

            //选中市
            $scope.change2 = function () {
                $scope.inputValue.city = ($scope.select2 == null) ? '' : $scope.select2.region_id;
            };

            //选中区县
            $scope.change3 = function () {
                $scope.inputValue.district = ($scope.select3 == null) ? '' : $scope.select3.region_id;
            };

        }]
    }
});