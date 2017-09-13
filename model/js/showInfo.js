/**
 * Created by lirui on 2017/6/20.
 */
/*新闻数量*/
var pageCount = 0;

/**********************数据获取************************/
/**
 * 获取新闻信息
 * @param param(请求参数)
 */
function ShowInfo(param)  {
    renderSpideInfo(param);
}
/**********************数据渲染************************/
/**
 * 渲染新闻信息
 * @param param(请求参数)
 */
function renderSpideInfo(param) {
    $.ajax({
        type: "POST",
        url: param.nurl,
        data: {
            "subsrv": param.submenu,
            "area": param.area,
            "starttime": param.startTime,
            "endtime": param.endTime,
            "check_flag": param.checkflag,
            "keyword": param.keyword,
            "care":param.care,
            "pageIndex": Number(param.curr),
            "pageSize": Number(param.pageSize)
        },
        dataType: "text",
        success: function (result) {
            resolveSpideData(result,param);
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
function  resolveSpideData(result,param) {
    var resultXml = loadXML(result);
    var parent=$("#"+param.parent.selector.split("#")[1]);
    var nometa=$("#"+param.nometa.selector.split("#")[1]);
    var pagingId=$("#"+param.pagingId.selector.split("#")[1]);
    parent.empty();
    if (!resultXml || resultXml == "[]") {
        nometa.removeClass("hide");
        pagingId.empty();
    }
    else {
        var html = "";
        var resultJson = jQuery.parseJSON(resultXml);
        pageCount = resultJson[0].total;
        $.each(resultJson, function (a, b) {
            html += createSpideHtml(b);
        });
        parent.html(html);
        pagingId.empty();
        pagingId.pagination(param,Math.ceil(pageCount/param.pageSize), param.displayNums);
    }
}
/**********************构造html************************/
/**
 * 处理新闻信息
 * @param b(单条新闻数据)
 */
function createSpideHtml(b) {
   var html= '<tr data-id="' + b._id + '">'
        + '<td class="select"><label  class="checkbox-inline"><input type="checkbox" data-id="' + b._id + '" value="option1" /></label></td>'
        + '<td class="tip" ><span class="hide" style="color: red;">!!</span><span class="hide" style="color: green;">☆☆</span></td>'
        + '<td class="id">' + b._id + '</td>'
        + '<td class="title text-left">' + b.title + '</td>'
        + '<td class="areaType">' + changeBlank(b.area)+ '</td>'
        + '<td class="startTime">' + timeFormat(b.time)+ '</td>'
        + '<td class="checkFlag">' + JudgeCheckFlag(b.check_flag) + '</td>'
        + '<td class="last"><span class="update insert_rank" data-id="' + b._id + '" style="background: none;"><a href="javascript:;"></a></span></td>'
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