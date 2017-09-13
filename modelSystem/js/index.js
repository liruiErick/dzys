$(function () {
    // ***********************************导航栏***********************************
    // 导航栏点击效果
    $(document).on('click', '.firnav > li > p', function () {
        var liObj = $(this).parent('li');
        liObj.addClass('active').siblings('li').removeClass('active');
    });

    $('.logo').click(function () {
        $('.main').toggleClass('openMenu');
        $('.main').hasClass('openMenu') ? $("#mainframe").css("width", "17.2rem") : $("#mainframe").css("width", "18.65rem");
    });
    $('.firnav > li').click(function () {
        $('.main').addClass('openMenu');
        $('.main').hasClass('openMenu') ? $("#mainframe").css("width", "17.2rem") : $("#mainframe").css("width", "18.65rem");
    });
    // ***********************************数据项管理***********************************
    // 获取数据项
    $(document).on('click', '.lastnav li', function () {
        $(this).toggleClass('active').siblings('li').removeClass('active')
    });

    // ********* 模态框 *********
    $('#addauthority').click(function () {
        $('#insert_rank').on("show.bs.modal", function () {
            $('#insert_rank input').val("");
            $('#insert_rank textarea').val("");
        });
        $('#insert_rank').modal('show')
    });

    // 退出登录
    $('.logout').click(function () {
        layer.confirm('您确定要退出系统吗？', {
            btn: ['确定', '取消']
        }, function () {
            layer.msg('已退出登录，欢迎下次访问系统！', {
                time: 1500
            }, function () {
                location.href = 'logreg.html';
            })
        })
    })
});

$(function () {
    /**********************操作对象************************/
    var $userName = $("#user_name");
    var $scrollTop = $("#scrollTop");

    var IndexList = (function () {
        /**********************初始化************************/
        function init() {
            SetIframeSrc();
            bindEvent();
        }

        /**********************绑定事件************************/
        function bindEvent() {
            $scrollTop.off().click(function (e) {
                e.stopPropagation();
                $("html,body").animate({scrollTop: "0px"}, 500);
            });
        }

        /**********************辅助操作************************/
        function SetIframeSrc() {
            // setUserAuthority();
            $userName.html('欢迎，'+sessionStorage.getItem("loginName"));//显示登陆账户名
        }//设置iframe内容

        // function setUserAuthority() {
        //     if (sessionStorage.getItem("loginName") != "admin") {
        //         $("#mainframe").attr("src", "pages/newsPage.html");
        //         $("#securityMan").addClass("hide");
        //         $("#baseSet").addClass("hide");
        //         $("#InterNetEdit").find("li").each(function () {
        //             $(this).attr("data-tagno") != "pages/newsPage.html" ? $(this).addClass("hide") : null;
        //         });
        //
        //     }
        // }//设置不同用户显示的内容

        return {
            init: init
        }
    })();
    IndexList.init();
});