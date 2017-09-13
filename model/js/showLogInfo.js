/**
 * Created by lirui on 2017/8/14.
 */
/*日志数量*/
var pageCount = 0;

/**********************数据获取************************/
/**
 * 获取日志信息
 * @param param(请求参数)
 */
function ShowInfo(param)  {
    renderLogInfo(param);
}
/**********************数据渲染************************/
/**
 * 渲染日志信息
 * @param param(请求参数)
 */
function renderLogInfo(param) {
    $.ajax({
        type: "POST",
        url: param.nurl,
        data: {
            "user":param.user,
            "operate":param.operate,
            "keyword":param.keyword,
            "starttime":param.starttime,
            "endtime":param.endtime,
            "pageIndex":Number(param.curr),
            "pageSize":Number(param.pageSize)
        },
        dataType: "text",
        success: function (result) {
            resolveLogData(result,param);
        },
        error:function (mes) {
            fetchDataFailed(mes);
        }
    });
}
/**********************数据处理************************/
/**
 * 处理日志信息
 * @param param(请求参数)
 * @param result(日志数据)
 */
function  resolveLogData(result,param) {
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
            html += createLogHtml(b);
        });
        parent.html(html);
        pagingId.empty();
        pagingId.pagination(param,Math.ceil(pageCount/param.pageSize), param.displayNums);
    }
}
/**********************构造html************************/
/**
 * 处理日志信息
 * @param b(单条日志数据)
 */
function createLogHtml(b) {
    var html='<tr data-id="'+b._id+'">'
        +'<td class="operateTime">'+b.time+'</td>'
        +'<td class="userId">'+b.user+'</td>'
        +'<td class="Operate">'+b.Operate+'</td>'
        +'<td class="indexId">'+b.id+'</td>'
        +'<td class="title" title="'+b.title+'">'+(b.title).substring(0,12)+'</td>'
        +'</tr>';
    return html;
}
/**
 * 结果回调
 * @param mes(错误信息)
 */
function fetchDataFailed(mes) {
    console.log(mes)
}