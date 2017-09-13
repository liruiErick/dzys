/**
 * Created by lirui on 2017/6/13.
 */
$(function () {

    /**********************操作对象************************/
    var $nometa=$("#nometa");
    var $logtablebody=$("#logtablebody");
    var $pagingid=$("#pagingid");
    var $search=$("#search");
    var $keyword=$("#keyword");
    var $startTime=$("#startTime");
    var $endTime=$("#endTime");
    var $author=$("#author");
    var param={
        "nurl":LoadUrl() + "axis2/services/MyService/QueryLog",
        "parent":$logtablebody,
        "nometa":$nometa,
        "pagingId":$pagingid,
        "pageSize":6,
        "curr":1,
        "user":"",
        "operate":"",
        "keyword":"",
        "starttime":"",
        "endtime":"",
        "displayNums":6
    };

    var LogList=(function () {
        /**********************初始化************************/
        function init() {
            fetchdata();
            bindEvent();
        }
        /**********************数据初始化************************/
        function fetchdata() {
            fetchdLogData();
            fetchAuthorityUserdata();
        }
        /**********************绑定事件************************/
        function bindEvent() {
            $search.click(function () {
                $nometa.addClass("hide")?null:$nometa.addClass("hide");
                $pagingid.empty();
                param.user=$author.find("option:selected").text();
                param.operate=getCheckboxSelected();
                param.keyword=$keyword.val().trim();
                param.starttime=$startTime.val().trim();
                param.endtime=$endTime.val().trim();
                param.curr=1;
                bindSearchForLog(param);
            });
        }
        /**********************事件绑定操作************************/
        /**
         * 事件绑定-查询日志
         * @param param(参数)
         */
        function bindSearchForLog(param) {
            ShowInfo(param);
        }
        /**********************数据获取************************/
        function fetchdLogData() {
            ShowInfo(param);
        }
        function fetchAuthorityUserdata() {
            randerAuthorityUser(LoadUrl() + "axis2/services/MyService/GetAllBackProcessUserCustom",$author,$nometa);
        }
        /**********************数据渲染************************/
        /**
         * 数据渲染-渲染用户
         * @param nurl(ajax请求地址)
         * @param parent(指数分类父级元素)
         * @param nometa(无内容时提示)
         */
        function randerAuthorityUser(nurl,parent,nometa) {
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                },
                dataType: "text",
                contentType:"text/xml",
                success: function (result) {
                    resolveAuthorityUserData(result,parent,nometa);
                }
            });
        }
        /**********************数据处理************************/
        /**
         * 数据处理-处理用户数据
         * @param result(日志数据)
         * @param parent(指数分类父级元素)
         * @param nometa(无内容时提示)
         */
        function resolveAuthorityUserData(result,parent,nometa) {
            var resultXml = loadXML(result);
            parent.empty();
            if(!resultXml||resultXml=="[]"){
                nometa.removeClass("hide");
            }
            else{
                var html = "";
                result = jQuery.parseJSON(resultXml);
                $.each(result, function (a, b) {
                    html+=createAuthorityUserHtml(b);
                });
                parent.html(html);
            }
        }
        /**********************构造html************************/
        /**
         * 构造html-构造用户html
         * @param b(单个数据项)
         */
        function createAuthorityUserHtml(b) {
            var html='<option data-repeat="0" data-user="'+b.user+'">'+b.user+'</option>';
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
        return {
            init:init
        }//返回init函数
    })();
    LogList.init();//日志信息初始化
});//日志管理模块