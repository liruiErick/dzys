/**
 * Created by lirui on 2017/6/2.
 */
//手动上传图片
function selectImage(file) {
    var temp;
    if($(file).attr("id")=="up_img_wu_file_0"){
        temp=0;
    }else if($(file).attr("id")=="up_img_wu_file_1"){
        temp=1;
    }else if($(file).attr("id")=="up_img_wu_file_2"){
        temp=2;
    }else if($(file).attr("id")=="up_img_wu_file_3"){
        temp=3;
    }else if($(file).attr("id")=="up_img_wu_file_4"){
        temp=4;
    }
    if(!file.files||!file.files[0]){
        return;
    }else{
        var reader=new FileReader();
        reader.onload=function (evt) {
            document.getElementById("imgShow_wu_file_"+temp).src=evt.target.result;
        };
        reader.readAsDataURL(file.files[0]);
        $.cookie("fileName",file.files[0].name);
    }
}
//拖拽上传图片
function bindDragUpload(obj) {
    obj.each(function () {
        var _this=this;
        _this.ondragenter=function () {

        };
        _this.ondragover=function (ev) {
            ev.preventDefault();
        };
        _this.ondragleave=function () {

        };
        _this.ondrop=function (ev) {
            ev.preventDefault();
            var fs=ev.dataTransfer.files;  //获取到文件列表集合
            for(var i=0;i<fs.length;i++){
                if(fs[i].type.indexOf('image')!=-1){  //如果是图片类型时
                    var fd=new FileReader();
                    fd.readAsDataURL(fs[i]);  //转换为文件信息
                    fd.onload=function(evt){  //读取成功时触发
                        $(_this).find("img").attr("src",evt.target.result);  //文件result信息
                    }
                    $.cookie("fileName",fs[i].name);
                }
                else{
                    alert('请上传图片类型')
                }
            }
        };
    });
}
