/**
 * Created by lirui on 2017/6/13.
 */
$(function () {
    /**********************操作对象************************/
    var $metaTable=$('#meta-table');
    var $metaSave=$("#meta_save");
    var $linkTableBody=$("#LinkTableBody");
    var $nometa=$("#nometa");
    var $editbody=$("#editbody");
    var $addbody=$("#addbody");
    var $selid=$("#selid");
    var $insertMeta=$('#insert_meta');
    var $insert_rank=$('#insert_rank');
    var $imgPath=$("#imgPath");
    var $rankSave=$("#rank_save");
    var $existsImg=$("#existsImg");
    var $addLinkUrl=$("#addLinkUrl");
    var imgSrc="../../images/";//图片默认路径

    var LinkUrlList=(function () {
        /**********************初始化************************/
        function init() {
            fetchdata();
            bindEvent();
            assist();
        }
        /**********************数据初始化************************/
        function fetchdata() {
            fetchLinkUrlData();
        }
        /**********************绑定事件************************/
        function bindEvent() {
            /*编辑友情链接模态框*/
            $metaTable.on('click','.update',function(){
                var trObj = $(this).parents('tr');
                var tdArr = trObj.find("td");
                $selid.val(trObj.attr("data-id"));
                $insertMeta.modal('show');
                $existsImg.val(tdArr[2].innerText);
                $editbody.empty();
                $editbody.html(createLinkUrlModelHtml(tdArr[0].innerText,tdArr[1].innerText,tdArr[2].innerText));
                //拖拽上传图片
                bindDragUpload($(".imgSetting"));
            });
            /*编辑友情链接*/
            $metaSave.on('click',function(){
                bindEditForLinkUrl($imgPath.val(),$selid.val(),$("#name").val().trim(),$("#url").val().trim());
            });
            /*删除友情链接*/
            $metaTable.on('click','.delete',function() {
                var trObj = $(this).parents('tr');
                layer.confirm('删除后将不可恢复，您确定要删除吗？', {
                    btn: ['删除','取消']
                },function() {
                    bindDeleteForLinkUrl(LoadUrl() + "axis2/services/MyService/DeleteLinkUrlCustom",trObj.attr("data-id"));
                },function(index) {
                    layer.close(index);
                });
            });
            /*添加友情链接模态框*/
            $addLinkUrl.on('click',function () {
                $insert_rank.modal('show');
                $addbody.empty();
                $addbody.html(createLinkUrlModelHtml("","",""));
                //拖拽上传图片
                bindDragUpload($(".imgSetting"));
            });
            /*添加友情链接*/
            $rankSave.on('click',function() {
                bindAddForLinkUrl(LoadUrl() + "axis2/services/MyService/AddLinkUrl",$("#name").val().trim(),$imgPath.val(),$("#url").val().trim());
            });
        }
        /**********************事件绑定操作************************/
        /**
         * 事件绑定-删除友情链接
         * @param surl(ajax请求地址)
         * @param deleteId(删除对象的id)
         */
        function bindDeleteForLinkUrl(surl,deleteId) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "id":deleteId
                },
                dataType: "text",
                success: function (result) {
                    DeleteSuccessTips();
                }
            });
        }
        /**
         * 事件绑定-编辑友情链接
         * @param pic(图片信息)
         * @param id(编辑对象的id)
         * @param name(编辑对象的名称)
         * @param link(编辑对象的链接地址)
         */
        function bindEditForLinkUrl(pic,id,name,link){
            var finnalPic=pic==""?$existsImg.val():pic;
            var surl = LoadUrl() + "axis2/services/MyService/EditLinkUrlCustom";
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "id":id,
                    "name":name,
                    "pic":finnalPic,
                    "url":link
                },
                dataType: "text",
                success: function (result) {
                    EditSuccessTips();
                }
            });
        }
        /**
         * 事件绑定-添加友情链接
         * @param surl(请求地址)
         * @param pic(图片信息)
         * @param name(编辑对象的名称)
         * @param link(编辑对象的链接地址)
         */
        function bindAddForLinkUrl(surl,name,pic,url) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "name":name,
                    "pic":pic,
                    "url":url
                },
                dataType: "text",
                success: function (result) {
                    AddSuccessTips();
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**********************数据获取************************/
        function fetchLinkUrlData() {
            randerLinkUrl(LoadUrl() + "axis2/services/MyService/GetLinkUrlsCustom",$linkTableBody,$nometa);
        }
        /**********************数据渲染************************/
        /**
         * 数据渲染-渲染友情链接
         * @param surl(ajax请求地址)
         * @param parent(外包的父级对象)
         * @param nometa(无内容时显示的对象)
         */
        function randerLinkUrl(surl,parent,nometa) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                },
                dataType: "text",
                contentType:"text/xml",
                success: function (result) {
                    resolveLinkUrlData(result,parent,nometa);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            })
        }
        /**********************数据处理************************/
        /**
         * 数据处理-友情链接数据处理
         * @param surl(ajax请求地址)
         * @param parent(外包的父级对象)
         * @param nometa(无内容时显示的对象)
         */
        function resolveLinkUrlData(result,parent,nometa) {
            var resultXml = loadXML(result);
            parent.empty();
            if(!resultXml||resultXml=="[]"){
                nometa.removeClass("hide");
            }
            else {
                var html = "";
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    html+=createLinkUrlHtml(b);
                });
                parent.html(html);
            }
        }
        /**********************构造html************************/
        /**
         * 友情链接-构造html
         * @param b(单个数据项)
         */
        function createLinkUrlHtml(b) {
            var html= '<tr data-id="' + b._id + '">'
                        + '<td class="name">' + b.name + '</td>'
                        + '<td class="url">' + b.url + '</td>'
                        + '<td class="pic">' + b.pic + '</td>'
                        + '<td class="operate"><span class="update"><a href="javascript:;"></a></span><span class="delete"><a href="javascript:void(0);"></a></span></td>'
                     + '</tr>';
            return html;
        }
        /**
         * 友情链接-构造html
         * @param name(编辑对象的名称)
         * @param url(编辑对象的链接地址)
         * @param img(图片信息)
         */
        function createLinkUrlModelHtml(name,url,img) {
            var html='<div class="form-group">'
                    +'<label  class="col-sm-2 control-label">链接名称'
                    +'<span class="must_sym">*</span>'
                    +'</label>'
                    +'<div class="col-sm-10">'
                    +'<input type="text" class="form-control" id="name" value="'+name+'" placeholder="链接名称">'
                    +'</div>'
                    +'</div>'
                    +'<div class="form-group">'
                    +'<label  class="col-sm-2 control-label">链接'
                    +'<span class="must_sym">*</span>'
                    +'</label>'
                    +'<div class="col-sm-10">'
                    +'<input type="text" class="form-control" id="url" value="'+url+'" placeholder="链接地址">'
                    +'</div>'
                    +'</div>'
                    +'<div class="form-group imgSelect subPlat">'
                    +'<label  class="col-sm-2 control-label">图标'
                    +'<span class="must_sym">*</span>'
                    +'</label>'
                    +'<div class="col-sm-10 text-left">'
                    +'<input type="file" accept="image/png,image/jpg,image/jpeg,image/gif,image/jpg" name="up_img_wu_file_0"  id="up_img_wu_file_0"  onchange="selectImage(this);" class="form-control padding0" multiple="multiple" placeholder="图标"/>'
                    +'<input type="button" value="上传图片" class="upload btn btn-primary uploadImg" id="UploadOne" onclick="unLoadImg(this)"/>'
                    +'<div  class="suggectSize">建议比例140*80(px)</div>'
                    +'<div class="imgSetting" style="width: 11.667rem;height: 6.667rem;">'
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
         * 友情链接-结果回调
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
        function assist() {
            //拖拽上传图片
            bindDragUpload($(".imgSetting"));
        }
        return {
            init:init
        }//返回init函数
    })();
    LinkUrlList.init();//友情链接信息初始化
});//友情链接模块