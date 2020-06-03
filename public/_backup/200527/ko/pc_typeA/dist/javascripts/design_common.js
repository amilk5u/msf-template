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


    $("#fullpage").fullpage({
        autoScrolling: true,
        scrollHorizontally: true,
        anchors: ['Page01', 'Page02', 'Page03', 'Page04', 'Page05', 'Page06', 'Page07', 'Page08', 'footer'],
        menu: '#myMenu'
    });


    //visual_slide
    var swiper_visual = new Swiper('.swiper-container.visual_slide', {
        autoplay: {
            delay: 1000,
        },
        speed: 1200,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });

    $(".donate_btn a").on("click", function () {
        swiper_visual.autoplay.stop();
    })


    var $speed = 800;

    var swiper_item = new Swiper('.swiper-container.item_swiper', {
        slidesPerView: "auto",
        navigation: {
            nextEl: '.next_btn.item_btn',
            prevEl: '.prev_btn.item_btn',
        },
        loop: true,
        speed: $speed,
        on: {
            init: function () {
                var $length = $(".item_swiper  .swiper-slide").length;
                console.log(this);
                $(".item_box .length").text($length / 3);
                $(".item_box .counter").text(this.realIndex + 1);
            },
            slideChange: function () {
                $(".item_box .counter").text(this.realIndex + 1);
            }
        }

    });

    var story_btn_target = null;
    var swiper_story = new Swiper('.swiper-container.story_swiper', {
        slidesPerView: "auto",
        navigation: {
            nextEl: '.next_btn.story_btn',
            prevEl: '.prev_btn.story_btn',
        },
        loop: true,
        speed: $speed,
        on: {
            init: function () {
                $(".txt_bg ul li").eq(0).siblings().css({"left": "-100%"});

                $(".slide_txt div").eq(0).addClass("active");
                $(".slide_txt div").eq(0).siblings().css({"opacity": "0"});
                $(".txt_title h3").eq(0).addClass("active");
                $(".txt_title h3").eq(0).siblings().css({"opacity": "0"});
            },
            slideNextTransitionStart: function () {
                nextEffect(this.realIndex);
            },
            slidePrevTransitionStart: function () {
                prevEffect(this.realIndex);
            },
            slideChange: function () {
                textEffect(this.realIndex);
            }

        }
    });
    // console.log(move);
    /* realIndex 받아서 효과 처리하기
     1. swiper aip 버튼 구분을 통해 realIndex로 슬라이드 제어 하기
     2. 택스트 효과 디졸브 realIndex통한 제어
     */
    function nextEffect(realIndex) {
        // story_box 배경
        var $active = $(".txt_bg ul li");
        $active.eq(realIndex).css({left: "100%"});
        $active.eq(realIndex).addClass("active");
        $active.eq(realIndex).siblings().removeClass("active");
        TweenMax.to($active.eq(realIndex), $speed / 1000, {left: "0%", ease: Power1.easeInOut});
        TweenMax.to($active.eq(realIndex).siblings(), $speed / 1000, {left: "-100%", ease: Power1.easeInOut});
    }

    function prevEffect(realIndex) {
        // story_box 배경
        var $active = $(".txt_bg ul li");
        $active.eq(realIndex).css({left: "-100%"});
        $active.eq(realIndex).addClass("active");
        $active.eq(realIndex).siblings().removeClass("active");
        TweenMax.to($active.eq(realIndex), $speed / 1000, {left: "0%"});
        TweenMax.to($active.eq(realIndex).siblings(), $speed / 1000, {left: "100%"});
    }

    function textEffect(realIndex) {
        // // txt_title
        var $active_title = $(".txt_title h3");
        var $active_txt = $(".slide_txt div");
        $active_title.eq(realIndex).addClass("active");
        $active_title.eq(realIndex).siblings().removeClass("active");
        $active_txt.eq(realIndex).addClass("active");
        $active_txt.eq(realIndex).siblings().removeClass("active");
        TweenMax.to([$active_title.eq(realIndex), $active_txt.eq(realIndex)], $speed / 1000, {opacity: 1});
        TweenMax.to([$active_title.eq(realIndex).siblings(), $active_txt.eq(realIndex).siblings()], $speed / 1000, {opacity: 0});

    }


    // campaigns_slide
    var swiper = new Swiper('.swiper-container.campaigns_slide', {
        slidesPerView: 5,
        spaceBetween: 10,
        pagination: {
            clickable: true,
        },
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 1280px
            1280: {
                slidesPerView: 4.8,
                spaceBetween: 20
            },
            // when window width is >= 1440px
            1440: {
                slidesPerView: 4.65,
                spaceBetween: 17
            },
            // when window width is >= 1600px
            1600: {
                slidesPerView: 5.15,
                spaceBetween: 17
            },
            // when window width is >= 1920px
            1920: {
                slidesPerView: 5.15,
                spaceBetween: 20
            },
        }
    });


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