<?php
/* Template Name: Quote - Create */
get_header(); ?>

<?php get_template_part('/framework/templates/quotes/quote', 'header'); ?>

<div class="custom-container">
	<h2>New Material Calculation</h2>
	<?php gravity_form('Quote', false, false, false, '', false); ?>

</div>

<?php get_footer(); ?>
