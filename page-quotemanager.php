<?php
die('x');
/* Template Name: Quote - Manager */
get_header();

//\GMCT_Marco_Quote_Manager::duplicate_post(1115);
echo('HIIIIIII QUEr/y VAR');
print_r(get_query_var('uid'));
// if ( $_GET['uid'] != '' ){
	if ( get_query_var('uid')) {

	// $user = get_user_by('id', $_GET['uid']);
	$user = get_query_var('uid');

} else {
	$user = wp_get_current_user();
}

if ( !is_a($user, 'WP_User') ){
	$user = wp_get_current_user();
}

$quotes = \GMCT_Marco_Quote_Manager::get_my_quotes($user);

?>

<?php get_template_part('/framework/templates/quotes/quote', 'header'); ?>

<div class="clear">
	<div class="col span-12 div-padding no-padding-top">

		<h1>Material Calculator</h1>

		<p>Material Calculator is a tool to help you determine the quantity of product you will need for your next baseball diamond project.  Calculate how much of each material you need for an entire field including the infield skin, pitcher’s mound, home plate area, warning track.</p>

		<a href="<?php bloginfo('url'); ?>/quote/create/" class="button no-print">Create a New Quote</a>

		<hr />


		<h3>Your Quotes</h3>
		<hr />

		<div class="quotes-list">
		<?php



			if ( $quotes->have_posts() ){
				while ( $quotes->have_posts() ) {
					$quotes->the_post();
					?>
					<div class="a-quote">
						<div class="quote-title">
							<strong><?php echo $post->post_title . "</strong> - " . date("M d, Y - H:i:s", strtotime($post->post_date)); ?>
						</div>
						<div class="quote-options">
						<a href='<?php bloginfo('url'); ?>/quote/modify/?qid=<?php echo $post->ID; ?>'>Edit</a> | <a href='<?php bloginfo('url'); ?>/quote/delete/?qid=<?php echo $post->ID; ?>'>Delete</a>
						<?php if ( get_post_meta($post->ID, 'has_report', true) ) {
							?> | <a href='<?php bloginfo('url'); ?>/quote/report/?qid=<?php echo $post->ID; ?>'>View Report</a> <?php
						}
						?>
						</div>
						<div class="clear"></div>
					</div>
					<?php

				}
				wp_reset_postdata();
			}
		?>
		</div>
		<br/><br/>
		<?php
		$archived_quotes = get_user_meta($user->ID, 'archived_quotes', true );

		if ( $archived_quotes != '' ): ?>
			<h3>Archived Quotes</h3>

			<div class="quotes-list">
			<?php


			$aq = explode(',', $archived_quotes);
			foreach( $aq as $quote ):
				echo "<a href='" . get_bloginfo('url') . "/marcoold/dealers/quotes/report.php?id=" . $quote . "'>Quote #" . $quote . "</a><br/>";
			endforeach;



			?>
			</div>
		<?php
		endif; ?>
	</div>


</div>

<?php get_footer(); ?>
