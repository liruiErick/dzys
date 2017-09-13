var menu = "";
var title = '';
var user = getCookie('loginName') || localStorage['loginName'] || "";
var pid = '';

if (getUrl()[1].slice(0, 3) === 'pid') {
    pid = getUrl()[1].substring(4);
}
if (getUrl()[0].slice(0, 4) === 'menu') {
    menu = getUrl()[0].substring(5);
}

function CollType() {
    //var c = document.getElementsByName("radiog_dark");
    var c = $("#radio1");
    if (c[0].checked) {
        c[0].removeAttribute("checked");
        CancleCollection(user, pid);
    }
    else {
        AddCollection(user, pid, title, "10");
        c[0].setAttribute("checked", true);
    }
}

var ShowInfoDetail = {
    init: function () {
        var ss = document.referrer;
        var name = "";
        var link = "";
        if (ss.indexOf("ShowInfo.html") !== -1) {
            link = "ShowInfo.html";
            name = "会议活动";
        } else if (ss.indexOf("TradeShow.html") !== -1) {
            link = "TradeShow.html";
            name = "行业展览";
        }
        else if (ss.indexOf("GlobalSearch.html") !== -1) {
            var sl = getUrl()[2].substring(5);
            if (sl == 1) {
                link = "ShowInfo.html";
                name = "会议活动";
            } else if (sl == 2) {
                link = "TradeShow.html";
                name = "行业展览";
            }
        }
        $(".mbx").html("<a href='../index.html'>首页</a> &gt; <a href='" + link + "?menu=" + menu + "'>会展培训</a> &gt; <a href='" + link + "?menu=" + menu + "'>" + name + "</a> &gt; 会议详情");
        this.IsCollectoin(user, pid);
    },
    IsCollectoin: function (UserName, DetailId) {
        var url = LoadUrl() + "axis2/services/MyService/checkFavorite";
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "user": UserName,
                "id": DetailId
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                ShowInfoDetail.ShowInfo(result);
            }
        })
    },
    ShowInfo: function (isShow) {
        var wurl = LoadUrl() + "axis2/services/MyService/getMeetingDetails";
        $.ajax({
            type: "POST",
            url: wurl,
            data: {
                "indexId": pid
            },
            dataType: "text",
            success: function (data) {
                data = loadXML(data);
                if (data) {
                    var b = jQuery.parseJSON(data);
                    title = b.title;
                    var html = "";
                    var collstr = '';
                    if (user) {
                        collstr = '<div class="fawen_all radio_styles" onclick="CollType();return false;" style="color:#a9a9a9;font-size:15px; padding-top:0; float:right;">'
                            + '收藏：'
                            + '<input type="radio" name="radiog_dark" id="radio1" class="css-checkbox" ' + ((isShow) ? 'checked' : '') + '>'
                            + '<label for="radio1" class="css-label radGroup1 radGroup2" style="color:#a9a9a9;font-size:15px;"></label>'
                            + '</div>';
                    }
                    html += b.title + '<br/>'
                        + '<span>日期：' + b.fromTime.substring(0, 10) + '&nbsp;&nbsp;&nbsp;&nbsp;来源：<a href="' + b.url + '">' + b.page_source + '</a>' + collstr + '</span>';
                    $(".biaoti").html(html);
                    html = '<span>导读:</span> ' + b.stick_abstract;
                    $("#daoduid").html(htmldecode(html));
                    var content = htmldecode("<p>" + b.content + "</p>");
                    content += '<div>'
                        + '<a href="' + b.url + '" style="float:right;">查看原文</a>'
                        + '</div>';
                    $("#Editneirongid").html(content);
                }
            }
        })
    }
};

ShowInfoDetail.init();