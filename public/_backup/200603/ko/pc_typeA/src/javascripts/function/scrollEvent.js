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