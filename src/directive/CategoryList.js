myDirective.directive("categoryList", function () {
    return {
        restrict: 'E',
        scope: {
            listTitle: '@',     //分类列表的标题
            listValue: '=',    //绑定的数据
            listDefaultShow: '=', //默认展开或者关闭，默认是展开
            itemClick: '='     //列表项点击后的事件
        },
        templateUrl: 'html/directive/categorylist/DirectiveCategorylist.html',
        controller: ['$scope', '$element', function ($scope, $element) {
            $scope.click = function(v){
                if(typeof $scope.itemClick=='function'){
                    $scope.itemClick(v);
                }
//                console.log(v);
            }
            
        }]
    }
});