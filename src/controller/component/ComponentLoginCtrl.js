var ComponentLoginCtrl = ['$rootScope', '$scope', '$location', '$window','api','myServiceUtil',
    function ($rootScope, $scope, $location, $window,api,myServiceUtil) {

        $scope.login_data = {'user_code':'','password':'','captcha':''}
        //默认不显示验证码，错误3次才显示出来
        $scope.captcha = {
            captcha_show : ($util.getcookie('captcha')>3),
            url : ($util.getcookie('captcha')>3)?'index.php?app_act=index/login_create_verify_graph&amp;' + Math.random():''
        }
        
        //判断回车键登录
        $scope.key_press = function(e){
        	if (typeof e != 'undefined' && e.keyCode != 13) {
                return;
            }else{
            	$scope.do_login();
            }
        }
        
        //登录动作
        $scope.do_login = function(){
            var post_data = myServiceUtil.clone($scope.login_data);
            //需要将密码事先md5
			post_data.password = $.md5(post_data.password);
            //需要获取当前的浏览器类型
			post_data.browser = browser;
            //发送异步登录请求
            api.request('login',post_data).then(function(ret){
                if(ret.status==1){
                    if($scope.login_data.save_login){
                        $util.setcookie('user_code', ret.data.user_code, 7);
                        $util.setcookie('user_name', ret.data.user_name, 7);
                        $util.setcookie('user_id', ret.data.user_id, 7);
                        $util.setcookie('role_name', ret.data.role_name, 7);
                        $util.setcookie('purview', ret.data.purview, 7);
                        $util.setcookie('is_login','true', 7);
                    }else{
                        $util.setcookie('user_code', ret.data.user_code);
                        $util.setcookie('user_name', ret.data.user_name);
                        $util.setcookie('user_id', ret.data.user_id);
                        $util.setcookie('role_name', ret.data.role_name);
                        $util.setcookie('purview', ret.data.purview);
                        $util.setcookie('is_login','true');
                    }
                    $rootScope.info_user_name = ret.data.user_name;
                    $rootScope.login = true;
                    $scope.login_data.password = '';
                    $scope.captcha.captcha_show = false;
                    $util.setcookie('captcha', 0, 2);

                    //收藏菜单保存在localstorage; 数据比较多
                    $rootScope.sys_menu_fav = ret.data.fave_list || [];
                    $util.setStorage('sys_menu_fav',$rootScope.sys_menu_fav);
                    //处理菜单权限
                    api.request('sys/purview/get_tree_data_by_role_id',{user_id:$util.getcookie('user_id')}).then(function (res) {
                        $rootScope.sys_menu = res.data;
                        //内置超级管理员可以跳过
                        if(ret.data.role_id!=1){
                            $rootScope.sys_menu = myServiceUtil.get_menu_by_purview(ret.data.purview);
                        }
                        //权限保存在localstorage
                        $util.setStorage('sys_menu',$rootScope.sys_menu);
                        return;
                    })
                    //获取用户习惯
                    myServiceUtil.get_config_table_set(ret.data.user_id);
                }else{
                	$scope.login_data.password = '';
                    $util.setcookie('captcha', ret.data, 2);
                }

                //登录失败次数超过2次，出现验证码输入框
                if(ret.status!=1&&ret.data>2){
                    $scope.captcha.captcha_show = true;
                    $scope.captcha.url = 'index.php?app_act=index/login_create_verify_graph&amp;' + Math.random();
                }

                return ret;
            });
        }

        //刷新新验证码动作
        $scope.captcha_refresh = function(){
            $scope.captcha.url = 'index.php?app_act=index/login_create_verify_graph&amp;' + Math.random();
        }
    }];