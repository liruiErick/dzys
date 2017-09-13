$(function () {
    // ***********************************导航栏***********************************
    // 导航栏点击效果
    $(document).on('click', '.firnav>li>p', function () {
        var liObj = $(this).parent('li');
        liObj.toggleClass('active').siblings('li').removeClass('active');
    });
    //双击切换二级菜单选中状态
    $(document).on('click', '.secnav>li', function () {
        if (!$(this).hasClass('sactive')) {
            $(this).addClass('sactive').siblings('li').removeClass('sactive')
                .parents('li').siblings().find('li.sactive').removeClass('sactive')
        } else {
            $(this).addClass('sactive');
        }
    });
    //log、iframe格式自使用
    $('.logo').click(function () {
        $('.main').toggleClass('openMenu');
        $('.main').hasClass('openMenu')?$("#mainframe").css("width","17.2rem"):$("#mainframe").css("width","18.65rem");
    });
    $('.firnav > li').click(function () {
        $('.main').addClass('openMenu');
        $('.main').hasClass('openMenu')?$("#mainframe").css("width","17.2rem"):$("#mainframe").css("width","18.65rem");
    });
    // ***********************************数据项管理***********************************

    // 模态框：“添加数据项”：
    $('.insert_meta').click(function () {
        $('#insert_meta').on("show.bs.modal", function () {
            $('#insert_meta input').val("");
            $('#insert_meta textarea').val("");
        });
        $('#insert_meta').modal('show');
    });
    $('.insert_rank').click(function () {
        $('#insert_rank').on("show.bs.modal", function () {
            $('#insert_rank input').val("");
            $('#insert_rank textarea').val("");
        });
        $('#insert_rank').modal('show');
    });
    // 添加数据项
    $(document).on('click', '#insert_meta_save', function () {
        $('#insert_meta .must_sym').each(function () {
            var $input = $(this).parents('.form-group').find('input');
            if ($input.val() == '') {
                layer.msg('您有未填写的必选项');
                tag = false;
                return false;
            }
        });
        layer.msg('恭喜您，成功添加数据项！', {
            time: 1000
        }, function () {
            $('#insert_meta').modal('hide');
        });
    });
    //编辑数据项
    $(document).on('click', '#update_meta_save', function () {
        layer.msg('恭喜您，成功修改数据项！', {
            time: 1000
        }, function () {
            $('#insert_meta').modal('hide');
        });
    });
    // 添加数据类别
    $(document).on('click', '#rank_save', function () {
        layer.msg('恭喜您，成功添加数据类别！', {
            time: 1500
        }, function () {
            location.reload();
        });
        return false;
    });
    // ***********************************退出登录***********************************
    $('.logout').click(function () {
        layer.confirm('您确定要退出系统吗？', {
            btn: ['确定', '取消']
        },function () {
            layer.msg('已退出登录，欢迎下次访问系统！', {
                time: 1500
            }, function () {
                location.href = 'logreg.html';
            });
        },function (index) {
            layer.close(index);
        });
    });
});

//获取链接
function LoadUrl() {
    return "http://10.0.0.21:8080/";
    // return "http://124.193.169.149:8080/";
}