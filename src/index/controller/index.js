var MainCtrl = ['$rootScope', '$scope', '$location', '$window', 
function ($rootScope, $scope, $location, $window) {
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
        
    });


}];

var HelloCtrl = ['$rootScope', '$scope', '$location', '$window', 'api',
function ($rootScope, $scope, $location, $window ,api) {
    if(!$rootScope.histroy.hasOwnProperty('/hello')){
        $rootScope.histroy['/hello'] = $scope = {
            nav : 'm1',
            list_data:[],
            filter_data:{
                'qudao':'a1111'
            },
            page_data:{}
        };
    }
    
    console.log($rootScope.histroy['/hello']);
    

    api.request('custom_list').then(function(res){
        $rootScope.histroy['/hello'].list_data = res.data.data.data;
        //$rootScope.histroy['/hello'].filter_data = res.data.data.filter;
        $rootScope.histroy['/hello'].page_data = res.data.data.page;
        //console.log(res.data.data.data[0]);
    });
    

}];

var DashboardCtrl = ['$rootScope', '$scope', '$location', '$window', 
function ($rootScope, $scope, $location, $window) {
    $scope.nav = '';

}];

var NavCtrl = ['$rootScope', '$scope', '$location', '$window', 
function ($rootScope, $scope, $location, $window) {
    $scope.navs = [
        {'name':'m1','title':'会员','position':1,'url':'#/hello'},
        {'name':'m2','title':'策略','position':2,'url':'#/dashboard'},
        {'name':'m3','title':'档案','position':3,'url':'#/hello'},
        {'name':'m3','title':'储值','position':3,'url':'#/hello'},
        {'name':'m3','title':'营销','position':3,'url':'#/hello'},
        {'name':'m3','title':'客服','position':3,'url':'#/hello'},
        {'name':'m3','title':'移动','position':3,'url':'#/hello'},
        {'name':'m3','title':'门户','position':3,'url':'#/hello'},
        {'name':'m3','title':'系统','position':3,'url':'#/hello'},
        {'name':'m3','title':'接口','position':3,'url':'#/hello'},
        {'name':'m3','title':'分析','position':3,'url':'#/hello'}
    ];
}];



MainCtrl.$injector = ['$rootScope', '$scope', '$location', '$window'];
HelloCtrl.$injector = ['$rootScope', '$scope', '$location', '$window'];
DashboardCtrl.$injector = ['$rootScope', '$scope', '$location', '$window'];