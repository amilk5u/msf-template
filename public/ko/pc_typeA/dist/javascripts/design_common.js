"use strict";
var winW;
var winH;
var esStep = "Expo.ease";
var $window = $(window);
var winSc;
var $html = $("html");
var htmlH;
var _compareBoxW;
var $header = $("#header");
var $alignMonitor = $(".monitor_compare .compare_box, .monitor_compare .lcd_screen .img_wrap");

$window.load(function () {
    htmlH = $("body").outerHeight(true);
    winSc = $(this).scrollTop();
    _compareBoxW = $(".monitor_compare .compare_box").width();
    $alignMonitor.css({"background-position-x" :  -(1462 - _compareBoxW) / 2});
    $window.on("resize", function () {
        winW = $(this).width();
        winH = $(this).height();
        _compareBoxW = $(".monitor_compare .compare_box").width();
        $alignMonitor.css({"background-position-x" :  -(1462 - _compareBoxW) / 2});
    });
    $(this).trigger("resize");
    $(window).scroll(function () {
        winSc = $(this).scrollTop();
    });

    main();
    layout();
    scrollEvent();
    cinemaJS();
    gamingJS();
    lifeJS();
    lineUpJS();
});
function layout() {
    var $allNav = $("#allNav");
    var $gnbNav = $allNav.find("nav");
    var $allMenuBtn = $("#allMenuBtn");
    var $navDimmed = $("#navDimmed");

    //nav btn open
    $allMenuBtn.click(function () {
        var _this = $(this);
        if(!$allNav.hasClass("nav_open")){
            $html.addClass("no_scroll");
            $allNav.addClass("nav_open");
            TweenMax.to($navDimmed, .3, {display:"block", opacity:.6});
            TweenMax.to($gnbNav, .3, {x:"0%", ease:esStep});
        } else {
            allNavClose();
        }
    });
    $navDimmed.click(function () {
        allNavClose();
    });
    function allNavClose(){
        $html.removeClass("no_scroll");
        $allNav.removeClass("nav_open");
        TweenMax.to($navDimmed, .3, {display:"none", opacity:0});
        TweenMax.to($gnbNav, .3, {x:"-100%", ease:esStep});
    }

    //cookie
    var $cookieAll = $("#cookieAllPc"),
        $cookieTop = $cookieAll.find(".cookie_top"),
        $cookieBottom = $cookieAll.find(".cookie_bottom"),
        $cookieAllAgree = $cookieAll.find("#allAgreeBtn"),
        $cookieDetailOpen = $cookieAll.find("#detailOpenBtn"),
        $cookieChangeWrap = $cookieAll.find(".change_wrap"),
        $cookieChangeBtn = $cookieAll.find("#cookieChange");
    var $cookieClose = $cookieAll.find("#cookieClose");
    var $cookieSave = $cookieAll.find("#cookieSave");

    var $functionalAgree = document.getElementById("functionalAgree"),
        $socialAgree = document.getElementById("socialAgree"),
        $analysisAgree = document.getElementById("analysisAgree"),
        $advertisingAgree = document.getElementById("advertisingAgree");
    $cookieChangeBtn.click(function () {
        $cookieTop.css({display:"block"});
        TweenMax.to($cookieChangeWrap, .3, {height:0});
        TweenMax.to($cookieAll, .5, {height:110});
    });

    //SAVE PREFERENCES 버튼 클릭시
    $cookieDetailOpen.click(function () {
        var _this = $(this);
        if(!_this.hasClass("active")){
            _this.addClass("active");
            $cookieBottom.css({display:"block"});
            TweenMax.to($cookieAll, .5, {height:410});
        } else {
            _this.removeClass("active");
            $cookieBottom.css({display:"none"});
            TweenMax.to($cookieAll, .5, {height:110});
        }
    });

    $cookieClose.click(function () {
        $cookieBottom.css({display:"none"});
        $cookieTop.css({display:"none"});
        $cookieDetailOpen.removeClass("active");
        TweenMax.to($cookieAll, .3, {height:50});
        TweenMax.to($cookieChangeWrap, .5, {height:50});
    });

    $cookieAllAgree.click(function(){
        if(!$cookieAll.find(".cookie_bottom ol input[type=checkbox]").is(":checked")){
            $cookieAll.find(".cookie_bottom ol input[type=checkbox]").attr("checked", true);
        } else {
            $cookieAll.find(".cookie_bottom ol input[type=checkbox]").attr("checked", false);
        }
    });

    $cookieSave.click(function(){
        if($functionalAgree.checked === true){
            setCookie("functionalCookie", "Y", 365);
        } else {
            setCookie("functionalCookie", "N", 365);
        }
        if($socialAgree.checked === true){
            setCookie("socialCookie", "Y", 365);
        } else {
            setCookie("socialCookie", "N", 365);
        }
        if($analysisAgree.checked === true){
            setCookie("analysisCookie", "Y", 365);
        } else {
            setCookie("analysisCookie", "N", 365);
        }
        if($advertisingAgree.checked === true){
            setCookie("advertisingCookie", "Y", 365);
        } else {
            setCookie("advertisingCookie", "N", 365);
        }
        window.location.reload();
    });
    if(getCookie("functionalCookie") === "Y"){
        $functionalAgree.checked = true;
    }
    if(getCookie("socialCookie") === "Y"){
        $socialAgree.checked = true;
    }
    if(getCookie("analysisCookie") === "Y"){
        $analysisAgree.checked = true;
    }
    if(getCookie("advertisingCookie") === "Y"){
        $advertisingAgree.checked = true;
    }
}
var swiper = new Swiper('.swiper-container.slide03', {
    slidesPerView: 4,
    spaceBetween: 30,
    centeredSlides: true,
    pagination: {
        clickable: true,
    },
});




function scrollEvent() {
    var $subVisual = $("#subVisual");
    $(window).scroll(function () {
        $(".pall_bg").each(function () {
            var offset = $(this).offset();
            var offsetTop = offset.top;
            var _this_h = $(this).innerHeight();
            var _bg_p = (winSc - offsetTop) / _this_h * 100;
            $(this).css({"background-position-y": -_bg_p.toFixed(2) / 2 + "%"});
        });
        if (winSc < 820) {
            $subVisual.css({"background-position-y": winSc / 3});
        }
        headerFix();
    });

    function headerFix() {
        if (winSc > 0) {
            $header.addClass("fixed");
        } else {
            $header.removeClass("fixed");
        }
    }
    headerFix();

    var _containerTop = null;
    var $discoverBtn = $("#discoverBtn");
    $discoverBtn.click(function () {
        _containerTop = $("#container").offset().top - 70;
        TweenMax.to($("html"), .5, {scrollTop: _containerTop, ease: esStep});
    });

    var $jsScrSec = $(".js-scr-sec");
    var scrInnerStep = [];
    if (!$jsScrSec.length) return false;

    function scrollEvent() {
        $window.scroll(function () {
            scrollMotion(winSc);
        });
        $jsScrSec.each(function () {
            var _this = $(this);
            var secTop = _this.offset().top;
            var secInner = secTop - (winH / 2) - 250;
            scrInnerStep.push([_this, secInner]);
        });

        function scrollMotion(_winSc) {
            $.each(scrInnerStep, function (i, v) {
                if (_winSc >= v[1]) {
                    if (v[0].motion === undefined) {
                        TweenMax.staggerTo(v[0].find(".js-scr-box"), .8, {
                            y: 0, opacity: 1, ease: esStep
                        }, .2);
                        v[0].motion = true;
                    }
                    v[0].addClass("js-motion-end");
                }
            });
        }

        scrollMotion(winSc);
    }
    scrollEvent();
}