<?php

/* Template Name: Dealers Ad Materials */
get_header();

?>


<?php get_template_part('/framework/templates/quotes/dealer-header', 'secondary'); ?>
<div class="clear">
	<div class="custom-container">
<?php echo do_shortcode("[brochure_listing filter='advertising']"); ?>
    </div>
</div>
<?php get_footer(); ?>
