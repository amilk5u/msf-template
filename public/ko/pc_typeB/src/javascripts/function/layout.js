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