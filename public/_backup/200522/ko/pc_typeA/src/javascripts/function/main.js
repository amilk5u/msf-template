function main() {


    $("#fullpage").fullpage({
        autoScrolling: true,
        scrollHorizontally: true,
        anchors: ['Page01', 'Page02', 'Page03', 'Page04', 'Page05', 'Page06', 'Page07', 'Page08', 'footer'],
        menu: '#myMenu'
    });


    //visual_slide
    var swiper = new Swiper('.swiper-container.visual_slide', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });

    // campaigns_slide
    var swiper = new Swiper('.swiper-container.campaigns_slide', {
        slidesPerView: 5,
        spaceBetween: 10,
        pagination: {
            clickable: true,
        },
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1336: {
                slidesPerView: 4,
                spaceBetween: 20
            },
            // when window width is >= 480px
            1600: {
                slidesPerView: 5,
                spaceBetween: 25
            },
        }
    });


}