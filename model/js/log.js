/**
 * Created by lirui on 2017/6/5.
 */
/*获取选中的操作内容*/
function getCheckboxSelected() {
    return getSelectedContent("logOperate");
}
/*设置操作类型全选*/
function getAll() {
    var type=$("#allData").val();
    (type==1)?setChecked("logOperate",true):setChecked("logOperate",false);
    type==0?$("#allData").val(1):$("#allData").val(0);
}
/*
 * param el(操作对象)
 * */
function getSelectedContent(el) {
    var Type="",num=0;
    var $el="#"+el;
    $($el).find("input[type='checkbox']").each(function (a,b) {
        if (b.checked) {
            Type+=$(this).get(0).dataset.name+";";
            num++;
        }
    });
    if($($el).find("input[type='checkbox']").length==num){
        Type = "";
        num=0;
    }
    return Type;
}
/*
 * param obj(父级对象)
 * param type(设置状态)
 * */
function setChecked(obj,type) {
    var $el='#'+obj;
    $($el).find("input[type='checkbox']").each(function (a,b) {
        $(b).prop("checked",type);
    });
}