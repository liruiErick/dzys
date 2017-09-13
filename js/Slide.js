//局部变量
// var temp = null;

/**
 * 抓取url传递的参数
 * @returns {Array}
 */
// function getUrl() {
//     return window.location.search.substring(1).split('&');
// }

//页面加载时调用
$(function () {
    // var type = '';
    // var u = location.pathname;
    // u = u.substring(u.lastIndexOf("/"));
    // if (getUrl()[0].split('=')[0] === 'menu' && u !== '/index.html') {
    //     type = CustomDecode(getUrl()[0].substring(5))
    // }

    //幻灯片
    var surl = LoadUrl() + "axis2/services/MyService/getSlideNewsList";
    $.ajax({
        type: "POST",
        url: surl,
        data: {
            "fromIndex": 0,
            "Size": 4
        },
        dataType: "text",
        success: function (result) {
            var html = "";
            var txthtml = "";
            result = loadXML(result);
            if (result) {
                result = jQuery.parseJSON(result);
                $.each(result, function (a, b) {
                    var stick = b.stick_abstract;
                    if (stick) {
                        if (stick.length > 300) {
                            stick = stick.substring(0, 300) + "...";
                        }
                    }
                    if(b.title)
                    {
                        txthtml = '<div class="txt">'
                                + '<a class="hdp-a-box" href="Industry/NewsShow.html?menu=&pid=' + b.id + '"><h3>' + b.title + '</h3><p>' + stick + '</p></a>'
                                + '</div>'
                    }
                    html += '<div class="item clearfloat" style="background:url(images/' + b.slide_pic + ') center no-repeat;background-size:cover;">'
                        + '<a class="mask" href="' + b.url + '"></a>'
                        + '<div class="zcenter">'
                        + txthtml
                        + '</div>'
                        + '</div>';
                });
                var sl = $("#scroll1");
                var sc = $('.slideControl');
                sl.empty().html(html);
                // 幻灯片收缩事件
                sc.click(function () {
                    sl.toggleClass('open');
                    var index = sl.attr('class').indexOf('open');
                    if (index !== -1) {
                        sc.css({"background": "url(images/slideup.png)"});
                    } else {
                        sc.css({"background": "url(images/slidedown.png)"});
                    }
                });

                function hideSlide() {
                    sl.removeClass('open');
                    sc.css({"background": "url(images/slidedown.png)"});
                }

                setTimeout(hideSlide, 10000)
            }
        }
    })
});




