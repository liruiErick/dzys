var pageIndex = 0;
var pageSize = 23;
var dz_pageSize = 10;
var yw_pageSize = 20;
var pageCount = 0;
var displayNums = 5;
var dz_pageCount = 0;
var yw_pageCount = 0;
var user = getCookie('loginName') || localStorage['loginName'] || "";
var guid = getCookie('only') || localStorage['only'] || "";
var data_type = "";
var dz_submenu = "";
var dz_area = "";
var dz_keyword = "";
//检查用户的时效性
//user 当前用户 
//guid 唯一标识
(function checkUsers(user, guid) {
    $.ajax({
        type: 'POST',
        url: LoadUrl() + 'axis2/services/MyService/checkUserValid',
        data: {
            'user': user,
            'guid': guid
        },
        dataType: 'text',
        success: function (res) {
            res = JSON.parse(loadXML(res));
            // console.log(res);
            if (res) {
                var m_box = $('.modal-dz-box');
                var m_b = $('.model-dz-body');
                var m_h = 500;
                var v_h = window.innerHeight;
                var top = (v_h - m_h) / 2;
                var wel = $('.wel');
                // var c_i = $('#closeid');
                //显示定制信息
                $("#btn_id").on("click", function () {

                    wel.text("请选择属于你的定制信息");
                    showModal(m_box, m_b, top, wel);
                    var menu = '';
                    $("#dz-menu-id").find("span").each(function (a, b) {
                        menu += $(b).text() + ",";
                    });
                    var field = '';
                    $("#dz-field-id").find("span").each(function (a, b) {
                        field += $(b).text() + ",";
                    });
                    var key = '';
                    $("#dz-key-id").find("span").each(function (a, b) {
                        key += $(b).text() + ",";
                    });
                    if (key.lastIndexOf(',') == key.length - 1) {
                        key = key.substring(0, key.lastIndexOf(','));
                    }
                    UserCenter.BindModalTerm(menu, field, key);
                    $("#dz_contentid").css("min-height", "190px");
                });
                //选择定制信息
                $("#dz_id").off().on("click", function () {
                    dz_pageCount = 0;
                    var menu = '';
                    var menus = '';
                    $("input:checkbox[name='checkbox_menu']:checked").off().each(function (a, b) {
                        menus += b.value + ",";
                        menu += $(b).next().text() + ",";
                    });

                    var field = '';
                    //var _field = '';
                    $("input:checkbox[name='checkbox_field']:checked").off().each(function (a, b) {
                        field += b.value + ',';
                        //_field += $(b).next().text() + ",";
                    });

                    var content = $("#dz-txtid").val();

                    var url = "";
                    if (!$("#dz-menu-id").text() && !$("#dz-field-id").text() && !$("#dz-key-id").text()) {
                        url = LoadUrl() + "axis2/services/MyService/addCustomMade";
                    }
                    else {
                        url = LoadUrl() + "axis2/services/MyService/editCustomMade";
                    }
                    UserCenter.AddOrEditCustomMade(url, user, menu, field, content);
                    UserCenter.SearchCustomMade(1, menu, field, content);

                    var _menu = menus.split(',');
                    var _menus = '';
                    $.each(_menu, function (a, b) {
                        if (b) {
                            _menus += '<span>' + b + '</span>';
                        }
                    });

                    var _field = field.split(',');
                    var _fields = '';
                    $.each(_field, function (a, b) {
                        if (b) {
                            _fields += '<span>' + b + '</span>';
                        }
                    });
                    var _key = content.split(',');
                    var _keys = '';
                    $.each(_key, function (a, b) {
                        if (b) {
                            _keys += '<span>' + b + '</span>';
                        }
                    });

                    $("#dz-menu-id").html(_menus);
                    $("#dz-field-id").html(_fields);
                    $("#dz-key-id").html(_keys);
                    hideModal(m_box, m_b);
                    $("#dz_contentid").css("min-height", "470px");
                });
                //关闭定制信息
                $("#closeid").off().on('click', function () {
                    $("#dz_contentid").css("min-height", "470px");
                    hideModal(m_box, m_b);
                });
                UserCenter.init();
            } else {
                removeCookie();
                localStorage.clear();
                location.href = "404.html";
            }
        },
        error: function () {
            localStorage.clear();
            removeCookie();
        }
    });
})(user, guid);
//分页
//currentIndex 当前页码
function ShowPage(currentIndex) {
    
    if (data_type === "我的收藏") {
        UserCenter.LoadUserContent(currentIndex, user);
        $("input:checkbox[id='searchresult_all']").removeAttr("checked");
    }
    else if (data_type === "我的定制") {
        UserCenter.SearchCustomMade(currentIndex, dz_submenu, dz_area, dz_keyword);
    }
    else if (data_type === "我的原文请求") {
        UserCenter.GetSourceRequest(currentIndex);
    }
}

var UserCenter = {
    //页面加载
    init: function () {
        this.LoadUserInfo("admin");
        data_type = "我的收藏";
        this.LoadUserContent(1, user);
        this.GetCustomMade(user);
        this.LoadMenu();
        this.LoadArea();
        this.GetSourceRequest(1);
        //编辑用户信息
        $("#xq_btnid").click(function () {
            $("#EditPass_id").removeAttr("checked");
            $("#EditPass_id").change();
            var tel = $("#tel_id").text();
            $("#edtel_id").val(tel);
            EditInfoId.style.display = 'block';
            xg_modal_id.style.display = 'block';
            $("#edtel_id").focus();
            //$("#edtel_id").select();
        })
        //确定用户信息
        $("#btn_ok_id").click(function () {
            var temp = $("#EditPass_id");
            var tel = $("#edtel_id").val();
            var oldp = "";
            var newp = "";
            var newps = "";
            if (temp[0].checked)
            {
                oldp = $("#oldpass_id").val();
                newp = $("#newpass_id").val();
                newps = $("#newspass_id").val();
                if (newp && newps && newp != newps)
                {
                    layer.msg("两次密码不一致");
                    return;
                }
            }
            UserCenter.EditUserInfo(newp, tel);
        })
        //取消编辑用户信息
        $("#btn_res_id").click(function () {
            EditInfoId.style.display = 'none';
            xg_modal_id.style.display = 'none';
        })

        $("#EditPass_id").change(function () {
            var temp = $(this);
            if (temp[0].checked) {
                $(".mm-div").css("display", "block");
            }
            else {
                $(".mm-div").css("display", "none");
            }
        })
        //全选设置--我的收藏
        $("input:checkbox[id='searchresult_all']").change(function () {
            var allCheck = $(this);
            $("input:checkbox[name=xq_checkbox]").each(function (a,b) {
                b.checked = allCheck[0].checked;
            })
        })
        //取消收藏
        $("#Cancle_id").on("click", function () {
            $("input:checkbox[name=xq_checkbox]").each(function (a, b) {
                if (b.checked)
                {
                    CancleCollection(user, b.value);
                }
            })
            //window.location.reload();
            //opener.location.reload();
        })
    },
    CheckType: function (obj) {
        $(obj).parent().addClass("current").siblings().removeClass("current");
        var temp = $(obj).text();
        data_type = temp;
        $("div.wenxian_list_con").find("label").each(function (a, b) {

            if (b.textContent.indexOf(temp) !== -1) {
                $(b.parentElement.parentElement).css("display", "block").siblings().css("display", "none");
            }
        });
    },
    //加载用户信息
    //username 当前用户
    LoadUserInfo: function (username) {
        var url = LoadUrl() + "axis2/services/MyService/getUserInfo";
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "user": username
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                if (result)
                {
                    result = JSON.parse(result);
                    $("#name_id").html(result[0].user);
                    $("#tel_id").html(result[0].tel);
                    $("#mail_id").html(result[0].mail);
                }
            }
        })
    },
    //加载我的收藏
    //currentIndex 当前页码
    //username 当前用户
    LoadUserContent: function (currentIndex, username) {
        pageIndex = currentIndex;
        var url = LoadUrl() + "axis2/services/MyService/getFavorite";
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "user": username,
                "pageIndex": pageIndex,
                "pageSize": pageSize
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                if (result) {
                    result = jQuery.parseJSON(result);
                    var html = '';
                    $.each(result, function (a, b) {
                        pageCount = b.total;
                        var time = new Date(b.time).toLocaleDateString();
                        html += '<li>'
                            + '<input type="checkbox" name="xq_checkbox" style="margin-right:5px;" value="' + b.id + '" class="css-checkbox"/>'
                            + '<a href="' + b.url + '" target="_blank" title="' + htmldecode(b.title).replace("<br/>", "") + '">' + htmldecode(b.title).replace("<br/>", "") + '</a><span>' + time + '</span>'
                            + '</li>';
                    });

                    $("#listid").html(html);
                    var num = 0;
                    if (pageCount % pageSize == 0) {
                        num = Math.floor(pageCount / pageSize);
                    }
                    else {
                        num = Math.floor(pageCount / pageSize) + 1;
                    }

                    if (pageCount != 0) {
                        $("#pagingid").empty();
                        $("#pagingid").pagination(currentIndex, num, displayNums);
                    }
                    else {
                        $("#pagingid").empty();
                    }
                }
            }
        })
    },
    //页面加载时获取自定义定制信息
    //username 当前用户
    GetCustomMade: function (username) {
        var url = LoadUrl() + "axis2/services/MyService/getCustomMade";
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "user": user
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                if (result) {
                    result = jQuery.parseJSON(result);
                    var menu = "";
                    var field = "";
                    var key = "";
                    var submenu = "";
                    $.each(result, function (a, b) {
                        menu += b.menuname;
                        field += b.area;
                        key += b.keyword;
                        submenu += b.submenu;
                    });
                    var _menu = menu.split(',');
                    var _menus = '';
                    $.each(_menu, function (a, b) {
                        if (b) {
                            _menus += '<span>' + b + '</span>';
                        }
                    });

                    var _field = field.split(',');
                    var _fields = '';
                    $.each(_field, function (a, b) {
                        if (b) {
                            _fields += '<span>' + b + '</span>';
                        }
                    });

                    var _key = key.split(',');
                    var _keys = '';
                    $.each(_key, function (a, b) {
                        if (b) {
                            _keys += '<span>' + b + '</span>';
                        }
                    });

                    $("#dz-menu-id").html(_menus);
                    $("#dz-field-id").html(_fields);
                    $("#dz-key-id").html(_keys);
                    UserCenter.SearchCustomMade(1, submenu, field, key);
                }
            }
        })
    },
    /**添加或修改自定义定制
     *@param url 接口地址
     *@param user 当前用户
     *@param submenu 菜单id
     *@param area 领域
     *@param keyword 关键字
     */
    AddOrEditCustomMade: function (url, user, submenu, area, keyword) {
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "user": user,
                "submenu": submenu,
                "area": area,
                "keyword": keyword
            },
            dataType: "text",
            success: function (result) {
                return;
            }
        })
    },
    //检索定制信息
    //currentIndex 当前页
    //submenu 菜单id
    //area 领域
    //keyword 关键字
    SearchCustomMade: function (currentIndex, submenu, area, keyword) {
        dz_submenu = submenu;
        dz_area = area;
        dz_keyword = keyword;
        var url = LoadUrl() + "axis2/services/MyService/searchCustomMade";
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "sub_srv": submenu,
                "area": area,
                "keywords": keyword,
                "fromIndex": currentIndex,
                "size": dz_pageSize
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                if (result) {
                    result = jQuery.parseJSON(result);
                    var html = "";
                    $.each(result, function (a, b) {
                        dz_pageCount = b.total;
                        var link = "";
                        var checks = b.id;
                        if (b.menuname === "产业新闻") {
                            link = "Industry/NewsShow.html?menu=0";
                        }
                        else if (b.menuname === "法规浏览") {
                            link = "Policy/DetailShow.html?menu=1";
                        }
                        else if (b.menuname === "专家解读") {
                            link = "Policy/ExpertDetail.html?menu=1";
                        }
                        else if (b.menuname === "市场观察") {
                            link = "Business/MarketTrendChildDetail.html?menu=2";
                        }
                        else if (b.menuname === "文献服务") {
                            link = "Technological/LiteratureServiceDetail.html?menu=3";
                        }
                        else if (b.menuname === "项目申报") {
                            link = "Recruit/InviteInfoDetails.html?menu=4";
                        }
                        else if (b.menuname === "会议活动") {
                            link = "Train/ShowInfoDetail.html?menu=5";
                            checks = checks + "&tran=1";
                        }
                        else if (b.menuname === "行业展览") {
                            link = "Train/ShowInfoDetail.html?menu=5";
                            checks = checks + "&tran=2";
                        }
                        else if (b.menuname === "培训信息") {
                            link = "Train/TrainInfoDetail.html?menu=5";
                        }
                        html += '<li>'
                            + '<a href="' + link + '&pid=' + checks + '" target="_blank" title="【' + b.menuname + '】' + b.title + '">【' + b.menuname + '】' + b.title + '</a><span>' + b.fromTime.substring(5, 10) + '</span>'
                            + '</li>';
                    });
                    $("#dz_listid").html(html);

                    var num = 0;
                    if (dz_pageCount % dz_pageSize === 0) {
                        num = Math.floor(dz_pageCount / dz_pageSize);
                    }
                    else {
                        num = Math.floor(dz_pageCount / dz_pageSize) + 1;
                    }

                    if (dz_pageCount != 0) {
                        $("#dz_pagingid").empty();
                        $("#dz_pagingid").pagination(currentIndex, num, displayNums);
                    }
                    else {
                        $("#dz_pagingid").empty();
                    }
                }
            }
        })
    },
    //加载菜单
    LoadMenu: function () {
        var url = LoadUrl() + "axis2/services/MyService/getAllSubMenuName";
        $.ajax({
            type: "POST",
            url: url,
            data: {},
            dataType: "text",
            contentType: "text/xml",
            success: function (result) {
                result = loadXML(result);
                if (result) {
                    result = jQuery.parseJSON(result);
                    var html = '';
                    $.each(result, function (a, b) {
                        html += '<li>'
                            + '<input type="checkbox" name="checkbox_menu" value="' + b.menu + '"/>'
                            + '<span style="display:none;">' + b.itemid + '</span>'
                            + '<label>' + b.menu + '</label>'
                            + '</li>';
                    });
                    $("#menu_id").html(html);
                }
            }
        });
    },
    //加载领域
    LoadArea: function () {
        var surl = LoadUrl() + "axis2/services/MyService/getAreaList";
        $.ajax({
            type: "POST",
            url: surl,
            data: {},
            dataType: "text",
            contentType: "text/xml",
            success: function (result) {
                result = loadXML(result);
                if (result) {
                    result = jQuery.parseJSON(result);
                    var html = '';
                    $.each(result, function (a, b) {
                        html += '<li>'
                            + '<input type="checkbox" name="checkbox_field" value="' + b.name + '"/>'
                            + '<span style="display:none;">' + b.areaid + '</span>'
                            + '<label>' + b.name + '</label>'
                            + '</li>';
                    });
                    $("#field_id").html(html);
                }
            }
        })
    },
    //绑定模态框
    //submenu 菜单
    //area 领域
    //keyword 关键字
    BindModalTerm: function (submenu, area, keyword) {
        if (submenu) {
            submenu = submenu.split(',');
            if (submenu.length > 0) {
                $("input:checkbox[name='checkbox_menu']").off().each(function (a, b) {
                    for (var i = 0; i < submenu.length; i++) {
                        if (b.value == submenu[i]) {
                            $(b).attr("checked", "checked");
                        }
                    }
                })
            }
        }
        if (area) {
            area = area.split(',');
            if (area.length > 0) {
                $("input:checkbox[name='checkbox_field']").off().each(function (a, b) {
                    for (var i = 0; i < area.length; i++) {
                        if (b.value == area[i]) {
                            $(b).attr("checked", "checked");
                        }
                    }
                })
            }
        }
        $("#dz-txtid").val(keyword);
    },
    //原文请求
    //currentIndex 当前页码
    GetSourceRequest: function (currentIndex) {
        var url = LoadUrl() + "axis2/services/MyService/getRequestDoc";
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "user": user,
                "pageIndex": currentIndex,
                "pageSize": yw_pageSize
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                if (result) {
                    result = jQuery.parseJSON(result);
                    var html = "";
                    $.each(result, function (a, b) {
                        yw_pageCount = b.total;
                        html += '<li>'
                            + '<a href="' + b.url + '" target="_blank" title="【' + b.type + '】' + b.title + '">【' + b.type + '】' + b.title + '</a>'
                            + '</li>';
                    });
                    $("#ywqq_id").html(html);
                    var num = 0;
                    if (yw_pageCount % yw_pageSize === 0) {
                        num = Math.floor(yw_pageCount / yw_pageSize);
                    }
                    else {
                        num = Math.floor(yw_pageCount / yw_pageSize) + 1;
                    }

                    if (yw_pageCount != 0) {
                        $("#ywqq_pagingid").empty();
                        $("#ywqq_pagingid").pagination(currentIndex, num, displayNums);
                    }
                    else {
                        $("#ywqq_pagingid").empty();
                    }
                }
            }
        })
    },
    //编辑用户信息
    EditUserInfo: function (password, tel) {
        var url = LoadUrl() + "axis2/services/MyService/editUserInfo";
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "user": user,
                "password": md5(password),
                "tel": tel
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                if (result)
                {
                    result = JSON.parse(result);
                    if (result)
                    {
                        layer.msg("修改信息成功", { time: 1500 }, function () {
                            $("#btn_res_id").click();
                            window.location.reload();
                        });
                    }
                }
            }
        })
    }
};
//切换标签
//obj 当前对象
function Checks(obj) {
    UserCenter.CheckType(obj);
}
