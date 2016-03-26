var MainCtrl = ['$rootScope', '$scope', '$location', '$window', 
function ($rootScope, $scope, $location, $window) {
    
}];

var HelloCtrl = ['$rootScope', '$scope', '$location', '$window', 
function ($rootScope, $scope, $location, $window) {
    $scope.nav = 'm1';
}];

var NavCtrl = ['$rootScope', '$scope', '$location', '$window', 
function ($rootScope, $scope, $location, $window) {
    $scope.navs = [
        {'name':'m1','title':'标题一','position':1},
        {'name':'m2','title':'标题二','position':2},
        {'name':'m3','title':'标题三','position':3}
    ];
}];



MainCtrl.$injector = ['$rootScope', '$scope', '$location', '$window'];
HelloCtrl.$injector = ['$rootScope', '$scope', '$location', '$window'];