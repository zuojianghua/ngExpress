/**
 * excel导入导出控件。不同类型的导入和导入后的处理接口在本控件中配置
 * @author jhua.zuo@baisonmail.com
 * @date 2016-11-21
 * 
 * @example 
 * <button excel-import="true" excel-code="vip">导入按钮</button> 
 * <button excel-export="true" excel-code="vip">导出按钮</button> 导出条件继承当前控制器的$scope.data.search_data; 不分页不排序
 */
myDirective.directive("excelImport", ['$parse', 'ngDialog',function($parse, ngDialog) {

    /**
     * 配置说明
     * code : 导入的excel处理类型
     * title : 弹出框的标题显示用
     * tpl : 下载导入模版的请求地址
     */
    var config = {
        'vip': { 'code': 'vip', 'title': '会员', 'tpl': 'index.php?app_act=common/excel_template/get_template_by_code&code=vip' },
        'customer': { 'code': 'customer', 'title': '顾客', 'tpl': 'index.php?app_act=common/excel_template/get_template_by_code&code=customer' },
        'area': { 'code': 'area', 'title': '顾客', 'tpl': 'index.php?app_act=common/excel_template/get_template_by_code&code=area' },
        'brand': { 'code': 'brand', 'title': '顾客', 'tpl': 'index.php?app_act=common/excel_template/get_template_by_code&code=brand' },
        'shop': { 'code': 'shop', 'title': '顾客', 'tpl': 'index.php?app_act=common/excel_template/get_template_by_code&code=shop' }
    };
    var api_route = 'common/excel_import/import';

    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            if (!$parse(attrs['excelImport'])(scope)) {
                return;
            }
            //操作的是哪种excel
            var code = $parse(attrs['excelCode'])(scope);
            //单独一个excel对象，用于显示弹框信息
            scope.data.excel_data = config[code];

            //点击事件绑定，所以外面的页面不需要再绑定ng-click事件
            elem.on('click', function() {
                scope.excelImportOpen();
            });

            //打开导入窗口
            var excelWindow = 0;
            scope.excelImportOpen = function() {
                excelWindow = ngDialog.open({
                    overlay: true,
                    disableAnimation: true,
                    showClose: true,
                    width: '350px',
                    template: 'html/directive/excel/ExcelImportWindow.html',
                    scope: scope,
                    controller: ['$scope', 'api', function($scope, api) {
                        $scope.import_excel = function() {
                            api.request(api_route, { 'path': $scope.data.excel_data.value, 'code': $scope.data.excel_data.code }).then(function(ret) {
                                if (ret.status == 1) {
                                    ngDialog.close(excelWindow);
                                    //导入成功后清空上次的导入文档值
                                    $scope.data.excel_data.value = '';
                                    $scope.data.excel_data.name = '';
                                    $scope.alert('导入成功');
                                } else {
                                    $scope.alert(ret.message);
                                }
                            });
                        }
                    }]
                });
            }
            /////////////////////////////////////
        }
    }
}]).directive("excelExport", ['$parse', 'ngDialog', 'api',function($parse, ngDialog, api) {

    var api_route = 'common/excel_export/export';

    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            if (!$parse(attrs['excelExport'])(scope)) {
                return;
            }
            //要导出的是什么数据
            var code = $parse(attrs['excelCode'])(scope);

            //导出数据的查询条件，不分页
            var search_data = scope.data.search_data;

            //点击事件绑定，所以外面的页面不需要再绑定ng-click事件
            elem.on('click', function() {
                //console.log(search_data);
                scope.excelExportDownload();
            });

            scope.excelExportDownload = function() {
                scope.notice('下载已经启动，请注意不要反复点击重复提交请求');
                api.request(api_route, { "code": code, "search_data": search_data }, { 'responseType': 'arraybuffer' }).then(function(data) {
                    var blob = new Blob([data], { type: "application/vnd.ms-excel" });
                    var objectUrl = URL.createObjectURL(blob);
                    var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href", objectUrl);
                    $("body").append(aForExcel);
                    $(".forExcel").click();
                    aForExcel.remove();
                });
            }

        }
    }
}]);