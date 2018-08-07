
jQuery(document).ready(function() {

    var reg = new Object();
    (function (app) {

        app.rule1 = new RegExp("^(?![^0-9]+$)(?![^a-zA-Z]+$).+$");
        app.rule2 = new RegExp("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$");

        // Intial Border Position
        app.activePos = $('.tabs-header .active').position();
        // Intial Tab Height
        app.tabHeight = $('.tab.active').height();
        // Tab Items
        app.tabItems = $('.tabs-header ul li');
        // Tab Current Item
        app.tabCurrentItem = app.tabItems.filter('.active');

        app.changePos = function () {
            // Update Position
            app.activePos = $('.tabs-header .active').position();
            // Change Position & Width
            $('.border').stop().css({
                left: app.activePos.left,
                width: $('.tabs-header .active').width()
            });
        }

        app.animateTabHeight = function () {
            // Update Tab Height
            app.tabHeight = $('.tab.active').height();
            // Animate Height
            $('.tabs-content').stop().css({
                height: app.tabHeight + 'px'
            });
        }

        // Change Tab
        app.changeTab = function () {
            var getTabId = $('.tabs-header .active a').attr('tab-id');
            // Remove Active State
            $('.tab').stop().fadeOut(300, function () {
                // Remove Class
                $(this).removeClass('active');
            }).hide();

            $('.tab[tab-id=' + getTabId + ']').stop().fadeIn(300, function () {
                // Add Class
                $(this).addClass('active');

                // Animate Height
                app.animateTabHeight();
            });
        }

        app.setListen = function () {

            $('#register').submit(function () {

                if($("#is_agree_protocol")[0].checked==false){
                    return false;
                }
                var username = $(this).find('.username').val();
                var password = $(this).find('.password').val();
                var confirmPsw = $(this).find('.confirmPsw').val();
                var email = $(this).find('.email').val();
                if (username == '' || username.length < 6 || username.length > 12) {
                    $(this).find('.error').fadeOut('fast', function () {
                        $(this).css('top', '27px');
                    });
                    $(this).find('.error').fadeIn('fast', function () {
                        $(this).parent().find('.username').focus();
                    });
                    return false;
                }
                if (password == '' || !app.rule1.test(password)) {
                    $(this).find('.error').fadeOut('fast', function () {
                        $(this).css('top', '96px');
                    });
                    $(this).find('.error').fadeIn('fast', function () {
                        $(this).parent().find('.password').focus();
                    });
                    return false;
                }
                if (confirmPsw == '' || confirmPsw != password) {
                    if (confirmPsw != undefined) {
                        $(this).find('.error').fadeOut('fast', function () {
                            $(this).css('top', '165px');
                        });
                        $(this).find('.error').fadeIn('fast', function () {
                            $(this).parent().find('.confirmPsw').focus();
                        });
                        return false;
                    }
                }
                //var reg2=new RegExp("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$");
                if (email == "" || !app.rule2.test(email)) {
                    if (email != undefined) {
                        $(this).find('.error').fadeOut('fast', function () {
                            $(this).css('top', '234px');
                        });
                        $(this).find('.error').fadeIn('fast', function () {
                            $(this).parent().find('.email').focus();
                        });
                        return false;
                    }
                }
                localStorage.setItem($(".username").val(),$(".password").val());
                $("#login_href").click();


               // alert("dsfsdsfg");
                return false;
            });

            $("#login").submit(function(){
                var username = $(this).find('.username').val();
                var password = $(this).find('.password').val();
                if(localStorage.getItem(username)==password){
                    window.location.href="index.html";
                }else{

                }
                return false;
            });

            $('.page-container form .username, .page-container form .password').keyup(function () {
                $(this).parent().find('.error').fadeOut('fast');
            });

            // Tabs
            $('.tabs-header a,#protocol_a,#btn_sure').on('click', function (e) {
                e.preventDefault();

                // Tab Id
                var tabId = $(this).attr('tab-id');
                // Remove Active State
                $('.tabs-header a').stop().parent().removeClass('active');
                // Add Active State
                $(this).stop().parent().addClass('active');
                if ($(this)[0].id != "protocol_a" && $(this)[0].id != "btn_sure") {
                    app.changePos();
                }
                // Update Current Itm
                app.tabCurrentItem = app.tabItems.filter('.active');
                // Remove Active State
                $('.tab').stop().fadeOut(300, function () {
                    // Remove Class
                    $(this).removeClass('active');
                }).hide();
                // Add Active State
                $('.tab[tab-id="' + tabId + '"]').stop().fadeIn(300, function () {
                    // Add Class
                    $(this).addClass('active');
                    // Animate Height
                    app.animateTabHeight();
                });
            });

            // Next Button
            $('#next').on('click', function (e) {
                e.preventDefault();
                var nextItem = app.tabCurrentItem.next();
                app.tabCurrentItem.removeClass('active');
                if (nextItem.length) {
                    app.tabCurrentItem = nextItem.addClass('active');
                } else {
                    app.tabCurrentItem = tabItems.first().addClass('active');
                }
                app.changePos();
                app.changeTab();
            });

            // Prev Button
            $('#prev').on('click', function (e) {
                e.preventDefault();
                var prevItem = app.tabCurrentItem.prev();
                app.tabCurrentItem.removeClass('active');
                if (prevItem.length) {
                    app.tabCurrentItem = prevItem.addClass('active');
                } else {
                    app.tabCurrentItem = tabItems.last().addClass('active');
                }
                app.changePos();
                app.changeTab();
            });

            // Ripple
            $('[ripple]').on('click', function (e) {
                var rippleDiv = $('<div class="ripple" />'),
                    rippleOffset = $(this).offset(),
                    rippleY = e.pageY - rippleOffset.top,
                    rippleX = e.pageX - rippleOffset.left,
                    ripple = $('.ripple');

                rippleDiv.css({
                    top: rippleY - (ripple.height() / 2),
                    left: rippleX - (ripple.width() / 2),
                    background: $(this).attr("ripple-color")
                }).appendTo($(this));

                window.setTimeout(function () {
                    rippleDiv.remove();
                }, 1500);
            });

            $("#is_agree_protocol").click(function () {
                if ($(this)[0].checked) {
                    $(".btn_ok").css("background", "#2196f3");
                    $(".btn_ok").css("border", "1px solid #2196f3");
                } else {
                    $(".btn_ok").css("background", "#ef4300");
                    $(".btn_ok").css("border", "1px solid #ff730e");
                }
            })

        }

        app.init=function(){
            app.changePos();
            app.animateTabHeight();
            app.setListen();
        }

        app.init();
    })(reg)




    /*var reg1 = new RegExp("^(?![^0-9]+$)(?![^a-zA-Z]+$).+$");

    $('.page-container form').submit(function(){

        var username = $(this).find('.username').val();
        var password = $(this).find('.password').val();
        var confirmPsw = $(this).find('.confirmPsw').val();
        var email = $(this).find('.email').val();
        if(username == ''||username.length<6||username.length>12) {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '27px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.username').focus();
            });
            return false;
        }
        if(password == ''||!reg1.test(password)) {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '96px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.password').focus();
            });
            return false;
        }
        if(confirmPsw==''||confirmPsw!=password){
            if(confirmPsw!=undefined){
                $(this).find('.error').fadeOut('fast', function(){
                    $(this).css('top', '165px');
                });
                $(this).find('.error').fadeIn('fast', function(){
                    $(this).parent().find('.confirmPsw').focus();
                });
                return false;
            }
        }
        var reg2=new RegExp("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$");
        if(email==""||!reg2.test(email)){
            if(email!=undefined){
                $(this).find('.error').fadeOut('fast', function(){
                    $(this).css('top', '234px');
                });
                $(this).find('.error').fadeIn('fast', function(){
                    $(this).parent().find('.email').focus();
                });
                return false;
            }
        }
    });

    $('.page-container form .username, .page-container form .password').keyup(function(){
        $(this).parent().find('.error').fadeOut('fast');
    });*/


   /* // Intial Border Position
    var activePos = $('.tabs-header .active').position();
    // Change Position
    function changePos() {
        // Update Position
        activePos = $('.tabs-header .active').position();
        // Change Position & Width
        $('.border').stop().css({
            left: activePos.left,
            width: $('.tabs-header .active').width()
        });
    }
    changePos();
    // Intial Tab Height
    var tabHeight = $('.tab.active').height();
    // Animate Tab Height
    function animateTabHeight() {
        // Update Tab Height
        tabHeight = $('.tab.active').height();
        // Animate Height
        $('.tabs-content').stop().css({
            height: tabHeight + 'px'
        });
    }
    animateTabHeight();

    // Change Tab
    function changeTab() {
        var getTabId = $('.tabs-header .active a').attr('tab-id');
        // Remove Active State
        $('.tab').stop().fadeOut(300, function () {
            // Remove Class
            $(this).removeClass('active');
        }).hide();

        $('.tab[tab-id=' + getTabId + ']').stop().fadeIn(300, function () {
            // Add Class
            $(this).addClass('active');

            // Animate Height
            animateTabHeight();
        });
    }

    // Tabs
    $('.tabs-header a,#protocol_a,#btn_sure').on('click', function (e) {
        e.preventDefault();

        // Tab Id
        var tabId = $(this).attr('tab-id');
        // Remove Active State
        $('.tabs-header a').stop().parent().removeClass('active');
        // Add Active State
        $(this).stop().parent().addClass('active');
        if($(this)[0].id!="protocol_a"&&$(this)[0].id!="btn_sure"){
            changePos();
        }
        // Update Current Itm
        tabCurrentItem = tabItems.filter('.active');
        // Remove Active State
        $('.tab').stop().fadeOut(300, function () {
            // Remove Class
            $(this).removeClass('active');
        }).hide();
        // Add Active State
        $('.tab[tab-id="' + tabId + '"]').stop().fadeIn(300, function () {
            // Add Class
            $(this).addClass('active');
            // Animate Height
            animateTabHeight();
        });
    });

    // Tab Items
    var tabItems = $('.tabs-header ul li');
    // Tab Current Item
    var tabCurrentItem = tabItems.filter('.active');
    // Next Button
    $('#next').on('click', function (e) {
        e.preventDefault();
        var nextItem = tabCurrentItem.next();
        tabCurrentItem.removeClass('active');
        if (nextItem.length) {
            tabCurrentItem = nextItem.addClass('active');
        } else {
            tabCurrentItem = tabItems.first().addClass('active');
        }
        changePos();
        changeTab();
    });

    // Prev Button
    $('#prev').on('click', function (e) {
        e.preventDefault();
        var prevItem = tabCurrentItem.prev();
        tabCurrentItem.removeClass('active');
        if (prevItem.length) {
            tabCurrentItem = prevItem.addClass('active');
        } else {
            tabCurrentItem = tabItems.last().addClass('active');
        }
        changePos();
        changeTab();
    });

    // Ripple
    $('[ripple]').on('click', function (e) {
        var rippleDiv = $('<div class="ripple" />'),
            rippleOffset = $(this).offset(),
            rippleY = e.pageY - rippleOffset.top,
            rippleX = e.pageX - rippleOffset.left,
            ripple = $('.ripple');

        rippleDiv.css({
            top: rippleY - (ripple.height() / 2),
            left: rippleX - (ripple.width() / 2),
            background: $(this).attr("ripple-color")
        }).appendTo($(this));

        window.setTimeout(function () {
            rippleDiv.remove();
        }, 1500);
    });

    $("#is_agree_protocol").click(function(){
        if($(this)[0].checked){
            $(".btn_ok").css("background","#2196f3");
            $(".btn_ok").css("border","1px solid #2196f3");
        }else{
            $(".btn_ok").css("background","#ef4300");
            $(".btn_ok").css("border","1px solid #ff730e");
        }
    })*/
});
