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
}
function main() {

    var $container = $("#container");
    var $slideSection = $container.find("#slideSection");

    var $slide01 = $slideSection.find(".slide01");
    var $slide02 = $slideSection.find(".slide02");
    var $slide03 = $slideSection.find(".slide03");

    var $slide02_cont = $slide02.find(".slide_container");
    var $slide02Li = $slide02_cont.find("li");

    var swiper = new Swiper('.swiper-container.slide03', {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: true,
        pagination: {
            clickable: true,
        },
    });




    /*
    *  1. li 중 1번(0번)을 클릭시 index 0을 뱉어 낸다.
    *  2. li 중
    *
    *
    */

    function test() {

        var _this = $(this);
        var _index = _this.index();

        $slide02Li.on("click",function(){

            console.log(_this);
        });


    }
    test();



}
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