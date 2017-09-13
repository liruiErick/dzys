/**
 * Created by lirui on 2017/4/24.
 */

var uploadPreview=function(setting){
    var _self=this;
    _self.IsNull=function (value) {
        if(typeof (value)=="function"){
            return false;
        }
        if(value==undefined||value==null||value==""||value.length==0){
            return true;
        }
        return false;
    }
    _self.DefautlSetting={
        UpBtn:"",
        DivShow:"",
        ImgShow:"",
        Width:160,
        Height:90,
        temp:"",
        ImgType:["gif","jpeg","bmp","png"],
        ErrMsg:"选择图片格式错误,必须是gif,jpeg,bmp,png中的一种",
        callBack:function () {}
    };
    _self.Setting={
        UpBtn:_self.IsNull(setting.UpBtn)?_self.DefautlSetting.UpBtn:setting.UpBtn,
        DivShow:_self.IsNull(setting.DivShow)?_self.DefautlSetting.DivShow:setting.DivShow,
        ImgShow:_self.IsNull(setting.ImgShow)?_self.DefautlSetting.ImgShow:setting.ImgShow,
        Width:_self.IsNull(setting.Width)?_self.DefautlSetting.Width:setting.Width,
        Height:_self.IsNull(setting.Height)?_self.DefautlSetting.Height:setting.Height,
        ImgType:_self.IsNull(setting.ImgType)?_self.DefautlSetting.ImgType:setting.ImgType,
        ErrMsg:_self.IsNull(setting.ErrMsg)?_self.DefautlSetting.ErrMsg:setting.ErrMsg,
        callBack:_self.IsNull(setting.callBack)?_self.DefautlSetting.callBack:setting.callBack,
        temp:""
    };
    _self.getUrl= function(file){
        var url=null;
        if(window.createObjectURL!=undefined){
            url=window.createObjectURL(file);
        }
        else if(window.URL!=undefined){
            url=window.URL.createObjectURL(file);
        }
        else if(window.webkitURL!=undefined){
            url=window.webkitURL.createObjectURL(file);
        }
        return url;
    }
    _self.bind=function () {
        document.getElementById(_self.Setting.UpBtn).onchange=function () {
            if(this.value){
                /*if(!RegExp("\.("+_self.Setting.ImgShow.join("|")+")$","i").test(this.value.toLocaleLowerCase())){
                    console.log(_self.Setting.ErrMsg);
                    this.value="";
                    return false;
                }*/
                if(navigator.userAgent.indexOf("MSIE")>-1){
                    try{
                        document.getElementById(_self.Setting.ImgShow).src=_self.getUrl(this.files[0]);
                    }catch(e){
                        var div=document.getElementById(_self.Setting.DivShow);
                        this.select();
                        top.parent.document.body.focus();
                        var src=document.selection.createRange().text;
                        document.selection.empty();
                        document.getElementById(_self.Setting.ImgShow).style.display="none";
                        div.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                        div.style.width=_self.Setting.width;
                        div.style.height=_self.Setting.height;
                        div.style.filters.item("progid:DXImageTransform.Microsoft.AlphaImageLoader").src=src;
                    }
                    $.cookie("tempUrl",this.files[0]);
                }else{
                    document.getElementById(_self.Setting.ImgShow).src=_self.getUrl(this.files[0]);
                    /*console.log(this.files[0]);*/
                    $.cookie("tempUrl",this.files[0]);
                }
                _self.Setting.callBack();
            }
        }
    }
    _self.bind();
}
/*function file_click() {
    new uploadPreview({UpBtn:"up_img_wu_file_"+0,ImgShow:"imgShow_wu_file_"+0});
}
window.onload=file_click;*/
