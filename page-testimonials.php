<?php
/* Template Name: Testimonials */
get_header(); ?>

<?php
// Top Image
echo '<div class="top-image t-i-store" style="background-image:url(\'' . get_bloginfo('template_url') . '/images/store-header.jpg\')"><div class="top-image-text white-text">';
echo '<h1>Testimonials</h1>';
echo '</div></div>';
?>

<main>

	<section class="testimonials-list-wrap">

		<?php
		// Testimonials Feed
		$testimonial_args = array(
			'post_type' => 'testimonial',
			'posts_per_page' => -1,
			'orderby' => 'menu_order'
		);
		$wp_query = new WP_Query($testimonial_args);

		if($wp_query->have_posts()){

			echo '<ul class="testimonials-list">';

				while($wp_query->have_posts()) : $wp_query->the_post();

					echo '<li>';

						get_template_part('loop', 'testimonial');

					echo '</li>';

				endwhile;

			echo '</ul>';

		}

		wp_reset_query();
		?>

	</section>

</main>

<?php get_footer(); ?>
