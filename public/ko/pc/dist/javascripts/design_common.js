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
    oscheck();
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

    var $Menu = $("#myMenu"),
        $MenuLi = $Menu.find("li");

    $top_btn.on("click",function(){
        $(this).fadeOut();
    });

    //view
    function ver2View() {
        if( winW >= 1440 && ($fullpage.hasClass("ver2")) ) {
            $mainVisual.removeClass("section");
        }else if( winW <= 1440 && ($fullpage.hasClass("con_ver2")) ){
            $mainVisual.addClass("section");
        }else {
        }
    }
    ver2View();

    // fullpage
    $fullpage.fullpage({
        autoScrolling: true,
        scrollingSpeed: 800,
        scrollHorizontally: true,
        anchors:['Page01', 'Page02', 'Page03', 'Page04', 'Page05', 'Page06', 'Page07', 'Page08', 'footer'],
        menu: '#myMenu',
        onLeave: function (origin, destination, direction) {
            var leavingSection = this;

            if( destination === 1 ){
                $MenuLi.eq(0).addClass("half");
                $MenuLi.eq(5).removeClass("half");

                $MenuLi.eq(0).addClass("back_gray");
                $MenuLi.eq(5).removeClass("back_gray");
            }
            else if( destination === 6 ){
                $MenuLi.eq(5).addClass("half");
                $MenuLi.eq(0).removeClass("half");

                $MenuLi.eq(5).addClass("back_gray");
                $MenuLi.eq(0).removeClass("back_gray");
            }
            else {
                $MenuLi.eq(0).removeClass("half");
                $MenuLi.eq(5).removeClass("half");

                $MenuLi.eq(0).removeClass("back_gray");
                $MenuLi.eq(5).removeClass("back_gray");

                if ( destination === 2 ){
                    $MenuLi.eq(0).addClass("active half");
                    $MenuLi.eq(0).addClass("back_gray");
                }
                else if( destination === 7 ){
                    $MenuLi.eq(5).addClass("active half");
                    $MenuLi.eq(5).addClass("back_gray");
                }
            }

            if (destination === 9) {
                $MenuLi.eq(7).addClass("half");
            }else if (origin === 9 && direction === 'up') {
                $MenuLi.eq(7).removeClass("half");
            }


            if( winW >= 1440 && ($fullpage.hasClass("ver2")) ) {
                if (origin === 3 && direction === 'down') {
                    counter();
                } else if (origin === 5 && direction === 'up') {
                    counter();
                }
            }else {
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
    });

    var $btn_play1 = $mainVisual.find(".btn_play"),
        $play1 = $btn_play1.find(".play"),
        $stop1 = $btn_play1.find(".stop");

    var $maintype1 = $mainVisual.find(".container.type1"),
        $maintype2 = $mainVisual.find(".container.type2");

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
        /* type1과 type2 에 type_1 이 포함 되어 있을때와 없을때  */
        if( $maintype1.hasClass("type_1") && $maintype2.hasClass("type_1") ) {
            swiper_visual[0].autoplay.stop();
            swiper_visual[1].autoplay.stop();
        }else {
            swiper_visual.autoplay.stop();
        }
    });
    $play1.on("click", function () {
        $(this).removeClass("active");
        $stop1.addClass("active");
        if( $maintype1.hasClass("type_1") && $maintype2.hasClass("type_1") ) {
            swiper_visual[0].autoplay.start();
            swiper_visual[1].autoplay.start();
        }else {
            swiper_visual.autoplay.start();
        }
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

    // section 3 slide 1
    var $speed = 800;

    var $item_box = $(".item_box"),
        $item_length = $item_box.find(".length"),
        $item_counter = $item_box.find(".counter");


    var $count = 5;

    if( ( winW > 1280 ) && ( winW <= 1440 ) ){
        $count = 4;
    }else if ( winW <= 1280 ){
        $count = 3;
    }

    var swiper_item = new Swiper('.swiper-container.item_swiper', {
        slidesPerView: "auto",
        slidesPerGroup: $count,
        pagination: {
            el: '.item-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.next_btn.item_btn',
            prevEl: '.prev_btn.item_btn',
        },
        speed: $speed,
        on: {
            init: function () {
                var $length = $(".item_swiper .swiper-slide").length;
                $item_length.text( Math.ceil( $length / $count ) );
            },
            slideChange: function () {
                $item_counter.text( Math.ceil( (this.activeIndex / $count) + 1 ) );
            }
        }
    });


    // section 3 slide 2
    var $warehouse = $("#warehouse"),
        $active_li = $(".txt_bg ul li"),
        $slide_txt = $warehouse.find(".slide_txt"),
        $slide_txtDiv = $slide_txt.find("div"),
        $txt_title = $warehouse.find(".txt_title"),
        $txt_titleh = $txt_title.find("h3");
    var $before_index = 0;

    var swiper_story = new Swiper('.swiper-container.story_swiper', {
        slidesPerView: "auto",
        navigation: {
            nextEl: '.next_btn.story_btn',
            prevEl: '.prev_btn.story_btn',
        },
        loop: true,
        speed: $speed,
        slideToClickedSlide: true,
        noSwiping: true,
        noSwipingClass: 'no_swipe',
        on: {
            init: function () {
                $slide_txtDiv.eq(0).addClass("active");
                $slide_txtDiv.eq(0).siblings().css({"opacity": "0"});
                $txt_titleh.eq(0).addClass("active");
                $txt_titleh.eq(0).siblings().css({"opacity": "0"});
                $active_li.eq(this.realIndex).siblings().css({zIndex: 0});
                $active_li.eq(this.realIndex).css({zIndex: 2});
            },
            slideChange: function () {
                textEffect(this.realIndex);
            }
        }
    });
    /*
    * 선택 슬라이드만 움직이고 다른 이미지들은 z index로 정히 하여 덮어지면서 들어오는 효과
    * 1. z index 정리 하기
    * 2. 선택 카드 옆으로 보내서 들어오기
    * 3. 선택 전 카드가 z index 상위
    * 4. 마스킹 효과 처리하기 - 기준점을 정하고 보여지는 카드가 움직으도록
    *  - 다음 카드 -
    *       위에 있는 카드가 width 값이 0이 되며 접핌
    *  - 이전 카드 -
    *       위에 있는 카드가 width 값이 100이 되면 덮핌
    * */

    swiper_story.on("slideNextTransitionStart" , function () {
        nextEffect(this.realIndex , $before_index);
        $before_index = this.realIndex;
    });
    swiper_story.on("slidePrevTransitionStart" , function () {
        prevEffect(this.realIndex , $before_index);
        $before_index = this.realIndex;
    });
    function nextEffect(realIndex , beforeIndex) {
        $active_li.eq(realIndex).siblings().css({zIndex: 0 , width : "100%"});
        $active_li.eq(beforeIndex).css({zIndex: 2});
        $active_li.eq(realIndex).css({zIndex: 1 , width : "100%"});
        TweenMax.to($active_li.eq(beforeIndex), $speed/1100 , {zIndex: 2, width: "0%", ease: Power1.easeInOut});
    }
    function prevEffect(realIndex , beforeIndex) {
        $active_li.eq(realIndex).siblings().css({zIndex: 0});
        $active_li.eq(beforeIndex).css({zIndex: 1});
        $active_li.eq(realIndex).css({zIndex: 2 , width : 0});
        TweenMax.to($active_li.eq(realIndex), $speed/1100 , {zIndex: 2, width: "100%",  ease: Power1.easeInOut});
    }
    function textEffect(realIndex) {
        // txt_title
        var $active_title = $(".txt_title h3"),
            $active_txt = $(".slide_txt div");
        $active_title.eq(realIndex).removeClass("active");
        $active_title.eq(realIndex).addClass("active");
        $active_txt.eq(realIndex).removeClass("active");
        $active_txt.eq(realIndex).addClass("active");
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
function oscheck(){
	var uanaVigatorOs = navigator.userAgent;
	var AgentUserOs = uanaVigatorOs.replace(/ /g, '');
	var Ostxt = "";
	var OSName = "";
	var OsVers = "";

// This script sets OSName variable as follows:
// "Windows" for all versions of Windows
// "MacOS" for all versions of Macintosh OS
// "Linux" for all versions of Linux
// "UNIX" for all other UNIX flavors
// "Unknown OS" indicates failure to detect the OS

	new function () {
		var OsNo = navigator.userAgent.toLowerCase();
		jQuery.os = {
			Linux: /linux/.test(OsNo),
			Unix: /x11/.test(OsNo),
			Mac: /mac/.test(OsNo),
			Windows: /win/.test(OsNo)
		}
	}

	function OSInfoDev() {
		//$.os.Windows
		if ($.os.Windows) {
			if (AgentUserOs.indexOf("WindowsCE") != -1) OSName = "Windows CE";
			else if (AgentUserOs.indexOf("Windows95") != -1) OSName = "Windows 95";
			else if (AgentUserOs.indexOf("Windows98") != -1) {
				if (AgentUserOs.indexOf("Win9x4.90") != -1) OSName = "Windows Millennium Edition (Windows Me)";
				else OSName = "Windows 98";
			} else if (AgentUserOs.indexOf("WindowsNT4.0") != -1) OSName = "Microsoft Windows NT 4.0";
			else if (AgentUserOs.indexOf("WindowsNT5.0") != -1) OSName = "Windows 2000";
			else if (AgentUserOs.indexOf("WindowsNT5.01") != -1) OSName = "Windows 2000, Service Pack 1 (SP1)";
			else if (AgentUserOs.indexOf("WindowsNT5.1") != -1) OSName = "Windows XP";
			else if (AgentUserOs.indexOf("WindowsNT5.2") != -1) OSName = "Windows 2003";
			else if (AgentUserOs.indexOf("WindowsNT6.0") != -1) OSName = "Windows Vista/Server 2008";
			else if (AgentUserOs.indexOf("WindowsNT6.1") != -1) OSName = "Windows 7";
			else if (AgentUserOs.indexOf("WindowsNT6.2") != -1) OSName = "Windows 8";
			else if (AgentUserOs.indexOf("WindowsNT6.3") != -1) OSName = "Windows 8.1";
			else if (AgentUserOs.indexOf("WindowsPhone8.0") != -1) OSName = "Windows Phone 8.0";
			else if (AgentUserOs.indexOf("WindowsPhoneOS7.5") != -1) OSName = "Windows Phone OS 7.5";
			else if (AgentUserOs.indexOf("Xbox") != -1) OSName = "Xbox 360";
			else if (AgentUserOs.indexOf("XboxOne") != -1) OSName = "Xbox One";
			else if (AgentUserOs.indexOf("Win16") != -1) OSName = "Windows 3.x";
			else if (AgentUserOs.indexOf("ARM") != -1) OSName = "Windows RT";
			else OSName = "Windows (Unknown)";

			if (AgentUserOs.indexOf("WOW64") != -1) OsVers = " 64-bit(s/w 32-bit)";
			else if (AgentUserOs.indexOf("Win64;x64;") != -1) OsVers = " 64-bit(s/w 64-bit)";
			else if (AgentUserOs.indexOf("Win16") != -1) OsVers = " 16-bit";
			else OsVers = " 32-bit";
		}//$.os.Windows END
		//$.os.Linux
		else if ($.os.Linux) {
			if (AgentUserOs.indexOf("Android") != -1) {
				OSName = getAndroidDevName();
			} else if (AgentUserOs.indexOf("BlackBerry9000") != -1) OSName = "BlackBerry9000";
			else if (AgentUserOs.indexOf("BlackBerry9300") != -1) OSName = "BlackBerry9300";
			else if (AgentUserOs.indexOf("BlackBerry9700") != -1) OSName = "BlackBerry9700";
			else if (AgentUserOs.indexOf("BlackBerry9780") != -1) OSName = "BlackBerry9780";
			else if (AgentUserOs.indexOf("BlackBerry9900") != -1) OSName = "BlackBerry9900";
			else if (AgentUserOs.indexOf("BlackBerry;Opera Mini") != -1) OSName = "Opera/9.80";
			else if (AgentUserOs.indexOf("Symbian/3") != -1) OSName = "Symbian OS3";
			else if (AgentUserOs.indexOf("SymbianOS/6") != -1) OSName = "Symbian OS6";
			else if (AgentUserOs.indexOf("SymbianOS/9") != -1) OSName = "Symbian OS9";
			else if (AgentUserOs.indexOf("Ubuntu") != -1) OSName = "Ubuntu";
			else if (AgentUserOs.indexOf("PDA") != -1) OSName = "PDA";
			else if (AgentUserOs.indexOf("NintendoWii") != -1) OSName = "Nintendo Wii";
			else if (AgentUserOs.indexOf("PSP") != -1) OSName = "PlayStation Portable";
			else if (AgentUserOs.indexOf("PS2;") != -1) OSName = "PlayStation 2";
			else if (AgentUserOs.indexOf("PLAYSTATION3") != -1) OSName = "PlayStation 3";
			else OSName = "Linux (Unknown)";
			if (AgentUserOs.indexOf("x86_64") != -1) OsVers = " 64-bit";
			else if (AgentUserOs.indexOf("i386") != -1) OsVers = " 32-bit";
			else if (AgentUserOs.indexOf("IA-32") != -1) OsVers = " 32-bit";
			else OsVers = "";
		}//$.os.Linux END
		//$.os.Unix
		else if ($.os.Unix) {
			OSName = "UNIX";
		}//$.os.Unix END
		//$.os.Mac
		else if ($.os.Mac) {
			if (AgentUserOs.indexOf("iPhone") != -1) {
				if (AgentUserOs.indexOf("iPhoneOS3") != -1) OSName = "iPhone OS 3";
				else if (AgentUserOs.indexOf("iPhoneOS4") != -1) OSName = "iPhone OS 4";
				else if (AgentUserOs.indexOf("iPhoneOS5") != -1) OSName = "iPhone OS 5";
				else if (AgentUserOs.indexOf("iPhoneOS6") != -1) OSName = "iPhone OS 6";
				else OSName = "iPhone";
			} else if (AgentUserOs.indexOf("iPad") != -1) {
				OSName = "iPad";
			} else if (AgentUserOs.indexOf("MacOS") != -1) {
				if (AgentUserOs.indexOf("Macintosh") != -1) OSName = "Macintosh";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.1")) != -1) OSName = "Mac OS X Puma";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.2")) != -1) OSName = "Mac OS X Jaguar";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.3")) != -1) OSName = "Mac OS X Panther";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.4")) != -1) OSName = "Mac OS X Tiger";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.5")) != -1) OSName = "Mac OS X Leopard";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.6")) != -1) OSName = "Mac OS X Snow Leopard";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.7")) != -1) OSName = "Mac OS X Lion";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.8")) != -1) OSName = "Mac OS X Mountain Lion";
				else if ((AgentUserOs.indexOf("MacOSX10_9") || AgentUserOs.indexOf("MacOSX10.9")) != -1) OSName = "Mac OS X Mavericks";
			} else {
				OSName = "MacOS (Unknown)";
			}
		}//$.os.Mac END
		//Unknown OS
		else {
			OSName = "Unknown OS";
		}
		var OSDev = OSName + OsVers;
		return OSDev;
	}

// Android의 단말 이름을 반환
	function getAndroidDevName() {
		var uaAdata = navigator.userAgent;
		var regex = /Android (.*);.*;\s*(.*)\sBuild/;
		var match = regex.exec(uaAdata);
		if (match) {
			var ver = match[1];
			var dev_name = match[2];
			return "Android " + ver + " " + dev_name;
		}
		return "Android OS";
	}

//Mobile Check
	var m_url = "https://msf.or.kr/campaigns/doctor_yerim/mo/html/main/main.html";
	getOSInfo(m_url);

//Mobile Check
	function getOSInfo(url) {
		var devName = OSInfoDev();
		if (devName.indexOf("iPhone") != -1) {
			console.log('iPhone');
			location.href = url + window.location.search;
		} else if (devName.indexOf("Android") != -1) {
			console.log('Android!!');
			location.href = url + window.location.search;
		} else {
			//console.log( devName );
		}
	}
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