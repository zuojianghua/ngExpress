//顶端横版导航条的控制器
var ComponentNavCtrl = ['$rootScope', '$scope', '$location', '$window','ngDialog','myServiceUtil','api',
    function ($rootScope, $scope, $location, $window, ngDialog, myServiceUtil, api) {
		$scope.data = {
            'form_data': {},		    //修改密码数据
            'license_data':{}			//授权信息数据
        };
        //用于显示在导航条上的当前用户名
        $rootScope.info_user_name = $util.getcookie('user_name');

        //退出登录，并清空cookie
        $scope.logout = function(){
            $rootScope.login = false;
            $util.removecookie('user_code');
            $util.removecookie('is_login');
            $util.removecookie('user_name');
            $util.removecookie('role_name');
            $util.removecookie('purview');
        }
		
		var change_pass_dialog = '';
        //更换密码
        $scope.change_pass = function(){
            change_pass_dialog = ngDialog.open({
                overlay: true,
                disableAnimation: true,
                showClose: true,
                closeByDocument: false,
                width: 500,
                template: 'html/component/ComponentChangePass.html',
                scope: $scope
            });
        }

        //查看授权消息
        $scope.warrant = function(){
        	api.request('get_icrm_license', {}).then(function (ret) {
        		if(ret.status == 1){
        			$scope.data.license_data = ret.data;
        		}
			});
            var warrant_dialog = ngDialog.open({
                overlay: true,
                disableAnimation: true,
                showClose: true,
                closeByDocument: false,
                width: 750,
                template: 'html/component/ComponentWarrant.html',
                scope: $scope
            });
        }

        //菜单搜索提示框
        $scope.search_prompt_on = false;
        $scope.search_data = {};
        $scope.search_result = [];
        //菜单搜索功能，当菜单搜索内的值发生变化时进行实时搜索
        $scope.search_prompt = function(){
            if($scope.search_data.keywords==''){
                return;
            }
            $scope.search_result = myServiceUtil.get_menu_by_keywords($scope.search_data.keywords, 5);
            if($scope.search_result.length>0){
                $scope.search_prompt_on = true;
            }
        }
        //关闭结果框
        $scope.search_prompt_hide = function(){
            $scope.search_prompt_on = false;
        }
        //开启结果框
        $scope.search_prompt_show = function(){
            if($scope.search_result.length>0){
                $scope.search_prompt_on = true;
            }
        }
        //点击跳转
        $scope.search_result_click = function(m){
            $scope.goto(m.url);
            $scope.search_prompt_hide();
        }
        
        //提交修改密码
        $scope.form_save = function () {
        	if($scope.data.form_data.pass_old == '' || $scope.data.form_data.pass_old == undefined){
        		$scope.notice('原密码不能为空！');
        		return;
        	}
        	if($scope.data.form_data.pass_new == '' || $scope.data.form_data.pass_new == undefined){
        		$scope.notice('新密码！');
        		return;
        	}
        	if($scope.data.form_data.pass_new2 == '' || $scope.data.form_data.pass_new2 == undefined){
        		$scope.notice('新密码确认！');
        		return;
        	}
        	if($scope.data.form_data.pass_new != $scope.data.form_data.pass_new2){
        		$scope.notice('2次新密码不一致！');
        		return;
        	}
        	var post_data = {
        		pass_old:'',
        		pass_new:'',
        		pass_new2:'',
        		user_id:'',
        	};
        	post_data.pass_old = $.md5($scope.data.form_data.pass_old);
        	post_data.pass_new = $.md5($scope.data.form_data.pass_new);
        	post_data.pass_new2 = $.md5($scope.data.form_data.pass_new2);
        	post_data.user_id = $util.getcookie('user_id');
            api.request('sys/user/change_password', post_data).then(function (ret) {
                if(ret.status == 1){
                    $scope.notice('修改成功');
                    ngDialog.close(change_pass_dialog);
                    $scope.logout();
                    $scope.data.form_data = {};
                }
            });
        }


    }];