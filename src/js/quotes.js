const quoteScripts = (function($) {
    
    function initialize () {

        jQuery(document).ready(function($) {

            // var siteURL = window.location.protocol + '//' + window.location.host;
            var siteURL = 'https://marcoclay.com/';
        
        
            function GrabDiagramImage() {
                 $('.view-diagram').each(function(){
                    var imageGrab = $(this).attr('data-image');
                    $(this).append('<div class="tooltip"><img src="' + siteURL  + 'marco23/wp-content/themes/marco/dist/images/diagrams' + imageGrab + '" class="diagram-image" /></div>');
                 });
            }
        
            $('.print-total').on('click', function(){
                print_page('totals');
            });
            $('.print-all').on('click', function(){
                print_page('all');
            });
        
            function print_page( type ){
                if ( type == 'totals' ){
                    $(".report-section-container.summary").addClass("no-print");
                }
                if ( type == 'all' ){
                    $(".report-section-container.summary").removeClass("no-print");
                }
                window.print();
            }
        
            $('.rename-quote').on('click', function(){
                //console.log('wat');
                    var t = $(this).attr("data-title");
                    var qid = $(this).attr("data-qid");
                    var name = prompt('Enter a new name for the quote:', t);
                    if ( name !== null && name !== '' ){
                        //console.log("/quote/rename/?qid=" + qid + "&amp;qname=" + name);
                        window.location = "https://marcoclay.com/quote/rename/?qid=" + qid + "&qname=" + name;
                    }
            });
        
            $('.build-report').on('click', function(){
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
                    url: "https:///marcoclay.com/marco23/wp-admin/admin-ajax.php",
                    // url: "http://localhost:8888/marco/",
                    type: "POST",
                    data: d,
                    success: function(response){
                        console.log('in success' + response);
                        //$(this).text(t).removeClass("loading");
                         // window.location = "/quote/report/?qid=" + qid;
                         window.location = "https://marcoclay.com/quote/report/?qid=" + qid;
                    },
                    error: function(error){
                        console.log('in error: ' + JSON.stringify(error));
                    }
                });
        
            });
        
        
            // Handle hovering on systems points
          $(".view-diagram .the-link-text").hover(function() {
              //if ( $(document).width() < 1920 ){
                  var point = $(this).parents(".view-diagram");
                  //var hash = point.attr("data-hash");
        
                  //var pc = point.parents(".point-container");
                  var pch = point.outerHeight();
        
        
                  var pos = point.position();
                  var tt = point.find(".tooltip");
        
                  var tth = tt.outerHeight();
        
                  // set the top position equal to its position minus half its height (to appear centered beside the point)
                  var pt = pos.top - (tth/2);
        
                  // if it will go off the bottom, reset it to make sure it doesn't
                  if ( ( pt + tth ) > pch ){
                      pt = pch - tth - 20;
                  }
        
                  // otherwise, if it will go off the top, prevent it
                  if ( pt < 0 ){
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
        
          },
          function() {
              var point = $(this).parents(".view-diagram");
              //var hash = point.attr("data-hash");
        
              point.find(".tooltip").removeClass("shown");
        
          });
        
            GrabDiagramImage();
        
        });

    }

return {
    init: initialize
}

});

export default quoteScripts;