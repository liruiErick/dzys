/**
 * Created by lirui on 2017/6/5.
 */
/*获取选中编辑权限
 * type为1,编辑新闻
 * type为2,添加新闻
 * */
function getCheckboxSelected(type) {
    return type==1?getSelectedContent("editLimit"):((type==2)?getSelectedContent("addLimit"):layer.msg("数据不正确",{time:500}));
}
/*设置领域全选
* param obj(操作对象)
* */
function setall(obj) {
    var id=$(obj).parent().attr("id");
    (id=="addLimit")?setContent("allLimitAdd","addLimit"):setContent("allLimitEdit","editLimit");
}
/*设置领域全选
 * param obj(操作对象)
 * */
function getall(obj) {
    (obj==1)?setChecked("addLimit",true):((obj==2)?setChecked("editLimit",true):layer.msg("数据不正确",{time:500}));
}
/*设置领域取消
* param obj(操作对象)
* */
function cancelall(obj) {
    (obj==1)?setChecked("addLimit",false):((obj==2)?setChecked("editLimit",false):layer.msg("数据不正确",{time:500}));
}
/*下拉框状态切换
* param rank(级别)
* */
function changeStatus(rank,parent) {
    rank=="高级管理员"?getall(1):cancelall(1);
}
/*获取编辑权限数组
* param operate(全选内容)
* */
function getEditLimitStr(operate) {
    var areaArr="";
    if(!operate){
         areaArr="";
    }else{
        for(var i=0;i<operate.split(";").length-1;i++){
            areaArr+=$.cookie(operate.split(";")[i])+";"
        }
    }
    return areaArr;
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
/*设置全选状态内容
 * param el(操作对象)
 * param pro(属性)
 * param dataEl(存储数据对象)
 * */
function setContent(el,pro) {
    var $el="#"+el;
    $($el).val()==1?setChecked(pro,true):setChecked(pro,false);
    $($el).val()==0?$($el).val(1):$($el).val(0);
}
/*
 * param el(操作对象)
 * */
function getSelectedContent(el) {
    var Type="",num=0;
    var $el="#"+el;
    $($el).find("input[type='checkbox']").each(function (a,b) {
        if (b.checked) {
            Type+=$.cookie($(this).get(0).dataset.name)+";";
            num++;
        }
    });
    if($($el).find("input[type='checkbox']").length==num){
        Type = "";
        num=0;
    }
    return Type;
}