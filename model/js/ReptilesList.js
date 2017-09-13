/**
 * Created by lirui on 2017/6/13.
 */
$(function () {

    /**********************操作对象************************/
    var $metaTable=$('#meta-table');
    var $insertRank=$("#insert_rank");
    var $pagingidReptile=$("#pagingidReptile");
    var $selectedSubNews=$("#selectedSubNews");
    var $selid=$("#selid");
    var $tablebody=$("#tablebody");
    var $mometa=$("#nometa");
    var $subMenuAdd=$("#subMenuAdd");
    var $subMenuEdit=$("#subMenuEdit");
    var $checkflag=$("#checkflag");
    var $area=$("#area");
    var $areaAdd=$("#areaAdd");
    var $areaEdit=$("#areaEdit");
    var $selectsubMenu=$("#selectsubMenu");
    var $subMenu=$("#subMenu");
    var $search=$("#search");
    var $rank_edit=$("#rank_edit");
    var $flagCheck=$("#flagCheck");
    var $CheckFail=$("#CheckFail");
    var $startTime=$("#startTime");
    var $endTime=$("#endTime");
    var $keyword=$("#keyword");
    var $existImg=$("#existImg");
    var $imgPath=$("#imgPath");
    var param={
        "nurl":LoadUrl() + "axis2/services/MyService/QuerySpiderNewsCustom",
        "parent":$tablebody,
        "nometa":$mometa,
        "pagingId":$pagingidReptile,
        "pageSize":50,
        "curr":1,
        "submenu":"",
        "area":"",
        "startTime":"",
        "endTime":"",
        "checkflag":"",
        "keyword":"",
        "displayNums":6,
        "care":"1"
    };
    $selectedSubNews.html($.cookie("SelectedSubMenuName"));

    var ReptilesList=(function () {
        /**********************初始化************************/
        function init() {
            fetchdata();
            bindEvent();
            assist();
        }
        /**********************初始化数据************************/
        function fetchdata() {
            fetchSubMenudata();
            fetchAreadata();
            fetchCheckFlagdata();
            fetchSpidedata();
            fetchSpideSubMenu();
        }
        /**********************事件绑定************************/
        function bindEvent() {//事件绑定
            var _this = this;
            /*根据条件检索新闻数据*/
            $search.on('click', function () {
                /*更新检索内容是数据显示状态*/
                !$mometa.hasClass("hide")?$mometa.addClass("hide"):null;
                /*更新检索时分页显示状态*/
                $pagingidReptile.empty();
                param.submenu = getSearchSelectedSubmenu("subMenu");
                param.area = getSelectedArea();
                param.startTime = $startTime.val();
                param.endTime = $endTime.val();
                param.checkflag = getSelectedCheckType();
                param.keyword = $keyword.val();
                param.curr=1;
                param.care=""+getSearchSelectedSubmenu("selectedMes");
                ShowInfo(param);
            });
            /*编辑新闻数据*/
            $rank_edit.on('click', function () {
                var Spidersurl = LoadUrl() + "axis2/services/MyService/EditSpiderNewCheckFlagCustom";
                var pic=$imgPath.val()==""?$existImg.val():$imgPath.val();
                if($("#titleEdit").val().trim()!=""&&$("#EditorContent").html()!=""&&getSelectedArea(1)!=""){
                    $.ajax({
                        type: "POST",
                        url: Spidersurl,
                        data: {
                            "id": $selid.val(),
                            "checkflag": 1
                        },
                        dataType: "text",
                        success: function (result) {
                            layer.msg('已设置为已通过!', {
                                time: 1500
                            }, function () {
                                var surl = LoadUrl() + "axis2/services/MyService/UpdateNewCustom";
                                $.ajax({
                                    type: "POST",
                                    url: surl,
                                    data: {
                                        "isNew": true,
                                        "id": $selid.val(),
                                        "menu": "",
                                        "submenu": $.cookie($("#subMenuEdit").find("option:selected").text()),
                                        "area": getSelectedArea(1),
                                        "title": $("#titleEdit").val().trim(),
                                        "summary": $("#abstractEdit").val().trim(),
                                        "content": $("#contentWrapRetipe").find("div#EditorContent").html(),
                                        "url": $("#urlEdit").val().trim(),
                                        "lawUnit":$("#unitEdit option:selected").text(),
                                        "lawOrg": $(" #organizationEdit").val().trim(),
                                        "lawNum": $("#docNumEdit").val().trim(),
                                        "lawType": $("#interpretTypeEdit option:selected").val().trim(),
                                        "docType": $("#dcoTypeEdit option:selected").text(),
                                        "code": $("#codeEdit").val().trim(),
                                        "publishRegion": $("#publishRegionEdit").val().trim(),
                                        "trainStartTime": $("#startTimeEdit").val().trim(),
                                        "trainEndTime": $("#endtimeEdit").val().trim(),
                                        "signupTime": $("#applyendtimeEdit").val().trim(),
                                        "trainLocation": $("#locationEdit").val().trim(),
                                        "hotflag": getHotflag(1),
                                        "author": "system",
                                        "picurl":pic,
                                        "page_source":$("#sourceEdit").val().trim()
                                    },
                                    dataType: "text",
                                    success: function (result) {
                                        layer.msg("恭喜您编辑并添加新闻成功", {time: 1500}, function () {
                                            var CheckFlagsurl = LoadUrl() + "axis2/services/MyService/UpdateCheckFlag";
                                            $.ajax({
                                                type: "POST",
                                                url: CheckFlagsurl,
                                                data: {
                                                    "id": $selid.val(),
                                                    "check_flag": 1,
                                                    "user": sessionStorage.getItem("loginName"),
                                                    "title": $("#titleEdit").val()
                                                },
                                                dataType: "text",
                                                success: function (result) {
                                                    $insertRank.modal("hide");
                                                    window.location.reload();
                                                }
                                            });
                                        });
                                    }
                                });
                            });
                        }
                    });
                }
                else{
                    layer.msg("标题,领域,内容为必填项",{time:1000});
                    return;
                }
            });
            /*编辑新闻模态框*/
            $metaTable.on('click', '.update', function () {
                setAllBlank();//置空模态框中数据
                var thisUpdate = $(this);
                var trObj = thisUpdate.parents('tr');
                $selid.val(trObj.attr("data-id"));
                $insertRank.modal('show');
                var tdArr = trObj.find("td");
                var surl = LoadUrl() + "axis2/services/MyService/GetSpiderNewByIdCustom";
                $.ajax({
                    type: "POST",
                    url: surl,
                    data: {
                        "id": trObj.attr("data-id")
                    },
                    dataType: "text",
                    success: function (result) {
                        var html = "";
                        result = loadXML(result);
                        if (!result || result == "[]") {
                            return;
                        }
                        else {
                            result = jQuery.parseJSON(result);
                            var finalResult = result[0];
                            $("#titleEdit").val(finalResult.title);
                            $("#urlEdit").val(finalResult.url);

                            $("#startTimeEdit").val(timeFormat(finalResult.starttime));
                            $("#endtimeEdit").val(timeFormat(finalResult.applyendtime));

                            $("#applyendtimeEdit").val(timeFormat(finalResult.fromTime));
                            $("#abstractEdit").val(finalResult.stick_abstract);

                            $("#organizationEdit").val(finalResult.lawOrg);
                            /*$("#unitEdit").val(finalResult.lawUnit);*/

                            $("#docNumEdit").val(finalResult.lawNum);
                            $("#codeEdit").val("");

                            $("#publishRegionEdit").val("");
                            $("#locationEdit").val(finalResult.location);
                            $("#sourceEdit").val(finalResult.page_source);

                            /*设置领域*/
                            /*$("#areaEdit").find("input[type='checkbox']").each(function () {
                                $(this).removeAttr("checked");
                                for (var j = 0; j < getAreaArr(tdArr[4].innerText).length; j++) {
                                    if ($(this).attr("data-name") == getAreaArr(tdArr[4].innerText)[j]) {
                                        $(this).prop("checked", "true");
                                    }
                                }
                            });*/
                            setCheckboxStatus("areaEdit","input[type='checkbox']",tdArr[4].innerText,"checked",true);
                            /*存储图片信息*/
                            $existImg.val("");
                            /*设置子菜单*/
                            /*$("#subMenuEdit").find("option").each(function () {
                                $(this).removeAttr("selected");
                                if ($(this).val() == (finalResult.MenuName)) {
                                    $(this).prop("selected", true);
                                }
                            });*/
                            setOptionStatus("subMenuEdit","option",$.cookie(finalResult.MenuName),"selected",true);
                            /*文献类型设置*/
                            /*$("#dcoTypeEdit").find("option").each(function () {
                                $(this).removeAttr("selected");
                            });*/
                            $("#dcoTypeEdit").find("option").removeAttr("selected");
                            /*法律解读类型设置*/
                            /*$("#interpretTypeEdit").find("option").each(function () {
                                $(this).removeAttr("selected");
                            });*/
                            $("#interpretTypeEdit").find("option").removeAttr("selected");
                            /*法律发文单位*/
                            /*$("#unitEdit").find("option").each(function () {
                                $(this).removeAttr("selected");
                                if($(this).val()==(result.lawUnit)){
                                    $(this).attr("selected",true);
                                }
                            });*/
                            setOptionStatus("unitEdit","option",result.lawUnit,"selected",true);
                            /*设置热点推荐*/
                            /*if (result.hot_flag) {
                                $("#hotflagEdit").prop("checked", "true");
                            }*/
                            (result.hot_flag)?$("#hotflagEdit").prop("checked", "true"):null;
                            /*设置内容联动显示*/
                            !$.cookie(finalResult.MenuName)||!(finalResult.MenuName)?IgnoreField('4', 2):IgnoreField($.cookie(finalResult.MenuName), 2);
                            var ssurl = LoadUrl() + "axis2/services/MyService/GetSpilderContent";
                            $.ajax({
                                type: "POST",
                                url: ssurl,
                                data: {
                                    "id": trObj.attr("data-id")
                                },
                                dataType: "text",
                                success: function (result) {
                                    $("#contentWrapRetipe").find("div#EditorContent").html(ContentHtml(jQuery.parseJSON(loadXML(result)).content));
                                }
                            });
                        }
                    }
                });
            });
            /*批量审核新闻数据*/
            $flagCheck.on('click', function () {
                if ($tablebody.find("input[type='checkbox']:checked").length == 0) {
                    layer.msg("请选中数据", {time: 1000});
                }
                else {
                    $tablebody.find("input[type='checkbox']:checked").each(function (a, b) {
                        var trObj = $(this).parents('tr');
                        var tdArr = trObj.find("td");
                        var selectedId = $(this).attr("data-id");
                        var title = trObj.find("td.title").text();
                        var Spidersurl = LoadUrl() + "axis2/services/MyService/EditSpiderNewCheckFlagCustom";
                        $.ajax({
                            type: "POST",
                            url: Spidersurl,
                            data: {
                                "id": selectedId,
                                "checkflag": 1
                            },
                            dataType: "text",
                            success: function (result) {
                                var NewToEsurl = LoadUrl() + "axis2/services/MyService/GetSpiderNewToEs";
                                $.ajax({
                                    type: "POST",
                                    url: NewToEsurl,
                                    data: {
                                        "id": selectedId,
                                        "user": sessionStorage.getItem("loginName"),
                                        "itemid": $.cookie($("#selectsubMenu").find("option:selected").text()),
                                        "hotFlag": 0
                                    },
                                    dataType: "text",
                                    success: function (result) {
                                        var resultXml = loadXML(result);
                                        var resultJson = jQuery.parseJSON(resultXml);
                                        if (resultJson) {
                                            var CheckFlagsurl = LoadUrl() + "axis2/services/MyService/UpdateCheckFlag";
                                            $.ajax({
                                                type: "POST",
                                                url: CheckFlagsurl,
                                                data: {
                                                    "id": selectedId,
                                                    "check_flag": 1,
                                                    "user": sessionStorage.getItem("loginName"),
                                                    "title": title
                                                },
                                                dataType: "text",
                                                success: function (result) {
                                                    trObj.find("td.tip").find("span").eq(1).removeClass("hide");
                                                    if ($tablebody.find("input[type='checkbox']:checked").length == a + 1) {
                                                        layer.msg("设置子菜单并添加新闻成功", {time: 1500});
                                                    }
                                                }
                                            });
                                        } else {
                                            trObj.find("td.tip").find("span").eq(0).removeClass("hide");
                                        }
                                    }
                                });
                            }
                        });
                    });
                }
            });
            /*批量未通过新闻数据*/
            $CheckFail.on('click', function () {
                if ($tablebody.find("input[type='checkbox']:checked").length == 0) {
                    layer.msg("请选中数据", {time: 1000});
                }
                else {
                    $tablebody.find("input[type='checkbox']:checked").each(function (a, b) {
                        var surl = LoadUrl() + "axis2/services/MyService/EditSpiderNewCheckFlagCustom";
                        $.ajax({
                            type: "POST",
                            url: surl,
                            data: {
                                "id": $(this).attr("data-id"),
                                "checkflag": 2
                            },
                            dataType: "text",
                            success: function (result) {
                                if ($tablebody.find("input[type='checkbox']:checked").length == a + 1) {
                                    layer.msg('已设置为未通过!', {
                                        time: 1500
                                    }, function () {
                                        window.location.reload();
                                    });
                                }
                            }
                        });
                    });
                }
            });
        }
        /**********************事件绑定操作************************/
        /**********************数据获取************************/
        function fetchSpideSubMenu() {
            var surl = LoadUrl() + "axis2/services/MyService/getDataLabel";
            renderSpideSubMenu(surl,$subMenu);
        }
        function fetchSubMenudata() {
            var surl = LoadUrl() + "axis2/services/MyService/getAllSubMenuName";
            randerSubMenu(surl, $subMenuAdd, $subMenuEdit, $selectsubMenu);
        }
        function fetchAreadata() {
            var surl = LoadUrl() + "axis2/services/MyService/GetAllAreaCustom";
            randerArea(surl, $area, $areaAdd, $areaEdit);
        }
        function fetchCheckFlagdata() {
            randerCheckFlag($checkflag);
        }
        function fetchSpidedata() {
            param.submenu="全部";
            ShowInfo(param);
        }
        /**********************渲染数据************************/
        /**
         * 数据渲染-渲染爬虫子菜单
         * @param surl(ajax请求地址)
         * @param parent(子菜单父级元素)
         */
        function renderSpideSubMenu(surl,parent) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {},
                dataType: "text",
                contentType: "text/xml",
                success: function (result) {
                    resolveSpideSubMenuData(result,parent);
                },
                error: function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**
         * 数据渲染-渲染审核状态
         * @param parent(审核状态父级元素)
         */
        function randerCheckFlag(parent) {
            var html = '<label  class="checkbox-inline fontSize14 marginl16 flagCheckStatus">'
                + '<input type="checkbox" value="1">已审核'
                + '</label>'
                + '<label  class="checkbox-inline fontSize14 marginl16 flagCheckStatus">'
                + '<input type="checkbox" value="0">未审核'
                + '</label>'
                + '<label  class="checkbox-inline fontSize14 marginl16 flagCheckStatus">'
                + '<input type="checkbox" value="2">未通过'
                + '</label>'
                + '<label  class="checkbox-inline fontSize14 flagCheckStatus" onclick="setAll(this);" style="margin-left: 8px;">全部</label>';
            parent.html(html);
        }
        /**
         * 数据渲染-渲染领域
         * @param surl(ajax请求地址)
         * @param parent1(添加领域父级元素)
         * @param parent2(编辑领域父级元素)
         * @param parent3(搜索领域父级元素)
         */
        function randerArea(surl, parent1, parent2, parent3) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {},
                dataType: "text",
                contentType: "text/xml",
                success: function (result) {
                    resolveAreaData(result, parent1, parent2, parent3);

                },
                error: function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**
         * 数据渲染-渲染子菜单
         * @param surl(ajax请求地址)
         * @param parent1(添加子菜单父级元素)
         * @param parent2(编辑子菜单父级元素)
         * @param parent3(搜索子菜单父级元素)
         * @param parent4(批量设置子菜单父级元素)
         */
        function randerSubMenu(surl, parent1, parent2, parent3) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {},
                dataType: "text",
                contentType: "text/xml",
                success: function (result) {
                    resolveSubMenuData(result, parent1, parent2, parent3);
                },
                error: function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**********************数据处理************************/
        /**
         * 数据处理-处理子菜单数据
         * @param result(数据结果)
         * @param parent(子菜单父级元素)
         */
        function resolveSpideSubMenuData(result,parent) {
            parent.empty();
            var resultXml = loadXML(result);
            if (!resultXml || resultXml == "[]") {
                return;
            }
            else {
                var html = '<option value="全部" data-repeat="0" selected>全部</option>';
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    html += createSubMenuhtml(b);
                });
                html += '<option value="其他" data-repeat="0">其他</option>';
                //设置添加新闻子菜单
                parent.html(html);
            }
        }
        /**
         * 数据处理-处理子菜单数据
         * @param result(数据结果)
         * @param parent1(添加子菜单父级元素)
         * @param parent2(编辑子菜单父级元素)
         * @param parent3(搜索子菜单父级元素)
         * @param parent4(批量设置子菜单父级元素)
         */
        function resolveSubMenuData(result, parent1, parent2, parent3) {
            parent1.empty();
            parent2.empty();
            parent3.empty();
            var resultXml = loadXML(result);
            if (!resultXml || resultXml == "[]") {
                return;
            }
            else {
                var SubMenuHtml = "";
                var html = '<option value="全部" data-repeat="0">全部</option>';
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    $.cookie(b.itemid, b.menu);
                    $.cookie(b.menu, b.itemid);
                    SubMenuHtml += createSubMenuhtml(b);
                    html += createSubMenuhtml(b);
                });
                html += '<option value="" data-repeat="0">其他</option>';
                //设置添加新闻子菜单
                parent1.html(SubMenuHtml);
                parent2.html(SubMenuHtml);
                parent3.html(SubMenuHtml);
            }
        }
        /**
         * 数据处理-处理领域数据
         * @param result(数据结果)
         * @param parent1(添加领域父级元素)
         * @param parent2(编辑领域父级元素)
         * @param parent3(搜索领域父级元素)
         */
        function resolveAreaData(result, parent1, parent2, parent3) {
            var resultXml = loadXML(result);
            if (resultXml == "[]" || !resultXml) {
                return;
            }
            else {
                var shtml = '';
                var resultJson = jQuery.parseJSON(resultXml);
                parent1.empty();
                parent2.empty();
                parent3.empty();
                $.each(resultJson, function (a, b) {
                    shtml += createAreaHtml(b);
                });
                shtml += '<label  class="checkbox-inline flagCheckStatus" onclick="setAll(this);">全部';
                parent1.html(shtml);
                parent2.html(shtml);
                parent3.html(shtml);
            }
        }
        /**********************构造html************************/
        /**
         * 构造html-构造子菜单html
         * @param b(单个数据项)
         */
        function createSubMenuhtml(b) {
            var html = '<option value="' + b.menu + '" data-itemid="' + b.itemid + '" data-name="' + b.menu + '">' + b.menu + '</option>';
            return html;
        }
        /**
         * 构造html-构造领域html
         * @param b(单个数据项)
         */
        function createAreaHtml(b) {
            var html = '<label  class="checkbox-inline marginl16 flagCheckStatus"><input type="checkbox" data-name="' + b.name + '" value="' + b.name + '">' + b.name + '</label>';
            return html;
        }
        /**********************错误回调************************/
        /**
         * 结果回调
         * @param mes(错误信息)
         */
        function fetchDataFailed(mes) {
            console.log(mes)
        }
        /**********************辅助操作************************/
        function assist() {
            setEditor();//文本编辑器设置
            //拖拽上传图片
            bindDragUpload($(".imgSetting"));
        }
        return {
            init: init
        }//返回init函数
    })();
    ReptilesList.init();//爬虫新闻信息初始化
});//爬虫数据管理模块

