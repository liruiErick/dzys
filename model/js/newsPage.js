/**
 * Created by lirui on 2017/6/5.
 */
/*进入新闻详情页*/
function enterSubMenuPage(obj){
    $.cookie("SelectedSubMenuName",$(obj).attr("data-menu"));
    $.cookie("SelectedSubMenuitemid",$(obj).attr("data-itemid"));
    $(obj).attr("data-menu")=="爬虫数据"?window.location.href="./reptile.html":window.location.href="./newSelectedSubPage.html";
}
