/**
 * Created by lirui on 2017/6/14.
 */
$(function () {
    /**********************操作对象************************/
    var $userName= $("#user_name");
    var $scrollTop=$("#scrollTop");

    var IndexList=(function () {
        /**********************初始化************************/
        function init() {
            SetIframeSrc();
            bindEvent();
        }
        /**********************绑定事件************************/
        function bindEvent() {
            $scrollTop.off().click(function (e) {
                e.stopPropagation();
                $("html,body").animate({scrollTop:"0px"},500);
            });
        }
        /**********************辅助操作************************/
        function SetIframeSrc() {
            setUserAuthority();
            $userName.html(sessionStorage.getItem("loginName"));//显示登陆账户名
        }//设置iframe内容
        function setUserAuthority() {
            if(sessionStorage.getItem("loginName")!="admin"){
                $("#mainframe").attr("src","pages/newsPage.html");
                $("#securityMan").remove();
                $("#baseSet").remove();
                $("#InterNetEdit").find("li").each(function () {
                    $(this).attr("data-tagno")!="pages/newsPage.html"?$(this).addClass("hide"):null;
                });

            }
        }//设置不同用户显示的内容
        return {
            init:init
        }//返回init函数
    })();
    IndexList.init();
});