/**
 * 新增样例页面控制器
 * @author zuojianghua<28842136@qq.com>
 * @date 2016-08-10
 */
var DemoAddCtrl = ['$rootScope', '$scope', '$location', '$window',
    function ($rootScope, $scope, $location, $window) {
        $rootScope.nav = 'n0';           //一级菜单标识
        $rootScope.menu = 'm01';           //二级菜单标识
        $rootScope.subMenu = 's03';        //三级菜单标识
        $rootScope.url = '/demo/add';     //本页url地址

        if (!$rootScope.histroy.hasOwnProperty('/demo/add')) {
            //Tab标签的顺序
            var order = Object.keys($rootScope.histroy);
            //本页面scope内的属性定义在此
            $scope.data = {
                title: '新增表单页',
                content: '',
                form: {
                    dianyuan_code: '001',
                    dianyuan_name: '张三',
                    first_day : '2016-10-10'
                }
            };
            //纳入到tab历史中
            $rootScope.histroy['/demo/add'] = {
                scope: $scope
            };
        } else {
            $scope.data = $rootScope.histroy['/demo/add'].scope.data;
            var order = $rootScope.histroy['/demo/add'].order;
        }

        //获取店员信息
        $scope.get_dianyuan_data = function () {
            return [
                { 'code': '001', 'name': '张三' },
                { 'code': '002', 'name': '李四' },
                { 'code': '003', 'name': '王五' }
            ];
        }

        //保存表单
        $scope.save_form = function () {
            console.log($scope.data.form);
        }

        
        

        


    }];

DemoAddCtrl.$injector = ['$rootScope', '$scope', '$location', '$window'];