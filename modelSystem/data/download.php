<?php
header('Content-type: text/plain; charset=utf-8');

$folder = iconv("UTF-8", "GBK", $_REQUEST['folder']);
$version = iconv("UTF-8", "GBK", $_REQUEST['ver']);
$fileName = $_REQUEST['fileName'];
$gbk_fileName = iconv("UTF-8", "GBK", $fileName);

$file = 'upload/' . $folder . '/' . $version . '/' . $gbk_fileName;

if (file_exists($file)) {
    header('Content-length: ' . filesize($file));
    header('Content-Type: application/force-download');
    header('Content-Disposition: attachment; filename=' . basename($fileName));
//    header('Content-Disposition: attachment; filename=' . basename($fileName . '.txt'));
    readfile($file);
} else {
    echo '{"msg": "文件未找到！"}';
}