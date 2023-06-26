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
      var siteURL = 'https://marcoclay.com/';
      function GrabDiagramImage() {
        $('.view-diagram').each(function () {
          var imageGrab = $(this).attr('data-image');
          $(this).append('<div class="tooltip"><img src="' + siteURL + 'marco23/wp-content/themes/bb-theme-child/dist/images/diagrams' + imageGrab + '" class="diagram-image" /></div>');
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
          window.location = "https://marcoclay.com/quote/rename/?qid=" + qid + "&qname=" + name;
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
          url: "https://marcoclay.com/marco23/wp-admin/admin-ajax.php",
          // url: "http://localhost:8888/marco/",
          type: "POST",
          data: d,
          success: function success(response) {
            console.log('in success' + response);
            //$(this).text(t).removeClass("loading");
            // window.location = "/quote/report/?qid=" + qid;
            window.location = "https://marcoclay.com/quote/report/?qid=" + qid;
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
        infinite: true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcXVvdGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zbGlkZXJzLmpzIl0sIm5hbWVzIjpbInBhZ2VJZHMiLCJwcm9kdWN0cyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNzIiwiY3VzdG9tU2xpZGVycyIsImluaXQiLCIkIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaW5kZXhPZiIsInFzIiwicXVvdGVTY3JpcHRzIiwiaW5pdGlhbGl6ZSIsImpRdWVyeSIsInJlYWR5Iiwic2l0ZVVSTCIsIkdyYWJEaWFncmFtSW1hZ2UiLCJlYWNoIiwiaW1hZ2VHcmFiIiwiYXR0ciIsImFwcGVuZCIsIm9uIiwicHJpbnRfcGFnZSIsInR5cGUiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwicHJpbnQiLCJ0IiwicWlkIiwibmFtZSIsInByb21wdCIsInRleHQiLCJkIiwiYWN0aW9uIiwiY29uc29sZSIsImxvZyIsImFqYXgiLCJ1cmwiLCJkYXRhIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiZXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiaG92ZXIiLCJwb2ludCIsInBhcmVudHMiLCJwY2giLCJvdXRlckhlaWdodCIsInBvcyIsInBvc2l0aW9uIiwidHQiLCJmaW5kIiwidHRoIiwicHQiLCJ0b3AiLCJjc3MiLCJsZW5ndGgiLCJzbGljayIsImFzTmF2Rm9yIiwiZmFkZSIsImFycm93cyIsImNzc0Vhc2UiLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJzbGlkZXNUb1Nob3ciLCJkb3RzIiwiY2VudGVyTW9kZSIsImZvY3VzT25TZWxlY3QiLCJpbmZpbml0ZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7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QUFFO01BQ2QsQ0FBQyxDQUFDO01BSUZoRSxDQUFDLENBQUMsbURBQW1ELENBQUMsQ0FBQ3FELEtBQUssQ0FBQztRQUN6REMsUUFBUSxFQUFFLHVEQUF1RDtRQUNqRUMsSUFBSSxFQUFFLElBQUk7UUFDVkMsTUFBTSxFQUFFLElBQUk7UUFDWkMsT0FBTyxFQUFFLFFBQVE7UUFDakJDLFNBQVMsRUFBQyxpSEFBaUg7UUFDM0hDLFNBQVMsRUFBQztNQUNkLENBQUMsQ0FBQztNQUVGM0QsQ0FBQyxDQUFDLHVEQUF1RCxDQUFDLENBQUNxRCxLQUFLLENBQUM7UUFDN0RPLFlBQVksRUFBRSxDQUFDO1FBQ2ZOLFFBQVEsRUFBRSxtREFBbUQ7UUFDN0RPLElBQUksRUFBRSxLQUFLO1FBQ1hMLE1BQU0sRUFBRSxLQUFLO1FBQ2JNLFVBQVUsRUFBRSxLQUFLO1FBQ2pCQyxhQUFhLEVBQUUsSUFBSTtRQUNuQkMsUUFBUSxFQUFFO01BQ2QsQ0FBQyxDQUFDO0lBR04sQ0FBQyxDQUFDO0VBRU47RUFFQSxTQUFTakUsSUFBSSxDQUFDQyxDQUFDLEVBQUU7SUFDYk8sVUFBVSxDQUFDUCxDQUFDLENBQUM7RUFDakI7RUFFQSxPQUFPO0lBQ0hELElBQUksRUFBRUE7RUFDVixDQUFDO0FBR0wsQ0FBRTtBQUVhRCw0RUFBYSxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2J1bmRsZS5qc1wiKTtcbiIsImltcG9ydCBjdXN0b21TbGlkZXJzIGZyb20gXCIuL3NsaWRlcnNcIjtcbmltcG9ydCBxdW90ZVNjcmlwdHMgZnJvbSBcIi4vcXVvdGVzXCI7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHZhciBwYWdlSWRzID0ge1xuICAgICAgICBwcm9kdWN0czogXCI5XCJcbiAgICB9XG5cbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBib2R5LnBhZ2UtaWQtJHtwYWdlSWRzLnByb2R1Y3RzfWApKSB7XG4gICAgICAgIHZhciBjcyA9IGN1c3RvbVNsaWRlcnMoKTtcbiAgICAgICAgY3MuaW5pdCgkKTtcbiAgICB9XG4gICAgXG4gICAgaWYod2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZihcInF1b3RlXCIpID4gLTEpIHtcbiAgICAgICAgdmFyIHFzID0gcXVvdGVTY3JpcHRzKCk7XG4gICAgICAgIHFzLmluaXQoJCk7XG4gICAgfVxuXG59KSgpO1xuXG5cbiIsImNvbnN0IHF1b3RlU2NyaXB0cyA9IChmdW5jdGlvbigkKSB7XG4gICAgXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSAoKSB7XG5cbiAgICAgICAgalF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG5cbiAgICAgICAgICAgIC8vIHZhciBzaXRlVVJMID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuICAgICAgICAgICAgdmFyIHNpdGVVUkwgPSAnaHR0cHM6Ly9sd2RnZGV2LmNhL21hcmNvLXRlc3RpbmcvJztcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgZnVuY3Rpb24gR3JhYkRpYWdyYW1JbWFnZSgpIHtcbiAgICAgICAgICAgICAgICAgJCgnLnZpZXctZGlhZ3JhbScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGltYWdlR3JhYiA9ICQodGhpcykuYXR0cignZGF0YS1pbWFnZScpO1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFwcGVuZCgnPGRpdiBjbGFzcz1cInRvb2x0aXBcIj48aW1nIHNyYz1cIicgKyBzaXRlVVJMICArICcvd3AtY29udGVudC90aGVtZXMvYmItdGhlbWUtY2hpbGQvZGlzdC9pbWFnZXMvZGlhZ3JhbXMnICsgaW1hZ2VHcmFiICsgJ1wiIGNsYXNzPVwiZGlhZ3JhbS1pbWFnZVwiIC8+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICQoJy5wcmludC10b3RhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcHJpbnRfcGFnZSgndG90YWxzJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoJy5wcmludC1hbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHByaW50X3BhZ2UoJ2FsbCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgZnVuY3Rpb24gcHJpbnRfcGFnZSggdHlwZSApe1xuICAgICAgICAgICAgICAgIGlmICggdHlwZSA9PSAndG90YWxzJyApe1xuICAgICAgICAgICAgICAgICAgICAkKFwiLnJlcG9ydC1zZWN0aW9uLWNvbnRhaW5lci5zdW1tYXJ5XCIpLmFkZENsYXNzKFwibm8tcHJpbnRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICggdHlwZSA9PSAnYWxsJyApe1xuICAgICAgICAgICAgICAgICAgICAkKFwiLnJlcG9ydC1zZWN0aW9uLWNvbnRhaW5lci5zdW1tYXJ5XCIpLnJlbW92ZUNsYXNzKFwibm8tcHJpbnRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdpbmRvdy5wcmludCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICQoJy5yZW5hbWUtcXVvdGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3dhdCcpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdCA9ICQodGhpcykuYXR0cihcImRhdGEtdGl0bGVcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBxaWQgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXFpZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBwcm9tcHQoJ0VudGVyIGEgbmV3IG5hbWUgZm9yIHRoZSBxdW90ZTonLCB0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBuYW1lICE9PSBudWxsICYmIG5hbWUgIT09ICcnICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiL3F1b3RlL3JlbmFtZS8/cWlkPVwiICsgcWlkICsgXCImYW1wO3FuYW1lPVwiICsgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBcImh0dHBzOi8vbHdkZ2Rldi5jYS9tYXJjby10ZXN0aW5nL3F1b3RlL3JlbmFtZS8/cWlkPVwiICsgcWlkICsgXCImcW5hbWU9XCIgKyBuYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICAkKCcuYnVpbGQtcmVwb3J0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgcWlkID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKTtcbiAgICAgICAgICAgICAgICB2YXIgdCA9ICQodGhpcykudGV4dCgpO1xuICAgICAgICAgICAgICAgIHZhciBkID0ge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICdnbWN0X2NyZWF0ZV9xdW90ZV9yZXBvcnQnLFxuICAgICAgICAgICAgICAgICAgICBxaWQ6IHFpZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnRleHQoJ0xvYWRpbmcuLi4nKS5hZGRDbGFzcyhcImxvYWRpbmdcIik7XG4gICAgICAgICAgICAgICAgLy9hamF4XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vbHdkZ2Rldi5jYS9tYXJjby10ZXN0aW5nL3dwLWFkbWluL2FkbWluLWFqYXgucGhwXCIsXG4gICAgICAgICAgICAgICAgICAgIC8vIHVybDogXCJodHRwOi8vbG9jYWxob3N0Ojg4ODgvbWFyY28vXCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW4gc3VjY2VzcycgKyByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyQodGhpcykudGV4dCh0KS5yZW1vdmVDbGFzcyhcImxvYWRpbmdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2luZG93LmxvY2F0aW9uID0gXCIvcXVvdGUvcmVwb3J0Lz9xaWQ9XCIgKyBxaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gXCJodHRwczovL2x3ZGdkZXYuY2EvbWFyY28tdGVzdGluZy9xdW90ZS9yZXBvcnQvP3FpZD1cIiArIHFpZDtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbiBlcnJvcjogJyArIEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgLy8gSGFuZGxlIGhvdmVyaW5nIG9uIHN5c3RlbXMgcG9pbnRzXG4gICAgICAgICAgJChcIi52aWV3LWRpYWdyYW0gLnRoZS1saW5rLXRleHRcIikuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIC8vaWYgKCAkKGRvY3VtZW50KS53aWR0aCgpIDwgMTkyMCApe1xuICAgICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gJCh0aGlzKS5wYXJlbnRzKFwiLnZpZXctZGlhZ3JhbVwiKTtcbiAgICAgICAgICAgICAgICAgIC8vdmFyIGhhc2ggPSBwb2ludC5hdHRyKFwiZGF0YS1oYXNoXCIpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgIC8vdmFyIHBjID0gcG9pbnQucGFyZW50cyhcIi5wb2ludC1jb250YWluZXJcIik7XG4gICAgICAgICAgICAgICAgICB2YXIgcGNoID0gcG9pbnQub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IHBvaW50LnBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICB2YXIgdHQgPSBwb2ludC5maW5kKFwiLnRvb2x0aXBcIik7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgdmFyIHR0aCA9IHR0Lm91dGVySGVpZ2h0KCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgLy8gc2V0IHRoZSB0b3AgcG9zaXRpb24gZXF1YWwgdG8gaXRzIHBvc2l0aW9uIG1pbnVzIGhhbGYgaXRzIGhlaWdodCAodG8gYXBwZWFyIGNlbnRlcmVkIGJlc2lkZSB0aGUgcG9pbnQpXG4gICAgICAgICAgICAgICAgICB2YXIgcHQgPSBwb3MudG9wIC0gKHR0aC8yKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAvLyBpZiBpdCB3aWxsIGdvIG9mZiB0aGUgYm90dG9tLCByZXNldCBpdCB0byBtYWtlIHN1cmUgaXQgZG9lc24ndFxuICAgICAgICAgICAgICAgICAgaWYgKCAoIHB0ICsgdHRoICkgPiBwY2ggKXtcbiAgICAgICAgICAgICAgICAgICAgICBwdCA9IHBjaCAtIHR0aCAtIDIwO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSwgaWYgaXQgd2lsbCBnbyBvZmYgdGhlIHRvcCwgcHJldmVudCBpdFxuICAgICAgICAgICAgICAgICAgaWYgKCBwdCA8IDAgKXtcbiAgICAgICAgICAgICAgICAgICAgICBwdCA9IDMwO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwb3MpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgcG9zaXRpb25zIGJhc2VkIG9uIHRoZSBzaWRlIG9mIHRoZSBzY3JlZW4gdGhlIGJveGVzIGFyZSBvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlZCB0aGlzIHNlY3Rpb24gYW5kIHJlcGxhY2VkIHdpdGggc2ltcGxlciBvbmUgYmVsb3cgdG8gZml4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG9vbHRpcCBiZWluZyBwbGFjZWQgb2ZmIHNjcmVlbiwgbm90IHN1cmUgd2h5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSmFtZXMgQ2FybWljaGFlbCBBcHJpbCAyMDE4XG4gICAgICAgICAgICAgICAgICBpZiAoIHR0Lmhhc0NsYXNzKFwicG9zLWxzXCIpICl7XG4gICAgICAgICAgICAgICAgICAgIHR0LmNzcygnbGVmdCcsIHBvcy5sZWZ0ICsgMzUpLmNzcygndG9wJywgcHQpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR0dyA9IHR0Lm91dGVyV2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgdHQuY3NzKCdsZWZ0JywgcG9zLmxlZnQgLSB0dHcgLSAzNSkuY3NzKCd0b3AnLCBwdCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHQuY3NzKCdsZWZ0JywgMCkuY3NzKCd0b3AnLCBwdCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgdHQuYWRkQ2xhc3MoXCJzaG93blwiKTtcbiAgICAgICAgICAgICAgLy99XG4gICAgICAgIFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBwb2ludCA9ICQodGhpcykucGFyZW50cyhcIi52aWV3LWRpYWdyYW1cIik7XG4gICAgICAgICAgICAgIC8vdmFyIGhhc2ggPSBwb2ludC5hdHRyKFwiZGF0YS1oYXNoXCIpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgcG9pbnQuZmluZChcIi50b29sdGlwXCIpLnJlbW92ZUNsYXNzKFwic2hvd25cIik7XG4gICAgICAgIFxuICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgIEdyYWJEaWFncmFtSW1hZ2UoKTtcbiAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5yZXR1cm4ge1xuICAgIGluaXQ6IGluaXRpYWxpemVcbn1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHF1b3RlU2NyaXB0czsiLCJjb25zdCBjdXN0b21TbGlkZXJzID0gKGZ1bmN0aW9uKCQpIHtcblxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoJCkge1xuXG4gICAgICAgIGpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCkge1xuICAgICAgICAgICAgaWYoJCgnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuaW5maWVsZC1zbGlkZXInKS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAkKCcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5pbmZpZWxkLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgYXNOYXZGb3I6ICcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5pbmZpZWxkLXNsaWRlci1uYXYnLFxuICAgICAgICAgICAgICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNzc0Vhc2U6ICdsaW5lYXInLFxuICAgICAgICAgICAgICAgICAgICBwcmV2QXJyb3c6XCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J3NsaWNrLXByZXYgcHVsbC1sZWZ0Jz48aSBjbGFzcz0nZmEgZmEtYW5nbGUtbGVmdCcgYXJpYS1oaWRkZW49J3RydWUnPjwvaT48L2J1dHRvbj5cIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFycm93OlwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdzbGljay1uZXh0IHB1bGwtcmlnaHQnPjxpIGNsYXNzPSdmYSBmYS1hbmdsZS1yaWdodCcgYXJpYS1oaWRkZW49J3RydWUnPjwvaT48L2J1dHRvbj5cIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJCgnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuaW5maWVsZC1zbGlkZXItbmF2Jykuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuaW5maWVsZC1zbGlkZXInLFxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgICAgICQoJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLmJhdHRlcnMtYm94LXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICBhc05hdkZvcjogJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLmJhdHRlcnMtYm94LXNsaWRlci1uYXYnLFxuICAgICAgICAgICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzc0Vhc2U6ICdsaW5lYXInLFxuICAgICAgICAgICAgICAgIHByZXZBcnJvdzpcIjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nc2xpY2stcHJldiBwdWxsLWxlZnQnPjxpIGNsYXNzPSdmYSBmYS1hbmdsZS1sZWZ0JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPjwvYnV0dG9uPlwiLFxuICAgICAgICAgICAgICAgIG5leHRBcnJvdzpcIjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nc2xpY2stbmV4dCBwdWxsLXJpZ2h0Jz48aSBjbGFzcz0nZmEgZmEtYW5nbGUtcmlnaHQnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+PC9idXR0b24+XCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgICQoJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLmJhdHRlcnMtYm94LXNsaWRlci1uYXYnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuYmF0dGVycy1ib3gtc2xpZGVyJyxcbiAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgICAgICQoJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLnRyYWNrLW1hdGVyaWFscy1zbGlkZXInKS5zbGljayh7XG4gICAgICAgICAgICAgICAgYXNOYXZGb3I6ICcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC50cmFjay1tYXRlcmlhbHMtc2xpZGVyLW5hdicsXG4gICAgICAgICAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzRWFzZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgcHJldkFycm93OlwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdzbGljay1wcmV2IHB1bGwtbGVmdCc+PGkgY2xhc3M9J2ZhIGZhLWFuZ2xlLWxlZnQnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+PC9idXR0b24+XCIsXG4gICAgICAgICAgICAgICAgbmV4dEFycm93OlwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdzbGljay1uZXh0IHB1bGwtcmlnaHQnPjxpIGNsYXNzPSdmYSBmYS1hbmdsZS1yaWdodCcgYXJpYS1oaWRkZW49J3RydWUnPjwvaT48L2J1dHRvbj5cIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgJCgnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAudHJhY2stbWF0ZXJpYWxzLXNsaWRlci1uYXYnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAudHJhY2stbWF0ZXJpYWxzLXNsaWRlcicsXG4gICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgICAgICQoJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLmNvbmRpdGlvbmVycy1zbGlkZXInKS5zbGljayh7XG4gICAgICAgICAgICAgICAgYXNOYXZGb3I6ICcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5jb25kaXRpb25lcnMtc2xpZGVyLW5hdicsXG4gICAgICAgICAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzRWFzZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgcHJldkFycm93OlwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdzbGljay1wcmV2IHB1bGwtbGVmdCc+PGkgY2xhc3M9J2ZhIGZhLWFuZ2xlLWxlZnQnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+PC9idXR0b24+XCIsXG4gICAgICAgICAgICAgICAgbmV4dEFycm93OlwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdzbGljay1uZXh0IHB1bGwtcmlnaHQnPjxpIGNsYXNzPSdmYSBmYS1hbmdsZS1yaWdodCcgYXJpYS1oaWRkZW49J3RydWUnPjwvaT48L2J1dHRvbj5cIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgJCgnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuY29uZGl0aW9uZXJzLXNsaWRlci1uYXYnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuY29uZGl0aW9uZXJzLXNsaWRlcicsXG4gICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgfSk7ICAgICAgICBcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoJCkge1xuICAgICAgICBpbml0aWFsaXplKCQpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGluaXRcbiAgICB9IFxuXG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjdXN0b21TbGlkZXJzOyJdLCJzb3VyY2VSb290IjoiIn0=