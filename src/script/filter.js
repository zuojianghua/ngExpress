angular.module('myFilters', [])
    .filter('orderObjectBy', function () {
        return function (items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function (item) {
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return (a[field] > b[field] ? 1 : -1);
            });
            if (reverse)
                filtered.reverse();
            return filtered;
        };
    })
    .filter('checkmark', function () {
        return function (input) {
            return (input===true||input==='true'||input===1||input==='1') ? '\u2713' : '\u2718';
        };
    }) 
    .filter('resolvetypemark', function () {
    	return function (input) {
			if(input=='0' || input==0){
				return '未处理';
			}else if(input=='-1' || input==-1){
				return '问题单';
			}else if(input=='1' || input==1){
				return '处理成功';
			}else{
				return '';
			}
        };
    })
    .filter('cancelmark', function () {
        return function (input) {
            return (input===true||input==='true'||input===1||input==='1') ? '\u2713' : '';
        };
    })
    .filter('transtypemark', function () {
        return function (input) {
            return (input===true||input==='true'||input===1||input==='1') ? '按消费单转移' : '全卡消费数据转移';
        };
    })
    .filter('sysmark', function () {
        return function (input) {
            return (input===true||input==='true'||input===1||input==='1') ? '是' : '否';
        };
    })
    .filter('finalmark', function () {
        return function (input) {
            return (input===true||input==='true'||input===1||input==='1') ? '是' : '否';
        };
    })
    .filter('distributortypemark', function () {
        return function (input) {
            return (input===true||input==='true'||input===1||input==='1') ? '实体店' : '网络店';
        };
    })
    .filter('handlemark', function () {
        return function (input) {
            return (input===true||input==='true'||input===1||input==='1') ? '已处理' : '未处理';
        };
    })
    .filter('imgtypemark', function () {
        return function (input) {
            return (input===true||input==='true'||input===1||input==='1') ? '多图文' : '单图文';
        };
    })
    .filter('logintypemark', function () {
        return function (input) {
            return (input===true||input==='true'||input===1||input==='1') ? '退出' : '登录';
        };
    })
    .filter('vipmark', function () {
        return function (input) {
            return (input===false||input==='false') ? '' : input;
        };
    })
    .filter('giftdistributortypemark', function () {
        return function (input) {
            return (input===true||input==='true'||input===1||input==='1') ? '部分' : '全部';
        };
    })
    .filter('deliverytypemark', function () {
        return function (input) {
            return (input===true||input==='true'||input===1||input==='1') ? '快递' : '自取';
        };
    })
    .filter('apistatusmark', function () {
        return function (input) {
            return (input===true||input==='true'||input===1||input==='1') ? '成功' : '失败';
        };
    })
    .filter('consumetypemark', function () {
        return function (input) {
            return (input===0||input==='0') ? '消费' : '退货';
        };
    })
    .filter('applicationscopemark', function () {
        return function (input) {
            return (input===1||input==='1') ? '全部' : '部分';
        };
    })
    .filter('birthscopemark', function () {
        return function (input) {
            return (input===1||input==='1') ? '全部' : '仅限生日会员';
        };
    })
    .filter('noticetypemark', function () {
        return function (input) {
            return (input===1||input==='1') ? '其他' : '活动公告';
        };
    })
    .filter('inputtypemark', function () {
        return function (input) {
            return (input===1||input==='1') ? '文本框' : '下拉框';
        };
    })
    .filter('noticestatusmark', function () {
        return function (input) {
			if(input=='0' || input==0){
				return '未确认';
			}else if(input=='1' || input==1){
				return '已确认';
			}else if(input=='2' || input==2){
				return '已审批';
			}else if(input=='3' || input==3){
				return '已作废';
			}else{
				return '';
			}
        };
    })
    .filter('favourmark', function () {
        return function (input) {
			if(input=='0' || input==0){
				return '当月';
			}else if(input=='1' || input==1){
				return '当天';
			}else if(input=='2' || input==2){
				return '当年';
			}else if(input=='3' || input==3){
				return '前后n天';
			}else{
				return '';
			}
        };
    })
    .filter('favourtypemark', function () {
        return function (input) {
			if(input=='0' || input==0){
				return '指定金额';
			}else if(input=='1' || input==1){
				return '指定折扣';
			}else if(input=='2' || input==2){
				return '优惠金额';
			}else{
				return '';
			}
        };
    })
    .filter('sexmark', function () {
        return function (input) {
            if (input == 1 || input == '1') {
                return '男';
            } else if (input == 2 || input == '2') {
                return '女';
            } else if (input == 3 || input == '3') {
                return '保密';
            } else {
                return '';
            }
        };
    })
    .filter('citytypemark', function () {
        return function (input) {
            if (input == 0 || input == '0') {
                return '无等级';
            } else if (input == 1 || input == '1') {
                return '一线城市';
            } else if (input == 2 || input == '2') {
                return '二线城市';
            } else {
                return '';
            }
        };
    })
    .filter('sourcetypemark', function () {
        return function (input) {
            if (input == 0 || input == '0') {
                return '无类型';
            } else if (input == 1 || input == '1') {
                return '线上';
            } else if (input == 2 || input == '2') {
                return '线下';
            } else {
                return '';
            }
        };
    })
    .filter('cardstatusmark', function () {
        return function (input) {
            if (input == 0 || input == '0') {
                return '正常';
            } else if (input == 1 || input == '1') {
                return '停用';
            } else if (input == 2 || input == '2') {
                return '挂失';
            } else if (input == 3 || input == '3') {
                return '已使用';
            } else if (input == 4 || input == '4') {
                return '过期';
            } else if (input == 5 || input == '5') {
                return '作废';
            } else {
                return '';
            }
        };
    })
    .filter('workflowstatusmark', function () {
        return function (input) {
            if (input == 0 || input == '0') {
                return '初始';
            } else if (input == 1 || input == '1') {
                return '设计流程';
            } else if (input == 2 || input == '2') {
                return '审批通过';
            } else if (input == 3 || input == '3') {
                return '开始执行';
            } else if (input == 4 || input == '4') {
                return '执行中';
            } else if (input == 5 || input == '5') {
                return '执行完成';
            } else if (input == 6 || input == '6') {
                return '生成报表';
            } else if (input == 7 || input == '7') {
                return '完成';
            } else if (input == 8 || input == '8') {
                return '终止';
            } else {
                return '';
            }
        };
    })
    .filter('recordstatusmark', function () {
        return function (input) {
            if (input == 0 || input == '0') {
                return '审核中';
            } else if (input == 1 || input == '1') {
                return '已审核拣货中';
            } else if (input == 3 || input == '3') {
                return '已发货';
            } else if (input == 5 || input == '5') {
                return '已完成';
            } else if (input == 7 || input == '7') {
                return '已取消';
            } else if (input == 8 || input == '8') {
                return '申请退货';
            } else if (input == 9 || input == '9') {
                return '确认退货';
            } else if (input == 11 || input == '11') {
                return '完成退货';
            } else {
                return '';
            }
        };
    })
    .filter('issendmark', function () {
        return function (input) {
            if (input == 0 || input == '0') {
                return '未发送';
            } else if (input == 1 || input == '1') {
                return '已发送';
            } else if (input == 2 || input == '2') {
                return '发送中';
            } else {
                return '';
            }
        };
    })
    .filter('activitytypemark', function () {
        return function (input) {
			if (input == 1 || input == '1') {
                return '大转盘';
            } else if (input == 2 || input == '2') {
                return '刮刮卡';
            } else if (input == 3 || input == '3') {
                return '竞猜';
            } else if (input == 4 || input == '4') {
                return '投票';
            } else {
                return '';
            }
        };
    })
    .filter('activitystatusmark', function () {
        return function (input) {
			if(input == 0 || input == '0'){
				return '待审核';
			} else if (input == 1 || input == '1') {
                return '待发布';
            } else if (input == 2 || input == '2') {
                return '进行中';
            } else if (input == 3 || input == '3') {
                return '已结束';
            } else if (input == 4 || input == '4') {
                return '已终止';
            } else {
                return '';
            }
        };
    })
    .filter('workflowtypemark', function () {
        return function (input) {
			if(input == 0 || input == '0'){
				return '手机';
			} else {
                return '';
            }
        };
    })
    .filter('sourcemark', function () {
        return function (input) {
			if(input == 1 || input == '1'){
				return 'erp';
			} else if (input == 6 || input == '6') {
                return 'pos';
            } else if (input == 7 || input == '7') {
                return '百胜icrm';
            } else if (input == 8 || input == '8') {
                return 'e3后台';
            } else if (input == 9 || input == '9') {
                return '淘宝';
            } else if (input == 10 || input == '10') {
                return '拍拍';
            } else if (input == 11 || input == '11') {
                return 'openshop';
            } else if (input == 12 || input == '12') {
                return '分销商';
            } else if (input == 13 || input == '13') {
                return '京东';
            } else if (input == 14 || input == '14') {
                return '亚马逊';
            } else if (input == 15 || input == '15') {
                return 'QQ网购';
            } else if (input == 16 || input == '16') {
                return '一号店';
            } else if (input == 17 || input == '17') {
                return 'eBay';
            } else if (input == 18 || input == '18') {
                return '网络分销主站';
            } else if (input == 19 || input == '19') {
                return '淘宝分销';
            } else if (input == 20 || input == '20') {
                return '新浪';
            } else if (input == 21 || input == '21') {
                return 'shopex';
            } else if (input == 22 || input == '22') {
                return 'ecshop';
            } else if (input == 23 || input == '23') {
                return '当当';
            } else if (input == 24 || input == '24') {
                return '邮乐';
            } else if (input == 25 || input == '25') {
                return '乐酷天';
            } else if (input == 26 || input == '26') {
                return 'shopex分销王';
            } else if (input == 27 || input == '27') {
                return 'vjia';
            } else if (input == 28 || input == '28') {
                return '优购';
            } else if (input == 29 || input == '29') {
                return 'efast';
            } else if (input == 30 || input == '30') {
                return '微购物';
            } else if (input == 31 || input == '31') {
                return '微信';
            } else if (input == 32 || input == '32') {
                return '苏宁';
            } else if (input == 33 || input == '33') {
                return '唯品会';
            } else if (input == 34 || input == '34') {
                return '聚美优品';
            } else if (input == 35 || input == '35') {
                return '卖网';
            } else if (input == 36 || input == '36') {
                return '库巴';
            } else if (input == 37 || input == '37') {
                return '名鞋库';
            } else if (input == 38 || input == '38') {
                return '阿里巴巴';
            } else if (input == 39 || input == '39') {
                return '口袋通';
            } else if (input == 40 || input == '40') {
                return '工行';
            } else if (input == 41 || input == '41') {
                return '银泰';
            } else if (input == 42 || input == '42') {
                return '走秀网';
            } else if (input == 43 || input == '43') {
                return '贝贝网';
            } else if (input == 44 || input == '44') {
                return '蘑菇街';
            } else if (input == 45 || input == '45') {
                return '拍鞋网';
            } else if (input == 46 || input == '46') {
                return '好乐买';
            } else if (input == 47 || input == '47') {
                return '乐蜂';
            } else if (input == 48 || input == '48') {
                return '微盟';
            } else if (input == 49 || input == '49') {
                return '折800';
            } else if (input == 50 || input == '50') {
                return 'OS主站';
            } else if (input == 51 || input == '51') {
                return 'API接口';
            } else if (input == 52 || input == '52') {
                return 'ncm';
            } else if (input == 53 || input == '53') {
                return 'BSERP2';
            } else if (input == 54 || input == '54') {
                return 'BS3000+';
            } else if (input == 55 || input == '55') {
                return '第三方仓储物流';
            } else if (input == 56 || input == '56') {
                return '唯品会JIT';
            } else if (input == 57 || input == '57') {
                return 'ISHOP';
            } else if (input == 58 || input == '58') {
                return '飞牛';
            } else if (input == 59 || input == '59') {
                return '蜜芽';
            } else if (input == 60 || input == '60') {
                return '百度mall接口';
            } else if (input == 61 || input == '61') {
                return '三足接口';
            } else if (input == 62 || input == '62') {
                return '移动pos';
            } else if (input == 63 || input == '63') {
                return 'M6';
            } else if (input == 65 || input == '65') {
                return '速卖通';
            } else if (input == 66 || input == '66') {
                return '明星衣橱';
            } else if (input == 67 || input == '67') {
                return '百胜E3';
            } else if (input == 68 || input == '68') {
                return '润和pos';
            } else if (input == 9000 || input == '9000') {
                return '错误来源';
            } else {
                return '';
            }
        };
    })
    .filter('percentageMark', function () {
        //百分比标记
        return function (input) {
			return (parseFloat(input)*100).toFixed(2) + '%';
        };
    })
    .filter('crontabtypemark', function () {
        return function (input) {
			if(input==0 || input=='0'){
                return '指定频率';
			}else if(input==1 || input=='1'){
				return '每月第一天';
			}else{
				return '未知类型';
			}
        };
    })
    .filter('emessagetypemark', function () {
        return function (input) {
			if(input==0 || input=='0'){
                return '其它';
			}else if(input==1 || input=='1'){
				return '营销';
			}else if(input==2 || input=='2'){
				return '订单';
			}else if(input==3 || input=='3'){
				return '激活';
			}else if(input==4 || input=='4'){
				return '注册';
			}else{
				return '';
			}
        };
    })
    //保留2位小数
    .filter('formatmoneymark', function () {
        return function (input) {
			return Number(input).toFixed(2);
        };
    })
    .filter('subscribemark', function () {
        return function (input) {
            if (input == 0 || input == '0') {
                return '否';
            } else if (input == 1 || input == '1') {
                return '是';
            } else {
                return '';
            }
        };
    })
    .filter('default',function(){
        //当要显示的变量为空时，输出一个默认字符串
        return function(input,def){
            if(input==undefined||input==''){
                return def;
            }else{
                return input;
            }
        }
    })