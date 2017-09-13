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

var TrainInfoDetail = {
    init: function () {
        this.IsCollectoin(user, pid);
        $(".mbx").html("<a href='../index.html'>首页</a> &gt; <a href='TrainInfo.html?menu=" + menu + "'>会展培训</a> &gt; <a href='TrainInfo.html?menu=" + menu + "'>培训信息</a> &gt; 培训详情");
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
                TrainInfoDetail.ShowInfo(result);
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
                    var apply = b.applyendtime;
                    if (typeof (apply) != "undefined") {
                        apply = apply.substring(0, 10);
                    }
                    var start = b.starttime;
                    if (typeof (start) != "undefined") {
                        start = start.substring(0, 10);
                    }
                    title = b.title;
                    var html = "";
                    var collstr = '';
                    if (user) {
                        collstr = '<div class="fawen_all radio_styles" onclick="CollType();return false;" style="color:#a9a9a9;font-size:15px; padding-top:0px; float:right;">'
                            + '收藏：'
                            + '<input type="radio" name="radiog_dark" id="radio1" class="css-checkbox" ' + ((isShow) ? 'checked' : '') + '>'
                            + '<label for="radio1" class="css-label radGroup1 radGroup2" style="color:#a9a9a9;font-size:15px;"></label>'
                            + '</div>';
                    }
                    html += b.title + '<br/>'
                        + '<span>日期：' + b.fromTime.substring(0, 10) + '&nbsp;&nbsp;&nbsp;&nbsp;来源：<a href="' + b.url + '">' + b.page_source + '</a>' + collstr + '</span>';
                    $(".biaoti").html(html);
                    html = '<table style="width:100%;font-weight:bolder;margin-bottom:10px;">'
                        + '<tr>'
                        + '<td>培训时间：' + apply + '</td>'
                        + '</tr>'
                        + '<tr>'
                        + '<td>报名时间：' + start + '</td>'
                        + '</tr>'
                        + '<tr>'
                        + '<td>培训地点：' + b.location + '</td>'
                        + '</tr>'
                        + '</table>';
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
TrainInfoDetail.init();