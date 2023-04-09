<?php
/* Template Name: Portal */

if( !is_user_logged_in() ){
	$redirect = get_bloginfo('url');
	wp_redirect( $redirect , 302 );
	exit;
}
get_header(); ?>

<div class="clear20"></div>

<div class="clear div-padding">
	<?php while (have_posts()) : the_post(); ?>			
		<?php the_content(); ?>
	<?php endwhile; ?>
</div>

<div class="clear">
	<div class="col span_33 div-padding">
		<h2>Advertising Material</h2>
		<?php
		$ad_desc = get_field('portal_ad_description');
		if($ad_desc != ''){
			echo '<p>' . $ad_desc . '</p>';
		}
		if(get_field('portal_ad_files')):
		while(has_sub_field('portal_ad_files')):
			$file_url = get_sub_field('portal_ad_file');

			echo '<p class="no-margin"><a href="' . $file_url . '">' . get_sub_field('portal_ad_title') . '</a></p>';
		endwhile;
		endif;
		?>
	</div>
	<div class="col span_33 div-padding">
		<h2>Specification Data</h2>
		<?php
		$specs_desc = get_field('portal_specs_description');
		if($specs_desc != ''){
			echo '<p>' . $specs_desc . '</p>';
		}
		if(get_field('portal_specs_files')):
		while(has_sub_field('portal_specs_files')):
			$file_url = get_sub_field('portal_specs_file');

			echo '<p class="no-margin"><a href="' . $file_url . '">' . get_sub_field('portal_specs_title') . '</a></p>';
		endwhile;
		endif;
		?>
	</div>
	<div class="col span_33 div-padding">
		<h2>Drawings</h2>
		<?php
		$drawings_desc = get_field('portal_drawings_description');
		if($drawings_desc != ''){
			echo '<p>' . $drawings_desc . '</p>';
		}
		if(get_field('portal_drawings_files')):
		while(has_sub_field('portal_drawings_files')):
			$file_url = get_sub_field('portal_drawings_file');

			echo '<p class="no-margin"><a href="' . $file_url . '">' . get_sub_field('portal_drawings_title') . '</a></p>';
		endwhile;
		endif;
		?>
	</div>
</div>

<?php get_footer(); ?>