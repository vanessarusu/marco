/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/bundle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/bundle.js":
/*!**************************!*\
  !*** ./src/js/bundle.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sliders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sliders */ "./src/js/sliders.js");
/* harmony import */ var _quotes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./quotes */ "./src/js/quotes.js");


(function () {
  var pageIds = {
    products: "9"
  };
  if (document.querySelector("body.page-id-".concat(pageIds.products))) {
    var cs = Object(_sliders__WEBPACK_IMPORTED_MODULE_0__["default"])();
    cs.init($);
  }
  if (window.location.href.indexOf("quote") > -1) {
    var qs = Object(_quotes__WEBPACK_IMPORTED_MODULE_1__["default"])();
    qs.init($);
  }
})();

/***/ }),

/***/ "./src/js/quotes.js":
/*!**************************!*\
  !*** ./src/js/quotes.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var quoteScripts = function quoteScripts($) {
  function initialize() {
    jQuery(document).ready(function ($) {
      // var siteURL = window.location.protocol + '//' + window.location.host;
      var siteURL = 'http://localhost:8888/marco';
      function GrabDiagramImage() {
        $('.view-diagram').each(function () {
          var imageGrab = $(this).attr('data-image');
          $(this).append('<div class="tooltip"><img src="' + siteURL + '/wp-content/themes/bb-theme-child/dist/images/diagrams' + imageGrab + '" class="diagram-image" /></div>');
        });
      }
      $('.print-total').on('click', function () {
        print_page('totals');
      });
      $('.print-all').on('click', function () {
        print_page('all');
      });
      function print_page(type) {
        if (type == 'totals') {
          $(".report-section-container.summary").addClass("no-print");
        }
        if (type == 'all') {
          $(".report-section-container.summary").removeClass("no-print");
        }
        window.print();
      }
      $('.rename-quote').on('click', function () {
        //console.log('wat');
        var t = $(this).attr("data-title");
        var qid = $(this).attr("data-qid");
        var name = prompt('Enter a new name for the quote:', t);
        if (name !== null && name !== '') {
          //console.log("/quote/rename/?qid=" + qid + "&amp;qname=" + name);
          window.location = "/quote/rename/?qid=" + qid + "&qname=" + name;
        }
      });
      $('.build-report').on('click', function () {
        var qid = $(this).attr("data-id");
        var t = $(this).text();
        var d = {
          action: 'gmct_create_quote_report',
          qid: qid
        };
        console.log(d);
        $(this).text('Loading...').addClass("loading");
        //ajax
        $.ajax({
          // url: "/wp-admin/admin-ajax.php",
          url: "http://localhost:8888/marco/",
          type: "POST",
          data: d,
          success: function success(response) {
            console.log('in success' + response);
            //$(this).text(t).removeClass("loading");
            // window.location = "/quote/report/?qid=" + qid;
            window.location = "http://localhost:8888/marco/quote/report/?qid=" + qid;
          },
          error: function error(_error) {
            console.log('in error: ' + JSON.stringify(_error));
          }
        });
      });

      // Handle hovering on systems points
      $(".view-diagram .the-link-text").hover(function () {
        //if ( $(document).width() < 1920 ){
        var point = $(this).parents(".view-diagram");
        //var hash = point.attr("data-hash");

        //var pc = point.parents(".point-container");
        var pch = point.outerHeight();
        var pos = point.position();
        var tt = point.find(".tooltip");
        var tth = tt.outerHeight();

        // set the top position equal to its position minus half its height (to appear centered beside the point)
        var pt = pos.top - tth / 2;

        // if it will go off the bottom, reset it to make sure it doesn't
        if (pt + tth > pch) {
          pt = pch - tth - 20;
        }

        // otherwise, if it will go off the top, prevent it
        if (pt < 0) {
          pt = 30;
        }
        console.log(pos);

        // set the positions based on the side of the screen the boxes are on
        /*
        // removed this section and replaced with simpler one below to fix
        // tooltip being placed off screen, not sure why
        // James Carmichael April 2018
        if ( tt.hasClass("pos-ls") ){
        tt.css('left', pos.left + 35).css('top', pt);
        } else {
        var ttw = tt.outerWidth();
        tt.css('left', pos.left - ttw - 35).css('top', pt);
        }
        */

        tt.css('left', 0).css('top', pt);
        tt.addClass("shown");
        //}
      }, function () {
        var point = $(this).parents(".view-diagram");
        //var hash = point.attr("data-hash");

        point.find(".tooltip").removeClass("shown");
      });
      GrabDiagramImage();
    });
  }
  return {
    init: initialize
  };
};
/* harmony default export */ __webpack_exports__["default"] = (quoteScripts);

/***/ }),

/***/ "./src/js/sliders.js":
/*!***************************!*\
  !*** ./src/js/sliders.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var customSliders = function customSliders($) {
  function initialize($) {
    jQuery(document).ready(function ($) {
      if ($('.custom-product-slick-slider .infield-slider').length > 0) {
        $('.custom-product-slick-slider .infield-slider').slick({
          asNavFor: '.custom-product-slick-slider .infield-slider-nav',
          fade: true,
          arrows: true,
          cssEase: 'linear',
          prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
          nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
        });
        $('.custom-product-slick-slider .infield-slider-nav').slick({
          slidesToShow: 2,
          // slidesToScroll: 2,
          asNavFor: '.custom-product-slick-slider .infield-slider',
          dots: false,
          arrows: false,
          centerMode: false,
          focusOnSelect: true,
          infinite: true
        });
      }
      $('.custom-product-slick-slider .batters-box-slider').slick({
        asNavFor: '.custom-product-slick-slider .batters-box-slider-nav',
        fade: true,
        arrows: true,
        cssEase: 'linear',
        prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
      });
      $('.custom-product-slick-slider .batters-box-slider-nav').slick({
        slidesToShow: 2,
        // slidesToScroll: 2,
        asNavFor: '.custom-product-slick-slider .batters-box-slider',
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true,
        infinite: true
      });
      $('.custom-product-slick-slider .track-materials-slider').slick({
        asNavFor: '.custom-product-slick-slider .track-materials-slider-nav',
        fade: true,
        arrows: true,
        cssEase: 'linear',
        prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
      });
      $('.custom-product-slick-slider .track-materials-slider-nav').slick({
        slidesToShow: 2,
        // slidesToScroll: 2,
        asNavFor: '.custom-product-slick-slider .track-materials-slider',
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true,
        infinite: true,
        autoplay: true
      });
      $('.custom-product-slick-slider .conditioners-slider').slick({
        asNavFor: '.custom-product-slick-slider .conditioners-slider-nav',
        fade: true,
        arrows: true,
        cssEase: 'linear',
        prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
      });
      $('.custom-product-slick-slider .conditioners-slider-nav').slick({
        slidesToShow: 2,
        asNavFor: '.custom-product-slick-slider .conditioners-slider',
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true,
        infinite: true
      });
    });
  }
  function init($) {
    initialize($);
  }
  return {
    init: init
  };
};
/* harmony default export */ __webpack_exports__["default"] = (customSliders);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcXVvdGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zbGlkZXJzLmpzIl0sIm5hbWVzIjpbInBhZ2VJZHMiLCJwcm9kdWN0cyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNzIiwiY3VzdG9tU2xpZGVycyIsImluaXQiLCIkIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaW5kZXhPZiIsInFzIiwicXVvdGVTY3JpcHRzIiwiaW5pdGlhbGl6ZSIsImpRdWVyeSIsInJlYWR5Iiwic2l0ZVVSTCIsIkdyYWJEaWFncmFtSW1hZ2UiLCJlYWNoIiwiaW1hZ2VHcmFiIiwiYXR0ciIsImFwcGVuZCIsIm9uIiwicHJpbnRfcGFnZSIsInR5cGUiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwicHJpbnQiLCJ0IiwicWlkIiwibmFtZSIsInByb21wdCIsInRleHQiLCJkIiwiYWN0aW9uIiwiY29uc29sZSIsImxvZyIsImFqYXgiLCJ1cmwiLCJkYXRhIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiZXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiaG92ZXIiLCJwb2ludCIsInBhcmVudHMiLCJwY2giLCJvdXRlckhlaWdodCIsInBvcyIsInBvc2l0aW9uIiwidHQiLCJmaW5kIiwidHRoIiwicHQiLCJ0b3AiLCJjc3MiLCJsZW5ndGgiLCJzbGljayIsImFzTmF2Rm9yIiwiZmFkZSIsImFycm93cyIsImNzc0Vhc2UiLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJzbGlkZXNUb1Nob3ciLCJkb3RzIiwiY2VudGVyTW9kZSIsImZvY3VzT25TZWxlY3QiLCJpbmZpbml0ZSIsImF1dG9wbGF5Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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QWEsRUFBRSxJQUFJO1FBQ25CQyxRQUFRLEVBQUUsSUFBSTtRQUNkQyxRQUFRLEVBQUU7TUFDZCxDQUFDLENBQUM7TUFJRmpFLENBQUMsQ0FBQyxtREFBbUQsQ0FBQyxDQUFDcUQsS0FBSyxDQUFDO1FBQ3pEQyxRQUFRLEVBQUUsdURBQXVEO1FBQ2pFQyxJQUFJLEVBQUUsSUFBSTtRQUNWQyxNQUFNLEVBQUUsSUFBSTtRQUNaQyxPQUFPLEVBQUUsUUFBUTtRQUNqQkMsU0FBUyxFQUFDLGlIQUFpSDtRQUMzSEMsU0FBUyxFQUFDO01BQ2QsQ0FBQyxDQUFDO01BRUYzRCxDQUFDLENBQUMsdURBQXVELENBQUMsQ0FBQ3FELEtBQUssQ0FBQztRQUM3RE8sWUFBWSxFQUFFLENBQUM7UUFDZk4sUUFBUSxFQUFFLG1EQUFtRDtRQUM3RE8sSUFBSSxFQUFFLEtBQUs7UUFDWEwsTUFBTSxFQUFFLEtBQUs7UUFDYk0sVUFBVSxFQUFFLEtBQUs7UUFDakJDLGFBQWEsRUFBRSxJQUFJO1FBQ25CQyxRQUFRLEVBQUU7TUFDZCxDQUFDLENBQUM7SUFHTixDQUFDLENBQUM7RUFFTjtFQUVBLFNBQVNqRSxJQUFJLENBQUNDLENBQUMsRUFBRTtJQUNiTyxVQUFVLENBQUNQLENBQUMsQ0FBQztFQUNqQjtFQUVBLE9BQU87SUFDSEQsSUFBSSxFQUFFQTtFQUNWLENBQUM7QUFHTCxDQUFFO0FBRWFELDRFQUFhLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvYnVuZGxlLmpzXCIpO1xuIiwiaW1wb3J0IGN1c3RvbVNsaWRlcnMgZnJvbSBcIi4vc2xpZGVyc1wiO1xuaW1wb3J0IHF1b3RlU2NyaXB0cyBmcm9tIFwiLi9xdW90ZXNcIjtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHBhZ2VJZHMgPSB7XG4gICAgICAgIHByb2R1Y3RzOiBcIjlcIlxuICAgIH1cblxuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGJvZHkucGFnZS1pZC0ke3BhZ2VJZHMucHJvZHVjdHN9YCkpIHtcbiAgICAgICAgdmFyIGNzID0gY3VzdG9tU2xpZGVycygpO1xuICAgICAgICBjcy5pbml0KCQpO1xuICAgIH1cbiAgICBcbiAgICBpZih3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwicXVvdGVcIikgPiAtMSkge1xuICAgICAgICB2YXIgcXMgPSBxdW90ZVNjcmlwdHMoKTtcbiAgICAgICAgcXMuaW5pdCgkKTtcbiAgICB9XG5cbn0pKCk7XG5cblxuIiwiY29uc3QgcXVvdGVTY3JpcHRzID0gKGZ1bmN0aW9uKCQpIHtcbiAgICBcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplICgpIHtcblxuICAgICAgICBqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpIHtcblxuICAgICAgICAgICAgLy8gdmFyIHNpdGVVUkwgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG4gICAgICAgICAgICB2YXIgc2l0ZVVSTCA9ICdodHRwOi8vbG9jYWxob3N0Ojg4ODgvbWFyY28nO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICBmdW5jdGlvbiBHcmFiRGlhZ3JhbUltYWdlKCkge1xuICAgICAgICAgICAgICAgICAkKCcudmlldy1kaWFncmFtJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW1hZ2VHcmFiID0gJCh0aGlzKS5hdHRyKCdkYXRhLWltYWdlJyk7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwidG9vbHRpcFwiPjxpbWcgc3JjPVwiJyArIHNpdGVVUkwgICsgJy93cC1jb250ZW50L3RoZW1lcy9iYi10aGVtZS1jaGlsZC9kaXN0L2ltYWdlcy9kaWFncmFtcycgKyBpbWFnZUdyYWIgKyAnXCIgY2xhc3M9XCJkaWFncmFtLWltYWdlXCIgLz48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgJCgnLnByaW50LXRvdGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwcmludF9wYWdlKCd0b3RhbHMnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCgnLnByaW50LWFsbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcHJpbnRfcGFnZSgnYWxsJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICBmdW5jdGlvbiBwcmludF9wYWdlKCB0eXBlICl7XG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlID09ICd0b3RhbHMnICl7XG4gICAgICAgICAgICAgICAgICAgICQoXCIucmVwb3J0LXNlY3Rpb24tY29udGFpbmVyLnN1bW1hcnlcIikuYWRkQ2xhc3MoXCJuby1wcmludFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlID09ICdhbGwnICl7XG4gICAgICAgICAgICAgICAgICAgICQoXCIucmVwb3J0LXNlY3Rpb24tY29udGFpbmVyLnN1bW1hcnlcIikucmVtb3ZlQ2xhc3MoXCJuby1wcmludFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2luZG93LnByaW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgJCgnLnJlbmFtZS1xdW90ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnd2F0Jyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gJCh0aGlzKS5hdHRyKFwiZGF0YS10aXRsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHFpZCA9ICQodGhpcykuYXR0cihcImRhdGEtcWlkXCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IHByb21wdCgnRW50ZXIgYSBuZXcgbmFtZSBmb3IgdGhlIHF1b3RlOicsIHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIG5hbWUgIT09IG51bGwgJiYgbmFtZSAhPT0gJycgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIvcXVvdGUvcmVuYW1lLz9xaWQ9XCIgKyBxaWQgKyBcIiZhbXA7cW5hbWU9XCIgKyBuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IFwiL3F1b3RlL3JlbmFtZS8/cWlkPVwiICsgcWlkICsgXCImcW5hbWU9XCIgKyBuYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICAkKCcuYnVpbGQtcmVwb3J0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgcWlkID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKTtcbiAgICAgICAgICAgICAgICB2YXIgdCA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgICAgIHZhciBkID0ge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICdnbWN0X2NyZWF0ZV9xdW90ZV9yZXBvcnQnLFxuICAgICAgICAgICAgICAgICAgICBxaWQ6IHFpZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnRleHQoJ0xvYWRpbmcuLi4nKS5hZGRDbGFzcyhcImxvYWRpbmdcIik7XG4gICAgICAgICAgICAgICAgLy9hamF4XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdXJsOiBcIi93cC1hZG1pbi9hZG1pbi1hamF4LnBocFwiLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDo4ODg4L21hcmNvL1wiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZCxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2luIHN1Y2Nlc3MnICsgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKHRoaXMpLnRleHQodCkucmVtb3ZlQ2xhc3MoXCJsb2FkaW5nXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2luZG93LmxvY2F0aW9uID0gXCIvcXVvdGUvcmVwb3J0Lz9xaWQ9XCIgKyBxaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODg4OC9tYXJjby9xdW90ZS9yZXBvcnQvP3FpZD1cIiArIHFpZDtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBlcnJvcjogJyArIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgLy8gSGFuZGxlIGhvdmVyaW5nIG9uIHN5c3RlbXMgcG9pbnRzXG4gICAgICAgICAgJChcIi52aWV3LWRpYWdyYW0gLnRoZS1saW5rLXRleHRcIikuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIC8vaWYgKCAkKGRvY3VtZW50KS53aWR0aCgpIDwgMTkyMCApe1xuICAgICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gJCh0aGlzKS5wYXJlbnRzKFwiLnZpZXctZGlhZ3JhbVwiKTtcbiAgICAgICAgICAgICAgICAgIC8vdmFyIGhhc2ggPSBwb2ludC5hdHRyKFwiZGF0YS1oYXNoXCIpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgIC8vdmFyIHBjID0gcG9pbnQucGFyZW50cyhcIi5wb2ludC1jb250YWluZXJcIik7XG4gICAgICAgICAgICAgICAgICB2YXIgcGNoID0gcG9pbnQub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IHBvaW50LnBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICB2YXIgdHQgPSBwb2ludC5maW5kKFwiLnRvb2x0aXBcIik7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgdmFyIHR0aCA9IHR0Lm91dGVySGVpZ2h0KCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgLy8gc2V0IHRoZSB0b3AgcG9zaXRpb24gZXF1YWwgdG8gaXRzIHBvc2l0aW9uIG1pbnVzIGhhbGYgaXRzIGhlaWdodCAodG8gYXBwZWFyIGNlbnRlcmVkIGJlc2lkZSB0aGUgcG9pbnQpXG4gICAgICAgICAgICAgICAgICB2YXIgcHQgPSBwb3MudG9wIC0gKHR0aC8yKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAvLyBpZiBpdCB3aWxsIGdvIG9mZiB0aGUgYm90dG9tLCByZXNldCBpdCB0byBtYWtlIHN1cmUgaXQgZG9lc24ndFxuICAgICAgICAgICAgICAgICAgaWYgKCAoIHB0ICsgdHRoICkgPiBwY2ggKXtcbiAgICAgICAgICAgICAgICAgICAgICBwdCA9IHBjaCAtIHR0aCAtIDIwO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSwgaWYgaXQgd2lsbCBnbyBvZmYgdGhlIHRvcCwgcHJldmVudCBpdFxuICAgICAgICAgICAgICAgICAgaWYgKCBwdCA8IDAgKXtcbiAgICAgICAgICAgICAgICAgICAgICBwdCA9IDMwO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwb3MpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgcG9zaXRpb25zIGJhc2VkIG9uIHRoZSBzaWRlIG9mIHRoZSBzY3JlZW4gdGhlIGJveGVzIGFyZSBvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlZCB0aGlzIHNlY3Rpb24gYW5kIHJlcGxhY2VkIHdpdGggc2ltcGxlciBvbmUgYmVsb3cgdG8gZml4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG9vbHRpcCBiZWluZyBwbGFjZWQgb2ZmIHNjcmVlbiwgbm90IHN1cmUgd2h5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSmFtZXMgQ2FybWljaGFlbCBBcHJpbCAyMDE4XG4gICAgICAgICAgICAgICAgICBpZiAoIHR0Lmhhc0NsYXNzKFwicG9zLWxzXCIpICl7XG4gICAgICAgICAgICAgICAgICAgIHR0LmNzcygnbGVmdCcsIHBvcy5sZWZ0ICsgMzUpLmNzcygndG9wJywgcHQpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR0dyA9IHR0Lm91dGVyV2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgdHQuY3NzKCdsZWZ0JywgcG9zLmxlZnQgLSB0dHcgLSAzNSkuY3NzKCd0b3AnLCBwdCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHQuY3NzKCdsZWZ0JywgMCkuY3NzKCd0b3AnLCBwdCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgdHQuYWRkQ2xhc3MoXCJzaG93blwiKTtcbiAgICAgICAgICAgICAgLy99XG4gICAgICAgIFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBwb2ludCA9ICQodGhpcykucGFyZW50cyhcIi52aWV3LWRpYWdyYW1cIik7XG4gICAgICAgICAgICAgIC8vdmFyIGhhc2ggPSBwb2ludC5hdHRyKFwiZGF0YS1oYXNoXCIpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgcG9pbnQuZmluZChcIi50b29sdGlwXCIpLnJlbW92ZUNsYXNzKFwic2hvd25cIik7XG4gICAgICAgIFxuICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgIEdyYWJEaWFncmFtSW1hZ2UoKTtcbiAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5yZXR1cm4ge1xuICAgIGluaXQ6IGluaXRpYWxpemVcbn1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHF1b3RlU2NyaXB0czsiLCJjb25zdCBjdXN0b21TbGlkZXJzID0gKGZ1bmN0aW9uKCQpIHtcblxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoJCkge1xuXG4gICAgICAgIGpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCkge1xuICAgICAgICAgICAgaWYoJCgnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuaW5maWVsZC1zbGlkZXInKS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAkKCcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5pbmZpZWxkLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYXNOYXZGb3I6ICcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5pbmZpZWxkLXNsaWRlci1uYXYnLFxuICAgICAgICAgICAgICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNzc0Vhc2U6ICdsaW5lYXInLFxuICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6XCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J3NsaWNrLXByZXYgcHVsbC1sZWZ0Jz48aSBjbGFzcz0nZmEgZmEtYW5nbGUtbGVmdCcgYXJpYS1oaWRkZW49J3RydWUnPjwvaT48L2J1dHRvbj5cIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OlwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdzbGljay1uZXh0IHB1bGwtcmlnaHQnPjxpIGNsYXNzPSdmYSBmYS1hbmdsZS1yaWdodCcgYXJpYS1oaWRkZW49J3RydWUnPjwvaT48L2J1dHRvbj5cIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJCgnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuaW5maWVsZC1zbGlkZXItbmF2Jykuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICAgICAgICAgIC8vIHNsaWRlc1RvU2Nyb2xsOiAyLFxuICAgICAgICAgICAgICAgICAgICBhc05hdkZvcjogJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLmluZmllbGQtc2xpZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICAkKCcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5iYXR0ZXJzLWJveC1zbGlkZXInKS5zbGljayh7XG4gICAgICAgICAgICAgICAgYXNOYXZGb3I6ICcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5iYXR0ZXJzLWJveC1zbGlkZXItbmF2JyxcbiAgICAgICAgICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjc3NFYXNlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6XCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J3NsaWNrLXByZXYgcHVsbC1sZWZ0Jz48aSBjbGFzcz0nZmEgZmEtYW5nbGUtbGVmdCcgYXJpYS1oaWRkZW49J3RydWUnPjwvaT48L2J1dHRvbj5cIixcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6XCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J3NsaWNrLW5leHQgcHVsbC1yaWdodCc+PGkgY2xhc3M9J2ZhIGZhLWFuZ2xlLXJpZ2h0JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPjwvYnV0dG9uPlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICAkKCcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5iYXR0ZXJzLWJveC1zbGlkZXItbmF2Jykuc2xpY2soe1xuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICAvLyBzbGlkZXNUb1Njcm9sbDogMixcbiAgICAgICAgICAgICAgICBhc05hdkZvcjogJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLmJhdHRlcnMtYm94LXNsaWRlcicsXG4gICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICAkKCcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC50cmFjay1tYXRlcmlhbHMtc2xpZGVyJykuc2xpY2soe1xuICAgICAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAudHJhY2stbWF0ZXJpYWxzLXNsaWRlci1uYXYnLFxuICAgICAgICAgICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzc0Vhc2U6ICdsaW5lYXInLFxuICAgICAgICAgICAgICAgIHByZXZBcnJvdzpcIjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nc2xpY2stcHJldiBwdWxsLWxlZnQnPjxpIGNsYXNzPSdmYSBmYS1hbmdsZS1sZWZ0JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPjwvYnV0dG9uPlwiLFxuICAgICAgICAgICAgICAgIG5leHRBcnJvdzpcIjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nc2xpY2stbmV4dCBwdWxsLXJpZ2h0Jz48aSBjbGFzcz0nZmEgZmEtYW5nbGUtcmlnaHQnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+PC9idXR0b24+XCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgICQoJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLnRyYWNrLW1hdGVyaWFscy1zbGlkZXItbmF2Jykuc2xpY2soe1xuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICAvLyBzbGlkZXNUb1Njcm9sbDogMixcbiAgICAgICAgICAgICAgICBhc05hdkZvcjogJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLnRyYWNrLW1hdGVyaWFscy1zbGlkZXInLFxuICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICAkKCcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5jb25kaXRpb25lcnMtc2xpZGVyJykuc2xpY2soe1xuICAgICAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuY29uZGl0aW9uZXJzLXNsaWRlci1uYXYnLFxuICAgICAgICAgICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzc0Vhc2U6ICdsaW5lYXInLFxuICAgICAgICAgICAgICAgIHByZXZBcnJvdzpcIjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nc2xpY2stcHJldiBwdWxsLWxlZnQnPjxpIGNsYXNzPSdmYSBmYS1hbmdsZS1sZWZ0JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPjwvYnV0dG9uPlwiLFxuICAgICAgICAgICAgICAgIG5leHRBcnJvdzpcIjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nc2xpY2stbmV4dCBwdWxsLXJpZ2h0Jz48aSBjbGFzcz0nZmEgZmEtYW5nbGUtcmlnaHQnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+PC9idXR0b24+XCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgICQoJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLmNvbmRpdGlvbmVycy1zbGlkZXItbmF2Jykuc2xpY2soe1xuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICBhc05hdkZvcjogJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLmNvbmRpdGlvbmVycy1zbGlkZXInLFxuICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIH0pOyAgICAgICAgXG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCQpIHtcbiAgICAgICAgaW5pdGlhbGl6ZSgkKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBpbml0XG4gICAgfSBcblxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY3VzdG9tU2xpZGVyczsiXSwic291cmNlUm9vdCI6IiJ9