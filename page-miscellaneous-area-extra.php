<?php
/* Template Name: Quote Form - Miscellaneous Area */
get_header();
?>

<?php get_template_part('/framework/templates/quotes/quote', 'header'); ?>


<div class="custom-container">
	<div class="col span_65 div-padding no-padding-top quote-gform">

		<h2><?php echo get_the_title(); ?></h2>
		<?php
		if ( $_GET['qfid'] == '' ){
			$tmp = \GMCT_Marco_Quote_Manager::create_extra_misc_quote($_GET['qid']);
			echo do_shortcode('[gravityform id=8 title=false description=false ajax=true tabindex=49 update="'. $tmp . '" field_values="quote_id='. $_GET['qid'] .'"]');
		} else {
			echo do_shortcode('[gravityform id=8 title=false description=false ajax=true tabindex=49 update="'. $_GET['qfid'] .'" field_values="quote_id='. $_GET['qid'] .'"]');
		}

		?>

	</div>

	<div class="col span_35 div-padding no-padding-top">
		<?php get_template_part('/framework/templates/quotes/quote', 'sidebar'); ?>
	</div>
</div>

<?php get_footer(); ?>
