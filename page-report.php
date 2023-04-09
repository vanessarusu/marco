<?php
$qid = $_GET['qid'];
$q = get_post($qid);

/* Template Name: Quote Form - Miscellaneous Area */
get_header();
?>

<?php get_template_part('/framework/templates/quotes/quote', 'header'); ?>


<div class="custom-container quote-report-page">
	<div>

		<h2>Quote Report </h2>
		<h4><?php echo get_the_title($qid); ?></h4>
		<p>Created on: <?php echo Date('M d, Y - H:i:s', strtotime($q->post_date)); ?> <br/><small>* Quotes are valid for thirty (30) days from this date</small></p>

		<?php echo \GMCT_Marco_Quote_Manager::show_report( $qid, 'full', 1 ); ?>


	</div>

	<div class="print-report">
		<div class="print-total no-print"><i class="fa fa-print" aria-hidden="true"></i> Print Total</div>
		<div class="print-all no-print"><i class="fa fa-print" aria-hidden="true"></i> Print All</div>
		<?php //get_template_part('/framework/templates/quotes/quote', 'sidebar'); ?>

	</div>
</div>

<?php get_footer(); ?>
