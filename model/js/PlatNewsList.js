/**
 * Created by lirui on 2017/6/13.
 */
$(function () {

    /**********************操作对象************************/
    var $metaSave=$("#meta_save");
    var $mometa=$("#nometa");
    var $PlatNewsTable=$("#PlatNewsTable");
    var $pagingid=$("#pagingid");
    var $editSubPlatNews=$("#editSubPlatNews");
    var $rankSave=$("#rank_save");
    var $deleteSubPlatNews=$("#deleteSubPlatNews");
    var $insertRank=$('#insert_rank');
    var $selid=$('#selid');
    var $editPlatNews=$('#editPlatNews');

    /*渲染平台新闻信息*/
    var pageSize = 6;//新闻每页显示数量
    var pageCount = 0;//默认起始页
    var displayNums = 6;//默认预览页数

    var PlatNewsList=(function () {
        /**********************初始化************************/
        function init() {
            fetchdata();
            bindEvent();
        }
        /**********************数据初始化************************/
       function fetchdata() {
            fetchPlatNewsdata();
        }
        /**********************绑定事件************************/
        function bindEvent() {
            /*编辑平台新闻模态框*/
            $editSubPlatNews.on('click',function () {
                var SubPlatNewsTr=0;
                $PlatNewsTable.find("tr").each(function () {
                    if($(this).hasClass("slideActive")){
                        var thisUpdate = $(this);
                        $selid.val(thisUpdate.attr("data-id"));
                        var tdArr = thisUpdate.find('td');
                        $insertRank.modal('show');
                        $editPlatNews.empty();
                        $editPlatNews.html(createPlatNewsModelHtml(tdArr[0].innerText,tdArr[1].innerText));
                    }
                    else{
                        SubPlatNewsTr++;
                    }
                });
                if($PlatNewsTable.find("tr").length==SubPlatNewsTr){
                    layer.msg("请选中子平台新闻");
                    return;
                }
            });
            /*平台新闻信息编辑*/
            $rankSave.click(function () {
                var year=(new Date()).getFullYear();
                var Month=(new Date()).getMonth()+1;
                var day=(new Date()).getDate();
                if(Month<10){
                    Month="0"+Month;
                }
                if(day<10){
                    day="0"+day;
                }
                bindEditForPlatNews(LoadUrl() + "axis2/services/MyService/EditSubPlatNewCustom",year,Month,day,$selid.val(),$("#nameEdit").val(),$("#urlEdit").val());
            });
            /*删除平台新闻信息*/
            $deleteSubPlatNews.click(function () {
                var SubPlatNewsTr=0;
                $PlatNewsTable.find("tr").each(function () {
                    if($(this).hasClass("slideActive")){
                        var _this=this;
                        layer.confirm('删除后将不可恢复，您确定要删除吗？', {
                            btn: ['删除','取消']
                        },function() {
                            bindDeleteForPlatNews(LoadUrl() + "axis2/services/MyService/DeleteSubPlatNewCustom",$(_this).attr("data-id"));
                        },function(index) {
                            layer.close(index);
                        });
                    }
                    else{
                        SubPlatNewsTr++;
                    }
                });
                if($PlatNewsTable.find("tr").length==SubPlatNewsTr){
                    layer.msg("请选中子平台新闻");
                    return;
                }
            });
            /*添加平台新闻信息*/
            $metaSave.click(function () {
                var year=(new Date()).getFullYear();
                var Month=(new Date()).getMonth()+1;
                var day=(new Date()).getDate();
                if(Month<10){
                    Month="0"+Month;
                }
                if(day<10){
                    day="0"+day;
                }
                bindAddForPlatNews(LoadUrl() + "axis2/services/MyService/AddSubPlatNewCustom",year,Month,day,$.cookie("formId"),$("#titleAdd").val(),$("#urlAdd").val());
            });
        }
        /**********************事件绑定操作************************/
        /**
         * 事件绑定-编辑平台新闻
         * @param nurl(请求地址)
         * @param year(年)
         * @param Month(月)
         * @param day(日)
         * @param id(平台新闻id)
         * @param title(平台新闻内容)
         * @param url(平台新闻链接地址)
         */
        function bindEditForPlatNews(nurl,year,Month,day,id,title,url) {
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                    "id":id,
                    "title":title,
                    "url":url,
                    "date":year+"-"+Month+"-"+day
                },
                dataType: "text",
                success: function (result) {
                    EditSuccessTips();
                }
            });
        }
        /**
         * 事件绑定-删除平台新闻
         * @param nurl(请求地址)
         * @param id(平台新闻id)
         */
        function bindDeleteForPlatNews(nurl,id) {
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                    "id":id
                },
                dataType: "text",
                success: function (result) {
                    DeleteSuccessTips();
                }
            });
        }
        /**
         * 事件绑定-添加平台新闻
         * @param nurl(请求地址)
         * @param year(年)
         * @param Month(月)
         * @param day(日)
         * @param formid(平台新闻类型)
         * @param title(平台新闻内容)
         * @param url(平台新闻链接地址)
         */
        function bindAddForPlatNews(nurl,year,Month,day,formid,title,url) {
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                    "formid":formid,
                    "title":title,
                    "url":url,
                    "date":year+"-"+Month+"-"+day
                },
                dataType: "text",
                success: function (result) {
                    AddSuccessTips();
                }
            });
        }
        /**********************数据获取************************/
        function fetchPlatNewsdata() {
            ShowInfo(pageSize,1,$.cookie("formId"));
        }
        /**********************数据渲染************************/
        /**
         * 数据渲染-渲染平台新闻
         * @param nurl(请求地址)
         * @param parent(平台新闻数据父级对象)
         * @param nometa(无内容时提示)
         * @param pagingid(分页对象)
         * @param pageSize(没有显示数量)
         * @param currentIndex(当前页)
         * @param formid(平台新闻类型)
         */
        function randerPlatNews(nurl,parent,nometa,pagingid,pageSize,currentIndex,formid) {
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                    "formid":formid,
                    "pageIndex":currentIndex,
                    "pageSize":pageSize

                },
                dataType: "text",
                success: function (result) {
                    resolveLogData(result,parent,nometa,pagingid,pageSize,currentIndex,formid);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**********************数据处理************************/
        /**
         * 数据处理-解析平台新闻数据
         * @param result(请求地址)
         * @param parent(平台新闻数据父级对象)
         * @param nometa(无内容时提示)
         * @param pagingid(分页对象)
         * @param pageSize(没有显示数量)
         * @param currentIndex(当前页)
         * @param formid(平台新闻类型)
         */
        function resolveLogData(result,parent,nometa,pagingid,pageSize,currentIndex,formid) {
            var resultXml = loadXML(result);
            parent.empty();
            if(!resultXml||resultXml=="[]"){
                nometa.removeClass("hide");
            }
            else{
                var html = "";
                result = jQuery.parseJSON(resultXml);
                $.each(result, function (a, b) {
                    if (pageCount == 0) {
                        pageCount = b.total;
                    }
                    html+=createPlatNewsHtml(b);
                });
                parent.html(html);
                var num = 0;
                if (pageCount % pageSize == 0) {
                    num = Math.floor(pageCount / pageSize);
                }
                else {
                    num = Math.floor(pageCount / pageSize) + 1;
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
                        ShowInfo(pageSize,p,formid)
                    }
                });
            }
        }
        /**********************构造html************************/
        /**
         * 构造html-构造新闻平台数据html
         * @param b(单个数据项)
         */
        function createPlatNewsHtml(b) {
            var html='<tr data-id="'+b._id+'">'
                        +'<td onclick="selectedTr(this,1);" class="title text-left">'+b.title+'</td>'
                        +'<td onclick="selectedTr(this,1);" class="url">'+b.url+'</td>'
                      +'</tr>';
            return html;
        }
        /**
         * 构造html-构造新闻平台数据html
         * @param name(内容)
         * @param url(链接地址)
         */
        function createPlatNewsModelHtml(name,url) {
            var html ='<div class="form-group">'
                            +'<label  class="col-sm-2 control-label">名称'
                            +'<span class="must_sym">*</span>'
                            +'</label>'
                            +'<div class="col-sm-10">'
                            +'<input type="text" class="form-control" id="nameEdit" value="'+name+'" placeholder="名称"/>'
                            +'</div>'
                            +'</div>'
                            +'<div class="form-group">'
                            +'<label  class="col-sm-2 control-label">链接地址'
                            +'<span class="must_sym">*</span>'
                            +'</label>'
                            +'<div class="col-sm-10">'
                            +'<input type="text" class="form-control" id="urlEdit" value="'+url+'" placeholder="链接地址"/>'
                            +'</div>'
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
        function EditSuccessTips() {
            layer.msg('恭喜您编辑成功!', {
                time: 1500
            },function () {
                window.location.reload();
            });
        }
        function DeleteSuccessTips() {
            layer.msg('恭喜您删除成功!', {
                time: 1500
            },function () {
                window.location.reload();
            });
        }
        function AddSuccessTips() {
            layer.msg('恭喜您添加成功!', {
                time: 1500
            },function () {
                window.location.reload();
            });
        }
        function ShowInfo(pageSize,currentIndex,formid) {
            randerPlatNews(LoadUrl() + "axis2/services/MyService/GetSubPlatNewsCustom",$PlatNewsTable,$mometa,$pagingid,pageSize,currentIndex,formid);
        }
        return {
            init:init
        }//返回init函数
    })();
    PlatNewsList.init();//平台新闻信息初始化
});//平台信息管理模块