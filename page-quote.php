<?php
/* Template Name: Quote - Manage */
get_header();

$quotes = \GMCT_Marco_Quote_Manager::get_my_quotes(wp_get_current_user());

?>


<?php get_template_part('/framework/templates/quotes/quote', 'header'); ?>


<div class="clear">
	<div class="col span_65 div-padding no-padding-top">
		<?php

			foreach ($quotes as $quote) {
			    echo "Value: $quote<br />\n";
			}
		?>
	</div>

	<div class="col span_35 div-padding no-padding-top">
		<?php //get_template_part('/framework/templates/quotes/quote', 'sidebar'); ?>

	</div>
</div>

<?php get_footer(); ?>
