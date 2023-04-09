<?php
add_action('init', 'create_use_on_quote_forms');
function create_use_on_quote_forms(){
$labels = array(
		'name'              => _x( 'Material on Quote Form', 'Material on Quote Forms' ),
		'singular_name'     => _x( 'Material on Quote Form', 'Material on Quote Forms' ),
		'search_items'      => __( 'Search Materials on Quote Forms' ),
		'all_items'         => __( 'All Material on Quote Forms' ),
		'parent_item'       => __( 'Parent Material on Quote Forms' ),
		'parent_item_colon' => __( 'Parent Material on Quote Forms:' ),
		'edit_item'         => __( 'Edit Material on Quote Forms' ),
		'update_item'       => __( 'Update Material on Quote Forms' ),
		'add_new_item'      => __( 'Add New Material on Quote Forms' ),
		'new_item_name'     => __( 'New Material on Quote Forms' ),
		'menu_name'         => __( 'Material on Quote Forms' ),
	);

	$args = array(
		'hierarchical'      => true,
		'labels'            => $labels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'rewrite'           => array( 'slug' => 'genre' ),
	);

	register_taxonomy( 'use_on_quote_forms', array( 'materials' ), $args );
}
