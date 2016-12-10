<!--
 * {{$title}}模板
 * @date {{$date}}
 * create by angular.php {{$version}}
 * 模板变量
 * $date    生成日期
 * $version 生成版本号
 * $str_field 表单区域
 -->

<div class="panel_title_wrap" ng-include="'html/component/ComponentTitle.html'"></div>

<!--搜索区域-->
<div class="panel_cont">
	<ul class="search_terms">
		<li>
            <label class="name">顾客代码</label>
            <input type="text" class="form-control" placeholder="系统自动生成" readonly />
        </li>

        {{$str_field}}
	</ul>

	<div class="btn_wrap">
        <button class="button emphasize" ng-click="form_save();">保存</button>
        <button class="button" ng-click="form_cancel();">取消</button>
    </div>
</div>