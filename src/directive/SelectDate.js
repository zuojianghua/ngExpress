myDirective.directive("selectDate", function () {
    return {
        restrict: 'E',
        scope: {
            inputValue: '=',    //输入框中的日期
            inputTitle: '@',    //弹框的标题
            inputReadonly: '=', //只读开关:true只读, false可编辑
            inputFormat: '@'    //输入的日期格式
        },
        templateUrl: 'html/directive/selectdate/DirectiveSelectDate.html',
        controller: ['$scope', '$element', 'ngDialog', function ($scope, $element, ngDialog) {            
            //日历控件点击事件
            $scope.alertOnEventClick = function (date, jsEvent, view) {
                //console.log(date.format());
                $scope.inputValue = date.format();
                ngDialog.close(open_select_window_id);
            }
            //日历设置
            $scope.eventSources = [];
            $scope.uiConfig = {
                calendar: {
                    height: 520,
                    editable: true,
                    header: {
                        left: 'title',
                        center: '',
                        right: 'today prevYear,prev,next,nextYear'
                    },
                    dayClick: $scope.alertOnEventClick,
                    //eventDrop: $scope.alertOnDrop,
                    //eventResize: $scope.alertOnResize,
                    //eventRender: $scope.eventRender,
                    dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                    dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    buttonText: { today: '今日', month: '月', week: '周', day: '日' },
                    nowIndicator: true,
                    eventBackgroundColor: '#378006'
                }
            };

            //打开日历选择器窗口
            var open_select_window_id = 0;
            $scope.open_select_window = function () {
                if($scope.inputReadonly){
                    return;
                }

                if ($scope.inputValue != undefined && $scope.inputValue != '' && $scope.inputValue!='0000-00-00 00:00:00' && $scope.inputValue!='0000-00-00') {
                    $scope.uiConfig.calendar.defaultDate = $scope.inputValue;
                    $scope.uiConfig.calendar.events = [{
                        'title': '已选',
                        'start': $scope.inputValue,
                        'allDay': true
                    }];
                }

                open_select_window_id = ngDialog.open({
                    overlay: true,
                    disableAnimation: '',
                    showClose: true,
                    width: 500,
                    height: '',
                    template: 'html/directive/selectdate/DirectiveSelectDateWindow.html',
                    scope: $scope
                });
            }
        }]
    }
});