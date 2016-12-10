<?php 
/**
 * 检查控制器文件和API演示数据文件是否存在
 * 
 */
$data = $_POST['data'];

$return = array();
foreach($data as $api){
    $file = $path = explode('/',$api[1]);
    //文件路径
    array_pop($path);
    //文件名
    $file = array_map('ucfirst', $file);
    $file = explode('_',implode('',$file));
    $file = array_map('ucfirst', $file);
    $file = implode('',$file);
    $js_file = 'controller/'.implode('/',$path).'/'.$file.'Ctrl.js';
    $api_file = '../api_demo/'.$api[2].'.json';

    $return[] = array(
        'title' => $api[0],
        'ctrl' => $api[1],
        'api' => $api[2],
        'ctrl_status' => file_exists($js_file),
        'api_status' => file_exists($api_file),
    );
}
echo json_encode($return);