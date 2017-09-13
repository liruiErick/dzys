/**
 * Created by lirui on 2017/6/13.
 */
$(function () {

    /**********************操作对象************************/
    var $insertRank=$("#insert_rank");
    var $blacknometa=$("#blacknometa");
    var $blackSrvType=$("#blackSrvType");
    var $BlackList=$("#BlackList");
    var $blackadd=$("#blackadd");
    var $searchBlackWord=$("#searchBlackWord");
    var $edit_rank_black=$("#edit_rank_black");
    var $editbodyblack=$("#editbodyblack");
    var $blackTitle=$("#blackTitle");

    var WhiteBlackList=(function () {
        /**********************初始化************************/
        function init() {
            fetchdata();
            bindEvent();
        }
        /**********************初始化数据************************/
        function fetchdata() {
            fetchBlackSrvTypedata();
        }
        /**********************绑定事件************************/
        function bindEvent() {
            /*追加黑名单数据*/
            $blackadd.on('click',function() {
                bindAddForBlack($blackTitle.val().trim(),$blackSrvType.find("option:selected"),LoadUrl() + "axis2/services/MyService/AddWordListCustom",true);
            });
            /*检索黑名单子菜单数据*/
            $searchBlackWord.click(function () {
                bindSearchForBlack($blacknometa,LoadUrl() + "axis2/services/MyService/GetAllWordListCustom",$blackTitle.val().trim(),_SetMenu($blackSrvType.find("option:selected").text()),true,$BlackList);
            });
            /*编辑黑名单数据*/
            $edit_rank_black.on('click',function() {
                bindEditForBlack(LoadUrl() + "axis2/services/MyService/EditWordListCustom",true,$("#titleinsertblack").attr("data-id"),$("#titleinsertblack").val().trim(),$.cookie($("#blackSrvTypeEdit").find("option:selected").text()),$insertRank);
            });
            /*模态框--修改黑名单数据*/
            $BlackList.on('click', '.update', function () {
                createBlackModelHtml($insertRank,$(this).parents('tr').find("td"),$blackSrvType.html(),$editbodyblack,2);
            });
            /*删除黑名单数据*/
            $BlackList.on('click','.delete',function() {
                var _this=this;
                bindDeleteForBlack(LoadUrl() + "axis2/services/MyService/DeleteWordListCustom",true,$(_this).parent("td").attr("data-title"));
            });
        }
        /**********************事件绑定操作************************/
        /**
         * 事件绑定-添加黑名单
         * @param title(黑名单的标题)
         * @param SrvType(黑名单的子菜单)
         * @param url(黑名单链接地址)
         * @param type(类型)
         */
        function bindAddForBlack(title,SrvType,url,type) {
            if(title==""){
                layer.msg('请填写名单内容!', {
                    time: 1500
                });
            }
            else if(SrvType.text()=="全部"){
                layer.msg('请选好除全部外的服务类型!', {
                    time: 1500
                });
            }
            else{
                $.ajax({
                    type: "POST",
                    url: url,
                    data: {
                        "isBlack":type,
                        "title":title,
                        "srv_type":SrvType.attr("data-id")
                    },
                    dataType: "text",
                    success: function (result) {
                        AddSuccessTips();
                    }
                });
            }
        }
        /**
         * 事件绑定-检索黑名单
         * @param nometa(无内容是显示的对象)
         * @param title(黑名单的标题)
         * @param SrvType(黑名单的子菜单)
         * @param url(黑名单链接地址)
         * @param type(类型)
         * @param parent(显示黑名单的对象)
         */
        function bindSearchForBlack(nometa,url,title,SrvType,type,parent) {
            nometa.hasClass("hide")?null:nometa.addClass("hide");
            $.ajax({
                type: "POST",
                url: url,
                data: {
                    "isBlack":type,
                    "title":title,
                    "srv_type":SrvType
                },
                dataType: "text",
                success: function (result) {
                    resolveBlackData(result,parent,nometa);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**
         * 事件绑定-编辑黑名单
         * @param title(黑名单的标题)
         * @param SrvType(黑名单的子菜单)
         * @param id(黑名单的id)
         * @param url(黑名单链接地址)
         * @param type(类型)
         * @param model(黑名单的模态框)
         */
        function bindEditForBlack(url,type,id,title,srvType,model) {
            $.ajax({
                type: "POST",
                url: url,
                data: {
                    "isBlack": type,
                    "id":id,
                    "title":title,
                    "srv_type":srvType
                },
                dataType: "text",
                success: function (result) {
                    EditSuccessTips();
                }
            });
        }
        /**
         * 事件绑定-删除黑名单
         * @param title(黑名单的标题)
         * @param url(黑名单链接地址)
         * @param type(类型)
         */
        function bindDeleteForBlack(url,type,title) {
            layer.confirm('删除后将不可恢复，您确定要删除吗？', {
                btn: ['删除','取消']
            },function() {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: {
                        "isBlack":type,
                        "title":title
                    },
                    dataType: "text",
                    success: function (result) {
                        DeleteSuccessTips();
                    }
                });
            },function(index) {
                layer.close(index);
            });
        }
        /**********************数据获取************************/
        function fetchBlackSrvTypedata(){
            randerBlackSrvType(LoadUrl() + "axis2/services/MyService/getAllSubMenuName",$blackSrvType);
        }
        function fetchBlackdata() {
            var surl = LoadUrl() + "axis2/services/MyService/GetAllWordListCustom";
            randerBlack(surl,true,"","全部",$BlackList,$blacknometa);
        }
        /**********************数据渲染************************/
        /**
         * 数据渲染-渲染子菜单类型
         * @param surl(ajax地址)
         * @param parent(显示黑名单的对象)
         */
        function randerBlackSrvType(surl,parent){
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                },
                dataType: "text",
                contentType:"text/xml",
                success: function (result) {
                    resolveBlackSrvTypeData(result,parent);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**
         * 数据渲染-渲染黑名单
         * @param surl(ajax地址)
         * @param parent(显示子菜单的对象)
         * @param isBlack(ajax地址)
         * @param title(黑名单的标题)
         * @param SrvType(黑名单的子菜单)
         * @param nometa(无内容是显示的对象)
         */
        function randerBlack(surl,isBlack,title,srvType,parent,nometa) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "isBlack":isBlack,
                    "title":title,
                    "srv_type":srvType
                },
                dataType: "text",
                success: function (result) {
                    resolveBlackData(result,parent,nometa);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**********************数据解析************************/
        /**
         * 数据解析-处理子菜单
         * @param surl(ajax地址)
         * @param parent(显示子菜单的对象)
         * @param nometa(无内容是显示的对象)
         */
        function resolveBlackSrvTypeData(result,parent) {
            parent.empty();
            var html = '<option value="全部" data-repeat="0">全部</option>';
            var resultXml = loadXML(result);
            if(resultXml=="[]"||!resultXml){
                layer.msg("没有子菜单数据",{time:1000});
            }
            else {
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b){
                    $.cookie(b.itemid,b.menu);
                    $.cookie(b.menu,b.itemid);
                    html +=createMenuHtml(b);
                });
                parent.html(html);
                fetchBlackdata();//渲染全部数据
            }
        }
        /**
         * 数据解析-处理黑名单数据
         * @param surl(ajax地址)
         * @param parent(显示子菜单的对象)
         * @param nometa(无内容是显示的对象)
         */
        function resolveBlackData(result,parent,nometa) {
            parent.empty();
            var html = "";
            var resultXml = loadXML(result);
            if(!resultXml||resultXml=="[]"){
                nometa.removeClass("hide");
            }
            else{
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    html +=createBlackHtml(b);
                });
                parent.html(html);
            }
        }
        /**********************构造html************************/
        /**
         * 构造html-生成黑名单html结构
         * @param b(单个数据项)
         */
        function createBlackHtml(b) {
           var html='<tr>'
                       +'<td class="blacktitle">'+b.title+'</td>'
                       +'<td class="blacksrvType">'+$.cookie(b.srv_type)+'</td>'
                       +'<td class="'+b._id+'" data-isBlack="true" data-title="'+b.title+'"><span class="update insert_rank"><a href="javascript:;"></a></span><span class="delete"><a href="javascript:;"></a></span></td>'
                     +'</tr>';
           return html;
        }
        /**
         * 构造html-生成菜单html结构
         * @param b(单个数据项)
         */
        function createMenuHtml(b) {
            var html='<option value="'+b.menu+'" data-repeat="0" data-id="'+b.itemid+'">'+b.menu+'</option>';
            return html;
        }
        /**
         * 构造html-生成模态框html结构
         * @param model(模态框)
         * @param tdArr(数据)
         * @param typehtml(html内容)
         * @param parent(模态框对象)
         * @param type(类型)
         */
        function createBlackModelHtml(model,tdArr,typehtml,parent,type) {
            var typeresult="";
            type==1?typeresult="white":typeresult="black";
            model.modal('show');
            parent.empty();
            var html ='<div class="form-group"><label  class="col-sm-2 control-label">词条名称<span class="must_sym">*</span></label><div class="col-sm-10"><input type="text" class="form-control w32 dpi" data-id="'+tdArr[2].className+'" id="titleinsert'+typeresult+'" value="' + tdArr[0].innerText + '"/></div></div>'
                + '<div class="form-group"><label  class="col-sm-2 control-label">服务类型<span class="must_sym">*</span></label><div class="col-sm-10"><select class="form-control w32 dpi" id="'+typeresult+'SrvTypeEdit">'+typehtml+'</select></div></div>'
            parent.html(html);
            /*设置菜单类型*/
            $("#"+typeresult+"SrvTypeEdit").find("option").each(function () {
                $(this).val()==tdArr[1].innerText?$(this).attr("selected",true):null;
            });
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
        function DeleteSuccessTips() {
            layer.msg('恭喜您删除成功!', {
                time: 1500
            },function () {
                window.location.reload();
            });
        }
        function EditSuccessTips() {
            layer.msg('恭喜您编辑成功!', {
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
        function _SetMenu(content) {
            var searchContent="";
            content=="全部"?searchContent="全部":searchContent=$.cookie(content);
            return searchContent;
        }//设置添加名单菜单内容
        return {
            init:init
        }//返回init函数,提供外部调用接口
    })();
    WhiteBlackList.init();//黑名单信息初始化
});//黑名单管理模块