jQuery(document).ready(function($){


	// ========== Flexible - Image Slider ========== //
	$('.flexible-image-slider').each(function(){

		$(this).find('.image-slider').flexslider({
			animation: "slide",
			prevText: "",
			nextText: "",
			slideshowSpeed: 7000,
			animationSpeed: 700,
			pauseOnHover: true,
			useCSS: false
		});
		
	});


	// ========== Flexible - Testimonials ========== //
	$('.flexible-testimonials-slider').each(function(){

		$(this).find('.testimonials-slider').flexslider({
			animation: "fade",
			controlNav: true,
			directionNav: false,
			slideshow: false,
			useCSS: false
		});

	});


	// ========== Flexible Gallery (Slider) ========== //
	$('.flexible-gallery-slider-wrap').each(function(){

		var loading = $('.fgs-loading', this),
				nav = $(this).data('nav'),
				sliderID = $(this).data('count');


		// Slider args
		var flexArgs = {
			animation: "fade",
			prevText: "",
			nextText: "",
			useCSS: false,
			pauseOnHover: true,
			directionNav: true, // arrows
			controlNav: false, // buttons
			slideshowSpeed: 7000,

			start: function(){
				loading.fadeOut(250);
			},
		};


		// Add buttons or carousel
		if( nav == 'buttons' ){
			flexArgs.controlNav = true;
		} else if( nav == 'carousel' ){
			flexArgs.sync = '#fgc-' + sliderID;
		}


		// Initiate carousel
		if( nav == 'carousel' ){
			$('#fgc-' + sliderID).flexslider({
				animation: "slide",
				controlNav: false,
				animationLoop: false,
				slideshow: false,
				prevText: "",
				nextText: "",
				itemWidth: 80,
				itemMargin: 1,
				asNavFor: '#fgs-' + sliderID,
			});
		}


		// Initiate slider
		$('#fgs-' + sliderID).flexslider(flexArgs);

	});

});
