/**
 * Created by szhua on 2016/1/1.
 */
/*
var x = 50,y = 60;  //浮动广告初始位置

var xin = true, yin = true;  //xin为真向右运动，否则向左，yin为真向下 运动，否则向上运动

var step = 1;   //移动的距离

var delay = 10;  //移动的时间间隔


function floatAD() {

    var L=T=0;			//L左边界，T上边界

    var R= document.body.offsetWidth-document.getElementById("fly").offsetWidth;  //层移动的右边界


    var B = document.body.offsetHeight-document.getElementById("fly").offsetHeight; //层移动的下边界

    document.getElementById("fly").style.left = x;  //层移动后的左边界

    document.getElementById("fly").style.top = y;   //曾移动后上边界

    x = x + step*(xin?1:-1);		//判断水平方向

    if (x < L) { xin = true; x = L;}   //到达边界后的处理

    if (x > R){ xin = false; x = R;}

    y = y + step*(yin?1:-1);

    if (y < T) { yin = true; y = T;}

    if (y > B) { yin = false; y = B;}
    setTimeout("floatAD()", delay)		//隔多长时间调用一次

}
*/



$(document).ready(function () {

    var iObject=new Object();
    (function(app){
        //浮动广告初始位置
        app.floatAdX=0;
        app.floatAdY=0;
        //xin为真向右运动，否则向左，yin为真向下 运动，否则向上运动
        app.floatAdXin=true;
        app.floatAdYin=true;
        //移动的距离
        app.floatAdStep=1;
        //移动的时间间隔
        app.floatAdDelay=10;

        app.init=function(){
            app.floatAD();
            app.setListen();
            app.loadMusic();

        }
        app.loadMusic=function(){
            var x = $("#qcode")[0].offsetLeft + $("#qcode").parent()[0].offsetLeft + $("#qcode")[0].clientWidth - (-$("#qcode").css("margin-right").replace('px', ''));
            var y = $("#qcode")[0].offsetTop + $("#qcode").parent()[0].offsetTop-16 ;
            $("#music").css({"top": y + "px", "left": x + "px"});
        }
        app.floatAD=function(){
            var L = T = 0;			//L左边界，T上边界

            var R = document.body.offsetWidth - document.getElementById("fly").offsetWidth;  //层移动的右边界


            var B = document.body.offsetHeight - document.getElementById("fly").offsetHeight; //层移动的下边界

            document.getElementById("fly").style.left = app.floatAdX;  //层移动后的左边界

            document.getElementById("fly").style.top = app.floatAdY;   //曾移动后上边界

            app.floatAdX+= app.floatAdStep * (app.floatAdXin ? 1 : -1);		//判断水平方向

            if (app.floatAdX < L) {
                app.floatAdXin = true;
                app.floatAdX = L;
            }   //到达边界后的处理

            if (app.floatAdX > R) {
                app.floatAdXin = false;
                app.floatAdX = R;
            }

            app.floatAdY+= app.floatAdStep * (app.floatAdYin ? 1 : -1);

            if (app.floatAdY < T) {
                app.floatAdYin = true;
                app.floatAdY = T;
            }

            if (app.floatAdY > B) {
                app.floatAdYin = false;
                app.floatAdY = B;
            }
            window.setTimeout(app.floatAD, app.floatAdDelay)		//隔多长时间调用一次
        }
        app.setListen=function(){
            $("#sItem").scrollQ();
            $("#register").click(function () {
                window.location.href = "register.html";
            });

            $("#demo1").bxCarousel({
                display_num: 5,
                move: 1,
                auto: true,
                controls: false,
                margin: 10
            });

            $("#qcode").mouseenter(function () {
                $("#qrcode").empty();
                var url = window.location.href;
                //url = url.replace("localhost", getipdata());
                $("#qrcode").qrcode(url);
                var x = $("#qcode")[0].offsetLeft + $("#qcode").parent()[0].offsetLeft + $("#qcode")[0].clientWidth - (-$("#qcode").css("margin-right").replace('px', '')) - $("#qrcode").width();
                var y = $("#qcode")[0].offsetTop + $("#qcode").parent()[0].offsetTop + $("#qcode")[0].clientHeight;
                $("#qrcode").css({"top": y + "px", "left": x + "px"});
                $("#qrcode").css("display", "block");
            });

            $("#qcode").mouseleave(function () {
                $('#qrcode').css("display", "none");
            })
        }

        app.init();


    })(iObject)


})
