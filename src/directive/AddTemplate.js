myDirective.directive("addTemplate", function () {
     return {
        restrict: 'E',
        scope: {
        	inputTitle: '@',		//弹出框标题
            inputFunc: '=',         //选择后的回调方法         
            inputText: '@',			//显示文字
            inputTpl: '@',			//模版名称
            inputFilter: '='		//额外的参数
        },
        template: '<button class="button" title="{{inputTitle}}" ng-click="open_select_window()">{{inputText}}</button>',
        controller: ['$rootScope', '$scope', '$element', 'ngDialog', function ($rootScope, $scope, $element, ngDialog) {
            //用于复选框的模型
            $scope.from_data = {};
            //下拉列表数据
            $scope.search_data_option = $rootScope.search_data_option;
            //点击保存按钮
            $scope.form_save = function(){
            	if(typeof $scope.inputFilter == 'object'){
            		for(k in $scope.inputFilter){
            			$scope.from_data[k] = $scope.inputFilter[k];
            		}
            	}
            	$scope.inputFunc($scope.from_data);
            	$scope.from_data = {};
                ngDialog.close(open_select_window_id);
            }
            
            //打开查询页面
            var open_select_window_id = 0;
            var template = 'html/directive/addtemplate/Directive'+$scope.inputTpl+'Window.html';
            $scope.open_select_window = function () {
                //从界面中传入方法，查询数据
                open_select_window_id = ngDialog.open({
                    overlay: true,
                    disableAnimation: true,
                    showClose: true,
                    width: '',
                    template: template,
                    scope: $scope
                });
            }
        }]
    }
});