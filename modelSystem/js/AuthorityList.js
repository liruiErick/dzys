/**
 * Created by lirui on 2017/6/13.
 */
$(function () {
    /**********************操作对象************************/
    var $editLimit = $("#editLimit");
    var $authorityTableBody = $("#authorityTableBody");
    var $editMeta = $("#edit_meta");
    var $addMeta = $('#add_meta');
    var $metaTable = $('#meta-table');
    var $insertMeta = $("#insert_meta");
    var $EditUser = $("#EditUser");
    var $adduser = $("#adduser");

    var AuthorityList = (function () {
        /**********************初始化************************/
        function init() {
            randerAuthority();//获取用户权限列表
            bindEvent();
        }

        /**********************绑定事件************************/
        function bindEvent() {
            /*编辑用户*/
            $editMeta.on('click', function () {
                $.ajax({
                    type: "POST",
                    url: LoadUrl() + "axis2/services/MyService/editUserInfoModel",
                    data: {
                        "user": $EditUser.val().trim(),
                        "flg_fx": $("#flg_fx_edit").prop("checked") == true ? 1 : 0,
                        "flg_ycl": $("#flg_ycl_edit").prop("checked") == true ? 1 : 0,
                        "flag_wj": $("#flag_wj_edit").prop("checked") == true ? 1 : 0,
                        "flag_rh": $("#flag_rh_edit").prop("checked") == true ? 1 : 0,
                        "flag_cs": $("#flag_cs_edit").prop("checked") == true ? 1 : 0,
                        "flag_mx": 0 // $("#flag_mx_edit").prop("checked") == true ? 1 : 0
                    },
                    dataType: "text",
                    success: function (result) {
                        if (loadXML(result) === "true") {
                            layer.msg('恭喜您编辑成功!', {
                                time: 1500
                            }, function () {
                                window.location.reload();
                            });
                        } else {
                            layer.msg('添加失败，请检查输入数据！')
                        }
                    },
                    error: function (msg) {
                        layer.msg('添加失败，请检查网络连接！')
                    }
                });
            });

            /*添加用户*/
            $addMeta.on('click', function () {
                $.ajax({
                    type: "POST",
                    url: LoadUrl() + "axis2/services/MyService/addUserModel",
                    data: {
                        "user": $adduser.val().trim(),
                        "password": $.md5('1234'),
                        "flg_fx": $("#flg_fx").prop("checked") == true ? 1 : 0,
                        "flg_ycl": $("#flg_ycl").prop("checked") == true ? 1 : 0,
                        "flag_wj": $("#flag_wj").prop("checked") == true ? 1 : 0,
                        "flag_rh": $("#flag_rh").prop("checked") == true ? 1 : 0,
                        "flag_cs": $("#flag_cs").prop("checked") == true ? 1 : 0,
                        "flag_mx": 0 // $("#flag_mx").prop("checked") == true ? 1 : 0
                    },
                    dataType: "text",
                    success: function (result) {
                        // console.log(result);
                        if (loadXML(result) === "true") {
                            layer.msg('恭喜您添加成功!', {
                                time: 1500
                            }, function () {
                                window.location.reload();
                            });
                        } else {
                            layer.msg('添加失败，请检查输入数据！')
                        }
                    },
                    error: function (msg) {
                        layer.msg('添加失败，请检查网络连接！')
                    }
                });

            });

            /*删除用户*/
            // $metaTable.on('click', '.delete', function () {
            //     var trObj = $(this).parents('tr');
            //     layer.confirm('删除后将不可恢复，您确定要删除吗？', {
            //         btn: ['删除', '取消']
            //     }, function () {
            //         $.ajax({
            //             type: "POST",
            //             url: LoadUrl() + "axis2/services/MyService/...",
            //             data: {
            //                 "id": trObj.attr("data-id")
            //             },
            //             dataType: "text",
            //             success: function (result) {
            //                 console.log(result);
            //                 result = loadXML(result);
            //                 if (result === 'true') {
            //                     layer.msg('恭喜您删除成功!', {
            //                         time: 1500
            //                     }, function () {
            //                         window.location.reload();
            //                     });
            //                 }
            //             },
            //             error: function (msg) {
            //                 layer.msg('删除失败，请检查网络连接')
            //             }
            //         })
            //     }, function (index) {
            //         layer.close(index);
            //     });
            // });

            /*编辑按钮操作*/
            $metaTable.on('click', '.update', function () {
                var trObj = $(this).parents('tr');
                $editLimit.html(createAuthorityHtml());
                $EditUser.val(trObj.attr("data-user"));
                trObj.attr("data-flg-fx") === "1" ? $("#flg_fx_edit").attr("checked", true) : null;
                trObj.attr("data-flg-ycl") === "1" ? $("#flg_ycl_edit").attr("checked", true) : null;
                trObj.attr("data-flag-wj") === "1" ? $("#flag_wj_edit").attr("checked", true) : null;
                trObj.attr("data-flag-rh") === "1" ? $("#flag_rh_edit").attr("checked", true) : null;
                trObj.attr("data-flag-cs") === "1" ? $("#flag_cs_edit").attr("checked", true) : null;
                // trObj.attr("data-flag-mx") === "1" ? $("#flag_mx_edit").attr("checked", true) : null;
                $insertMeta.modal("show");
            });
        }

        /**********************数据渲染************************/

        /**
         * 数据渲染-渲染用户权限
         *
         */
        function randerAuthority() {
            $.ajax({
                type: "POST",
                url: LoadUrl() + "axis2/services/MyService/getModelUserList",
                data: {},
                dataType: "text",
                contentType: "text/xml",
                success: function (result) {
                    resolveAuthorityData(result, $authorityTableBody);
                },
                error: function (msg) {
                    fetchDataFailed(msg)
                }
            })
        }

        /**********************数据处理************************/

        /**
         * 数据处理-处理子菜单数据
         * @param result(数据结果)
         * @param parent(用户权限父级元素)
         */
        function resolveAuthorityData(result, parent) {
            var resultXml = JSON.parse(loadXML(result));
            // console.log(resultXml);
            var len = resultXml.length;
            var html = '';
            if (len-1 !== 0) {
                for (var i = 0; i < len; i++) {
                    if (resultXml[i].user === 'admin') {
                        continue
                    }
                    html += '<tr data-user="' + resultXml[i].user + '" data-flg-fx="' + resultXml[i].flg_fx + '" data-flg-ycl="' + resultXml[i].flg_ycl + '" data-flag-wj="' + resultXml[i].flag_wj + '" data-flag-rh="' + resultXml[i].flag_rh + '" data-flag-cs="' + resultXml[i].flag_cs + '" data-flag-mx="' + resultXml[i].flag_mx + '">'
                        + '<td class="user">' + resultXml[i].user + '</td>'
                        + '<td class="rank">'
                        + ((resultXml[i].flg_fx === '0') ? '' : '信息自动分析系统；')
                        + ((resultXml[i].flg_ycl === '0') ? '' : '网络情报预处理系统；')
                        + ((resultXml[i].flag_wj === '0') ? '' : '数据挖掘系统；')
                        + ((resultXml[i].flag_rh === '0') ? '' : '数据融合系统；')
                        + ((resultXml[i].flag_cs === '0') ? '' : '系统与数据测试工具；')
                        // + ((resultXml[i].flag_mx === '0') ? '' : '模型管理子系统；')
                        + '</td>'
                        + '<td class="last">'
                        + '<span class="update insert_meta" style="background:none;">'
                        + '<a href="javascript:;"></a>'
                        + '</span>'
                        /*+ '<span class="delete" >'
                        +'<a href="javascript:;"></a>'
                        +'</span>'*/
                        + '</td>'
                        + '</tr>'
                }
                parent.html(html);
            } else {
                $('#nometa').removeClass('hide')
            }

        }

        /**********************构造html************************/
        /**
         * 构造html-构造子菜单html
         *
         */
        function createAuthorityHtml() {
            return '<label class="checkbox-inline marginl16">'
                + '<input type="checkbox" value="flg_fx" id="flg_fx_edit">信息自动分析系统'
                + '</label>'
                + '<label class="checkbox-inline marginl16">'
                + '<input type="checkbox" value="flg_ycl" id="flg_ycl_edit">网络情报预处理系统'
                + '</label>'
                + '<label class="checkbox-inline marginl16">'
                + '<input type="checkbox" value="flag_wj" id="flag_wj_edit">数据挖掘系统'
                + '</label>'
                + '<label class="checkbox-inline marginl16">'
                + '<input type="checkbox" value="flag_rh" id="flag_rh_edit">数据融合系统'
                + '</label>'
                + '<label class="checkbox-inline marginl16">'
                + '<input type="checkbox" value="flag_cs" id="flag_cs_edit">系统与数据测试工具'
                + '</label>'
            // + '<label class="checkbox-inline marginl16">'
            // + '<input type="checkbox" value="flag_mx" id="flag_mx_edit">模型管理子系统'
            // + '</label>';
        }

        /**
         * 结果回调
         * @param mes(错误信息)
         */
        function fetchDataFailed(mes) {
            console.log(mes)
        }

        return {
            init: init
        }
    })();
    AuthorityList.init();
});