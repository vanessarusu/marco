<?php

/* META HELPER FUNCTIONS */

function meta_get_template_contents($path1, $path2) {
    ob_start();  
    get_template_part($path1, $path2);  
    $ret = ob_get_contents();  
    ob_end_clean();  
    return $ret;    
}

function meta_get_posts_count() {
    global $wp_query;
    return $wp_query->post_count;
}


function excerpt_read_more_link($output) {
  global $post;
  //if ($post->post_type != 'custom_post_type')
  //{
  //  $output .= '<p><a href="'. get_permalink($post->ID) . '">read more</a></p>';  
    $output = " ";
  //}
  return $output;
}
add_filter('excerpt_more', 'excerpt_read_more_link');

// add_filter( 'pre_get_posts' , 'search_exc_cats' );

// function search_exc_cats( $query ) {
// 	if( $query->is_admin )
// 		return $query;
// 	if( $query->is_search ) {
// 		//$query->set( 'category__not_in' , array( 1, 2, 3 ) ); // Example multiple cats
// 		$query->set( 'category__not_in' , array( 5 ) ); // Single cat
// 	}
// 	return $query;
// }

/* END META HELPER FUNCTIONS */

