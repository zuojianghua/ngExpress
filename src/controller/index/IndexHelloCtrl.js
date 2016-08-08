var IndexHelloCtrl = ['$rootScope', '$scope', '$location', '$window', 'api',
    function ($rootScope, $scope, $location, $window, api) {
        $rootScope.url = '/hello';
        if (!$rootScope.histroy.hasOwnProperty('/hello')) {
            $rootScope.histroy['/hello'] = $scope = {
                nav: 'm1',
                title: '列表页',
                url: '/hello',
                list_data: [],
                filter_data: {
                    'qudao': 'a1111'
                },
                page_data: {}
            };
        }

        //console.log($rootScope.histroy['/hello']);


        api.request('custom_list').then(function (res) {
            $rootScope.histroy['/hello'].list_data = res.data.data.data;
            //$rootScope.histroy['/hello'].filter_data = res.data.data.filter;
            $rootScope.histroy['/hello'].page_data = res.data.data.page;
            //console.log(res.data.data.data[0]);
        });


    }];

IndexHelloCtrl.$injector = ['$rootScope', '$scope', '$location', '$window'];