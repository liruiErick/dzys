$(function () {
    var type = CustomDecode(getUrl()[0].substring(5));
    var hurl = LoadUrl() + "axis2/services/MyService/getNormalNewsList";
    //行业展览
    $.ajax({
        type: "POST",
        url: hurl,
        data: {
            "area_type": type,
            "sub_srv": "21",
            "doc_Type": "",
            "interpret_type": "",
            "fromIndex": 0,
            "Size": 8
        },
        dataType: "text",
        //contentType: "text/xml",
        success: function (result) {
            var html = "";//内部变量
            if (result != "") {
                var result = loadXML(result);
                var r = jQuery.parseJSON(result);
                // console.log(r);
                $("#hzid").empty();
                $.each(r, function (a, b) {
                    var time = b.fromTime;
                    time = time.substring(5, 10);
                    html += '<li><a href="InternetThings/NewsShow.html?area=' + CustomEnCode(type) + '&submenu=21&id=8&top=' + CustomEnCode("行业展览") + '&pid=' + b.id + '"><em>[' + b.region + ']</em>' + b.title + '</a><span>' + time + '</span></li>'
                });
                $("#hzid").html(html);
            }
        }
    });

    //行业文献
    var yurl = LoadUrl() + "axis2/services/MyService/getNormalNewsList";
    $.ajax({
        type: "POST",
        url: yurl,
        data: {
            "area_type": type,
            "sub_srv": "18",
            "doc_Type": "",
            "interpret_type": "",
            "fromIndex": 0,
            "Size": 7
        },
        dataType: "text",
        success: function (result) {
            var html = "";
            if (result != "") {
                var result = loadXML(result);
                var r = jQuery.parseJSON(result);
                // console.log(r);
                $("#hangyeid").empty();
                $.each(r, function (a, b) {
                    html += '<li>'
                        + '<a href="InternetThings/NewsShow.html?area=' + CustomEnCode(type) + '&submenu=18&id=7&top=' + CustomEnCode("行业文献") + '&pid=' + b.id + '">'
                        + '<em class="se">[' + b.doc_type + ']</em> ' + b.title
                        + '</a>'
                        + '<span>' + b.fromTime.substring(5, 10) + '</span>'
                        + '</li>';
                });
                $("#hangyeid").html(html);
            }
        }
    });

    //市场观察
    var surl = LoadUrl() + "axis2/services/MyService/getNormalNewsList";
    $.ajax({
        type: "POST",
        url: surl,
        data: {
            "area_type": type,
            "sub_srv": "17",
            "doc_Type": "",
            "interpret_type": "",
            "fromIndex": 0,
            "Size": 8
        },
        dataType: "text",
        success: function (result) {
            var html = "";
            if (result != "") {
                var result = loadXML(result);
                var r = jQuery.parseJSON(result);
                // console.log(r);
                $("#marketid").empty();
                $.each(r, function (a, b) {
                    html += '<li>'
                        + '<a href="InternetThings/NewsShow.html?area=' + CustomEnCode(type) + '&submenu=17&id=6&top=' + CustomEnCode("市场观察") + '&pid=' + b.id + '">'
                        +  b.title
                        + '</a>'
                        + '<span>' + b.fromTime.substring(5, 10) + '</span>'
                        + '</li>';
                });
                $("#marketid").html(html);
            }
        }
    })
});