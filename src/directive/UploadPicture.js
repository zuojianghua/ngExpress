myDirective.directive("uploadPicture", function () {
    return {
        restrict: 'E',
        scope: {
            inputValue: '=',        //输入框中的值, 要保存到数据库的上传后的图片路径
            inputName: '=',         //输入框中用于显示的值
            inputReadonly: '=',     //是否只读，是否允许修改
            inputChange: '=',       //最终选中后的事件，如果需要联动给其他组件
            inputPath: '@'          //上传的子目录, 如不填写则上传到base目录
        },
        templateUrl: 'html/directive/uploadpicture/DirectiveUploadPicture.html',
        controller: ['$scope', '$element', 'ngDialog', 'api', 'Upload', function ($scope, $element, ngDialog, api, Upload) {
            //false为未选择图片状态：可以选择图片，可以查看已有图片
            //true为选择了本地图片状态：可以点击上传按钮
            $scope.switch = false;
            //用于重置
            var old_url = $scope.inputValue;
            var old_name = $scope.inputName;
            
            //默认上传到base子目录
            if(typeof $scope.inputPath == 'undefined' || $scope.inputPath == ''){
                $scope.inputPath = 'base';
            }

            //选择文件
            $scope.file_select = function (file) {
                if ($scope.inputReadonly) {
                    return;
                }

                if (file != undefined) {
                    $scope.switch = true;
                    $scope.inputTempfile = file;
                    $scope.inputName = file.name;
//                  console.log($scope.inputTempfile);
                }

            }

            //上传临时文件
            $scope.upload_file = function () {
                if ($scope.inputReadonly) {
                    return;
                }
                var url = api.get_api_url('common/fileupload/picture');
                //TODO: 上传文件时，需要session校验
                Upload.upload({
                    url: url,
                    data: { file: $scope.inputTempfile, 'sid': 'sid', path: $scope.inputPath }
                }).then(function (resp) {
                    $scope.switch = false;
                    //上传成功后，修改inputValue
                    //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                    if (resp.data.status) {
                        //alert("上传成功!");
                        $scope.inputValue = resp.data.data.url;
                        $scope.inputName = resp.data.data.name;
                        $scope.preview_pic();
                    } else {
                        alert(resp.data.message);
                    }
                }, function (resp) {
                    $scope.switch = false;
                    //上传失败
                    //console.log('Error status: ' + resp.status);
                    alert('上传失败!' + resp.status);
                }, function (evt) {
                    //上传百分比
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.inputName = progressPercentage + '%';
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }

            //打开预览页面
            var preview_pic_id = 0;
            $scope.preview_pic = function () {
                if (!$scope.inputValue || $scope.inputValue == '') {
                    alert('暂无图片');
                    return false;
                }
                preview_pic_id = ngDialog.open({
                    overlay: true,
                    disableAnimation: true,
                    showClose: true,
                    width: 340,
                    template: 'html/directive/uploadpicture/DirectiveUploadPicturePreview.html',
                    scope: $scope
                });
            }

            //还原原始值
            $scope.refresh_input_data = function () {
                $scope.switch = false;
                $scope.inputValue = old_url;
                $scope.inputName = old_name;
            }

            //清空输入框的值
            $scope.clear_input_data = function () {
                $scope.switch = false;
                $scope.inputValue = '';
                $scope.inputName = '';
            }
        }]
    }
});