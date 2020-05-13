function main() {
    var $mainVisual = $("#mainVisual .img_wrap");
    TweenMax.to($mainVisual, 10, {scale:1.1, ease:esStep});
    TweenMax.to($mainVisual, .5, {opacity:1});
}