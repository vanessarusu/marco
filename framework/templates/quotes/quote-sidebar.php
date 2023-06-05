<?php $qid = $_GET['qid']; ?>

<div class="custom-container">

	<h4>Material Calculation Name: <?php echo get_the_title($qid); ?>  <a style='padding-left:20px;' class='rename-quote' data-qid="<?php echo $qid; ?>" data-title="<?php echo str_replace('"', '\"', get_the_title($qid)); ?>" href="#"><i class="fa fa-pencil" aria-hidden="true"></i></a></h4>

	<div style="margin: 20px 0 30px 0; border-bottom: 1px solid #000; padding-bottom:5px;">Material Calculator Components</div>


	<?php echo generate_quote_section( $qid, 'has_infield_skin_area', 'Infield Skin Area', 1); ?>
	<?php echo generate_quote_section( $qid, 'has_pitchers_mound_area', 'Pitchers Mound Area', 2); ?>
	<?php echo generate_quote_section( $qid, 'has_home_plate_mound_area', 'Home Plate Area', 3); ?>
	<?php echo generate_quote_section( $qid, 'has_warning_track_area', 'Warning Track Area', 4); ?>
	<?php echo generate_quote_section( $qid, 'has_bull_pen_area', 'Bull Pen Area', 5); ?>
	<?php echo generate_quote_section( $qid, 'has_misc_area', 'Miscellaneous Area', 6); ?>

	<a class="button build-report" data-id="<?php echo $qid; ?>">Build Report</a>
</div>



<?php
function generate_quote_section( $qid, $field, $form_title, $form_id ){
		$url = strtolower($form_title);
		$url = str_replace(' ', '-', $url);
	 ?>


	<div class="quote-section <?php echo ( get_field($field, $qid) == 1 ?  'has-report' : ''); ?>">

		<div class="quote-header">
			<div class="quote-title"><h5><?php echo $form_title; ?></h5></div>

		<?php if ( get_field($field, $qid) == 1 ): ?>

			<?php if ( $form_id != 6 ): ?>
			<div class="quote-options">
				<a href="<?php bloginfo('url'); ?>/quote/modify/<?php echo $url; ?>/?qid=<?php echo $qid; ?>"><i class="fa fa-pencil" title="Edit" aria-hidden="true"></i></a> |
				<a href="<?php bloginfo('url'); ?>/quote/delete/?qid=<?php echo $qid; ?>&amp;f=<?php echo $form_id; ?>" onclick="return confirm('Are you sure you want to delete this?');"><i title="Delete" class="fa fa-trash" aria-hidden="true"></i></a>
			</div>
			<div class="clear"></div>
		<?php
			else:
				?>
				<div class="quote-options">
					<a href="<?php bloginfo('url'); ?>/quote/modify/miscellaneous-area-extra/?qid=<?php echo $qid; ?>"><i class="fa fa-plus-square" title="Add Another" aria-hidden="true"></i></a>
				</div>
				<div class="clear"></div>
				<?php
			endif; ?>
		</div>



		<div class="quote-report">
			<?php echo \GMCT_Marco_Quote_Manager::show_report( $qid, 'side', $form_id ); ?>
		</div>
		<?php else: ?>
			<div class="quote-options">
				<a href="<?php bloginfo('url'); ?>/quote/modify/<?php echo $url; ?>/?qid=<?php echo $qid; ?>"><i class="fa fa-plus-square" title="Add" aria-hidden="true"></i></a>
			</div>
			<div class="clear"></div>
		</div>

		<?php endif; ?>
	</div>
	<div class="clear"></div>
<?php
}?>
