/*
 * @version:v1.0
 * @author:lr
 */

/*获取当前时间*/
function getTime() {
    var year,month,date;
    year=(new Date()).getFullYear();
    month=(new Date()).getMonth()+1;
    date=(new Date()).getDate();
    return year+"-"+month+"-"+date;
}
var data = [{id:-10000,pid:-1,title:"主菜单",timer:'2017-05-24',"selId":""}];
/*获取主菜单列表*/
function randerArea() {
    var surl = LoadUrl() + "axis2/services/MyService/GetAllMenusCustom";
    $.ajax({
        type: "POST",
        url: surl,
        data: {
        },
        dataType: "text",
        contentType: "text/xml",
        success: function (result) {
            result = loadXML(result);
            if (!result || result === "[]") {
                $("#mainView").addClass("hide");
                $("#nometa").removeClass("hide");
            } else {
                result = jQuery.parseJSON(result);
                $.each(result, function (a, b) {
                    var parentId;
                    if(typeof(b.parentId)=="undefined"){
                        parentId=-10000;
                    }
                    else{
                        parentId=Number(b.parentId);
                    }
                    data.push({"id":b.itemid,"pid":parentId,"title":b.menu,"timer":getTime(),"selId":b._id});
                });
                wy();
                /*$("#mainView").css("height",$("#menuBody").height());*/
            }
        }
    })
}
