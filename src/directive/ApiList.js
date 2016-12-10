myDirective.directive("apiList", function () {
    return {
        restrict: 'E',
        scope: {
            listTitle: '@',     //�����б��ı���
            listValue: '=',    //�󶨵�����
            listDefaultShow: '=', //Ĭ��չ�����߹رգ�Ĭ����չ��
            itemClick: '='     //�б������������¼�
        },
        templateUrl: 'html/directive/apilist/DirectiveApidetaillist.html',
        controller: ['$scope', '$element', function ($scope, $element) {
//          console.log($scope);
            $scope.click = function(v){
                if(typeof $scope.itemClick=='function'){
                    $scope.itemClick(v);
                }
                //console.log(v);
            }
        }]
    }
});