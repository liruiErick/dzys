/**
 * Created by lirui on 2017/8/10.
 */
/*新闻数量*/
var pageCount = 0;
var data;
/**********************数据获取************************/
/**
 * 获取新闻信息
 * @param param(请求参数)
 */
function ShowInfo(param)  {
    renderNewsInfo(param);
}
/**********************数据渲染************************/
/**
 * 渲染新闻信息
 * @param param(请求参数)
 */
function renderNewsInfo(param) {
    if(param.id!=""){
        data={
            "pageIndex": Number(param.curr),
            "pageSize": Number(param.pageSize),
            "submenu": param.submenu,
            "area": param.area,
            "startTime": param.startTime,
            "endTime": param.endTime,
            "author": param.author,
            "checkflag": param.checkflag,
            "slideflag": Number(param.slideflag),
            "stickflag": Number(param.stickflag),
            "id": param.id,
            "keyword": param.keyword
        };
    }
    else{
        data={
            "indexId": param.id
        };
    }
    $.ajax({
        type: "POST",
        url: param.nurl,
        data: data,
        dataType: "text",
        success: function (result) {
            resolveNewsData(result,param);
        },
        error:function (mes) {
            fetchDataFailed(mes);
        }
    });
}
/**********************数据处理************************/
/**
 * 处理新闻信息
 * @param param(请求参数)
 * @param result(新闻数据)
 */
function  resolveNewsData(result,param) {
    var resultXml = loadXML(result);
    var parent=$("#"+param.parent.selector.split("#")[1]);
    var nometa=$("#"+param.nometa.selector.split("#")[1]);
    var pagingId=param.pagingId!=""?$("#"+param.pagingId.selector.split("#")[1]):null;
    parent.empty();
    if (!resultXml || resultXml == "[]") {
        nometa.removeClass("hide");
        if(param.pagingId!=""){
            pagingId.empty();
        }
    }
    else {
        var html = "";
        var resultJson = jQuery.parseJSON(resultXml);
        if(param.pagingId!=""){
            pageCount = resultJson[0].total;
            $.each(resultJson, function (a, b) {
                html += createNewsHtml(b,param.id);
            });
            parent.html(html);
            pagingId.empty();
            pagingId.pagination(param,Math.ceil(pageCount/param.pageSize), param.displayNums);
        }else{
            html +=createNewsHtml(resultJson,param.id);
            parent.html(html);
        }
    }
}
/**********************构造html************************/
/**
 * 构造html-构造新闻html
 * @param b(单个数据项)
 */
function createNewsHtml(b,id) {
    var html='<tr data-id="' + b.id + '" class="file">'
        + '<td class="select"><label  class="checkbox-inline"><input type="checkbox" data-id="' + b.id + '"  class="cyxw" value="option1" style="position: relative;top: 0;"/></label></td>'
        + '<td class="id">' + b.id + '</td>'
        + '<td class="title text-left">' + b.title + '</td>'
        + '<td class="areaType">' + b.area_type+ '</td>'
        + '<td class="author">' + b.author + '</td>'
        + '<td class="startTime">' + timeFormat(b.fromTime) + '</td>'
        + '<td class="checkFlag">' + JudgeCheckFlag(b.check_flag) + '</td>'
        + '<td class="last"><span class="update insert_rank" data-id="' + id + '" style="background: none;"><a href="javascript:;"></a></span></td>'
        + '</tr>';
    return html;
}
/**
 * 结果回调
 * @param mes(错误信息)
 */
function fetchDataFailed(mes) {
    console.log(mes)
}