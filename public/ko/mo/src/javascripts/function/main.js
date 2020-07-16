function main() {
    var $speed = 800;
    var swiper_visual = new Swiper('.swiper-container.visual_swiper', {
        slidesPerView: "auto",
        speed: $speed,
        pagination: {
            el: '.swiper-pagination',
        },
    });
    var item_view = 2,
        item_length = null,
        item_counter = 0;

    var swiper_item = new Swiper('.swiper-container.item_swiper', {
        slidesPerView: "auto",
        freeMode: true,
        speed: $speed,
        slidesPerGroup: item_view,
        pagination: {
            el: '.item-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.next_btn.item_btn',
            prevEl: '.prev_btn.item_btn',
        },
        on:{
            init:function(){
                item_length = $(".item_swiper  .swiper-slide").length;
                $(".control_box .length").text(Math.ceil(item_length/item_view));
            },
            slideChange:function () {
                console.log($(".swiper-pagination-current").text());

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