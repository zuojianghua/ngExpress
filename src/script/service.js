angular.module('myService', [])
.factory('api', ['$rootScope', '$http', '$location','$q','Popup','myConfigSys',
    function ($rootScope, $http, $location,$q,Popup,myConfigSys) {
        // var datetime = new Date();
        // var year = datetime.getFullYear();
        // var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        // var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        // var date_str = year + "-" + month + "-" + date;
        // var get_sign = function () {
        //     //var configData = $api.getStorage('configData');
        //     var api_key = 'MY_KEY';
        //     var api_pass = 'MY_PASS';
        //     var str = api_key + api_pass + date_str;
        //     //var sign = $.md5(str);
        //     //return sign;
        //     return str;
        // };
		
		//本地文件配置
        var request_demo = function(api_name, api_parm){
            var post_url = "../api_demo/" + api_name + ".json";
            return $http.get(post_url, api_parm).then(function(ret){
                if(ret.data.status==1){
                    return ret.data;
                }else{
                    Popup.notice(ret.data.message);
                    return false;  //ret.data;
                }
            }).catch(function(ret){
                Popup.notice('网络访问失败');
                return false;
            });
        };
        
        //线上配置
        //请求接口方法
        /**
         * api_name 接口名称 例如 base/customer/get_list
         * api_parm 请求参数 例如 {'search_data': {'code': '001', 'status': 1}}
         * http_parm http参数 例如 {'responseType': 'arraybuffer'}
         */
        var request = function(api_name, api_parm, http_parm){
            var post_url = "index.php?app_act=" + api_name;

            //提交请求时附加上当前操作人信息
            if(api_parm){
                api_parm.user_info = {
                    user_id : $util.getcookie('user_id'),
                    user_code : $util.getcookie('user_code')
                } 
            }

            return $http.post(post_url, api_parm, http_parm).then(function(ret){
                if(ret.data.status==1){
                    return ret.data;
                }else{
                    Popup.notice(ret.data.message);
                    return ret.data;  //ret.data;
                }
            }).catch(function(ret){
                Popup.notice('网络访问失败');
                return false;
            });
        };

        var request_route = function(api_name, api_parm, http_parm){
            if($rootScope.config_sys.fake_api===true){
                return request_demo(api_name, api_parm, http_parm);
            }else{
                return request(api_name, api_parm, http_parm);
            }
        }

        //获取URL请求的地址
        var get_api_url = function(api_name){
            var post_url = "index.php?app_act=" + api_name;
            return post_url;
        };
        var get_api_url_demo = function(api_name){
            var post_url = "api_demo/" + api_name + '.json';
            return post_url;
        };
        if(!$rootScope.config_sys){
            $rootScope.config_sys = myConfigSys;
        };
        return {
            "get_api_url": get_api_url,   //获取请求的地址
            "request": request_route, //API请求：根据配置是访问正式环境还是静态数据
            "request_demo": request_demo
        };

}])
.factory('myServiceUtil',['$rootScope','api',function($rootScope,api){

    //根据URL获取菜单数据中的123级ID
    //传入当前的URL和菜单$rootScope.sys_menu对象
    var get_menu_by_url = function(url){
        var r = {
            m1:'',m2:'',m3:''
        };
        $rootScope.sys_menu.forEach(function(m1){
            m1.child.forEach(function(m2){
                m2.child.forEach(function(m3){
                    if(url == m3.url){
                        r.m1 = m1;
                        r.m2 = m2;
                        r.m3 = m3;
                        return;
                    }
                });
                if(r.m3 != '') return;
            });
            if(r.m3 != '') return;
        });
        return r;
    }

    //根据关键词搜索菜单, 参数为输入的关键词, 最多返回max条
    var get_menu_by_keywords = function(keywords,max){
        var reg = new RegExp(keywords,'ig');
        var ret = [];

        $rootScope.sys_menu.forEach(function(m1){
            m1.child.forEach(function(m2){
                m2.child.forEach(function(m3){
                    if(reg.test(m3.name)){
                        ret.push(m3);
                    }
                });
            });
        });
        if(max && max>0){
            ret.splice(max);
        }
        return ret;
    }

    //根据逗号分隔的菜单id，去处无权限的菜单
    //返回权限数组本身
    var get_menu_by_purview = function(purview_id_str){
        var purview_id_arr = purview_id_str.split(',');
        $rootScope.sys_menu.forEach(function(m1,i1){
            if(-1==purview_id_arr.indexOf(m1.purview_id)){
                $rootScope.sys_menu.splice(i1,1);
            }else{
                m1.child.forEach(function(m2,i2){
                    if(-1==purview_id_arr.indexOf(m2.purview_id)){
                        m1.child.splice(i2,1);
                    }else{
                        m2.child.forEach(function(m3,i3){
                            if(-1==purview_id_arr.indexOf(m3.purview_id)){
                                m2.child.splice(i3,1);
                            }
                        });
                    }
                });
            }
        });
        return $rootScope.sys_menu;
    }


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

    //根据url地址判断当前的收藏状态
    var get_fav_status = function(url){
        var sys_menu_fav = $rootScope.sys_menu_fav;
        var status = false;
        sys_menu_fav.forEach(function(o){
            if(o.url == url){
                status = true;
            }
        });
        return status;
    }


    //将菜单添加到收藏后刷新本地状态，data对象同api请求时的参数
    var add_to_fav = function(data){
        $rootScope.sys_menu_fav.push(data);
        $util.setStorage('sys_menu_fav',$rootScope.sys_menu_fav);
    }
	
    //删除菜单收藏后刷新本地状态，data对象同api请求时的参数
    var remove_from_fav = function(data){
        var i = false;
        $rootScope.sys_menu_fav.forEach(function(o,index){
            if(o.url == data.url){
                i = index;
            }
        });
        if(i!==false){
            $rootScope.sys_menu_fav.splice(i,1);
        }
        $util.setStorage('sys_menu_fav',$rootScope.sys_menu_fav);
    }

    //获取某用户表头设置全部参数，并写入localstorage
    var get_config_table_set = function (user_id) {
        //服务器和localstorage保存的单条配置样例为:
        //{th1:true,th2:false,th3:true}
        return api.request('sys/user_html_config/get_by_user_id', { user_id: user_id }).then(function (ret) {
            if (ret.status == 1) {
                var conf_data_obj = {};
                ret.data.forEach(function(o){
                    conf_data_obj[o.url] = o.context;
                });
//              console.log(conf_data_obj);
                $util.setStorage('config_table_set_' + user_id, conf_data_obj);
                $rootScope.config_table_set = conf_data_obj;
            } else {
                $rootScope.config_table_set = $util.getStorage('config_table_set_' + user_id) ? $util.getStorage('config_table_set_' + user_id) : {};
            }
        });
    }



    //克隆一个对象，防止对象地址引用造成错误
    var clone = function (obj){
		return JSON.parse(JSON.stringify(obj));
	}

    
    //=======================================================================
    return {
        "get_menu_by_url":get_menu_by_url,
        "get_menu_by_keywords":get_menu_by_keywords,
        "get_menu_by_purview":get_menu_by_purview,
        "get_fav_status":get_fav_status,
        "add_to_fav":add_to_fav,
        "remove_from_fav":remove_from_fav,
        "get_config_table_set":get_config_table_set,
        "strtoUp":strtoUp,
        "strtoUp2":strtoUp2,
        "clone":clone
    }
}])
.factory('valid',['$rootScope',function($rootScope){
    //验证是否必填
    var check_required = function (input) {
        //console.log(input);
        if (typeof input == 'undefined' || input == undefined || input == '' || input == null) {
            return false;
        } else {
            return true;
        }
    }
    
    //验证正整数(不包含0)
    var check_positive_integer = function (input) {
        if ((/^(\+|-)?\d+$/.test(input)) && input>0) {
            return true;
        } else {
            return false;
        }
    }
    
    //验证(包含0)的正整数
    var check_integer = function (input) {
        if ((/^(\+|-)?\d+$/.test(input)) && input>=0) {
            return true;
        } else {
            return false;
        }
    }
    
    //验证手机号码
    var check_mobile = function (input) {
        if ((/^(1(([35][0-9])|(47)|[8][0-9]))\d{8}$/.test(input))) {
            return true;
        } else {
            return false;
        }
    }
    
    //验证0~1之间的数
    var check_zero_one = function(input){
        if(input>=0 && input<=1){
        	return true;
        }else{
        	return false;
        }
    }
        //验证1~100之间的数
        var check_one_hundred = function(input){
            if(input>=1 && input<=100){
                return true;
            }else{
                return false;
            }
        }
    //包含0的正数
    var check_zero_positive = function(input){
        if((/^[0-9]+.?[0-9]*$/.test(input)) && input>=0){
        	return true;
        }else{
        	return false;
        }
    }
    
    //正数(不包含0)
    var check_positive = function(input){
        if((/^[0-9]+.?[0-9]*$/.test(input)) && input>0){
        	return true;
        }else{
        	return false;
        }
    }
    
    //验证是否相等 input为有两个元素的数组
    var check_eq = function(input){
        if(input[0]!==input[1]){
            return false;
        }else{
            return true;
        }
    }
    
    //只能输入2位小数或正数(金额)
    var check_money_format = function(input){
        if((/^\d+(\.\d{2})*$/.test(input))){
            return true;
        }else{
            return false;
        }
    }

    //验证选择
    var check_switch = function(func, dat){
        switch(func){
            case 'check_required':return check_required(dat);//验证是否必填
            case 'check_positive_integer':return check_positive_integer(dat);//验证正整数(不包含0)
            case 'check_integer':return check_integer(dat);//验证(包含0)的正整数
            case 'check_mobile':return check_mobile(dat);//验证手机号
            case 'check_zero_one':return check_zero_one(dat);//验证0~1之间的数
            case 'check_one_hundred':return check_one_hundred(dat);//验证1~100之间的数
            case 'check_zero_positive':return check_zero_positive(dat);//包含0的正数
            case 'check_positive':return check_positive(dat);//正数(不包含0)
            case 'check_money_format':return check_money_format(dat);//只能输入2位小数或正数(金额)
            case 'check_eq':return check_eq(dat);//验证是否相等 input为有两个元素的数组
        }
        return true;
    }

    //各种验证: TODO 可以根据需要改造成promise返回
    var check = function (check_list) {
        var ret = {
            'status': true,
            'data': {}
        };

        check_list.forEach(function(o){
                if(!check_switch(o.valid,o.data)){
                ret.status = false;
                ret.data[o.key] = 'error';
                ret.data[o.key+'_ico'] = 'glyphicon-warning-sign';
                ret.data[o.key+'_tip'] = o.tip;
            }else{
                ret.data[o.key] = 'success';
                ret.data[o.key+'_ico'] = 'glyphicon-ok';
                ret.data[o.key+'_tip'] = '';
            }
        });
        return ret;
    }

    return {
        "check": check,
        "check_required": check_required,//验证是否必填
        "check_positive_integer": check_positive_integer,//验证正整数(不包含0)
        "check_integer": check_integer,//验证(包含0)的正整数
        "check_mobile": check_mobile,//验证手机号
        "check_zero_one": check_zero_one,//验证0~1之间的数
        "check_one_hundred": check_one_hundred,//验证1~100之间的数
        "check_zero_positive": check_zero_positive,//包含0的正数
        "check_positive": check_positive,//正数(不包含0)
        "check_money_format": check_money_format,//只能输入2位小数或正数(金额)
        "check_eq": check_eq//验证是否相等 input为有两个元素的数组
    }
}])
.factory('myServiceDatabind',['$rootScope','api',function($rootScope,api){
    //控件数据源
    //选择部门
    var select_department = function(param){
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
    var select_user = function(param){
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

    return {
        select_department:select_department,
        select_user:select_user
    }
}])
.factory('myServiceOptions',['$rootScope','api',function($rootScope,api){
    //选择器枚举
    return {
        option:{
            'customer_sex_options': { '0': '保密', '1': '男', '2': '女' },
            'weixin_type_options':{'0':'认证服务号'},
            '_options':{}
        },
        selector:{
            'select_department':'选择部门',
            'select_user':'选择用户/店员'
        }
    }
}])
;