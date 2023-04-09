<article class="loop-post">

	<h2 class="post-title"><a href="<?php the_permalink(); ?>" title="Permanent Link to <?php the_title(); ?>"><?php the_title(); ?></a></h2>

	<?php echo get_the_post_thumbnail($post->ID,'thumbnail',array('class' => 'post-thumbnail') ); ?>

	<p><?php echo get_the_excerpt(); ?></p>

	<a href="<?php the_permalink(); ?>" title="Permanent Link to <?php the_title(); ?>" class="button post-read">Read more</a>

</article>
