<?php
header('Content-type: text/plain; charset=utf-8');
/**
 * 此文件定义公共函数
 * 在其他文件中引入即可
 */

/**
 * 完整的生成标准 UUID(GUID) 方法
 * @return string
 */
function guid()
{
    if (function_exists('com_create_guid')) {
        return com_create_guid();
    } else {
        mt_srand((double)microtime() * 10000);
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45); // '-'
        $uuid = chr(123) // '{'
            . substr($charid, 0, 8) . $hyphen
            . substr($charid, 8, 4) . $hyphen
            . substr($charid, 12, 4) . $hyphen
            . substr($charid, 16, 4) . $hyphen
            . substr($charid, 20, 12)
            . chr(125); // '}'
        return $uuid;
    }
}

/**
 * 生成8位随机字符
 * @return bool|string
 */
function simpleGuid()
{
    mt_srand((double)microtime() * 10000);
    $charid = strtoupper(md5(uniqid(rand(), true)));
    $uuid = substr($charid, 0, 8);
    return $uuid;
}

/**
 * 保存文件
 * @param $folder
 * @param $dir
 * @param $folderName
 * @return int
 */
function saveFolder($folder, $dir, $folderName)
{
    if ($folder) {
        if ($folder['error'] > 0) {
            return 500;
        } else {
            if (move_uploaded_file($folder['tmp_name'], $dir . '/' . $folderName)) {
                return 200;
            } else {
                return 501;
            }
        }
    } else {
        return 505; // 这个文件未上传
    }
}

/**
 * 查询分类文件夹名称
 * @param $className
 * @return mixed
 */
function serFolderName($className)
{
    $hash = [];
    $hash['热点分析'] = 'DZYS001';
    $hash['品牌监测'] = 'DZYS002';
    $hash['突发词发现'] = 'DZYS003';
    $hash['技术趋势分析'] = 'DZYS004';
    $hash['主题趋势分析'] = 'DZYS005';
    $hash['机构地区分析'] = 'DZYS006';
    $hash['机构影响力分析'] = 'DZYS007';
    $hash['作者影响力分析'] = 'DZYS008';
    $hash['机构涉及领域分析'] = 'DZYS009';
    $hash['专家涉及领域分析'] = 'DZYS010';
    $hash['专家论文专利量化分析'] = 'DZYS011';
    $hash['机构论文专利量化分析'] = 'DZYS012';
    $hash['关键技术发展水平评估'] = 'DZYS013';
    return $hash[$className];
}















