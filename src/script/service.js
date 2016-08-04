angular.module('myService', [])
.factory('api', ['$rootScope', '$http', '$location',
    function ($rootScope, $http, $location) {
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

        var request_demo = function(api_name, api_parm){
            var post_url = "/api_demo/" + api_name + ".json";
            return $http.get(post_url, api_parm);
        };

        return {
            "request":request_demo,
            "request_demo":request_demo
        };

}]);