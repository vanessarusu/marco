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
        prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
      });
      $('.custom-product-slick-slider .batters-box-slider-nav').slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        asNavFor: '.custom-product-slick-slider .batters-box-slider',
        dots: false,
        arrows: false,
        centerMode: true,
        focusOnSelect: true
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
        slidesToScroll: 2,
        asNavFor: '.custom-product-slick-slider .track-materials-slider',
        dots: false,
        arrows: false,
        centerMode: true,
        focusOnSelect: true
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
        slidesToScroll: 2,
        asNavFor: '.custom-product-slick-slider .conditioners-slider',
        dots: false,
        arrows: false,
        centerMode: true,
        focusOnSelect: true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcXVvdGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zbGlkZXJzLmpzIl0sIm5hbWVzIjpbInBhZ2VJZHMiLCJwcm9kdWN0cyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNzIiwiY3VzdG9tU2xpZGVycyIsImluaXQiLCIkIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaW5kZXhPZiIsInFzIiwicXVvdGVTY3JpcHRzIiwiaW5pdGlhbGl6ZSIsImpRdWVyeSIsInJlYWR5Iiwic2l0ZVVSTCIsIkdyYWJEaWFncmFtSW1hZ2UiLCJlYWNoIiwiaW1hZ2VHcmFiIiwiYXR0ciIsImFwcGVuZCIsIm9uIiwicHJpbnRfcGFnZSIsInR5cGUiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwicHJpbnQiLCJ0IiwicWlkIiwibmFtZSIsInByb21wdCIsInRleHQiLCJkIiwiYWN0aW9uIiwiY29uc29sZSIsImxvZyIsImFqYXgiLCJ1cmwiLCJkYXRhIiwic3VjY2VzcyIsInJlc3BvbnNlIiwiZXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiaG92ZXIiLCJwb2ludCIsInBhcmVudHMiLCJwY2giLCJvdXRlckhlaWdodCIsInBvcyIsInBvc2l0aW9uIiwidHQiLCJmaW5kIiwidHRoIiwicHQiLCJ0b3AiLCJjc3MiLCJsZW5ndGgiLCJzbGljayIsImFzTmF2Rm9yIiwiZmFkZSIsImFycm93cyIsImNzc0Vhc2UiLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsImRvdHMiLCJjZW50ZXJNb2RlIiwiZm9jdXNPblNlbGVjdCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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QyxhQUFhLEVBQUU7TUFDbkIsQ0FBQyxDQUFDO01BSUZoRSxDQUFDLENBQUMsbURBQW1ELENBQUMsQ0FBQ3FELEtBQUssQ0FBQztRQUN6REMsUUFBUSxFQUFFLHVEQUF1RDtRQUNqRUMsSUFBSSxFQUFFLElBQUk7UUFDVkMsTUFBTSxFQUFFLElBQUk7UUFDWkMsT0FBTyxFQUFFLFFBQVE7UUFDakJDLFNBQVMsRUFBQyxpSEFBaUg7UUFDM0hDLFNBQVMsRUFBQztNQUNkLENBQUMsQ0FBQztNQUVGM0QsQ0FBQyxDQUFDLHVEQUF1RCxDQUFDLENBQUNxRCxLQUFLLENBQUM7UUFDN0RPLFlBQVksRUFBRSxDQUFDO1FBQ2ZDLGNBQWMsRUFBRSxDQUFDO1FBQ2pCUCxRQUFRLEVBQUUsbURBQW1EO1FBQzdEUSxJQUFJLEVBQUUsS0FBSztRQUNYTixNQUFNLEVBQUUsS0FBSztRQUNiTyxVQUFVLEVBQUUsSUFBSTtRQUNoQkMsYUFBYSxFQUFFO01BQ25CLENBQUMsQ0FBQztJQUdOLENBQUMsQ0FBQztFQUVOO0VBRUEsU0FBU2pFLElBQUksQ0FBQ0MsQ0FBQyxFQUFFO0lBQ2JPLFVBQVUsQ0FBQ1AsQ0FBQyxDQUFDO0VBQ2pCO0VBRUEsT0FBTztJQUNIRCxJQUFJLEVBQUVBO0VBQ1YsQ0FBQztBQUdMLENBQUU7QUFFYUQsNEVBQWEsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9idW5kbGUuanNcIik7XG4iLCJpbXBvcnQgY3VzdG9tU2xpZGVycyBmcm9tIFwiLi9zbGlkZXJzXCI7XG5pbXBvcnQgcXVvdGVTY3JpcHRzIGZyb20gXCIuL3F1b3Rlc1wiO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgcGFnZUlkcyA9IHtcbiAgICAgICAgcHJvZHVjdHM6IFwiOVwiXG4gICAgfVxuXG4gICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgYm9keS5wYWdlLWlkLSR7cGFnZUlkcy5wcm9kdWN0c31gKSkge1xuICAgICAgICB2YXIgY3MgPSBjdXN0b21TbGlkZXJzKCk7XG4gICAgICAgIGNzLmluaXQoJCk7XG4gICAgfVxuICAgIFxuICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoXCJxdW90ZVwiKSA+IC0xKSB7XG4gICAgICAgIHZhciBxcyA9IHF1b3RlU2NyaXB0cygpO1xuICAgICAgICBxcy5pbml0KCQpO1xuICAgIH1cblxufSkoKTtcblxuXG4iLCJjb25zdCBxdW90ZVNjcmlwdHMgPSAoZnVuY3Rpb24oJCkge1xuICAgIFxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUgKCkge1xuXG4gICAgICAgIGpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCkge1xuXG4gICAgICAgICAgICAvLyB2YXIgc2l0ZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdDtcbiAgICAgICAgICAgIHZhciBzaXRlVVJMID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODg4OC9tYXJjbyc7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgICAgIGZ1bmN0aW9uIEdyYWJEaWFncmFtSW1hZ2UoKSB7XG4gICAgICAgICAgICAgICAgICQoJy52aWV3LWRpYWdyYW0nKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbWFnZUdyYWIgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaW1hZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJ0b29sdGlwXCI+PGltZyBzcmM9XCInICsgc2l0ZVVSTCAgKyAnL3dwLWNvbnRlbnQvdGhlbWVzL2JiLXRoZW1lLWNoaWxkL2Rpc3QvaW1hZ2VzL2RpYWdyYW1zJyArIGltYWdlR3JhYiArICdcIiBjbGFzcz1cImRpYWdyYW0taW1hZ2VcIiAvPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAkKCcucHJpbnQtdG90YWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHByaW50X3BhZ2UoJ3RvdGFscycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKCcucHJpbnQtYWxsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBwcmludF9wYWdlKCdhbGwnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgIGZ1bmN0aW9uIHByaW50X3BhZ2UoIHR5cGUgKXtcbiAgICAgICAgICAgICAgICBpZiAoIHR5cGUgPT0gJ3RvdGFscycgKXtcbiAgICAgICAgICAgICAgICAgICAgJChcIi5yZXBvcnQtc2VjdGlvbi1jb250YWluZXIuc3VtbWFyeVwiKS5hZGRDbGFzcyhcIm5vLXByaW50XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIHR5cGUgPT0gJ2FsbCcgKXtcbiAgICAgICAgICAgICAgICAgICAgJChcIi5yZXBvcnQtc2VjdGlvbi1jb250YWluZXIuc3VtbWFyeVwiKS5yZW1vdmVDbGFzcyhcIm5vLXByaW50XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aW5kb3cucHJpbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAkKCcucmVuYW1lLXF1b3RlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCd3YXQnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXRpdGxlXCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcWlkID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1xaWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gcHJvbXB0KCdFbnRlciBhIG5ldyBuYW1lIGZvciB0aGUgcXVvdGU6JywgdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICggbmFtZSAhPT0gbnVsbCAmJiBuYW1lICE9PSAnJyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIi9xdW90ZS9yZW5hbWUvP3FpZD1cIiArIHFpZCArIFwiJmFtcDtxbmFtZT1cIiArIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gXCIvcXVvdGUvcmVuYW1lLz9xaWQ9XCIgKyBxaWQgKyBcIiZxbmFtZT1cIiArIG5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgICQoJy5idWlsZC1yZXBvcnQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciBxaWQgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWlkXCIpO1xuICAgICAgICAgICAgICAgIHZhciB0ID0gJCh0aGlzKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ2dtY3RfY3JlYXRlX3F1b3RlX3JlcG9ydCcsXG4gICAgICAgICAgICAgICAgICAgIHFpZDogcWlkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICQodGhpcykudGV4dCgnTG9hZGluZy4uLicpLmFkZENsYXNzKFwibG9hZGluZ1wiKTtcbiAgICAgICAgICAgICAgICAvL2FqYXhcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAvLyB1cmw6IFwiL3dwLWFkbWluL2FkbWluLWFqYXgucGhwXCIsXG4gICAgICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vbG9jYWxob3N0Ojg4ODgvbWFyY28vXCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW4gc3VjY2VzcycgKyByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyQodGhpcykudGV4dCh0KS5yZW1vdmVDbGFzcyhcImxvYWRpbmdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aW5kb3cubG9jYXRpb24gPSBcIi9xdW90ZS9yZXBvcnQvP3FpZD1cIiArIHFpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IFwiaHR0cDovL2xvY2FsaG9zdDo4ODg4L21hcmNvL3F1b3RlL3JlcG9ydC8/cWlkPVwiICsgcWlkO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2luIGVycm9yOiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBIYW5kbGUgaG92ZXJpbmcgb24gc3lzdGVtcyBwb2ludHNcbiAgICAgICAgICAkKFwiLnZpZXctZGlhZ3JhbSAudGhlLWxpbmstdGV4dFwiKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgLy9pZiAoICQoZG9jdW1lbnQpLndpZHRoKCkgPCAxOTIwICl7XG4gICAgICAgICAgICAgICAgICB2YXIgcG9pbnQgPSAkKHRoaXMpLnBhcmVudHMoXCIudmlldy1kaWFncmFtXCIpO1xuICAgICAgICAgICAgICAgICAgLy92YXIgaGFzaCA9IHBvaW50LmF0dHIoXCJkYXRhLWhhc2hcIik7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgLy92YXIgcGMgPSBwb2ludC5wYXJlbnRzKFwiLnBvaW50LWNvbnRhaW5lclwiKTtcbiAgICAgICAgICAgICAgICAgIHZhciBwY2ggPSBwb2ludC5vdXRlckhlaWdodCgpO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICB2YXIgcG9zID0gcG9pbnQucG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgIHZhciB0dCA9IHBvaW50LmZpbmQoXCIudG9vbHRpcFwiKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICB2YXIgdHRoID0gdHQub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHRvcCBwb3NpdGlvbiBlcXVhbCB0byBpdHMgcG9zaXRpb24gbWludXMgaGFsZiBpdHMgaGVpZ2h0ICh0byBhcHBlYXIgY2VudGVyZWQgYmVzaWRlIHRoZSBwb2ludClcbiAgICAgICAgICAgICAgICAgIHZhciBwdCA9IHBvcy50b3AgLSAodHRoLzIpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgIC8vIGlmIGl0IHdpbGwgZ28gb2ZmIHRoZSBib3R0b20sIHJlc2V0IGl0IHRvIG1ha2Ugc3VyZSBpdCBkb2Vzbid0XG4gICAgICAgICAgICAgICAgICBpZiAoICggcHQgKyB0dGggKSA+IHBjaCApe1xuICAgICAgICAgICAgICAgICAgICAgIHB0ID0gcGNoIC0gdHRoIC0gMjA7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlLCBpZiBpdCB3aWxsIGdvIG9mZiB0aGUgdG9wLCBwcmV2ZW50IGl0XG4gICAgICAgICAgICAgICAgICBpZiAoIHB0IDwgMCApe1xuICAgICAgICAgICAgICAgICAgICAgIHB0ID0gMzA7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBvcyk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBwb3NpdGlvbnMgYmFzZWQgb24gdGhlIHNpZGUgb2YgdGhlIHNjcmVlbiB0aGUgYm94ZXMgYXJlIG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmVkIHRoaXMgc2VjdGlvbiBhbmQgcmVwbGFjZWQgd2l0aCBzaW1wbGVyIG9uZSBiZWxvdyB0byBmaXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0b29sdGlwIGJlaW5nIHBsYWNlZCBvZmYgc2NyZWVuLCBub3Qgc3VyZSB3aHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBKYW1lcyBDYXJtaWNoYWVsIEFwcmlsIDIwMThcbiAgICAgICAgICAgICAgICAgIGlmICggdHQuaGFzQ2xhc3MoXCJwb3MtbHNcIikgKXtcbiAgICAgICAgICAgICAgICAgICAgdHQuY3NzKCdsZWZ0JywgcG9zLmxlZnQgKyAzNSkuY3NzKCd0b3AnLCBwdCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHR3ID0gdHQub3V0ZXJXaWR0aCgpO1xuICAgICAgICAgICAgICAgICAgICB0dC5jc3MoJ2xlZnQnLCBwb3MubGVmdCAtIHR0dyAtIDM1KS5jc3MoJ3RvcCcsIHB0KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dC5jc3MoJ2xlZnQnLCAwKS5jc3MoJ3RvcCcsIHB0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICB0dC5hZGRDbGFzcyhcInNob3duXCIpO1xuICAgICAgICAgICAgICAvL31cbiAgICAgICAgXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIHBvaW50ID0gJCh0aGlzKS5wYXJlbnRzKFwiLnZpZXctZGlhZ3JhbVwiKTtcbiAgICAgICAgICAgICAgLy92YXIgaGFzaCA9IHBvaW50LmF0dHIoXCJkYXRhLWhhc2hcIik7XG4gICAgICAgIFxuICAgICAgICAgICAgICBwb2ludC5maW5kKFwiLnRvb2x0aXBcIikucmVtb3ZlQ2xhc3MoXCJzaG93blwiKTtcbiAgICAgICAgXG4gICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgR3JhYkRpYWdyYW1JbWFnZSgpO1xuICAgICAgICBcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbnJldHVybiB7XG4gICAgaW5pdDogaW5pdGlhbGl6ZVxufVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcXVvdGVTY3JpcHRzOyIsImNvbnN0IGN1c3RvbVNsaWRlcnMgPSAoZnVuY3Rpb24oJCkge1xuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgkKSB7XG5cbiAgICAgICAgalF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG4gICAgICAgICAgICBpZigkKCcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5pbmZpZWxkLXNsaWRlcicpLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgICQoJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLmluZmllbGQtc2xpZGVyJykuc2xpY2soe1xuICAgICAgICAgICAgICAgICAgICBhc05hdkZvcjogJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLmluZmllbGQtc2xpZGVyLW5hdicsXG4gICAgICAgICAgICAgICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3NzRWFzZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgICAgIHByZXZBcnJvdzpcIjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nc2xpY2stcHJldiBwdWxsLWxlZnQnPjxpIGNsYXNzPSdmYSBmYS1hbmdsZS1sZWZ0JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPjwvYnV0dG9uPlwiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0QXJyb3c6XCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J3NsaWNrLW5leHQgcHVsbC1yaWdodCc+PGkgY2xhc3M9J2ZhIGZhLWFuZ2xlLXJpZ2h0JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPjwvYnV0dG9uPlwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAkKCcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5pbmZpZWxkLXNsaWRlci1uYXYnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuaW5maWVsZC1zbGlkZXInLFxuICAgICAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyTW9kZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgJCgnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuYmF0dGVycy1ib3gtc2xpZGVyJykuc2xpY2soe1xuICAgICAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuYmF0dGVycy1ib3gtc2xpZGVyLW5hdicsXG4gICAgICAgICAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzRWFzZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgcHJldkFycm93OlwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdzbGljay1wcmV2IHB1bGwtbGVmdCc+PGkgY2xhc3M9J2ZhIGZhLWFuZ2xlLWxlZnQnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+PC9idXR0b24+XCIsXG4gICAgICAgICAgICAgICAgbmV4dEFycm93OlwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdzbGljay1uZXh0IHB1bGwtcmlnaHQnPjxpIGNsYXNzPSdmYSBmYS1hbmdsZS1yaWdodCcgYXJpYS1oaWRkZW49J3RydWUnPjwvaT48L2J1dHRvbj5cIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgJCgnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuYmF0dGVycy1ib3gtc2xpZGVyLW5hdicpLnNsaWNrKHtcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDIsXG4gICAgICAgICAgICAgICAgYXNOYXZGb3I6ICcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5iYXR0ZXJzLWJveC1zbGlkZXInLFxuICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICAkKCcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC50cmFjay1tYXRlcmlhbHMtc2xpZGVyJykuc2xpY2soe1xuICAgICAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAudHJhY2stbWF0ZXJpYWxzLXNsaWRlci1uYXYnLFxuICAgICAgICAgICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNzc0Vhc2U6ICdsaW5lYXInLFxuICAgICAgICAgICAgICAgIHByZXZBcnJvdzpcIjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nc2xpY2stcHJldiBwdWxsLWxlZnQnPjxpIGNsYXNzPSdmYSBmYS1hbmdsZS1sZWZ0JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPjwvYnV0dG9uPlwiLFxuICAgICAgICAgICAgICAgIG5leHRBcnJvdzpcIjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nc2xpY2stbmV4dCBwdWxsLXJpZ2h0Jz48aSBjbGFzcz0nZmEgZmEtYW5nbGUtcmlnaHQnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+PC9idXR0b24+XCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgICQoJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLnRyYWNrLW1hdGVyaWFscy1zbGlkZXItbmF2Jykuc2xpY2soe1xuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMixcbiAgICAgICAgICAgICAgICBhc05hdkZvcjogJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLnRyYWNrLW1hdGVyaWFscy1zbGlkZXInLFxuICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgICAgICQoJy5jdXN0b20tcHJvZHVjdC1zbGljay1zbGlkZXIgLmNvbmRpdGlvbmVycy1zbGlkZXInKS5zbGljayh7XG4gICAgICAgICAgICAgICAgYXNOYXZGb3I6ICcuY3VzdG9tLXByb2R1Y3Qtc2xpY2stc2xpZGVyIC5jb25kaXRpb25lcnMtc2xpZGVyLW5hdicsXG4gICAgICAgICAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgY3NzRWFzZTogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgcHJldkFycm93OlwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdzbGljay1wcmV2IHB1bGwtbGVmdCc+PGkgY2xhc3M9J2ZhIGZhLWFuZ2xlLWxlZnQnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+PC9idXR0b24+XCIsXG4gICAgICAgICAgICAgICAgbmV4dEFycm93OlwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdzbGljay1uZXh0IHB1bGwtcmlnaHQnPjxpIGNsYXNzPSdmYSBmYS1hbmdsZS1yaWdodCcgYXJpYS1oaWRkZW49J3RydWUnPjwvaT48L2J1dHRvbj5cIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgJCgnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuY29uZGl0aW9uZXJzLXNsaWRlci1uYXYnKS5zbGljayh7XG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAyLFxuICAgICAgICAgICAgICAgIGFzTmF2Rm9yOiAnLmN1c3RvbS1wcm9kdWN0LXNsaWNrLXNsaWRlciAuY29uZGl0aW9uZXJzLXNsaWRlcicsXG4gICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIH0pOyAgICAgICAgXG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCQpIHtcbiAgICAgICAgaW5pdGlhbGl6ZSgkKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBpbml0XG4gICAgfSBcblxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY3VzdG9tU2xpZGVyczsiXSwic291cmNlUm9vdCI6IiJ9