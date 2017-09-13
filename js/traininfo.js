var pageSize = 6;
var pageCount = 0;
var displayNums = 5;

function SearchT() {
    var time1 = $("#control_time_zhaocaixinxi").text();
    var morecheck = "";
    $('input:checkbox[class=css-checkbox]:checked').each(function (i, b) {
        if (i == 0) {
            morecheck = b.labels[0].innerText;
        }
        else {
            morecheck += ("," + b.labels[0].innerText);
        }
    });
    var kwords = $("#keysid").val();
    SetLocal("TimesT", time1);
    SetLocal("CheckboxsT", morecheck);
    SetLocal("keysT", kwords);
    ShowInfo(1, time1, morecheck, kwords);
}

function SearchAgain() {
    var keys = $("#keysid").val();
    if (keys != GetLocal("keysT")) {
        keys += GetLocal("keysT") + "," + keys;
    }
    ShowInfo(1, GetLocal("TimesT"), GetLocal("CheckboxsT"), keys);
}

function ShowInfo(currentIndex, time, checks, words) {
    var surl = LoadUrl() + "axis2/services/MyService/searchTrain";
    var start = (currentIndex - 1) * pageSize;
    $.ajax({
        type: "POST",
        url: surl,
        data: {
            "sub_srv": "22",
            "keyword": words,
            "datescope": time,
            "unit": checks,
            "fromIndex": start,
            "size": pageSize
        },
        dataType: "text",
        success: function (result) {
            var html = "";
            result = loadXML(result);
            result = jQuery.parseJSON(result);
            $("#listid").empty();
            $.each(result, function (a, b) {
                if (pageCount == 0) {
                    pageCount = b.total;
                }
                var apply = b.applyendtime;
                if (typeof (apply) != "undefined")
                {
                    apply = apply.substring(0, 10);
                }
                var start = b.starttime;
                if (typeof (start) != "undefined")
                {
                    start = start.substring(0, 10);
                }
                html += '<li>'
                    + '<div class="peishunxinxi_list_img"><a href="TrainInfoDetail.html?menu=5&pid=' + b.id + '"><img src="../images/' + b.picurl + '" width="354" height="168" alt=""/></a> </div>'
                    + '<div class="peishunxinxi_list_xq">'
                    + '<h2><a href="TrainInfoDetail.html?menu=5&pid=' + b.id + '">' + b.title + '</a></h2>'
                    + '<p>培训时间：' + apply + '</p>'
                    + '<p>报名时间：' + start + '</p>'
                    //+ '<p>活动规模：350人</p>'
                    + '<p>培训地点：' + b.location + '</p>'
                    + '</div>'
                    + '</li>';
            });
            $("#listid").html(html);
            var num = 0;
            //pageCount = 12;
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
    })
}

function ShowPage(currentIndex) {
    var time1 = $("#control_time_zhaocaixinxi").text();
    var morecheck = "";
    $('input:checkbox[class=css-checkbox]:checked').each(function (i, b) {
        if (i == 0) {
            morecheck = b.labels[0].innerText;
        }
        else {
            morecheck += ("," + b.labels[0].innerText);
        }
    });
    var kwords = $("#keysid").val();
    ShowInfo(currentIndex, time1, morecheck, kwords);
}

$(function () {
    ShowInfo(1, "", "", "");
});