<?php

/*------------------------------------------------------------
 * Inventory Page
 *------------------------------------------------------------*/

/*
[brochure_listing]
*/
if( !function_exists( 'gmct_brochure_listing' ) ) {
function gmct_brochure_listing($atts, $content = null) {

	extract( shortcode_atts( array(
		 'filter' => ''
	), $atts ) );
	
	// $ret .= '<h2>Brochure Materials</h2>';

	global $wp_query;

	if ( $filter == '' || $filter == 'all' || $filter == 'advertising' ){
		$wp_query = new WP_Query( array(
			'posts_per_page' 	=> -1
			,'post_type' 	=> 'brochures'
			,'meta_query'	=> array(
				'relation'		=> '=',
				array(
					'key'	 	=> 'gmct_brochure_category',
					'value'	  	=> 'advertising'
				)
			),
			'order' => 'ASC'

		));

		$ret .= '<h3>Advertising</h3>';
		$ret .= '<div class="resources-list">';
		$ret .= meta_get_template_contents('/framework/templates/shortcodes/brochure', 'listing');
		$ret .= '</div>';

		wp_reset_postdata();
		wp_reset_query();
	}

	if ( $filter == '' || $filter == 'all' || $filter == 'spec-data' ){
		$wp_query = new WP_Query( array(
			'posts_per_page' 	=> -1
			,'post_type' 	=> 'brochures'
			,'meta_query'	=> array(
				'relation'		=> '=',
				array(
					'key'	 	=> 'gmct_brochure_category',
					'value'	  	=> 'data'
				)
			),
			'order' => 'ASC'

		));
		$ret .= '<h2>Product Spec Data Sheets</h2>';
		$ret .= '<h3>Specification Data</h3>';
		$ret .= '<div class="resources-list">';
		$ret .= meta_get_template_contents('/framework/templates/shortcodes/brochure', 'listing');
		$ret .= '</div>';

		wp_reset_postdata();
		wp_reset_query();
	}

	if ( $filter == '' || $filter == 'all' || $filter == 'drawings' ){
		$wp_query = new WP_Query( array(
			'posts_per_page' 	=> -1
			,'post_type' 	=> 'brochures'
			,'meta_query'	=> array(
				'relation'		=> '=',
				array(
					'key'	 	=> 'gmct_brochure_category',
					'value'	  	=> 'drawings'
				)
			),
			'order' => 'ASC'

		));
		
		$ret .= '<h2>Design Drawings</h2>';
		$ret .= '<h3>Drawings</h3>';
		$ret .= '<div class="resources-list">';
		$ret .= meta_get_template_contents('/framework/templates/shortcodes/brochure', 'listing');
		$ret .= '</div>';

		wp_reset_postdata();
		wp_reset_query();
	}

    
	return apply_filters('the_content',$ret);

}
}

add_shortcode('brochure_listing', 'gmct_brochure_listing');

