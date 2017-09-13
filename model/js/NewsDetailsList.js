/**
 * Created by lirui on 2017/6/13.
 */
$(function () {

    /**********************操作对象************************/
    var $metaTable=$('#meta-table');
    var $insertRank=$("#insert_rank");
    var $insertMeta=$("#insert_meta");
    var $pagingid=$("#pagingid");
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
    var $search=$("#search");
    var $delete=$("#delete");
    var $rank_edit=$("#rank_edit");
    var $flagCheck=$("#flagCheck");
    var $CheckFail=$("#CheckFail");
    var $meta_add=$("#meta_add");
    var $myTab=$("#myTab");
    var $startTime=$("#startTime");
    var $endTime=$("#endTime");
    var $author=$("#author");
    var $keyword=$("#keyword");
    var $IndexId=$("#IndexId");
    var $addNews=$("#addNews");
    var $imgPath=$("#imgPath");
    var $existImg=$("#existImg");
    var pageSize= 50;//每页显示数据条数
    var pageCount = 0;//起始页
    var displayNums = 6;//默认预览页数起始页
    var submenu;//新闻添加搜索编辑交互时所需字段
    var imgSrc="../../images/";//图片默认路径
    var total;//记录批量操作数据个数
    var param={
        "nurl":LoadUrl() + "axis2/services/MyService/QueryNewsCustom",
        "parent":$("#tablebody"),
        "nometa":$("#nometa"),
        "pagingId":$("#pagingid"),
        "pageSize":50,
        "curr":1,
        "submenu":$.cookie("SelectedSubMenuitemid"),
        "area":"",
        "startTime":"",
        "endTime":"",
        "author":"",
        "checkflag":"",
        "slideflag":"",
        "stickflag":"",
        "id":"",
        "keyword":"",
        "displayNums":6
    };

    submenu =$.cookie("SelectedSubMenuitemid")?$.cookie("SelectedSubMenuitemid"):$("#itemid").val();//设置子菜单名称
    $selectedSubNews.html($.cookie("SelectedSubMenuName"));
    var NewsDetailsList=(function () {
        /**********************初始化************************/
        function init() {
            fetchdata();
            bindEvent();
            assist();
        }
        /**********************数据初始化************************/
        function fetchdata() {
            fetchSubMenudata();
            fetchAreadata();
            fetchCheckFlagdata();
            fetchAllNewsdata();
        }
        /**********************事件绑定************************/
        function bindEvent() {//事件绑定
            var _this=this;
            /*根据条件检索新闻数据*/
            $search.on('click',function () {
                /*更新检索内容是数据显示状态*/
                if (!$mometa.hasClass("hide")) {
                    $mometa.addClass("hide");
                }
                /*更新检索时分页显示状态*/
                $pagingid.empty();
                /*按条件检索*/
                $myTab.find("li").each(function () {
                    /*按照内容检索*/
                    if ($(this).hasClass("active") && $(this).attr("data-id") == "1") {
                        param.nurl=LoadUrl() + "axis2/services/MyService/QueryNewsCustom";
                        param.parent = $("#tablebody");
                        param.nometa = $("#nometa");
                        param.pagingId = $("#pagingid");
                        param.submenu = $.cookie("SelectedSubMenuitemid");

                        param.curr=1;
                        param.area = getSelectedArea();
                        param.startTime = $startTime.val().trim();
                        param.endTime = $endTime.val().trim();
                        param.author = $author.val().trim();
                        param.checkflag = getSelectedCheckType();
                        param.slideflag = -1;
                        param.stickflag = -1;
                        param.id = "";
                        param.keyword = $keyword.val().trim();
                        ShowInfo(param);
                    }
                    /*按照id检索*/
                    if ($(this).hasClass("active") && $(this).attr("data-id") == "2") {
                        param.nurl=LoadUrl() + "axis2/services/MyService/getLawDetails";
                        param.pagingId="";
                        param.curr=1;
                        param.area = "";
                        param.startTime = "";
                        param.endTime = "";
                        param.author = "";
                        param.checkflag = "";
                        param.slideflag = -1;
                        param.stickflag = -1;
                        param.id = $IndexId.val().trim();
                        param.keyword = "";
                        ShowInfo(param);
                    }
                });

            });
            /*批量删除新闻数据*/
            $delete.on('click',function () {
                total=$tablebody.find("input[type='checkbox']:checked").length;
                if($tablebody.find("input[type='checkbox']:checked").length==0){
                    layer.msg("请选中数据",{time:1000});
                }
                else{
                    layer.confirm('删除后将不可恢复，您确定要删除吗？', {
                        btn: ['删除','取消']
                    },function() {
                        $tablebody.find("input[type='checkbox']:checked").each(function (a,b) {
                            var surl = LoadUrl() + "axis2/services/MyService/DeleteNewCustom";
                            var id=$(this).parents("tr").attr("data-id");
                            var title=$(this).parents("tr").find("td.title").text();
                            bindDeleteForNews(surl,id,sessionStorage.getItem("loginName"),title,a,total);
                        });
                    },function(index) {
                        layer.close(index);
                    });
                }
            });
            /*编辑新闻数据*/
            $rank_edit.on('click',function () {
                var pic=$imgPath.val()==""?$existImg.val():$imgPath.val();
                if($("#titleEdit").val()!=""&&$("#contentWrap").find("div#EditorContent").html()!=""&&getSelectedArea(1)!=""){
                    if($.cookie($("#subMenuEdit").val())!="18"){
                        $.ajax({
                            type: "POST",
                            url: LoadUrl() + "axis2/services/MyService/UpdateNewCustom",
                            data: {
                                "isNew":false,
                                "id":$selid.val(),
                                "menu":"",
                                "submenu":$.cookie($("#subMenuEdit").find("option:selected").text()),
                                "area":getSelectedArea(1),
                                "title":$("#titleEdit").val().trim(),
                                "summary":$("#abstractEdit").val().trim(),
                                "content":$("#contentWrap").find("div#EditorContent").html(),
                                "url":$("#urlEdit").val().trim(),
                                "lawUnit":$("#unitEdit option:selected").text(),
                                "lawOrg":$("#organizationEdit").val().trim(),
                                "lawNum":$("#docNumEdit").val().trim(),
                                "lawType":$("#interpretTypeEdit option:selected").val(),
                                "docType":$("#dcoTypeEdit option:selected").text(),
                                "code":$("#codeEdit").val().trim(),
                                "publishRegion":$("#publishRegionEdit").val().trim(),
                                "trainStartTime":$("#startTimeEdit").val().trim(),
                                "trainEndTime":$("#endtimeEdit").val().trim(),
                                "signupTime":$("#applyendtimeEdit").val().trim(),
                                "trainLocation":$("#locationEdit").val().trim(),
                                "hotflag":getHotflag(1),
                                "author":sessionStorage.getItem("loginName"),
                                "picurl":pic,
                                "page_source":$("#sourceEdit").val().trim(),
                                "place":"",
                                "country":""
                            },
                            dataType:"text",
                            success:function (result) {
                                var resultJson=JSON.parse(loadXML(result))
                                if(resultJson){
                                    layer.msg("恭喜您编辑成功",{time:1500},function () {
                                        $insertRank.modal("hide");
                                        window.location.reload();
                                    });
                                }else{
                                    layer.msg('编辑失败!');
                                }
                            }
                        });
                    }
                    else{
                        $.ajax({
                            type: "POST",
                            url: LoadUrl() + "axis2/services/MyService/UpdateNewByBooks",
                            data: {
                                "isNew":false,
                                "id":$selid.val(),
                                "menu":"",
                                "submenu":$.cookie($("#subMenuEdit").find("option:selected").text()),
                                "area":getSelectedArea(1),
                                "title":$("#titleEdit").val().trim(),
                                "summary":$("#abstractEdit").val().trim(),
                                "content":$("#contentWrap").find("div#EditorContent").html(),
                                "url":$("#urlEdit").val().trim(),
                                "lawUnit":$("#unitEdit option:selected").text(),
                                "lawOrg":$("#organizationEdit").val().trim(),
                                "lawNum":$("#docNumEdit").val().trim(),
                                "lawType":$("#interpretTypeEdit option:selected").val(),
                                "docType":$("#dcoTypeEdit option:selected").text(),
                                "publishRegion":$("#publishRegionEdit").val().trim(),
                                "trainStartTime":$("#startTimeEdit").val().trim(),
                                "trainEndTime":$("#endtimeEdit").val().trim(),
                                "signupTime":$("#applyendtimeEdit").val().trim(),
                                "trainLocation":$("#locationEdit").val().trim(),
                                "hotflag":getHotflag(1),
                                "author":sessionStorage.getItem("loginName").trim(),
                                "picurl":pic,
                                "page_source":$("#sourceEdit").val().trim(),

                                "code":$("#enkeywordsEdit").val().trim(),
                                "bk_author":$("#bk_authorEdit").val().trim(),
                                "keywords":$("#keywordsEdit").val().trim(),
                                "bk_unit":$("#journalnameEdit").val().trim(),
                                "language":$("#languageEdit").val().trim(),
                                "ISSN":$("#ISSNEdit").val().trim(),
                                "bk_date":$("#lastmodifiedEdit").val().trim(),
                                "page":$("#pageEdit").val().trim()
                            },
                            dataType:"text",
                            success:function (result) {
                                var resultJson=JSON.parse(loadXML(result));
                                if(resultJson){
                                    layer.msg("恭喜您编辑成功",{time:1500},function () {
                                        $insertRank.modal("hide");
                                        window.location.reload();
                                    });
                                }else{
                                    layer.msg('编辑失败!');
                                }
                            }
                        });
                    }
                }else{
                    layer.msg("标题,领域,内容为必填项",{time:1000});
                    return;
                }
            });
            /*编辑新闻模态框*/
            $metaTable.on('click','.update', function () {
                setAllBlank();//清空模态框数据
                var trObj = $(this).parents('tr');
                $selid.val(trObj.attr("data-id"));
                $insertRank.modal('show');
                var tdArr = trObj.find("td");
                var surl = LoadUrl() + "axis2/services/MyService/getLawDetails";
                $.ajax({
                    type: "POST",
                    url: surl,
                    data: {
                        "indexId":trObj.attr("data-id")
                    },
                    dataType: "text",
                    success: function (result) {
                        var html ="";
                        var resultXml = loadXML(result);
                        if(!resultXml||resultXml=="[]") {
                            return;
                        }
                        else{
                            var result = jQuery.parseJSON(resultXml);
                            $("#titleEdit").val(result.title);
                            $("#abstractEdit").val(result.stick_abstract);
                            $("#contentWrap").find("div#EditorContent").html(ContentHtml(result.content));
                            $("#urlEdit").val(result.url);
                            $("#organizationEdit").val(result.organization);
                            $("#docNumEdit").val(result.doc_num);
                            $("#codeEdit").val(result.code);
                            $("#publishRegionEdit").val(result.region);
                            $("#startTimeEdit").val(timeFormat(result.starttime));
                            $("#endtimeEdit").val(timeFormat(result.endtime));
                            $("#applyendtimeEdit").val(timeFormat(result.applyendtime));
                            $("#locationEdit").val(result.location);

                            $("#keywordsEdit").val(changeBlank(result.keywords));
                            $("#enkeywordsEdit").val(changeBlank(result.code));
                            $("#bk_authorEdit").val(changeBlank(result.bk_author));
                            $("#journalnameEdit").val(changeBlank(result.bk_unit));
                            $("#lastmodifiedEdit").val(result.bk_date);
                            $("#languageEdit").val(changeBlank(result.language));

                            $("#pageEdit").val(changeBlank(result.page));
                            $("#ISSNEdit").val(changeBlank(result.ISSN));

                            $("#imgSetting").css({"width":"351px","height":"494px"});
                            $("#imgShow_wu_file_1").css({"background-image":"url("+imgSrc+result.picurl+")","height":"100%"});
                            $("#sourceEdit").val(result.page_source);
                            /*存储图片信息*/
                            $existImg.val(result.picurl);

                            /*设置领域*/
                            /*$("#areaEdit").find("input[type='checkbox']").each(function () {
                                $(this).removeAttr("checked");
                                for(var j=0;j<getAreaArr(tdArr[3].innerText).length;j++){
                                    if($(this).attr("data-name")==getAreaArr(tdArr[3].innerText)[j]){
                                        $(this).prop("checked","true");
                                    }
                                }
                            });*/
                            setCheckboxStatus("areaEdit","input[type='checkbox']",tdArr[3].innerText,"checked",true);
                            /*设置子菜单*/
                            /*$("#subMenuEdit").find("option").each(function () {
                                $(this).removeAttr("selected");
                                if($.cookie($(this).val())==(result.srv_subtype)){
                                    $(this).prop("selected",true);
                                }
                            });*/
                            setOptionStatus("subMenuEdit","option",$.cookie(result.srv_subtype),"selected",true);
                            /*设置文献类型*/
                            /*$("#dcoTypeEdit").find("option").each(function () {
                                $(this).removeAttr("selected");
                                if($(this).val()==(result.doc_type)){
                                    $(this).attr("selected",true);
                                }
                            });*/
                            setOptionStatus("dcoTypeEdit","option",result.doc_type,"selected",true);
                            /*法律发文单位*/
                            /* $("#unitEdit").find("option").each(function () {
                                $(this).removeAttr("selected");
                                if($(this).val()==(result.unit)){
                                    $(this).attr("selected",true);
                                }
                            });*/
                            setOptionStatus("unitEdit","option",result.unit,"selected",true);
                            /*法律解读类型设置*/
                            /*$("#interpretTypeEdit").find("option").each(function () {
                                $(this).removeAttr("selected");
                                if($(this).val()==(result.interpret_type)){
                                    $(this).attr("selected",true);
                                }
                            });*/
                            setOptionStatus("interpretTypeEdit","option",result.interpret_type,"selected",true);
                            /*设置热点推荐*/
                            /*if(result.hot_flag){
                                $("#hotflagEdit").prop("checked","true");
                            }*/
                            (result.hot_flag)?$("#hotflagEdit").prop("checked","true"):null;
                            /*清空图片内容*/
                            $("#imgShow_wu_file_1").attr("src","");
                            /*设置内容联动显示*/
                            IgnoreField(result.srv_subtype, 2)
                            /*设置文献显示内容*/
                            EditName(result.doc_type,result.srv_subtype);
                        }
                    }
                });
            });
            /*根据选中菜单设置灰掉内容*/
            /*添加新闻模态框*/
            $addNews.on('click',function () {
                setAllBlank();//清空模态框数据
                /*设置领域*/
                /*$("#areaAdd").find("input[type='checkbox']").each(function () {
                    $(this).removeAttr("checked");
                });*/
                $("#areaAdd").find("input[type='checkbox']").removeAttr("checked");
                /*设置子菜单*/
               /* $("#subMenuAdd").find("option").each(function () {
                    $(this).removeAttr("selected");
                    if($.cookie($(this).val())==submenu){
                        $(this).prop("selected",true);
                    }
                });*/
                setOptionStatus("subMenuAdd","option",$.cookie(submenu),"selected",true);
                /*清空图片内容*/
                $("#imgShow_wu_file_0").attr("src","");
                /*监听content*/
                $("#addcontentWrap").find("div#EditorContent").one('input propertychange',function () {
                    var _this=this;
                    $(_this).find('p').each(function (a,b) {
                        $(this).find('span').css({
                            "font-size":"",
                            "font-family":"",
                            "color":""
                        });
                    });
                });
                /*设置内容联动显示*/
                IgnoreField(submenu, 1)
                /*设置文献显示内容*/
                EditName("",submenu);
            });
            /*批量审核新闻数据*/
            $flagCheck.on('click',function () {
                total=$tablebody.find("input[type='checkbox']:checked").length;
                if($tablebody.find("input[type='checkbox']:checked").length==0){
                    layer.msg("请选中数据",{time:1000});
                }
                else{
                    $tablebody.find("input[type='checkbox']:checked").each(function (a) {
                        var surl = LoadUrl() + "axis2/services/MyService/UpdateCheckFlag";
                        var id=$(this).parents("tr").attr("data-id");
                        var title=$(this).parents("tr").find("td.title").text();
                        bindCheckSuccessForNews(surl,id,1,sessionStorage.getItem("loginName"),title,a,total);
                    });
                }
            });
            /*批量未通过新闻数据*/
            $CheckFail.on('click',function () {
                total=$tablebody.find("input[type='checkbox']:checked").length;
                if($tablebody.find("input[type='checkbox']:checked").length==0){
                    layer.msg("请选中数据",{time:1000});
                }
                else{
                    $tablebody.find("input[type='checkbox']:checked").each(function (a) {
                        var surl = LoadUrl() + "axis2/services/MyService/UpdateCheckFlag";
                        var id=$(this).parents("tr").attr("data-id");
                        var title=$(this).parents("tr").find("td.title").text();
                        bindCheckFailForNews(surl,id,2,sessionStorage.getItem("loginName"),title,a,total);
                    });
                }
            });
            /*添加新闻数据*/
            $meta_add.on('click',function () {
                bindAddForNews();
            });
        }
        /**********************事件绑定操作************************/
        /**
         * 事件绑定-删除新闻信息
         * @param surl(ajax请求地址)
         * @param id(用户的id)
         * @param user(用户名)
         * @param title(新闻标题)
         * @param a(数据序号)
         * @param total(批量操作总数)
         */
        function bindDeleteForNews(surl,id,user,title,a,total) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "id":id,
                    "user":user,
                    "title":title
                },
                dataType: "text",
                success: function (result) {
                    if(loadXML(result)&&(total==a+1)){
                        layer.msg('恭喜您删除成功!', {
                            time: 2500
                        }, function () {
                            window.location.reload();
                        });
                    }
                }
            });
        }
        /**
         * 事件绑定-添加新闻信息
         */
        function bindAddForNews() {
            if($("#titleAdd").val()!=""&&$("#addcontentWrap").find("div#EditorContent").html()!=""&&getSelectedArea(2)!=""){
                if($.cookie($("#subMenuAdd").val())!="18"){
                    $.ajax({
                        type: "POST",
                        url: LoadUrl() + "axis2/services/MyService/UpdateNewCustom",
                        data: {
                            "isNew":true,
                            "id":"",
                            "menu":"",
                            "submenu":$.cookie($("#subMenuAdd").find("option:selected").text()),
                            "area":getSelectedArea(2),
                            "title":$("#titleAdd").val().trim(),
                            "summary":$("#abstractAdd").val().trim(),
                            "content":$("#addcontentWrap").find("div#EditorContent").html(),
                            "url":$("#urlAdd").val().trim(),
                            "lawUnit":$("#unitAdd option:selected").text(),
                            "lawOrg":$("#organizationAdd").val().trim(),
                            "lawNum":$("#docNumAdd").val().trim(),
                            "lawType":$("#interpretTypeAdd option:selected").text(),
                            "docType":$("#dcoTypeAdd option:selected").text(),
                            "code":$("#codeAdd").val().trim(),
                            "publishRegion":$("#publishRegionAdd").val().trim(),
                            "trainStartTime":$("#startTimeAdd").val().trim(),
                            "trainEndTime":$("#endtimeAdd").val().trim(),
                            "signupTime":$("#applyendtimeAdd").val().trim(),
                            "trainLocation":$("#locationAdd").val().trim(),
                            "hotflag":getHotflag(2),
                            "author":sessionStorage.getItem("loginName"),
                            "picurl":$imgPath.val(),
                            "page_source":$("#sourceAdd").val().trim(),
                            "place":"",
                            "country":""
                        },
                        dataType:"text",
                        success: function (result) {
                            var resultJson=JSON.parse(loadXML(result))
                            if(resultJson){
                                layer.msg('恭喜您添加成功!',{
                                    time:1500
                                },function () {
                                    $insertMeta.modal("hide");
                                    window.location.reload();
                                });
                            }else{
                                layer.msg('添加失败!');
                            }
                        }
                    });
                }
                else{
                    $.ajax({
                        type: "POST",
                        url: LoadUrl() + "axis2/services/MyService/UpdateNewByBooks",
                        data: {
                            "isNew":true,
                            "id":"",
                            "menu":"",
                            "submenu":$.cookie($("#subMenuAdd").find("option:selected").text()),
                            "area":getSelectedArea(2),
                            "title":$("#titleAdd").val().trim(),
                            "summary":$("#abstractAdd").val().trim(),
                            "content":$("#addcontentWrap").find("div#EditorContent").html(),
                            "url":$("#urlAdd").val().trim(),
                            "lawUnit":$("#unitAdd option:selected").text(),
                            "lawOrg":$("#organizationAdd").val().trim(),
                            "lawNum":$("#docNumAdd").val().trim(),
                            "lawType":$("#interpretTypeAdd option:selected").text(),
                            "docType":$("#dcoTypeAdd option:selected").text(),
                            /*"code":$("#codeAdd").val(),*/
                            "publishRegion":$("#publishRegionAdd").val().trim(),
                            "trainStartTime":$("#startTimeAdd").val().trim(),
                            "trainEndTime":$("#endtimeAdd").val().trim(),
                            "signupTime":$("#applyendtimeAdd").val().trim(),
                            "trainLocation":$("#locationAdd").val().trim(),
                            "hotflag":getHotflag(2),
                            "author":sessionStorage.getItem("loginName"),
                            "picurl":$imgPath.val(),
                            "page_source":$("#sourceAdd").val().trim(),

                            "code":$("#enkeywordsAdd").val().trim(),
                            "bk_author":$("#bk_authorAdd").val().trim(),
                            "keywords":$("#keywordsAdd").val().trim(),
                            "bk_unit":$("#journalnameAdd").val().trim(),
                            "language":$("#languageAdd").val().trim(),
                            "ISSN":$("#ISSNAdd").val().trim(),
                            "bk_date":$("#lastmodifiedAdd").val().trim(),
                            "page":$("#pageAdd").val().trim()
                        },
                        dataType:"text",
                        success: function (result) {
                            var resultJson=JSON.parse(loadXML(result))
                            if(resultJson){
                                layer.msg('恭喜您添加成功!',{
                                    time:1500
                                },function () {
                                    $insertMeta.modal("hide");
                                    window.location.reload();
                                });
                            }else{
                                layer.msg('添加失败!');
                            }
                        }
                    });
                }
            }else{
                layer.msg("标题,领域,内容为必填项",{time:1000});
                return;
            }
        }
        /**
         * 事件绑定-审核不通过
         * @param surl(ajax请求地址)
         * @param id(用户的id)
         * @param checkFlag(新闻审核状态)
         * @param user(用户名)
         * @param title(新闻标题)
         * @param a(数据序号)
         * @param total(批量操作总数)
         */
        function bindCheckFailForNews(surl,id,checkFlag,user,title,a,total){
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "id":id,
                    "check_flag":parseInt(checkFlag),
                    "user":user,
                    "title":title
                },
                dataType: "text",
                success: function (result) {
                    if((total==a+1)&&loadXML(result)){
                        layer.msg('已设置为不通过!', {
                            time: 1500
                        }, function () {
                            window.location.reload();
                        });
                    }
                }
            });
        }
        /**
         * 事件绑定-审核通过
         * @param surl(ajax请求地址)
         * @param id(用户的id)
         * @param checkFlag(新闻审核状态)
         * @param user(用户名)
         * @param title(新闻标题)
         * @param a(数据序号)
         * @param total(批量操作总数)
         */
        function bindCheckSuccessForNews(surl,id,checkFlag,user,title,a,total){
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "id": id,
                    "check_flag":parseInt(checkFlag),
                    "user":user,
                    "title":title
                },
                dataType: "text",
                success: function (result) {
                    if(total==a+1){
                        layer.msg('已设置为通过!', {
                            time: 1500
                        }, function () {
                            window.location.reload();
                        });
                    }
                }
            });
        }
        /**********************数据获取************************/
        function fetchSubMenudata() {
            var surl = LoadUrl() + "axis2/services/MyService/getAllSubMenuName";
            randerSubMenu(surl,$subMenuAdd,$subMenuEdit);
        }
        function fetchAreadata() {
            var surl = LoadUrl() + "axis2/services/MyService/GetAllAreaCustom";
            randerArea(surl,$area,$areaAdd,$areaEdit);
        }
        function fetchCheckFlagdata() {
            randerCheckFlag($checkflag);
        }
        function fetchAllNewsdata() {
            param.area = "";
            param.startTime = "";
            param.endTime = "";
            param.author = "";
            param.checkflag = "";
            param.slideflag = -1;
            param.stickflag = -1;
            param.id = "";
            param.keyword = "";
            ShowInfo(param);
        }
        /**********************数据渲染************************/
        /**
         * 数据渲染-渲染子菜单
         * @param surl(ajax请求地址)
         * @param parent1(添加子菜单父级元素)
         * @param parent2(编辑子菜单父级元素)
         */
        function randerSubMenu(surl,parent1,parent2) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                },
                dataType: "text",
                contentType: "text/xml",
                success: function (result) {
                    resolveSubMenuData(result,parent1,parent2)
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**
         * 数据渲染-渲染领域
         * @param surl(ajax请求地址)
         * @param parent1(添加领域父级元素)
         * @param parent2(编辑领域父级元素)
         * @param parent3(搜索领域父级元素)
         */
        function randerArea(surl,parent1,parent2,parent3) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                },
                dataType: "text",
                contentType: "text/xml",
                success: function (result) {
                    resolveAreaData(result,parent1,parent2,parent3);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            })
        }
        /**
         * 数据渲染-渲染审核状态
         * @param parent(审核状态父级元素)
         */
        function randerCheckFlag(parent) {
            parent.empty();
            var html='<label  class="checkbox-inline fontSize14 marginl16 flagCheckStatus">'
                +'<input type="checkbox" value="1" data-name="1">已审核'
                +'</label>'
                +'<label  class="checkbox-inline fontSize14 marginl16 flagCheckStatus">'
                +'<input type="checkbox" value="0" data-name="0">未审核'
                +'</label>'
                +'<label  class="checkbox-inline fontSize14 marginl16 flagCheckStatus">'
                +'<input type="checkbox" value="2" data-name="2">未通过'
                +'</label>'
                +'<label  class="checkbox-inline fontSize14 flagCheckStatus" onclick="setAll(this);" style="margin-left: 8px;">全部</label>';
            parent.html(html);
        }
        /**********************数据处理************************/
        /**
         * 数据处理-处理子菜单数据
         * @param result(数据结果)
         * @param parent1(添加子菜单父级元素)
         * @param parent2(编辑子菜单父级元素)
         */
        function resolveSubMenuData(result,parent1,parent2) {
            var resultXml = loadXML(result);
            if(!resultXml||resultXml=="[]"){
                return;
            }
            else{
                var SubMenuHtml = "";
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    $.cookie(b.itemid,b.menu);
                    $.cookie(b.menu,b.itemid);
                    if(a==1){
                        SubMenuHtml +=createAddSubMenuhtml(b);
                    }
                    else {
                        SubMenuHtml += createEditSubMenuhtml(b);
                    }
                });
                //设置添加新闻子菜单
                parent1.html(SubMenuHtml);
                parent2.html(SubMenuHtml);
            }
        }
        /**
         * 数据处理-处理领域数据
         * @param result(数据结果)
         * @param parent1(添加领域父级元素)
         * @param parent2(编辑领域父级元素)
         * @param parent3(搜索领域父级元素)
         */
        function resolveAreaData(result,parent1,parent2,parent3) {
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
                shtml += '<label  class="checkbox-inline flagCheckStatus" onclick="setAll(this);" style="margin-left: 8px;">全部';
                parent1.html(shtml);
                parent2.html(shtml);
                parent3.html(shtml);
            }
        }
        /**********************构造html************************/
        /**
         * 构造html-构造添加子菜单html
         * @param b(单个数据项)
         */
        function createAddSubMenuhtml(b) {
            var html='<option value="' + b.menu + '" data-repeat="0" data-itemid="' + b.itemid + '" selected>' + b.menu + '</option>';
            return html;
        }
        /**
         * 构造html-构造编辑子菜单html
         * @param b(单个数据项)
         */
        function createEditSubMenuhtml(b) {
            var html='<option value="' + b.menu + '" data-repeat="0" data-itemid="' + b.itemid + '">' + b.menu + '</option>';
            return html;
        }
        /**
         * 构造html-构造领域html
         * @param b(单个数据项)
         */
        function createAreaHtml(b) {
            var html='<label  class="checkbox-inline marginl16 flagCheckStatus"><input type="checkbox" data-name="' + b.name + '" value="' + b.name + '">' + b.name + '</label>';
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
            IgnoreField(submenu,3);//根据子菜单设置灰掉的字段
            setAuthorities();
            setWenxian(submenu);
            //拖拽上传图片
            bindDragUpload($(".imgSetting"));
        }
        function setAuthorities() {
            $.cookie("AuditingLimit")=="无"?setAuthority():null;
            function setAuthority() {
                $flagCheck.addClass("hide");
                $CheckFail.addClass("hide");
            }
        }
        return {
            init:init
        }//返回init函数
    })();
    NewsDetailsList.init();//新闻信息初始化
});//新闻详情管理模块