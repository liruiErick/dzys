/*
 * @version:v1.0
 * @author:lr
 */
(function($){
	//操作提示
	$.tm_friendlyTips = function(options){
		var opts = $.extend({}, $.tm_friendlyTips.methods,$.tm_friendlyTips.default,options);
		opts.init(opts);
	}
	//提示采取的方法
	$.tm_friendlyTips.methods = {
		//初始化方法
		init:function(opts){
			this.template(opts);
		},
		//提示框模板
		template:function(opts){
			var $tips = $("#tm_tips");
			if($tips.html() == undefined){//保证页面只有一个提示框
				$tips= $("<div id='tm_tips' class='tm_tips "+opts.controls+"' style='top:-100px'><span>"+opts.content+"</span></div>");
				$("body").append($tips);
				this.event($tips,opts);
			}else{
				var newName = $tips.attr("class").split(" ");
				for(var i=0;i<newName.length;i++){
					if(newName[i] == "tm_success" || newName[i] == "tm_loading" || newName[i] == "tm_warning" || newName[i] == "tm_onnectionErr"){
						$tips.removeClass(newName[i]);
					}
				}
				$tips.addClass(opts.controls);
				$tips.find("span").html(opts.content);
				this.event($tips,opts);//重新初始化事件
			}
			$tips.animate({top:0},1000);
		},
		//设置提示框居中
		setCenter:function($tips){
			var winw = $(window).width();
			var lw = $tips.width();
			var left = (winw - lw)/2;
			$tips.css({left:left});
			
		},
		//为tips绑定事件
		event:function($tips,opts){
			var _this = this;
			this.setCenter($tips);//设置居中
			$(window).resize(function(){
				_this.setCenter($tips);
			});
			/*设置提示框消失时间*/
			$tips.timer = setTimeout(function(){
				clearTimeout($tips.timer);	
				$tips.animate({"top":-50},300);
			},opts.timer * 2000);
		}
	};
	//默认配置模板
	$.tm_friendlyTips.default = {
		content:"请稍后,操作正在进行中...",//提示内容
		controls:"tm_success",
		timer:1 //时间
	};
})(jQuery);