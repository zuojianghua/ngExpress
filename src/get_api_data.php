<?php 
/**
 * 获取API接口数据并写入到api_demo目录，作为样例数据
 * 
 */
//$url = 'http://192.168.148.75:9013/manage/web/?app_act=';
$url = 'http://192.168.158.92/crm_lite/manage/web/index.php?app_act=';
$data = $_POST['data'];
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
//echo file_get_contents('http://192.168.148.75:9013/manage/web/?app_act=base/color/get_list');
$return = array();
foreach($data as $api){
    $files_info = pathinfo($api[2].'.json');
    //创建目录
    mkDirs('api_demo/'.$files_info['dirname']);
    //请求接口数据
    $result = file_get_contents($url.$api[2]);
    //如果返回json字符串
    if(json_decode($result)!=NULL){
        //写入到文件
        file_put_contents('api_demo/'.$api[2].'.json',$result);
        $return[$api[2]] = true;
    }else{
        $return[$api[2]] = false;
    };
}
echo json_encode($return);