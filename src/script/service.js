angular.module('myService', [])
.factory('api', ['$rootScope', '$http', '$location','$q',
    function ($rootScope, $http, $location,$q) {
        var datetime = new Date();
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var date_str = year + "-" + month + "-" + date;
        var get_sign = function () {
            //var configData = $api.getStorage('configData');
            var api_key = 'MY_KEY';
            var api_pass = 'MY_PASS';
            var str = api_key + api_pass + date_str;
            //var sign = $.md5(str);
            //return sign;
            return str;
        };
		
		//本地文件配置
        var request_demo = function(api_name, api_parm){
            var post_url = "api_demo/" + api_name + ".json";
            return $http.get(post_url, api_parm).then(function(ret){
                if(ret.data.status==1){
                    return ret.data;
                }else{
                    alert(ret.data.message);
                    return false;  //ret.data;
                }
            }).catch(function(ret){
                alert('网络访问失败');
                return false;
            });
        };
        
        //线上配置
        var request = function(api_name, api_parm){
            var post_url = "index.php?app_act=" + api_name;
            return $http.post(post_url, api_parm).then(function(ret){
                if(ret.data.status==1){
                    return ret.data;
                }else{
                    alert(ret.data.message);
                    return false;  //ret.data;
                }
            }).catch(function(ret){
                alert('网络访问失败');
                return false;
            });
        };

        //获取URL请求的地址
        var get_api_url = function(api_name){
            var post_url = "index.php?app_act=" + api_name;
            return post_url;
        };
        var get_api_url_demo = function(api_name){
            var post_url = "api_demo/" + api_name + '.json';
            return post_url;
        };

        return {
            "get_api_url":get_api_url_demo,//获取请求的地址
            "request":request_demo,//配置访问方式
            "request_demo":request_demo
        };

}])
.factory('util',['$rootScope',function($rootScope){

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



    return {
        "get_menu_by_url":get_menu_by_url,
        "strtoUp":strtoUp,
        "strtoUp2":strtoUp2
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
    
    //验证正整数
    var check_positive_integer = function (input) {
        if ((/^(\+|-)?\d+$/.test(input)) && input>0) {
            return true;
        } else {
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

    //验证选择
    var check_switch = function(func, dat){
        switch(func){
            case 'check_required':return check_required(dat);
            case 'check_positive_integer':return check_positive_integer(dat);
            case 'check_eq':return check_eq(dat);
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
        "check_required": check_required,
        "check_positive_integer": check_positive_integer
    }
}])
;