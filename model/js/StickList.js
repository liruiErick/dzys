/**
 * Created by lirui on 2017/6/13.
 */
$(function () {

    /**********************操作对象************************/
    var $UnStickList=$("#UnStickList");
    var $unStickNometa=$("#unStickNometa");
    var $pagingidUnStick=$("#pagingidUnStick");
    var $StickList=$("#StickList");
    var $sticknometa=$("#sticknometa");
    var $pagingidStick=$("#pagingidStick");
    var $searchSubmenu=$("#searchSubmenu");
    var $searchSubmenuStick=$("#searchSubmenuStick");
    var $search=$("#search");
    var $searchStick=$("#searchStick");
    var $searchKeyword=$("#searchKeyword");
    var $setStick=$("#setStick");
    var $cancelStick=$("#cancelStick");
    var $editStick=$("#editStick");
    var $metaSave=$("#meta_save");
    var $editStickbody=$("#editStickbody");
    var $insertMeta=$('#insert_meta');
    var $existsImg=$("#existsImg");
    var $existsSmallImg=$("#existsSmallImg");
    var $myTab=$("#myTab");
    var $IndexId=$("#IndexId");
    var $editTopFlag=$("#editTopFlag");
    var $addTopFlag=$("#addTopFlag");
    var pageSize = 6;//每页显示数据条数
    var unstickpageCount = 0;//置顶新闻起始页
    var stickpageCount = 0;//未置顶新闻起始页
    var displayNums = 6;//默认预览页数
    var bBtn=false;//判断是设置置顶时编辑,还是已设置成置顶后的编辑
    var submenu;
    var $imgPath=$("#imgPath");
    var imgSrc="../../images/";//图片默认路径


    var StickList=(function () {
        /**********************初始化************************/
        function init() {
            fetchdata();
            bindEvent();
        }
        /**********************数据初始化************************/
        function fetchdata() {
            fetchSubMenudata();
        }
        /**********************绑定事件************************/
        function bindEvent() {
            /*按条件检索未置顶信息*/
            $search.on('click',function () {
                /*更新检索内容时数据显示状态*/
                !$unStickNometa.hasClass("hide")?$unStickNometa.addClass("hide"):null;
                /*更新检索时分页显示状态*/
                $pagingidUnStick.empty();
                $myTab.find("li").each(function () {
                    /*按照内容检索*/
                    if ($(this).hasClass("active") && $(this).attr("data-id") == "1") {
                        submenu=$searchSubmenu.find("option:selected").text()=="全部"?"":$.cookie($searchSubmenu.find("option:selected").text());
                        ShowInfoUnstick(pageSize,1,submenu,"","","","","",-1,0,"",$searchKeyword.val().trim());
                    }
                    /*按照id检索*/
                    if ($(this).hasClass("active") && $(this).attr("data-id") == "2") {
                        ShowInfoUnstick(pageSize,1,"","","","","","",-1,-1,$IndexId.val().trim(),"");
                    }
                });
            });
            /*按条件检索置顶信息*/
            $searchStick.on('click',function () {
                /*更新检索内容时数据显示状态*/
                !$sticknometa.hasClass("hide")?$sticknometa.addClass("hide"):null;
                /*更新检索时分页显示状态*/
                $pagingidStick.empty();
                submenu=$.cookie($searchSubmenuStick.find("option:selected").text());
                ShowInfostick(pageSize,1,submenu,"","","","","",-1,1,"","");
            });
            /*加入置顶*/
            $setStick.on('click',function () {
                var StickTr=0;//判断是否选中新闻内容
                $UnStickList.find("tr").each(function () {
                    if($(this).hasClass("slideActive")){
                        bBtn=true;
                        binkAddResolveDataforStick($(this));
                        //拖拽上传图片
                        bindDragUpload($(".imgSetting"));
                        bindDragUpload($(".imgSettingHuge"));
                    }
                    else{
                        StickTr++;
                    }
                });
                if($UnStickList.find("tr").length==StickTr){
                    layer.msg("请选中新闻");
                    return;
                }
            });
            /*取消置顶*/
            $cancelStick.on('click',function () {
                var StickTr=0;//判断是否选中新闻内容
                $StickList.find("tr").each(function () {
                    if($(this).hasClass("slideActive")){
                        var submenu=$(this).attr("data-submenu");
                        binkDeleteforStick(LoadUrl() + "axis2/services/MyService/UpdateStickFlagCustom",0,$(this).attr("data-id"));
                    }
                    else{
                        StickTr++;
                    }
                });
                if($StickList.find("tr").length==StickTr){
                    layer.msg("请选中新闻");
                    return;
                }
            });
            /*编辑置顶模态框*/
            $editStick.on('click',function () {
                var StickTr=0;//判断是否选中新闻内容
                $StickList.find("tr").each(function () {
                    if($(this).hasClass("slideActive")){
                        binkAddResolveDataforStick($(this));
                        //拖拽上传图片
                        bindDragUpload($(".imgSetting"));
                        bindDragUpload($(".imgSettingHuge"));
                    }
                    else{
                        StickTr++;
                    }
                });
                if($StickList.find("tr").length==StickTr){
                    layer.msg("请选中新闻");
                    return;
                }
            });
            /*置顶编辑*/
            $metaSave.click(function () {
                var _this=this;
                var subMenu=$("#editStickTitle").attr("data-subMenu");
                var title=$("#editStickTitle").val().trim();
                var id=$("#editStickTitle").attr("data-id");
                var Abstract=$("#editStickAbstract").val().trim();
                var existsImg=$existsImg.val()==""?$existsSmallImg.val():$existsImg.val();
                var addTopFlag;
                var editTopFlag;
                var ImgBtn=false;
                $("#SelectImg").find("li").each(function () {
                    if($(this).hasClass('active')&&parseInt($(this).data("id"))==1){
                        addTopFlag=1;
                        editTopFlag=1;
                        ImgBtn=!ImgBtn;
                        if($(".imgSettingHuge").find("img").attr("src")=="../../images/"){
                            existsImg="";
                        }
                        return;
                    }
                    else if($(this).hasClass('active')&&parseInt($(this).data("id"))==2){
                        addTopFlag=0;
                        editTopFlag=0;
                        if($(".imgSetting").find("img").attr("src")=="../../images/"){
                            existsImg="";
                        }
                        ImgBtn=!ImgBtn;
                        return;
                    }
                });
                if(ImgBtn){
                    var surl=LoadUrl() + "axis2/services/MyService/UpdateStickTitle";
                    if (bBtn) {
                        binkAddforStick(surl,id,title,Abstract,existsImg,addTopFlag,0);
                    }
                    else {
                        binkAddforStick(surl,id,title,Abstract,existsImg,editTopFlag,1);
                    }
                }
            });
        }
        /**********************事件绑定操作************************/
        /**
         * 事件绑定-添加置顶数据解析
         * @param obj(添加置顶的对象)
         */
        function binkAddResolveDataforStick(obj) {
            $addTopFlag.val("");
            $editTopFlag.val("");
            var tdArr = obj.find('td');
            $insertMeta.modal('show');
            var selId=obj.attr("data-id");
            var abstract=obj.attr("data-abstract");
            var title=obj.attr("data-title");
            var imgMes=obj.attr("data-stickPic");
            var topFlag=obj.attr("data-topFlag");
            var smallSrc=JudjeImgType(obj.attr("data-topFlag"),imgMes).smallImgSrc;
            var hugeSrc=JudjeImgType(obj.attr("data-topFlag"),imgMes).hugeImgSrc;
            var subMenu=obj.attr("data-subMenu");
            $existsImg.val(hugeSrc);
            $existsSmallImg.val(smallSrc);
            $editStickbody.empty();
            $editStickbody.html(createNewsModelHtml(selId,title,abstract,smallSrc,hugeSrc,subMenu));
            SetImgStatus($.cookie(tdArr[2].innerText),$("#selectjishudongtai"),$("#selectfalvjiedu"),$("#selectshichangguancha"),$("#selectImg"),$("#jishudongtai"),$("#falvjiedu"),$("#shichangguancha"),smallSrc,hugeSrc,$("#SelectImg"),$("#selectHugeImg"),$("#selectSmallImg"),topFlag);
            switch ($.cookie(tdArr[2].innerText)){
                case "10":case "14":case "17":
                $("#imgTips").removeClass("hide");
                break;
                default:
                    $("#imgTips").addClass("hide");
                    break;
            }
        }
        /**
         * 事件绑定-取消置顶
         * @param surl(ajax请求地址)
         * @param id(置顶的id)
         * @param stickFlag(置顶的置顶状态)
         */
        function binkDeleteforStick(surl,stickFlag,id) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "stick_flag":stickFlag,
                    "id":id
                },
                dataType: "text",
                success: function (result) {
                    DeleteSuccessTips();
                }
            });
        }
        /**
         * 事件绑定-添加置顶
         * @param surl(ajax请求地址)
         * @param id(置顶的id)
         * @param title(置顶的标题)
         * @param summary(置顶的摘要)
         * @param pic(置顶的图片)
         * @param url(置顶链接地址)
         * @param type(操作类型)
         */
        function binkAddforStick(surl,id,title,summary,pic,topFlag,type) {
            var finalPic=pic==""?$imgPath.val():pic;
            if(parseInt(type)==1){
                binkAddAjaxforStick(surl,id,title,summary,finalPic,topFlag,EditSuccessTips,"");
            }else{
                binkAddAjaxforStick(surl,id,title,summary,finalPic,topFlag,"",upFlag);
            }
        }
        /**
         * 事件绑定-添加置顶的ajax请求
         * @param surl(ajax请求地址)
         * @param id(置顶的id)
         * @param title(置顶的标题)
         * @param summary(置顶的摘要)
         * @param finalPic(置顶的图片)
         * @param topFlag(置顶链接地址)
         * @param ResultFunction(结果提示)
         * @param callBack(回调函数)
         */
        function binkAddAjaxforStick(surl,id,title,summary,finalPic,topFlag,ResultFunction,callBack) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "id": id,
                    "title": title,
                    "summary": summary,
                    "pic": finalPic,
                    "top_flag":topFlag
                },
                dataType: "text",
                success: function (result) {
                    ResultFunction&&ResultFunction!=""?ResultFunction():null;
                    callBack&&callBack!=""?callBack(id):null;
                }
            });
        }
        /**********************数据获取************************/
        function fetchSubMenudata() {
            randerSubMenu(LoadUrl() + "axis2/services/MyService/getAllSubMenuName",$searchSubmenu,$searchSubmenuStick);
        }
        function fetchNewsdata() {
            /*更新数据显示状态*/
            !$unStickNometa.hasClass("hide")?$unStickNometa.addClass("hide"):null;
            /*更新分页显示状态*/
            $pagingidUnStick.empty();
            /*更新数据显示状态*/
            !$sticknometa.hasClass("hide")?$sticknometa.addClass("hide"):null;
            /*更新检索时分页显示状态*/
            $pagingidStick.empty();
            ShowInfoUnstick(pageSize,1,"","","","","","",-1,0,"","");
            ShowInfostick(pageSize,1,"","","","","","",-1,1,"","");
        }
        /**********************数据渲染************************/
        /**
         * 数据渲染-渲染子菜单内容
         * @param surl(ajax请求地址)
         * @param parent(子菜单父级对象)
         */
        function randerSubMenu(surl,parent1,parent2) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                },
                dataType: "text",
                contentType:"text/xml",
                success: function (result) {
                    resolveSubMenuData(result,parent1,parent2);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**
         * 数据渲染-渲染未设置顶新闻
         * @param nurl(ajax请求地址)
         * @param parent(指数分类父级元素)
         * @param nometa(无内容时提示)
         * @param pagingid(分页对象)
         * @param pageSize(没有显示数量)
         * @param currentIndex(当前页)
         * @param submenu(子菜单名称)
         * @param area(领域内容)
         * @param startTime(起始时间)
         * @param endTime(结束时间)
         * @param author(责任人)
         * @param checkflag(审核状态)
         * @param slideflag(置顶状态)
         * @param stickflag(置顶状态)
         * @param id(关键字)
         * @param keyword(关键字)
         */
        function renderUnstickNews(nurl,parent,nometa,pagingid,pageSize,currentIndex,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword) {
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                    "pageIndex": Number(currentIndex),
                    "pageSize": Number(pageSize),
                    "submenu": submenu,
                    "area": area,
                    "startTime": startTime,
                    "endTime": endTime,
                    "author": author,
                    "slideflag": Number(slideflag),
                    "stickflag": Number(stickflag),
                    "checkflag": checkflag,
                    "id": id,
                    "keyword": keyword
                },
                dataType: "text",
                success: function (result) {
                    resolveUnstickNewsData(result,parent,nometa,pagingid,pageSize,currentIndex,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**
         * 数据渲染-渲染已设置顶新闻
         * @param nurl(ajax请求地址)
         * @param parent(指数分类父级元素)
         * @param nometa(无内容时提示)
         * @param pagingid(分页对象)
         * @param pageSize(没有显示数量)
         * @param currentIndex(当前页)
         * @param submenu(子菜单名称)
         * @param area(领域内容)
         * @param startTime(起始时间)
         * @param endTime(结束时间)
         * @param author(责任人)
         * @param checkflag(审核状态)
         * @param slideflag(置顶状态)
         * @param stickflag(置顶状态)
         * @param id(关键字)
         * @param keyword(关键字)
         */
        function renderStickNews(nurl,parent,nometa,pagingid,pageSize,currentIndex,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword) {
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                    "pageIndex": Number(currentIndex),
                    "pageSize": Number(pageSize),
                    "submenu": submenu,
                    "area": area,
                    "startTime": startTime,
                    "endTime": endTime,
                    "author": author,
                    "slideflag": Number(slideflag),
                    "stickflag": Number(stickflag),
                    "checkflag": checkflag,
                    "id": id,
                    "keyword": keyword
                },
                dataType: "text",
                success: function (result) {
                    resolveStickNewsData(result,parent,nometa,pagingid,pageSize,currentIndex,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword);
                }
            });
        }
        /**
         * 数据渲染-渲染新闻
         * @param nurl(ajax请求地址)
         * @param parent(指数分类父级元素)
         * @param nometa(无内容时提示)
         * @param id(关键字)
         */
        function renderSearchNews(nurl,parent,nometa,id) {
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                    "indexId":id
                },
                dataType: "text",
                success: function (result) {
                    resolveSearchNewsData(result,parent,nometa,id);
                },
                error:function (mes) {
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
        function resolveSubMenuData(result,parent1,parent2) {
            var resultXml = loadXML(result);
            parent1.empty();
            parent2.empty();
            if(resultXml=="[]"||!resultXml){
                return;
            }
            else{
                var SubMenuHtml="";//子菜单列表的html
                var Html='<option value="全部">全部</option>';;//置顶子菜单列表的html
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b){
                    $.cookie(b.itemid,b.menu);
                    $.cookie(b.menu,b.itemid);
                    SubMenuHtml +=createSubmenuHtml(b);
                    Html +=createSubmenuHtml(b);
                });
                /*设置添加新闻子菜单*/
                parent1.html(Html);
                parent2.html(SubMenuHtml);
                fetchNewsdata();//渲染置顶新闻数据
            }
        }
        /**
         * 数据处理-处理未设置顶新闻数据
         * @param result(置顶数据)
         * @param parent(指数分类父级元素)
         * @param nometa(无内容时提示)
         * @param pagingid(分页对象)
         * @param pageSize(没有显示数量)
         * @param currentIndex(当前页)
         * @param submenu(子菜单名称)
         * @param area(领域内容)
         * @param startTime(起始时间)
         * @param endTime(结束时间)
         * @param author(责任人)
         * @param checkflag(审核状态)
         * @param slideflag(置顶状态)
         * @param stickflag(置顶状态)
         * @param id(关键字)
         * @param keyword(关键字)
         */
        function resolveUnstickNewsData(result,parent,nometa,pagingid,pageSize,currentIndex,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword) {
            var resultXml = loadXML(result);
            parent.empty();
            if (!resultXml || resultXml == "[]") {
                nometa.removeClass("hide");
            }
            else {
                var unslideHtml = "";
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    unstickpageCount = b.total;
                    if(a==resultJson.length-1){
                        unslideHtml +=createUnstickNewsHtml(b,1);
                    }else{
                        unslideHtml +=createUnstickNewsHtml(b,0);
                    }
                });
                parent.html(unslideHtml);
                var num = 0;
                if (unstickpageCount % pageSize == 0) {
                    num = Math.floor(unstickpageCount / pageSize);
                }
                else {
                    num = Math.floor(unstickpageCount / pageSize) + 1;
                }
                pagingid.paginate({
                    count: num,
                    start: currentIndex,
                    display: displayNums,
                    border: true,
                    border_color: '#fffff',
                    text_color: '#828282',
                    background_color: '#f2f2f2',
                    border_hover_color: '#fff',
                    text_hover_color: '#fff',
                    background_hover_color: '#00aaff',
                    images: false,
                    mouse: 'press',
                    onChange: function (p) {
                        ShowInfoUnstick(pageSize,p,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword)
                    }
                });
            }
        }
        /**
         * 数据处理-处理已设置顶新闻数据
         * @param result(置顶数据)
         * @param parent(指数分类父级元素)
         * @param nometa(无内容时提示)
         * @param pagingid(分页对象)
         * @param pageSize(没有显示数量)
         * @param currentIndex(当前页)
         * @param submenu(子菜单名称)
         * @param area(领域内容)
         * @param startTime(起始时间)
         * @param endTime(结束时间)
         * @param author(责任人)
         * @param checkflag(审核状态)
         * @param slideflag(置顶状态)
         * @param stickflag(置顶状态)
         * @param id(关键字)
         * @param keyword(关键字)
         */
        function resolveStickNewsData(result,parent,nometa,pagingid,pageSize,currentIndex,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword) {
            var resultXml = loadXML(result);
            parent.empty();
            if (!resultXml || resultXml == "[]") {
                nometa.removeClass("hide");
            }
            else {
                var slideHtml = "";
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    stickpageCount = b.total;
                    if(a==resultJson.length-1){
                        slideHtml +=createStickNewsHtml(b,1);
                    }else{
                        slideHtml +=createStickNewsHtml(b,0);
                    }
                });
                parent.html(slideHtml);
                var num = 0;
                if (stickpageCount % pageSize == 0) {
                    num = Math.floor(stickpageCount / pageSize);
                }
                else {
                    num = Math.floor(stickpageCount / pageSize) + 1;
                }
                pagingid.paginate({
                    count: num,
                    start: currentIndex,
                    display: displayNums,
                    border: true,
                    border_color: '#fffff',
                    text_color: '#828282',
                    background_color: '#f2f2f2',
                    border_hover_color: '#fff',
                    text_hover_color: '#fff',
                    background_hover_color: '#00aaff',
                    images: false,
                    mouse: 'press',
                    onChange: function (p) {
                        ShowInfostick(pageSize, p, submenu, area, startTime, endTime, author, checkflag, slideflag, stickflag, id, keyword)
                    }
                });
            }
        }
        /**
         * 数据处理-处理搜索新闻数据
         * @param result(新闻数据)
         * @param parent(新闻数据父级对象)
         * @param nometa(无内容时提示)
         * @param id(新闻id)
         */
        function resolveSearchNewsData(result,parent,nometa,id) {
            var resultXml = loadXML(result);
            parent.empty();
            if (!resultXml || resultXml == "[]") {
                nometa.removeClass("hide");
            }
            else {
                var html = "";
                var result = jQuery.parseJSON(resultXml);
                html +=createUnstickNewsHtml(result,1);
                parent.html(html);
            }
        }
        /**********************构造html************************/
        /**
         * 构造html-构造添加子菜单html
         * @param b(单个数据项)
         */
        function createSubmenuHtml(b) {
            var html='<option value="'+b.menu+'" data-id="'+b._id+'" data-itemId="'+b.itemid+'">'+b.menu+'</option>';
            return html;
        }
        /**
         * 构造html-构造未设置顶新闻html
         * @param b(单个数据项)
         */
        function createUnstickNewsHtml(b,type) {
            var html='<tr data-id="' + b.id + '" data-title="'+ b.title +'" data-abstract="'+ b.stick_abstract +'" data-stickPic="'+ b.stick_pic +'" data-stickFlag="'+ b.stick_flag +'" data-topFlag="'+ b.top_flag +'" data-subMenu="'+ $.cookie(b.srv_subtype) +'">'
                + '<td class="indexId" onclick="selectedTr(this,1);">' + b.id + '</td>'
                + '<td class="title text-left" onclick="selectedTr(this,1);" title="'+b.title+'" '+ ((type === 1) ? ('style="border-bottom:0"') :'')+'>' +b.title + '</td>'
                + '<td class="submenu" onclick="selectedTr(this,1);">' + $.cookie(b.srv_subtype) + '</td>'
                + '</tr>';
            return html;
        }
        /**
         * 构造html-构造已设置顶新闻html
         * @param b(单个数据项)
         */
        function createStickNewsHtml(b,type) {
            var html='<tr data-id="' + b.id + '" data-title="'+ b.title +'" data-abstract="' + b.stick_abstract + '" data-stickPic="'+ b.stick_pic +'" data-stickFlag="'+ b.stick_flag +'" data-topFlag="'+ b.top_flag +'" data-subMenu="'+ $.cookie(b.srv_subtype) +'">'
                + '<td class="indexId" onclick="selectedTr(this,2);">' + b.id + '</td>'
                + '<td class="title text-left" onclick="selectedTr(this,2);" title="'+b.title+'" '+ ((type === 1) ? ('style="border-bottom:0"') :'')+'>' + b.title + '</td>'
                + '<td class="submenu" onclick="selectedTr(this,2);">' + $.cookie(b.srv_subtype) + '</td>'
                + '<td class="pic" onclick="selectedTr(this,2);">' + b.stick_pic + '</td>'
                + '<td class="topShow" onclick="selectedTr(this,2);">' + JudgeTopShow(b.isTop) + '</td>'
                + '<td class="picScale" onclick="selectedTr(this,2);">' +JudgePic(b.top_flag,b.isTop)+ '</td>'
                + '</tr>';
            return html;
        }
        /**
         * 构造html-构造置顶新闻模态框html
         * @param id(新闻id)
         * @param title(新闻标题)
         * @param abstract(新闻摘要)
         * @param smallSrc(置顶小图)
         * @param hugeSrc(置顶大图)
         */
        function createNewsModelHtml(id,title,abstract,smallSrc,hugeSrc,subMenu) {
            var html='<div class="form-group">'
                +'<label  class="col-sm-2 control-label">标题'
                +'<span class="must_sym">*</span>'
                +'</label>'
                +'<div class="col-sm-10">'
                +'<textarea type="text" class="form-control"  data-id="'+id+'" data-subMenu="'+subMenu+'" id="editStickTitle" rows="1" cols="1" placeholder="请输入标题">'+title+'</textarea>'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-2 control-label">摘要'
                +'<span class="must_sym">*</span>'
                +'</label>'
                +'<div class="col-sm-10">'
                +'<textarea type="text" class="form-control"  id="editStickAbstract" rows="6" cols="4" placeholder="请输入摘要">'+abstract+'</textarea>'
                +'</div>'
                +'</div>'
                +'<div class="form-group" id="selectImg">'
                +'<label class="col-sm-2 control-label">图片'
                +'<span class="must_sym">*</span>'
                +'</label>'
                +'<div class="col-sm-10">'
                +'<ul id="imgTab" class="nav nav-tabs">'
                +'<li data-id="1" id="selectjishudongtai"><a href="javascript:;" data-toggle="tab" class="fontSize14">技术动态(首页)</a></li>'
                +'<li data-id="2" id="selectfalvjiedu"><a class="fontSize14" href="javascript:;" data-toggle="tab">法律解读</a></li>'
                +'<li data-id="3" id="selectshichangguancha"><a class="fontSize14" href="javascript:;" data-toggle="tab">市场观察</a></li>'
                +'</ul>'
                +'<div id="imgTabContent" class="tab-content overflowHidden">'
                +'<div class="tab-pane fade" id="jishudongtai">'
                +'<ul id="SelectImg" class="nav nav-tabs">'
                +'<li data-id="1"><a href="#selectHugeImg"  class="fontSize14 paddingTB5LR7" data-toggle="tab">大图</a></li>'
                +'<li data-id="2"><a href="#selectSmallImg" class="fontSize14 paddingTB5LR7" data-toggle="tab">小图</a></li>'
                +'</ul>'
                +'<div id="SelectImgContent" class="tab-content overflowHidden">'
                +'<div class="tab-pane fade" id="selectHugeImg">'
                +'<div class="col-sm-12 paddingTB10LF0">'
                +'<input type="file" accept="image/png,image/jpg,image/jpeg,image/gif,image/jpg" name="up_img_wu_file_0"  id="up_img_wu_file_0"  onchange="selectImage(this);" class="form-control selectImgStick" multiple="multiple" placeholder="图片链接"/>'
                +'<span class="upload btn btn-primary uploadImg" id="UploadOne" onclick="unLoadImg(this);">上传图片</span>'
                +'<div class="suggectSize">建议比例426:276(像素)</div>'
                +'<div class="imgSettingHuge">'
                +'<img id="imgShow_wu_file_0" src="'+imgSrc+hugeSrc+'" class="prevImg"/>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'<div class="tab-pane fade" id="selectSmallImg">'
                +'<div class="col-sm-12 paddingTB10LF0">'
                +'<input type="file" accept="image/png,image/jpg,image/jpeg,image/gif,image/jpg" name="up_img_wu_file_1"  id="up_img_wu_file_1"  onchange="selectImage(this);" class="form-control selectImgStick" multiple="multiple" placeholder="图片链接"/>'
                +'<span class="upload btn btn-primary uploadImg" id="UploadTwo" onclick="unLoadImg(this);">上传图片</span>'
                +'<div  class="suggectSize">建议比例235:152(像素)</div>'
                +'<div class="imgSetting">'
                +'<img id="imgShow_wu_file_1" src="'+imgSrc+smallSrc+'" class="prevImg"/>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'<div class="tab-pane fade" id="falvjiedu">'
                +'<div class="col-sm-12 paddingTB10LF0">'
                +'<input type="file" accept="image/png,image/jpg,image/jpeg,image/gif,image/jpg" name="up_img_wu_file_2"  id="up_img_wu_file_2"  onchange="selectImage(this);" class="form-control selectImgStick" multiple="multiple" placeholder="图片链接"/>'
                +'<span class="upload btn btn-primary uploadImg" id="UploadThree" onclick="unLoadImg(this);">上传图片</span>'
                +'<div  class="suggectSize">建议比例235:152(像素)</div>'
                +'<div class="imgSetting">'
                +'<img id="imgShow_wu_file_2" src="'+imgSrc+smallSrc+'" class="prevImg"/>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'<div class="tab-pane fade" id="shichangguancha">'
                +'<div class="col-sm-12 paddingTB10LF0">'
                +'<input type="file" accept="image/png,image/jpg,image/jpeg,image/gif,image/jpg" name="up_img_wu_file_3"  id="up_img_wu_file_3"  onchange="selectImage(this);" class="form-control selectImgStick" multiple="multiple" placeholder="图片链接"/>'
                +'<span class="upload btn btn-primary uploadImg" id="UploadFour" onclick="unLoadImg(this);">上传图片</span>'
                +'<div class="suggectSize">建议比例235:152(像素)</div>'
                +'<div class="imgSetting">'
                +'<img id="imgShow_wu_file_3" src="'+imgSrc+smallSrc+'" class="prevImg"/>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'<div class="form-group" id="imgTips">'
                +'<label  class="col-sm-12 control-label text-center">'
                +'<span class="uploadImgTips">上传图片必须点击上传按钮!!</span>'
                +'</label>'
                +'</div>';
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
        function upFlag(id) {
            var nurl = LoadUrl() + "axis2/services/MyService/UpdateStickFlagCustom";
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                    "stick_flag": 1,
                    "id": id
                },
                dataType: "text",
                success: function (result) {
                    layer.msg('编辑并置顶成功', function () {
                        bBtn = false;
                        window.location.reload();
                    });
                }
            });
        }
        function EditSuccessTips() {
            layer.msg('恭喜您编辑置顶成功!', {
                time: 1500
            },function () {
                window.location.reload();
            });
        }
        function DeleteSuccessTips() {
            layer.msg('恭喜您取消置顶成功!', {
                time: 1500
            },function () {
                window.location.reload();
            });
        }
        function JudgePic(toPflag,isTop) {
            var FinalPflag=!toPflag&&toPflag!=0?-2:toPflag;
            var FinalTop=!isTop&&isTop!=0?-2:isTop;
            if(parseInt(toPflag)==1&&parseInt(isTop)==1){
                return "大图";
            }else if(parseInt(toPflag)==0&&parseInt(isTop)==1){
                return "小图";
            }else{
                return "";
            }
        }
        function JudgeTopShow(isTop){
            var FinalTop=!isTop&&isTop!=0?-2:isTop;
            if(parseInt(isTop)==1){
                return "是";
            }else{
                return "";
            }
        }
        /**
         * 辅助操作--存储图片信息
         * @param type(图片类型)
         * @param ImgMes(图片信息 )
         */
        function JudjeImgType(type,ImgMes){
            var Src={
                smallImgSrc:"",
                hugeImgSrc:""
            };
            parseInt(type)==1?Src.hugeImgSrc=ImgMes:Src.smallImgSrc=ImgMes;
            return Src;
        }
        //根据菜单类型设置是否上传图片及其格式
        function SetImgStatus(type,obj1,obj2,obj3,parent,child1,child2,child3,smallSrc,hugeSrc,liParent,HugeLi,SmallLi,topFlag) {
            switch (type){
                case "10":
                    obj2.addClass("hide");
                    obj3.addClass("hide");
                    !child1.hasClass("active in")?child1.addClass("active in"):null;
                    if(hugeSrc==""&&smallSrc!=""&&parseInt(topFlag)==0){
                        liParent.find("li").eq(1).addClass("active");
                        SmallLi.addClass("active in");
                    }else if(hugeSrc!=""&&smallSrc==""&&parseInt(topFlag)==1){
                        liParent.find("li").eq(0).addClass("active");
                        HugeLi.addClass("active in");
                    }else if(hugeSrc==""&&smallSrc==""&&parseInt(topFlag)==0){
                        liParent.find("li").eq(1).addClass("active");
                        SmallLi.addClass("active in");
                    }else if(hugeSrc==""&&smallSrc==""&&parseInt(topFlag)==1){
                        liParent.find("li").eq(0).addClass("active");
                        HugeLi.addClass("active in");
                    }else{
                        liParent.find("li").eq(0).addClass("active");
                        HugeLi.addClass("active in");
                    }
                    break;
                case "14":
                    obj1.addClass("hide");
                    obj3.addClass("hide");
                    !child2.hasClass("active in")?child2.addClass("active in"):null;
                    break;
                case "17":
                    obj1.addClass("hide");
                    obj2.addClass("hide");
                    !child3.hasClass("active in")?child3.addClass("active in"):null;
                    break;
                default:
                    parent.addClass("hide");
                    break;
            }
        }
        //获取未设置成置顶新闻数据并渲染,及进行分页交互
        function ShowInfoUnstick(pageSize,currentIndex,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword) {
            if (!id) {
                var nurl = LoadUrl() + "axis2/services/MyService/QueryNewsCustom";
                renderUnstickNews(nurl,$UnStickList,$unStickNometa,$pagingidUnStick,pageSize,currentIndex,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword);
            }
            else {
                var nurl = LoadUrl() + "axis2/services/MyService/getLawDetails";
                renderSearchNews(nurl,$UnStickList,$unStickNometa, id);
            }
        }
        //获取已设置成置顶新闻数据并渲染,及进行分页交互
        function ShowInfostick(pageSize,currentIndex,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword) {
            var nurl = LoadUrl() + "axis2/services/MyService/QueryNewsCustom";
            renderStickNews(nurl,$StickList,$sticknometa,$pagingidStick,pageSize,currentIndex,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword);
        }
        return {
            init:init
        }//返回init函数
    })();
    StickList.init();//置顶信息初始化
});//置顶管理模块