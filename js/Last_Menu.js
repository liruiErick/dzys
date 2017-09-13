// 异步请求页头和页尾
var l_url = location.pathname,
    sub = l_url;
l_url = l_url.substring(l_url.lastIndexOf("/"));
var tmp = (l_url !== "/index.html" && l_url !== "/GlobalSearch.html" && l_url !== "/SearchResult.html" && l_url !== "/SubIndex.html" && l_url !== '/UserCenter.html' && l_url !== '/') ? '../' : '',
    _tmp = (l_url === '/SubIndex.html' || sub.indexOf('InternetThings') !== -1) ? 'Sub' : '';
// console.log(tmp);
// console.log(_tmp);
$('#header').load(tmp + _tmp + 'header.php', function () {
    var btn_box = '<div class="ls-btn-box"><a id="login" href="javascript: void(0);">登录</a><a id="sign" href="javascript: void(0);">注册</a></div>',
        user_box = '<div class="user-hover-box"><div class="user-name">...</div><div class="user-box"><div class="user-center"><a href="javascript:void(0);">个人中心</a></div><div class="login-out">退出登录</div></div></div>',
        ll = localStorage['loginName'],
        lo = localStorage['only'],
        sl = getCookie('loginName'),
        so = getCookie('only');
    // console.log(ll);
    // console.log(lo);
    // console.log(sl);
    // console.log(so);
    ((sl && so) || (ll && lo)) ? checkUser(sl || ll, so || lo, user_box, btn_box, tmp) : loadFooter(false, user_box, btn_box);
});

function checkUser(user, guid, user_box, btn_box, tmp) {
    $.ajax({
        type: 'POST',
        url: LoadUrl() + 'axis2/services/MyService/checkUserValid',
        data: {
            'user': user,
            'guid': guid
        },
        dataType: 'text',
        success: function (res) {
            res = xmlForJson(res);
            // console.log(res);
            if (res) {
                user_box = '<div class="user-hover-box"><div class="user-name">' + user + '</div><div class="user-box"><div class="user-center"><a href="' + tmp + 'UserCenter.html">个人中心</a></div><div class="login-out">退出登录</div></div></div>';
                loadFooter(true, user_box, btn_box)
            } else {
                removeCookie();
                localStorage.clear();
                loadFooter(false, user_box, btn_box);
            }
        },
        error: function () {
            localStorage.clear();
            removeCookie();
            loadFooter(false, user_box, btn_box);
        }
    });
}

function loadFooter(isLogin, user_box, btn_box) {
    $('#footer').load(tmp + 'footer.php', function () {
        if (isLogin) {
            $('#con_box').html(user_box);
            bindEventForSignOut(btn_box); // 仅为`退出登录按钮绑定事件`
        } else {
            $('#con_box').html(btn_box);
            bindEventForLR();
        }
        // $('.footer-com-logo').attr('src', tmp + 'images/logo2.png');
        $.ajax({
            type: "POST",
            url: LoadUrl() + "axis2/services/MyService/getLinkUrlList",
            data: {},
            dataType: "text",
            contentType: "text/xml",
            success: function (result) {
                var html = "",
                    html1 = "";
                if (result) {
                    var r = xmlForJson(result);
                    // console.log(r);
                    $.each(r, function (a, b) {
                        var _target = b.url;
                        if (b.url.length > 0) {
                            if (b.url.indexOf("http://") !== 0) {
                                _target = "http://" + b.url;
                            }
                        }
                        // console.log(_target);
                        if (b.pic) {
                            var tp = b.pic;
                            if (b.pic.indexOf('images') !== 0) {
                                tp = "images/" + b.pic;
                            }
                            html += '<div class="item clearfloat">'
                                + '<div class="fl logo"><a href="' + _target + '" target="_blank"><img src="' + tmp + tp + '" style="width:140px;height:80px;margin-right:20px;" alt=""></a></div>'
                                + '<div class="fl txt"><h3><a href="' + _target + '" target="_blank">' + b.name + '</a></h3></div>'
                                + '</div>';
                        }
                        else {
                            html1 += '<li><a href="' + _target + '" target="_blank">' + b.name + '</a></li>';
                        }
                    });
                    $("#scroll2").html(html);
                    $("#yqid").html(html1);
                }
                LoadJS();
            }
        });
    })
}

function bindEventForSignOut(btn_box) {
    $('.login-out').off().click(function () {
        localStorage.clear();
        removeCookie();
        if (l_url === '/UserCenter.html') {
            location.href = 'index.html'
        } else {
            $('h1.biaoti').find('div, .req-yw').hide();
            $('#con_box').html(btn_box);
        }
        // 为 model 绑定事件
        bindEventForLR();
    })
}

function bindEventForLR() {
    var v_h = window.innerHeight,
        c_i = $('#closeId'),
        wel = $('.wel'),
        m_box = $('.modal-box'),
        div = $('.pro'),
        m_b = $('.model-body'),
        m_h_1 = 309, //m_b.height()-登录框高度
        m_h_2 = 535, //m_b.height()-注册框高度
        m_h_3 = 460, //m_b.height()-注册找回密码框高度
        top_1 = (v_h - m_h_1) / 2,
        top_2 = (v_h - m_h_2) / 2,
        top_3 = (v_h - m_h_3) / 2;
    $('.ls-btn-box a').off().on('click', function (event) {
        var e = window.event || event;
        e.stopPropagation();
        var what = $(this).attr('id');
        if (what === 'login') {
            wel.text('欢迎登录');
            $('.nor-box, .login-form').show();
            $('.reset-box, .register-form').hide();
            showModal(m_box, m_b, top_1, top_2, top_3, wel, true);
        } else if (what === 'sign') {
            wel.text('欢迎注册');
            $('.nor-box, .register-form').show();
            $('.reset-box, .login-form').hide();
            showModal(m_box, m_b, top_1, top_2, top_3, wel, false);
        }
    });
    div.off().bind('click', function (event) {
        var e = window.event || event;
        e.stopPropagation();
        if ($(this).attr('class').indexOf('modal-box') !== -1) {
            hideModal(m_box, m_b)
        }
    });
    c_i.off().click(function () {
        hideModal(m_box, m_b);
        return false
    })
}

function hideModal(m_box, m_b) {
    $('input.txt-box').val('');
    $('.register-form p.def, span.tip').addClass('hide');
    m_box.animate({opacity: 0}, 'fast').hide('fast');
    m_b.animate({top: 0}, 'fast');
}

function showModal(m_box, m_b, top_1, top_2, top_3, wel, where) {
    m_box.show().animate({opacity: 1}, 'fast');
    where ? m_b.animate({top: top_1 + 'px'}, 'fast') : m_b.animate({top: top_2 + 'px'}, 'fast');
    $('.msg').off().click(function () {
        var txt = $(this).attr('rel');
        wel.text(txt);
        $('.form-to').animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 300);
        if (txt === '欢迎登录') {
            m_b.animate({top: top_1 + 'px'}, 200);
        } else if (txt === '欢迎注册') {
            m_b.animate({top: top_2 + 'px'}, 200);
        }
        return false
    });
    $('.p-msg').off().click(function () {
        var txt = $(this).attr('rel');
        wel.text(txt);
        $('.toggle-cl').animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 300);
        if (txt === '欢迎登录') {
            m_b.animate({top: top_1 + 'px'}, 200);
        } else if (txt === '找回密码') {
            m_b.animate({top: top_3 + 'px'}, 200);
        }
        return false
    });
    // 所需正则
    var name_reg = /^[a-zA-Z0-9_-]{4,20}$/,
        tel_reg = /^(\+86|0086)?\s*1[34578]\d{9}$/,
        email_reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        pwd_reg = /^(.*[\w_-].*){6,20}$/, // 匹配字母、数字、符号
        cap_reg = /^\d{5}$/; // 匹配5位数字验证码

    // 用户登录输入验证
    $('#login_btn').off().click(function (event) {
        var e = window.event || event;
        e.preventDefault();
        this.disabled = true;
        var self = this,
            user_name = $('#user_name').val(),
            user_pwd = $('#user_pwd').val(),
            chk = $('#checkbox')[0].checked;
        if (name_reg.test(user_name) && pwd_reg.test(user_pwd)) {
            $.ajax({
                type: 'POST',
                url: LoadUrl() + 'axis2/services/MyService/login',
                data: {
                    'user': user_name,
                    'password': md5(user_pwd)
                },
                dataType: 'text',
                success: function (res) {
                    res = xmlForJson(res);
                    // console.log(res);
                    if (res === -1 || res === 1) {
                        showTipMsg('登录失败！请检查用户名或密码', 2000, self)
                    } else if (res === 2) {
                        showTipMsg('该用户未激活！请前往邮箱查看激活邮件', 3000, self);
                    } else {
                        if (chk) {
                            localStorage['loginName'] = user_name;
                            localStorage['only'] = res;
                            removeCookie()
                            // console.log('写入local');
                        } else {
                            setCookie('loginName', user_name);
                            setCookie('only', res);
                            localStorage.clear();
                        }
                        showTipMsg('欢迎回来！', 1500, self);
                        setTimeout(function () {
                            location.reload()
                        }, 1500);
                    }
                },
                error: function () {
                    showTipMsg('登录失败！请检查网络连接或稍后重试', 2000, self);
                }
            })
        } else {
            showTipMsg('登录失败！请检查用户名或密码', 2000, this);
        }
    });

    // 用户注册输入验证
    var r_u_n = '', // 用户名
        r_u_t = '', // 手机号
        isTel = true, // 手机号填写了但格式错误时赋值false
        r_u_e = '', // email
        r_u_p = '', // 密码
        r_u_d_p = '', // 重复密码
        r_u_p_f = '', // 最终密码
        L = $('#modalLoading');
    $('#reg_user_name').off()
        .focus(function () {
            if (!r_u_n) {
                // this.parentElement.nextElementSibling.innerHTML = '<span style="color:#96281B;">（必填）</span>支持字母、数字、"-"、"_" 的组合，4-20个字符';
                // this.parentElement.nextElementSibling.className = 'def';
                showNote(this, '<span style="color:#96281B;">（必填）</span>支持字母、数字、"-"、"_" 的组合，4-20个字符', 'def', '')
            }
        })
        .blur(function () {
            var self = this,
                user_name = this.value;
            if (user_name) {
                // console.log(user_name);
                // console.log(name_reg.test(user_name));
                if (!name_reg.test(user_name)) {
                    // self.parentElement.nextElementSibling.innerHTML = '格式错误，支持字母、数字、"-"、"_" 的组合，4-20个字符';
                    // self.parentElement.nextElementSibling.className = 'def err';
                    // self.nextElementSibling.className = 'tip succ-tip hide';
                    showNote(self, '格式错误，支持字母、数字、"-"、"_" 的组合，4-20个字符', 'def err', 'tip succ-tip hide');
                    r_u_n = '';
                } else {
                    $.ajax({
                        type: 'POST',
                        url: LoadUrl() + 'axis2/services/MyService/checkUser',
                        data: {
                            'user': user_name
                        },
                        dataType: 'text',
                        success: function (res) {
                            res = xmlForJson(res);
                            // console.log(res);
                            if (res) {
                                // self.parentElement.nextElementSibling.innerHTML = '用户名已存在！';
                                // self.parentElement.nextElementSibling.className = 'def err';
                                // self.nextElementSibling.className = 'tip succ-tip hide';
                                showNote(self, '用户名已存在！', 'def err', 'tip succ-tip hide');
                                r_u_n = '';
                            } else {
                                // self.parentElement.nextElementSibling.className = 'def hide';
                                // self.nextElementSibling.className = 'tip succ-tip';
                                showNote(self, '', 'def hide', 'tip succ-tip');
                                r_u_n = user_name;
                            }
                        },
                        error: function () {
                            // $('#register').attr('disabled', true);
                            r_u_n = '';
                            showTipMsg('请检查网络连接！', 2000, '');
                        }
                    })
                }
            } else {
                // self.parentElement.nextElementSibling.className = 'def hide';
                // self.nextElementSibling.className = 'tip succ-tip hide';
                showNote(self, '', 'def hide', 'tip succ-tip hide')
            }
        })
        .on('input propertychange', function () {
            if (!this.value) {
                this.nextElementSibling.className = 'tip succ-tip hide'
            }
        });
    $('#reg_user_tel').off()
        .focus(function () {
            if (!r_u_t) {
                // this.parentElement.nextElementSibling.innerHTML = '<span style="color:#96281B;">（非必填项）</span>请输入正确的手机号';
                // this.parentElement.nextElementSibling.className = 'def';
                showNote(this, '<span style="color:#96281B;">（非必填项）</span>请输入正确的手机号', 'def', '')
            }
        })
        .blur(function () {
            if (!this.value) {
                this.parentElement.nextElementSibling.className = 'def hide';
            } else if (!tel_reg.test(this.value)) {
                // this.parentElement.nextElementSibling.innerHTML = '手机号不正确，此项非必填！';
                // this.parentElement.nextElementSibling.className = 'def err';
                // this.nextElementSibling.className = 'tip succ-tip hide';
                showNote(this, '手机号不正确，此项非必填！', 'def err', 'tip succ-tip hide');
                r_u_t = '';
                isTel = false;
            }
        })
        .on('input propertychange', function () {
            var user_tel = this.value;
            if (user_tel) {
                if (tel_reg.test(user_tel)) {
                    // this.parentElement.nextElementSibling.className = 'def hide';
                    // this.nextElementSibling.className = 'tip succ-tip';
                    showNote(this, '', 'def hide', 'tip succ-tip');
                    r_u_t = user_tel;
                    isTel = true;
                } else {
                    // this.parentElement.nextElementSibling.innerHTML = '手机号不正确，此项非必填！';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    // this.nextElementSibling.className = 'tip succ-tip hide';
                    showNote(this, '手机号不正确，此项非必填！', 'def err', 'tip succ-tip hide');
                    r_u_t = '';
                    isTel = false;
                }
            } else {
                // this.parentElement.nextElementSibling.innerHTML = '<span style="color:#96281B;">（非必填项）</span>请输入正确的手机号';
                // this.parentElement.nextElementSibling.className = 'def';
                // this.nextElementSibling.className = 'tip succ-tip hide';
                showNote(this, '<span style="color:#96281B;">（非必填项）</span>请输入正确的手机号', 'def', 'tip succ-tip hide');
                r_u_t = user_tel;
                isTel = true
            }
        });
    $('#reg_user_email').off()
        .focus(function () {
            if (!r_u_e) {
                // this.parentElement.nextElementSibling.innerHTML = '<span style="color:#96281B;">（必填项）</span>请输入合法的邮箱格式';
                // this.parentElement.nextElementSibling.className = 'def';
                showNote(this, '<span style="color:#96281B;">（必填项）</span>请输入合法的邮箱格式', 'def', '')
            }
        })
        .blur(function () {
            if (!this.value) {
                this.parentElement.nextElementSibling.className = 'def hide';
            } else if (!email_reg.test(this.value)) {
                // this.parentElement.nextElementSibling.innerHTML = '邮箱格式不正确！';
                // this.parentElement.nextElementSibling.className = 'def err';
                // this.nextElementSibling.className = 'tip succ-tip hide';
                showNote(this, '邮箱格式不正确！', 'def err', 'tip succ-tip hide');
                r_u_e = ''
            }
        })
        .on('input propertychange', function () {
            var user_email = this.value;
            if (user_email) {
                if (email_reg.test(user_email)) {
                    // this.parentElement.nextElementSibling.className = 'def hide';
                    // this.nextElementSibling.className = 'tip succ-tip';
                    showNote(this, '', 'def hide', 'tip succ-tip');
                    r_u_e = user_email;
                } else {
                    // this.parentElement.nextElementSibling.innerHTML = '邮箱格式不正确！';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    // this.nextElementSibling.className = 'tip succ-tip hide';
                    showNote(this, '邮箱格式不正确！', 'def err', 'tip succ-tip hide');
                    r_u_e = ''
                }
            } else {
                // this.parentElement.nextElementSibling.innerHTML = '<span style="color:#96281B;">（必填项）</span>请输入合法的邮箱格式';
                // this.parentElement.nextElementSibling.className = 'def';
                // this.nextElementSibling.className = 'tip succ-tip hide';
                showNote(this, '<span style="color:#96281B;">（必填项）</span>请输入合法的邮箱格式', 'def', 'tip succ-tip hide')
            }
        });
    $('#reg_user_pwd').off()
        .focus(function () {
            if (!r_u_p) {
                // this.parentElement.nextElementSibling.innerHTML = '建议使用字母、数字和符号两种及以上的组合，6-20个字符';
                // this.parentElement.nextElementSibling.className = 'def';
                showNote(this, '建议使用字母、数字和符号两种及以上的组合，6-20个字符', 'def', '')
            }
        })
        .blur(function () {
            if (!this.value) {
                this.parentElement.nextElementSibling.className = 'def hide';
            }
        })
        .bind('input propertychange', function () {
            r_u_p = this.value;
            // console.log(r_u_d_p);
            if (r_u_d_p) {
                if (r_u_p !== r_u_d_p) {
                    // this.parentElement.nextElementSibling.innerHTML = '两次密码不一致！';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    // this.nextElementSibling.className = 'tip succ-tip hide';
                    showNote(this, '两次密码不一致！', 'def err', 'tip succ-tip hide');
                    r_u_p_f = '';
                } else if (!pwd_reg.test(r_u_p)) {
                    // this.parentElement.nextElementSibling.innerHTML = '格式不正确，6-20个字符';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    // this.nextElementSibling.className = 'tip succ-tip hide';
                    showNote(this, '格式不正确，6-20个字符', 'def err', 'tip succ-tip hide')
                } else {
                    // this.parentElement.nextElementSibling.className = 'def hide';
                    // this.nextElementSibling.className = 'tip succ-tip';
                    showNote(this, '', 'def hide', 'tip succ-tip');
                    document.getElementById('reg_user_dou_pwd').nextElementSibling.className = 'tip succ-tip';
                    document.getElementById('reg_user_dou_pwd').parentNode.nextElementSibling.className = 'def hide';
                    r_u_p_f = r_u_p;
                }
            } else {
                if (pwd_reg.test(r_u_p)) {
                    // this.parentElement.nextElementSibling.className = 'def hide';
                    // this.nextElementSibling.className = 'tip succ-tip';
                    showNote(this, '', 'def hide', 'tip succ-tip')
                } else {
                    // this.parentElement.nextElementSibling.innerHTML = '格式不正确，6-20个字符';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    // this.nextElementSibling.className = 'tip succ-tip hide';
                    showNote(this, '格式不正确，6-20个字符', 'def err', 'tip succ-tip hide')
                }
            }
        });
    $('#reg_user_dou_pwd').off()
        .focus(function () {
            if (!r_u_d_p) {
                // this.parentElement.nextElementSibling.innerHTML = '请再次输入密码';
                // this.parentElement.nextElementSibling.className = 'def';
                showNote(this, '请再次输入密码', 'def', '')
            }
        })
        .blur(function () {
            if (!this.value) {
                this.parentElement.nextElementSibling.className = 'def hide';
            }
        })
        .bind('input propertychange', function () {
            r_u_d_p = this.value;
            if (r_u_p) {
                if (r_u_d_p !== r_u_p) {
                    // this.parentElement.nextElementSibling.innerHTML = '两次密码不一致！';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    // this.nextElementSibling.className = 'tip succ-tip hide';
                    showNote(this, '两次密码不一致！', 'def err', 'tip succ-tip hide');
                    r_u_p_f = '';
                } else if (!pwd_reg.test(r_u_d_p)) {
                    // this.parentElement.nextElementSibling.innerHTML = '格式不正确，6-20个字符';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    // this.nextElementSibling.className = 'tip succ-tip hide';
                    showNote(this, '格式不正确，6-20个字符', 'def err', 'tip succ-tip hide')
                } else {
                    // this.parentElement.nextElementSibling.className = 'def hide';
                    // this.nextElementSibling.className = 'tip succ-tip';
                    showNote(this, '', 'def hide', 'tip succ-tip');
                    document.getElementById('reg_user_pwd').nextElementSibling.className = 'tip succ-tip';
                    document.getElementById('reg_user_pwd').parentNode.nextElementSibling.className = 'def hide';
                    r_u_p_f = r_u_d_p;
                }
            } else {
                if (pwd_reg.test(r_u_d_p)) {
                    // this.parentElement.nextElementSibling.className = 'def hide';
                    // this.nextElementSibling.className = 'tip succ-tip';
                    showNote(this, '', 'def hide', 'tip succ-tip')
                } else {
                    // this.parentElement.nextElementSibling.innerHTML = '格式不正确';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    // this.nextElementSibling.className = 'tip succ-tip hide';
                    showNote(this, '格式不正确', 'def err', 'tip succ-tip hide')
                }
            }
        });
    $('#register').off().click(function (event) {
        var e = window.event || event;
        e.preventDefault();
        this.disabled = true;
        var self = this;
        // console.log(r_u_n);
        // console.log(r_u_e);
        // console.log(r_u_p_f);
        // console.log(r_u_t);
        // console.log(isTel);
        if (r_u_n && r_u_e && r_u_p_f && isTel) {
            $.ajax({
                type: 'POST',
                url: LoadUrl() + 'axis2/services/MyService/addUser',
                data: {
                    'user': r_u_n,
                    'password': md5(r_u_p_f),
                    'tel': r_u_t,
                    'mail': r_u_e
                },
                dataType: 'text',
                beforeSend: function () {
                    L.show()
                },
                success: function (res) {
                    // console.log(res);
                    L.hide();
                    res = xmlForJson(res);
                    if (res) {
                        showTipMsg('注册成功，请前往邮箱查看激活邮件，激活成功后即可登录！', 4000, self);
                        // 初始化
                        r_u_n = r_u_t = r_u_e = r_u_p = r_u_d_p = r_u_p_f = '';
                        isTel = true; // 手机号填写了但格式错误时赋值false
                        setTimeout(function () {
                            $('.register-form input').val('');
                            $('.register-form .succ-tip').addClass('hide');
                            $('#returnLogin').click();
                        }, 4200);
                    } else {
                        showTipMsg('注册失败！', 1500, self)
                    }
                },
                error: function () {
                    L.hide();
                    showTipMsg('注册失败！请检查网络连接或稍后重试', 2500, self);
                }
            })
        } else {
            showTipMsg('请正确填写注册信息！', 2000, this);
        }
    });

    // model内修改密码
    var re_n = '', // 修改密码的用户名
        re_c = '', // 验证码
        re_p = '', // 密码1
        re_d_p = '', // 密码2
        re_p_f = ''; // 最终密码
    $('#reset_user_name').off()
        .focus(function () {
            if (!re_n) {
                // this.parentElement.nextElementSibling.innerHTML = '<span style="color:#96281B;">（必填）</span>请输入有效用户名';
                // this.parentElement.nextElementSibling.className = 'def';
                showNote(this, '<span style="color:#96281B;">（必填）</span>请输入有效用户名', 'def', '')
            }
        })
        .blur(function () {
            var tmp = this.value;
            if (tmp) {
                if (!name_reg.test(tmp)) {
                    // this.parentElement.nextElementSibling.innerHTML = '格式错误，支持字母、数字、"-"、"_" 的组合，4-20个字符';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    showNote(this, '格式错误，支持字母、数字、"-"、"_" 的组合，4-20个字符', 'def err', '');
                    re_n = '';
                } else {
                    this.parentElement.nextElementSibling.className = 'def hide';
                    re_n = tmp
                }
            } else {
                this.parentElement.nextElementSibling.className = 'def hide';
                re_n = ''
            }
        });
    $('.get-captcha').off().click(function (event) {
        var e = window.event || event;
        e.preventDefault();
        this.disabled = true;
        var self = this;
        if (re_n) {
            if (name_reg.test(re_n)) {
                $.ajax({
                    type: 'POST',
                    url: LoadUrl() + 'axis2/services/MyService/setCode',
                    data: {
                        'user': re_n
                    },
                    dataType: 'text',
                    success: function (res) {
                        res = xmlForJson(res);
                        // console.log(res);
                        if (res) {
                            // self.parentElement.nextElementSibling.innerHTML = '验证码获取成功，请及时到邮箱查收！';
                            // self.parentElement.nextElementSibling.className = 'def succ';
                            showNote(self, '验证码获取成功，请及时到邮箱查收！', 'def succ', '');
                            var num = 15;
                            self.innerText = num + '秒后可重新获取';
                            var clock = setInterval(doLoop, 1000);

                            function doLoop() {
                                num--;
                                if (num > 0) {
                                    self.innerText = num + '秒后可重新获取';
                                } else {
                                    clearInterval(clock);
                                    self.innerText = '点击获取邮箱验证码';
                                    self.disabled = false;
                                    num = 15
                                }
                            }
                        } else {
                            self.disabled = false;
                            // self.parentElement.nextElementSibling.innerHTML = '验证码获取失败！';
                            // self.parentElement.nextElementSibling.className = 'def err';
                            showNote(self, '验证码获取失败！', 'def err', '');
                        }
                    },
                    error: function () {
                        self.disabled = false;
                        // self.parentElement.nextElementSibling.innerHTML = '验证码获取失败，请检查网络连接！';
                        // self.parentElement.nextElementSibling.className = 'def err';
                        showNote(self, '验证码获取失败，请检查网络连接！', 'def err', '')
                    }
                })
            } else {
                // this.parentElement.nextElementSibling.innerHTML = '验证码错误！';
                // this.parentElement.nextElementSibling.className = 'def err';
                showNote(this, '验证码错误！', 'def err', '');
                re_c = '';
            }
        } else {
            this.disabled = false;
            // this.parentElement.nextElementSibling.innerHTML = '请填写用户名！';
            // this.parentElement.nextElementSibling.className = 'def err'
            showNote(this, '请填写用户名！', 'def err', '')
        }
    });
    $('#captcha').off()
        .focus(function () {
            if (!re_c) {
                // this.parentElement.nextElementSibling.innerHTML = '<span style="color:#96281B;">（必填）</span>请输入5位数字验证码';
                // this.parentElement.nextElementSibling.className = 'def';
                showNote(this, '<span style="color:#96281B;">（必填）</span>请输入5位数字验证码', 'def', '')
            }
        })
        .blur(function () {
            var tmp = this.value;
            if (tmp) {
                if (!cap_reg.test(tmp)) {
                    // this.parentElement.nextElementSibling.innerHTML = '验证码错误！';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    showNote(this, '验证码错误！', 'def err', '');
                    re_c = '';
                } else {
                    this.parentElement.nextElementSibling.className = 'def hide';
                    re_c = tmp
                }
            } else {
                this.parentElement.nextElementSibling.className = 'def hide';
                re_c = ''
            }
        });
    $('#reset_user_pwd').off()
        .focus(function () {
            if (!re_p) {
                // this.parentElement.nextElementSibling.innerHTML = '建议使用字母、数字和符号两种及以上的组合，6-20个字符';
                // this.parentElement.nextElementSibling.className = 'def';
                showNote(this, '建议使用字母、数字和符号两种及以上的组合，6-20个字符', 'def', '')
            }
        })
        .blur(function () {
            if (!this.value) {
                this.parentElement.nextElementSibling.className = 'def hide';
            }
        })
        .bind('input propertychange', function () {
            re_p = this.value;
            // console.log(re_d_p);
            if (re_d_p) {
                if (re_p !== re_d_p) {
                    // this.parentElement.nextElementSibling.innerHTML = '两次密码不一致！';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    // this.nextElementSibling.className = 'tip succ-tip hide';
                    showNote(this, '两次密码不一致！', 'def err', 'tip succ-tip hide');
                    re_p_f = '';
                } else if (!pwd_reg.test(re_p)) {
                    // this.parentElement.nextElementSibling.innerHTML = '格式不正确，6-20个字符';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    // this.nextElementSibling.className = 'tip succ-tip hide';
                    showNote(this, '格式不正确，6-20个字符', 'def err', 'tip succ-tip hide')
                } else {
                    // this.parentElement.nextElementSibling.className = 'def hide';
                    // this.nextElementSibling.className = 'tip succ-tip';
                    showNote(this, '', 'def hide', 'tip succ-tip');
                    document.getElementById('reset_user_dou_pwd').nextElementSibling.className = 'tip succ-tip';
                    document.getElementById('reset_user_dou_pwd').parentNode.nextElementSibling.className = 'def hide';
                    re_p_f = re_p;
                }
            } else {
                if (pwd_reg.test(re_p)) {
                    // this.parentElement.nextElementSibling.className = 'def hide';
                    // this.nextElementSibling.className = 'tip succ-tip';
                    showNote(this, '', 'def hide', 'tip succ-tip')
                } else {
                    // this.parentElement.nextElementSibling.innerHTML = '格式不正确，6-20个字符';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    // this.nextElementSibling.className = 'tip succ-tip hide';
                    showNote(this, '格式不正确，6-20个字符', 'def err', 'tip succ-tip hide')
                }
            }
        });
    $('#reset_user_dou_pwd').off()
        .focus(function () {
            if (!re_d_p) {
                // this.parentElement.nextElementSibling.innerHTML = '请再次输入密码';
                // this.parentElement.nextElementSibling.className = 'def';
                showNote(this, '请再次输入密码', 'def', '')
            }
        })
        .blur(function () {
            if (!this.value) {
                this.parentElement.nextElementSibling.className = 'def hide';
            }
        })
        .bind('input propertychange', function () {
            re_d_p = this.value;
            if (re_p) {
                if (re_d_p !== re_p) {
                    // this.parentElement.nextElementSibling.innerHTML = '两次密码不一致！';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    // this.nextElementSibling.className = 'tip succ-tip hide';
                    showNote(this, '两次密码不一致！', 'def err', 'tip succ-tip hide');
                    re_p_f = '';
                } else if (!pwd_reg.test(re_d_p)) {
                    // this.parentElement.nextElementSibling.innerHTML = '格式不正确，6-20个字符';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    // this.nextElementSibling.className = 'tip succ-tip hide';
                    showNote(this, '格式不正确，6-20个字符', 'def err', 'tip succ-tip hide')
                } else {
                    // this.parentElement.nextElementSibling.className = 'def hide';
                    // this.nextElementSibling.className = 'tip succ-tip';
                    showNote(this, '', 'def hide', 'tip succ-tip');
                    document.getElementById('reset_user_pwd').nextElementSibling.className = 'tip succ-tip';
                    document.getElementById('reset_user_pwd').parentNode.nextElementSibling.className = 'def hide';
                    re_p_f = re_d_p;
                }
            } else {
                if (pwd_reg.test(re_d_p)) {
                    // this.parentElement.nextElementSibling.className = 'def hide';
                    // this.nextElementSibling.className = 'tip succ-tip';
                    showNote(this, '', 'def hide', 'tip succ-tip')
                } else {
                    // this.parentElement.nextElementSibling.innerHTML = '格式不正确';
                    // this.parentElement.nextElementSibling.className = 'def err';
                    // this.nextElementSibling.className = 'tip succ-tip hide';
                    showNote(this, '格式不正确', 'def err', 'tip succ-tip hide')
                }
            }
        });
    $('#resBtn').off().click(function (event) {
        // console.log(re_n);
        // console.log(md5(re_p_f));
        // console.log(re_c);
        var e = window.event || event;
        e.preventDefault();
        this.disabled = true;
        var self = this;
        if (re_n && re_c && re_p_f) {
            $.ajax({
                type: 'POST',
                url: LoadUrl() + 'axis2/services/MyService/changePassword',
                data: {
                    'user': re_n,
                    'oldPass': '',
                    'newPass': md5(re_p_f),
                    'code': re_c,
                    'isForget': true
                },
                dataType: 'text',
                success: function (res) {
                    res = xmlForJson(res);
                    // console.log(res);
                    if (res) {
                        showTipMsg('修改成功！', 1500, self);
                        // 初始化
                        re_n = re_c = re_p = re_d_p = re_p_f = '';
                        setTimeout(function () {
                            $('.find-pwd input').val('');
                            $('.find-pwd .succ-tip').addClass('hide');
                            $('#return').click();
                        }, 1800);
                    } else {
                        showTipMsg('修改失败！', 1500, self)
                    }
                },
                error: function () {
                    showTipMsg('修改失败！请检查网络连接或稍后重试', 2500, self)
                }
            })
        } else {
            showTipMsg('修改失败，填写信息存在错误！', 2000, this);
        }
    })
}

function showNote(obj, p_innerHtml, p_className, n_className) {
    if (p_innerHtml)
        obj.parentElement.nextElementSibling.innerHTML = p_innerHtml;
    if (p_className)
        obj.parentElement.nextElementSibling.className = p_className;
    if (n_className)
        obj.nextElementSibling.className = n_className
}

function showTipMsg(msg, time, obj) {
    var a = $('#top_msg');
    a.html(msg).stop().animate({opacity: 1, top: '50px'}, 200).show(200);
    setTimeout(function () {
        hideTipMsg(a, obj)
    }, time)
}

function hideTipMsg(a, obj) {
    a.stop().animate({opacity: 0, top: '10px'}, 100).html('');
    // console.log(obj);
    if (obj)
        obj.disabled = false;
}

/**
 * JavaScript MD5
 * @param string
 * @returns {*}
 */
function md5(string) {
    function safeAdd(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF)
    }

    function bitRotateLeft(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt))
    }

    function md5cmn(q, a, b, x, s, t) {
        return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
    }

    function md5ff(a, b, c, d, x, s, t) {
        return md5cmn((b & c) | ((~b) & d), a, b, x, s, t)
    }

    function md5gg(a, b, c, d, x, s, t) {
        return md5cmn((b & d) | (c & (~d)), a, b, x, s, t)
    }

    function md5hh(a, b, c, d, x, s, t) {
        return md5cmn(b ^ c ^ d, a, b, x, s, t)
    }

    function md5ii(a, b, c, d, x, s, t) {
        return md5cmn(c ^ (b | (~d)), a, b, x, s, t)
    }

    function binlMD5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (len % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var i;
        var olda;
        var oldb;
        var oldc;
        var oldd;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;

        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;

            a = md5ff(a, b, c, d, x[i], 7, -680876936);
            d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

            a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5gg(b, c, d, a, x[i], 20, -373897302);
            a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5hh(d, a, b, c, x[i], 11, -358537222);
            c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

            a = md5ii(a, b, c, d, x[i], 6, -198630844);
            d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

            a = safeAdd(a, olda);
            b = safeAdd(b, oldb);
            c = safeAdd(c, oldc);
            d = safeAdd(d, oldd)
        }
        return [a, b, c, d]
    }

    function binl2rstr(input) {
        var i;
        var output = '';
        var length32 = input.length * 32;
        for (i = 0; i < length32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF)
        }
        return output
    }

    function rstr2binl(input) {
        var i;
        var output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0
        }
        var length8 = input.length * 8;
        for (i = 0; i < length8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32)
        }
        return output
    }

    function rstrMD5(s) {
        return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
    }

    function rstr2hex(input) {
        var hexTab = '0123456789abcdef';
        var output = '';
        var x;
        var i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hexTab.charAt((x >>> 4) & 0x0F) +
                hexTab.charAt(x & 0x0F)
        }
        return output
    }

    function rawMD5(s) {
        return rstrMD5(unescape(encodeURIComponent(s)))
    }

    return rstr2hex(rawMD5(string))
}

/**
 * set cookies
 * @param name
 * @param value
 * @param time (不设置时,关闭浏览器 cookie 即失效，单位 s)
 */
function setCookie(name, value, time) {
    var t = new Date();
    t.setTime(t.getTime() + (time * 1000)); // time单位为秒
    document.cookie = encodeURI(name) + '=' + encodeURI(value) + ((!isNaN(time)) ? '; expires=' + t.toUTCString() : '') + '; path=/';
}

/**
 * get cookies (获取某个 cookie 的值或全部 cookies_obj)
 * @param name
 * @returns {*}
 */
function getCookie(name) {
    if (document.cookie) {
        var cookies = {};
        var obj = document.cookie.split('; ');
        for (var i = 0, len = obj.length, n = '', val = ''; i < len; i++) {
            var index = obj[i].indexOf('=');
            n = obj[i].substr(0, index);
            val = obj[i].substr(index + 1, obj[i].length);
            cookies[n] = val
        }
        n = null;
        val = null;
        if (document.cookie.indexOf(encodeURI(name)) !== -1) {
            return decodeURI(cookies[encodeURI(name)])
        } else {
            return cookies
        }
    } else {
        return ''
    }
}

/**
 * remove cookies (清除所有)
 */
function removeCookie() {
    var cookies = getCookie();
    if (cookies) {
        var d = new Date();
        d.setTime(d.getTime() - 1);
        for (var key in cookies) {
            document.cookie = key + '=; expires=' + d.toUTCString() + '; path=/'
        }
    }
    // console.log(document.cookie);
}