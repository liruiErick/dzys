//加载xml文件
function loadXML(xmlString) {
    var xmlDoc = null;

    if ((!window.DOMParser && window.ActiveXObject) || (!!window.ActiveXObject || "ActiveXObject" in window)) {
        var xmlDomVersions =
            ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
        for (var i = 0; i < xmlDomVersions.length; i++) {
            try {
                xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                xmlDoc.async = false;
                xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串  
                break;
            }
            catch (e) {
            }
        }
    }
    else if (window.DOMParser && document.implementation &&
        document.implementation.createDocument) {
        try {
            domParser = new DOMParser();
            xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
        }
        catch (e) {
        }
    }
    else {
        return null;
    }
    var result = "";
    if (typeof (xmlDoc.text) == "undefined") {
        result = xmlDoc.firstChild.childNodes[0].innerHTML;
    }
    else {
        result = xmlDoc.text;
    }
    return result;
}
//获取链接
function LoadUrl() {
    return "http://10.0.0.21:8080/";
    // return "http://124.193.169.149:8080/";
}
//保存值
function SetLocal(key, val) {
    var storage = window.localStorage;
    storage[key] = val;
}
//获取值
function GetLocal(key) {
    var storage = window.localStorage;
    var returnStr = storage[key];
    if (undefined != returnStr && returnStr.length > 0) {
        return returnStr;
    }
    else {
        return "";
    }
}

function AllChecked(coll, collid)
{
    //alert(coll[0].checked);
    var len = collid.length;
    for (var i = 0; i < len-1; i++)
    {
        if (collid[i].type == 'checkbox')
        {
            collid[i].checked = coll[0].checked;
        }
    }
}


function ChangeString(str) {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/(?:t||v|r)*n/g, '<br />');
    str = str.replace(/ /g, '&nbsp;');
    str = str.replace(/t/g, '&nbsp;&nbsp;');
    str = str.replace(/x22/g, '&quot;');
    str = str.replace(/x27/g, '&#39;');
    return str;
}

function htmldecode(str) {
    str = str.replace(/&amp;/gi, '&');
    str = str.replace(/&nbsp;/gi, ' ');
    str = str.replace(/&quop;/gi, '"');
    str = str.replace(/&#39;/g, "'");
    str = str.replace(/&lt;/gi, '<');
    str = str.replace(/&gt;/gi, '>');
    //str = str.replace(/<br[^>]*>(?:(rn)|r|n)?/gi, 'n');
    return str;
}