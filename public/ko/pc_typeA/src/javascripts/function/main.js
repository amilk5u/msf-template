function main() {

    var $container = $("#container");
    var $slideSection = $container.find("#slideSection");

    var $slide01 = $slideSection.find(".slide01");
    var $slide02 = $slideSection.find(".slide02");
    var $slide03 = $slideSection.find(".slide03");

    var $slide02_cont = $slide02.find(".slide_container");
    var $slide02Li = $slide02_cont.find("li");

    var swiper = new Swiper('.swiper-container.slide03', {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: true,
        pagination: {
            clickable: true,
        },
    });




    /*
    *  1. li 중 1번(0번)을 클릭시 index 0을 뱉어 낸다.
    *  2. li 중
    *
    *
    */

    function test() {

        var _this = $(this);
        var _index = _this.index();

        $slide02Li.on("click",function(){

            console.log(_this);
        });


    }
    test();



}