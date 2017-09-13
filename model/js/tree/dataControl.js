/*
 * @version:v1.0
 * @author:lr
 */
(function(){
	var dataControl = {
		//获取当前id所有的子菜单
        getChildById : function(data,pid){
            var newArr = [];
            for(var i=0;i<data.length;i++){
                if(data[i].pid == pid){
                    newArr.push(data[i]);
                }
            }
            return newArr;
        },
		//获取当前id的所有父菜单
		getParents : function (data,currentId){
			var arr = [];
			for( var i = 0; i < data.length; i++ ){
				if( data[i].id == currentId ){
					arr.push(data[i]);
					arr = arr.concat(dataControl.getParents(data,data[i].pid))
					break;
				}
			}
			return arr;
		},
		//获取当前id对象在第几级菜单
		getLevelById:function (data,id){
			return this.getParents(data,id).length;
		},
		//判断当前id是否有子菜单
		hasChilds:function (data,id){
			return this.getChildById(data,id).length !== 0;
		},
		//删除菜单、【传入要删除的数据：数组形式】
		delDataByArr:function(data,newArr,id){
			
			for(var i=0;i<data.length;i++){
				for(var j=0;j<newArr.length;j++){
					if(data[i].title){
						if(data[i].title === newArr[j].title && data[i].id === newArr[j].id && data[i].pid === newArr[j].pid){
							data.splice(i,1); //删除子元素，
						}
					}else{
						throw new Error("网络异常，删除菜单过程中出现错误！")
					}
				}
			}
			
			for(var i=0;i<data.length;i++){
				if(data[i].id == id){
					data.splice(i,1); //删除当前对象
				}
			}
			
		},
		//判断指定菜单是否存在
		isNameExsit:function (data,id,names,currentId){
			var childs = dataControl.getChildById(data,id); //所有子菜单
			for( var i = 0; i < childs.length; i++ ){
				if( childs[i].title === names && childs[i].id != currentId ){
					return true;
					break;
				}
			}
			return false;
		},
		//编辑某个id的菜单名称
		changeNameById:function (data,id,names){
			for( var i = 0; i < data.length; i++ ){
				if( data[i].id == id ){
					data[i].title = names;
					return true;
				}
			}
			return false;	
		},
		//碰撞检测
		pzFn:function(obj1,obj2){
			var top1 = obj1.offset().top;
			var right1 = obj1.offset().left+obj1.width();
			var bottom1 = obj1.offset().top + obj1.height();
			var left1 = obj1.offset().left; 
			var top2 = obj2.offset().top;
			var right2 = obj2.offset().left+obj2.width();
			var bottom2 = obj2.offset().top + obj2.height();
			var left2 = obj2.offset().left;
			//没有碰撞的情况
			if(left1 > right2 || bottom1 < top2 ||  right1 < left2 || top1 > bottom2){	
				return false;
			}else{
				return true;
			}
		},
		//碰撞回调(鼠标滑动选中视图中的菜单)
		pzCallbackFn:function(obj,jsons){
			var boxDom = jsons.boxDom;
			for(var i=0;i<boxDom.length;i++){
				if(dataControl.pzFn(obj,boxDom.eq(i)) && obj!== boxDom.eq(i) ){
					//撞到时回调函数
					jsons.pzCallbacll && typeof jsons.pzCallbacll === "function" && jsons.pzCallbacll.call(boxDom.eq(i));
				}else{
					//未撞到时回调函数
					jsons.nopzCallbacll && typeof jsons.nopzCallbacll === "function" && jsons.nopzCallbacll.call(boxDom.eq(i));
				}
			}
		},
		/*新建菜单时记录创建菜单的时间*/
		getDates : function(){
			var _this = this;
			var time = new Date();
			var year = time.getFullYear();
			var mouth = time.getMonth()+1;
			var day = time.getDate();
			return _this.dataFromat(year) + '-' + _this.dataFromat(mouth) + '-' + _this.dataFromat(day);
		},//获取年月日
		getTimers : function(){
			var _this = this;
			var time = new Date();
			var hour = time.getHours();
			var miu = time.getMinutes();
			var sen = time.getSeconds();
			return _this.dataFromat(hour) + ':' + _this.dataFromat(miu) + ':' + _this.dataFromat(sen);
			
			
		},//获取时分秒
		dataFromat : function(n){
			return n>=10 ? n : "0"+n;
		},//时间补零,使每个时间元素都是双位数
		//菜单按时间排序
		sorts:function (arr,way,falg){
			if(falg){//升序
				arr.sort(function(a,b){
					return a[way] - b[way];
				});
			}else{//降序
				arr.sort(function(a,b){
					return b[way] - a[way];
				});
			}
		},
        //菜单按字母表顺序排列
        sortByLetter : function(val1,val2) {
            // 转换为拼音
            var val1Object = pinyin.getFullChars(val1.title).toLowerCase();
            var val2Object = pinyin.getFullChars(val2.title).toLowerCase();

            // 获取较长的拼音的长度
            var length =  val1Object.length > val2Object.length ? val1Object.length:val2Object.length ;

            // 依次比较字母的unicode码，相等时返回0，小于时返回-1，大于时返回1
            for(var i = 0; i < length; i++ ) {
                var differ = val1Object.charCodeAt(i) - val2Object.charCodeAt(i);
                if(differ == 0) {
                    continue;
                }else {
                    if(val1Object.charAt(i) == '_' ) {
                        return -1;
                    }
                    return differ;
                }
            }
            if(i == length) {
                return val1Object.length - val2Object.length;
            }
        }
	}
	window.dataControl = dataControl;
})();
