
<?php
	if( have_posts() ): 
	    while ( have_posts() ) : the_post(); ?>
			
			<a href="<?php echo get_field('gmct_brochure')['url'] ; ?>" download><?php echo get_the_title(); ?></a>

	<?php        
    endwhile;
endif;
?>

<div class="clear"></div>