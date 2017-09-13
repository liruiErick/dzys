/**
 * Created by YGZ on 2017/6/20.
 */

//显示分页
(function ($) {
    $.fn.pagination = function (curr, all, count) {
        //容错处理
        if (all <= 0) {
            all = 1;
        }
        if (curr <= 0) {
            curr = 1;
        } else if (curr > all) {
            curr = all;
        }
        //默认显示页数为10
        if (!count) {
            count = 10;
        } else if (count < 1) {
            count = 1;
        }
        //计算显示的页数
        var from = curr - parseInt(count / 2);
        var to = curr + parseInt(count / 2) + (count % 2) - 1;
        //显示的页数容处理
        if (from <= 0) {
            from = 1;
            to = from + count - 1;
            if (to > all) {
                to = all;
            }
        }
        if (to > all) {
            to = all;
            from = to - count + 1;
            if (from <= 0) {
                from = 1;
            }
        }
        //写入
        if (curr > 1) {
            var prev = $("<li><a onclick='ShowPage(" + (curr - 1) + ")'>&laquo;</a></li>");
            this.append(prev);
        }
        for (var i = from; i <= to; i++) {
            if (i == curr) {
                var li = $("<li class='active'><a onclick='ShowPage(" + i + ")'>" + i + "</a></li>");
                this.append(li);
            } else {
                var li = $("<li><a onclick='ShowPage(" + i + ")'>" + i + "</a></li>");
                this.append(li);
            }
        }
        if (curr < all) {
            var prev = $("<li><a onclick='ShowPage(" + (curr + 1) + ")'>&raquo;</a></li>");
            this.append(prev);
        }
    }

})(jQuery);
