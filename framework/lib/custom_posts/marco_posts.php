<?php

//* ------- Add the custom post types -----------*//


add_action( 'init', 'create_post_type' );
function create_post_type() {

//     register_post_type( 'use_cases',
//        array(
//          'labels' => array(
//            'name' => __( 'Use Cases' ),
//            'singular_name' => __( 'Use Cases' ),
//			'add_new' => 'Add a New Use Case',
//			'add_new_item' => 'Add New Use Case',
//			'edit_item' => 'Edit Use Case',
//			'new_item' => 'New Use Case',
//			'view_item' => 'View Use Case',
//			'search_items' => 'Search for Use Case',
//			'not_found' => 'No Use Case found',
//			'not_found_in_trash' => 'No Use Case found in Trash'
//          ),
//          'public' => false,
//          'show_ui' => true,
//          'has_archive' => false,
//          'menu_icon' => 'dashicons-exerpt-view',
//          'supports' => array(
//			'title'
//			)
//        )
//    );

    register_post_type( 'quotes',
        array(
          'labels' => array(
            'name' => __( 'Quotes' ),
            'singular_name' => __( 'Quotes' ),
            'add_new' => 'Add New Quote',
			'add_new_item' => 'Add New Quote',
			'edit_item' => 'Edit Quote',
			'new_item' => 'New Quote',
			'view_item' => 'View Quote',
			'search_items' => 'Search Quotes',
			'not_found' => 'No Quote Found',
			'not_found_in_trash' => 'No Quote found in Trash'
          ),
          'public' => true,
          'show_ui' => true,
          'has_archive' => true,
          'exclude_from_search' => false,
          'menu_icon' => 'dashicons-portfolio',
          'supports' => array(
			'title'
			)
        )
    );

    register_post_type( 'quotes-misc',
        array(
          'labels' => array(
            'name' => __( 'Quotes Misc' ),
            'singular_name' => __( 'Quotes Misc' )
          ),
          'show_ui' => false,
          'has_archive' => false,
          'exclude_from_search' => true,
          'public' => false
        )
    );

    register_post_type( 'materials',
        array(
          'labels' => array(
            'name' => __( 'Materials' ),
            'singular_name' => __( 'Materials' ),
            'add_new' => 'Add New Material',
			'add_new_item' => 'Add New Material',
			'edit_item' => 'Edit Material',
			'new_item' => 'New Material',
			'view_item' => 'View Material',
			'search_items' => 'Search Materials',
			'not_found' => 'No Material Found',
			'not_found_in_trash' => 'No Material found in Trash'
          ),
          'public' => false,
          'show_ui' => true,
          'has_archive' => false,
          'exclude_from_search' => true,
          'menu_icon' => 'dashicons-screenoptions',
          'supports' => array(
			'title'
			)
        )
    );

	register_post_type( 'brochures',
        array(
          'labels' => array(
            'name' => __( 'Brochures' ),
            'singular_name' => __( 'Brochures' ),
            'add_new' => 'Add New Brochure',
			'add_new_item' => 'Add New Brochure',
			'edit_item' => 'Edit Brochure',
			'new_item' => 'New Brochure',
			'view_item' => 'View Brochure',
			'search_items' => 'Search Brochures',
			'not_found' => 'No Brochure Found',
			'not_found_in_trash' => 'No Brochure found in Trash'
          ),
          'public' => false,
          'show_ui' => true,
          'has_archive' => false,
          'exclude_from_search' => true,
          'menu_icon' => 'dashicons-media-document',
          'supports' => array(
			'title'
			)
        )
    );
    
    
}
