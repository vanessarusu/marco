<?php
	
if( function_exists('acf_add_local_field_group') ):

acf_add_local_field_group(array (
	'key' => 'group_58bd95a7a4d16',
	'title' => 'Brochures',
	'fields' => array (
		array (
			'return_format' => 'array',
			'library' => 'all',
			'min_size' => '',
			'max_size' => '',
			'mime_types' => '',
			'key' => 'field_58bd95e588e73',
			'label' => 'Brochure',
			'name' => 'gmct_brochure',
			'type' => 'file',
			'instructions' => 'Please select a brochure to be listed on the quote manager.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
		),
		array (
			'default_value' => 0,
			'message' => '',
			'ui' => 0,
			'ui_on_text' => '',
			'ui_off_text' => '',
			'key' => 'field_58bd962788e74',
			'label' => 'Show on Dealer Side',
			'name' => 'gmct_show_on_dealer_side',
			'type' => 'true_false',
			'instructions' => 'Would you like for the brochure to be displayed for dealers?',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
		),
		array (
			'default_value' => 0,
			'message' => '',
			'ui' => 0,
			'ui_on_text' => '',
			'ui_off_text' => '',
			'key' => 'field_58bd969a88e75',
			'label' => 'Show on Architect Side',
			'name' => 'gmct_show_on_architect_side',
			'type' => 'true_false',
			'instructions' => 'Would you like for the brochure to be displayed for architects?',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
		),
		array (
			'key' => 'field_58bd98b6d265d',
			'label' => 'Brochure Category',
			'name' => 'gmct_brochure_category',
			'type' => 'select',
			'instructions' => 'Please select under what category the material will go under. ',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'choices' => array (
				'advertising' => 'Advertising Material',
				'data' => 'Specification Data',
				'drawings' => 'Drawings',
			),
			'default_value' => array (
			),
			'allow_null' => 0,
			'multiple' => 0,
			'ui' => 0,
			'ajax' => 0,
			'placeholder' => '',
			'disabled' => 0,
			'readonly' => 0,
		),
	),
	'location' => array (
		array (
			array (
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'brochures',
			),
		),
	),
	'menu_order' => 0,
	'position' => 'normal',
	'style' => 'default',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => 1,
	'description' => '',
));

endif;