/**
 * Created by lirui on 2017/6/13.
 */
$(function () {

    /**********************操作对象************************/
    var $nometaInter=$("#nometaInter");
    var $mometa=$("#nometa");
    var $NationalWordList=$("#NationalWordList");
    var $InterNationalWordList=$("#InterNationalWordList");
    var $NationalWordAdd=$("#NationalWordAdd");
    var $InterNationalWordAdd=$("#InterNationalWordAdd");
    var $InterNationalName=$("#InterNationalName");
    var $NationalName=$("#NationalName");

    var WordList=(function () {
        /**********************初始化************************/
        function init() {
            fetchdata();
            bindEvent();
        }
        /**********************数据初始化************************/
        function fetchdata() {
            fetchWorddata();
        }
        /**********************绑定事件************************/
        function bindEvent() {
            $InterNationalWordAdd.on('click',function() {
                if($InterNationalName.val().trim()==""){
                    layer.msg("请添加国内词条名称",{time:1000});
                    return;
                }
                else{
                    var surl = LoadUrl() + "axis2/services/MyService/AddNationWordCustom";
                    bindAddForWord(surl,false,$InterNationalName.val().trim());
                }
            });//追加国内词条
            $NationalWordAdd.on('click',function() {
                if($NationalName.val().trim()==""){
                    layer.msg("请添加国际词条名称",{time:1000});
                    return;
                }
                else{
                    var surl = LoadUrl() + "axis2/services/MyService/AddNationWordCustom";
                    bindAddForWord(surl,true,$NationalName.val().trim());
                }
            });//追加国际词条
            $InterNationalWordList.on('click', '.delete', function() {
                var _this=this;
                layer.confirm('删除后将不可恢复，您确定要删除吗？', {
                    btn: ['删除','取消']
                },function() {
                    var surl = LoadUrl() + "axis2/services/MyService/DeleteNationWordCustom";
                    bindDeleteForWord(surl,false,$(_this).parent("td.last").attr("data-title"));
                },function(index) {
                    layer.close(index);
                });
            });//删除国内词条
            $NationalWordList.on('click', '.delete', function() {
                var _this=this;
                layer.confirm('删除后将不可恢复，您确定要删除吗？', {
                    btn: ['删除','取消']
                },function() {
                    var surl = LoadUrl() + "axis2/services/MyService/DeleteNationWordCustom";
                    bindDeleteForWord(surl,true,$(_this).parent("td.last").attr("data-title"));
                },function(index) {
                    layer.close(index);
                });
            });//删除国际词条
        }
        /**********************事件绑定操作************************/
        /**
         * 事件绑定-添加词条
         * @param surl(ajax请求地址)
         * @param isNation(国际或者国内)
         * @param title(词条名称)
         */
        function bindAddForWord(surl,isNation,title) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "isNation": isNation,
                    "title": title
                },
                dataType: "text",
                success: function (result) {
                    AddSuccessTips();
                }
            });
        }
        /**
         * 事件绑定-删除词条
         * @param surl(ajax请求地址)
         * @param isNation(国际或者国内)
         * @param title(词条名称)
         */
        function bindDeleteForWord(surl,isNation,title) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "isNation":isNation,
                    "title":title
                },
                dataType: "text",
                success: function (result) {
                    DeleteSuccessTips();
                }
            });
        }
        /**********************数据获取************************/
        function fetchWorddata() {
            var surl = LoadUrl() + "axis2/services/MyService/GetNationListCustom";
            randerWord(surl,false,$InterNationalWordList,$nometaInter,true,$NationalWordList,$mometa);
        }
        /**********************数据渲染************************/
        /**
         * 数据渲染-渲染词条
         * @param surl(ajax请求地址)
         * @param isNation1(国际词条)
         * @param parent1(生成词条对象)
         * @param nometa1(无内容时显示对象)
         * @param isNation2(国内词条)
         * @param parent2(生成词条对象)
         * @param nometa2(无内容时显示对象)
         */
        function randerWord(surl,isNation1,parent1,nometa1,isNation2,parent2,nometa2) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "isNation":isNation1
                },
                dataType: "text",
                success: function (result) {
                    resolveWordData(result,parent1,nometa1);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            });
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "isNation":isNation2
                },
                dataType: "text",
                success: function (result) {
                    resolveWordData(result,parent2,nometa2);
                }
            });
        }
        /**********************数据处理************************/
        /**
         * 数据处理-处理词条数据
         * @param result(ajax请求地址)
         * @param parent(生成词条对象)
         * @param nometa(无内容时显示对象)
         */
        function resolveWordData(result,parent,nometa) {
            parent.empty();
            var resultXml = loadXML(result);
            if(!resultXml||resultXml=='[]'){
                nometa.removeClass("hide");
            }
            else{
                var html = "";
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    html += createWordHtml(b);
                });
                parent.html(html);
            }
        }
        /**********************构造html************************/
        /**
         * 构造html-生成词条html结构
         * @param b(单个数据项)
         */
        function createWordHtml(b) {
            var html='<tr>'
                +'<td class="title">'+b.title+'</td>'
                +'<td class="last" data-title="'+b.title+'" ><span class="delete"><a href="javascript:;"></a></span></td>'
                +'</tr>';
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
        return {
            init:init
        }//返回init函数
    })();
    WordList.init();//词条信息初始化
});//词条管理模块