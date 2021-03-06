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