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
    renderSlideStickInfo(param);
}
/**********************数据渲染************************/
/**
 * 渲染新闻信息
 * @param param(请求参数)
 */
function renderSlideStickInfo(param) {
    if(Number(param.slideflag)==0){
        data={
            "pageIndex":Number(param.curr),
            "pageSize":Number(param.pageSize),
            "submenu":param.submenu,
            "area":param.area,
            "startTime":param.startTime,
            "endTime":param.endTime,
            "author":param.author,
            "slideflag":Number(param.slideflag),
            "stickflag":Number(param.stickflag),
            "checkflag":param.checkflag,
            "id":param.id,
            "keyword":param.keyword
        };
    }
    else if(param.id!=""){
        data={
            "indexId":id
        };
    }else{
        var start = (param.curr - 1) * param.pageSize;
        data={
            "fromIndex":Number(start),
            "Size":Number(param.pageSize)
        };
    }
    $.ajax({
        type: "POST",
        url: param.nurl,
        data: data,
        dataType: "text",
        success: function (result) {
            resolveSlideStickData(result,param);
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
function  resolveSlideStickData(result,param) {
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
        var unslideHtml = "";
        var resultJson = jQuery.parseJSON(resultXml);
        if(param.pagingId!=""){
            pageCount = resultJson[0].total;
            $.each(resultJson, function (a, b) {
                if(a==resultJson.length-1){
                    unslideHtml +=createunslideHtml(b,1);
                }else{
                    unslideHtml +=createunslideHtml(b,0);
                }
            });
            parent.html(html);
            pagingId.empty();
            pagingId.pagination(param,Math.ceil(pageCount/param.pageSize), param.displayNums);
        }else{
            unslideHtml +=createunslideHtml(result,1);
            parent.html(unslideHtml);
        }
    }
}
/**********************构造html************************/
/**
 * 构造html-构造未设幻灯片新闻html
 * @param b(单个数据项)
 */
function createunslideHtml(b,type) {
    var html= '<tr data-id="' + b.id + '" data-title="' + b.title + '" data-abstract="' + b.stick_abstract + '" data-slidePic="' + b.slide_pic + '" data-url="' + b.url + '">'
        + '<td class="indexId" onclick="selectedTr(this,1);">' + b.id + '</td>'
        + '<td class="title text-left" onclick="selectedTr(this,1);" title="' + b.title + '" title="'+b.title+'" '+ ((type === 1) ? ('style="border-bottom:0"') :'')+'>' +b.title+ '</td>'
        + '<td class="submenu" onclick="selectedTr(this,1);">' + $.cookie(b.srv_subtype) + '</td>'
        + '</tr>';
    return html;
}
/**
 * 构造html-构造已设幻灯片新闻html
 * @param b(单个数据项)
 */
function createSlideHtml(b,type) {
    var html='<tr data-id="' + b.id + '" data-title="' + b.title + '" data-abstract="' + b.stick_abstract + '" data-slidePic="' + b.slide_pic + '" data-url="' + b.url + '" data-subMenu="' + b.srv_subtype + '" >'
        + '<td class="title col-sm-8 text-left" onclick="selectedTr(this,2);" title="'+b.title+'">' + JudgeContentLength(b.title)+ '</td>'
        + '<td data-id="' + b.id + '" class="abstract col-sm-2 text-left" onclick="selectedTr(this,2);" title="'+b.stick_abstract+'" '+ ((type === 1) ? ('style="border-bottom:0"') :'')+'>' + JudgeContentLength(b.stick_abstract)+ '</td>'
        + '<td class="pic col-sm-2" onclick="selectedTr(this,2);">' + b.slide_pic + '</td>'
        + '<td class="link col-sm-2" onclick="selectedTr(this,2);" title="' + b.url + '">' + (b.url).substring(0,(b.url).indexOf(".com")+4)+ '</td>'
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