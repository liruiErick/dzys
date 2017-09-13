/**
 * Created by lirui on 2017/6/13.
 */
$(function () {

    /**********************操作对象************************/
    var $SubMenuContent=$("#SubMenuContent");
    var $mometa=$("#nometa");

    var NewsPageList=(function () {
        /**********************初始化************************/
        function init() {
            fetchdata();
        }
        /**********************数据初始化************************/
        function fetchdata() {
            fetchSubMenudata();
            fetchNewsdata();
        }
        /**********************绑定事件************************/
        /**********************数据获取************************/
        function fetchSubMenudata() {
            randerSubMenu();
        }
        function fetchNewsdata() {
            randerNews(LoadUrl() + "axis2/services/MyService/getAllSubMenuName",$SubMenuContent,$mometa);
        }
        /**********************事件绑定操作************************/
        /**********************数据渲染************************/
        function randerSubMenu() {
            var surl = LoadUrl() + "axis2/services/MyService/getAllSubMenuName";
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                },
                dataType: "text",
                contentType: "text/xml",
                success: function (result) {
                    var resultXml = loadXML(result);
                    if(!resultXml||resultXml=="[]"){
                        return;
                    }
                    else{
                        var resultJson = jQuery.parseJSON(resultXml);
                        $.each(resultJson, function (a, b) {
                            $.cookie(b.itemid,b.menu);
                            $.cookie(b.menu,b.itemid);
                        });
                    }
                }
            });
        }
        /**
         * 数据渲染-渲染新闻管理列表
         * @param surl(ajax请求地址)
         * @param parent(新闻管理列表父级元素)
         * @param nometa(无内容时提示)
         */
        function randerNews(surl,parent,nometa) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                },
                dataType: "text",
                contentType: "text/xml",
                success: function (result) {
                    resolveNewsData(result,parent,nometa);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**********************数据处理************************/
        /**
         * 数据处理-处理新闻管理列表数据
         * @param result(新闻管理列表数据)
         * @param parent(新闻管理列表父级元素)
         * @param nometa(无内容时提示)
         */
        function resolveNewsData(result,parent,nometa) {
            var SubMenuHtml = "";
            result = loadXML(result);
            $SubMenuContent.empty();
            if(!result||result=="[]"){
                nometa.removeClass("hide");
            }
            else{
                result = jQuery.parseJSON(result);
                $.each(result, function (a, b) {
                    $.cookie(b.itemid,b.menu);
                    $.cookie(b.menu,b.itemid);
                    SubMenuHtml +=createNewsHtml(b);
                });
                SubMenuHtml +='<li onclick="enterSubMenuPage(this);" id="reptile" data-menu="爬虫数据">爬虫数据</li>';
                parent.html(SubMenuHtml);
                Authority();//权限操作
            }
        }
        /**********************构造html************************/
        /**
         * 构造html-构造新闻管理列表html
         * @param b(单个数据项)
         */
        function createNewsHtml(b) {
            var html='<li onclick="enterSubMenuPage(this);" class="hide" data-menu="'+b.menu+'" data-itemid="'+b.itemid+'">'+b.menu+'</li>'
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
        function Authority() {
            setEditLimit();
        }
        /*根据用户级别设置可编辑范围*/
        function setEditLimit() {
            var surl = LoadUrl() + "axis2/services/MyService/GetBackProcessUserDetailCustome";
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "user":sessionStorage.getItem("loginName")
                },
                dataType: "text",
                success: function (result) {
                    var resultXml = loadXML(result);
                    var resultJson = jQuery.parseJSON(resultXml);
                    var _this=this;
                    $SubMenuContent.find("li").each(function () {
                        for(var i=0;i<getEditLimitArr(resultJson[0].EditLimit).length;i++){
                            if($.cookie(getEditLimitArr(resultJson[0].EditLimit)[i])==$(this).text()){
                                $(this).removeClass("hide");
                            }
                        }
                    });
                    $.cookie("AuditingLimit",resultJson[0].AuditingLimit);
                    result[0].AuditingLimit=="无"?$("#reptile").addClass("hide"):null;
                    (getEditLimitArr(resultJson[0].EditLimit).length)>4?$SubMenuContent.css({"border-right":0,"border-bottom":0}):null;
                    (getEditLimitArr(resultJson[0].EditLimit).length)<3?$SubMenuContent.find("li").css({"border-bottom":0}):null;
                    (getEditLimitArr(resultJson[0].EditLimit).length)==4?$SubMenuContent.find("li").css({"border-bottom":0}):null;
                    (getEditLimitArr(resultJson[0].EditLimit).length)==0?$SubMenuContent.css({"border":0}):null;
                }
            });
        }
        /*获取编辑权限数组*/
        function getEditLimitArr(str) {
            var areaArr=[];
            if(!str){
                areaArr=[];
            }else{
                areaArr=str.split(";");
            }
            return areaArr;
        }
        return {
            init:init
        }//返回init函数
    })();
    NewsPageList.init();//新闻菜单信息初始化
});//新闻菜单页管理模块