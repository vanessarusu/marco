const customSliders = (function($) {

    function initialize($) {

        jQuery(document).ready(function($) {
            if($('.custom-product-slick-slider .infield-slider').length > 0) {

                $('.custom-product-slick-slider .infield-slider').slick({
                    asNavFor: '.custom-product-slick-slider .infield-slider-nav',
                    fade: true,
                    arrows: true,
                    cssEase: 'linear',
                    prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
                    nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
                });
            
                $('.custom-product-slick-slider .infield-slider-nav').slick({
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    asNavFor: '.custom-product-slick-slider .infield-slider',
                    dots: false,
                    arrows: false,
                    centerMode: false,
                    focusOnSelect: true
                });
            }        
        
        
        
            $('.custom-product-slick-slider .batters-box-slider').slick({
                asNavFor: '.custom-product-slick-slider .batters-box-slider-nav',
                fade: true,
                arrows: true,
                cssEase: 'linear',
                prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
            });
        
            $('.custom-product-slick-slider .batters-box-slider-nav').slick({
                slidesToShow: 2,
                slidesToScroll: 2,
                asNavFor: '.custom-product-slick-slider .batters-box-slider',
                dots: false,
                arrows: false,
                centerMode: false,
                focusOnSelect: true
            });
        
        
        
        
            $('.custom-product-slick-slider .track-materials-slider').slick({
                asNavFor: '.custom-product-slick-slider .track-materials-slider-nav',
                fade: true,
                arrows: true,
                cssEase: 'linear',
                prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
            });
        
            $('.custom-product-slick-slider .track-materials-slider-nav').slick({
                slidesToShow: 2,
                slidesToScroll: 2,
                asNavFor: '.custom-product-slick-slider .track-materials-slider',
                dots: false,
                arrows: false,
                centerMode: false,
                focusOnSelect: true
            });
        
        
        
            $('.custom-product-slick-slider .conditioners-slider').slick({
                asNavFor: '.custom-product-slick-slider .conditioners-slider-nav',
                fade: true,
                arrows: true,
                cssEase: 'linear',
                prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
            });
        
            $('.custom-product-slick-slider .conditioners-slider-nav').slick({
                slidesToShow: 2,
                slidesToScroll: 2,
                asNavFor: '.custom-product-slick-slider .conditioners-slider',
                dots: false,
                arrows: false,
                centerMode: false,
                focusOnSelect: true
            });
        
        
        });        

    }

    function init($) {
        initialize($);
    }

    return {
        init: init
    } 


});

export default customSliders;