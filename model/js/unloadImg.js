/**
 * Created by lirui on 2017/6/2.
 */
function unLoadImg(obj) {
    $("#topFlag").val("");
    $("#existsImg").val("");
    $("#existsSmallImg").val("");
    var temp=-1;
    if($(obj).attr("id")=="UploadOne"){
        temp=0;
        $("#imgPath").val("");
    }else if($(obj).attr("id")=="UploadTwo"){
        temp=1;
        $("#imgPath").val("");
    }else if($(obj).attr("id")=="UploadThree"){
        temp=2;
        $("#imgPath").val("");
    }else if($(obj).attr("id")=="UploadFour"){
        temp=3;
        $("#imgPath").val("");
    }else if($(obj).attr("id")=="UploadFive"){
        temp=4;
        $("#hugeImgePath").val("");
    }
    $.ajax({
        type: "POST",
        url: LoadUrl() + "axis2/services/MyService/SavePng",
        data: {
            "stream":(document.getElementById("imgShow_wu_file_"+temp).src).split(",")[1],
            "picname":$.cookie("fileName")
        },
        dataType: "text",
        success: function (result) {
            var resultXml = loadXML(result);
            if(resultXml){
                layer.msg('恭喜您上传图片成功!', {
                    time: 1500
                },function () {
                    if (temp == 4) {
                        $("#hugeImgePath").val(resultXml);
                    } else {
                        $("#imgPath").val(resultXml);
                    }
                    if (temp == 0) {
                        $.cookie("topFlag", 1);//大图
                    } else {
                        $.cookie("topFlag",0);//小图
                    }
                });

            }else{
                layer.msg('对不起您上传图片失败!', {
                    time: 1500
                });
            }
        }
    });
}/*上传图片*/

