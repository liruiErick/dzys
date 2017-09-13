/**
 * Created by lirui on 2017/6/13.
 */
$(function () {
    /**********************操作对象************************/
    var $insertMeta=$("#insert_meta");
    var $metaSave=$("#meta_save");
    var $metaTable=$("#meta-table");
    var $indexuNumberBody=$("#indexuNumberBody");
    var $editIndexuNumberBody=$("#editIndexuNumberBody");
    var $search=$("#search");
    var $nometa=$("#nometa");
    var indexNumberArr=["综合","工业","科技","互联网","股票"];//指数类型数组

    var IndexNumberList=(function () {
        /**********************初始化************************/
        function init() {
            fetchdata();
            bindEvent();
        }
        /**********************数据初始化************************/
        function fetchdata() {
            fetchIndexNumberdata();
        }
        /**********************绑定事件************************/
        function bindEvent() {
            /*搜索指数类型*/
            $search.on('click',function () {
                $nometa.hasClass("hide")?null:$nometa.addClass("hide");
                bindSearchForIndexNumber(LoadUrl() + "axis2/services/MyService/GetIndexTypeCustom",judgeIndexType($("#indexNumerSearch option:selected").val()),$indexuNumberBody,$nometa);
            });
            /*编辑指数类型*/
            $metaSave.on('click',function() {
                bindEditForIndexNumber(LoadUrl() + "axis2/services/MyService/EditIndexTypeCustom",$("#indexNumberOrderEdit").attr("data-id"),$("#indexNumberNameEdit").val(),$("#indexNumberPageidEdit").find("option:selected").attr("value"),$("#indexNumberDesEdit").val().trim(),$("#topFlagEdit").find("input[type='radio']:checked").attr("value"));
            });
            /*编辑指数类型模态框*/
            $metaTable.on('click', '.update', function () {
                var trObj = $(this).parents('tr');
                var tdArr = trObj.find("td");
                $insertMeta.modal('show');
                $editIndexuNumberBody.empty();
                $editIndexuNumberBody.html(createIndexNumberModelHtml(tdArr[0].innerText,tdArr[1].innerText,tdArr[3].innerText,trObj.attr("data-id")));
                /*指数分类设置*/
                $("#indexNumberPageidEdit").find("option").each(function () {
                    $(this).text()==(tdArr[2].innerText)?$(this).attr("selected",true):null;
                });
                /*是否首页显示*/
                $("#topFlagEdit").find("input[type='radio']").each(function () {
                    $(this).val()==trObj.attr("data-flag")?$(this).attr("checked",true):null;
                });
            });
        }
        /**********************事件绑定操作************************/
        /**
         * 事件绑定-搜索指数类型
         * @param nurl(ajax请求地址)
         * @param firstClass(指数分类)
         * @param parent(指数分类父级元素)
         * @param nometa(无内容时提示)
         */
        function bindSearchForIndexNumber(nurl,firstClass,parent,nometa){
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                    "firstClass":firstClass
                },
                dataType: "text",
                success: function (result) {
                    var resultXml = loadXML(result);
                    parent.empty();
                    if(!resultXml||resultXml=="[]"){
                        nometa.removeClass("hide");
                    }
                    else{
                        var html = "";
                        var resultJson = jQuery.parseJSON(resultXml);
                        $.each(resultJson, function (a, b) {
                            html+=createIndexNumberHtml(b,a+1);
                        });
                        parent.html(html);
                    }
                }
            });
        }
        /**
         * 事件绑定-编辑指数类型
         * @param surl(ajax请求地址)
         * @param id(指数的id)
         * @param idxname(指数的名称)
         * @param firstClass(指数分类)
         * @param content(指数分类内容)
         * @param top_flag(是否首页显示)
         */
        function bindEditForIndexNumber(surl,id,idxname,firstClass,content,top_flag) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "id":id,
                    "idxname":idxname,
                    "firstClass":firstClass,
                    "content":content,
                    "top_flag":top_flag
                },
                dataType: "text",
                success: function (result) {
                    EditSuccessTips();
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            })
        }
        
        /**********************数据获取************************/
        function fetchIndexNumberdata() {
            randerIndexNumber(LoadUrl() + "axis2/services/MyService/GetIndexTypeCustom",$indexuNumberBody,$nometa);
        }
        /**********************数据渲染************************/
        /**
         * 事件绑定-编辑指数类型
         * @param nurl(ajax请求地址)
         * @param parent(指数分类父级元素)
         * @param nometa(无内容时提示)
         */
        function randerIndexNumber(nurl,parent,nometa) {
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                    firstClass:""
                },
                dataType: "text",
                success: function (result) {
                    resolveIndexNumberData(result,parent,nometa);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**********************数据处理************************/
        /**
         * 数据处理-处理指数类型数据
         * @param result(数据结果)
         * @param parent(指数分类父级元素)
         * @param nometa(无内容时提示)
         */
        function resolveIndexNumberData(result,parent,nometa) {
            var resultXml = loadXML(result);
            parent.empty();
            if(!resultXml||resultXml=="[]"){
                nometa.removeClass("hide");
            }
            else{
                var html = "";
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    html+=createIndexNumberHtml(b,a+1);
                });
                parent.html(html);
            }
        }
        /**********************构造html************************/
        /**
         * 构造html-构造子菜单html
         * @param b(单条指数类型数据)
         */
        function createIndexNumberHtml(b,number) {
            var html="";
            html +='<tr data-id="'+b._id+'" data-flag="'+b.top_flag+'">'
                        +'<td class="indexNumberid" >'+number+'</td>'
                        +'<td class="indexNumberName" >'+b.Name+'</td>'
                        +'<td class="indexNumberType" >'+indexNumberArr[parseInt(b.FirstClass)-1]+'</td>'
                        +'<td class="indexNumberDes" >'+b.content+'</td>'
                        +'<td class="homeShow" id="homeShow">'+setHomeShow(b.top_flag)+'</td>'
                        +'<td class="last"><span class="update"><a href="javascript:;"></a></span></td>'
                     +'</tr>';
            return html;
        }
        /**
         * 构造html-构造子菜单html
         * @param order(指数类型序号)
         * @param name(指数类型名称)
         * @param des(指数类型描述)
         * @param id(指数类型id)
         */
        function createIndexNumberModelHtml(order,name,des,id) {
            var html = '<div class="form-group">'
                            + '<label for="indexNumber" class="col-sm-2 control-label">顺序编号'
                            + '<span class="must_sym">*</span>'
                            + '</label>'
                            + '<div class="col-sm-10">'
                            +'<input class="form-control w45 dpi" value="' + order+ '" data-id="'+id+'" id="indexNumberOrderEdit" disabled/>'
                            +'</div>'
                            +'</div>'
                            +'<div class="form-group">'
                            +'<label  class="col-sm-2 control-label">指数名称'
                            +'<span class="must_sym">*</span>'
                            +'</label>'
                            +'<div class="col-sm-10">'
                            +'<input type="text" class="form-control w45 dpi" id="indexNumberNameEdit" value="' +name+ '" disabled="disabled"/>'
                            +'</div>'
                            +'</div>'
                            +'<div class="form-group">'
                            +'<label  class="col-sm-2 control-label">指数分类'
                            +'<span class="must_sym">*</span>'
                            +'</label>'
                            +'<div class="col-sm-10">'
                            +'<div class="normal">'
                            +'<select class="form-control w45 dpi mrp10" id="indexNumberPageidEdit" disabled="disabled">'
                            +'<option value="1">综合</option>'
                            +'<option value="2">工业</option>'
                            +'<option value="3">科技</option>'
                            +'<option value="4">互联网</option>'
                            +'<option value="5">股票</option>'
                            +'</select>'
                            +'</div>'
                            +'</div>'
                            +'</div>'
                            +'<div class="form-group">'
                            +'<label class="col-sm-2 control-label" >指数简介'
                            +'<span class="must_sym">*</span>'
                            +'</label>'
                            +'<div class="col-sm-10">'
                            +'<form role="form">'
                            +'<textarea type="text" class="form-control" rows="3" id="indexNumberDesEdit">' + des + '</textarea>'
                            +'</form>'
                            +'</div>'
                            +'</div>'
                            +'<div class="form-group">'
                            +'<label class="col-sm-2 control-label">首页显示'
                            +'<span class="must_sym">*</span>'
                            +'</label>'
                            +'<div class="col-sm-10" style="margin-top: 7px;" id="topFlagEdit">'
                            +'<label>'
                            +'<input type="radio" name="type" value="1"/>是'
                            +'</label>'
                            +'<label>'
                            +'<input type="radio" name="type" value="0"/>否'
                            +'</label>'
                            +'</div>'
                         +'</div>';
            return html;
        }
        /**********************辅助操作************************/
        /**
         * 辅助操作
         * @param content(首页显示状态)
         */
        function setHomeShow(content) {
            var HomeShow="";
            content=="1"?HomeShow="是":HomeShow="否";
            return HomeShow;
        }
        /**
         * 辅助操作
         * @param content(指数类型)
         */
        function judgeIndexType(obj) {
            var indexType="";
            obj==0?null:indexType=obj;
            return indexType;
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
        return {
            init:init
        }//返回init函数
    })();
    IndexNumberList.init();//指数类型信息初始化
});//指数类型管理模块