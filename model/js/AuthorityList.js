/**
 * Created by lirui on 2017/6/13.
 */
$(function () {
    /**********************操作对象************************/
    var $editLimit=$("#editLimit");
    var $addLimit=$("#addLimit");
    var $nometa=$("#nometa");
    var $authorityTableBody=$("#authorityTableBody");
    var $editMeta=$("#edit_meta");
    var $addMeta=$('#add_meta');
    var $metaTable=$('#meta-table');
    var $addauthority=$('#addauthority');
    var $insertMeta=$("#insert_meta");
    var $insertRank=$("#insert_rank");
    var $selid=$("#selid");
    var $EditUser=$("#EditUser");
    var $EditRank=$("#EditRank");
    var $addrank=$("#addrank");
    var $adduser=$("#adduser");

    var AuthorityList=(function () {
        /**********************初始化************************/
        function init() {
            fetchdata();
            bindEvent();
        }
        /**********************数据初始化************************/
        function fetchdata() {
            fetchSubmenuData();
        }
        /**********************绑定事件************************/
        function bindEvent() {
            /*编辑权限*/
            $editMeta.on('click',function() {
                var auditingLimit;//审核权限
                var editLimit;//编辑权限
                var surl=LoadUrl() + "axis2/services/MyService/EditBackProcessUserCustom";
                $EditRank.find("option:selected").text()=="高级管理员"?auditingLimit="有":auditingLimit="无";
                editLimit=getCheckboxSelected(1);
                bindEditForAuthority(surl,$selid.val(),$EditUser.val(),$EditRank.find("option:selected").text(),auditingLimit,editLimit);
            });
            /*添加权限*/
            $addMeta.on('click',function() {
                var auditingLimit;//审核权限
                var editLimit;//编辑权限
                var surl=LoadUrl() + "axis2/services/MyService/AddBackProcessUserCustom";
                $addrank.find("option:selected").text()=="高级管理员"?auditingLimit="有":auditingLimit="无";
                editLimit=getCheckboxSelected(2);//普通管理员在添加的时候具有所选择的编辑全选
                bindAddForAuthority(surl,$adduser.val().trim(),$addrank.find("option:selected").text(),auditingLimit,editLimit,$.md5("1234"));
            });
            /*删除权限*/
            $metaTable.on('click', '.delete', function () {
                var trObj = $(this).parents('tr');
                var surl=LoadUrl() + "axis2/services/MyService/DeleteBackProcessUserCustom";
                layer.confirm('删除后将不可恢复，您确定要删除吗？', {
                    btn: ['删除','取消']
                },function() {
                    bindDeleteForAuthority(surl,trObj.attr("data-id"));
                },function(index) {
                    layer.close(index);
                });
            });
            /*编辑权限模态框*/
            $metaTable.on('click', '.update', function () {
                var trObj = $(this).parents('tr');
                $selid.val(trObj.attr("data-id"));
                $insertMeta.modal('show');
                $EditUser.val(trObj.find("td")[0].innerText);
                /*设置级别*/
                $EditRank.find("option").each(function () {
                    if($(this).val()==trObj.find("td")[1].innerText){
                        $(this).attr("selected",true);
                    }
                });
                /*设置编辑权限*/
                $editLimit.find("input[type='checkbox']").each(function () {
                    $(this).removeAttr("checked");
                    for(var j=0;j<(trObj.find("td")[3].innerText).split(";").length-1;j++){
                        if($(this).attr("data-name")==((trObj.find("td")[3].innerText).split(";")[j])){
                            $(this).prop("checked","true");
                        }
                    }
                });
            });
            /*添加权限模态框*/
            $addauthority.on('click',function () {
                /*设置领域*/
                $addLimit.find("input[type='checkbox']").each(function () {
                    $(this).removeAttr("checked");
                });
            });
        }
        /**********************事件绑定操作************************/
        /**
         * 事件绑定-编辑用户权限
         * @param surl(ajax请求地址)
         * @param id(用户的id)
         * @param user(用户名)
         * @param rank(用户级别)
         * @param auditingLimit(审核权限)
         * @param editLimit(编辑权限)
         */
        function bindEditForAuthority(surl,id,user,rank,auditingLimit,editLimit) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "id":id,
                    "user":user,
                    "rank":rank,
                    "auditingLimit":auditingLimit,
                    "editLimit":editLimit
                },
                dataType: "text",
                success: function (result) {
                    EditSuccessTips();
                },
                error:function (msg) {
                    fetchDataFailed(msg);
                }
            });
        }
        /**
         * 事件绑定-删除用户
         * @param surl(ajax请求地址)
         * @param id(用户的id)
         */
        function bindDeleteForAuthority(surl,id) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "id":id
                },
                dataType: "text",
                success: function (result) {
                    DeleteSuccessTips();
                },
                error:function (msg) {
                    fetchDataFailed(msg);
                }
            });
        }
        /**
         * 事件绑定-添加用户权限
         * @param surl(ajax请求地址)
         * @param user(用户名)
         * @param rank(用户级别)
         * @param auditingLimit(审核权限)
         * @param editLimit(编辑权限)
         * @param password(用户密码)
         */
        function bindAddForAuthority(surl,user,rank,auditingLimit,editLimit,password){
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                    "user":user,
                    "rank":rank,
                    "auditingLimit":auditingLimit,
                    "editLimit":editLimit,
                    "password":password
                },
                dataType: "text",
                success: function (result) {
                    AddSuccessTips();
                },
                error:function (msg) {
                    fetchDataFailed(msg);
                }
            });
        }
        /**********************数据获取************************/
        function fetchSubmenuData() {
            randerSubmenu(LoadUrl() + "axis2/services/MyService/getAllSubMenuName",$editLimit,$addLimit);
        }//获取编辑权限
        function fetchAuthorityData() {
            randerAuthority(LoadUrl() + "axis2/services/MyService/GetAllBackProcessUserCustom",$authorityTableBody,$nometa);
        }//获取权限管理信息
        /**********************数据渲染************************/
        /**
         * 数据渲染-渲染子菜单
         * @param surl(ajax请求地址)
         * @param parent1(添加子菜单父级元素)
         * @param parent2(编辑子菜单父级元素)
         */
        function randerSubmenu(surl,parent1,parent2) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {},
                dataType: "text",
                contentType:"text/xml",
                success: function (result) {
                    resolveSubmenuData(result,parent1,parent2);
                },
                error:function (msg) {
                    fetchDataFailed(msg);
                }
            })
        }
        /**
         * 数据渲染-渲染用户权限
         * @param surl(ajax请求地址)
         * @param parent(用户权限父级元素)
         */
        function randerAuthority(surl,parent) {
            $.ajax({
                type: "POST",
                url: surl,
                data: {},
                dataType: "text",
                contentType:"text/xml",
                success: function (result) {
                    resolveAuthorityData(result,parent);
                },
                error:function (msg) {
                    fetchDataFailed(msg);
                }
            });
        }
        /**********************数据处理************************/
        /**
         * 数据处理-处理子菜单数据
         * @param result(数据结果)
         * @param parent1(添加子菜单父级元素)
         * @param parent2(编辑子菜单父级元素)
         */
        function resolveSubmenuData(result,parent1,parent2) {
            var resultXml = loadXML(result);
            if(resultXml=="[]"||!resultXml){
                layer.msg("没有菜单数据",{time:"100"});
                return;
            }
            else{
                var shtml ='';
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson, function (a, b) {
                    $.cookie(b.itemid,b.menu);
                    $.cookie(b.menu,b.itemid);
                    shtml+=createSubmenuHtml(b);
                });
                shtml +='<label  class="checkbox-inline" onclick="setall(this);">全选</label>';
                parent1.html(shtml);
                parent2.html(shtml);
                fetchAuthorityData();//获取用户权限列表
            }
        }
        /**
         * 数据处理-处理子菜单数据
         * @param result(数据结果)
         * @param parent(用户权限父级元素)
         */
        function resolveAuthorityData(result,parent) {
            var resultXml = loadXML(result);
            parent.empty();
            if(!resultXml||resultXml=="[]"){
                nometa.removeClass("hide");
            }
            else{
                var html = "";
                result = jQuery.parseJSON(resultXml);
                $.each(result, function (a, b) {
                    if(b.user!="admin"){
                        html+=createAuthorityHtml(b);
                    }
                });
                parent.html(html);
            }
        }
        /**********************构造html************************/
        /**
         * 构造html-构造子菜单html
         * @param b(单条用户权限数据)
         */
        function createAuthorityHtml(b) {
            var html='<tr data-id="'+b._id+'">'
                            +'<td class="user">'+b.user+'</td>'
                            +'<td class="rank">'+b.rank+'</td>'
                            +'<td class="auditingLimit">'+b.AuditingLimit+'</td>'
                            +'<td class="editLimit">'+getEditLimitStr(b.EditLimit)+'</td>'
                            +'<td class="last"><span class="update insert_meta" style="background: none;"><a href="javascript:;"></a></span><span class="delete"><a href="javascript:;"></a></span></td>'
                      +'</tr>';
            return html;
        }
        /**
         * 构造html-构造子菜单html
         * @param b(单条子菜单数据)
         */
        function createSubmenuHtml(b) {
            var html='<label  class="checkbox-inline marginl16"><input type="checkbox" data-itemid="'+b.itemid+'" data-name="'+b.menu+'" value="option1">'+b.menu+'</label>';
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
    AuthorityList.init();//权限信息初始化
});//权限管理模块