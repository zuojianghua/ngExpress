var IndexMainCtrl = ['$rootScope', '$scope', '$location', '$window', '$q', 'ngDialog', 'api', 'util',
    function ($rootScope, $scope, $location, $window, $q, ngDialog, api, util) {

        //页签历史记录处理  ---------------------------------------------------------
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
            if (typeof current != 'undefined' && typeof current.$$route != 'undefined') {
                $rootScope.histroy_url = current.$$route.originalPath;
                //console.log($rootScope.histroy_url);
            }

            //打开的TAB数量检测，超过一定数量则不允许再打开
            if (typeof $rootScope.histroy != 'undefined' && Object.keys($rootScope.histroy).length > 12) {
                //console.log('你打开了太多TAB');
                alert('你打开了太多的TAB');
                evt.preventDefault();
                return;
            }
        });
        //选择器选项枚举 --------------------------------------------------------------
        $rootScope.search_data_option = $rootScope.form_data_option = {
            'customer_sex_options': { '0': '保密', '1': '男', '2': '女' },
            'marriage_options': { '0': '0', '1': '1', '2': '2' },
            'education_options': { '0': '0', '1': '1', '2': '2' },
            'skin_type_options': { '0': '0', '1': '1', '2': '2' },
            'sex_options': { '0': '保密', '1': '男', '2': '女' },
            'is_manage_options': { '0': '否', '1': '是' },
            'is_login_options': { '0': '否', '1': '是' },
            'is_work_options': { '0': '否', '1': '是' },
            'is_hot_options': { '0': '否', '1': '是' },
            'is_sys_options': { '0': '否', '1': '是' },
            'if_share_options': { '0': '否', '1': '是' },
            'is_disposible_options': { '0': '否', '1': '是' },
            'status_options':{'0':'未启用','1':'已启用'},
            'distributor_property_options':{'3':'直营店','4':'加盟店'},
            'consume_type_options':{'0':'消费','1':'退货'},
            'is_check_options':{'0':'未审核','1':'已审核'},
            'is_cancel_options':{'0':'未终止','1':'已终止'},
            'is_push_options':{'0':'未发布','1':'已发布'},
            'trans_type_options':{'0':'全卡消费数据转移','1':'按消费单转移'},
            'city_type_options':{'0':'无等级','1':'一线城市','2':'二线城市'},
            'source_type_options':{'0':'无类型','1':'线上','2':'线下'},
            'status_all_options':{'0':'停用','1':'启用','2':'全部'},
            'distributor_type_options':{'1':'实体店','2':'网络店'},
            'card_status_options':{'0':'正常','1':'停用','2':'挂失','3':'已使用','4':'过期','5':'作废'},
            'workflow_status_options':{'0':'初始','1':'设计流程','2':'审批通过','3':'开始执行','4':'执行中','5':'执行完成','6':'生成报表','7':'完成','8':'终止'},
            'handle_status_options':{'0':'未处理','1':'已处理'},
            'img_type_options':{'0':'单图文','1':'多图文'},
            'sold_options':{'1':'已上架','0':'已下架'},
            'is_send_options':{'0':'未发送','1':'已发送','2':'发送中'},
            'record_status_options':{'0':'审核中','1':'已审核拣货中','3':'已发货','5':'已完成','7':'已取消','8':'申请退货','9':'确认退货','11':'完成退货'},
            'activity_type_options':{'1':'大转盘','2':'刮刮卡','3':'竞猜','4':'投票'},
            'activity_status_options':{'0':'待审核','1':'待发布','2':'进行中','3':'已结束','4':'已终止'},
            'adjust_type_options':{'0':'增加','1':'减少','2':'清零','3':'盘点'},
            'favour_time_options':{'0':'当月','1':'当天','2':'当年','3':'前后n天'},
            'favour_type_options':{'0':'指定金额','1':'指定折扣','2':'优惠金额'},
            'workflow_type_options':{'0':'手机'},
            'coupon_type_options':{'4':'现金券','5':'代金券','7':'单品折扣券','8':'礼品券'},
            'time_type_options':{'0':'指定有效期','1':'相对有效期'},
            'prize_type_options':{'1':'实物','2':'积分','3':'优惠券'},
            'sell_status_options':{'0':'新品','1':'正常销售','2':'过季销售','4':'停止销售'},
            'sell_type_options':{'0':'普通','1':'赠品','2':'鞋类','4':'配件','5':'包装材料'},
            '_options':{}
        }
        //选择器枚举
        $rootScope.search_data_select = {
            'select_department':'选择部门',
            'select_user':'选择用户/店员',
            'select_customer':'选择顾客',
            'select_org':'选择渠道',
            'select_shop':'选择店铺',
            'select_area':'选择区域',
            'select_source':'选择来源',
            'select_brand':'选择品牌',
            'select_vip_series':'选择卡系列',
            'select_vip_level':'选择卡等级',
            'select_vip':'选择会员卡',
            'select_message_nodes':'短信业务节点',
            'select_card_make':'储值卡号',
            'select_card_category':'储值类别',
            'select_card_recharge':'充值方式',
            'select_workflow_type':'营销活动类型',
            'select_goods':'商品',
            'select_city':'城市',
            'select_promotion':'促销活动',
            'select_coupon':'优惠劵',
            'select_weixin_img':'图文素材',
            'select_category':'商品分类',
            'select_sort':'商品品类',
            'select_year':'年度',
            'select_unit':'单位',
            'select_series':'商品系列',
            'select_season':'季节'
        }
        //通用配置
        $scope.config = {};
        //拾色器通用配置
        $scope.config.color_picker_options = {
            'format':'hex',
            'alpha':false,
            'close': {
                'show': false,
                'label': '关闭',
                'class': '',
            },
            'clear': {
                'show': false,
                'label': '清除',
                'class': '',
            },
            'reset': {
                'show': false,
                'label': '重置',
                'class': '',
            }
        };
        //所见即所得编辑器通用配置
        //https://github.com/fraywing/textAngular/wiki
        $scope.config.ta_toolbar_options = [
            ['h1', 'h2', 'h3', 'p', 'bold', 'italics', 'strikeThrough', 'ul', 'ol'],
            ['indent', 'outdent', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['insertImage', 'insertLink', 'insertVideo'],
            ['undo', 'redo', 'clear', 'html','charcount']
        ];
        //系统菜单处理, 获取全部菜单 -----------------------------------------------------
        $rootScope.sys_menu = [];
        api.request('sys/purview/get_tree_data_by_role_id').then(function (res) {
            $rootScope.sys_menu = res.data;
            //console.log($rootScope.sys_menu);
        });

        //用户操作习惯数据 --------------------------------------------------------------
        $rootScope.config_table_set = $util.getStorage('config_table_set') ? $util.getStorage('config_table_set') : {};
        //console.log($scope.config_table_set);

        //初始化子控制器，传入页面的data值和url --------------------------------------------
        $scope.construct = function (data, url) {
            var menu = util.get_menu_by_url(url);
            $rootScope.menu1_id = menu.m1.purview_id||0;            //一级菜单标识
            $rootScope.menu2_id = menu.m2.purview_id;            //二级菜单标识
            $rootScope.menu3_id = menu.m3.purview_id;            //三级菜单标识
            
            var abs_url = $rootScope.url = '/' + url;            //本页url地址

            if (!$rootScope.histroy.hasOwnProperty(abs_url)) {
                //Tab标签的顺序
                var order = Object.keys($rootScope.histroy);
                //本页面scope内的属性定义在此

                //纳入到tab历史中
                $rootScope.histroy[abs_url] = {
                    scope: {data:data},
                    order: order
                };
                return data;
            } else {
                //Tab标签的顺序
                //var order = $rootScope.histroy[abs_url].order;
                return $rootScope.histroy[abs_url].scope.data;
            }
        };

        //页面跳转  -------------------------------------------------------------
        $scope.goto = function(url){
            $location.path(url);
            //$location.replace();
        }

        //页面刷新  -------------------------------------------------------------
        $scope.refresh = function(){

        }
        //页面额外搜索区域展开和隐藏 -----------------------------------------------
        $scope.toggle_search_field_more = function(i){
            i=!i;
        }

        //表头列设置 ------------------------------------------------------------
        $scope.set_table_list_field = function(route, fields){
            //点击后弹出设置框，将不同的表头设置保存在localstorage
            var gopen_fields_window_id = ngDialog.open({
                overlay: true,
                disableAnimation: true,
                showClose: true,
                width: '400px',
                template: 'src/html/component/ComponentDialogTableSet.html',
                //scope: $scope,
                controller : ['$rootScope','$scope',function($rootScope,$scope){
                    //初始化显示数据
                    $scope.fields_set = [];
                    if(!$rootScope.config_table_set[route]){
                        $rootScope.config_table_set[route] = {};
                    }
                    //保存本页面的参数设置到localstorage
                    $scope.save_fields_set = function(){
                        $scope.fields_set.forEach(function(o){
                            if(o.value==false){
                                $rootScope.config_table_set[route][o.key] = false;
                            }else{
                                $rootScope.config_table_set[route][o.key] = true;
                            }
                        });
                        $util.setStorage('config_table_set',$rootScope.config_table_set);
                        //console.log($rootScope.config_table_set);
                        ngDialog.close(gopen_fields_window_id);
                    }
                    fields.forEach(function(o){
                        $scope.fields_set.push({
                            'key':o.key,
                            'value':($rootScope.config_table_set[route][o.key]==false||$rootScope.config_table_set[route][o.key]=='false')?false:true,
                            'name':o.name
                        });
                    });
                }]
            });
        }

        //各类选择器方法 ---------------------------------------------------------
        //均返回promise

        //选择部门
        $scope.select_department = function(param){
            //console.log(param);
            return api.request('sys/department/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.department_code, "name": o.department_name });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }

        //选择员工
        $scope.select_user = function(param){
            return api.request('sys/user/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.user_code, "name": o.user_name });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //选择顾客
        $scope.select_customer = function(param){
            return api.request('crm/customer/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.customer_code, "name": o.customer_name });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }

        //选择渠道
        $scope.select_org = function(param){
            return api.request('base/org/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.org_code, "name": o.org_name });
                });
                deferred.resolve(return_data);
                return deferred.promise;
            });
        }

        //选择商店
        $scope.select_shop = function(param){
            return api.request('base/shop/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.distributor_code, "name": o.distributor_name });
                });
                deferred.resolve(return_data);
                return deferred.promise;
            });
        }

        //选择区域
        $scope.select_area = function(param){
            return api.request('base/area/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.area_name, "name": o.area_name });
                });
                deferred.resolve(return_data);
                return deferred.promise;
            });
        }

        //选择来源
        $scope.select_source = function(param){
            return api.request('base/source/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.source_id, "name": o.source_name });
                });
                deferred.resolve(return_data);
                return deferred.promise;
            });
        }

        //选择品牌
        $scope.select_brand = function(param){
            return api.request('base/brand/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.brand_code, "name": o.brand_name });
                });
                deferred.resolve(return_data);
                return deferred.promise;
            });
        }

        //选择卡系列
        $scope.select_vip_series = function(param){
            return api.request('crm/vip_series/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.crm_series_code, "name": o.crm_series_name });
                });
                deferred.resolve(return_data);
                return deferred.promise;
            });
        }

        //选择卡等级
        $scope.select_vip_level = function(param){
            return api.request('crm/vip_level/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.level_code, "name": o.level_name });
                });
                deferred.resolve(return_data);
                return deferred.promise;
            });
        }

        //选择VIP(卡号) 卡号->顾客姓名
        $scope.select_vip = function(param){
//          console.log(param);
            return api.request('crm/vip/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.vip_code, "name": o.customer_name });
                });
                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //短信业务节点
        $scope.select_message_nodes = function(param){
            return api.request('sys/e_message_template/get_all_e_message_nodes',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.forEach(function(o){
                    return_data.data.push({ "code": o.baisonkey, "name": o.baisonvalue });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //储值卡号
        $scope.select_card_make = function(param){
            return api.request('crm/prepaid_card_make_record/get_list_detail',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.prepaid_card_code, "name": o.prepaid_card_code });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //储值类别
        $scope.select_card_category = function(param){
            return api.request('crm/card_category/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.code, "name": o.name });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
		
		//充值方式
        $scope.select_card_recharge = function(param){
            return api.request('crm/card_recharge/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.code, "name": o.name });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //营销活动类型
        $scope.select_workflow_type = function(param){
            return api.request('crm/workflow_marketing/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.code, "name": o.name });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //商品
        $scope.select_goods = function(param){
            return api.request('base/goods/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.goods_code, "name": o.goods_name });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //城市
        $scope.select_city = function(param){
            return api.request('base/city/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.region_id, "name": o.region_name });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //促销活动
        $scope.select_promotion = function(param){
            return api.request('crm/ipos_promotion/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.promotion_id, "name": o.promotion_name });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //优惠券
        $scope.select_coupon = function(param){
            return api.request('crm/coupon/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.coupon_id, "name": o.record_code });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //图文素材
        $scope.select_weixin_img = function(param){
            return api.request('wechat/weixin_img/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.image_id, "name": o.title });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //商品分类
        $scope.select_category = function(param){
            return api.request('base/category/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.category_code, "name": o.category_name });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //商品品类
        $scope.select_sort = function(param){
            return api.request('base/sort/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.sort_code, "name": o.sort_name });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //年度
        $scope.select_year = function(param){
            return api.request('base/year/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.year_code, "name": o.year_name });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //单位
        $scope.select_unit = function(param){
            return api.request('base/unit/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.unit_code, "name": o.unit_name });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //商品系列
        $scope.select_series = function(param){
            return api.request('base/series/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.series_code, "name": o.series_name });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        //季节
        $scope.select_season = function(param){
            return api.request('base/season/get_list',param).then(function(ret){
                var deferred = $q.defer();
                var return_data = {
                    filter_data:ret.data.search_data,
                    data:[],
                    page_data:ret.data.page_data
                };
                ret.data.data.forEach(function(o){
                    return_data.data.push({ "code": o.season_code, "name": o.season_name });
                });

                deferred.resolve(return_data);
                return deferred.promise;
            });
        }
        
        
        
        
    }];

IndexMainCtrl.$injector = ['$rootScope', '$scope', '$location', '$window', '$q', 'ngDialog', 'api', 'util'];