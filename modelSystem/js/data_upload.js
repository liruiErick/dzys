(function () {
    var xhr = null,
        url = '../../data/upload.php',
        // url = '../data/upload.php',
        u = '../../data/download.php',
        // u = '../data/download.php',
        isNew = false,
        folderName = '',
        version = '',
        def = '0',
        detail = '',
        uploadBtn = $('#newModel'),
        modelObj = $('#modelA, #modelB, #modelC, #modelD, #modelE, #modelF');

    modelObj.off().on('change', function () {
        $(this).siblings('input').val(this.files[0].name)
    });
    modelList();

    /**
     * 获取模型列表
     */
    function modelList() {
        $.ajax({
            type: 'POST',
            url: LoadUrl() + 'axis2/services/MyService/getModelList',
            data: {},
            dataType: 'text',
            contentType: 'text/xml',
            success: function (res) {
                res = JSON.parse(loadXML(res));
                // console.log(res);
                var html = '';
                var len = res.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        html += '<tr data-if-file="' + res[i].IF_file + '" data-command="' + res[i].command + '" data-comment="' + res[i].comment + '" data-data="' + res[i].data + '" data-default="' + res[i].default + '" data-folder="' + res[i].folder + '" data-jar="' + res[i].jar + '" data-name="' + res[i].name + '" data-source="' + res[i].source + '" data-status="' + res[i].status + '" data-tech-file="' + res[i].tech_file + '" data-type="' + res[i].type + '" data-ver="' + res[i].ver + '">' +
                            '<td class="list-active"><input class="chk" type="checkbox"></td>' +
                            '<td>' + res[i].type + '</td>' +
                            '<td>' + res[i].name + '</td>' +
                            '<td>' + res[i].ver + '</td>' +
                            '<td>' + res[i].comment + '</td>' +
                            '<td>' + res[i].folder + '</td>' +
                            '<td class="cursor res-down" data-file-name="' + res[i].jar + '">' + res[i].jar + '</td>' +
                            '<td class="cursor res-down" data-file-name="' + res[i].data + '">' + res[i].data + '</td>' +
                            '<td class="cursor res-down" data-file-name="' + res[i].command + '">' + res[i].command + '</td>' +
                            '<td class="cursor res-down" data-file-name="' + res[i].source + '">' + res[i].source + '</td>' +
                            '<td class="cursor res-down" data-file-name="' + res[i].IF_file + '">' + res[i].IF_file + '</td>' +
                            '<td class="cursor res-down" data-file-name="' + res[i].tech_file + '">' + res[i].tech_file + '</td>' +
                            '<td>' + res[i].lasttime + '</td><td>' + res[i].firsttime + '</td>' +
                            '<td class="btn-box">' +
                            '<button class="btn btn-info model-carry btn-padding">执行</button>' +
                            '<a class="btn btn-success model-down btn-padding" href="javascript:void(0);">下载</a>' +
                            '<button class="btn btn-info btn-padding def-btn" ' + ((res[i].default === '1') ? 'disabled' : '') + '>设为默认</button>' +
                            '</td></tr>'
                    }
                    $('#modelBody').html(html);
                    $('.msg').empty();
                    bindEvForModelList()
                } else {
                    html = '<h3 style="margin-top:50px;text-align:center;color:#555;font-weight:bold;">没有查询到数据！</h3>';
                    $('.msg').html(html)
                }
            }
        })
    }

    /**
     * 新建模型or修改模型
     */
    uploadBtn.off().on('click', function () {
        this.disabled = true;
        var txt = $(this).text();
        if (txt === '新建模型') {
            isNew = true;
            folderName = '';
            uploadFile(isNew, folderName)
        } else if (txt === '修改模型') {
            // console.log(folderName);
            // console.log(version);
            checkModelInfo(function (msg) {
                if (msg === '1') {
                    layer.msg('模型正在执行中，请等待执行完毕后再尝试修改！', function () {
                        uploadBtn.removeAttr('disabled')
                    })
                } else {
                    uploadFile(isNew, folderName)
                }
            }, folderName, version)
        }
    });

    /**
     * 上传文件核心函数
     * @param isNew
     * @param folderName
     */
    function uploadFile(isNew, folderName) {
        var modelClass = document.getElementById('modelClass').value,
            modelName = document.getElementById('modelName').value.trim(),
            modelVersion = document.getElementById('modelVersion').value.trim(),
            modelDetail = document.getElementById('modelDetail').value.trim();

        var jar = document.getElementById('modelA').files[0],
            data = document.getElementById('modelB').files[0],
            command = document.getElementById('modelC').files[0],
            modelD = document.getElementById('modelD').files[0], // 源代码
            modelE = document.getElementById('modelE').files[0], // 接口文档
            modelF = document.getElementById('modelF').files[0]; // 技术文档

        var n_jar = jar ? jar.name : '',
            n_data = data ? data.name : '',
            n_command = command ? command.name : '',
            n_modelD = modelD ? modelD.name : '',
            n_modelE = modelE ? modelE.name : '',
            n_modelF = modelF ? modelF.name : '',

            s_jar = jar ? jar.size : '',
            s_data = data ? data.size : '',
            s_command = command ? command.size : '',
            s_modelD = modelD ? modelD.size : '',
            s_modelE = modelE ? modelE.size : '',
            s_modelF = modelF ? modelF.size : '';

        var form = new FormData();
        form.append('jar', jar);
        form.append('data', data);
        form.append('command', command);
        form.append('modelD', modelD);
        form.append('modelE', modelE);
        form.append('modelF', modelF);

        form.append('n_jar', n_jar);
        form.append('n_data', n_data);
        form.append('n_command', n_command);
        form.append('n_modelD', n_modelD);
        form.append('n_modelE', n_modelE);
        form.append('n_modelF', n_modelF);

        form.append('s_jar', s_jar);
        form.append('s_data', s_data);
        form.append('s_command', s_command);
        form.append('s_modelD', s_modelD);
        form.append('s_modelE', s_modelE);
        form.append('s_modelF', s_modelF);

        form.append('modelClass', modelClass);
        form.append('modelName', modelName);
        form.append('modelVersion', modelVersion);
        form.append('modelDetail', modelDetail);

        form.append('isNew', isNew);
        form.append('folderName', folderName);

        if ((isNew && n_jar && n_data && n_command && n_modelD && n_modelE && n_modelF && !folderName && modelClass !== 0 && modelName && modelVersion) || (!isNew && folderName && (n_jar || n_data || n_command || n_modelD || n_modelE || n_modelF || (modelDetail !== detail)) && modelClass !== 0 && modelName && modelVersion)) {
            xhr = new XMLHttpRequest();
            xhr.open('post', url, true);
            xhr.onload = uploadComplete;
            xhr.onerror = function (request) {
                layer.msg('操作失败，请检查网络连接！错误信息：' + request.target.responseText)
            };
            xhr.send(form);
        } else {
            if (isNew) {
                layer.msg('新建失败，请完善上传文件信息！', function () {
                    uploadBtn.removeAttr('disabled')
                });
            } else {
                layer.msg('修改失败，未检测到改动！', function () {
                    uploadBtn.removeAttr('disabled')
                });
            }
        }
    }

    /**
     * 上传成功
     * @param request
     */
    function uploadComplete(request) {
        // console.log(request.target.responseText);
        var res = JSON.parse(request.target.responseText);
        // console.log(res);
        var status = res.status;
        if (status === 200) {
            $.ajax({
                type: 'POST',
                url: LoadUrl() + 'axis2/services/MyService/updateModel',
                data: {
                    'isNew': isNew,
                    'folder': res.folder,        // 文件夹名
                    'jar': res.jar,              // jar名
                    'data': res.data,            // data名
                    'command': res.command,      // command名
                    'type': res.type,            // 类型
                    'name': res.name,            // 名称
                    'ver': res.ver,              // 版本号
                    'comment': res.comment,      // 模型描述
                    'IF_file': res.IF_file,      // 接口文档
                    'tech_file': res.tech_file,  // 技术文档
                    'source': res.source,        // 源代码文件名
                    'def': def            // 是否默认
                },
                dataType: 'text',
                success: function (res) {
                    // console.log(res);
                    res = JSON.parse(loadXML(res));
                    if (res) {
                        if (isNew) {
                            layer.msg('新建成功！');
                        } else {
                            layer.msg('修改成功！');
                        }
                    } else {
                        if (isNew) {
                            layer.msg('新建失败！');
                        } else {
                            layer.msg('修改失败！');
                        }
                    }
                    resetInput();
                    uploadBtn.text('新建模型');
                    modelList();
                }
            })
        } else if (status === 509) {
            layer.msg('参数错误！');
        } else if (status === 507) {
            layer.msg('修改失败，资源目录不存在！');
        } else if (status === 508) {
            layer.msg('该版本已存在，请更改其他版本号后重新尝试！')
        }
        uploadBtn.removeAttr('disabled')
    }

    /**
     * 检查模型状态
     * @param fn
     * @param folder
     * @param ver
     */
    function checkModelInfo(fn, folder, ver) {
        $.ajax({
            type: 'POST',
            url: LoadUrl() + 'axis2/services/MyService/getModelInfo',
            data: {
                'folder': folder,
                'ver': ver
            },
            dataType: 'text',
            success: function (res) {
                res = JSON.parse(loadXML(res));
                // console.log(res);
                msg = res[0].status;
                fn(msg);
            }
        })
    }

    /**
     * 模型列表事件绑定
     */
    function bindEvForModelList() {
        // 执行操作
        $('.model-carry').off().on('click', function () {
            var command = $(this).parents('tr').data('command');
            var folder = $(this).parents('tr').data('folder');
            var ver = $(this).parents('tr').data('ver');
            // console.log(command);
            // console.log(folder);
            checkModelInfo(function (msg) {
                if (msg === '1') {
                    layer.msg('模型正在执行中，请勿重复执行！')
                } else {
                    $.ajax({
                        type: 'POST',
                        url: LoadUrl() + 'axis2/services/MyService/execute',
                        data: {
                            'command': command,
                            'folder': folder,
                            'ver': ver
                        },
                        dataType: 'text',
                        success: function (res) {
                            res = htmldecode(loadXML(res));
                            // console.log(res);
                            if (res) {
                                layer.open({
                                    // type: 1,
                                    area: ['450px', '400px'],
                                    title: '执行信息',
                                    content: res
                                })
                            } else {
                                layer.msg('执行成功！')
                            }
                        }
                    })
                }
            }, folder, ver)
        });
        // 单选修改
        $('.chk').off().on('click', function () {
            if (this.checked) {
                var DomObj = $(this).parents('tr').siblings().find('input.chk');
                var len = DomObj.length;
                for (var i = 0; i < len; i++) {
                    DomObj[i].checked = false
                }
                isNew = false;
                folderName = $(this).parents('tr').data('folder');
                version = $(this).parents('tr').data('ver');
                var type = $(this).parents('tr').data('type'),
                    name = $(this).parents('tr').data('name'),
                    jar = $(this).parents('tr').data('jar'),
                    data = $(this).parents('tr').data('data'),
                    command = $(this).parents('tr').data('command'),
                    source = $(this).parents('tr').data('source'),
                    if_file = $(this).parents('tr').data('if-file'),
                    tech_file = $(this).parents('tr').data('tech-file'),
                    comment = $(this).parents('tr').data('comment'),
                    sta = $(this).parents('tr').data('def'); // 是否为默认
                detail = comment;
                if (sta === '1') {
                    def = '1'
                }
                uploadBtn.text('修改模型');
                modelObj.val('');
                $('#modelClass').val(type);
                var option = $('#modelClass option');
                for (var j = 0; j < option.length; j++) {
                    var $tmp = $(option[j]);
                    if ($tmp.attr('value') === type) {
                        $tmp.attr('selected', true).siblings().attr('selected', false);
                        break
                    }
                    $tmp = null
                }
                $('#modelClass,#modelName,#modelVersion').attr('disabled', true);
                $('.model-name').val(name);
                $('.model-ver').val(version);
                $('.modal-a').val(jar);
                $('.modal-b').val(data);
                $('.modal-c').val(command);
                $('.modal-d').val(source);
                $('.modal-e').val(if_file);
                $('.modal-f').val(tech_file);
                $('.comment').val(comment)
            } else {
                resetInput();
                uploadBtn.text('新建模型')
            }
        });
        // 下载result
        $('.model-down').off().on('click', function () {
            var folder = $(this).parents('tr').data('folder');
            var ver = $(this).parents('tr').data('ver');
            checkModelInfo(function (msg) {
                // console.log(msg);
                if (msg === '2') {
                    downloadRes(folder, ver, '')
                } else if (msg === '-1') {
                    layer.msg('模型执行失败，未生成结果文件！')
                } else if (msg === '0') {
                    layer.msg('最新的模型还未执行！')
                } else if (msg === '1') {
                    layer.msg('模型正在执行中！')
                }
            }, folder, ver)
        });
        // 设为默认
        $('.def-btn:enabled').off().on('click', function () {
            var folder = $(this).parents('tr').data('folder');
            var ver = $(this).parents('tr').data('ver');
            $.ajax({
                type: 'POST',
                url: LoadUrl() + 'axis2/services/MyService/updateModelDef',
                data: {
                    'folder': folder,
                    'ver': ver,
                    'def': '1'
                },
                dataType: 'text',
                success: function (res) {
                    res = loadXML(res);
                    if (res === 'true') {
                        layer.msg('设置成功！', modelList())
                    }
                }
            })
        });
        // 下载其他资源
        $('.res-down').off().on('click', function () {
            var folder = $(this).parents('tr').data('folder');
            var ver = $(this).parents('tr').data('ver');
            var fileName = $(this).data('file-name');
            // console.log(folder);
            // console.log(ver);
            // console.log(fileName);
            downloadRes(folder, ver, fileName)
        })
    }

    /**
     * 资源下载函数
     * @param folder
     * @param ver
     * @param fileName
     */
    function downloadRes(folder, ver, fileName) {
        // console.log(folder);
        // console.log(ver);
        // console.log(fileName);
        var form = $('<form method="post" action="' + u + '" style="display:none;" target="hid_ifr"><input type="hidden" name="folder" value="' + folder + '"><input type="hidden" name="ver" value="' + ver + '"><input type="hidden" name="fileName" value="' + (fileName ? fileName : 'result.txt') + '"></form>');
        var iframe = $('<iframe name="hid_ifr" id="hid_ifr" style="display:none;"></iframe>');
        $('body').append(form).append(iframe);
        form.submit().remove();
        $('#hid_ifr').load(function () {
            var data = $(this).contents().find('body').text();
            if (data) {
                data = JSON.parse(data);
                layer.msg(data.msg);
            }
            $('#hid_ifr').remove()
        })
    }

    /**
     * 初始化所有input
     */
    function resetInput() {
        $('#modelClass,#modelName,#modelVersion').attr('disabled', false);
        $('#modelClass').val('0');
        $('#def').attr('selected', true).siblings().removeAttr('selected');
        modelObj.val('');
        $('.file-text').val('')
    }

})();











