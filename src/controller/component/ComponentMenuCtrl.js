var ComponentMenuCtrl = ['$rootScope', '$scope', '$location', '$window',
    function ($rootScope, $scope, $location, $window) {
        //获取二级菜单
        $rootScope.sub_menu = [];
        //二级菜单组的显示状态  下标为purview_id
        $rootScope.sub_menu_show = [];

        //一级菜单点击动作，切换到相应的二级菜单组
        //传入二级菜单组数据和对应的一级菜单下标
        $scope.click_menu1 = function(m, index){
            $rootScope.sub_menu = m.child;
            $rootScope.menu1_id = m.purview_id;
            $rootScope.menu1_index = index;

            //侧边栏展开
            $rootScope.shrink = false;
            $rootScope.stretch = false;

            //默认展开
            $rootScope.sub_menu.forEach(function(i){
                if($rootScope.sub_menu_show[i.purview_id]==undefined){
                    $rootScope.sub_menu_show[i.purview_id] = true;
                }
            });
        }

        //二级菜单组标题点击，显示或隐藏二级菜单组
        //传入二级菜单组purview_id
        $scope.click_menu2 = function(purview_id){
            if($rootScope.sub_menu_show[purview_id]==undefined){
                $rootScope.sub_menu_show[purview_id] = false;
                return;
            }
            $rootScope.sub_menu_show[purview_id] = !$rootScope.sub_menu_show[purview_id];
        };

        //传入三级菜单数据
        $scope.click_menu3 = function(m){
            //console.log(m);
            $location.path(m.url);
            $rootScope.shrink = true;
            $rootScope.stretch = true;
        }

        //侧边栏收缩展开切换
        $rootScope.shrink = true;
        $rootScope.stretch = true;
        $rootScope.slideToggle = function(){
            if($rootScope.shrink){
                $rootScope.shrink = false;
                $rootScope.stretch = false;
            }else{
                $rootScope.shrink = true;
                $rootScope.stretch = true;
            };
        }
    }];