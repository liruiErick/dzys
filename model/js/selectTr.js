/**
 * Created by lirui on 2017/6/5.
 */
function selectedTr(obj,status) {
    var selectId=$("#set"+status).val();
    var trObj = $(obj).parent('tr');
    if(!trObj.hasClass('slideActive')){
        trObj.addClass('slideActive').siblings('tr').removeClass('slideActive');
    }
    else if((trObj.get(0).dataset.id==selectId)&&trObj.hasClass('slideActive')){
        trObj.removeClass('slideActive');
    }
    $("#set"+status).val(trObj.get(0).dataset.id);//选中新闻的id
}
