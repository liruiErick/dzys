/**
 * Created by lirui on 2017/6/13.
 */
$(function () {

    /**********************操作对象************************/
    var $metaSave=$("#meta_save");
    var $eusername=$("#eusername");
    var $eaddress=$("#eaddress");
    var $epassword=$("#epassword");
    var $esmtp=$('#esmtp');
    var $ereceiveadd=$('#ereceiveadd');
    var $server=$('#server');
    var $yuanwenlianjie_meta_save=$("#yuanwenlianjie_meta_save");
    var $yuanwenlianjieeaddress=$("#yuanwenlianjieeaddress");
    var $yuanwenlianjieeusername=$("#yuanwenlianjieeusername");
    var $yuanwenlianjieepassword=$("#yuanwenlianjieepassword");
    var $yuanwenlianjieesmtp=$('#yuanwenlianjieesmtp');
    var $yuanwenlianjieereceive=$('#yuanwenlianjieereceive');
    var $yuanwenlianjieserver=$('#yuanwenlianjieserver');

    var $getkehichaxin=$('#getkehichaxin');
    var $getyuanwenqingqiu=$('#getyuanwenqingqiu');
    var $kehichaxin=$('#kehichaxin');
    var $yuanwenqingqiu=$('#yuanwenqingqiu');




    var EmailList=(function () {
        /**********************初始化************************/
        function init() {
            fetchdata();
            bindEvent();
        }
        /**********************数据初始化************************/
        function fetchdata() {
            fetchEmaildata();
        }
        /**********************绑定事件************************/
        function bindEvent() {
            /*编辑科技查新邮箱信息*/
            $metaSave.on('click',function(){
                bindEditForEmail(LoadUrl() + "axis2/services/MyService/EditEmailSettingCustom",$server.val().trim(),$eaddress.val().trim(),$eusername.val().trim(),$epassword.val().trim(),$esmtp.val().trim(),$ereceiveadd.val().trim(),"查新",'#eaddress','#ereceiveadd');
            });
            /*编辑原文链接邮箱信息*/
            $yuanwenlianjie_meta_save.off().on('click',function(e){
                e.stopPropagation();
                bindEditForEmail(LoadUrl() + "axis2/services/MyService/EditEmailSettingCustom",$yuanwenlianjieserver.val().trim(),$yuanwenlianjieeaddress.val().trim(),$yuanwenlianjieeusername.val().trim(),$yuanwenlianjieepassword.val().trim(),$yuanwenlianjieesmtp.val().trim(),$yuanwenlianjieereceive.val().trim(),"原文",'#yuanwenlianjieeaddress','#yuanwenlianjieereceive');
            });
        }
        /**********************事件绑定操作************************/
        /**
         * 事件绑定-编辑邮箱
         * @param surl(ajax请求地址)
         * @param address(发送邮箱地址)
         * @param user(名称)
         * @param password(发送邮箱密码)
         * @param smtp(发送邮箱SMTP)
         * @param receiveaddress(接收邮箱地址)
         * @param type(判断是科技文献或原文请求字段)
         * @param checkaddress(发送邮箱地址内容的id)
         * @param checkreaddress(接收邮箱地址的id)
         * @param server(邮件服务器)
         */
        function bindEditForEmail(surl,server,address,user,password,smtp,receiveaddress,type,checkaddress,checkreaddress) {
            if(!isEmail(address)){
                layer.tips('请输入正确的发送邮箱格式', checkaddress);
            }else if(!isEmail(receiveaddress)){
                layer.tips('请输入正确的接受邮箱格式', checkreaddress);
            }else{
                $.ajax({
                    type: "POST",
                    url: surl,
                    data: {
                        "server":server,
                        "user":user,
                        "address":address,
                        "password":password,
                        "smtp":smtp,
                        "receiveaddress":receiveaddress,
                        "type":type
                    },
                    dataType: "text",
                    success: function (result) {
                        EditSuccessTips();
                    },
                    error:function (mes) {
                        fetchDataFailed(mes);
                    }
                });
            }
        }
        /**********************数据获取************************/
        function fetchEmaildata() {
            randerEmail();
        }
        /**********************数据渲染************************/
        function randerEmail() {
            var surl = LoadUrl() + "axis2/services/MyService/GetEmailSettingCustom";
            $.ajax({
                type: "POST",
                url: surl,
                data: {
                },
                dataType: "text",
                contentType:"text/xml",
                success: function (result) {
                    resolveEmailData(result);
                },
                error:function (mes) {
                    fetchDataFailed(mes);
                }
            })
        }
        /**********************数据处理************************/
        function resolveEmailData(result) {
            var resultXml = loadXML(result);
            if(!resultXml||resultXml=="[]"){
                layer.msg("暂无邮箱数据");
                return false;
            }
            else{
                var resultJson = jQuery.parseJSON(resultXml);
                $.each(resultJson,function (a,b) {
                    if(b.type&&b.type=="查新"){
                        $server.val(b.server);
                        $eusername.val(b.user);
                        $eaddress.val(b.address);
                        $epassword.val(b.password);
                        $esmtp.val(b.smtp);
                        $ereceiveadd.val(b.receiveaddress);
                        /*CreateEmailHtml();*/
                    }
                    else if(b.type&&b.type=="原文"){
                        $yuanwenlianjieserver.val(b.server);
                        $yuanwenlianjieeusername.val(b.user);
                        $yuanwenlianjieeaddress.val(b.address);
                        $yuanwenlianjieepassword.val(b.password);
                        $yuanwenlianjieesmtp.val(b.smtp);
                        $yuanwenlianjieereceive.val(b.receiveaddress);
                    }
                })
            }
        }
        /**********************构造html************************/
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
        /**
         * 验证邮箱-验证邮箱内容
         * @param str(地址内容)
         */
        function isEmail(str){
            var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
            return reg.test(str);
        }
        return {
            init:init
        }//返回init函数
    })();
    EmailList.init();//邮箱信息初始化
});//邮箱管理模块