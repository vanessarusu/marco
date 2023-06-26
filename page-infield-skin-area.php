<?php

/* Template Name: Quote Form - Infield Skin Area */
get_header();

get_template_part('/framework/templates/quotes/quote', 'header'); ?>

<div class="custom-container">
	<div class="col span_65 div-padding no-padding-top quote-gform">
		<h2><?php echo get_the_title(); ?></h2>
		<?php echo do_shortcode('[gravityform id=1 title=false description=false ajax=true tabindex=49 update='. $_GET['qid'] .' field_values="quote_id='. $_GET['qid'] .'"]');?>
		<?php //gravity_form('Infield Skin Area', false, false, false, '', false); ?>
	</div>

	<div class="col span_35 div-padding no-padding-top">
		<img src="<?php echo get_stylesheet_directory_uri() . '/dist/images/diagrams/infield_skin_area/infield_skin_area_diagram.gif' ; ?>" class="field-diagram" />
		<?php get_template_part('/framework/templates/quotes/quote', 'sidebar'); ?>

	</div>
</div>

<?php get_footer(); ?>
