angular.module('myConfig', []).factory('myConfigSys', function () {
    return {
        "can_speak": false, //允许语音提示
        "fake_api": true,   //使用demo的api返回数据替换真实api
        "api_path": "",     //API访问路径
        "api_log": "none",  //none:不记录任何日志; debug:记录每次api请求的日志; error:仅记录错误返回的api日志
        "dump_mode": true,  //在当前页面弹框展示当前rootScope和scope的变量
        "app_path": "src",  //应用存放的路径前缀: 开发中使用src, 压缩混淆后使用build或服务器上具体存放路径，相对于index.html
        "has_fav": false    //是否拥有菜单收藏功能
    }
}).factory('myConfigUI', function () {
    return {
        //拾色器界面默认配置
        //https://github.com/ruhley/angular-color-picker
        color_picker_options: {
            'format': 'hex',
            'alpha': false,
            'close': {'show': false,'label': '关闭','class': ''},
            'clear': {'show': false,'label': '清除','class': ''},
            'reset': {'show': false,'label': '重置','class': ''}
        },
        //可视化编辑器界面默认配置
        //https://github.com/fraywing/textAngular/wiki
        ta_toolbar_options:[
            ['h1', 'h2', 'h3', 'p', 'bold', 'italics', 'strikeThrough', 'ul', 'ol'],
            ['indent', 'outdent', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['insertImage', 'insertLink', 'insertVideo'],
            ['undo', 'redo', 'clear', 'html','charcount']
        ]
    }
});