/**
 * Created by lirui on 2017/6/13.
 */
$(function () {

    /**********************操作对象************************/
    var $editSubPlat=$("#editSubPlat");
    var $mometa=$("#nometa");
    var $subPlatTable=$("#subPlatTable");
    var $rankSave=$("#edit_subPlat");
    var $deleteSubPlat=$("#deleteSubPlat");
    var $platNews=$("#platNews");
    var $selid=$('#selid');
    var $metaSave=$("#meta_save");
    var $editSubPlatBody=$('#editSubPlatBody');
    var $insertRank=$('#insert_rank');
    var $imgPath=$("#imgPath");
    var $existsImg=$("#existsImg");
    var imgSrc="../../images/";//图片默认路径

    var SubPlatList=(function () {
        /**********************初始化************************/
        function init() {
            fetchdata();
            bindEvent();
            assist();
        }
        /**********************数据初始化************************/
        function fetchdata() {
            fetchSubPlatdata();
        }
        /**********************绑定事件************************/
        function bindEvent() {
            /*模态框--修改数据项*/
            $editSubPlat.on('click',function () {
                var SubPlatTr=0;
                $subPlatTable.find("tr").each(function () {
                    if($(this).hasClass("slideActive")){
                        var thisUpdate = $(this);
                        $selid.val(thisUpdate.attr("data-id"));
                        var tdArr = thisUpdate.find('td');
                        $insertRank.modal('show');
                        $existsImg.val(tdArr[5].innerText);
                        $editSubPlatBody.empty();
                        $editSubPlatBody.html(createSubPlatModelHtml(tdArr[0].innerText,tdArr[1].innerText,tdArr[2].innerText,tdArr[3].innerText,tdArr[4].innerText,tdArr[5].innerText,thisUpdate.attr("data-abstract")));
                        //拖拽上传图片
                        bindDragUpload($(".imgSetting"));
                    }
                    else{
                        SubPlatTr++;
                    }
                });
                if($subPlatTable.find("tr").length==SubPlatTr){
                    layer.msg("请选中子平台");
                    return;
                }
            });
            /*子平台编辑*/
            $rankSave.click(function () {
                var pic=$existsImg.val()==""?$imgPath.val():$existsImg.val();
                bindEditForSubPlat(LoadUrl() + "axis2/services/MyService/EditSubPlatCustom",$selid.val(),$("#nameEdit").val().trim(),$("#ennameEdit").val().trim(),$("#detailsEdit").val().trim(),pic,$("#abbEdit").val().trim(),$("#urlEdit").val().trim(),$("#homeurlEdit").val().trim());
            });
            /*删除数据*/
            $deleteSubPlat.click(function () {
                var SubPlatTr=0;
                $subPlatTable.find("tr").each(function () {
                    if($(this).hasClass("slideActive")){
                        var _this=this;
                        layer.confirm('删除后将不可恢复，您确定要删除吗？', {
                            btn: ['删除','取消']
                        },function() {
                            bindDeleteForSubPlat(LoadUrl() + "axis2/services/MyService/DeleteSubPlatCustom",$(_this).attr("data-id"));
                        },function(index) {
                            layer.close(index);
                        });
                    }
                    else{
                        SubPlatTr++;
                    }
                });
                if($subPlatTable.find("tr").length==SubPlatTr){
                    layer.msg("请选中子平台");
                    return;
                }
            });
            /*进入平台新闻*/
            $platNews.on('click',function () {
                var SubPlatTr=0;
                $subPlatTable.find("tr").each(function () {
                    if($(this).hasClass("slideActive")){
                        $.cookie("formId",$(this).get(0).dataset.formid);
                        window.location.href="PlatNews.html";
                    }
                    SubPlatTr++;
                });
                if($subPlatTable.find("tr").length==SubPlatTr){
                    layer.msg("请选中子平台");
                    return;
                }
            });
            /*添加子平台*/
            $metaSave.click(function () {
                bindAddForSubPlat(LoadUrl() + "axis2/services/MyService/AddSubPlatCustom",$("#nameAdd").val().trim(),$("#ennameAdd").val().trim(),$("#detailsAdd").val().trim(),$imgPath.val(),$("#abbAdd").val().trim(),$("#urlAdd").val().trim(),$("#homeurlAdd").val().trim());
            });
        }
        /**********************事件绑定操作************************/
        /**
         * 事件绑定-编辑子平台
         * @param nurl(ajax请求地址)
         * @param id(子平台的id)
         * @param name(子平台的中文名称)
         * @param enname(子平台的英文名称)
         * @param details(子平台的详情)
         * @param pic(子平台的图标)
         * @param url(置顶链接地址)
         * @param abb(子平台的摘要)
         * @param homeurl(子平台的简介全文链接)
         */
        function bindEditForSubPlat(nurl,id,name,enname,details,pic,abb,url,homeurl) {
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                    "id":id,
                    "name":name,
                    "enname":enname,
                    "details":details,
                    "pic":pic,
                    "abb":abb,
                    "url":url,
                    "homeurl":homeurl
                },
                dataType: "text",
                success: function (result) {
                    EditSuccessTips();
                }
            });
        }
        /**
         * 事件绑定-删除子平台
         * @param nurl(ajax请求地址)
         * @param id(子平台的id)
         */
        function bindDeleteForSubPlat(nurl,id) {
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
         * 事件绑定-添加子平台
         * @param nurl(ajax请求地址)
         * @param name(子平台的中文名称)
         * @param enname(子平台的英文名称)
         * @param details(子平台的详情)
         * @param pic(子平台的图标)
         * @param url(置顶链接地址)
         * @param abb(子平台的摘要)
         * @param homeurl(子平台的简介全文链接)
         */
        function bindAddForSubPlat(nurl,name,enname,details,pic,abb,url,homeurl) {
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                    "name":name,
                    "enname":enname,
                    "details":details,
                    "pic":pic,
                    "abb":abb,
                    "url":url,
                    "homeurl":homeurl
                },
                dataType: "text",
                success: function (result) {
                    AddSuccessTips();
                }
            });
        }
        /**********************数据获取************************/
        function fetchSubPlatdata() {
            randerSubPlat(LoadUrl() + "axis2/services/MyService/GetAllSubPlatCustom",$subPlatTable,$mometa);
        }
        /**********************数据渲染************************/
        /**
         * 数据渲染-渲染子平台
         * @param nurl(ajax请求地址)
         * @param parent(指数分类父级元素)
         * @param nometa(无内容时提示)
         */
        function randerSubPlat(nurl,parent,nometa) {
            $.ajax({
                type: "POST",
                url: nurl,
                data: {
                },
                dataType: "text",
                contentType:"text/xml",
                success: function (result) {
                    resolveSubPlatData(result,parent,nometa);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            });
        }
        /**********************数据处理************************/
        /**
         * 数据处理-处理子平台数据
         * @param result(子平台数据)
         * @param parent(指数分类父级元素)
         * @param nometa(无内容时提示)
         */
        function resolveSubPlatData(result,parent,nometa) {
            var resultXml = loadXML(result);
            parent.empty();
            if(!resultXml||resultXml=="[]"){
                nometa.removeClass("hide");
            }
            else{
                var html = "";
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    if(a==resultJson.length-1){
                        html+=createSubPlatHtml(b,1);
                    }
                    else{
                        html+=createSubPlatHtml(b,0);
                    }
                });
                parent.html(html);
            }
        }
        /**********************构造html************************/
        /**
         * 构造html-构造子平台html
         * @param b(单个数据项)
         */
        function createSubPlatHtml(b,type) {
            var html='<tr data-id="'+b._id+'" data-formid="'+b.formid+'" data-abstract="'+b.details+'">'
                        +'<td onclick="selectedTr(this,1);" class="name col-sm-1">'+b.name+'</td>'
                        +'<td onclick="selectedTr(this,1);" class="abb col-sm-1">'+b.abb+'</td>'
                        +'<td onclick="selectedTr(this,1);" class="enname col-sm-1">'+b.enname+'</td>'
                        +'<td onclick="selectedTr(this,1);" class="url col-sm-1">'+b.url+'</td>'
                        +'<td onclick="selectedTr(this,1);" class="homeurl col-sm-1">'+b.homeurl+'</td>'
                        +'<td onclick="selectedTr(this,1);" class="pic col-sm-1">'+b.pic+'</td>'
                        +'<td onclick="selectedTr(this,1);" class="details col-sm-6 text-left" title="'+b.details+'" '+ ((type === 1) ? ('style="border-bottom:0"') :'')+'>'+b.details+'</td>'
                     +'</tr>';
            return html;
        }
        /**
         * 构造html-构造子平台模态框html
         * @param name(子平台的中文名称)
         * @param enname(子平台的英文名称)
         * @param abstract(子平台的详情)
         * @param pic(子平台的图标)
         * @param url(置顶链接地址)
         * @param abb(子平台的摘要)
         * @param homeurl(子平台的简介全文链接)
         */
        function createSubPlatModelHtml(name,abb,enname,homeurl,url,pic,abstract) {
            var html ='<div class="form-group">'
                        +'<label  class="col-sm-2 control-label">名称'
                        +'<span class="must_sym">*</span>'
                        +'</label>'
                        +'<div class="col-sm-10">'
                        +'<input type="text" class="form-control" id="nameEdit" value="'+name+'" placeholder="名称"/>'
                        +'</div>'
                        +'</div>'
                        +'<div class="form-group">'
                        +'<label  class="col-sm-2 control-label">简称'
                        +'<span class="must_sym">*</span>'
                        +'</label>'
                        +'<div class="col-sm-10">'
                        +'<input type="text" class="form-control" id="abbEdit" value="'+abb+'" placeholder="简称"/>'
                        +'</div>'
                        +'</div>'
                        +'<div class="form-group">'
                        +'<label  class="col-sm-2 control-label">英文名称'
                        +'<span class="must_sym">*</span>'
                        +'</label>'
                        +'<div class="col-sm-10">'
                        +'<input type="text" class="form-control" id="ennameEdit" value="'+enname+'" placeholder="英文名称"/>'
                        +'</div>'
                        +'</div>'
                        +'<div class="form-group">'
                        +'<label  class="col-sm-2 control-label">主要链接'
                        +'<span class="must_sym">*</span>'
                        +'</label>'
                        +'<div class="col-sm-10">'
                        +'<input type="text" class="form-control" value="'+homeurl+'" id="homeurlEdit" placeholder="主要链接"/>'
                        +'</div>'
                        +'</div>'
                        +'<div class="form-group">'
                        +'<label  class="col-sm-2 control-label">简介链接'
                        +'<span class="must_sym">*</span>'
                        +'</label>'
                        +'<div class="col-sm-10">'
                        +'<input type="text" class="form-control" value="'+url+'" id="urlEdit" placeholder="简介链接"/>'
                        +'</div>'
                        +'</div>'
                        +'<div class="form-group imgSelect subPlat">'
                        +'<label  class="col-sm-2 control-label">图标'
                        +'<span class="must_sym">*</span>'
                        +'</label>'
                        +'<div class="col-sm-10 textlignLeft" >'
                        +'<input type="file" accept="image/png,image/jpg,image/jpeg,image/gif,image/jpg" name="up_img_wu_file_0"  id="up_img_wu_file_0"  onchange="selectImage(this);" style="padding: 0;" class="form-control" multiple="multiple" placeholder="图片链接"/>'
                        +'<span class="upload btn btn-primary uploadImg" id="UploadOne" onclick="unLoadImg(this);" >上传图片</span>'
                        +'<div  class="suggectSize">建议70*50(px)</div>'
                        +'<div class="imgSetting" style="width: 5.834rem;height: 5.15rem;">'
                        +'<img id="imgShow_wu_file_0" src="'+imgSrc+pic+'" id="picEdit" class="prevImg"/>'
                        +'</div>'
                        +'</div>'
                        +'</div>'
                        +'<div class="form-group">'
                        +'<label  class="col-sm-2 control-label">平台简介'
                        +'<span class="must_sym">*</span>'
                        +'</label>'
                        +'<div class="col-sm-10">'
                        +'<textarea type="text" class="form-control" rows="4" cols="6" value="" id="detailsEdit">'+abstract+'</textarea>'
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
        function assist() {
            //拖拽上传图片
            bindDragUpload($(".imgSetting"));
        }
        return {
            init:init
        }//返回init函数
    })();
    SubPlatList.init();//子平台信息初始化
});//子平台管理模块