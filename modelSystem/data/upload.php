<?php
header('Content-type: text/plain; charset=utf-8');

require_once 'common.func.php';

@$jar = $_FILES['jar'];
@$data = $_FILES['data'];
@$command = $_FILES['command'];
@$modelD = $_FILES['modelD'];
@$modelE = $_FILES['modelE'];
@$modelF = $_FILES['modelF'];

$n_jar = $_REQUEST['n_jar'];
$n_data = $_REQUEST['n_data'];
$n_command = $_REQUEST['n_command'];
$n_modelD = $_REQUEST['n_modelD'];
$n_modelE = $_REQUEST['n_modelE'];
$n_modelF = $_REQUEST['n_modelF'];

$nJar = iconv("UTF-8", "GBK", $n_jar);
$nData = iconv("UTF-8", "GBK", $n_data);
$nCommand = iconv("UTF-8", "GBK", $n_command);
$nModelD = iconv("UTF-8", "GBK", $n_modelD);
$nModelE = iconv("UTF-8", "GBK", $n_modelE);
$nModelF = iconv("UTF-8", "GBK", $n_modelF);

$sJar = $_REQUEST['s_jar'];
$sData = $_REQUEST['s_data'];
$sCommand = $_REQUEST['s_command'];
$sModelD = $_REQUEST['s_modelD'];
$sModelE = $_REQUEST['s_modelE'];
$sModelF = $_REQUEST['s_modelF'];

$modelClass = $_REQUEST['modelClass'];
$modelName = $_REQUEST['modelName'];
$modelVersion = $_REQUEST['modelVersion'];
$modelDetail = $_REQUEST['modelDetail'];

$gbk_ver = iconv("UTF-8", "GBK", $modelVersion);

$isNew = $_REQUEST['isNew']; // 判断新建 or 修改 (false-不新建；true-新建)
$folderName = $_REQUEST['folderName']; // 文件夹名(新建时为空)

$status = 0;

$path = 'upload/'; // 根目录

if ($isNew === 'true' && !$folderName && $jar && $data && $command && $modelD && $modelE && $modelF && $modelClass) { // 新建
//    $dir = simpleGuid();
    $dir = serFolderName($modelClass);

    if (file_exists($path . $dir)) {

        // 分类文件夹存在

        if (file_exists($path . $dir . '/' . $gbk_ver)) {

            // 版本文件夹出现重复-抛出错误

            echo json_encode([
                'status' => 508 // 版本文件夹名出现重复，请检查后台文件目录（可能人为新建）
            ]);

            die();

        } else {

            // 版本文件夹未重复

            mkdir($path . $dir . '/' . $gbk_ver, 0777, true);
            $statusJar = saveFolder($jar, $path . $dir . '/' . $gbk_ver . '/', $nJar);
            $statusData = saveFolder($data, $path . $dir . '/' . $gbk_ver . '/', $nData);
            $statusCommand = saveFolder($command, $path . $dir . '/' . $gbk_ver . '/', $nCommand);
            $statusModelD = saveFolder($modelD, $path . $dir . '/' . $gbk_ver . '/', $nModelD);
            $statusModelE = saveFolder($modelE, $path . $dir . '/' . $gbk_ver . '/', $nModelE);
            $statusModelF = saveFolder($modelF, $path . $dir . '/' . $gbk_ver . '/', $nModelF);

            if ($statusJar === 200 && $statusData === 200 && $statusCommand === 200 && $statusModelD === 200 && $statusModelE === 200 && $statusModelF === 200) {

                clearstatcache();

                echo json_encode([
                    'status' => 200,
                    'folder' => $dir,
                    'jar' => $n_jar,
                    'data' => $n_data,
                    'type' => $modelClass,
                    'name' => $modelName,
                    'ver' => $modelVersion,
                    'comment' => $modelDetail,
                    'command' => $n_command,
                    'source' => $n_modelD,
                    'IF_file' => $n_modelE,
                    'tech_file' => $n_modelF,
                    'sJar' => filesize($path . $dir . '/' . $gbk_ver . '/' . $nJar),
                    'sData' => filesize($path . $dir . '/' . $gbk_ver . '/' . $nData),
                    'sCommand' => filesize($path . $dir . '/' . $gbk_ver . '/' . $nCommand),
                    'sModelD' => filesize($path . $dir . '/' . $gbk_ver . '/' . $nModelD),
                    'sModelE' => filesize($path . $dir . '/' . $gbk_ver . '/' . $nModelE),
                    'sModelF' => filesize($path . $dir . '/' . $gbk_ver . '/' . $nModelF)
                ]);

                clearstatcache();

            } else {

                echo json_encode([
                    '$status' => 503, // 某个文件保存失败
                    'statusJar' => $statusJar,
                    'statusData' => $statusData,
                    'statusCommand' => $statusCommand,
                    'isNew' => $isNew,
                    'gbk_ver' => $gbk_ver
                ]);
            }

        }
    } else {

        // 分类文件夹不存在

        mkdir($path . $dir, 0777, true);
        mkdir($path . $dir . '/' . $gbk_ver, 0777, true);
        $statusJar = saveFolder($jar, $path . $dir . '/' . $gbk_ver . '/', $nJar);
        $statusData = saveFolder($data, $path . $dir . '/' . $gbk_ver . '/', $nData);
        $statusCommand = saveFolder($command, $path . $dir . '/' . $gbk_ver . '/', $nCommand);
        $statusModelD = saveFolder($modelD, $path . $dir . '/' . $gbk_ver . '/', $nModelD);
        $statusModelE = saveFolder($modelE, $path . $dir . '/' . $gbk_ver . '/', $nModelE);
        $statusModelF = saveFolder($modelF, $path . $dir . '/' . $gbk_ver . '/', $nModelF);

        if ($statusJar === 200 && $statusData === 200 && $statusCommand === 200 && $statusModelD === 200 && $statusModelE === 200 && $statusModelF === 200) {

            clearstatcache();

            echo json_encode([
                'status' => 200,
                'folder' => $dir,
                'jar' => $n_jar,
                'data' => $n_data,
                'type' => $modelClass,
                'name' => $modelName,
                'ver' => $modelVersion,
                'comment' => $modelDetail,
                'command' => $n_command,
                'source' => $n_modelD,
                'IF_file' => $n_modelE,
                'tech_file' => $n_modelF,
                'sJar' => filesize($path . $dir . '/' . $gbk_ver . '/' . $nJar),
                'sData' => filesize($path . $dir . '/' . $gbk_ver . '/' . $nData),
                'sCommand' => filesize($path . $dir . '/' . $gbk_ver . '/' . $nCommand),
                'sModelD' => filesize($path . $dir . '/' . $gbk_ver . '/' . $nModelD),
                'sModelE' => filesize($path . $dir . '/' . $gbk_ver . '/' . $nModelE),
                'sModelF' => filesize($path . $dir . '/' . $gbk_ver . '/' . $nModelF)
            ]);

            clearstatcache();

        } else {

            echo json_encode([
                '$status' => 503, // 某个文件保存失败
                'statusJar' => $statusJar,
                'statusData' => $statusData,
                'statusCommand' => $statusCommand,
                'isNew' => $isNew,
                'gbk_ver' => $gbk_ver
            ]);

        }
    }

} elseif ($isNew === 'false' && $folderName) { // 不新建

    if (!file_exists($path . $folderName)) {

        echo json_encode([
            'status' => 507 // 不新建且不存在这个文件夹，终止，请检查后台文件目录（可能人为删除）
        ]);

        die();

    } else {

        $statusJar = saveFolder($jar, $path . $folderName . '/', $nJar);
        $statusData = saveFolder($data, $path . $folderName . '/', $nData);
        $statusCommand = saveFolder($command, $path . $folderName . '/', $nCommand);
        $statusModelD = saveFolder($modelD, $path . $folderName . '/' . $gbk_ver . '/', $nModelD);
        $statusModelE = saveFolder($modelE, $path . $folderName . '/' . $gbk_ver . '/', $nModelE);
        $statusModelF = saveFolder($modelF, $path . $folderName . '/' . $gbk_ver . '/', $nModelF);

        if ($statusJar === 200 || $statusData === 200 || $statusCommand === 200 || $statusModelD === 200 || $statusModelE === 200 || $statusModelF === 200 || $modelDetail) {

            clearstatcache();

            echo json_encode([
                'status' => 200,
                'folder' => $folderName,
                'jar' => $n_jar,
                'data' => $n_data,
                'type' => $modelClass,
                'name' => $modelName,
                'ver' => $modelVersion,
                'comment' => $modelDetail,
                'command' => $n_command,
                'source' => $n_modelD,
                'IF_file' => $n_modelE,
                'tech_file' => $n_modelF,
                'sJar' => $jar ? filesize($path . $folderName . '/' . $nJar) : '',
                'sData' => $data ? filesize($path . $folderName . '/' . $nData) : '',
                'sCommand' => $command ? filesize($path . $folderName . '/' . $gbk_ver . '/' . $nCommand) : '',
                'sModelD' => $modelD ? filesize($path . $folderName . '/' . $gbk_ver . '/' . $nModelD) : '',
                'sModelE' => $modelE ? filesize($path . $folderName . '/' . $gbk_ver . '/' . $nModelE) : '',
                'sModelF' => $modelF ? filesize($path . $folderName . '/' . $gbk_ver . '/' . $nModelF) : ''
            ]);

            clearstatcache();

        } else {

            echo json_encode([
                '$status' => 503, // 某个文件保存失败
                'statusJar' => $statusJar,
                'statusData' => $statusData,
                'statusCommand' => $statusCommand,
                '$statusModelD' => $statusModelD,
                '$statusModelE' => $statusModelE,
                '$statusModelF' => $statusModelF
            ]);

        }
    }

} else {

    // 参数存在错误

    echo json_encode([
        'status' => 509, // 参数存在错误
        'isNew' => $isNew,
        '$folderName' => $folderName,
        'modelVersion' => $modelVersion
    ]);

}

