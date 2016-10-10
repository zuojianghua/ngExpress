angular.module("myDirective").directive("tableSimple", function () {
    return {
        restrict: 'E',
        scope: {
            tableHead: '=',     //表头数据映射
            tableBody: '='      //表格数据
        },
        templateUrl: 'html/directive/tableSimple/DirectiveTableSimple.html',
        controller: ['$scope', '$element', 'ngDialog', function ($scope, $element, ngDialog) {
              console.log($scope.tableBody);
        }]
    }
});