var ComponentTabCtrl = ['$rootScope', '$scope', '$location', '$window',
    function ($rootScope, $scope, $location, $window) {
        //点击TAB页面
        $scope.click_tab = function(url){
            $location.path(url);
        }

        //关闭TAB页面
        $scope.close_tab = function (k) {
            if(k=='/dashboard'){
                return;
            }
            if($rootScope.histroy_url){
                $location.path($rootScope.histroy_url);
            }else{
                $location.path('/dashboard');
            }
            $location.replace();
            delete $rootScope.histroy[k];
        };
    }];