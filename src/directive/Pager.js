angular.module("myDirective").directive("pager", function () {
    return {
        restrict: 'E',
        scope: {
            pageData: '=',    //分页数据
            pageFunc: '='     //点击页码触发的事件
        },
        templateUrl: 'html/directive/pager/pagerList.html',
        controller: ['$scope', '$element', 'ngDialog', function ($scope, $element, ngDialog) {

            //console.log($scope.pageData);
            //跳转到上一页
            $scope.goto_prev = function(){
                if($scope.pageData.pageNum>1){$scope.pageData.pageNum--};
                $scope.goto_page($scope.pageData.pageNum);
            };

            //跳转到下一页
            $scope.goto_next = function(){
                if($scope.pageData.pageNum<$scope.pageData.countPage){$scope.pageData.pageNum++};
                $scope.goto_page($scope.pageData.pageNum);
            };

            //跳转到首页
            $scope.goto_first = function(){
                $scope.goto_page(1);
            };

            //跳转到尾页
            $scope.goto_last = function(){
                $scope.goto_page($scope.pageData.pageNum);
            };

            //直接跳转到某页
            $scope.goto_page = function(i){
                $scope.pageData.pageNum = i;
                $scope.pageFunc();
            };

            //切换每页显示的数据量，并立刻刷新页面
            $scope.change_page_size = function(i){
                $scope.pageData.num = i;
                $scope.goto_page(1);
            };
        
        }]
    }
});