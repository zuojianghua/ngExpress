//左侧垂直菜单栏控制器
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
            $rootScope.menu1_name = m.name;
            //$rootScope.menu1_index = index;

            //侧边栏展开
            $rootScope.slideShow();

            //默认展开
            // $rootScope.sub_menu.forEach(function(i){
            //     if($rootScope.sub_menu_show[i.purview_id]==undefined){
            //         $rootScope.sub_menu_show[i.purview_id] = true;
            //     }
            // });
        }

        //首页点击动作, 关闭侧边栏并跳转到首页
        $scope.click_index = function(){
            $rootScope.menu1_id = 0;
            //$rootScope.menu1_index = 0;
            $rootScope.slideHide();
            $scope.goto('/dashboard');
        }

        //收藏按钮点击动作，切换到收藏菜单组
        //收菜数据由登录时，login接口返回
        $scope.click_fav = function(){
            $rootScope.sub_menu = [];
            $rootScope.menu1_id = 'fav';
            //$rootScope.menu1_index = 'fav';
            $rootScope.menu1_name = '收藏夹';
            //侧边栏展开
            $rootScope.slideShow();
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
            $location.path(m.url);
            $rootScope.shrink = true;
            $rootScope.stretch = true;
        }

        //侧边栏收缩展开切换
        $rootScope.shrink = true;
        $rootScope.stretch = true;
        $rootScope.slideToggle = function(){
            if($rootScope.shrink){
                $rootScope.slideShow();
            }else{
                $rootScope.slideHide();
            };
        }

        //侧边栏关闭
        $rootScope.slideHide = function(){
            $rootScope.shrink = true;
            $rootScope.stretch = true;
        }
        //侧边栏开启
        $rootScope.slideShow = function(){
            if($rootScope.menu1_id==0){
                return;
            }
            $rootScope.shrink = false;
            $rootScope.stretch = false;
        }
    }];