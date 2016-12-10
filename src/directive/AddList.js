myDirective.directive("addList", function () {
    return {
        restrict: 'E',
        scope: {
            inputName: '=',     //��������������ʾ��ֵ
            inputShow: '=',     //�Ƿ���ʾ
            inputSelect: '=',   //ѡ�����е�����Դ
            inputTitle: '@',    //�����ı���
            inputTpl: '@',       //������ģ��
            inputFmt: '@',        //�������еĸ�ʽ 0ΪӢ�İ��Ƕ��ŷָ����ַ���, 1Ϊjson��ʽ����, Ĭ��0
            inputChange: '=',    //����ѡ�к����¼�
            inputClear: '='       //������������
        },
        templateUrl: 'html/directive/addlist/DirectiveAddList.html',
        controller: ['$scope', '$element', 'ngDialog', 'myServiceUtil', 'api', function ($scope, $element, ngDialog, myServiceUtil, api) {
            //���ڸ�ѡ����ģ��
            $scope.checkbox_value = {};
            //������ʾ����������code��name��ʱ����
            $scope.check_code_arr = [];
            $scope.check_name_arr = [];
            $scope.check_name_obj = [];

            //����ѡ��ֵ�������е���ȷ�����Ļص�
            $scope.set_value = function () {
                console.log($scope.check_name_obj);
                ngDialog.close(open_add_window_id);

                //ѡ��ȷ���Ժ��Ļص�����
                if(typeof $scope.inputChange == 'function'){
                    var v = $scope.check_name_obj;
                    //console.log(v);
                    $scope.inputChange(v);
                }
                //������������
                $scope.checkbox_value = {};
                $scope.check_code_arr = [];
                $scope.check_name_arr = [];
                $scope.check_name_obj = [];
            }

            //��ѡ����������
            $scope.update_check = function (li) {
                console.log(li);
                //console.log($scope.checkbox_value);
                if ($scope.checkbox_value[li.code] == true) {
                    var new_li = {};
                    new_li.form_code = li.code;
                    new_li.form_name = li.name;
                    new_li.form_id = li.id;
                    //ѡ�У�����ֵpush����ʱ����
                    $scope.check_code_arr.push(li.code);
                    $scope.check_name_arr.push(li.name);
                    $scope.check_name_obj.push(new_li);
                    //console.log($scope.check_name_obj);
                } else {
                    //ȡ��ѡ��
                    if (-1 != $scope.check_code_arr.indexOf(li.code)) {
                        $scope.check_code_arr.splice($scope.check_code_arr.indexOf(li.code), 1);
                    }
                    if (-1 != $scope.check_name_arr.indexOf(li.name)) {
                        $scope.check_name_arr.splice($scope.check_name_arr.indexOf(li.name), 1);
                    }
                }
            }

            //����ѡ��ֵ
            $scope.clear_input_data = function () {
                $scope.inputValue = [];
                $scope.inputName = '';
                $scope.check_code_arr = [];
                $scope.check_name_arr = [];
                $scope.checkbox_value = {};
                if(typeof $scope.inputClear == 'function'){
                    $scope.inputClear();
                }
            }
            //ȫѡ������ҳ��ѡ�򶼼��뵽$scope.checkbox_value
            $scope.check_all = function () {
                $scope.list_data.forEach(function (o) {
                    $scope.checkbox_value[o.code] = true;
                    if (-1 == $scope.check_code_arr.indexOf(o.code)) {
                        $scope.check_code_arr.push(o.code);
                    }
                    if (-1 == $scope.check_name_arr.indexOf(o.name)) {
                        $scope.check_name_arr.push(o.name);
                    }

                });
            }
            //ȡ��ȫѡ
            $scope.check_cancel_all = function () {
                $scope.list_data.forEach(function (o) {
                    $scope.checkbox_value = {};
                    $scope.check_code_arr = [];
                    $scope.check_name_arr = [];

                });
            }

            //ҳ����ѯ���б����� -------------------------------------------------------
            $scope.search_data = {};
            $scope.page_data = {};
            $scope.list_data = [];

            //���в�ѯ
            $scope.form_search = function () {
                $scope.inputSelect({ search_data: $scope.search_data, page_data: $scope.page_data }).then(function (ret) {
                    $scope.list_data = ret.data;
                    $scope.page_data = ret.page_data;
                    //$scope.search_data = ret.search_data;
                });
            }

            //�򿪲�ѯҳ��
            var open_add_window_id = 0;
            $scope.open_select_window = function () {
                //�ӽ����д��뷽������ѯ����
                $scope.form_search();
                open_add_window_id = ngDialog.open({
                    overlay: true,
                    disableAnimation: true,
                    showClose: true,
                    width: 500,
                    template: 'html/directive/addlist/DirectiveAddListWindow.html',
                    scope: $scope
                });
            }

        }]
    }
});