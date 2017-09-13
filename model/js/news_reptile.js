/**
 * Created by lirui on 2017/6/5.
 */
/*
* param key(选中内容)
* param type(子菜单类型)
* */
function EditName(key,type) {
    key=="图书"&&type=="18"?($(".ISSN").addClass("hide")?$(".ISSN").removeClass("hide"):null):(!$(".ISSN").addClass("hide")?$(".ISSN").addClass("hide"):null);
}
/*根据子菜单进行设置在编辑、添加时灰掉的字段*/
/*
 * param obj(子菜单类型)
 * param type(类型 1表示add,2表示edit 3表示搜索)
 * */
function IgnoreField(obj,type) {
    setWenxian(obj);
    resetIgnoreFieldAll();
    titleNameReset();
    $("#itemid").val(obj);
    /*显示修正*/
    switch (obj){
        case "5":case "6":case "8":case "10":case "11":case "12":case "15":case "16":case "17":case "19":case "29":
        commonset();
        break;
        case "18":
            commonset();
            $(".dcoType").removeClass("hide");
            break;
        case "4":
            commonset();
            $(".law").removeClass("hide");
            xianmuSet();
            break;
        case "22":
            commonset();
            locationReset();
            $(".time").removeClass("hide");
            $(".location").removeClass("hide");
            break;
        case "13":
            commonset();
            endtimeHide();
            faguiSet();
            $(".time").removeClass("hide");
            $(".lawUnit").removeClass("hide");
            $(".law").removeClass("hide");
            break;
        case "20":case "21":
            commonset();
            /*修正*/
            locationReset();
            $(".time").removeClass("hide");
            $(".publishRegion").removeClass("hide");
            $(".location").removeClass("hide");
            huizhanSet();
            break;
        case "14":
            commonset();
            resetIngoreField();
            break;
        default:
            layer.msg("内容错误",{time:1000});
            break;
    }
}
/*根据子菜单类型显示内容
* */
function locationReset() {
    $(".location").removeClass("hide");
}
function endtimeHide() {
    $(".endtimeInput").parents("div.time").addClass("hide");
}
function titleNameReset() {
    $(".unitTitle").find(".control-label").html('法律发文单位<span class="must_sym">*</span>');
    $(".organizationTitle").find(".control-label").html('法律发文机构<span class="must_sym">*</span>');
    $(".organizationTitle").find("input").attr("placeholder","请输入法律发文机构");
    $(".applyendtimeTitle").find(".control-label").html('报名时间<span class="must_sym">*</span>');
    $(".startTimeTitle").find(".control-label").html('起始时间<span class="must_sym">*</span>');
    $(".locationTitle").find(".control-label").html('培训地点<span class="must_sym">*</span>');
    $(".locationTitle").find("input").attr("placeholder","请输入培训地点");
}
function xianmuSet() {
    $(".unitTitle").find(".control-label").html('区域分类<span class="must_sym">*</span>');
    $(".organizationTitle").find(".control-label").html('发布区域<span class="must_sym">*</span>');
    $(".organizationTitle").find("input").attr("placeholder","请输入发布区域");
}
function faguiSet() {
    $(".applyendtimeTitle").find(".control-label").html('发布时间<span class="must_sym">*</span>');
    $(".startTimeTitle").find(".control-label").html('执行时间<span class="must_sym">*</span>');
}
function huizhanSet() {
    $(".locationTitle").find(".control-label").html('会展地点<span class="must_sym">*</span>');
    $(".locationTitle").find("input").attr("placeholder","请输入会展地点");
}
function commonset() {
    $("#addNewsBody").find("div.IgnoreFieldAdd").addClass("hide");
    $("#addNewsBody").find("div.IgnoreFieldAddOther").addClass("hide");
    $("#editNewsbody").find("div.IgnoreFieldEdit").addClass("hide");
    $("#editNewsbody").find("div.IgnoreFieldEditOther").addClass("hide");
    $("div.code").addClass("hide");
    $("div.time").addClass("hide");
}
function resetIngoreField() {
    $(".interpretType").removeClass("hide");
}
/*回复灰掉字段
* */
function resetIgnoreFieldAll() {
    $("div.resetIgnoreFieldAdd").removeClass("hide");
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
/*设置添加、编辑时全选时的状态
* param type (操作类型)
* */
function setAll(type) {
    var id=$(type).parent().attr("id");
    (id== "checkflag")?setContent("allcheckflag","checkflag"):((id == "area")?setContent("allarea","area"):((id == "areaAdd")?setContent("allareaAdd","areaAdd"):((id == "areaEdit")?setContent("allareaEdit","areaEdit"):setContent("allData","tablebody"))));
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
 * 初始化编辑器
 * */
function setEditor() {
    $("#contentAdd").Editor();
    $("#contentEdit").Editor();
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
/*获取选中的领域
 * type为空时,检索新闻
 * type为1,编辑新闻
 * type为2,添加新闻
 * */
function getSelectedArea(type) {
    return !type?getSelectedContent("area"):((type==1)?getSelectedContent("areaEdit"):getSelectedContent("areaAdd"));
}
/*获取选中的审核状态
 * */
function getSelectedCheckType() {
    return getSelectedContent("checkflag");
}
/*获取选中的子菜单
* param obj 所选对象
* */
function getSearchSelectedSubmenu(obj) {
    var $el="#"+obj;
    var $elContent=$($el).find("option:selected").attr("value");
    return $elContent=="全部"?"全部":($elContent=="其他"?"":$elContent);
}
/*获取设置热点推荐的内容
 * type为1,编辑新闻
 * type为2,添加新闻
 * */
function getHotflag(type) {
    return (type == 1)?($("#hotflagEdit").get(0).checked?1:0):($("#hotflagAdd").get(0).checked?1:0);
}
/*
 * 设置时间格式
 * param time(时间内容)
 * */
function timeFormat(time){
    return !time?time:(time).split("T")[0];
}
/*
 * 编辑器内容html格式化
 * param time(时间内容)
 * */
function ContentHtml(time) {
    return !time?time:htmldecode(time);
}
/* 审核状态设置
 * status=1 表示已审核
 * status=0 表示未审核
 * status=2 表示未通过
 * */
function JudgeCheckFlag(status) {
    return (status == 1)?("已审核"):((status == 0)?("未审核"):("未通过"));
}
/*获取领域数组*/
/*
 * 获取领域数组
 * param area(领域内容)
 * */
function getAreaArr(area) {
    return !area?[]:area.split(";");
}
/*
* 清空模态框残留内容
* */
function setAllBlank() {
    setBlank("addNewsBody");
    setBlank("editNewsbody");
    $("#EditorContent").text('');
    $(".hotflag").removeAttr("checked");
}

/*undefined转换为空
* param obj(操作内容)
* */
function changeBlank(content) {
    return content=="undefined"?"":content;
}
/*文件解读内容处理格式
* param submenu(子菜单类型)
* */
function setWenxian(submenu) {
    submenu=='18'?($(".wenxian").hasClass("hide")?$(".wenxian").removeClass("hide"):null):(!$(".wenxian").hasClass("hide")?$(".wenxian").addClass("hide"):null);
}
/*内容置空
* param parent(操作对象)
* */
function setBlank(parent) {
  var $el="#"+parent;
    $($el).find(".form-group").each(function(a,b) {
        var $input = $(b).find('input');
        var $textarea = $(b).find('textarea');
        $input.val('');
        $textarea.val('');
    });
}
/*设置option
 * param el(父级对象)
 * param child(子对象)
 * param content(内容)
 * param pro (属性)
 * param type (状态)
 * */
function setOptionStatus(el,child,content,pro,type) {
    var $el="#"+el;
    $($el).find(child).each(function (a,b) {
        $(b).removeAttr(pro);
        if($(b).val()==(content)){
            $(b).prop(pro,type);
        }
    });
}
/*设置Checkbox
 * param el(父级对象)
 * param child(子对象)
 * param content(内容)
 * param pro (属性)
 * param type (状态)
 * */
function setCheckboxStatus(el,child,content,pro,type) {
    var $el="#"+el;
    $($el).find(child).each(function (a,b) {
        $(b).removeAttr(pro);
        for(var j=0;j<getAreaArr(content).length;j++){
            if($(b).attr("data-name")==getAreaArr(content)[j]){
                $(b).prop(pro,type);
            }
        }
    });
}
/*爬虫设置标签与添加新闻菜单内容联动效果
* param name联动链接点
* */
function populateAddNews(name) {
    setOptionStatus("selectsubMenu","option",name,"selected",true);
}
