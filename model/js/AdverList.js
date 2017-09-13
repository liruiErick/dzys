/**
 * Created by lirui on 2017/6/13.
 */
$(function () {

    /**********************操作对象************************/
    var $editAdver=$("#editAdver");
    var $submitEdit=$("#submitEdit");
    var $editAdverHuge=$("#editAdverHuge");
    var $nometa=$("#nometa");
    var $nometaHuge=$("#nometaHuge");
    var $existsImg=$("#existsImg");
    var $existsSmallImg=$("#existsSmallImg");
    var imgSrc="../../images/";//图片默认路径

    var AdverList=(function () {
        /**********************初始化************************/
        function init() {
            fetchdata();
            bindEvent();
        }
        /**********************数据初始化************************/
        function fetchdata() {
            fetchAdverData();
        }
        /**********************绑定事件************************/
        function bindEvent() {
            /*编辑广告*/
            $submitEdit.on('click',function() {
                bindEditForAdver(LoadUrl() + "axis2/services/MyService/EditAdvertiseCustom",$("#imgPath").val(),$("#linkurl").val().trim(),$("#linkurl").attr("data-id"),$("#hugeImgePath").val(),$("#linkurlHuge").val().trim(),$("#linkurlHuge").attr("data-id"));
            });
        }
        /**********************事件绑定操作************************/
        /**
         * 事件绑定-编辑广告
         * @param surl(ajax请求地址)
         * @param pic1(左边小广告图片信息)
         * @param url1(左边小广告链接地址)
         * @param id1(左边小广告的id)
         * @param pic2(右边大广告图片信息)
         * @param url2(右边大广告链接地址)
         * @param id2(右边大广告的id)
         */
        function bindEditForAdver(surl,pic1,url1,id1,pic2,url2,id2) {
            var SmallPic=pic1==""?$existsSmallImg.val():pic1;
            var HugePic=pic2==""?$existsImg.val():pic2;
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "pic":SmallPic,
                    "url":url1,
                    "id":id1
                },
                dataType: "text",
                success: function (result) {
                }
            });
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "pic":HugePic,
                    "url":url2,
                    "id":id2
                },
                dataType: "text",
                success: function (result) {
                    EditSuccessTips();
                }
            });
        }
        /**********************数据获取************************/
        function fetchAdverData() {
            randerAdver(LoadUrl() + "axis2/services/MyService/GetAllAdvertisesCustom",$editAdver,$nometa,$editAdverHuge,$nometaHuge);
        }
        /**********************数据渲染************************/
        /**
         * 数据渲染-渲染广告
         * @param surl(ajax请求地址)
         * @param parent1(左边小广告外包的父级对象)
         * @param nometa1(左边小广告无内容时显示的对象)
         * @param parent2(右边大广告外包的父级对象)
         * @param nometa2(右边大广告无内容时显示的对象)
         */
        function randerAdver(surl,parent1,nometa1,parent2,nometa2) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                },
                dataType: "text",
                contentType:"text/xml",
                success: function (result) {
                    resolveSmallAdverData(result,parent1,nometa1);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            });
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                },
                dataType: "text",
                contentType:"text/xml",
                success: function (result) {
                    resolveHugeAdverData(result,parent2,nometa2);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**********************数据处理************************/
        /**
         * 数据处理-渲染小图广告
         * @param result(广告数据)
         * @param parent(广告外包的父级对象)
         * @param nometa(广告无内容时显示的对象)
         */
        function resolveSmallAdverData(result,parent,nometa) {
            var resultXml = loadXML(result);
            parent.empty();
            if(resultXml=="[]"||!resultXml){
                nometa.removeClass("hide");
            }
            else {
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    if(b.type&&parseInt(b.type)==0){
                        $existsSmallImg.val(b.pic);
                        parent.html(createSmallAdverHtml(b.pic,b._id,b.url));
                    }
                });
                //拖拽上传图片
                bindDragUpload($(".wrapImg"));
            }
        }
        /**
         * 数据处理-渲染大图广告
         * @param result(广告数据)
         * @param parent(广告外包的父级对象)
         * @param nometa(广告无内容时显示的对象)
         */
        function resolveHugeAdverData(result,parent,nometa) {
            var resultXml = loadXML(result);
            parent.empty();
            if(resultXml=="[]"||!resultXml){
                nometa.removeClass("hide");
            }
            else {
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    if(b.type&&parseInt(b.type)==1){
                        $existsImg.val(b.pic);
                        parent.html(createHugeAdverHtml(b.pic,b._id,b.url));
                    }
                });
                //拖拽上传图片
                bindDragUpload($(".wrapImg"));
            }
        }
        /**********************构造html************************/
        /**
         * 构造html-构造小图广告html
         * @param pic(广告图片信息)
         * @param id(广告的id)
         * @param url(广告的链接地址)
         */
        function createSmallAdverHtml(pic,id,url) {
            var html = "";
            html +='<div class="wrapImg16and9">'
                    +'<div class="wrapImg overflowHidden">'
                    +'<img id="imgShow_wu_file_0" alt="" src="'+imgSrc+pic+'"/>'
                    +'</div>'
                    +'</div>'
                    +'<div class="caption imgupload">'
                    +'<div class="uploadComp">'
                    +'<input type="file" value="上传图片" id="up_img_wu_file_0" onchange="selectImage(this)" class="pull-left"/>'
                    +'<input type="button"  id="UploadOne" onclick="unLoadImg(this)" class="pull-right btn btn-primary" value="上传图片"/>'
                    +'</div>'
                    +'<div class="link">'
                    +'<div class="input-group">'
                    +'<span class="input-group-addon">链接地址</span>'
                    +'<input type="text" class="form-control"  data-id="'+id+'" id="linkurl" value="'+url+'" placeholder="链接地址"/>'
                    +'</div>'
                    +'</div>'
                    +'<div class="clear"></div>'
                    +'</div>';
            return html;
        }
        /**
         * 构造html-构造大图广告html
         * @param pic(广告图片信息)
         * @param id(广告的id)
         * @param url(广告的链接地址)
         */
        function createHugeAdverHtml(pic,id,url){
            var  html= '<div class="wrapImg4and3">'
                        +'<div class="wrapImg overflowHidden">'
                        + '<img id="imgShow_wu_file_4"  alt="" src="'+imgSrc+pic+'"/>'
                        + '</div>'
                        + '</div>'
                        + '<div class="caption imgupload">'
                        + '<div class="uploadComp">'
                        + '<input type="file" value="上传图片" id="up_img_wu_file_4" onchange="selectImage(this)"  class="pull-left"/>'
                        + '<input type="button"  id="UploadFive" onclick="unLoadImg(this)" class="pull-right btn btn-primary" value="上传图片"/>'
                        + '</div>'
                        + '<div class="link">'
                        + '<div class="input-group">'
                        + '<span class="input-group-addon">链接地址</span>'
                        + '<input type="text" class="form-control" data-id="'+id+'" value="'+url+'" id="linkurlHuge" placeholder="链接地址"/>'
                        + '</div>'
                        + '</div>'
                        + '<div class="clear"></div>'
                        + '</div>';
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
        return {
            init:init
        }//返回init函数
    })();
    AdverList.init();//广告信息初始化
});//广告设定管理模块