/**
 * Created by lirui on 2017/6/20.
 */
function page(opt){

    if(!opt.id){return false};

    var obj = document.getElementById(opt.id);
    obj.innerHTML = '';
    var nowNum = opt.nowNum || 1;
    var allNum = opt.allNum || 5;
    var totalNum = opt.totalNum || 5;
    var callBack = opt.callBack || function(){};

    callBack(nowNum,allNum);

    if(allNum>totalNum){
        if(nowNum>=2&&totalNum>=2){
            var oA = document.createElement('a');
            oA.href = '#' + (nowNum - 1);
            oA.innerHTML = '<<';
            var oLi = document.createElement('li');
            oLi.appendChild(oA);
            obj.appendChild(oLi);
        }

        for(var i=1;i<=Math.ceil(totalNum/6);i++){
            var oA = document.createElement('a');


            if(nowNum == 1 || nowNum == 2){

                oA.href = '#' + i;
                if(nowNum == i){
                    oA.innerHTML = i;
                }
                else{
                    oA.innerHTML = '['+ i +']';
                }

            }
            else if( (allNum - nowNum) == 0 || (allNum - nowNum) == 1 ){

                oA.href = '#' + (allNum - 5 + i);

                if((allNum - nowNum) == 0 && i==5){
                    oA.innerHTML = (allNum - 5 + i);
                }
                else if((allNum - nowNum) == 1 && i==4){
                    oA.innerHTML = (allNum - 5 + i);
                }
                else{
                    oA.innerHTML = '['+ (allNum - 5 + i) +']';
                }

            }
            else{
                oA.href = '#' + (nowNum - 3 + i);

                if(i==3){
                    oA.innerHTML = (nowNum - 3 + i);
                }
                else{
                    oA.innerHTML = '['+ (nowNum - 3 + i) +']';
                }
            }
            var oLi = document.createElement('li');
            oLi.appendChild(oA);
            obj.appendChild(oLi);

        }

        /*生成下一页*/
        if(nowNum<Math.ceil(totalNum/6)){
            var oA = document.createElement('a');
            oA.href = '#' + (nowNum + 1);
            oA.innerHTML = '>>';
            var oLi = document.createElement('li');
            oLi.appendChild(oA);
            obj.appendChild(oLi);
        }

        $("#pagingidReptile").parent().css({
            "width": 320,
            "margin-left": -115
        });
    }
    else{
        if(nowNum>=2){
            var oA = document.createElement('a');
            oA.href = '#' + (nowNum - 1);
            oA.innerHTML = '<<';
            var oLi = document.createElement('li');
            oLi.appendChild(oA);
            obj.appendChild(oLi);
        }

        for(var i=1;i<=allNum;i++){
            var oA = document.createElement('a');


            if(nowNum == 1 || nowNum == 2){

                oA.href = '#' + i;
                if(nowNum == i){
                    oA.innerHTML = i;
                }
                else{
                    oA.innerHTML = '['+ i +']';
                }

            }
            else if( (allNum - nowNum) == 0 || (allNum - nowNum) == 1 ){

                oA.href = '#' + (allNum - 5 + i);

                if((allNum - nowNum) == 0 && i==5){
                    oA.innerHTML = (allNum - 5 + i);
                }
                else if((allNum - nowNum) == 1 && i==4){
                    oA.innerHTML = (allNum - 5 + i);
                }
                else{
                    oA.innerHTML = '['+ (allNum - 5 + i) +']';
                }

            }
            else{
                oA.href = '#' + (nowNum - 3 + i);

                if(i==3){
                    oA.innerHTML = (nowNum - 3 + i);
                }
                else{
                    oA.innerHTML = '['+ (nowNum - 3 + i) +']';
                }
            }
            var oLi = document.createElement('li');
            oLi.appendChild(oA);
            obj.appendChild(oLi);

        }

        /*生成下一页*/
        if(nowNum<totalNum){
            var oA = document.createElement('a');
            oA.href = '#' + (nowNum + 1);
            oA.innerHTML = '>>';
            var oLi = document.createElement('li');
            oLi.appendChild(oA);
            obj.appendChild(oLi);
        }

        var PageWidth=($("#pagingidReptile").find("li").eq(6).find("a").width())*8;
        $("#pagingidReptile").parent().css({
            "width": PageWidth,
            "margin-left": -PageWidth/2
        });
    }

    var aA = obj.getElementsByTagName('a');

    for(var i=0;i<aA.length;i++){
        aA[i].onclick = function(){
            var nowNum = parseInt(this.getAttribute('href').substring(1));
            page({
                id : opt.id,
                nowNum : nowNum,
                allNum : allNum,
                totalNum:totalNum,
                callBack : callBack
            });
            return false;
        };
    }

}//渲染分页列表