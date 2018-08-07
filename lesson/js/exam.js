/**
 * Created by szhua on 2016/1/3.
 */
$(document).ready(function(){

    var exam=new Object();
    (function(app){
        app.q=new Array("4", "3", "1", "4", "3", "4", "4", "4", "1", "2");
        app.t=new Array("alt", "编码", "像素", "source", "蓝");
        app.w=new Array();
        app.score = 0;
        app.init=function(){

            $("#city").citySelect({
                url:"js/city.min.js",
                prov:"浙江", //省份
                city:"温州", //城市
                dist:"瓯海区", //区县
                nodata:"none" //当子集无数据时，隐藏select
            });

            $("#site").citySelect({
                url:{"citylist":[
                    {"p":"工商管理系","c":[{"n":"善学楼101"},{"n":"善学楼201"},{"n":"善学楼301"}]},
                    {"p":"信息技术系","c":[{"n":"好学楼101"},{"n":"好学楼201"},{"n":"好学楼301"}]},
                    {"p":"财会系","c":[{"n":"重学楼101"},{"n":"重学楼201"},{"n":"重学楼301"}]},
                ]},
                prov:"信息技术系",
                city:"好学楼101",
                dist:"",
                nodata:"none"
            });

            $("#complete").click(function () {
                app.score=0;
                for (var i = 0; i < app.q.length; i++) {
                    var answer=app.check_black("q"+(i+1));
                    if(answer==app.q[i]){
                        app.score+=8;
                    }
                }

                for(var i=0;i< app.t.length;i++){
                    var answer=$("#t"+(1+i)).val();
                    if(answer==app.t[i]){
                        app.score+=2;
                    }
                }

                for(var i=0;i< app.w.length;i++){
                    var answer=$("#w"+(1+i)).val();
                    if(answer==app.w[i]){
                        app.score+=10;
                    }
                }
                app.showResult();
                swal("你的成绩是：", ""+app.score);
            })

            $("#page_type").change(function(){
                if($(this)[0].value=="A"){
                    $("#page_type_B").css("display","none");
                    $("#page_type_A").css("display","inline");
                    app.w[0]="几乎所有的浏览器Safari，Chrome，Firefox，Opera，IE都支持HTML5";
                }else if($(this)[0].value=="B"){
                    $("#page_type_B").css("display","inline");
                    $("#page_type_A").css("display","none");
                    app.w[0]="Canvas 元素用于在网页上绘制图形";
                }else{
                    $("#page_type_B").css("display","none");
                    $("#page_type_A").css("display","none");
                }
            })
        }
        app.check_black=function(checkbox_name){
            var blackName = document.getElementsByName(checkbox_name);

            for (var i = 0; i < blackName.length; i++) {
                if (blackName[i].checked == true) {
                    var a = blackName[i].value;
                    return a;
                }
            }
            return "";
        }
        app.check_right=function(checkbox_name,index){
            var cb=document.getElementsByName(checkbox_name);

            for(var i=0;i<cb.length;i++){
                if(i==(index-1)){
                    cb[i].checked=true;
                }else{
                    cb[i].checked=false;
                }
            }
        }
        app.showResult=function(){
            for(var i=0;i<app.q.length;i++){
                app.check_right("q"+(i+1),app.q[i]);
            }
            for(var i=0;i<app.t.length;i++){
                $("#t"+(1+i)).val(app.t[i]);
            }
            for(var i=0;i<app.w.length;i++){
                $("#w"+(1+i)).val(app.w[i]);
            }
        }
        app.init();
    })(exam)
})


