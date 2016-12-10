var IndexMainCtrl = [
    '$rootScope', '$scope', '$location', '$window', '$timeout','$q', 
    'ngDialog', 'Popup',
    'api', 'myServiceUtil','myConfigSys','myServiceDatabind','myConfigUI','myServiceOptions',
    function (
        $rootScope, $scope, $location, $window, $timeout,$q, 
        ngDialog, Popup,
        api, myServiceUtil,myConfigSys,myServiceDatabind,myConfigUI,myServiceOptions) {
        //用户操作习惯
        $rootScope.config_table_set = {};
        //全局系统参数配置
        $rootScope.config_sys = myConfigSys;
        
        //全局登录验证 --------------------------------------------------------------
        //登录数据保存在ComponentLogin控制器
        //if(1==1){
        if($util.getcookie('user_code')&&$util.getcookie('is_login')=='true'){
            $rootScope.login = true;
            $rootScope.sys_menu = $util.getStorage('sys_menu');
            $rootScope.sys_menu_fav = $util.getStorage('sys_menu_fav');
            //获取用户习惯
            //myServiceUtil.get_config_table_set($util.getcookie('user_id'));
        }else{
            $rootScope.login = false;
            $rootScope.sys_menu = [];
            $rootScope.sys_menu_fav = [];
            //需要在登录的时候获取用户操作习惯数据
        }
        
        //页签历史记录处理  ---------------------------------------------------------
        $rootScope.histroy = {};
        $rootScope.$on('$routeChangeStart', function (evt, next, current) {
            //console.log(current, next);
            //保存上一个访问的url地址，用于关闭TAB页面后的切换
            if (typeof current != 'undefined' && typeof current.$$route != 'undefined') {
                $rootScope.histroy_url = current.$$route.originalPath;
                //console.log($rootScope.histroy_url);
            }

            //打开的TAB数量检测，超过一定数量则不允许再打开
            if (typeof $rootScope.histroy != 'undefined' && Object.keys($rootScope.histroy).length > 30) {
                $scope.alert('你打开了太多的TAB');
                evt.preventDefault();
                return;
            }

            //页面调试信息
            //console.log(next.$$route.originalPath);
            if (typeof next != 'undefined' && typeof next.$$route != 'undefined') {
                $scope.debug_router = next.$$route.originalPath;
            }
            //$scope.debug_router = next.$$route.originalPath;
            $scope.debug_wacth = [{"name":"","value":undefined}];
        });

        //页面调试动作
        $scope.debug_window = 0;
        $scope.add_watch = function(){
            $scope.debug_wacth.push({"name":"","value":""});
        }
        $scope.change_watch = function(v){
            v.value = ($rootScope[v.name])?$rootScope[v.name]:$rootScope.histroy[$scope.debug_router].scope.data[v.name];
        }
        $scope.del_watch = function(index){
            console.log(index);
            if($scope.debug_wacth.length>1){
                $scope.debug_wacth.splice(index,1);
            }else{
                $scope.debug_wacth = [{"name":"","value":undefined}];
            }
        }

        //选择器选项枚举 ---------------------------------------------------------
        $rootScope.search_data_option = $rootScope.form_data_option = myServiceOptions.option;
        //选择器枚举 -------------------------------------------------------------
        $rootScope.search_data_select = myServiceOptions.selector;
        //各类选择器方法 ---------------------------------------------------------
        //均返回promise
        $scope.select_department = myServiceDatabind.select_department;
        $scope.select_user = myServiceDatabind.select_user;

        //通用业务配置
        $scope.config = {};
        //拾色器通用配置
        $scope.config.color_picker_options = myConfigUI.color_picker_options;
        //所见即所得编辑器通用配置
        $scope.config.ta_toolbar_options = myConfigUI.ta_toolbar_options;

        //初始化子控制器，传入页面的data值和url --------------------------------------------
        var pager_conf_local = $util.getStorage('pager_conf_local')?$util.getStorage('pager_conf_local'):{}; 
        $scope.construct = function (data, url) {
            var menu = myServiceUtil.get_menu_by_url(url);
            $rootScope.menu1_id = menu.m1.purview_id||0;         //一级菜单标识
            $rootScope.menu2_id = menu.m2.purview_id;            //二级菜单标识
            $rootScope.menu3_id = menu.m3.purview_id;            //三级菜单标识

            $rootScope.menu1_name = menu.m1.name;                //一级菜单名称
            $rootScope.sub_menu = menu.m1.child;                 //二级菜单显示

            var abs_url = $rootScope.url = '/' + url;            //本页url地址

            //判断当前页面是否被收藏过
            $rootScope.collection = myServiceUtil.get_fav_status(abs_url);
            
            if (!$rootScope.histroy.hasOwnProperty(abs_url)) {
                //新打开页面
                //判断当前列表页面的表头设置情况, table_setting是否允许设置表头
                if(data.table_setting){
                    if(!$rootScope.config_table_set[url]||$rootScope.config_table_set[url]=='false'){
                        $rootScope.config_table_set[url] = {};
                    }
                    data.config_table_set_route = $rootScope.config_table_set[url];
                }
                //判断当前页面是否有分页设置
                if(data.page_data){
                    data.page_data.num = pager_conf_local[abs_url] ? parseInt(pager_conf_local[abs_url]) : 15;
                }

                //Tab标签的顺序
                var order = Object.keys($rootScope.histroy);
                //本页面scope内的属性定义在此

                //纳入到tab历史中
                $rootScope.histroy[abs_url] = {
                    scope: {data:data},
                    order: order
                };
                $scope.speak(data.title);
                return data;
            } else {
                //Tab标签的顺序
                //var order = $rootScope.histroy[abs_url].order;
                $scope.speak($rootScope.histroy[abs_url].scope.data.title);
                return $rootScope.histroy[abs_url].scope.data;
            }            
        };

        //页面跳转  -------------------------------------------------------------
        $scope.goto = function(url){
            $location.path(url);
            //$location.replace();
        }

        //页面收藏  -------------------------------------------------------------
        $scope.add_to_fave = function(){
            var user_id = $util.getcookie('user_id');
            var url = $rootScope.url;
            var data = {};
            if($rootScope.collection){
                //已收藏则取消收藏
                data = {url:url,user_id:user_id};
                api.request('del_fave',data).then(function(ret){
                    if(ret.status){
                        $rootScope.collection = !$rootScope.collection;
                        myServiceUtil.remove_from_fav(data);
                        $scope.notice(ret.message);
                    }
                });
            }else{
                //否则收藏
                var name = $rootScope.histroy[url].scope.data.title;
                data = {name:name,url:url,user_id:user_id};
                api.request('fave',data).then(function(ret){
                    if(ret.status){
                        $rootScope.collection = !$rootScope.collection;
                        myServiceUtil.add_to_fav(data);
                        $scope.notice(ret.message);
                    }
                });
            }
        }

        //页面刷新  -------------------------------------------------------------
        $scope.refresh = function(){

        }

        //页面额外搜索区域展开和隐藏 -----------------------------------------------
        $scope.toggle_search_field_more = function(i){
            i=!i;
        }

        //语音播报 --------------------------------------------------------------
        if(typeof $rootScope.config_sys.can_speak == 'undefined'){
            $rootScope.config_sys.can_speak = false;
        }
        $scope.speak = function(msg){
            if(!$rootScope.config_sys.can_speak){
                return;
            }
            if(typeof msg=='undefined'||msg==''){
                return;
            }
            $timeout(function(){
                var tts = $("<audio autoplay='autoplay'>语音播报</audio>").attr("src", 'http://tts.baidu.com/text2audio?lan=zh&pid=101&ie=UTF-8&text='+msg+'&spd=6');
                $("body").append(tts);
                tts[0].onended=function(){
                    tts.remove();
                };
            },0);
            
        }
        //提示信息 
        //https://aui.github.io/angular-popups/
        $scope.notice = function (msg, ok) {
            $scope.speak(msg);
            Popup.notice(msg, ok);
        }
        $scope.alert = function (msg, ok) {
            $scope.speak(msg);
            Popup.alert(msg, ok);
        }
        $scope.confirm = function (msg, ok, cancel) {
            $scope.speak(msg);
            Popup.confirm(msg, ok, cancel)
        }
        $scope.bubble = {};
        
        //表头列设置 ------------------------------------------------------------
        //route 要设置的页面地址
        //fields 该页面全部可设置的表头字段列表
        $scope.set_table_list_field = function(route, fields){
            //点击后弹出设置框，将不同的表头设置保存在localstorage
            var gopen_fields_window_id = ngDialog.open({
                overlay: true,
                disableAnimation: true,
                showClose: true,
                width: '400px',
                template: 'src/html/component/ComponentDialogTableSet.html',
                scope: $scope,
                controller : ['$rootScope','$scope',function($rootScope,$scope){
                    //初始化显示数据，弹框中的循环数据
                    $scope.fields_set = [];
                    if(!$rootScope.config_table_set[route]){
                        $rootScope.config_table_set[route] = {};
                    }
                    
                    //用传递进来的参数，生成弹框内的数据，其中value代表是否列头是否需要显示出来
                    fields.forEach(function(o){
                        $scope.fields_set.push({
                            'key':o.key,
                            'value':($rootScope.config_table_set[route][o.key]===false||$rootScope.config_table_set[route][o.key]==='false')?false:true,
                            'name':o.name
                        });
                    });
                    
                    //保存本页面的参数设置到localstorage
                    $scope.save_fields_set = function(){
                        $scope.fields_set.forEach(function(o){
                            if(o.value==false){
                                $rootScope.config_table_set[route][o.key] = false;
                            }else{
                                $rootScope.config_table_set[route][o.key] = true;
                            }
                        });
                        var user_id = $util.getcookie('user_id');
                        $util.setStorage('config_table_set_' + user_id, $rootScope.config_table_set);
                        //同时保存到服务器
                        api.request('sys/user_html_config/add',{user_id:user_id,url:route,context:$rootScope.config_table_set[route]}).then(function(ret){
                            if(ret.status==1){
                                $scope.notice('保存成功');
                            }
                        });
                        ngDialog.close(gopen_fields_window_id);
                    }
                }]
            });
        }

    }];

IndexMainCtrl.$injector = [
    '$rootScope', '$scope', '$location', '$window', '$timeout', '$q',
    'ngDialog', 'Popup',
    'api', 'myServiceUtil', 'myConfigSys', 'myServiceDatabind','myConfigUI','myServiceOptions'
];