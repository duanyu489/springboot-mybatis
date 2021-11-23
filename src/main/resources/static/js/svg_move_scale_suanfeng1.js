var num1 = 1;
var num2 = 1;
var xx = 0;
var yy = 0;
function load (){

    num1 = num1+0.1;
    num2 = num2+0.1;
    $("g:first").attr("transform","matrix("+ num1 +",0,0,"+ num2 +","+ xx +","+ yy +")");


    document.getElementById("inp").addEventListener('touchstart',touch, false);
    document.getElementById("inp").addEventListener('touchmove',touch, false);
    document.getElementById("inp").addEventListener('touchend',touch, false);


    try{
        document.getElementById("inp").addEventListener(mousewheel,touch, false);

    }catch(err){
        document.getElementById("inp").onmousewheel=touch;
    }



    var spot1 = null;
    var spot2 = null;
    var x0 = 0;
    var y0 = 0;

    function touch (event){
        var event = event || window.event;

        var oInp = document.getElementById("inp");
        //鼠标滚轮事件
        var isFirefox = navigator.userAgent.indexOf("Firefox") != -1;
        //Firefox事件：DOMMouseScroll、IE/Opera/Chrome事件：mousewheel
        var mousewheel = isFirefox ? "DOMMouseScroll" : "mousewheel";





        switch(event.type){


            case "mousewheel":
            case "DOMMouseScroll":
                if (event.stopPropagation) event.stopPropagation();
                else event.cancelBubble = true;
                if (event.preventDefault) event.preventDefault();
                else event.returnValue = false;

                if(isFirefox){
                    if (event.detail == -3) {
                        // 向上滚动
                        console.log("ff wheel up");
                    } else {
                        // 向下滚动
                        console.log("ff wheel down");
                    }
                }else{
                    if (event.wheelDelta > 0) {
                        // 向上滚动
                        console.log(event.wheelDelta);
                        console.log("wheel up");
                        num1 = num1+0.1;
                        num2 = num2+0.1;
//	                    	$("g:first").attr("transform","scale("+num1+","+num2+")");
                        $("g:first").attr("transform","matrix("+ num1 +",0,0,"+ num2 +","+ xx +","+ yy +")");
                    } else {
                        // 向下滚动
                        console.log(event.wheelDelta);
                        console.log("wheel down");
                        if(num1>0.5){
                            num1 = num1-0.1;
                            num2 = num2-0.1;
                        }
//	                    	$("g:first").attr("transform","scale("+num1+","+num2+")");
                        $("g:first").attr("transform","matrix("+ num1 +",0,0,"+ num2 +","+ xx +","+ yy +")");

                    }
                }
                break;



            case "touchstart":
                //oInp.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
                if (event.touches && event.touches.length > 1) {

                    var x1 = event.touches[0].clientX;
                    var x2 = event.touches[1].clientX;
                    var y1 = event.touches[0].clientY;
                    var y2 = event.touches[1].clientY;

                    var calX = x2 - x1;
                    var calY = y2 - y1;

                    spot1 = Math.pow((calX *calX + calY * calY), 0.5);
                } else {

//		                	alert("x1:" + event.touches[0].clientX);
                    x0 = event.touches[0].clientX;
                    y0 = event.touches[0].clientY;
                }
                break;
            case "touchend":

                if (event.touches && event.touches.length > 1) {

                    var x1 = event.changedTouches[0].clientX;
                    var y1 = event.changedTouches[0].clientY;
                    var x2 = event.changedTouches[1].clientX;
                    var y2 = event.changedTouches[1].clientY;

                } else {
                    var x = (event.changedTouches[0].clientX - x0)/8;
                    var y = (event.changedTouches[0].clientY - y0)/8;

                    xx = xx + x;
                    yy = yy + y;

                    $("g:first").attr("transform","matrix("+ num1 +",0,0,"+ num2 +","+ xx +","+ yy +")");
                }
                break;
            case "touchmove":
                event.preventDefault();
                //oInp.innerHTML = "<br>Touch moved (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";

                if (event.touches && event.touches.length > 1) {

                    var x1 = event.touches[0].clientX;
                    var x2 = event.touches[1].clientX;
                    var y1 = event.touches[0].clientY;
                    var y2 = event.touches[1].clientY;

                    var calX = x2 - x1;
                    var calY = y2 - y1;

                    spot2 = Math.pow((calX *calX + calY * calY), 0.5);

                    var len = spot2/10000;
//		                	alert(len);

                    if (spot2 > spot1) { // 两指头放大

                        //$("g:first").attr("transform","scale("+ num1 +","+ num2 +")");
                        $("g:first").attr("transform","matrix("+ num1 +",0,0,"+ num2 +","+ xx +","+ yy +")");
                        num1 = num1 + len;
                        num2 = num2 + len;
                    } else {

                        if (num1 == 0.1 || num2 == 0.1) {

                            $("g:first").attr("transform","scale(0.1,0.1)");
                        } else {

                            //$("g:first").attr("transform","scale("+ num1 +","+ num2 +")");
                            $("g:first").attr("transform","matrix("+ num1 +",0,0,"+ num2 +","+ xx +","+ yy +")");
                            num1 = num1 - len;
                            num2 = num2 - len;
                        }
                    }
                } else if (event.touches && event.touches.length == 1) {

                    var x = (event.touches[0].clientX - x0)/5;
                    var y = (event.touches[0].clientY - y0)/5;

                    xx = xx + x;
                    yy = yy + y;

                    $("g:first").attr("transform","matrix("+ num1 +",0,0,"+ num2 +","+ xx +","+ yy +")");
                }
                break;
        }

    }
}
window.addEventListener('load',load, false);




window.onload=function()
{

    var oDiv=document.getElementById('inp');
    var disX=0;
    var disY=0;
    oDiv.onmousedown=function(ev) //鼠标按下DIV
    {
        var oEvent=ev||event;
        disX=oEvent.clientX;//-oDiv.offsetLeft; //鼠标的X坐标减去DIV的左边距就等于disX, 这个disXs是用于确定鼠标移动DIV时鼠标点和DIV之间的左面距离，这个距离是不会变的，通过这个新鼠标的X坐标减去disX就是DIV的Left
        disY=oEvent.clientY;//-oDiv.offsetTop; //鼠标的Y坐标减去DIV的左边距就等于disY, 这个disY是用于确定鼠标移动DIV时鼠标点和DIV之间的上面距离，这个距离是不会变的，通过这个新鼠标的Y坐标减去disY就是DIV的Top

        document.onmousemove=function(ev) //为了防止鼠标移动太快而离开了DIV产生了bug，所以要给整个页面加onmousemove事件
        {
            var oEvent=ev||event;
//		      var oLeft=oEvent.clientX-disX; //新鼠标X坐标减去disX,也就是鼠标移动DIV后的Left
//		      var oTop=oEvent.clientY-disY; //新鼠标Y坐标减去disY,也就是鼠标移动DIV后的Top
//		      if(oLeft<0) //当DIV的Left小于0，也就是移出左边
//		      {
//		        oLeft=0; //就把DIV的Left设置为0，就不能移出左边
//		      }
//		      else if(oLeft>document.documentElement.clientWidth-oDiv.offsetWidth) //屏幕宽度减去DIV的宽度就得出了DIV到达最右边的宽度，如果Left大于这个像素
//		      {
//		        oLeft=document.documentElement.clientWidth-oDiv.offsetWidth; //就把Left设置为这个像素
//		      }
//		      if(oTop<0) //当DIV的To小于0，也就是移出左边
//		      {
//		        oTop=0; //就把DIV的Top设置为0，就不能移出上边
//		      }
//		      else if(oTop>document.documentElement.clientHeight-oDiv.offsetHeight) //屏幕高度减去DIV的高度就得出了DIV到达最下面边的像素，如果Top大于这个像素
//		      {
//		        oTop=document.documentElement.clientHeight-oDiv.offsetHeight; //就把Top设置为这个像素
//		      }
//		      oDiv.style.left=oLeft+'px'; //DIV的Left设置为新鼠标X坐标减去disX的值
//		      oDiv.style.top=oTop+'px'; //DIV的Top设置为新鼠标Y坐标减去disY的值

            var x = (oEvent.clientX - disX)/5;
            var y = (oEvent.clientY - disY)/5;

            xx = xx + x;
            yy = yy + y;

            $("g:first").attr("transform","matrix("+ num1 +",0,0,"+ num2 +","+ xx +","+ yy +")");





        };
        document.onmouseup=function() //鼠标松开时
        {
            document.onmousemove=null; //把鼠标移动清楚
            document.onmouseup=null; //把鼠标松开清楚

        };
        return false; //阻止FireFox的默认事件 bug
    };
};










