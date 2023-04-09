<?php 


// This is for the redirect of the create form to the modify form

add_action( 'gform_after_submission_7', 'set_post_content', 10, 2 );

function set_post_content( $entry, $form ) {

	wp_redirect('/quote/modify/?qid=' . $entry['post_id'] );
   
}


// Populate the first quote field 
// Infield Skin Area
// 1. Select the finishing layer material for the infield skin.
// 5. Select the base layer material for the infield skin.

add_filter( 'gform_pre_render_1', 'marco_infield_skin_materials' );
add_filter( 'gform_pre_validation_1', 'marco_infield_skin_materials' );
add_filter( 'gform_pre_submission_filter_1', 'marco_infield_skin_materials' );
add_filter( 'gform_admin_pre_render_1', 'marco_infield_skin_materials' );


function marco_infield_skin_materials( $form ) {

    foreach ( $form['fields'] as &$field ) {

        if ( $field->id == 3 ) {
			// you can add additional parameters here to alter the posts that are retrieved
	        // more info: [http://codex.wordpress.org/Template_Tags/get_posts](http://codex.wordpress.org/Template_Tags/get_posts)
	        $posts = get_posts( array(
	                 'posts_per_page' 	=> -1
	                ,'post_type' 	=> 'materials'
	                ,'order' => 'ASC'
	                ,'tax_query' => array(
					array(
						'taxonomy' => 'use_on_quote_forms',
						'field' => 'slug',
						'terms' => 'infield-question-1-finishing-layer'
					)
				)
	            ));
	
	        $choices = array();
	
	        foreach ( $posts as $post ) {
	            $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
	        }
	
	        // update 'Select a Post' to whatever you'd like the instructive option to be
	        $field->placeholder = 'Select a Material';
	        $field->choices = $choices;
        }
        
        
        if ( $field->id == 13 ) {
			// you can add additional parameters here to alter the posts that are retrieved
	        // more info: [http://codex.wordpress.org/Template_Tags/get_posts](http://codex.wordpress.org/Template_Tags/get_posts)
	        $posts = get_posts( array(
	                 'posts_per_page' 	=> -1
	                ,'post_type' 	=> 'materials'
	                ,'order' => 'ASC'
	                ,'tax_query' => array(
					array(
						'taxonomy' => 'use_on_quote_forms',
						'field' => 'slug',
						'terms' => 'infield-question-5-base-layer'
					)
				)
	            ));
	
	        $choices = array();
	
	        foreach ( $posts as $post ) {
	            $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
	        }
	
	        // update 'Select a Post' to whatever you'd like the instructive option to be
	        $field->placeholder = 'Select a Material';
	        $field->choices = $choices;
        }

        

    }

    return $form;
}


// Populate the second quote field 
// PITCHERS MOUND
// 2. Select the finishing layer material for the pitchers mound.
// 4. Select the base layer material for the pitchers mound

add_filter( 'gform_pre_render_2', 'marco_pitchers_mound_materials' );
add_filter( 'gform_pre_validation_2', 'marco_pitchers_mound_materials' );
add_filter( 'gform_pre_submission_filter_2', 'marco_pitchers_mound_materials' );
add_filter( 'gform_admin_pre_render_2', 'marco_pitchers_mound_materials' );


function marco_pitchers_mound_materials( $form ) {

    foreach ( $form['fields'] as &$field ) {

        if ( $field->id == 2 ) {
	        $posts = get_posts( array(
	                 'posts_per_page' 	=> -1
	                ,'post_type' 	=> 'materials'
	                ,'order' => 'ASC'
	                ,'tax_query' => array(
					array(
						'taxonomy' => 'use_on_quote_forms',
						'field' => 'slug',
						'terms' => 'pitchers-mound-question-2-finishing-layer'
					)
				)
	            ));
	
	        $choices = array();
	
	        foreach ( $posts as $post ) {
	            $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
	        }
	
	        $field->placeholder = 'Select a Material';
	        $field->choices = $choices;
        }
        
        
        if ( $field->id == 10 ) {
	        $posts = get_posts( array(
	                 'posts_per_page' 	=> -1
	                ,'post_type' 	=> 'materials'
	                ,'order' => 'ASC'
	                ,'tax_query' => array(
					array(
						'taxonomy' => 'use_on_quote_forms',
						'field' => 'slug',
						'terms' => 'pitchers-mound-question-4-base-layer'
					)
				)
	            ));
	
	        $choices = array();
	
	        foreach ( $posts as $post ) {
	            $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
	        }

	        $field->placeholder = 'Select a Material';
	        $field->choices = $choices;
        }

        

    }

    return $form;
}


// Populate the third quote field 
// Home Plate Area
// 1. Select the finishing layer material for the home plate area.
// 4. Select the base layer material for the pitchers mound

add_filter( 'gform_pre_render_3', 'marco_home_plate_material' );
add_filter( 'gform_pre_validation_3', 'marco_home_plate_material' );
add_filter( 'gform_pre_submission_filter_3', 'marco_home_plate_material' );
add_filter( 'gform_admin_pre_render_3', 'marco_home_plate_material' );


function marco_home_plate_material( $form ) {

    foreach ( $form['fields'] as &$field ) {

        if ( $field->id == 1 ) {
	        $posts = get_posts( array(
	                 'posts_per_page' 	=> -1
	                ,'post_type' 	=> 'materials'
	                ,'order' => 'ASC'
	                ,'tax_query' => array(
					array(
						'taxonomy' => 'use_on_quote_forms',
						'field' => 'slug',
						'terms' => 'home-plate-question-1-finishing-layer'
					)
				)
	            ));
	
	        $choices = array();
	
	        foreach ( $posts as $post ) {
	            $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
	        }
	
	        $field->placeholder = 'Select a Material';
	        $field->choices = $choices;
        }
        
        
        if ( $field->id == 6 ) {
	        $posts = get_posts( array(
	                 'posts_per_page' 	=> -1
	                ,'post_type' 	=> 'materials'
	                ,'order' => 'ASC'
	                ,'tax_query' => array(
					array(
						'taxonomy' => 'use_on_quote_forms',
						'field' => 'slug',
						'terms' => 'home-plate-batter-boxes-materials'
					)
				)
	            ));
	
	        $choices = array();
	
	        foreach ( $posts as $post ) {
	            $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
	        }
	
	        $field->placeholder = 'Select a Material';
	        $field->choices = $choices;
        }
        
         if ( $field->id == 8 ) {
	        $posts = get_posts( array(
	                 'posts_per_page' 	=> -1
	                ,'post_type' 	=> 'materials'
	                ,'order' => 'ASC'
	                ,'tax_query' => array(
					array(
						'taxonomy' => 'use_on_quote_forms',
						'field' => 'slug',
						'terms' => 'home-plate-catchers-boxes-materials'
					)
				)
	            ));
	
	        $choices = array();
	
	        foreach ( $posts as $post ) {
	            $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
	        }
	
	        $field->placeholder = 'Select a Material';
	        $field->choices = $choices;
        }
        
        
        if ( $field->id == 12 ) {
	        $posts = get_posts( array(
	                 'posts_per_page' 	=> -1
	                ,'post_type' 	=> 'materials'
	                ,'order' => 'ASC'
	                ,'tax_query' => array(
					array(
						'taxonomy' => 'use_on_quote_forms',
						'field' => 'slug',
						'terms' => 'home-plate-question-5-base-layer'
					)
				)
	            ));
	
	        $choices = array();
	
	        foreach ( $posts as $post ) {
	            $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
	        }

	        $field->placeholder = 'Select a Material';
	        $field->choices = $choices;
        }

        

    }

    return $form;
}


// Populate the third quote field 
// Warning Track Area
// 1. Select the material for the warning track.
// 3. Select the base layer material for the warning track.

add_filter( 'gform_pre_render_4', 'marco_warning_track_material' );
add_filter( 'gform_pre_validation_4', 'marco_warning_track_material' );
add_filter( 'gform_pre_submission_filter_4', 'marco_warning_track_material' );
add_filter( 'gform_admin_pre_render_4', 'marco_warning_track_material' );


function marco_warning_track_material( $form ) {

    foreach ( $form['fields'] as &$field ) {

        if ( $field->id == 1 ) {
	        $posts = get_posts( array(
	                 'posts_per_page' 	=> -1
	                ,'post_type' 	=> 'materials'
	                ,'order' => 'ASC'
	                ,'tax_query' => array(
					array(
						'taxonomy' => 'use_on_quote_forms',
						'field' => 'slug',
						'terms' => 'warning-track-question-1-finishing-layer'
					)
				)
	            ));
	
	        $choices = array();
	
	        foreach ( $posts as $post ) {
	            $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
	        }
	
	        $field->placeholder = 'Select a Material';
	        $field->choices = $choices;
        }
        
        
        if ( $field->id == 6 ) {
	        $posts = get_posts( array(
	                 'posts_per_page' 	=> -1
	                ,'post_type' 	=> 'materials'
	                ,'order' => 'ASC'
	                ,'tax_query' => array(
					array(
						'taxonomy' => 'use_on_quote_forms',
						'field' => 'slug',
						'terms' => 'warning-track-question-3-finishing-layer'
					)
				)
	            ));
	
	        $choices = array();
	
	        foreach ( $posts as $post ) {
	            $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
	        }

	        $field->placeholder = 'Select a Material';
	        $field->choices = $choices;
        }

        

    }

    return $form;
}


// Populate the third quote field 
// Bull Pen Area
// 2. Select the finishing layer material of the bull pen.
// 4. Select the base layer material for the bull pen.

add_filter( 'gform_pre_render_5', 'marco_bull_pen_material' );
add_filter( 'gform_pre_validation_5', 'marco_bull_pen_material' );
add_filter( 'gform_pre_submission_filter_5', 'marco_bull_pen_material' );
add_filter( 'gform_admin_pre_render_5', 'marco_bull_pen_material' );


function marco_bull_pen_material( $form ) {

    foreach ( $form['fields'] as &$field ) {

        if ( $field->id == 2 ) {
	        $posts = get_posts( array(
	                 'posts_per_page' 	=> -1
	                ,'post_type' 	=> 'materials'
	                ,'order' => 'ASC'
	                ,'tax_query' => array(
					array(
						'taxonomy' => 'use_on_quote_forms',
						'field' => 'slug',
						'terms' => 'bull-pen-question-2-finishing-layer'
					)
				)
	            ));
	
	        $choices = array();
	
	        foreach ( $posts as $post ) {
	            $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
	        }
	
	        $field->placeholder = 'Select a Material';
	        $field->choices = $choices;
        }
        
        
        if ( $field->id == 7 ) {
	        $posts = get_posts( array(
	                 'posts_per_page' 	=> -1
	                ,'post_type' 	=> 'materials'
	                ,'order' => 'ASC'
	                ,'tax_query' => array(
					array(
						'taxonomy' => 'use_on_quote_forms',
						'field' => 'slug',
						'terms' => 'bull-pen-question-4-base-layer'
					)
				)
	            ));
	
	        $choices = array();
	
	        foreach ( $posts as $post ) {
	            $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
	        }

	        $field->placeholder = 'Select a Material';
	        $field->choices = $choices;
        }


        

    }

    return $form;
}


// Populate the third quote field 
// Bull Pen Area
// 2. Select the finishing layer material of the bull pen.
// 4. Select the base layer material for the bull pen.

add_filter( 'gform_pre_render_6', 'marco_misc_material' );
add_filter( 'gform_pre_validation_6', 'marco_misc_material' );
add_filter( 'gform_pre_submission_filter_6', 'marco_misc_material' );
add_filter( 'gform_admin_pre_render_6', 'marco_misc_material' );


function marco_misc_material( $form ) {

    foreach ( $form['fields'] as &$field ) {

        if ( $field->id == 3 ) {
	        $posts = get_posts( array(
	                 'posts_per_page' 	=> -1
	                ,'post_type' 	=> 'materials'
	                ,'order' => 'ASC'
	                ,'tax_query' => array(
					array(
						'taxonomy' => 'use_on_quote_forms',
						'field' => 'slug',
						'terms' => 'miscellaneous-area-question-3-finishing-layer'
					)
				)
	            ));
	
	        $choices = array();
	
	        foreach ( $posts as $post ) {
	            $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
	        }
	
	        $field->placeholder = 'Select a Material';
	        $field->choices = $choices;
        }
        
        
        if ( $field->id == 9 ) {
	        $posts = get_posts( array(
	                 'posts_per_page' 	=> -1
	                ,'post_type' 	=> 'materials'
	                ,'order' => 'ASC'
	                ,'tax_query' => array(
					array(
						'taxonomy' => 'use_on_quote_forms',
						'field' => 'slug',
						'terms' => 'miscellaneous-area-question-5-base-layer'
					)
				)
	            ));
	
	        $choices = array();
	
	        foreach ( $posts as $post ) {
	            $choices[] = array( 'text' => $post->post_title, 'value' => $post->ID );
	        }

	        $field->placeholder = 'Select a Material';
	        $field->choices = $choices;
        }

        

    }

    return $form;
}
