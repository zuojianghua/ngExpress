/**
 * 新增样例页面控制器
 * @author zuojianghua<28842136@qq.com>
 * @date 2016-08-10
 */
var DemoAutoCtrl = ['$rootScope', '$scope', '$location', '$window', 'api', '$http', 'ngDialog',
    function ($rootScope, $scope, $location, $window, api,$http,ngDialog) {
        //本页面的各种属性数据
        var data = {
            'title':'代码自动生成器',
            'form_data':{
                'ctrl_array':[{}]
            },
            'valid_option': {
                'check_eq': '验证是否相等',
                'check_email': '验证邮箱',
                'check_tel': '验证手机号',
                'check_number': '验证数字',
                'check_positive': '验证正整数'
            }
        };

        $scope.data = $scope.construct(data,'demo/auto');

        //配置需要生成的控制器、控制器名称和对应的API接口
        $scope.auto_configs = [
            ['VIP卡档案','crm/vip/index','crm/vip/get_list'],
            ['积分调整单','crm/integral_adjust_record/do_index','crm/integral_adjust_record/get_list'],
            ['新增积分调整单','crm/integral_adjust_record/add','crm/integral_adjust_record/add'],
            ['查看积分调整单','crm/integral_adjust_record/edit','crm/integral_adjust_record/get_detail'],
            ['积分变现单','crm/integral_realize_record/do_index','crm/integral_realize_record/get_list'],
            ['新增积分变现单','crm/integral_realize_record/add','crm/integral_realize_record/add'],
            ['查看积分变现单','crm/integral_realize_record/edit','crm/integral_realize_record/get_detail'],
            ['VIP卡制成投放单','crm/make_card_record/index','crm/make_card_record/get_list'],
            ['新增制成投放单','crm/make_card_record/add','crm/make_card_record/add'],
            ['查看制成投放单','crm/make_card_record/edit','crm/make_card_record/get_detail'],
            ['VIP投放','crm/make_card_record/put','crm/make_card_record/put'],
            ['VIP卡作废','crm/make_card_record/cancel','crm/make_card_record/cancel'],
            ['手机号码变更单','crm/change_tel/index','crm/change_tel/get_list'],
            ['查看手机号码变更','crm/change_tel/edit','crm/change_tel/get_detail'],
            ['VIP等级变更单','crm/move_level/index','crm/move_level/get_list'],
            ['新增VIP等级变更','crm/move_level/add','crm/move_level/add'],
            ['查看VIP等级变更','crm/move_level/edit','crm/move_level/get_detail'],
            ['VIP消费转移单','crm/trans_consume/index','crm/trans_consume/get_list'],
            ['新增VIP消费转移','crm/trans_consume/add','crm/trans_consume/add'],
            ['查看VIP消费转移','crm/trans_consume/edit','crm/trans_consume/get_detail'],

            ['VIP开卡策略','tactic/vip_activate_card_rule/index','tactic/vip_activate_card_rule/get_list'],
            ['新增开卡策略','tactic/vip_activate_card_rule/add','tactic/vip_activate_card_rule/add'],
            ['查看开卡策略','tactic/vip_activate_card_rule/edit','tactic/vip_activate_card_rule/get_detail'],
            ['VIP卡停用策略','tactic/vip_disuse_card_rule/index','tactic/vip_disuse_card_rule/get_list'],
            ['新增停用策略','tactic/vip_disuse_card_rule/add','tactic/vip_disuse_card_rule/add'],
            ['查看停用策略','tactic/vip_disuse_card_rule/edit','tactic/vip_disuse_card_rule/get_detail'],
            ['VIP卡升级策略','tactic/vip_upgrade_rule/index','tactic/vip_upgrade_rule/get_list'],
            ['新增升级策略','tactic/vip_upgrade_rule/add','tactic/vip_upgrade_rule/add'],
            ['查看升级策略','tactic/vip_upgrade_rule/edit','tactic/vip_upgrade_rule/get_detail'],
            ['VIP卡降级策略','tactic/vip_degrade_rule/index','tactic/vip_degrade_rule/get_list'],
            ['新增降级策略','tactic/vip_degrade_rule/add','tactic/vip_degrade_rule/add'],
            ['查看降级策略','tactic/vip_degrade_rule/edit','tactic/vip_degrade_rule/get_detail'],
            ['VIP卡合并策略','tactic/crm_bind/index','tactic/crm_bind/get_list'],
            ['VIP积分抵现策略','tactic/integral_withdrawals/index','tactic/integral_withdrawals/get_list'],
            ['新增抵现策略','tactic/integral_withdrawals/add','tactic/integral_withdrawals/add'],
            ['查看抵现策略','tactic/integral_withdrawals/edit','tactic/integral_withdrawals/get_detail'],
            ['生日优惠策略','tactic/birthday_favour/index','tactic/birthday_favour/get_list'],
            ['新增生日优惠','tactic/birthday_favour/add','tactic/birthday_favour/add'],
            ['查看生日优惠','tactic/birthday_favour/edit','tactic/birthday_favour/get_detail'],
            ['积分兑换策略','tactic/integral_redeem/index','tactic/integral_redeem/get_list'],
            ['新增积分兑换策略','tactic/integral_redeem/add','tactic/integral_redeem/add'],
            ['查看积分兑换策略','tactic/integral_redeem/edit','tactic/integral_redeem/get_detail'],
            ['短信模板','sys/e_message_template/index','sys/e_message_template/get_list'],
            ['新增短信模板','sys/e_message_template/add','sys/e_message_template/add'],
            ['查看短信模板','sys/e_message_template/edit','sys/e_message_template/get_detail'],
            ['短信策略','sys/e_message_strategy/index','sys/e_message_strategy/get_list'],
            ['新增短信策略','sys/e_message_strategy/add','sys/e_message_strategy/add'],
            ['查看短信策略','sys/e_message_strategy/edit','sys/e_message_strategy/get_detail'],
            ['短信业务节点','','sys/e_message_template/get_all_e_message_nodes'],
            
            ['颜色','base/color/index','base/color/get_list'],
            ['新增颜色','base/color/add','base/color/add'],
            ['查看颜色','base/color/edit','base/color/get_detail'],
            ['尺码','base/size/index','base/size/get_list'],
            ['新增尺码','base/size/add','base/size/add'],
            ['查看尺码','base/size/edit','base/size/get_detail'],
            ['品牌','base/brand/index','base/brand/get_list'],
            ['新增品牌','base/brand/add','base/brand/add'],
            ['查看品牌','base/brand/edit','base/brand/get_detail'],
            ['分类','base/category/index','base/category/get_list'],
            ['新增分类','base/category/add','base/category/add'],
            ['查看分类','base/category/edit','base/category/get_detail'],
            ['品类','base/sort/index','base/sort/get_list'],
            ['新增品类','base/sort/add','base/sort/add'],
            ['查看品类','base/sort/view','base/sort/get_detail'],
            ['年度','base/year/index','base/year/get_list'],
            ['新增年度','base/year/add','base/year/add'],
            ['查看年度','base/year/view','base/year/get_detail'],
            ['季节','base/season/index','base/season/get_list'],
            ['新增季节','base/season/add','base/season/add'],
            ['查看季节','base/season/view','base/season/get_detail'],
            ['系列','base/series/index','base/series/get_list'],
            ['新增系列','base/series/add','base/series/add'],
            ['查看系列','base/series/edit','base/series/get_detail'],
            ['单位','base/unit/index','base/unit/get_list'],
            ['新增单位','base/unit/add','base/unit/add'],
            ['查看单位','base/unit/edit','base/unit/get_detail'],
            ['渠道','base/org/index','base/org/get_list'],
            ['新增渠道','base/org/add','base/org/add'],
            ['查看渠道','base/org/view','base/org/get_detail'],
            ['城市','base/city/index','base/city/get_list'],
            ['查看城市','base/city/edit','base/city/get_detail'],
            ['来源','base/source/index','base/source/get_list'],
            ['查看来源','base/source/edit','base/source/get_detail'],
            ['导购','base/guide/index','base/guide/get_list'],
            ['店铺','base/shop/index','base/shop/get_list'],
            ['查看店铺','base/shop/edit','base/shop/get_detail'],
            ['区域','base/area/index','base/area/get_list'],
            ['新增区域','base/area/add','base/area/add'],
            ['查看区域','base/area/edit','base/area/get_detail'],
            ['商品','base/goods/index','base/goods/get_list'],
            ['新增商品','base/goods/add','base/goods/add'],
            ['查看商品','base/goods/edit','base/goods/get_detail'],

            ['充值方式','crm/card_recharge/index','crm/card_recharge/get_list'],
            ['新增充值方式','crm/card_recharge/add','crm/card_recharge/add'],
            ['查看充值方式','crm/card_recharge/edit','crm/card_recharge/get_detail'],
            ['储值卡类别','crm/card_category/index','crm/card_category/get_list'],
            ['新增储值卡类别','crm/card_category/add','crm/card_category/add'],
            ['查看储值卡类别','crm/card_category/edit','crm/card_category/get_detail'],
            ['储值卡资料','crm/prepaid_card/index','crm/prepaid_card/get_list'],
            ['查看储值卡资料','crm/prepaid_card/edit','crm/prepaid_card/get_detail'],
            ['储值卡制成投放单','crm/prepaid_card_make_record/index','crm/prepaid_card_make_record/get_list'],
            ['新增储值卡投放','crm/prepaid_card_make_record/add','crm/prepaid_card_make_record/add'],
            ['查看储值卡投放','crm/prepaid_card_make_record/edit','crm/prepaid_card_make_record/get_detail'],
            ['投放储值卡','crm/prepaid_card_make_record/put','crm/prepaid_card_make_record/put'],
            ['储值卡销售单','crm/prepaid_card_sell_record/index','crm/prepaid_card_sell_record/get_list'],
            ['新增储值卡销售','crm/prepaid_card_sell_record/add','crm/prepaid_card_sell_record/add'],
            ['查看储值卡销售','crm/prepaid_card_sell_record/edit','crm/prepaid_card_sell_record/get_detail'],
            ['储值卡充值单','crm/prepaid_recharge/index','crm/prepaid_recharge/get_list'],
            ['新增储值卡充值','crm/prepaid_recharge/add','crm/prepaid_recharge/add'],
            ['查看储值卡充值','crm/prepaid_recharge/edit','crm/prepaid_recharge/get_detail'],
            ['储值卡退款单','crm/prepaid_refund/index','crm/prepaid_refund/get_list'],
            ['新增储值卡退款','crm/prepaid_refund/add','crm/prepaid_refund/add'],
            ['查看储值卡退款','crm/prepaid_refund/edit','crm/prepaid_refund/get_list'],
            ['储值卡号','crm/prepaid_card_make_record/get_list_detail','crm/prepaid_card_make_record/get_list_detail'],

            ['营销活动','crm/workflow/index','crm/workflow/get_list'],
            ['新增营销活动','crm/workflow/add','crm/workflow/add'],
            ['查看营销活动','crm/workflow/edit','crm/workflow/get_detail'],
            ['活动屏蔽目标组','crm/workflow_remove/index','crm/workflow_remove/get_list'],
            ['新增目标组','crm/workflow_remove/add','crm/workflow_remove/add'],
            ['查看目标组','crm/workflow_remove/edit','crm/workflow_remove/get_detail'],
            ['营销活动类型','crm/workflow_marketing/index','crm/workflow_marketing/get_list'],
            ['新增活动类型','crm/workflow_marketing/add','crm/workflow_marketing/add'],
            ['查看活动类型','crm/workflow_marketing/edit','crm/workflow_marketing/get_detail'],
            ['营销模板','crm/workflow_template/index','crm/workflow_template/get_list'],
            ['新增营销模板','crm/workflow_template/add','crm/workflow_template/add'],
            ['查看营销模板','crm/workflow_template/get_detail','crm/workflow_template/get_detail'],
            ['促销活动','crm/ipos_promotion/get_list','crm/ipos_promotion/get_list'],

            ['优惠券制成单','crm/coupon_made/index','crm/coupon_made/get_list'],
            ['新增优惠券制成','crm/coupon_made/add','crm/coupon_made/add'],
            ['查看优惠券制成','crm/coupon_made/edit','crm/coupon_made/get_detail'],
            ['批量发放优惠券','crm/coupon_made/send_all','crm/coupon_made/send_all'],
            ['优惠券一览','crm/coupon_made/detail_coupon',''],

            ['客服来电记录','crm/tel_information/index','crm/tel_information/get_list'],
            ['新增来电记录','crm/tel_information/add','crm/tel_information/add'],
            ['查看来电记录','crm/tel_information/view','crm/tel_information/get_detail'],
            ['客服回访记录','crm/return_visit_record/index','crm/return_visit_record/get_list'],
            ['新增回访记录','crm/return_visit_record/add','crm/return_visit_record/add'],
            ['查看回访记录','crm/return_visit_record/edit','crm/return_visit_record/get_detail'],

            ['粉丝档案','wechat/vip/index','wechat/vip/get_list'],
            ['微信素材库','wechat/weixin_img/index','wechat/weixin_img/get_list'],
            ['新建单图文素材','wechat/weixin_img/add_single_img','wechat/weixin_img/add_single_img'],
            ['新建多图文素材','wechat/weixin_img/add_multigraph','wechat/weixin_img/add_multigraph'],
            ['微信高级群发','wechat/weixin_senior_group_news/index','wechat/weixin_senior_group_news/get_list'],
            ['新增微信群发','wechat/weixin_senior_group_news/add','wechat/weixin_senior_group_news/add'],
            ['查看微信群发','wechat/weixin_senior_group_news/edit','wechat/weixin_senior_group_news/get_detail'],
            ['微信问卷调查','wechat/survey/index','wechat/survey/get_list'],
            ['微信抽奖活动','wechat/weixin_lottery/index','wechat/weixin_lottery/get_list'],
            ['新增抽奖活动','wechat/weixin_lottery/add','wechat/weixin_lottery/add'],
            ['查看抽奖活动','wechat/weixin_lottery/view','wechat/weixin_lottery/get_detail'],
            ['优惠券分享','wechat/share_coupon/index','wechat/share_coupon/get_list'],
            ['新增优惠券分享','wechat/share_coupon/add','wechat/share_coupon/add'],
            ['查看优惠券分享','wechat/share_coupon/edit','wechat/share_coupon/get_detail'],
            ['优惠券','crm/coupon/get_list','crm/coupon/get_list'],
            ['图文素材','wechat/weixin_img/get_list','wechat/weixin_img/get_list'],

            ['礼品分类','wechat/gift/category/index','wechat/gift/category/get_list'],
            ['新增礼品分类','wechat/gift/category/add','wechat/gift/category/add'],
            ['编辑礼品分类','wechat/gift/category/edit','wechat/gift/category/get_detail'],
            ['礼品列表','wechat/gift/gift/index','wechat/gift/gift/get_list'],
            ['新增礼品列表','wechat/gift/gift/add','wechat/gift/gift/add'],
            ['查看礼品列表','wechat/gift/gift/edit','wechat/gift/gift/get_detail'],
            ['积分区间','wechat/gift/integral/index','wechat/gift/integral/get_list'],
            ['新增积分区间','wechat/gift/integral/add','wechat/gift/integral/add'],
            ['查看积分区间','wechat/gift/integral/edit','wechat/gift/integral/get_detail'],
            ['礼品订单','wechat/gift_record/index','wechat/gift_record/get_list'],
            ['查看礼品订单','wechat/gift_record/edit','wechat/gift_record/get_detail'],
            ['未审核订单','wechat/gift_record_new/index','wechat/gift_record_new/get_list'],
            ['已审核订单','wechat/gift_record_audit/index','wechat/gift_record_audit/get_list'],
            ['已发货订单','wechat/gift_record_ship/index','wechat/gift_record_ship/get_list'],
            ['已完成订单','wechat/gift_record_complete/index','wechat/gift_record_complete/get_list'],
            ['已取消订单','wechat/gift_record_cancel/index','wechat/gift_record_cancel/get_list'],
            ['未审核退单','wechat/gift_record_return/index','wechat/gift_record_return/get_list'],
            ['查看退单','wechat/gift_record_return/edit','wechat/gift_record_return/get_detail'],
            ['已审核退单','wechat/gift_record_return_audit/index','wechat/gift_record_return_audit/get_list'],
            ['已完成退单','wechat/gift_record_return_complete/index','wechat/gift_record_return_complete/get_list'],
            ['商品评价回复','base/evaluate_goods/index','base/evaluate_goods/get_list']
        ];

        //将首字母转换成大写的方法
        var strtoUp = function(str){
            if(typeof str == 'undefined') return '';
            return str.replace(/(\w)/,function(v){
                return v.toUpperCase();
            });
        }
        //将_连接的字符串转换成驼峰大写
        var strtoUp2 = function(str){
            if(typeof str == 'undefined') return '';
            var p = str.split('_');
            var r = '';
            p.forEach(function(o){
                r += strtoUp(o);
            });
            return r;
        }

        //自动生成路径
        $scope.generate_path = function(){
            $scope.data.form_data.ctrl_array.forEach(function(o){
                //o.ctrl_name;
                var p = o.ctrl_name.split('/');
                o.ctrl_class = strtoUp2(p[0])
                            +strtoUp2(p[1])
                            +strtoUp2(p[2])
                            +'Ctrl';
                o.ctrl_path = 'src/controller/'+p[0]+'/'+p[1]+'/'
                            +strtoUp2(p[0])
                            +strtoUp2(p[1])
                            +strtoUp2(p[2])
                            +'Ctrl.js';
                o.html_path = 'src/html/'+p[0]+'/'+p[1]+'/'
                            +strtoUp2(p[0])
                            +strtoUp2(p[1])
                            +strtoUp2(p[2])+'.html';
                
                o.html_script = '<script src="'+o.ctrl_path+'"></script>'+"\n";
                o.app_script = ".when('/"+o.ctrl_name+"', { templateUrl: '"+o.html_path+"', controller:  "+o.ctrl_class+"})"+"\n";

                //自动协助判断是否新增列表编辑页面
                if(o.ctrl_name.indexOf('index')!=-1){
                    o.ctrl_type = 'list';
                }
                if(o.ctrl_name.indexOf('edit')!=-1||o.ctrl_name.indexOf('view')!=-1){
                    o.ctrl_type = 'view';
                }
                if(o.ctrl_name.indexOf('add')!=-1){
                    o.ctrl_type = 'add';
                }


            });

            //生成自动引用脚本
            $scope.data.form_data.html_script = "";
            $scope.data.form_data.app_script = "";
            $scope.data.form_data.ctrl_array.forEach(function(o){
                $scope.data.form_data.html_script += o.html_script;
                $scope.data.form_data.app_script += o.app_script;
            });

        }

        //验证API
        $scope.get_api = function(ul){
            ul.table_fields = [];
            api.request(ul.ctrl_api).then(function(ret){
                ul.api_data = ret.data;
                for(i in ret.data.data[0]){
                    ul.table_fields.push({
                        'keyword':i,
                        'label':'',
                        'orders':''
                    });
                }
            });
            //console.log($scope.data);
        }

        //保存动作
        //提交给PHP程序自动生成相应代码
        $scope.form_save = function(){
            $scope.dialog_title = '自动生成相应代码...';
            open_save_window_id = ngDialog.open({
                overlay: true,
                disableAnimation: true,
                showClose: true,
                width: '',
                template: 'src/html/demo/DemoAutoDialogSave.html',
                scope: $scope
            });
            $http.post('angular.php', $scope.data.form_data).then(function(ret){
                console.log(ret.data);
                $scope.result = ret.data;
            });
        }

        //批量从金智电脑获取API演示数据
        $scope.get_api_data = function(){
            $scope.dialog_title = '获取API演示数据...';
            $scope.result = {'执行中请稍等...':true};
            open_select_window_id = ngDialog.open({
                overlay: true,
                disableAnimation: true,
                showClose: true,
                width: '',
                template: 'src/html/demo/DemoAutoDialogApi.html',
                scope: $scope
            });
            $http.post('get_api_data.php', {data:$scope.auto_configs}).then(function(ret){
                $scope.result = ret.data;
            });
        }

        //查看全部需要完成的页面
        //可以点击页面内的控制器自动进行下一步操作
        var open_list_window_id;
        $scope.show_all_pages = function(){
            $scope.dialog_title = '查看全部页面';
            $scope.result = $scope.auto_configs;
            open_list_window_id = ngDialog.open({
                overlay: true,
                disableAnimation: true,
                showClose: true,
                width: '',
                template: 'src/html/demo/DemoAutoDialogPage.html',
                scope: $scope
            });
            $http.post('check_file_status.php', {data:$scope.auto_configs}).then(function(ret){
                $scope.result = ret.data;
            });
        }

        //弹框中点击某个控制器
        //自动填入各参数并调用地址生成方法和API数据获取方法
        $scope.click_ctrl = function(p){
            ngDialog.close(open_list_window_id);
            $scope.data.form_data.ctrl_array[0].ctrl_name = p.ctrl;
            $scope.data.form_data.ctrl_array[0].ctrl_title = p.title;
            $scope.data.form_data.ctrl_array[0].ctrl_api = p.api;
            $scope.generate_path();
            $scope.get_api($scope.data.form_data.ctrl_array[0]);
        }

        $scope.title_data = [
            { 'ico': 'glyphicon-refresh', 'name': '获取API演示数据', 'click': function() { $scope.get_api_data() } },
            { 'ico': 'glyphicon-th-list', 'name': '查看全部页面', 'click': function() { $scope.show_all_pages() } }
        ];


    }];

DemoAutoCtrl.$injector = ['$rootScope', '$scope', '$location', '$window','api','$http','ngDialog'];