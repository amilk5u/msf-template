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