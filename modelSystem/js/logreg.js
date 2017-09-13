$(function () {

    /**********************操作对象************************/
    var $LogInput = $("#logFrom").find("input");
    var $RegInput = $("#regForm").find("input");
    var $login = $("#login");
    var $logName = $("#log_name");
    var $logPassword = $("#log_password");
    var $regBtn = $("#reg_btn");
    var $register = $('.register');
    var $loginclass = $('.login');
    var $goLogin = $('#go_login');
    var $goReg = $('#go_reg');
    var $form = $('form');

    var loginList = (function () {
        /**********************初始化************************/
        function init() {
            initial();
            bindEvent()
        }

        /**********************绑定事件************************/
        function bindEvent() {
            //点击登录
            $login.on('click', function () {
                login()
            });
            //修改密码
            $regBtn.click(function () {
                changePassword()
            });
            /*修改密码页*/
            $goLogin.click(function () {
                $register.hide();
                $loginclass.slideDown(500);
                $LogInput.val("");
                $RegInput.val("")
            });
            /*登陆页*/
            $goReg.click(function () {
                $loginclass.hide();
                $register.slideDown(500);
                $LogInput.val("");
                $RegInput.val("")
            });
            /*回车登陆*/
            $('body').keydown(function (event) {
                var e = window.event || event;
                if ($login.css("display") === "block" && $register.css("display") === "none") {
                    if (e.keyCode === 13) {
                        login();
                    }
                } else {
                    if (e.keyCode === 13) {
                        changePassword();
                    }
                }
            })
        }

        /**********************事件绑定操作************************/

        /*登陆*/
        function login() {
            var loginName = $logName.val().trim();
            var logPassword = $logPassword.val().trim();
            if (loginName === "") {
                layer.msg('请填入用户名');
            } else if (logPassword === "") {
                layer.msg('请填入密码');
            } else {
                var surl = LoadUrl() + "axis2/services/MyService/loginModel";
                $.ajax({
                    type: "POST",
                    url: surl,
                    data: {
                        "user": loginName,
                        "password": $.md5(logPassword)
                    },
                    dataType: "text",
                    success: function (result) {
                        result = loadXML(result);
                        // console.log(result);
                        if (result === '2') {
                            layer.msg('该账户未授权登录此系统！')
                        } else if (result === '-1' || result === '1') {
                            layer.msg('登录失败！');
                        } else {
                            layer.msg('登录成功！');
                            sessionStorage.setItem("loginName", loginName);
                            // sessionStorage.setItem("guid", result);
                            window.location.href = "index.html";
                        }
                    }
                })
            }
        }

        /*修改密码*/
        function changePassword() {
            var nameVal = $('#reg_name').val().trim(),
                pwdVal = $('#reg_password').val().trim(),
                enpwdVal = $('#ensure_password').val().trim();
            if (nameVal === "") {
                layer.tips('用户名不能为空', '#reg_name')
            } else if (nameVal.length < 1 || nameVal.length > 15) {
                layer.tips('请输入1至15位长度的用户名', '#reg_name')
            } else if (pwdVal === "") {
                layer.tips('原始密码不能为空', '#reg_password')
            } else if (enpwdVal === "") {
                layer.tips('新密码不能为空', '#ensure_password')
            } else {
                $.ajax({
                    type: "POST",
                    url: LoadUrl() + "axis2/services/MyService/changePasswordModel",
                    data: {
                        "user": nameVal,
                        "oldPass": $.md5(pwdVal),
                        "newPass": $.md5(enpwdVal)
                    },
                    dataType: "text",
                    success: function (result) {
                        result = loadXML(result);
                        if (result === 'true') {
                            layer.msg('恭喜你修改成功,请登陆');
                            $loginclass.css("display", "");
                            $register.css("display", "none")
                        } else {
                            layer.msg('修改失败')
                        }
                    }
                })
            }
        }

        /*初始状态*/
        function initial() {
            $LogInput.val("");
            $RegInput.val("");
            $form.slideDown(500);
            $register.hide(0);
            $loginclass.show(500);
        }

        return {
            init: init
        }
    })();

    loginList.init()
});