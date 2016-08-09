var IndexMainCtrl = ['$rootScope', '$scope', '$location', '$window','api',
    function ($rootScope, $scope, $location, $window,api) {

        //页签历史记录处理
        $rootScope.histroy = {};
        $rootScope.$on('$routeChangeStart', function (evt, next, current) {
            //console.log($rootScope.histroy);
            // try{
            //     var r = current.$$route.originalPath;
            //     if(!$rootScope.histroy.hasOwnProperty(r)){
            //         console.log($scope.filter_data);
            //         $rootScope.histroy[r] = $scope;
            //     }
            //     //console.log($rootScope.histroy);
            //     //console.log(next.$$route);
            // }catch(e){

            // }
            if(typeof current != 'undefined' && typeof current.$$route != 'undefined' ){
                $rootScope.histroy_url = current.$$route.originalPath;
                //console.log($rootScope.histroy_url);
            }
            
            //打开的TAB数量检测，超过一定数量则不允许再打开
            if (typeof $rootScope.histroy != 'undefined' && Object.keys($rootScope.histroy).length > 5) {
                //console.log('你打开了太多TAB');
                alert('你打开了太多的TAB');
                evt.preventDefault();
                return;
            }
        });

        //系统菜单处理, 获取全部菜单
        $rootScope.sys_menu = [];
        api.request('sys_menu').then(function (res) {
            $rootScope.sys_menu = res.data.data;
            $rootScope.sub_menu = res.data.data[0].list;
        });

    }];

IndexMainCtrl.$injector = ['$rootScope', '$scope', '$location', '$window','api'];