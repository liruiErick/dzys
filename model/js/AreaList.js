/**
 * Created by lirui on 2017/6/13.
 */
$(function () {

    /**********************操作对象************************/
    var $metaTable=$('#meta-table');
    var $metaSave=$("#meta_save");
    var $areaTableBody=$("#AreaTableBody");
    var $nometa=$("#nometa");
    var $editbody=$("#editbody");
    var $selid=$("#selid");
    var $insertMeta=$('#insert_meta');
    var $imgPath=$("#imgPath");
    var $existsImg=$("#existsImg");
    var imgSrc="../../images/";//图片默认路径

    var AreaList=(function () {
        /**********************初始化************************/
        function init() {
            fetchdata();
            bindEvent();
        }
        /**********************数据初始化************************/
        function fetchdata() {
            fetchAreaData();
        }
        /**********************绑定事件************************/
        function bindEvent() {
            /*编辑领域模态框*/
            $metaTable.on('click','.update',function(){
                var trObj = $(this).parents('tr');
                var tdArr = trObj.find("td");
                $selid.val(trObj.attr("data-id"));
                $insertMeta.modal('show');
                $existsImg.val(tdArr[2].innerText);
                $editbody.empty();
                $editbody.html(createAreaModelHtml(tdArr[0].innerText,tdArr[1].innerText,tdArr[2].innerText));
                //拖拽上传图片
                bindDragUpload($(".imgSetting"));
            });
            /*编辑领域*/
            $metaSave.on('click',function(){
                bindEditForArea($imgPath.val(),$selid.val(),$("#nameEdit").val().trim(),$("#ennameEdit").val().trim());
            });
            /*删除领域*/
            $metaTable.on('click','.delete',function() {
                var trObj = $(this).parents('tr');
                layer.confirm('删除后将不可恢复，您确定要删除吗？', {
                    btn: ['删除','取消']
                },function() {
                    bindDeleteForArea(LoadUrl() + "axis2/services/MyService/DeleteAreaCustom",trObj.attr("data-id"));
                },function(index) {
                    layer.close(index);
                });
            });
        }
        /**********************事件绑定操作************************/
        /**
         * 事件绑定-删除领域
         * @param surl(ajax请求地址)
         * @param deleteId(删除对象的id)
         */
        function bindDeleteForArea(surl,deleteId) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "id":deleteId
                },
                dataType: "text",
                success: function (result) {
                    console.log(loadXML(result));
                    DeleteSuccessTips();
                }
            });
        }
        /**
         * 事件绑定-编辑领域
         * @param pic(图片信息)
         * @param id(编辑对象的id)
         * @param name(编辑对象的名称)
         * @param enname(编辑对象的英文名称)
         */
        function bindEditForArea(pic,id,name,enname){
            var finnalPic=pic==""?$existsImg.val():pic;
            var surl = LoadUrl() + "axis2/services/MyService/EditAreaCustom";
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "id":id,
                    "name":name,
                    "enname":enname,
                    "picurl":finnalPic
                },
                dataType: "text",
                success: function (result) {
                    EditSuccessTips();
                }
            });
        }
        /**********************数据获取************************/
        function fetchAreaData() {
            randerArea(LoadUrl() + "axis2/services/MyService/GetAllAreaCustom",$areaTableBody,$nometa);
        }
        /**********************数据渲染************************/
        /**
         * 数据渲染-渲染领域
         * @param surl(ajax请求地址)
         * @param parent(外包的父级对象)
         * @param nometa(无内容时显示的对象)
         */
        function randerArea(surl,parent,nometa) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                },
                dataType: "text",
                contentType:"text/xml",
                success: function (result) {
                    resolveAreaData(result,parent,nometa);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            })
        }
        /**********************数据处理************************/
        /**
         * 数据处理-数据处理
         * @param result（结果)
         * @param parent(外包的父级对象)
         * @param nometa(无内容时显示的对象)
         */
        function resolveAreaData(result,parent,nometa) {
            var resultXml = loadXML(result);
            parent.empty();
            if(!resultXml||resultXml=="[]"){
                nometa.removeClass("hide");
            }
            else {
                var html = "";
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    html+=createAreaHtml(b);
                });
                parent.html(html);
            }
        }
        /**********************构造html************************/
        /**
         * 构造html-构造领域html
         * @param b(单个数据项)
         */
        function createAreaHtml(b) {
            var html= '<tr data-id="'+b._id+'">'
                        + '<td class="name">' + b.name + '</td>'
                        + '<td class="enname">' + b.enname + '</td>'
                        + '<td class="picurl">' + b.picurl + '</td>'
                        + '<td class="operate"><span class="update"><a href="javascript:;"></a></span><span class="delete"><a href="javascript: void(0);"></a></span></td>'
                     + '</tr>';
            return html;
        }
        /**
         * 构造html-构造领域模态html
         * @param name(编辑对象的名称)
         * @param enname(编辑对象的英文名称)
         * @param img(图片信息)
         */
        function createAreaModelHtml(name,enname,img) {
            var html='<div class="form-group">'
                        +'<label  class="col-sm-2 control-label">中文名称'
                        +'<span class="must_sym">*</span>'
                        +'</label>'
                        +'<div class="col-sm-10">'
                        +'<input type="text" class="form-control" id="nameEdit" value="'+name+'" placeholder="中文名称">'
                        +'</div>'
                        +'</div>'
                        +'<div class="form-group">'
                        +'<label  class="col-sm-2 control-label">英文名称'
                        +'<span class="must_sym">*</span>'
                        +'</label>'
                        +'<div class="col-sm-10">'
                        +'<input type="text" class="form-control" id="ennameEdit" value="'+enname+'" placeholder="英文名称">'
                        +'</div>'
                        +'</div>'
                        +'<div class="form-group imgSelect subPlat">'
                        +'<label  class="col-sm-2 control-label">图标'
                        +'<span class="must_sym">*</span>'
                        +'</label>'
                        +'<div class="col-sm-10 text-left">'
                        +'<input type="file" accept="image/png,image/jpg,image/jpeg,image/gif,image/jpg" name="up_img_wu_file_0"  id="up_img_wu_file_0"  onchange="selectImage(this);" class="form-control padding0" multiple="multiple" placeholder="图标"/>'
                        +'<input type="button" value="上传图片" class="upload btn btn-primary uploadImg" id="UploadOne" onclick="unLoadImg(this)"/>'
                        +'<div  class="suggectSize">建议比例60*55(px)</div>'
                        +'<div class="imgSetting" style="width: 5.834rem;height: 5.4rem;">'
                        +'<img id="imgShow_wu_file_0" class="prevImg" style="background: #bfefff;" src="'+imgSrc+img+'"/>'
                        +'</div>'
                        +'</div>'
                        +'</div>'
                        +'<div class="form-group">'
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
        return {
            init:init
        }//返回init函数
    })();
    AreaList.init();//领域信息初始化
});//领域管理模块