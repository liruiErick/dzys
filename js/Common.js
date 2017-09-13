//加载xml文件
function loadXML(xmlString) {
    var xmlDoc = null;

    if ((!window.DOMParser && window.ActiveXObject) || (!!window.ActiveXObject || "ActiveXObject" in window)) {
        var xmlDomVersions =
            ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
        for (var i = 0; i < xmlDomVersions.length; i++) {
            try {
                xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                xmlDoc.async = false;
                xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                break;
            }
            catch (e) {
            }
        }
    }
    else if (window.DOMParser && document.implementation &&
        document.implementation.createDocument) {
        try {
            domParser = new DOMParser();
            xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
        }
        catch (e) {
        }
    }
    else {
        return null;
    }
    var result = "";
    if (typeof (xmlDoc.text) == "undefined") {
        result = xmlDoc.firstChild.childNodes[0].innerHTML;
    }
    else {
        result = xmlDoc.text;
    }
    return result;
}

//页面加载
function LoadJS() {
    $(function () {
        $('.tab1').Tabs();
        $('.tab2').Tabs();
        $('.tab3').Tabs();
        $('.tab4').Tabs();
        $('.tab_gp').Tabs();
        $('#scroll1').owlCarousel({
            items: 1,
            autoPlay: true,
            navigation: false,
            navigationText: ["", ""],
            scrollPerPage: true,
            singleItem: true
        });
        $('#scroll2').owlCarousel({
            items: 3,
            autoPlay: true,
            navigation: false,
            navigationText: ["", ""],
            scrollPerPage: true
        });
        $('#scroll4').owlCarousel({
            items: 1,
            autoPlay: false,
            navigation: true,
            navigationText: ["", ""],
            scrollPerPage: false
        });

        $('#scroll5').owlCarousel({
            items: 1,
            autoPlay: false,
            navigation: true,
            navigationText: ["", ""],
            scrollPerPage: false
        });

        // index-子平台
        // levelTabMenu('#childmenuid', 0, 6, 0, 155, 150);
        // index-指数资讯
        // levelTabMenu('#indexLevelMenu', 0, 6, 0, 155, 150);
        // index-技术预警
        // levelTabMenu('#indexVertical1', 0, 8, 1, 46, 150);
        // index-热点分析
        // levelTabMenu('#indexVertical2', 1, 4, 1, 112, 150);
        // 指数资讯页(IndicesRefer.html)-工业
        // levelTabMenu('#levelMenu1', 0, 6, 0, 170, 150);
        // 指数资讯页(IndicesRefer.html)-股票
        // levelTabMenu('#levelMenu2', 0, 8, 0, 128, 150)
    });
}
//获取链接
function LoadUrl() {
    return "http://10.0.0.21:8080/";
    // return "http://124.193.169.149:8080/";
}
//保存值
function SetLocal(key, val) {
    var storage = window.localStorage;
    storage[key] = val;
}
//获取值
function GetLocal(key) {
    var storage = window.localStorage;
    var returnStr = storage[key];
    if (undefined != returnStr && returnStr.length > 0) {
        return returnStr;
    }
    else {
        return "";
    }
}

function AllChecked(coll, collid) {
    //alert(coll[0].checked);
    var len = collid.length;
    for (var i = 0; i < len - 1; i++) {
        if (collid[i].type == 'checkbox') {
            collid[i].checked = coll[0].checked;
        }
    }
}

function ChangeString(str) {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/(?:t||v|r)*n/g, '<br />');
    str = str.replace(/ /g, '&nbsp;');
    str = str.replace(/t/g, '&nbsp;&nbsp;');
    str = str.replace(/x22/g, '&quot;');
    str = str.replace(/x27/g, '&#39;');
    return str;
}

function htmldecode(str) {
    str = str.replace(/&amp;/gi, '&');
    str = str.replace(/&nbsp;/gi, ' ');
    str = str.replace(/&quop;/gi, '"');
    str = str.replace(/&#39;/g, "'");
    str = str.replace(/&lt;/gi, '<');
    str = str.replace(/&gt;/gi, '>');
    //str = str.replace(/<br[^>]*>(?:(rn)|r|n)?/gi, 'n');
    return str;
}

/**
 * 自定义url汉字编码处理
 * @param str
 * @returns {string}
 * @constructor
 */
function CustomEnCode(str) {
    str = encodeURI(str).split('');
    for (var i = 3; i < str.length; i += 6) {
        str[i] = ''
    }
    return str.join('')
}
// test
// var str = '人';
// var str = '人工智能';
// console.log(CustomEnCode('产业动态'));

/**
 * 自定义url汉字解码处理
 * @param str
 * @returns {string} 中文字符串
 * @constructor
 */
function CustomDecode(str) {
    str = '--' + str;
    for (var i = 0, sli = '', cus = '', pu = []; i < str.length; i += 5) {
        sli = str.slice(i, i + 5);
        pu.push(sli)
    }
    cus = pu.join('%');
    try{
        return decodeURIComponent(cus.slice(2, cus.length))
    } catch (err) {
        if (err) {
            location.href = '404.html'
        }
    }
}
// test
// console.log(CustomDecode(CustomEnCode(str)));

/**
 * 抓取 url 传递的参数
 * @returns {Array}
 */
function getUrl() {
    return window.location.search.substring(1).split('&');
}

/**
 * 横向 tab 菜单
 * @param tabID (ul#id)
 * @param showsWay (显示方式，可设置两个固定参数：0 代表单行或单列；1仅代表双列；num 或 str 均可)
 * @param maxViewNum (tab 在页面的最大可见数；注：当 showsWay 值为 1 时，maxViewNum 为显示的最大行数)
 * @param direction (滚动方式，可设置两个固定参数：0 代表左右；1代表上下；num 或 str 均可)
 * @param moveDistance (每次移动的距离)
 * @param animateSpeed (移动动画速度)
 */
function levelTabMenu(tabID, showsWay, maxViewNum, direction, moveDistance, animateSpeed) {
    if ($(tabID).length > 0) {
        if ((showsWay * 1) !== 0 && (showsWay * 1) !== 1) {
            throw new Error('showsWay参数设置错误！')
        }
        else if ((direction * 1) !== 0 && (direction * 1) !== 1) {
            throw new Error('direction参数设置错误！')
        } else if ((showsWay * 1) === 1 && ($(tabID).find('li').length <= 8)) {
            $('.ver-btn').hide();
        } else {
            $(tabID).css('position', 'relative');
            $(tabID).each(function () {
                var obj = $(this);
                obj.length = $(this).children().length;
                obj.first = 1;
                if (((showsWay * 1 === 0) ? obj.length : Math.ceil(obj.length / 2)) > maxViewNum) {
                    obj.last = maxViewNum
                } else {
                    obj.last = ((showsWay * 1 === 0) ? obj.length : Math.ceil(obj.length / 2));
                    if (direction * 1 === 0) {
                        $(this).siblings('.tabscroll').hide()
                    } else {
                        $(this).parent().find('.prev').addClass('disabled');
                        $(this).parent().find('.next').addClass('disabled')
                    }
                    return false
                }
                if (direction * 1 === 0) {
                    var pos_x = obj.position().left
                } else {
                    var pos_t = obj.position().top
                }
                if (showsWay * 1 === 0) {
                    $(this).parent().find('.prev').addClass('disabled')
                } else {
                    $(this).parent().parent().siblings('.ver-btn').find('.prev').addClass('disabled')
                }
                if (showsWay * 1 === 0) {
                    // `next` btn
                    $(this).parent().find('.next').click(function () {
                        if (obj.length > obj.last) {
                            var currentNum = $(this).parent().siblings('.tab_menu').find('.current').index();
                            if ((currentNum + 1) <= obj.first) {
                                obj.children().eq(obj.first).addClass('current');
                                obj.children().eq(currentNum).removeClass('current');
                                obj.siblings('.tab_box').children().eq(obj.first).removeClass('hide');
                                obj.siblings('.tab_box').children().eq(currentNum).addClass('hide')
                            }
                            $(this).siblings('.prev').removeClass('disabled');
                            if (direction * 1 === 0) {
                                pos_x -= moveDistance
                            } else {
                                pos_t -= moveDistance
                            }
                            obj.last++;
                            obj.first++;
                            $(this).prev().removeClass('disabled');
                            if (obj.last == obj.length) {
                                $(this).addClass('disabled');
                                $(this).siblings('.tishi').hide()
                            }
                            if (direction * 1 === 0) {
                                $(this).parent().siblings(tabID).animate({'left': pos_x}, animateSpeed)
                            } else {
                                $(this).parent().siblings(tabID).animate({'top': pos_t}, animateSpeed)
                            }
                        }
                    });
                    // `prev` btn
                    $(this).parent().find('.prev').click(function () {
                        if (obj.first > 1) {
                            $(this).siblings('.next').removeClass('disabled');
                            $(this).siblings('.tishi').show();
                            var currentNum = $(this).parent().siblings('.tab_menu').find('.current').index();
                            if ((currentNum + 1) === obj.last) {
                                obj.children().eq(currentNum - 1).addClass('current');
                                obj.children().eq(currentNum).removeClass('current');
                                obj.siblings('.tab_box').children().eq(currentNum - 1).removeClass('hide');
                                obj.siblings('.tab_box').children().eq(currentNum).addClass('hide')
                            }
                            if (direction * 1 === 0) {
                                pos_x += moveDistance
                            } else {
                                pos_t += moveDistance
                            }
                            obj.first--;
                            obj.last--;
                            if (obj.first === 1) {
                                $(this).addClass('disabled');
                            }
                            if (direction * 1 === 0) {
                                $(this).parent().siblings(tabID).animate({'left': pos_x}, animateSpeed)
                            } else {
                                $(this).parent().siblings(tabID).animate({'top': pos_t}, animateSpeed)
                            }
                        }
                    })
                } else {
                    // 2`next` btn
                    $(this).parent().parent().siblings('.ver-btn').find(".next").click(function () {
                        if (Math.ceil(obj.length / 2) > obj.last) {
                            var currentNum = $(this).parent().siblings().find(tabID).find(".current").index();
                            if ((Math.floor(currentNum / 2) + 1) <= obj.first) {
                                obj.children().eq(currentNum + 2).addClass("current");
                                obj.children().eq(currentNum).removeClass("current");
                                obj.siblings(".tab_box").children().eq(currentNum + 2).removeClass("hide");
                                obj.siblings(".tab_box").children().eq(currentNum).addClass("hide")
                            }
                            $(this).parent().children(".prev").removeClass("disabled");
                            pos_t -= moveDistance;
                            obj.last++;
                            obj.first++;
                            $(this).prev().removeClass("disabled");
                            if (obj.last == Math.ceil(obj.length / 2)) {
                                $(this).addClass("disabled")
                            }
                            $(this).parent().siblings().find(tabID).animate({"top": pos_t}, animateSpeed)
                        }
                    });
                    // 2`prev` btn
                    $(this).parent().parent().siblings('.ver-btn').find(".prev").click(function () {
                        if (obj.first > 1) {
                            $(this).siblings(".next").removeClass("disabled");
                            var currentNum = $(this).parent().siblings().find(tabID).find(".current").index();
                            if ((Math.floor(currentNum / 2) + 1) == obj.last) {
                                obj.children().eq((currentNum - 2)).addClass("current");
                                obj.children().eq(currentNum).removeClass("current");
                                obj.siblings(".tab_box").children().eq((currentNum - 2)).removeClass("hide");
                                obj.siblings(".tab_box").children().eq(currentNum).addClass("hide")
                            }
                            pos_t += moveDistance;
                            obj.first--;
                            obj.last--;
                            if (obj.first == 1) {
                                $(this).addClass("disabled")
                            }
                            $(this).parent().siblings().find(tabID).animate({"top": pos_t}, animateSpeed)
                        }
                    })
                }
            })
        }
    }
}


function AddCollection(username, id, title, submenu) {
    var url = LoadUrl() + "axis2/services/MyService/addFavorite";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "user": username,
            "id": id,
            "title": title,
            "submenu": submenu,
            "url": location.href
        },
        dataType: "text",
        success: function (result) {
            var html = "";
            result = loadXML(result);
            result = jQuery.parseJSON(result);
            if (result) {
                alert("收藏成功");
            }
        }
    })
}
function CancleCollection(username, id) {
    var url = LoadUrl() + "axis2/services/MyService/cancelFavorite";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "user": username,
            "id": id
        },
        dataType: "text",
        success: function (result) {
            var html = "";
            result = loadXML(result);
            result = jQuery.parseJSON(result);
            if (result) {
                alert("取消收藏");
            }
        }
    })
}







