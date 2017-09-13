/**
 * Created by lirui on 2017/6/13.
 */
$(function () {

    /**********************操作对象************************/
    var $slidenometa=$("#slidenometa");
    var $unslidenometa=$("#unslidenometa");
    var $pagingidUnSlide=$("#pagingidUnSlide");
    var $pagingidSlide=$("#pagingidSlide");
    var $Unslide=$("#Unslide");
    var $Slide=$("#Slide");
    var $searchSubmenu=$("#searchSubmenu");
    var $search=$("#search");
    var $searchKeyword=$("#searchKeyword");
    var $setSlide=$("#setSlide");
    var $cancelSlide=$("#cancelSlide");
    var $editSlide=$("#editSlide");
    var $editMetaSave=$("#edit_meta_save");
    var $insertMeta=$('#insert_meta');
    var $editSlidebody=$("#editSlidebody");
    var $imgPath=$("#imgPath");
    var $existsImg=$("#existsImg");
    var $imgSetting=$(".imgSetting");
    var $myTab=$("#myTab");
    var $IndexId=$("#IndexId");
    var $AddSlide=$("#AddSlide");
    var slidepageSize = 3;//幻灯片列表每页显示数据条数
    var unslidepageSize = 6;//新闻列表每页显示数据条数
    var slidepageCount=0;//新闻列表起始页
    var unslidepageCount=0;//新闻列表起始页
    var displayNums = 6;//默认预览页数
    var bBtn=false;//判断是设置幻灯片时编辑,还是已设置成幻灯片后的编辑
    var status=false;
    var submenu;
    var imgSrc="../../images/";//图片默认路径


    var SlideList=(function () {
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
            /*按条件检索幻灯片信息*/
            $search.on('click',function () {
                /*更新检索内容时数据显示状态*/
                !$unslidenometa.hasClass("hide")?$unslidenometa.addClass("hide"):null;
                /*更新检索时分页显示状态*/
                $pagingidUnSlide.empty();
                $myTab.find("li").each(function () {
                    /*按照内容检索*/
                    if ($(this).hasClass("active") && $(this).attr("data-id") == "1") {
                        submenu=$("#searchSubmenu").find("option:selected").text()=="全部"?"":$.cookie($("#searchSubmenu").find("option:selected").text());
                        ShowInfoUnslide(unslidepageSize,1,submenu,"","","","","",0,-1,"",$searchKeyword.val().trim());
                    }
                    /*按照id检索*/
                    if ($(this).hasClass("active") && $(this).attr("data-id") == "2") {
                        ShowInfoUnslide(unslidepageSize,1,"","","","","","",-1,-1,$IndexId.val().trim(),"");
                    }
                });
            });
            /*加入幻灯片*/
            $setSlide.on('click',function () {
                var SlideTr=0;//判断是否选中新闻内容
                $Unslide.find("tr").each(function () {
                    if($(this).hasClass("slideActive")){
                        bBtn=true;
                        binkAddResolveDataforSlide($(this));
                        //拖拽上传图片
                        bindDragUpload($(".imgSetting"));
                    }
                    else {
                        SlideTr++;
                    }
                });
                if($Unslide.find("tr").length==SlideTr) {
                    layer.msg("请选中新闻");
                    return;
                }
            });
            /*取消幻灯片*/
            $cancelSlide.on('click',function () {
                var SlideTr=0;//判断是否选中新闻内容
                $Slide.find("tr").each(function () {
                    if($(this).hasClass("slideActive")){
                        binkDeleteforSlide(LoadUrl() + "axis2/services/MyService/UpdateSlideFlag",0,$(this).attr("data-id"));
                    }
                    else{
                        SlideTr++;
                    }
                });
                if($Slide.find("tr").length==SlideTr) {
                    layer.msg("请选中新闻");
                    return;
                }
            });
            /*编辑幻灯片模态框*/
            $editSlide.on('click',function () {
                var SlideTr=0;//判断是否选中新闻内容
                $Slide.find("tr").each(function () {
                    if($(this).hasClass("slideActive")){
                        binkAddResolveDataforSlide($(this),0);
                        //拖拽上传图片
                        bindDragUpload($(".imgSetting"));
                    }
                    else{
                        SlideTr++;
                    }
                });
                if($Slide.find("tr").length==SlideTr){
                    layer.msg("请选中新闻");
                    return;
                }
            });
            /*追加幻灯片*/
            $AddSlide.on('click',function () {
                status=true;
                binkExtendAddResolveDataforSlide(1);
                //拖拽上传图片
                bindDragUpload($(".imgSetting"));
            });
            /*编辑幻灯片*/
            $editMetaSave.click(function () {
                if(status){
                    var surl = LoadUrl() + "axis2/services/MyService/AddSlideInfo";
                    binkExtendAddforSlide(surl,$imgPath.val(),$("#editSlidelink").val().trim());
                }else{
                    var surl = LoadUrl() + "axis2/services/MyService/UpdateSlideTitle";
                    var existsImg=$existsImg.val()==""?"":$existsImg.val();
                    if (bBtn) {
                        binkAddforSlide(surl,$("#editSlideTitle").attr("data-id"),$("#editSlideTitle").val().trim(),$("#editSlideAbstract").val().trim(),existsImg,$("#editSlidelink").val().trim(),0);
                    }
                    else {
                        binkAddforSlide(surl,$("#editSlideTitle").attr("data-id"),$("#editSlideTitle").val().trim(),$("#editSlideAbstract").val().trim(),existsImg,$("#editSlidelink").val().trim(),1);
                    }
                }
            });
        }
        /**********************事件绑定操作************************/
        /**
         * 事件绑定-添加幻灯片的ajax请求
         * @param surl(ajax请求地址)
         * @param id(幻灯片的id)
         * @param title(幻灯片的标题)
         * @param summary(幻灯片的摘要)
         * @param finalPic(幻灯片的图片)
         * @param url(幻灯片链接地址)
         * @param ResultFunction(结果提示)
         * @param callBack(回调函数)
         */
        function binkAddAjaxforSlide(surl,id,title,summary,finalPic,url,ResultFunction,callBack) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "id": id,
                    "title": title,
                    "summary": summary,
                    "url": url,
                    "pic": finalPic
                },
                dataType: "text",
                success: function (result) {
                    ResultFunction&&ResultFunction!=""?ResultFunction():null;
                    callBack&&callBack!=""?callBack(id):null;
                }
            });
        }
        /**
         * 事件绑定-取消幻灯片
         * @param surl(ajax请求地址)
         * @param id(幻灯片的id)
         * @param stickFlag(幻灯片的置顶状态)
         */
        function binkDeleteforSlide(surl,stickFlag,id) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "slide_flag":stickFlag,
                    "id":id
                },
                dataType: "text",
                success: function (result) {
                    DeleteSuccessTips();
                }
            });
        }
        /**
         * 事件绑定-添加幻灯片数据解析
         * @param obj(添加幻灯片的对象)
         */
        function binkAddResolveDataforSlide(obj){
            $insertMeta.modal('show');
            $existsImg.val(obj.attr("data-slidePic"));
            $editSlidebody.empty();
            $editSlidebody.html(createNewsModelHtml(obj.attr("data-id"),obj.attr("data-title"),obj.attr("data-abstract"),obj.attr("data-slidePic"),obj.attr("data-url")));
            $("#myModalLabel").html("编辑幻灯片");
        }
        /**
         * 事件绑定-追加幻灯片数据解析
         * @param status(追加幻灯片内容的状态，为1 表示在幻灯片列表中追加幻灯片)
         */
        function binkExtendAddResolveDataforSlide(status) {
            $insertMeta.modal('show');
            $editSlidebody.empty();
            $editSlidebody.html(createNewsModelHtml("","","","","",status));
            Number(status)==1?$("#myModalLabel").html("追加幻灯片"):$("#myModalLabel").html("编辑幻灯片");
        }
        /**
         * 事件绑定-添加幻灯片
         * @param surl(ajax请求地址)
         * @param id(幻灯片的id)
         * @param title(幻灯片的标题)
         * @param summary(幻灯片的摘要)
         * @param pic(幻灯片的图片)
         * @param url(幻灯片链接地址)
         * @param type(操作类型)
         */
        function binkAddforSlide(surl,id,title,summary,pic,url,type) {
            var finalPic=pic==""?$imgPath.val():pic;
            if(parseInt(type)==1){
                binkAddAjaxforSlide(surl,id,title,summary,finalPic,url,EditSuccessTips,"");
            }else{
                binkAddAjaxforSlide(surl,id,title,summary,finalPic,url,"",upFlag);
            }
        }
        /**
         * 事件绑定-追加幻灯片
         * @param surl(ajax请求地址)
         * @param id(幻灯片的id)
         * @param title(幻灯片的标题)
         * @param summary(幻灯片的摘要)
         * @param pic(幻灯片的图片)
         * @param url(幻灯片链接地址)
         * @param type(操作类型)
         */
        function binkExtendAddforSlide(surl,pic,url) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "url": url,
                    "pic": pic
                },
                dataType: "text",
                success: function (result) {
                    status=false;
                }
            });
        }
        /**********************数据获取************************/
        function fetchSubMenudata() {
            randerSubMenu(surl = LoadUrl() + "axis2/services/MyService/getAllSubMenuName",$searchSubmenu);
        }
        function fetchNewsdata() {
            /*更新数据显示状态*/
            !$unslidenometa.hasClass("hide")?$unslidenometa.addClass("hide"):null;
            /*更新分页显示状态*/
            $pagingidUnSlide.empty();
            /*更新数据显示状态*/
            !$slidenometa.hasClass("hide")?$slidenometa.addClass("hide"):null;
            /*更新检索时分页显示状态*/
            $pagingidSlide.empty();
            /*交互参数*/
            ShowInfoUnslide(unslidepageSize,1,"","","","","","",0,-1,"","");
            ShowInfoslide(slidepageSize,1);
        }
        /**********************数据渲染************************/
        /**
         * 数据渲染-渲染子菜单内容
         * @param surl(ajax请求地址)
         * @param parent(子菜单父级对象)
         */
        function randerSubMenu(surl,parent) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                },
                dataType: "text",
                contentType:"text/xml",
                success: function (result) {
                    resolveSubMenuData(result,parent);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**
         * 数据渲染-渲染未设幻灯片新闻
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
         * @param slideflag(幻灯片状态)
         * @param stickflag(置顶状态)
         * @param id(关键字)
         * @param keyword(关键字)
         */
        function renderUnslideNews(nurl,parent,nometa,pagingid,pageSize,currentIndex,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword) {
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                    "pageIndex":Number(currentIndex),
                    "pageSize":Number(pageSize),
                    "submenu":submenu,
                    "area":area,
                    "startTime":startTime,
                    "endTime":endTime,
                    "author":author,
                    "slideflag":Number(slideflag),
                    "stickflag":Number(stickflag),
                    "checkflag":checkflag,
                    "id":id,
                    "keyword":keyword
                },
                dataType: "text",
                success: function (result) {
                    resolveUnstickNewsData(result,parent,nometa,pagingid,pageSize,currentIndex,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword);
                }
            });
        }
        /**
         * 数据渲染-渲染已设幻灯片新闻
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
         * @param slideflag(幻灯片状态)
         * @param stickflag(置顶状态)
         * @param id(关键字)
         * @param keyword(关键字)
         */
        function renderSlideNews(nurl,parent,nometa,pagingid,pageSize,currentIndex) {
            var start = (currentIndex - 1) * pageSize;
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                    "fromIndex":Number(start),
                    "Size":Number(pageSize)
                },
                dataType: "text",
                success: function (result) {
                    resolveSlideNewsData(result,parent,nometa,pagingid,pageSize,currentIndex);
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
        function resolveSubMenuData(result,parent) {
            var resultXml = loadXML(result);
            parent.empty();
            if(resultXml=="[]"||!resultXml){
                return;
            }
            else{
                var SubMenuHtml='<option value="全部">全部</option>';//子菜单列表的html
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b){
                    $.cookie(b.itemid,b.menu);
                    $.cookie(b.menu,b.itemid);
                    SubMenuHtml +=createSubmenuHtml(b);
                });
                /*设置添加新闻子菜单*/
                parent.html(SubMenuHtml);
                fetchNewsdata();//渲染置顶新闻数据
            }
        }
        /**
         * 数据处理-处理未设幻灯片新闻数据
         * @param result(幻灯片数据)
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
         * @param slideflag(幻灯片状态)
         * @param stickflag(置顶状态)
         * @param id(关键字)
         * @param keyword(关键字)
         */
        function resolveUnstickNewsData(result,parent,nometa,pagingid,pageSize,currentIndex,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword){
            var resultXml = loadXML(result);
            parent.empty();
            if (!resultXml || resultXml == "[]") {
                nometa.removeClass("hide");
            }
            else {
                var unslideHtml = "";
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    unslidepageCount = b.total;
                    if(a==resultJson.length-1){
                        unslideHtml +=createunslideHtml(b,1);
                    }else{
                        unslideHtml +=createunslideHtml(b,0);
                    }

                });
                parent.html(unslideHtml);
                var num = 0;
                if (unslidepageCount % pageSize == 0) {
                    num = Math.floor(unslidepageCount / pageSize);
                }
                else {
                    num = Math.floor(unslidepageCount / pageSize) + 1;
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
                        ShowInfoUnslide(pageSize,p,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword);
                    }
                });
            }
        }
        /**
         * 数据处理-处理已设幻灯片新闻数据
         * @param result(幻灯片数据)
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
         * @param slideflag(幻灯片状态)
         * @param stickflag(置顶状态)
         * @param id(关键字)
         * @param keyword(关键字)
         */
        function resolveSlideNewsData(result,parent,nometa,pagingid,pageSize,currentIndex) {
            var resultXml = loadXML(result);
            parent.empty();
            if (!resultXml || resultXml == "[]") {
                nometa.removeClass("hide");
            }
            else {
                var slideHtml = "";
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    slidepageCount = b.total;
                    if(a==resultJson.length-1){
                        slideHtml +=createSlideHtml(b,1);
                    }
                    else{
                        slideHtml +=createSlideHtml(b,0);
                    }

                });
                parent.html(slideHtml);
                /*设置行高*/
                $Slide.find("tr").each(function () {
                    var _this=this;
                    $(_this).find("td").css("line-height",1.5);
                    $(_this).find("td").each(function () {
                        $(this).css("padding-top",($(_this).height()-$(this).height())/2);
                    });
                });
                var num = 0;
                if (slidepageCount % pageSize == 0) {
                    num = Math.floor(slidepageCount / pageSize);
                }
                else {
                    num = Math.floor(slidepageCount / pageSize) + 1;
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
                        ShowInfoslide(pageSize,p)
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
                html +=createunslideHtml(result,1);
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
         * 构造html-构造未设幻灯片新闻html
         * @param b(单个数据项)
         */
        function createunslideHtml(b,type) {
            var html= '<tr data-id="' + b.id + '" data-title="' + b.title + '" data-abstract="' + b.stick_abstract + '" data-slidePic="' + b.slide_pic + '" data-url="' + b.url + '">'
                + '<td class="indexId" onclick="selectedTr(this,1);">' + b.id + '</td>'
                + '<td class="title text-left" onclick="selectedTr(this,1);" title="' + b.title + '" title="'+b.title+'" '+ ((type === 1) ? ('style="border-bottom:0"') :'')+'>' +b.title+ '</td>'
                + '<td class="submenu" onclick="selectedTr(this,1);">' + $.cookie(b.srv_subtype) + '</td>'
                + '</tr>';
            return html;
        }
        /**
         * 构造html-构造已设幻灯片新闻html
         * @param b(单个数据项)
         */
        function createSlideHtml(b,type) {
            var html='<tr data-id="' + b.id + '" data-title="' + b.title + '" data-abstract="' + b.stick_abstract + '" data-slidePic="' + b.slide_pic + '" data-url="' + b.url + '" data-subMenu="' + b.srv_subtype + '" >'
                + '<td class="title col-sm-8 text-left" onclick="selectedTr(this,2);" title="'+b.title+'">' + JudgeContentLength(b.title)+ '</td>'
                + '<td data-id="' + b.id + '" class="abstract col-sm-2 text-left" onclick="selectedTr(this,2);" title="'+b.stick_abstract+'" '+ ((type === 1) ? ('style="border-bottom:0"') :'')+'>' + JudgeContentLength(b.stick_abstract)+ '</td>'
                + '<td class="pic col-sm-2" onclick="selectedTr(this,2);">' + b.slide_pic + '</td>'
                + '<td class="link col-sm-2" onclick="selectedTr(this,2);" title="' + b.url + '">' + (b.url).substring(0,(b.url).indexOf(".com")+4)+ '</td>'
                + '</tr>';
            return html;

        }
        /**
         * 构造html-构造幻灯片新闻模态框html
         * @param id(新闻id)
         * @param title(新闻标题)
         * @param abstract(新闻摘要)
         * @param pic(新闻图片)
         * @param url(新闻链接地址)
         */
        function createNewsModelHtml(id,title,abstract,pic,url,status) {
            var html='<div class="' + ((status === 1) ? 'hide' : 'form-group') + '">'
                +'<label  class="col-sm-2 control-label">标题'
                +'<span class="must_sym">*</span>'
                +'</label>'
                +'<div class="col-sm-10">'
                +'<textarea type="text" class="form-control"  data-id="'+id+'" id="editSlideTitle" rows="1" cols="1" placeholder="请输入标题">'+title+'</textarea>'
                +'</div>'
                +'</div>'
                +'<div class="' + ((status === 1) ? 'hide' : 'form-group') + '">'
                +'<label class="col-sm-2 control-label">摘要'
                +'<span class="must_sym">*</span>'
                +'</label>'
                +'<div class="col-sm-10">'
                +'<textarea type="text" class="form-control"  id="editSlideAbstract" rows="3" cols="4" placeholder="请输入摘要">'+abstract+'</textarea>'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-2 control-label">图片'
                +'<span class="must_sym">*</span>'
                +'</label>'
                +'<div class="col-sm-10">'
                +'<input type="file" accept="image/png,image/jpg,image/jpeg,image/gif,image/jpg" name="up_img_wu_file_1"  id="up_img_wu_file_1"  onchange="selectImage(this);" style="height: 25px;padding: 0;" class="form-control" multiple="multiple" placeholder="图片链接"/>'
                +'<span class="upload btn btn-primary uploadImg" id="UploadTwo" onclick="unLoadImg(this);">上传图片</span>'
                +'<div  class="suggectSize">建议尺寸2048*465(px)</div>'
                +'<div class="imgSetting slideImg">'
                +'<img id="imgShow_wu_file_1" src="'+imgSrc+pic+'" class="prevImg"/>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'<div class="form-group">'
                +'<label class="col-sm-2 control-label">链接'
                +'<span class="must_sym">*</span>'
                +'</label>'
                +'<div class="col-sm-10">'
                +'<textarea type="text" class="form-control"  data-id="'+id+'" id="editSlidelink" rows="1" cols="1" placeholder="请输入链接">'+url+'</textarea>'
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
         * 结果-结果回调
         * @param mes(错误信息)
         */
        function fetchDataFailed(mes) {
            console.log(mes)
        }
        /**********************辅助操作************************/
        /**
         * 辅助操作-设置审核状态
         * @param id(新闻对象id)
         */
        function upFlag(id) {
            var surl = LoadUrl() + "axis2/services/MyService/UpdateSlideFlag";
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "slide_flag": 1,
                    "id": id
                },
                dataType: "text",
                success: function (result) {
                    layer.msg('编辑及设置幻灯片成功', { time: 1500 }, function () {
                        bBtn = false;
                        $insertMeta.modal("hide");
                        window.location.reload();
                    });
                }
            });
        }
        function EditSuccessTips() {
            layer.msg('恭喜您编辑幻灯片成功!', {
                time: 1500
            },function () {
                window.location.reload();
            });
        }
        function DeleteSuccessTips() {
            layer.msg('恭喜您取消幻灯片成功!', {
                time: 1500
            },function () {
                window.location.reload();
            });
        }
        /*判断内容长度*/
        function JudgeContentLength(obj) {
            if(obj.substring(19,20)){
                return obj.substring(0,19)+"......";
            }
            else{
                return obj;
            }
        }
        /**
         * 辅助操作-处理未设幻灯片新闻数据
         * @param pageSize(没有显示数量)
         * @param currentIndex(当前页)
         * @param submenu(子菜单名称)
         * @param area(领域内容)
         * @param startTime(起始时间)
         * @param endTime(结束时间)
         * @param author(责任人)
         * @param checkflag(审核状态)
         * @param slideflag(幻灯片状态)
         * @param stickflag(置顶状态)
         * @param id(关键字)
         * @param keyword(关键字)
         */
        function ShowInfoUnslide(pageSize,currentIndex,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword) {
            if (!id) {
                var nurl = LoadUrl() + "axis2/services/MyService/QueryNewsCustom";
                renderUnslideNews(nurl,$Unslide,$unslidenometa,$pagingidUnSlide,pageSize,currentIndex,submenu,area,startTime,endTime,author,checkflag,slideflag,stickflag,id,keyword);
            }
            else {
                var nurl = LoadUrl() + "axis2/services/MyService/getLawDetails";
                renderSearchNews(nurl,$Unslide,$unslidenometa, id);
            }
        }
        /**
         * 辅助操作-处理已设幻灯片新闻数据
         * @param pageSize(没有显示数量)
         * @param currentIndex(当前页)
         * @param submenu(子菜单名称)
         * @param area(领域内容)
         * @param startTime(起始时间)
         * @param endTime(结束时间)
         * @param author(责任人)
         * @param checkflag(审核状态)
         * @param slideflag(幻灯片状态)
         * @param stickflag(置顶状态)
         * @param id(关键字)
         * @param keyword(关键字)
         */
        function ShowInfoslide(pageSize,currentIndex) {
            var nurl = LoadUrl() + "axis2/services/MyService/getSlideNewsList";
            renderSlideNews(nurl,$Slide,$slidenometa,$pagingidSlide,pageSize,currentIndex);
        }
        return {
            init:init
        }//返回init函数
    })();
    SlideList.init();//幻灯片信息初始化
});//幻灯片管理模块