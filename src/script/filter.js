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
    .filter('vipmark', function () {
        return function (input) {
            return (input===false||input==='false') ? '' : input;
        };
    })
    .filter('distributortypemark', function () {
        return function (input) {
            return (input===true||input==='true'||input===1||input==='1') ? '部分' : '全部';
        };
    })
    .filter('deliverytypemark', function () {
        return function (input) {
            return (input===true||input==='true'||input===1||input==='1') ? '快递' : '自取';
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