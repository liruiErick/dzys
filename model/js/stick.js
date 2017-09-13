/**
 * Created by lirui on 2017/6/6.
 */
/*设置下移*/
function setMoveDown() {
    var obj=$("#StickList").find("tr.slideActive");
    var list=$("#StickList").find("tr");
    if(obj.length>0){
        var thisLocation=list.index(obj);
        if(thisLocation==list.length-1){
            $(obj).removeClass("slideActive").parent().find("tr:first").addClass("slideActive");
        }
        else{
            $(obj).removeClass("slideActive").next().addClass("slideActive");
        }
    }else{
        layer.msg("请选中新闻");
    }
}
/*设置上移*/
function setMoveUp() {
    var obj=$("#StickList").find("tr.slideActive");
    var list=$("#StickList").find("tr");
    if(obj.length>0){
        var thisLocation=list.index(obj);
        if(thisLocation==0){
            $(obj).removeClass("slideActive").parent().find("tr:last").addClass("slideActive");
        }
        else{
            $(obj).removeClass("slideActive").prev().addClass("slideActive");
        }
    }else{
        layer.msg("请选中新闻");
    }
}