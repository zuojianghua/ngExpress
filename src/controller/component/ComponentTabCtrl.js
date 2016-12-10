var ComponentTabCtrl = ['$rootScope', '$scope', '$location', '$window',
    function ($rootScope, $scope, $location, $window) {
        //点击TAB页面
        $rootScope.click_tab = function(url){
            $location.path(url);
        }

        //关闭TAB页面
        $rootScope.close_tab = function (k) {
            if(k=='/dashboard'){
                return;
            }
            delete $rootScope.histroy[k];
            if($rootScope.histroy_url && $rootScope.histroy.hasOwnProperty($rootScope.histroy_url)){
                $location.path($rootScope.histroy_url);
            }else{
                $location.path('/dashboard');
            }
            $location.replace();
        };

        //关闭全部TAB页面
        $rootScope.close_tab_all = function(){
            $scope.confirm('确定要关闭全部页签嘛？',function(){
                for (var key in $rootScope.histroy) {
                    if ($rootScope.histroy.hasOwnProperty(key) && key!='/dashboard') {
                        delete $rootScope.histroy[key];
                    }
                }
                $location.path('/dashboard');
                $location.replace();
            });
        };

        //TAB滚动
        $scope.tab_scroll = function(direction){
            var sl=$("#tab_ul").scrollLeft();
            $("#tab_ul").stop();
            if(direction=='left'){
                $("#tab_ul").animate({
                    scrollLeft: sl+=300
                }, 1000);
            }else if (direction=='right') {
                $("#tab_ul").animate({
                    scrollLeft: sl-=300
                }, 1000);
            };
        }

    }];