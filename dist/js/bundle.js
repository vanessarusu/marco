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
          url: "http://localhost:8888/marco-june-4/wordpress/wp-admin/admin-ajax.php",
          type: "POST",
          data: d,
          success: function success(response) {
            console.log('in success' + response);
            //$(this).text(t).removeClass("loading");
            window.location = "/quote/report/?qid=" + qid;
            // window.location = "http://localhost:8888/marco/quote/report/?qid=" + qid;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcXVvdGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zbGlkZXJzLmpzIl0sIm5hbWVzIjpbInBhZ2VJZHMiLCJwcm9kdWN0cyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNzIiwiY3VzdG9tU2xpZGVycyIsImluaXQiLCIkIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaW5kZXhPZiIsInFzIiwicXVvdGVTY3JpcHRzIiwiaW5pdGlhbGl6ZSIsImpRdWVyeSIsInJlYWR5Iiwic2l0ZVVSTCIsIkdyYWJEaWFncmFtSW1hZ2UiLCJlYWNoIiwiaW1hZ2VHcmFiIiwiYXR0ciIsImFwcGVuZCIsIm9uIiwicHJpbnRfcGFnZSIsInR5cGUiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwicHJpbnQiLCJ0IiwicWlkIiwibmFtZSIsInByb21wdCIsInRleHQiLCJkIiwiYWN0aW9uIiwiY29uc29sZSIsImxvZyIsImFqYXgiLCJ1cmwiLCJkYXRhIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiZXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiaG92ZXIiLCJwb2ludCIsInBhcmVudHMiLCJwY2giLCJvdXRlckhlaWdodCIsInBvcyIsInBvc2l0aW9uIiwidHQiLCJmaW5kIiwidHRoIiwicHQiLCJ0b3AiLCJjc3MiLCJsZW5ndGgiLCJzbGljayIsImFzTmF2Rm9yIiwiZmFkZSIsImFycm93cyIsImNzc0Vhc2UiLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJzbGlkZXNUb1Nob3ciLCJkb3RzIiwiY2VudGVyTW9kZSIsImZvY3VzT25TZWxlY3QiLCJpbmZpbml0ZSIsImF1dG9wbGF5Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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QUUsSUFBSTtRQUNuQkMsUUFBUSxFQUFFLElBQUk7UUFDZEMsUUFBUSxFQUFFO01BQ2QsQ0FBQyxDQUFDO01BSUZqRSxDQUFDLENBQUMsbURBQW1ELENBQUMsQ0FBQ3FELEtBQUssQ0FBQztRQUN6REMsUUFBUSxFQUFFLHVEQUF1RDtRQUNqRUMsSUFBSSxFQUFFLElBQUk7UUFDVkMsTUFBTSxFQUFFLElBQUk7UUFDWkMsT0FBTyxFQUFFLFFBQVE7UUFDakJDLFNBQVMsRUFBQyxpSEFBaUg7UUFDM0hDLFNBQVMsRUFBQztNQUNkLENBQUMsQ0FBQztNQUVGM0QsQ0FBQyxDQUFDLHVEQUF1RCxDQUFDLENBQUNxRCxLQUFLLENBQUM7UUFDN0RPLFlBQVksRUFBRSxDQUFDO1FBQ2ZOLFFBQVEsRUFBRSxtREFBbUQ7UUFDN0RPLElBQUksRUFBRSxLQUFLO1FBQ1hMLE1BQU0sRUFBRSxLQUFLO1FBQ2JNLFVBQVUsRUFBRSxLQUFLO1FBQ2pCQyxhQUFhLEVBQUUsSUFBSTtRQUNuQkMsUUFBUSxFQUFFO01BQ2QsQ0FBQyxDQUFDO0lBR04sQ0FBQyxDQUFDO0VBRU47RUFFQSxTQUFTakUsSUFBSSxDQUFDQyxDQUFDLEVBQUU7SUFDYk8sVUFBVSxDQUFDUCxDQUFDLENBQUM7RUFDakI7RUFFQSxPQUFPO0lBQ0hELElBQUksRUFBRUE7RUFDVixDQUFDO0FBR0wsQ0FBRTtBQUVhRCw0RUFBYSxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2J1bmRsZS5qc1wiKTtcbiIsImltcG9ydCBjdXN0b21TbGlkZXJzIGZyb20gXCIuL3NsaWRlcnNcIjtcbmltcG9ydCBxdW90ZVNjcmlwdHMgZnJvbSBcIi4vcXVvdGVzXCI7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHZhciBwYWdlSWRzID0ge1xuICAgICAgICBwcm9kdWN0czogXCI5XCJcbiAgICB9XG5cbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBib2R5LnBhZ2UtaWQtJHtwYWdlSWRzLnByb2R1Y3RzfWApKSB7XG4gICAgICAgIHZhciBjcyA9IGN1c3RvbVNsaWRlcnMoKTtcbiAgICAgICAgY3MuaW5pdCgkKTtcbiAgICB9XG4gICAgXG4gICAgaWYod2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZihcInF1b3RlXCIpID4gLTEpIHtcbiAgICAgICAgdmFyIHFzID0gcXVvdGVTY3JpcHRzKCk7XG4gICAgICAgIHFzLmluaXQoJCk7XG4gICAgfVxuXG59KSgpO1xuXG5cbiIsImNvbnN0IHF1b3RlU2NyaXB0cyA9IChmdW5jdGlvbigkKSB7XG4gICAgXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSAoKSB7XG5cbiAgICAgICAgalF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG5cbiAgICAgICAgICAgIC8vIHZhciBzaXRlVVJMID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuICAgICAgICAgICAgdmFyIHNpdGVVUkwgPSAnaHR0cDovL2xvY2FsaG9zdDo4ODg4L21hcmNvJztcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgZnVuY3Rpb24gR3JhYkRpYWdyYW1JbWFnZSgpIHtcbiAgICAgICAgICAgICAgICAgJCgnLnZpZXctZGlhZ3JhbScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGltYWdlR3JhYiA9ICQodGhpcykuYXR0cignZGF0YS1pbWFnZScpO1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFwcGVuZCgnPGRpdiBjbGFzcz1cInRvb2x0aXBcIj48aW1nIHNyYz1cIicgKyBzaXRlVVJMICArICcvd3AtY29udGVudC90aGVtZXMvYmItdGhlbWUtY2hpbGQvZGlzdC9pbWFnZXMvZGlhZ3JhbXMnICsgaW1hZ2VHcmFiICsgJ1wiIGNsYXNzPVwiZGlhZ3JhbS1pbWFnZVwiIC8+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICQoJy5wcmludC10b3RhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcHJpbnRfcGFnZSgndG90YWxzJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoJy5wcmludC1hbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHByaW50X3BhZ2UoJ2FsbCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgZnVuY3Rpb24gcHJpbnRfcGFnZSggdHlwZSApe1xuICAgICAgICAgICAgICAgIGlmICggdHlwZSA9PSAndG90YWxzJyApe1xuICAgICAgICAgICAgICAgICAgICAkKFwiLnJlcG9ydC1zZWN0aW9uLWNvbnRhaW5lci5zdW1tYXJ5XCIpLmFkZENsYXNzKFwibm8tcHJpbnRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICggdHlwZSA9PSAnYWxsJyApe1xuICAgICAgICAgICAgICAgICAgICAkKFwiLnJlcG9ydC1zZWN0aW9uLWNvbnRhaW5lci5zdW1tYXJ5XCIpLnJlbW92ZUNsYXNzKFwibm8tcHJpbnRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdpbmRvdy5wcmludCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICQoJy5yZW5hbWUtcXVvdGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3dhdCcpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdCA9ICQodGhpcykuYXR0cihcImRhdGEtdGl0bGVcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBxaWQgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXFpZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBwcm9tcHQoJ0VudGVyIGEgbmV3IG5hbWUgZm9yIHRoZSBxdW90ZTonLCB0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBuYW1lICE9PSBudWxsICYmIG5hbWUgIT09ICcnICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiL3F1b3RlL3JlbmFtZS8/cWlkPVwiICsgcWlkICsgXCImYW1wO3FuYW1lPVwiICsgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBcIi9xdW90ZS9yZW5hbWUvP3FpZD1cIiArIHFpZCArIFwiJnFuYW1lPVwiICsgbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgJCgnLmJ1aWxkLXJlcG9ydCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdmFyIHFpZCA9ICQodGhpcykuYXR0cihcImRhdGEtaWRcIik7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgICAgICAgICB2YXIgZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnZ21jdF9jcmVhdGVfcXVvdGVfcmVwb3J0JyxcbiAgICAgICAgICAgICAgICAgICAgcWlkOiBxaWRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgJCh0aGlzKS50ZXh0KCdMb2FkaW5nLi4uJykuYWRkQ2xhc3MoXCJsb2FkaW5nXCIpO1xuICAgICAgICAgICAgICAgIC8vYWpheFxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVybDogXCIvd3AtYWRtaW4vYWRtaW4tYWpheC5waHBcIixcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODg4OC9tYXJjby9cIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGQsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBzdWNjZXNzJyArIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJCh0aGlzKS50ZXh0KHQpLnJlbW92ZUNsYXNzKFwibG9hZGluZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbiA9IFwiL3F1b3RlL3JlcG9ydC8/cWlkPVwiICsgcWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gXCJodHRwOi8vbG9jYWxob3N0Ojg4ODgvbWFyY28vcXVvdGUvcmVwb3J0Lz9xaWQ9XCIgKyBxaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW4gZXJyb3I6ICcgKyBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgICAgIC8vIEhhbmRsZSBob3ZlcmluZyBvbiBzeXN0ZW1zIHBvaW50c1xuICAgICAgICAgICQoXCIudmlldy1kaWFncmFtIC50aGUtbGluay10ZXh0XCIpLmhvdmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAvL2lmICggJChkb2N1bWVudCkud2lkdGgoKSA8IDE5MjAgKXtcbiAgICAgICAgICAgICAgICAgIHZhciBwb2ludCA9ICQodGhpcykucGFyZW50cyhcIi52aWV3LWRpYWdyYW1cIik7XG4gICAgICAgICAgICAgICAgICAvL3ZhciBoYXNoID0gcG9pbnQuYXR0cihcImRhdGEtaGFzaFwiKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAvL3ZhciBwYyA9IHBvaW50LnBhcmVudHMoXCIucG9pbnQtY29udGFpbmVyXCIpO1xuICAgICAgICAgICAgICAgICAgdmFyIHBjaCA9IHBvaW50Lm91dGVySGVpZ2h0KCk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBwb2ludC5wb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgdmFyIHR0ID0gcG9pbnQuZmluZChcIi50b29sdGlwXCIpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgIHZhciB0dGggPSB0dC5vdXRlckhlaWdodCgpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgdG9wIHBvc2l0aW9uIGVxdWFsIHRvIGl0cyBwb3NpdGlvbiBtaW51cyBoYWxmIGl0cyBoZWlnaHQgKHRvIGFwcGVhciBjZW50ZXJlZCBiZXNpZGUgdGhlIHBvaW50KVxuICAgICAgICAgICAgICAgICAgdmFyIHB0ID0gcG9zLnRvcCAtICh0dGgvMik7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgLy8gaWYgaXQgd2lsbCBnbyBvZmYgdGhlIGJvdHRvbSwgcmVzZXQgaXQgdG8gbWFrZSBzdXJlIGl0IGRvZXNuJ3RcbiAgICAgICAgICAgICAgICAgIGlmICggKCBwdCArIHR0aCApID4gcGNoICl7XG4gICAgICAgICAgICAgICAgICAgICAgcHQgPSBwY2ggLSB0dGggLSAyMDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2UsIGlmIGl0IHdpbGwgZ28gb2ZmIHRoZSB0b3AsIHByZXZlbnQgaXRcbiAgICAgICAgICAgICAgICAgIGlmICggcHQgPCAwICl7XG4gICAgICAgICAgICAgICAgICAgICAgcHQgPSAzMDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocG9zKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHBvc2l0aW9ucyBiYXNlZCBvbiB0aGUgc2lkZSBvZiB0aGUgc2NyZWVuIHRoZSBib3hlcyBhcmUgb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZWQgdGhpcyBzZWN0aW9uIGFuZCByZXBsYWNlZCB3aXRoIHNpbXBsZXIgb25lIGJlbG93IHRvIGZpeFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvb2x0aXAgYmVpbmcgcGxhY2VkIG9mZiBzY3JlZW4sIG5vdCBzdXJlIHdoeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEphbWVzIENhcm1pY2hhZWwgQXByaWwgMjAxOFxuICAgICAgICAgICAgICAgICAgaWYgKCB0dC5oYXNDbGFzcyhcInBvcy1sc1wiKSApe1xuICAgICAgICAgICAgICAgICAgICB0dC5jc3MoJ2xlZnQnLCBwb3MubGVmdCArIDM1KS5jc3MoJ3RvcCcsIHB0KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0dHcgPSB0dC5vdXRlcldpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHR0LmNzcygnbGVmdCcsIHBvcy5sZWZ0IC0gdHR3IC0gMzUpLmNzcygndG9wJywgcHQpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR0LmNzcygnbGVmdCcsIDApLmNzcygndG9wJywgcHQpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgIHR0LmFkZENsYXNzKFwic2hvd25cIik7XG4gICAgICAgICAgICAgIC8vfVxuICAgICAgICBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgcG9pbnQgPSAkKHRoaXMpLnBhcmVudHMoXCIudmlldy1kaWFncmFtXCIpO1xuICAgICAgICAgICAgICAvL3ZhciBoYXNoID0gcG9pbnQuYXR0cihcImRhdGEtaGFzaFwiKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgIHBvaW50LmZpbmQoXCIudG9vbHRpcFwiKS5yZW1vdmVDbGFzcyhcInNob3duXCIpO1xuICAgICAgICBcbiAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICBHcmFiRGlhZ3JhbUltYWdlKCk7XG4gICAgICAgIFxuICAgICAgICB9KTtcblxuICAgIH1cblxucmV0dXJuIHtcbiAgICBpbml0OiBpbml0aWFsaXplXG59XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBxdW90ZVNjcmlwdHM7IiwiY29uc3QgY3VzdG9tU2xpZGVycyA9IChmdW5jdGlvbigkKSB7XG5cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCQpIHtcblxuICAgICAgICBqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpIHtcbiAgICAgICAgICAgIGlmKCQoJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLmluZmllbGQtc2xpZGVyJykubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgJCgnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuaW5maWVsZC1zbGlkZXInKS5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuaW5maWVsZC1zbGlkZXItbmF2JyxcbiAgICAgICAgICAgICAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjc3NFYXNlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OlwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdzbGljay1wcmV2IHB1bGwtbGVmdCc+PGkgY2xhc3M9J2ZhIGZhLWFuZ2xlLWxlZnQnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+PC9idXR0b24+XCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHRBcnJvdzpcIjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nc2xpY2stbmV4dCBwdWxsLXJpZ2h0Jz48aSBjbGFzcz0nZmEgZmEtYW5nbGUtcmlnaHQnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+PC9idXR0b24+XCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICQoJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLmluZmllbGQtc2xpZGVyLW5hdicpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgICAgICAgICAgICAvLyBzbGlkZXNUb1Njcm9sbDogMixcbiAgICAgICAgICAgICAgICAgICAgYXNOYXZGb3I6ICcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5pbmZpZWxkLXNsaWRlcicsXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgJCgnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuYmF0dGVycy1ib3gtc2xpZGVyJykuc2xpY2soe1xuICAgICAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuYmF0dGVycy1ib3gtc2xpZGVyLW5hdicsXG4gICAgICAgICAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzRWFzZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgcHJldkFycm93OlwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdzbGljay1wcmV2IHB1bGwtbGVmdCc+PGkgY2xhc3M9J2ZhIGZhLWFuZ2xlLWxlZnQnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+PC9idXR0b24+XCIsXG4gICAgICAgICAgICAgICAgbmV4dEFycm93OlwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdzbGljay1uZXh0IHB1bGwtcmlnaHQnPjxpIGNsYXNzPSdmYSBmYS1hbmdsZS1yaWdodCcgYXJpYS1oaWRkZW49J3RydWUnPjwvaT48L2J1dHRvbj5cIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgJCgnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuYmF0dGVycy1ib3gtc2xpZGVyLW5hdicpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICAgICAgLy8gc2xpZGVzVG9TY3JvbGw6IDIsXG4gICAgICAgICAgICAgICAgYXNOYXZGb3I6ICcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5iYXR0ZXJzLWJveC1zbGlkZXInLFxuICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgJCgnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAudHJhY2stbWF0ZXJpYWxzLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICBhc05hdkZvcjogJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLnRyYWNrLW1hdGVyaWFscy1zbGlkZXItbmF2JyxcbiAgICAgICAgICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjc3NFYXNlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6XCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J3NsaWNrLXByZXYgcHVsbC1sZWZ0Jz48aSBjbGFzcz0nZmEgZmEtYW5nbGUtbGVmdCcgYXJpYS1oaWRkZW49J3RydWUnPjwvaT48L2J1dHRvbj5cIixcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6XCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J3NsaWNrLW5leHQgcHVsbC1yaWdodCc+PGkgY2xhc3M9J2ZhIGZhLWFuZ2xlLXJpZ2h0JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPjwvYnV0dG9uPlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICAkKCcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC50cmFjay1tYXRlcmlhbHMtc2xpZGVyLW5hdicpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICAgICAgYXNOYXZGb3I6ICcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC50cmFjay1tYXRlcmlhbHMtc2xpZGVyJyxcbiAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgYXV0b3BsYXk6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgJCgnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuY29uZGl0aW9uZXJzLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICBhc05hdkZvcjogJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLmNvbmRpdGlvbmVycy1zbGlkZXItbmF2JyxcbiAgICAgICAgICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjc3NFYXNlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6XCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J3NsaWNrLXByZXYgcHVsbC1sZWZ0Jz48aSBjbGFzcz0nZmEgZmEtYW5nbGUtbGVmdCcgYXJpYS1oaWRkZW49J3RydWUnPjwvaT48L2J1dHRvbj5cIixcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6XCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J3NsaWNrLW5leHQgcHVsbC1yaWdodCc+PGkgY2xhc3M9J2ZhIGZhLWFuZ2xlLXJpZ2h0JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPjwvYnV0dG9uPlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICAkKCcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5jb25kaXRpb25lcnMtc2xpZGVyLW5hdicpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICAgICAgYXNOYXZGb3I6ICcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5jb25kaXRpb25lcnMtc2xpZGVyJyxcbiAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB9KTsgICAgICAgIFxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdCgkKSB7XG4gICAgICAgIGluaXRpYWxpemUoJCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogaW5pdFxuICAgIH0gXG5cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGN1c3RvbVNsaWRlcnM7Il0sInNvdXJjZVJvb3QiOiIifQ==