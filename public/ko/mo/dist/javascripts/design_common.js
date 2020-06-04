"use strict";
var winW;
var winH;
var esStep = "Expo.ease";
var $window = $(window);
var winSc;
var $html = $("html");
var htmlH;
var $header = $("#header");

$window.load(function () {
    htmlH = $("body").outerHeight(true);
    winSc = $(this).scrollTop();
    $window.on("resize", function () {
        winW = $(this).width();
        winH = $(this).height();
    });
    $(this).trigger("resize");
    $(window).scroll(function () {
        winSc = $(this).scrollTop();
    });

    main();
    hash();
});
function hash() {
    var dataHash = [];
    var $hashval=0;
    $(".dataHash").each(function() {
        if($(this).attr("id")){
            var ahref = $(this).attr("id");
            dataHash.push("#"+ahref);
        }
    });
    //스크롤 기능
    $(window).scroll(function(){
        //변수 설정
        var windowPos = $(window).scrollTop();
        //header
        if(windowPos > 10){
            TweenMax.to($("header") , 0.3 , {backgroundColor : "#fff"});
        }else{
            TweenMax.to($("header") , 0.3 , {backgroundColor : "transparent"});
        }
        //hash 적용
        for (var i=0; i < dataHash.length; i++) {
            var theID = dataHash[i];
            var divPos = $(theID).offset().top-115;
            var divHeight = $(theID).height();
            if (windowPos >= (divPos) && windowPos < (divPos + divHeight)) {
                if($hashval !== (i)){
                    history.replaceState("","",theID);
                    $hashval=i;
                    console.log(dataHash[$hashval]);
                    if(dataHash[$hashval] === "#workInfo"){
                        counter();
                    }
                }
            }
        }
    });
    // 이동 버튼 클릭
    var pageNum = 0;
    $(".page_btn button").on("click" , function () {
        if($(this).hasClass("prev_con") ){
            pageNum = --$hashval;
            if(pageNum  === -1 ) pageNum = 0 ;
            console.log(pageNum)
        }else{
            pageNum = ++$hashval;
        }
        var headerH = $("header").height()+20;
        var scrollPosition = $(dataHash[pageNum]).offset().top;
        TweenMax.to($("html"), 0.5 , {scrollTop: scrollPosition-headerH});
    })
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

}
function main() {
    var $speed = 800;
    var swiper_visual = new Swiper('.swiper-container.visual_swiper', {
        slidesPerView: "auto",
        speed: $speed,
        pagination: {
            el: '.swiper-pagination',
        },
    });
    var swiper_item = new Swiper('.swiper-container.item_swiper', {
        slidesPerView: "auto",
        navigation: {
            nextEl: '.next_btn.item_btn',
            prevEl: '.prev_btn.item_btn',
        },
        loop : true,
        freeMode: true,
        speed: $speed,
        on:{
            init:function(){
                var $length = $(".item_swiper  .swiper-slide").length;
                $(".control_box .length").text($length/3);
                $(".control_box .counter").text(this.realIndex+1);
            },
            slideChange:function(){
                $(".control_box .counter").text(this.realIndex+1);
            }
        }
    });
    var swiper_activist= new Swiper('.swiper-container.activist_swiper', {
        slidesPerView: "auto",
        loop : true,
        speed: $speed,
        centeredSlides: true,
        centeredSlidesBounds: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    var swiper_campaigns = new Swiper('.swiper-container.campaigns_swiper', {
        slidesPerView: "auto",
        slidesPerGroup: 2,
        speed: $speed,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });
}