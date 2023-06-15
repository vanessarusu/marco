<?php
		// Special Order Message
		$terms = wp_get_post_terms( $post->ID, 'product_cat' );
		foreach ( $terms as $term ) $categories[] = $term->slug;
		if ( in_array( 'special-order', $categories ) ) {
		?>

			<div class="special-order-box product-page">
				<h2>Special Order Product</h3>
				<p><strong>The shipping costs for this product cannot be accurately quoted online.</strong> You can still add this product to your cart and submit your order online; simply follow the instructions on the <a href="<?php bloginfo('url'); ?>/cart/">Cart</a> and Checkout pages.</p>

			</div>
		<?php	}	