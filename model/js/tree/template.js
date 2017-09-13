/*
 * @version:v1.0
 * @author:lr
 */
var template  = {
	//渲染树形菜单模板
	treeMenuTemplate:function(data,id){
		var childs = dataControl.getChildById(data,id); //查找当前id所有的子元素
		var html = "<ul style='display:block'>";
		childs.forEach(function(item){
			//获取当前的数据在第几层
			var level = dataControl.getLevelById(data,item.id);
			//判断当前数据是否子集
			var hasChild = dataControl.hasChilds(data,item.id);
			//如果有子元素，则显示下拉状态control，否则control-none
			var classNames = hasChild ? "control":"control-none";
			html += '<li><div class="title "'+classNames+'" style="padding-left:'+level*30+'px;" data-file-id="'+item.id+'"><span class="filename" data-id="'+item.selId+'">'+item.title+'</span></div>'+template.treeMenuTemplate(data,item.id)+'</li>';
		});
		html += "</ul>";
		return html;
	},
	//面包屑导航模板【parents:表示,所有的父级菜单】
	breadNavTemp:function(parents){
		var breadHtml = "";
		parents.forEach(function(elem,index){
			if(index == parents.length-1)return false;
			breadHtml += '<li><a href="javascript:void(0)" data-file-id="'+elem.id+'"><span>'+elem.title+'</span></a><i class="icon"></i></li>';
		});
		breadHtml += '<li><span class="currPath active" data-file-id="'+parents[parents.length-1].id+'">'+parents[parents.length-1].title+'</span></li>';
		$("#breadNav").html(breadHtml);		
	},
	//菜单夹模板【视图模式,childs:表示当前菜单下的所有一级子目录】
	folderView:function(childs){
		var fileHtml = '<div class="files" data-file-id = "'+childs.id+'"><a href="javascript:void(0)" class="selectBox"></a><span class="icon folderIcon viewIco'+childs.id+'"></span><span class="filename" data-id="'+childs.selId+'">'+childs.title+'</span><input type="text" class="txt"></div>';
		return fileHtml;
	},
	//菜单列表模板
	forlderLists:function(childs){
		var listHtml = '<div class="files" data-file-id="'+childs.id+'">'
				+'<div class="titles">'
					+'<a href="javascript:void(0)" class="selectBox"></a>'
					+'<span class="icon folderIcon listIco'+childs.id+'"></span>'
					+'<span class="filename" data-id="'+childs.selId+'">'+childs.title+'</span>'
					+'<input type="text" class="txt">'
				+'</div>'
				/*+'<div class="timer" data-id="'+childs.timer+'">'
					+'<span>'+childs.timer+'</span>'
				+'</div>'*/
			+'</div>';
		return listHtml;
	},
	//创建列表菜单
	createListsFile:function(fileData){
		var newFile = $("<div class='files reNameFile newFile' data-file-id='"+fileData.id+"'></div>");
		newFile.html(FileHtml(fileData));
		
		function FileHtml(fileData){
			var html = '<div class="titles">'
							+'<a href="javascript:void(0)" class="selectBox"></a>'
							+'<span class="glyphicon glyphicon-wrench"></span>'
							+'<span class="filename" data-id="'+childs.selId+'">'+fileData.title+'</span>'
							+'<input type="text" class="txt">'
						+'</div>';
						/*+'<div class="timer">'
							+'<span>'+fileData.timer+'</span>'
						+'</div>';*/
			return html;
		}
		return newFile;
	},
	//新建菜单夹模板 【fileData:代表菜单夹需要的数据,json】
	createFile:function(fileData){
		var newFile = $("<div class='files reNameFile newFile' data-file-id='"+fileData.id+"'></div>");
		newFile.html(FileHtml(fileData));
		
		function FileHtml(fileData){
			var html =  '<a href="javascript:void(0)" class="selectBox"></a>'
						+'<span class="glyphicon glyphicon-wrench"></span>'
						+'<span class="filename" data-id="'+childs.selId+'">'+fileData.title+'</span>'
						+'<input type="text" class="txt">';
			return html;
		}
		
		return newFile;
	},
	//创建树形菜单模板【opts:代表树形菜单需要的数据,json】
	createTreeMenu:function(opts){
		var $li = $("<li></li>")
		$li.html('<div class="title control-none" style="padding-left:'+opts.level*14+'px;" data-file-id="'+opts.id+'"><span class="filename" data-id="'+opts.selId+'">'+opts.title+'</span></div><ul style="display:block"></ul>');
		return $li;
	},
}

