import customSliders from "./sliders";
import quoteScripts from "./quotes";

(function() {

    var pageIds = {
        products: "9"
    }

    if(document.querySelector(`body.page-id-${pageIds.products}`)) {
        var cs = customSliders();
        cs.init($);
    }
    
    if(window.location.href.indexOf("quote") > -1) {
        var qs = quoteScripts();
        qs.init($);
    }

})();


