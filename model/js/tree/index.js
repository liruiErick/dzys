/*
 * @version:v1.0
 * @author:lr
 */
(function(){
    var datas = data;//菜单数据
	var wYun  = function(){
		var tools = {
			//初始化
			init : function(){
				tools.setViewH(); //初始化view的高度
				//下拉菜单
				tools.showDropDownMenu("viewMode","sortMode","sortMd_lists","active");

				tools.drawTreeMenu(datas,-1); //渲染树形菜单

				tools.changeMenu(datas); // 菜单切换

				tools.selectFolder(); //初始化菜单选中

				tools.handleFn(); //初始化工具方法

				$(window).resize(function(){
					tools.setViewH();
				});
			},

			// 工具方法:编辑、删除、新建、切换菜单视图
			handleFn : function(){
				var _this = this;
				//编辑菜单
				$("#rename").on("click",function(){
					//获取要重命名的菜单
					var renameFile = "";
					var  viewMode = $("#changeView").data("view");
					if(viewMode == "view"){
						renameFile =  $("#filesView").find(".active");
						reNameOfFile(renameFile);
					}else{
						renameFile =  $("#filesLists").find(".active");
						reNameOfFile(renameFile);
					}
					function reNameOfFile(renameFile){
						if(!renameFile.length){
							$.tm_friendlyTips({
								content:"请选择菜单",
								controls : "tm_warning",
								timer:1
							});
						}else if(renameFile.length >=2){
							$.tm_friendlyTips({
								content:"只能对单个菜单重命名！",
								controls : "tm_warning",
								timer:1
							});
						}else{

							//重新获取，避免出错
							//renameFile = $("#filesView").find(".active");

							//获取菜单名box
							var filename = renameFile.find(".filename");

							//获取重命名编辑框
							var editorInput = renameFile.find(".txt");

							//获取当前重名的 菜单id
							var fileId = renameFile.data("file-id");

							//获取对应树形目录的title
							var treeTitle = $("#treeMenu").find(".title[data-file-id='"+fileId+"']");

							//所有的菜单
							var allFiles = $("#view-of-icon .details").find(".files[data-file-id='"+fileId+"']");

							//添加样式，【表示开始重命名，显示命名框】
							renameFile.addClass("reNameFile");
							editorInput.val(filename.html());
							editorInput.select();

							editorInput.on("blur",function(){

								var val = $(this).val();

								if(val.trim() == ""){

									$.tm_friendlyTips({
										content:"请输入菜单名字",
										controls : "tm_warning"
									});
									editorInput.focus(); //重新获取焦点

								}else{

									var parentId = $("#getPidInput").val();
									var isExist = dataControl.isNameExsit(datas,parentId,val,fileId);

									if(isExist){ //表示菜单名存在，提示
										$.tm_friendlyTips({
											content:"菜单不能重名！",
											controls : "tm_warning"
										});
										editorInput.select();
									}else{
										console.log(filename);
                                        var surl = LoadUrl() + "axis2/services/MyService/UpdateMenuCustom";
                                        $.ajax({
                                            type: "POST",
                                            url: surl,
                                            data: {
                                                "id":filename.get(0).dataset.id,
                                                "menu":val
                                            },
                                            dataType: "text",
                                            success: function (result) {
                                                //filename.html(val); //更新菜单名
                                                allFiles.find(".filename").html(val);
                                                treeTitle.find("span").html(val); //更新树形菜单对应的名字
                                                //更新修改后的数据
                                                var isChangeSucc =  dataControl.changeNameById(datas,fileId,val);
                                                if(isChangeSucc){ //更新成功
                                                    $.tm_friendlyTips({
                                                        content:"编辑成功",
                                                        controls : "tm_success"
                                                    });
                                                    renameFile.removeClass("reNameFile");
                                                    editorInput.off("blur");//清楚当前绑定
                                                }
                                                else{
                                                    $.tm_friendlyTips({
                                                        content:"重命名失败",
                                                        controls : "tm_warning"
                                                    });
                                                }
                                            }
                                        });
									}
								}
							});
						}
					};
				});
				//删除菜单
				$("#cancle").on("click",function(){

					//获取要删除的子菜单【即：当前选中的】
					var selFile = $("#filesView").find(".active");

					if(!selFile.length){
						$.tm_friendlyTips({
							content:"请选中要删除的菜单！",
							controls : "tm_warning",
							timer:1
						});
					}else{

						$.tmDialog({ //删除提示
							title : "友情提示",
							contents : "你确定要删除么？",
							success : function(){ //确定删除

								selFile.remove(); //删除子菜单,

								for(var i=0;i<selFile.length;i++){

									var id = $(selFile[i]).data("file-id"); //获取要删除的菜单的id

									//获取对应的树形菜单 menu
									var trueMenus = $("#treeMenu").find(".title[data-file-id="+id+"]");
									$("#filesLists").find(".files[data-file-id="+id+"]").remove();
									//删除对应的树形菜单
									trueMenus.parent().remove();

									//删除对应的数据

									//要删除的数据
									var newArr = [];
									function del(data,pid){
										for(var i=0;i<data.length;i++){
											if(data[i].pid == pid){
												newArr.push(data[i])
												del(data,data[i].id); //递归查找子元素，
											}
										}
									}
									del(datas,id);
									dataControl.delDataByArr(datas,newArr,id); //删除数据

								}

								// filesView为空，显示提示文字，隐藏view
								if($("#filesView").html() == ""){

									$("#noFileTips").addClass("noFileTipsShow"); //显示无菜单提醒
									$("#view-of-icon").hide(); //隐藏view

									//树形菜单去下下拉状态
									$("#treeMenu").find(".title[data-file-id="+$("#getPidInput").val()+"]").removeClass("control").addClass("control-none");

									//取消全选按钮选中状态
									$("#selectAllFiles").removeClass("sel");
								}

								//提示菜单删除成功
								$.tm_friendlyTips({
									content:"菜单删除成功！",
									controls : "tm_success",
									timer:1
								});
							}
						});
					}
				})
				//新建菜单
				$("#newfolder").on("click",function(){
					$("#noFileTips").removeClass("noFileTipsShow"); //隐藏提示
					$("#view-of-icon").show(); //显示视图
					var viewMode = $("#changeView").data("view");
					if(viewMode == "view"){
						createnNewFile("filesView");
					}else{
						createnNewFile("filesLists");
					}

					function createnNewFile(filesView){
						var newFile = $("#"+filesView).find(".newFile"); //获取新建的子菜单
						var time = dataControl.getDates();
						//如果不存在刚刚新建的子菜单，则开始新建【目的：避免多次创建子菜单】
						if(!newFile.length){

							var newFile = {
								title : "新建子菜单", //新建子菜单的名称
								id : new Date().getTime(), //新建子菜单的id,时间戳：避免id相同
								timer : time
							};

							//在view中添加新建的子菜单
							$("#filesView").prepend(template.createFile(newFile));
							$("#filesLists").prepend(template.createListsFile(newFile));

							//获取新创建的菜单
							var createNewFile = $("#"+filesView).find(".newFile");
							//获取 编辑菜单 输入框
							var editor  = createNewFile.find(".txt");
							editor.select();
							editor.on("blur",function(){
								var val = $(this).val();
								if(val.trim() == ""){

									createNewFile.remove(); //移除新建的菜单建，表示新建失败

									// filesView为空，显示提示文字，隐藏view
									if($("#filesView").html() == ""){
										$("#noFileTips").addClass("noFileTipsShow");
										$("#view-of-icon").hide();
									}

									//提示菜单新建失败
									$.tm_friendlyTips({
										content:"新建子菜单失败！",
										controls : "tm_warning"
									});

								}else{

									//在哪里新建的内容？，获取新建内容的父id【放在点击的隐藏域里面】
									var parentId = $("#getPidInput").val();
									var fileid = createNewFile.data("file-id");

									var isExist = dataControl.isNameExsit(datas,parentId,val,newFile.id);

									//如果该菜单加的名字存在
									if(isExist){
										//提示菜单不能重名
										$.tm_friendlyTips({
											content:"菜单不能重名！",
											controls : "tm_warning",
											timer : 2
										});
										editor.select();
									}else{ //开始创建，更新数据

										var newFileDate = {
											id:newFile.id,
											pid:parentId,
											title:val,
											timer:newFile.timer
										};

										//更新title
										createNewFile.find(".filename").html(val);

										$("#filesView").find(".files[data-file-id='"+newFile.id+"'] .filename").html(val);
										$("#filesLists").find(".files[data-file-id='"+newFile.id+"'] .filename").html(val);

										//移除相关的样式【表示创建成功，要在当前显示】
										createNewFile.removeClass("reNameFile newFile");

										$("#filesView").find(".files").removeClass("reNameFile newFile");
										$("#filesLists").find(".files").removeClass("reNameFile newFile");


										//实时更新数据【为数据新添加一项】
										datas.push(newFileDate);

										//创建对应树形菜单

										//在哪个（pid=parentId）目录下面创建树形菜单
										var iNowPrentMenu = $("#treeMenu").find(".title[data-file-id='"+parentId+"']");
										// 获取 iNowPrentMenu 的相邻元素，目的：存放新创建的额树形菜单
										var sibEle = iNowPrentMenu.siblings("ul");

										//获取新创建的菜单应该存放到第几级
										var leave = dataControl.getLevelById(datas,fileid);

										//添加树形目录
										sibEle.append(template.createTreeMenu({ //更新树形菜单
											id : fileid,
											title : val,
											level :leave
										}));

										if(sibEle.html() != ""){//如果子元素为空，则添加下拉小图标【即移除 control-none 样式 即可】
											iNowPrentMenu.addClass("control").removeClass("control-none");
										}

										$("#selectAllFiles").removeClass("sel");

										//提示菜单创建成功
										$.tm_friendlyTips({
											content:"新建子菜单成功！",
											controls : "tm_success"
										});

										//创建成功后取消当次blur事件，避免重命名出错
										editor.off("blur");
									}
								}
							});

						}else{
							var inputTxt = newFile.find(".txt");
							inputTxt.focus();
						}
					}
				});
				//视图切换：
				$("#changeView").on("click",function(){

					//如果正在新建子菜单时切换视图，移除所有正在新建的菜单，以免出错
					$("#view-of-icon").find(".newFile").remove();

					var modes = $(this).data("view"); //获取当前的视图方式
					var isNullFile = $("#view-of-icon").find(".details").html();
					if(isNullFile.trim()){
						if(modes === "view"){ //切换为列表方式
							$(this).data("view","lists");
							$("#filesView").hide();
							$("#filesLists").show();
						}else{ //切换为 视图方式
							$(this).data("view","view");
							$("#filesView").show();
							$("#filesLists").hide();
						}
					}else{
						$.tm_friendlyTips({
							content:"视图切换失败，暂无菜单",
							controls : "tm_warning",
							timer : 2
						});
					}
				});
				//编辑菜单
				function triggerFn(obj,val,callback){
					var parent = obj.parents(".files");
					if(parent.hasClass("active")){
						var ac = $("#filesLists").find(".active");
						var len = ac.length;
						if(len>=2){
							$.tm_friendlyTips({
								content:val,
								controls : "tm_warning",
								timer : 2
							});
							return false;
						}else{
							//$("#move").trigger("click");
							callback && callback();
						}
					}else{
						$.tm_friendlyTips({
							content:val,
							controls : "tm_warning",
							timer : 2
						});
						return false;
					}
				}
				//按时间排序菜单
				$("#sort_timer").on("click",function(){
					var sortmode = $(this).data("sortmode");
					var sortDatas = datas;
					for(var i=0;i<sortDatas.length;i++){
						sortDatas[i].numbers = sortDatas[i].timer.replace(/-/g,'');
					}
					if(sortmode == "up"){ //升序
						$(this).data("sortmode","bottom");
						$(this).attr("title","降序");
						dataControl.sorts(sortDatas,"numbers",true);
					}else{ //降序
						$(this).data("sortmode","up");
						$(this).attr("title","升序");
						dataControl.sorts(sortDatas,"numbers",false);
					}
					selSortedOrg(sortDatas);
				});
                //字母表排序
                $("#sort_letter").on("click",function(){
                    var sortDatas = datas;
                    for(var i=0;i<sortDatas.length;i++){
                        sortDatas.sort(dataControl.sortByLetter);
                    }
                    console.log(sortDatas);
                    selSortedOrg(sortDatas);
                });
				//显示菜单缩略图
				$("#show_thumbnail").on("click",function(){
					$("#filesView").show();
					$("#filesLists").hide();
					$("#changeView").data("view","view");

				});
				//排序后选中原来该选中的
				function selSortedOrg(sortDatas){
					var orgSel = [];
					var active = $("#filesLists").find(".active");
					active.each(function(i,e){
						orgSel.push($(e).data("file-id"));
					})
					_this.drawFiles(sortDatas,$("#getPidInput").val());
					if(orgSel.length>=1){
						for(var i=0;i<orgSel.length;i++){
							$("#filesLists").find(".files[data-file-id='"+orgSel[i]+"']").addClass("active");
							$("#filesView").find(".files[data-file-id='"+orgSel[i]+"']").addClass("active");
						}
					}
				}
			},

			//菜单切换【包括：树形菜单切换、面包屑导航切换】
			changeMenu : function(data){
				var _this = this;
				//树形菜单切换
				$("#treeMenu").on("click",".title",function(){
					changeMenus($(this));
				});
				//面包屑当行切换
				$("#breadNav").on("click","li>a",function(){
					changeMenus($(this));
				});
				//切换导航
				function changeMenus(currentMenu){
					var obj = $("#treeMenu");
					var currId = currentMenu.data("file-id"); //获取当前id
					_this.selctCurrTreeMenu(obj,currId); //选中当前点击的menu
					_this.drawBreadNav(data,currId); //重新渲染面包屑导航
					$("#getPidInput").val(currId); //缓存当前 id ,为后续删除做准备
					$("#selectAllFiles").removeClass("sel"); //切换菜单时取消全选按钮的状态
				}
			},

			//选中子菜单
			selectFolder : function(){
				var _this = this;
				//点击选中按钮,选中子菜单
				$("#view-of-icon").find(".details").on("mousedown",".files .selectBox",function(ev){
                    var selectMenuName=$(this).parents("div.files").find("span.filename").text();
                    $("#filesView").find(".files").each(function () {
                    	if($(this).find("span.filename").text()==selectMenuName){
                            $(this).toggleClass("active");
						}
                    });
                    $("#filesLists").find(".files").each(function () {
                        if($(this).find("span.filename").text()==selectMenuName){
                            $(this).toggleClass("active");
                        }
                    });
					_this.selectCheckAllBtn();
					return false;
				});
				//点击全选按钮选中所有的菜单
				$("#selectAllFiles").on("click",function(){
					$(this).toggleClass("sel");
					var isSel = $(this).hasClass("sel"); //当前全选按钮是否选中
					if(isSel){
						$("#filesLists").find(".files").addClass("active");
						$("#filesView").find(".files").addClass("active");
					}else{
						$("#filesLists").find(".files").removeClass("active");
						$("#filesView").find(".files").removeClass("active");
					}
				});
				// 拖拽选中
				/*$("#view-of-icon").off().on("mousedown",function(ev){
					var disX = ev.clientX;
					var disY = ev.clientY;
					var newCase = $("<div></div>"); //创建拖选框
					var minleft = $("#view-of-icon").offset().left;
					var mintop = $("#view-of-icon").offset().top;
					newCase.css({width : 0,height : 0,background:"blue",opacity:0.2,position : "absolute",left : disX,top : disY,border : "1px dashed #dedede"});
					$("body").append(newCase); //body添加新建元素
					$(document).on("mousemove",moveFn);
					$(document).on("mouseup",upFn);
					//鼠标移动
					function moveFn(ev){
						var dx = ev.clientX;
						var dy = ev.clientY;
						if(Math.abs(dx-disX) <= 10) return false;//如果移动的距离小于10,代表不托选
						dx = dx<=minleft ? minleft : dx;
						dy = dy<=mintop ? mintop : dy;
						//计算鼠标移动的距离，【就是新建元素的高或宽】
						var newDisX = Math.abs(dx - disX);
						var newDisY = Math.abs(dy -disY);
						//默认：鼠标按下的坐标为新建元素的坐标
						var left = disX;
						var top = disY;
						if(ev.clientX > disX && ev.clientY > disY){ //向右下角拉动，left,top为默认的鼠标按下时坐标
							left = disX;
							top = disY;
						}else if(ev.clientX < disX && ev.clientY < disY){//向左上角拉动，left,top修改为新的鼠标移动时坐标
							left = ev.clientX;
							top = ev.clientY;
						}else if(ev.clientY < disY){ //向右上角拉动 ,left为鼠标按下的坐标，top为鼠标移动的坐标
								left = disX;
								top = ev.clientY;
						}else if(ev.clientX < disX){ //向左下角拉动，left为鼠标移动的x轴坐标，top为鼠标按下的坐标
							left = ev.clientX;
							top = disY;
						}

						left = left<=minleft ? minleft : left;
						top = top<=mintop ? mintop : top;

						//更新拖拽框的位置的位置
						newCase.css({
							width : parseInt(newDisX),
							height : parseInt(newDisY),
							left : left,
							top : top
						});

						var niewMode = $("#changeView").data("view");
						if(niewMode == "view"){
							var filesBox = $("#filesView").find(".files");
							//碰撞【拖拽是碰撞回调】
							dataControl.pzCallbackFn(newCase,{
								boxDom : filesBox,
								pzCallbacll :function(){
									//$(this).addClass("active");
									var id = $(this).data("file-id");
									addClass(id);
								},
								nopzCallbacll :function(){
									var id = $(this).data("file-id");
									removeClass(id);
								}
							});
						}else{
							var filesBox = $("#filesLists").find(".files");
							//碰撞【拖拽是碰撞回调】
							dataControl.pzCallbackFn(newCase,{
								boxDom : filesBox,
								pzCallbacll :function(){
									var id = $(this).data("file-id");
									addClass(id);
								},
								nopzCallbacll :function(){
									var id = $(this).data("file-id");
									removeClass(id);
								}
							});
						}
					}
					/!*对选中区域菜单添加选中样式*!/
					function addClass(id){
						$("#filesLists").find(".files[data-file-id='"+id+"']").addClass("active");
						$("#filesView").find(".files[data-file-id='"+id+"']").addClass("active");
						_this.selectCheckAllBtn();
					}
					/!*对选中区域菜单清除选中样式*!/
					function removeClass(id){
						$("#filesLists").find(".files[data-file-id='"+id+"']").removeClass("active");
						$("#filesView").find(".files[data-file-id='"+id+"']").removeClass("active");
						_this.selectCheckAllBtn();
					}
					//鼠标抬起
					function upFn(){
						$(document).off("mousemove");
						$(document).off("mouseup");
						newCase.remove();//移除新建选框
					}
				});*/
			},

			//选中全选按钮
			selectCheckAllBtn : function(){
				var sel = $("#filesView").find(".active").length = $("#filesLists").find(".active").length;
				var folder = $("#filesView").find(".files").length = $("#filesLists").find(".files").length;
				$("#selectAllFiles").removeClass("sel"); //切换时取消全选按钮
				//当选中的与总共的菜单一样时，表示选中全部
				(sel === folder && sel)  ? $("#selectAllFiles").addClass("sel") : $("#selectAllFiles").removeClass("sel");
			},

			//渲染树形菜单
			drawTreeMenu : function(data,currid){
				var treeMenu = $("#treeMenu");
				var TreeMenuHtml = template.treeMenuTemplate(data,currid);
				treeMenu.html(TreeMenuHtml);
				this.selctCurrTreeMenu(treeMenu,-10000);//默认第一个为选中状态
				this.drawBreadNav(datas,-10000);//默认第一个为选中状态
			},

			//渲染面包屑导航
			drawBreadNav : function(data,currid){
				var parents = dataControl.getParents(data,currid).reverse();//获取id为currid对象的所有父元素
				template.breadNavTemp(parents);//对其父元素进行初始化面包屑导航
				this.drawFiles(datas,currid);//根据导航渲染子菜单菜单
			},

			//渲染子菜单菜单【子菜单】
			drawFiles : function(data,currid){
				var hasChilds = dataControl.hasChilds(data,currid);//判断id为currid是否有子元素
				if(hasChilds){//有子元素
					var childs = dataControl.getChildById(data,currid);//获取其所有子元素
					$("#noFileTips").removeClass("noFileTipsShow");//隐藏无子菜单提示
					$("#view-of-icon").show(); //显示菜单列表
					var html = "";
					var listsHtml = "";
					childs.forEach(function(item){
						html +=  template.folderView(item);
						listsHtml += template.forlderLists(item);
					});
					$("#filesView").html(html);//渲染菜单视图列表
					$("#filesLists").html(listsHtml);//渲染菜单详情列表
				}else{//无子元素
					$("#view-of-icon").hide();//隐藏菜单列表
					$("#noFileTips").addClass("noFileTipsShow");//显示无子菜单提示
					$("#view-of-icon").find(".details").html("");//移除菜单列表内遗留的内容
				}
			},

			//选中当前id的菜单
			selctCurrTreeMenu : function(obj,currid){
                currid = currid || 0;//当currid为空时,默认为主菜单
                var ele = obj.find(".title[data-file-id='"+currid+"']");//获取菜单对象
                obj.find(".title").removeClass("active"); //取消其他选中状态
                obj.find(".title").removeClass("parActive"); //取消其他选中状态
                obj.find(".title").removeClass("MainMenuctive"); //取消其他选中状态
				if(ele.text()=="主菜单"){
                    ele.addClass("MainMenuctive"); //为当前的菜单添加选中状态
				}else{
                    ele.addClass("active"); //为当前的菜单添加选中状态
				}
				if(ele.parent("li").parent("ul")){
                    ele.parent("li").parent("ul").siblings("div.title").addClass("parActive");
				}
                /*ele.parent("li").siblings().find("ul").each(function () {
					console.log($(this).css("display"));
                });*/
                ele.parent("li").siblings().find("ul").each(function () {
                    if($(this).css("display")=="block"){
                        $(this).hide();
                    }
                });
                ele.parent("li").find("ul").show();
			},

			// 显示下拉菜单(在视图切换时用到)
			showDropDownMenu : function(obj,child1,child2,currName){
				$("#"+obj).mouseover(function(){
					$(this).find("."+child1).addClass(currName);//切换图标添加选中样式
					$(this).find("."+child2).show();//显示视图切换列表
				}).mouseout(function(){
					$(this).find("."+child1).removeClass(currName);
					$(this).find("."+child2).hide();
				});
			},

			//设置view的高度【随浏览器的变化而变化】
			setViewH : function(){
				var _this = this;
				var height = $("body").height() - 130;
                $("#treeMenuWrap").css("zoom",height>840?1:height/840);
				var width = $("#mainView").width() - $("#treeMenuWrap").outerWidth();
				$("#mainView").css("height",height);
                $("#panelArea").css("width",width);
			}
		}
		return tools.init(); //避免外界修改里面的方法
	}
	window.wy = wYun; //提供外界接口
})();