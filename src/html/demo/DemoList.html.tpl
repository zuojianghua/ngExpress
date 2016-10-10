<!--
 * {{$title}}模板
 * @date {{$date}}
 * create by angular.php {{$version}}
 * 模板变量
 * $date    生成日期
 * $version 生成版本号
 * $search_field 查询区域
 * $thead_field  表头区域
 * $tbody_field  表格区域
 -->

<div class="panel_title_wrap" ng-include="'src/html/component/ComponentTitle.html'"></div>

<!--搜索区域-->
<div class="panel_cont">
    <ul class="search_terms">
        {{$search_field}}
    </ul>
    <div class="btn_wrap">
        <button class="button emphasize" ng-click="form_search();">搜索</button>
        <button class="button" ng-click="form_clear();">清空</button>
    </div>
</div>

<!--列表区域-->
<div class="result_wrap">
    <table class="result_table">
        <thead>
            <tr>
                {{$thead_field}}
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr ng-repeat="td in data.list_data track by $index">
                {{$tbody_field}}
                <td>
                    <button ng-click="goto('/to/your/path/'+td.id);">按钮</button>
                    <button ng-click="goto('/to/your/path/'+td.id);">按钮</button>
                    <button ng-click="goto('/to/your/path/'+td.id);">按钮</button>
                    <button ng-click="goto('/to/your/path/'+td.id);">按钮</button>
                </td>
            </tr>
        </tbody>
    </table>   
    <pager page-data="data.page_data"  page-func="form_search"></pager>
</div>