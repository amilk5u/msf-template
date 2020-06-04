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

    var $header = $("header"),
        $top_btn = $header.find(".top_btn");

    var $mainVisual = $("#mainVisual");
    var $fullpage = $("#fullpage");

    //view
    function ver2View() {
        if( winW >= 1440 && ($fullpage.hasClass("ver2")) ) {
            console.log("큼");
            $mainVisual.removeClass("section");
        }else if( winW <= 1440 && ($fullpage.hasClass("con_ver2")) ){
            console.log("작을때");
            $mainVisual.addClass("section");
        }else {
            console.log("모두아님");
        }
    }
    ver2View();

    // fullpage
    $fullpage.fullpage({
        autoScrolling: true,
        scrollHorizontally: true,
        anchors:['Page01', 'Page02', 'Page03', 'Page04', 'Page05', 'Page06', 'Page07', 'Page08', 'footer'],
        menu: '#myMenu',
        onLeave: function (origin, destination, direction) {
            var leavingSection = this;

            if( winW >= 1440 && ($fullpage.hasClass("ver2")) ) {
                console.log("ver2 일때 1440이상");
                if (origin === 3 && direction === 'down') {
                    counter();
                } else if (origin === 5 && direction === 'up') {
                    counter();
                }
            }else {
                console.log("ver2 아닐때");
                if (origin === 4 && direction === 'down') {
                    counter();
                } else if (origin === 6 && direction === 'up') {
                    counter();
                }
            }

            if (origin === 1) {
                $top_btn.fadeIn();
            } else if (origin === 2 && direction === 'up') {
                $top_btn.fadeOut();
            }

            if (origin === 8 && direction === 'down') {
                TweenMax.to($top_btn, .5, {bottom: 220, ease: esStep});
            } else if (origin === 9 && direction === 'up') {
                TweenMax.to($top_btn, .5, {bottom: 30, ease: esStep});
            }
        },

        afterLoad: function (origin) {
            var loadedSection = this;

            //색인 사용
            if (origin.index === 2) {
                alert("Section 3 ended loading");
            }

            if (origin.anchor === 'Page05') {
                alert("Section 2 ended loading");
                console.log("123123131");
            }
        }
    });


    var $btn_play1 = $mainVisual.find(".btn_play"),
        $play1 = $btn_play1.find(".play"),
        $stop1 = $btn_play1.find(".stop");


    //visual_slide
    var swiper_visual = new Swiper('.swiper-container.visual_slide', {
        autoplay: true,
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
    $stop1.on("click", function () {
        $(this).removeClass("active");
        $play1.addClass("active");
        // swiper_visual.autoplay.stop();
        swiper_visual[0].autoplay.stop();
        swiper_visual[1].autoplay.stop();
    });
    $play1.on("click", function () {
        $(this).removeClass("active");
        $stop1.addClass("active");
        // swiper_visual.autoplay.start();
        swiper_visual[0].autoplay.start();
        swiper_visual[1].autoplay.start();
    });



    var $videoInfo = $("#videoInfo"),
        $btn_play2 = $videoInfo.find(".btn_play"),
        $play2 = $btn_play2.find(".play"),
        $stop2 = $btn_play2.find(".stop");

    // section 2 slide
    var swiper_video = new Swiper('.swiper-container.video_slide', {
        autoplay: true,
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

    $stop2.on("click", function () {
        $(this).removeClass("active");
        $play2.addClass("active");
        swiper_video.autoplay.stop();
    });

    $play2.on("click", function () {
        $(this).removeClass("active");
        $stop2.addClass("active");
        swiper_video.autoplay.start();
    });






    // section 3 slide
    var $speed = 800;

    var $item_box = $(".item_box"),
        $item_length = $item_box.find(".length"),
        $item_counter = $item_box.find(".counter");

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
                var $length = $(".item_swiper .swiper-slide").length;

                $item_length.text($length / 3);
                $item_counter.text(this.realIndex + 1);
            },
            slideChange: function () {
                $item_counter.text(this.realIndex + 1);
            }
        }
    });


    var $warehouse = $("#warehouse"),
        $txt_bg = $warehouse.find(".txt_bg"),
        $txt_bgLI = $txt_bg.find("li"),
        $slide_txt = $warehouse.find(".slide_txt"),
        $slide_txtDiv = $slide_txt.find("div"),
        $txt_title = $warehouse.find(".txt_title"),
        $txt_titleh = $txt_title.find("h3");

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
                $txt_bgLI.eq(0).siblings().css({"left": "-100%"});
                $slide_txtDiv.eq(0).addClass("active");
                $slide_txtDiv.eq(0).siblings().css({"opacity": "0"});
                $txt_titleh.eq(0).addClass("active");
                $txt_titleh.eq(0).siblings().css({"opacity": "0"});
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


    function nextEffect(realIndex) {
        // story_box background images
        var $active = $(".txt_bg ul li");

        $active.eq(realIndex).css({left: "100%"});
        $active.eq(realIndex).addClass("active");
        $active.eq(realIndex).siblings().removeClass("active");
        TweenMax.to($active.eq(realIndex), $speed / 1000, {left: "0%", ease: Power1.easeInOut});
        TweenMax.to($active.eq(realIndex).siblings(), $speed / 1000, {left: "-100%", ease: Power1.easeInOut});
    }

    function prevEffect(realIndex) {
        // story_box background images
        var $active = $(".txt_bg ul li");

        $active.eq(realIndex).css({left: "-100%"});
        $active.eq(realIndex).addClass("active");
        $active.eq(realIndex).siblings().removeClass("active");
        TweenMax.to($active.eq(realIndex), $speed / 1000, {left: "0%"});
        TweenMax.to($active.eq(realIndex).siblings(), $speed / 1000, {left: "100%"});
    }

    function textEffect(realIndex) {
        // txt_title
        var $active_title = $(".txt_title h3"),
            $active_txt = $(".slide_txt div");

        $active_title.eq(realIndex).addClass("active");
        $active_title.eq(realIndex).siblings().removeClass("active");
        $active_txt.eq(realIndex).addClass("active");
        $active_txt.eq(realIndex).siblings().removeClass("active");
        TweenMax.to([$active_title.eq(realIndex), $active_txt.eq(realIndex)], $speed / 1000, {opacity: 1});
        TweenMax.to([$active_title.eq(realIndex).siblings(), $active_txt.eq(realIndex).siblings()], $speed / 1000, {opacity: 0});

    }


    // count
    function counter() {
        function numberCounter(target_frame, target_number) {
            this.count = 0;
            this.diff = 0;
            this.target_count = parseInt(target_number);
            this.target_frame = document.getElementById(target_frame);
            this.timer = null;
            this.counter();
        };
        numberCounter.prototype.counter = function () {
            var self = this;
            this.diff = this.target_count - this.count;

            if (this.diff > 0) {
                self.count += Math.ceil(this.diff / 5);
            }

            this.target_frame.innerHTML = this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

            if (this.count < this.target_count) {
                this.timer = setTimeout(function () {
                    self.counter();
                }, 20);
            } else {
                clearTimeout(this.timer);
            }
        };
        new numberCounter("counter3", 11218676);
        new numberCounter("counter2", 47317);
        new numberCounter("counter1", 74);
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
            0: {
                slidesPerView: 3.5,
                spaceBetween: 18
            },
            1280: {
                slidesPerView: 4.4,
                spaceBetween: 18
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