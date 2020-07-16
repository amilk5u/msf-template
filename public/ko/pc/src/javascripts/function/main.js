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