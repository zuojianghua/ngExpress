<?php
/**
 * 代码自动生成
 * @version 1.0
 * @author jhua.zuo
 * @date 2016-09-08
 */
$version = '1.0';
$date = date('Y-m-d');
#############
//递归创建目录
function mkDirs($dir){
    if(!is_dir($dir)){
        if(!mkDirs(dirname($dir))){
            return false;
        }
        if(!mkdir($dir,0777)){
            return false;
        }
    }
    return true;
}
//orders字段排序
function sort_by_orders($a, $b){
    if ($a['orders'] == $b['orders']) {
        return 0;
    }
    return ($a['orders'] < $b['orders']) ? -1 : 1;
}

//生成js控制器文件
function js_page($page_data){
    global $version,$date;

    $js_files = $page_data['ctrl_path'];
    if(file_exists($js_files)){
        return array(false,'文件已经存在');
    }

    $js_files_info = pathinfo($js_files);
    mkDirs($js_files_info['dirname']);
    //1 列表页
    if($page_data['ctrl_type']=='list'){
        $source = file_get_contents('src/controller/demo/DemoListCtrl.js.tpl');
        $output = str_replace(
            array('{{$date}}','{{$version}}','{{$class_name}}','{{$title}}','{{$router}}','{{$api}}'),
            array($date,$version,$js_files_info['filename'],$page_data['ctrl_title'],$page_data['ctrl_name'],$page_data['ctrl_api']),$source);
        file_put_contents($page_data['ctrl_path'],$output);
        return array(true);
    }

    //2 新增页
    if($page_data['ctrl_type']=='add'){
        $source = file_get_contents('src/controller/demo/DemoAddCtrl.js.tpl');
        $valid = '';
        foreach($page_data['form_fields'] as $form_field){
            if($form_field['orders']==''){
                continue;
            }
            if($form_field['req']=='true'){
                $valid = $valid . "{ 'key': '" . $form_field['keyword'] . "', 'valid': 'check_required', 'data': " . '$scope.data.form_data.' . $form_field['keyword'] . ", 'tip': '必填项' },";
            }
            if($form_field['valid']!=''){
                $valid = $valid . "{ 'key': '" . $form_field['keyword'] . "', 'valid': '" . $form_field['valid'] . "', 'data': " . '$scope.data.form_data.' . $form_field['keyword'] . ", 'tip': '' },";
            }
        }
        $valid = substr($valid,0,-1);
        $output = str_replace(
            array('{{$date}}','{{$version}}','{{$class_name}}','{{$title}}','{{$router}}','{{$api}}','{{$valid}}'),
            array($date,$version,$js_files_info['filename'],$page_data['ctrl_title'],$page_data['ctrl_name'],$page_data['ctrl_api'],$valid),$source);
        file_put_contents($page_data['ctrl_path'],$output);
        return array(true);
    }


}
//生成html模板文件
function html_page($page_data){
    global $version,$date;
    $html_files = $page_data['html_path'];
    if(file_exists($html_files)){
        return array(false,'文件已经存在');
    }
    $html_files_info = pathinfo($html_files);
    mkDirs($html_files_info['dirname']);

    //1 列表页
    if($page_data['ctrl_type']=='list'){
        $source = file_get_contents('src/html/demo/DemoList.html.tpl');
        //查询区域
        $search_field = '';
        usort($page_data['search_fields'],'sort_by_orders');
        foreach($page_data['search_fields'] as $search){
            
            if($search['orders']==''){
                continue;
            }

            if($search['status']=='keyword'){
                continue;
            }

            if($search['hide']=='true'){
                $hide = 'ng-show="data.search_field_more"';
            }else{
                $hide = '';
            }

            switch($search['type']){
                case 'text':
                    $search_field .= '<li '.$hide.'>
                        <label class="name">'.$search['label'].'</label>
                        <input type="text" class="form-control" placeholder="'.$search['label'].'" ng-model="data.search_data.'.$search['keyword'].'" />
                    </li>';
                    break;
                case 'select':
                    $search_field .= '<li '.$hide.'>
                        <label class="name">'.$search['label'].'</label>
                        <select ng-model="data.search_data.'.$search['keyword'].'" >
                            <option value="">请选择</option>
                            <option ng-repeat="(x,y) in search_data_option.'.$search['extend'].'" value="{{x}}">{{y}}</option>
                        </select>
                    </li>';
                    break;
                case 'selectSimple':
                    $search_field .= '<li '.$hide.'>
                        <label class="name">'.$search['label'].'</label>
                        <select-simple class="select_single" input-value="data.search_data.'.$search['keyword'].'" input-select="'.$search['extend'].'"></select-simple>
                    </li>';
                    break;
                case 'selectSingle':
                    $search_field .= '<li '.$hide.'>
                        <label class="name">'.$search['label'].'</label>
                        <select-single class="select_single" input-value="data.search_data.'.$search['keyword'].'" input-name="data.search_data.'.$search['keyword'].'_name" input-select="'.$search['extend'].'" input-title="请选择'.$search['label'].'" input-placeholder="请选择'.$search['label'].'"></select-single>
                    </li>';
                    break;
                case 'selectMulti':
                    $search_field .= '<li '.$hide.'>
                        <label class="name">'.$search['label'].'</label>
                        <select-multi class="select_single" input-value="data.search_data.'.$search['keyword'].'" input-name="data.search_data.'.$search['keyword'].'_name" input-select="'.$search['extend'].'" input-title="请选择'.$search['label'].'" input-placeholder="请选择'.$search['label'].'"></select-multi>
                    </li>';
                    break;
                case 'selectDate':
                    $search_field .= '<li '.$hide.'>
                        <label class="name">'.$search['label'].'</label>
                        <select-date class="select_single" input-title="" input-value="data.form_data.'.$search['keyword'].'"></select-date>
                    </li>';
                    break;
                case 'selectDateDouble':
                    $search_field .= '<li class="inc_2_input" '.$hide.'>
                        <label class="name">'.$search['label'].'</label>
                        <select-date class="select_single" input-title="" input-value="data.form_data.'.$search['keyword'].'_start"></select-date>
                        <select-date class="select_single" input-title="" input-value="data.form_data.'.$search['keyword'].'_end"></select-date>
                    </li>';
                    break;
            }
        }

        //表格部分
        $thead_field = '';
        $tbody_field = '';

         
        usort($page_data['table_fields'],'sort_by_orders');

        foreach($page_data['table_fields'] as $table){
            if($table['orders']==''){
                continue;
            }
            //表头区域
            if($table['hide']=='true'){
                $hide = 'ng-show="data.field_set.'.$table['keyword'].'"';
            }else{
                $hide = '';
            }
            $thead_field .= '<th '.$hide.'>'.$table['label'].'</th>';
            //表格区域
            $tbody_field .= '<td '.$hide.'>{{td.'.$table['keyword'].'}}</td>';
        }

        $output = str_replace(
            array('{{$date}}','{{$version}}','{{$title}}','{{$search_field}}','{{$thead_field}}','{{$tbody_field}}'),
            array($date,$version,$page_data['ctrl_title'],$search_field,$thead_field,$tbody_field),$source);
        file_put_contents($page_data['html_path'],$output);
        return array(true);
    }



    //2 新增页
    if($page_data['ctrl_type']=='add'){
        $source = file_get_contents('src/html/demo/DemoAdd.html.tpl');
        //查询区域
        $str_field = '';
        usort($page_data['form_fields'],'sort_by_orders');
        foreach($page_data['form_fields'] as $form_field){
            if($form_field['orders']==''){
                continue;
            }

            $valid_em = '';
            $valid_span = '';
            if($form_field['req']=='true'){
                $valid_em = '<em>*</em>';
                $valid_span = '<span class="glyphicon" title="{{valid.'.$form_field['keyword'].'_tip}}" alt="{{valid.'.$form_field['keyword'].'_tip}}" ng-class="valid.'.$form_field['keyword'].'_ico" ></span>';
            }
            if($form_field['valid']!=''){
                $valid_span = '<span class="glyphicon" title="{{valid.'.$form_field['keyword'].'_tip}}" alt="{{valid.'.$form_field['keyword'].'_tip}}" ng-class="valid.'.$form_field['keyword'].'_ico" ></span>';
            }

            switch($form_field['type']){
                case 'text':
                    $str_field .= '<li>
                        <label class="name">'.$form_field['label'].$valid_em.'</label>
                        <input type="text" class="form-control" ng-class="valid.'.$form_field['keyword'].'" ng-model="data.form_data.'.$form_field['keyword'].'" />'.$valid_span.'
                    </li>';
                    break;
                case 'select':
                    $str_field .= '<li>
                        <label class="name">'.$form_field['label'].$valid_em.'</label>
                        <select ng-model="data.form_data.'.$form_field['keyword'].'" >
                            <option value="">请选择</option>
                            <option ng-repeat="(x,y) in search_data_option.'.$form_field['keyword'].'_options" value="{{x}}">{{y}}</option>
                        </select>'.$valid_span.'
                    </li>';
                    break;
                case 'selectSimple':
                    $str_field .= '<li>
                        <label class="name">'.$form_field['label'].$valid_em.'</label>
                        <select-simple class="select_single" input-value="data.form_data.'.$form_field['keyword'].'" input-select="'.$form_field['extend'].'"></select-simple>'.$valid_span.'
                    </li>';
                    break;
                case 'selectSingle':
                    $str_field .= '<li>
                        <label class="name">'.$form_field['label'].$valid_em.'</label>
                        <select-single class="select_single" input-value="data.form_data.'.$form_field['keyword'].'" input-name="data.search_data.'.$form_field['keyword'].'_name" input-select="'.$form_field['extend'].'" input-title="请选择'.$form_field['label'].'" input-placeholder="请选择'.$form_field['label'].'"></select-single>'.$valid_span.'
                    </li>';
                    break;
                case 'selectMulti':
                    $str_field .= '<li>
                        <label class="name">'.$form_field['label'].$valid_em.'</label>
                        <select-multi class="select_single" input-value="data.form_data.'.$form_field['keyword'].'" input-name="data.search_data.'.$form_field['keyword'].'_name" input-select="'.$form_field['extend'].'" input-title="请选择'.$form_field['label'].'" input-placeholder="请选择'.$form_field['label'].'"></select-multi>'.$valid_span.'
                    </li>';
                    break;
                case 'selectDate':
                    $str_field .= '<li>
                        <label class="name">'.$form_field['label'].$valid_em.'</label>
                        <select-date class="select_single" input-title="" input-value="data.form_data.'.$form_field['keyword'].'"></select-date>'.$valid_span.'
                    </li>';
                    break;
                case 'selectDateDouble':
                    $str_field .= '<li class="inc_2_input">
                        <label class="name">'.$form_field['label'].$valid_em.'</label>
                        <select-date class="select_single" input-title="" input-value="data.form_data.'.$form_field['keyword'].'_start"></select-date>
                        <select-date class="select_single" input-title="" input-value="data.form_data.'.$form_field['keyword'].'_end"></select-date>
                    </li>';
                    break;
            }
        }

        $output = str_replace(
            array('{{$date}}','{{$version}}','{{$title}}','{{$str_field}}'),
            array($date,$version,$page_data['ctrl_title'],$str_field),$source);
        file_put_contents($page_data['html_path'],$output);
        return array(true);
    }

}

#############

$data = $_POST;
//var_dump($data);die();
$return = array();
foreach($data['ctrl_array'] as $key => $page_data){
    //生成js
    $return[$page_data['ctrl_title']]['js'] = js_page($page_data);
    //生成html
    $return[$page_data['ctrl_title']]['html'] = html_page($page_data);
}
echo json_encode($return);