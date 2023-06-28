<?php


/* Functions related to the quote manager */

// relevant fields for the quote post type: has_infield_skin_area (1), has_pitchers_mound_area (2), has_home_plate_mound_area (3), has_warning_track_area (4),
// has_bull_pen_area (5), has_misc_area (6)

add_action('wp', array('GMCT_Marco_Quote_Manager', 'check_permissions'), 10);
add_action('init', array('GMCT_Marco_Quote_Manager', 'bind_forms'), 10);


add_action( 'wp_ajax_gmct_create_quote_report', array('GMCT_Marco_Quote_Manager', 'create_report_ajax') );
add_action( 'wp_ajax_nopriv_gmct_create_quote_report', array('GMCT_Marco_Quote_Manager', 'create_report_ajax') );

add_action('after_setup_theme', 'gmct_remove_admin_bar');

function gmct_remove_admin_bar() {
  if (!current_user_can('administrator') && !is_admin()) {
    show_admin_bar(false);
  }
}

function gmct_admin_default_page() {
  return get_bloginfo('url') . '/dealer';
}

add_filter('login_redirect', 'gmct_admin_default_page');

add_action('wp_enqueue_scripts', 'deader_dashboard_my_scripts_enqueue');

function deader_dashboard_my_scripts_enqueue(){
	if(is_page_template('page-dealers.php')){
		wp_enqueue_style( 'style-materialize-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons' );
		wp_enqueue_script( 'script-materialize', 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js');
		// wp_enqueue_style( 'style-materialize', 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css' );
	}
}

function cgc_ub_action_links($actions, $user_object) {
	$actions['view_quotes'] = "<a class='view_quotes' href='/quote?uid=" . $user_object->ID . "'>" . 'View Quotes' . "</a>";
	return $actions;
}
add_filter('user_row_actions', 'cgc_ub_action_links', 10, 2);


class GMCT_Marco_Quote_Manager {


  public static function bind_forms(){
    add_filter("gform_post_data_1", array('GMCT_Marco_Quote_Manager', 'save_form_wrap'), 10, 3);
    add_filter("gform_post_data_2", array('GMCT_Marco_Quote_Manager', 'save_form_wrap'), 10, 3);
    add_filter("gform_post_data_3", array('GMCT_Marco_Quote_Manager', 'save_form_wrap'), 10, 3);
    add_filter("gform_post_data_4", array('GMCT_Marco_Quote_Manager', 'save_form_wrap'), 10, 3);
    add_filter("gform_post_data_5", array('GMCT_Marco_Quote_Manager', 'save_form_wrap'), 10, 3);
    add_filter("gform_post_data_6", array('GMCT_Marco_Quote_Manager', 'save_form_wrap'), 10, 3);
    add_filter("gform_post_data_8", array('GMCT_Marco_Quote_Manager', 'save_form_wrap_extra'), 10, 3);
  }

  public static function save_form_wrap_extra( $post_data, $form, $lead ){
    $mqid = $post_data['ID'];
    self::save_extra_misc_quote($mqid);
    return $post_data;
  }

  public static function save_form_wrap($post_data, $form, $lead){
      $id = $post_data['ID']; // ?
      self::save_quote_form( $id );
      $field = "";
      switch ($form['id']){
          case 1:
            $field = 'has_infield_skin_area';
            break;
          case 2:
            $field = 'has_pitchers_mound_area';
            break;
          case 3:
            $field = 'has_home_plate_mound_area';
            break;
          case 4:
            $field = 'has_warning_track_area';
            break;
          case 5:
            $field = 'has_bull_pen_area';
            break;
          case 6:
            $field = 'has_misc_area';
            break;
      }
      update_post_meta($id, $field, "1");
      self::save_quote_form( $id );
      return $post_data;
  }

  /* duplicate a quote post so that modifications apply to a new one */
  public static function duplicate_post( $post_id ) {
    global $wpdb;
  	if ( !$post_id ) {
  		wp_die('No post to duplicate has been supplied!');
  	}

  	/*
  	 * get the original post id
  	 */
  	$post = get_post( $post_id );

  	$new_post_author = $post->post_author;

  	/*
  	 * if post data exists, create the post duplicate
  	 */
  	if (isset( $post ) && $post != null) {

  		/*
  		 * new post data array
  		 */
  		$args = array(
  			'comment_status' => $post->comment_status,
  			'ping_status'    => $post->ping_status,
  			'post_author'    => $new_post_author,
  			'post_content'   => $post->post_content,
  			'post_excerpt'   => $post->post_excerpt,
  			'post_name'      => $post->post_name . "_OLD - " . Date("M d, Y", strtotime($post->post_date)),
  			'post_parent'    => $post->post_parent,
  			'post_password'  => $post->post_password,
  			'post_status'    => 'publish',
  			'post_title'     => $post->post_title . "_OLD",
  			'post_type'      => $post->post_type,
  			'to_ping'        => $post->to_ping,
  			'menu_order'     => $post->menu_order
  		);

  		/*
  		 * insert the post by wp_insert_post() function
  		 */
  		$new_post_id = wp_insert_post( $args );

  		/*
  		 * get all current post terms ad set them to the new post draft
  		 */
  		$taxonomies = get_object_taxonomies($post->post_type); // returns array of taxonomy names for post type, ex array("category", "post_tag");
  		foreach ($taxonomies as $taxonomy) {
  			$post_terms = wp_get_object_terms($post_id, $taxonomy, array('fields' => 'slugs'));
  			wp_set_object_terms($new_post_id, $post_terms, $taxonomy, false);
  		}

  		/*
  		 * duplicate all post meta just in two SQL queries
  		 */
  		$post_meta_infos = $wpdb->get_results("SELECT meta_key, meta_value FROM $wpdb->postmeta WHERE post_id=$post_id");
  		if (count($post_meta_infos)!=0) {
  			$sql_query = "INSERT INTO $wpdb->postmeta (post_id, meta_key, meta_value) ";
  			foreach ($post_meta_infos as $meta_info) {
  				$meta_key = $meta_info->meta_key;
  				$meta_value = addslashes($meta_info->meta_value);
  				$sql_query_sel[]= "SELECT $new_post_id, '$meta_key', '$meta_value'";
  			}
  			$sql_query.= implode(" UNION ALL ", $sql_query_sel);
  			$wpdb->query($sql_query);
  		}

      update_post_meta( $new_post_id, 'has_report', 1 );
      update_post_meta( $post_id, 'has_report', 0 );
      $time = current_time('mysql');


      wp_update_post(
          array (
              'ID'            => $post_id, // ID of the post to update
              'post_date'     => $time,
              'post_date_gmt' => get_gmt_from_date( $time )
          )
      );
      return true;

  	} else {
  		wp_die('Post creation failed, could not find original post: ' . $post_id);
  	}
  }

  public static function check_permissions(){

    if ( is_page_template( 'page-quotemanager.php' ) ||  is_page_template( 'page-create.php' ) || is_page_template( 'page-dealers.php' ) || is_page_template( 'page-dealer-product-spec-sheets.php' ) || is_page_template( 'page-dealer-drawings.php' ) || is_page_template( 'page-dealer-ad-materials.php' ) ){
        if ( !self::can_use_quote_manager() ){
            wp_redirect('/');
            exit;
        }
    }

    if ( is_page_template( 'page-quotemanager-form.php' ) || is_page_template( 'page-modify.php' ) || is_page_template( 'page-rename.php' ) || is_page_template( 'page-delete.php' ) || is_page_template( 'page-miscellaneous-area.php' ) || is_page_template( 'page-bull-pen-area.php' ) || is_page_template( 'page-warning-track-area.php' ) || is_page_template( 'page-home-plate-area.php' ) || is_page_template( 'page-pitchers-mound-area.php' ) || is_page_template( 'page-infield-skin-area.php' ) ){
      $quote = $_GET['qid'];
      if ( $quote == '' ){
        wp_redirect('/');
        //die('no quote id');
        exit;
      }
      if ( !self::can_edit_current_quote( $quote ) || !self::can_use_quote_manager() ){
          wp_redirect('/');
          //die('cant edit quote');
          exit;
      }
    }
  }

  // check if current user can use quote Manager
  public static function can_use_quote_manager(){
    $user = wp_get_current_user();
    if ( in_array( 'dealer', (array) $user->roles ) || current_user_can('manage_options') ) {
        //The user has the "author" role
        return true;
    }
    return false;
  }

  // check if current user can view current quote
  public static function can_edit_current_quote( $quote_id ){
    $quote = get_post( $quote_id );
    $user = wp_get_current_user();
    //die ( 'aa' . $user->ID . $quote->post_author . 'bb' );
    if ( current_user_can('manage_options') || $quote->post_author == $user->ID ){
      return true;
    }
    return false;
  }

  // get quotes for a user user
  public static function get_my_quotes( \WP_User $user ){
    $args = array(
    	'posts_per_page'   => -1,
    	'post_type'        => 'quotes',
    	'author'	   => $user->ID,
		'orderby' => 'has_report',
		'meta_query'    => array(
        array(
            'key'     => 'has_report',
            'orderby' => 'meta_value_num',
            'order' => 'DESC',
        )
      ),
      'order' => 'ASC'
    );
    add_filter( 'posts_orderby', array('GMCT_Marco_Quote_Manager', 'filter_query') );
    $posts_array = new WP_Query( $args );
    remove_filter( 'posts_orderby', array('GMCT_Marco_Quote_Manager', 'filter_query') );



    return $posts_array;
  }

  public static function rename_quote( $quote_id, $quote_name ){
    $my_post = array(
       'ID'           => $quote_id,
       'post_title'   => $quote_name
     );

     // Update the post into the database
    return wp_update_post( $my_post );
  }

  public static function get_quote_id_from_extra_id( $extra_id ){
    return get_post_meta( $extra_id, 'quote_id', true );
  }

  public static function delete_for_quote( $quote_id, $form_id = NULL ){
    if ( $form_id === NULL || $form_id == 8 ){
        // just delete the entire quote
        return wp_delete_post( $quote_id );
    } else {
       // we want to delete just a section of the quote
       $field = "";
       switch ($form_id){
           case 1:
             $field = 'has_infield_skin_area';
             break;
           case 2:
             $field = 'has_pitchers_mound_area';
             break;
           case 3:
             $field = 'has_home_plate_mound_area';
             break;
           case 4:
             $field = 'has_warning_track_area';
             break;
           case 5:
             $field = 'has_bull_pen_area';
             break;
           case 6:
             $field = 'has_misc_area';
             break;
       }
       return update_post_meta($quote_id, $field, "0");
    }

  }

  public static function filter_query( $query ) {
      global $wpdb;
      $query .= ', ' . $wpdb->prefix . "posts.post_date DESC";
      return $query;
  }

  // save quote form. Set status of report_created and duplicate if neccessary
  public static function save_quote_form( $quote_id ){
    $has_report = get_post_meta( $quote_id, 'has_report', true );

    if ( $has_report == 1 ){
      self::duplicate_post($quote_id);
    }
  }

  public static function create_report_ajax(){
	print_r("HIII VANESSA");
    $quote_id = $_POST['qid'];
    self::create_report($quote_id);
    return true;
  }

  // create a report
  public static function create_report( $quote_id ){
    update_post_meta( $quote_id, 'has_report', '1' );
    $time = current_time('mysql');
    wp_update_post(
        array (
            'ID'            => $quote_id, // ID of the post to update
            'post_date'     => $time,
            'post_date_gmt' => get_gmt_from_date( $time )
        )
    );
    //wp_redirect( get_the_permalink( $quote_id ) );
  }

  // relevant fields for the quote post type: has_infield_skin_area (1), has_pitchers_mound_area (2), has_home_plate_mound_area (3), has_warning_track_area (4),
  // has_bull_pen_area (5), has_misc_area (6)


  // for the frontend display

  // types: full, form
  // id of form if required
  public static function show_report( $quote_id, $type = 'side', $id = NULL ){

    $bHtml = '';

    if ( $type == 'full' ) {
      // full front end report
      $bHtml = self::generate_full_report( $quote_id );
    } else {
      // get results for specific form
      $bHtml = self::generate_totals_for_form( $quote_id, $id );
	//   $bHtml = self->generate_totals_for_form( $quote_id, $id );
    }

    return $bHtml;

  }


  ///////////////////////////////////
   //   Report Page results Code
   ///////////////////////////////////

  private static function generate_full_report( $quote_id ) {
    $summarytext = "";
    $totalmatsummary = "";
    $totalmaterial = array();
	$product_qty = array();

		$summarytext .= "<div class='report-section-container summary'>";
    if ( get_field('has_infield_skin_area', $quote_id) == "1" ){


	    $summarytext .= "<div class='report-total'><b>SUMMARY</b></div>\n";

	   $summarytext .= "<div class='report-section-title infield-skin'><h6><b>Infield Skin Area - Results</b></h6><span class='report-adjust-link'><a href='/quote/modify/infield-skin-area/?qid=" . $quote_id .  "'>Adjust</a></span></div>\n";

      $x_array = self::generate_totals_for_form( $quote_id, 1, 'array' );


      if (!($x_array['mat1name'] == '')) {
  			$summarytext .= "<div class='title-div'><span class='report-title'>Finishing Layer Product:</span><br />" . $x_array['mat1name'] . "</div>\n";

        if ( is_object($x_array['mat1']) ){
          $product_qty[$x_array['mat1']->ID] += $x_array['mat1qty'];
          $product_name[$x_array['mat1']->ID] = $x_array['mat1name'];
        } else {
          $product_qty[$x_array['mat1']] += $x_array['mat1qty'];
  			  $product_name[$x_array['mat1']] = $x_array['mat1name'];
        }
  		}

  		if (!($x_array['mat2name'] == '')) {
  			$summarytext .= "<div class='title-div'><span class='report-title'>Base Layer Product:</span><br />" . $x_array['mat2name'] . "</div>\n";
        if ( is_object( $x_array['mat2'] ) ){	
          $product_qty[$x_array['mat2']->ID] += $x_array['mat2qty'];
    			$product_name[$x_array['mat2']->ID] = $x_array['mat2name'];
        } else {        
          $product_qty[$x_array['mat2']] += $x_array['mat2qty'];
    			$product_name[$x_array['mat2']] = $x_array['mat2name'];
        }

  		}

  		$summarytext .= "<div class='title-div'><span class='report-title'>Grass Infield:</span>" . $x_array['grass1'] . "</div>\n";
  		$summarytext .= "<div class='title-div'><span class='report-title'>Grass Sidelines:</span> " . $x_array['grass2'] . "</div>\n";
  		$summarytext .= "<div class='report-values'>\n";
  		$summarytext .= "<div class='report-table-title'>Measurements:</div>\n";
  		$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  		$summarytext .= "<tr><td>Area (sq. ft)</td><td>" . $x_array['squarefeet'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Radius (feet)</td><td>" . $x_array['measure1'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Base Length (feet)</td><td>" . $x_array['measure2'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Base Path Width (feet)</td><td>" . $x_array['measure3'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Sidelines Length (feet)</td><td>" . $x_array['measure4'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Sidelines Width (feet)</td><td>" . $x_array['measure5'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Depth of Finishing Layer (inches)</td><td>" . $x_array['depth1'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Depth of Base Layer (inches)</td><td>" . $x_array['depth2'] . "</td></tr>\n";
  		$summarytext .= "</table></div>\n";
  		$summarytext .= "</div>\n";

  		$summarytext .= "<div class='report-results'>\n";

  			$summarytext .= "<div class='report-table-title'>Results</div>\n";

  			if (!($x_array['mat1name'] == '')) {
  				$material1 = $x_array['mat1'];

          $lookup_mat = self::get_material($material1);
  				$matweight1 = $lookup_mat['weight_factor'];
  				$matshrink1 = $lookup_mat['shrink_factor'];

  				$summarytext .= "<div class='report-table'>\n";
  				$summarytext .= "<div class='material-name'>" . $x_array['mat1name'] . "</div>\n";
  				$summarytext .= "<table class='results-table'>\n";
  				$summarytext .= "<tr><td>Weight:</td><td>" . round(($x_array['mat1qty'] / $matshrink1), 1) . "</td></tr>\n";
  				$summarytext .= "<tr><td>Shrinkage:</td><td>" . round(($x_array['mat1qty'] - ($x_array['mat1qty'] / $matshrink1)), 1) . "</td></tr>\n";
  				$summarytext .= "<tr class='border-top'><td><strong>Tons of Material</strong></td><td><strong>" . $x_array['mat1qty'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";

  				$totalmaterial = self::total_material_value('bulk', $x_array['mat1name'], $x_array['mat1qty'], $totalmaterial );
  			}

  			if (!($x_array['mat2name'] == '')) {
  				$material2 = $x_array['mat2'];

  				$lookup2_mat = self::get_material($material2);
  				$matweight2 = $lookup2_mat['weight_factor'];
  				$matshrink2 = $lookup2_mat['shrink_factor'];

  				$summarytext .= "<div class='report-table'>\n";
  				$summarytext .= "<div class='material-name'>" . $x_array['mat2name'] . "</div>\n";
  				$summarytext .= "<table class='results-table'>\n";
  				$summarytext .= "<tr><td>Weight:</td><td>" . round(($x_array['mat2qty'] / $matshrink2),1) . "</td></tr>\n";
  				$summarytext .= "<tr><td>Shrinkage:</td><td>" . round(($x_array['mat2qty'] - ($x_array['mat2qty'] / $matshrink2)),1) . "</td></tr>\n";
  				$summarytext .= "<tr class='border-top'><td><strong>Tons of Material</strong></td><td><strong>" . $x_array['mat2qty'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";
  				$summarytext .= "<div style='clear:both'></div>\n";

  				$totalmaterial = self::total_material_value( 'bulk', $x_array['mat2name'], $x_array['mat2qty'], $totalmaterial );
  			}

  			$summarytext .= "</div>\n";
  			$summarytext .= "<div style='clear:both;'></div>\n";


    }
    if ( get_field('has_pitchers_mound_area', $quote_id) == "1" ){

    $summarytext .= "<div class='report-section-title pitchers-mound'><h6><b>Pitchers Mound Area - Results</b></h6><span class='report-adjust-link'><a href='/quote/modify/pitchers-mound-area/?qid=" . $quote_id .  "'>Adjust</a></span></div>\n";

      $x_array = self::generate_totals_for_form( $quote_id, 2, 'array' );

      if (!($x_array['mat1name'] == '')) {
  			$summarytext .= "<div class='title-div'><span class='report-title'>Finishing Layer Product:</span><br />" . $x_array['mat1name'] . "</div>\n";
  			if ($x_array['mat1bulk'] > 0) {
          if ( is_object($x_array['mat1']) ){
            $product_qty[$x_array['mat1']->ID] += $x_array['mat1bulk'];
    				$product_name[$x_array['mat1']->ID] = $x_array['mat1name'];
          } else {
            $product_qty[$x_array['mat1']] += $x_array['mat1bulk'];
    				$product_name[$x_array['mat1']] = $x_array['mat1name'];
          }

  			}

  		}
  		if (!($x_array['mat2name'] == '')) {
  			$summarytext .= "<div class='title-div'><span class='report-title'>Base Layer Product:</span><br />" . $x_array['mat2name'] . "</div>\n";
        if ( is_object($x_array['mat2']) ){
          $product_qty[$x_array['mat2']->ID] += $x_array['mat2qty'];
    			$product_name[$x_array['mat2']->ID] = $x_array['mat2name'];
        } else {
          $product_qty[$x_array['mat2']] += $x_array['mat2qty'];
    			$product_name[$x_array['mat2']] = $x_array['mat2name'];
        }

  		}

  		if ($x_array['mat1bags'] > 0) {
  			$product_bags[$x_array['mat1']] += $x_array['mat1bags'];
  			$product_name[$x_array['mat1']] = $x_array['mat1name'];
  		}
  		if ($x_array['brickbags'] > 0) {
  			$product_bags[15] += $x_array['brickbags'];
  			$product_name[15] = "Field Bricks (8 per bag)";
  		}



  		$summarytext .= "<div class='title-div'><span class='report-title'>Construction:</span>&nbsp;&nbsp;";
  		if ($x_array['moundstyle'] == 'cap_construction') {
  			$summarytext .= "Cap (Partial)";
  		} else if ($x_array['moundstyle'] == 'bricks_only_construction') {
  			$summarytext .= "Bricks Only (Partial)";
  		} else if ($x_array['moundstyle'] == 'softball_pitchers_pad') {
  			$summarytext .= "Softball (Pitcher's Pad)";
  		} else {
  			$summarytext .= "Standard (Complete)";
  		}
  		$summarytext .= "</div>\n";
  		$summarytext .= "<div class='report-values'>\n";
  		$summarytext .= "<div class='report-table-title'>Measurements:</div>\n";
		$summarytext .= "<div class='report-table'><table class='values-table'>\n";

  		if (!($x_array['moundstyle'] == 'softball')) {
  			$summarytext .= "<tr><td>Mound Radius (feet)</td><td>" . $x_array['radius1'] . "</td></tr>\n";
  		}

  		if ( (!($x_array['moundstyle'] == 'bricks_only_construction')) && (!($x_array['moundstyle'] == 'softball_pitchers_pad')) ) {
  			if ($x_array['moundstyle'] == 'cap_construction') {
  				$xtext = "Depth of Mound Cap";
  			} else if ($x_array['moundstyle'] == 'standard') {
  				$xtext .= "Pitching Rubber Height";
  			}
  			$summarytext .= "<tr><td>" . $xtext . " (inches)</td><td>" . $x_array['height1'] . "</td></tr>\n";
  		}

  		if ( (!($x_array['depth2'] == '')) && (!($x_array['mat2name'] == '')) ) {
  			$summarytext .= "<tr><td>Depth of Base Layer (inches)</td><td>" . $x_array['depth2'] . "</td></tr>\n";
  		}

  		$summarytext .= "</table></div>\n";



  		if (($x_array['usebricks'] == 'yes') || ($x_array['usebricks'] == 'Yes') || ($x_array['moundstyle'] == 'bricks_only_construction')) {
  			$summarytext .= "<div class='report-table-title'>Field Bricks:</div>\n";
  			$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  			$summarytext .= "<tr><td>Use Field Bricks</td><td>" . $x_array['usebricks'] . "</td></tr>\n";
  			$summarytext .= "<tr><td>Brick Layout</td><td>" . $x_array['brickstyle'] . "</td></tr>\n";
  			$summarytext .= "</table></div>\n";
  		} else {
  			$summarytext .= "<div class='report-title'>No Field Bricks</div>\n";
  		}

  		$summarytext .= "</div>\n";

  		$summarytext .= "<div class='report-results'>\n";

  			$summarytext .= "<div class='report-table-title'>Results</div>\n";

  			if ($x_array['mat1bulk'] > 0 ) {
  				$material1 = $x_array['mat1'];

  				$lookup_mat = self::get_material($material1);
  				$matweight1 = $lookup_mat['weight_factor'];
  				$matshrink1 = $lookup_mat['shrink_factor'];

  				$summarytext .= "<div class='report-table'>\n";
  				$summarytext .= "<div class='material-name'>" . $x_array['mat1name'] . "</div>\n";
  				$summarytext .= "<table class='results-table'>\n";
  				$summarytext .= "<tr><td>Weight:</td><td>" . round(($x_array['mat1bulk'] / $matshrink1), 1) . "</td></tr>\n";
  				$summarytext .= "<tr><td>Shrinkage:</td><td>" . round(($x_array['mat1bulk'] - ($x_array['mat1bulk'] / $matshrink1)), 1) . "</td></tr>\n";
  				$summarytext .= "<tr class='border-top'><td><strong>Tons of Material</strong></td><td><strong>" . $x_array['mat1bulk'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";

  				$totalmaterial = self::total_material_value( 'bulk', $x_array['mat1name'], $x_array['mat1bulk'], $totalmaterial );
  			}



  			if ($x_array['mat1bags'] > 0 ) {
  				$summarytext .= "<div class='report-table'>\n";
  				$summarytext .= "<div class='material-name'>" . $x_array['mat1name'] . "</div>\n";
  				$summarytext .= "<table class='results-table'>\n";
  				$summarytext .= "<tr class=''><td><strong>Bags of Material</strong></td><td><strong>" . $x_array['mat1bags'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";
  				$totalmaterial = self::total_material_value( 'bag', $x_array['mat1name'], $x_array['mat1bags'], $totalmaterial );
  			}

  			if ($x_array['brickbags'] > 0 ) {
  				$summarytext .= "<div class='report-table'>\n";
  				$summarytext .= "<div class='material-name'>Mar-Co Field Bricks (8 per bag)</div>\n";
  				$summarytext .= "<table class='results-table'>\n";
  				$summarytext .= "<tr class=''><td><strong>Bags of Bricks</strong></td><td><strong>" . $x_array['brickbags'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";
  				$totalmaterial = self::total_material_value( 'bag', 'Field Bricks', $x_array['brickbags'], $totalmaterial );
  			}

  			if (!($x_array['mat2name'] == '')) {
  				$material2 = $x_array['mat2'];

  				$lookup2_mat = self::get_material($material2);
  				$matweight2 = $lookup2_mat['weight_factor'];
  				$matshrink2 = $lookup2_mat['shrink_factor'];

  				$summarytext .= "<div class='report-table'>\n";
  				$summarytext .= "<div class='material-name'>" . $x_array['mat2name'] . "</div>\n";
  				$summarytext .= "<table class='results-table'>\n";
  				$summarytext .= "<tr><td>Weight:</td><td>" . round(($x_array['mat2qty'] / $matshrink2),1) . "</td></tr>\n";
  				$summarytext .= "<tr><td>Shrinkage:</td><td>" . round(($x_array['mat2qty'] - ($x_array['mat2qty'] / $matshrink2)),1) . "</td></tr>\n";
  				$summarytext .= "<tr class='border-top'><td><strong>Tons of Material</strong></td><td><strong>" . $x_array['mat2qty'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";

  				$totalmaterial = self::total_material_value( 'bulk', $x_array['mat2name'], $x_array['mat2qty'], $totalmaterial );
  			}

  			$summarytext .= "</div>\n";
  			$summarytext .= "<div style='clear:both;'></div>\n";


    }
    if ( get_field('has_home_plate_mound_area', $quote_id) == "1" ){

    $summarytext .= "<div class='report-section-title home-plate'><h6><b>Home Plate Mound Area - Results</b></h6><span class='report-adjust-link'><a href='/quote/modify/home-plate-area/?qid=" . $quote_id .  "'>Adjust</a></span></div>\n";

      $x_array = self::generate_totals_for_form( $quote_id, 3, 'array' );

      if (!($x_array['mat1name'] == '')) {
  			$summarytext .= "<div class='title-div'><span class='report-title'>Finishing Layer Product:</span><br />" . $x_array['mat1name'] . "</div>\n";
        if ( is_object($x_array['mat1']) ){
          $product_qty[$x_array['mat1']->ID] += $x_array['mat1qty'];
    			$product_name[$x_array['mat1']->ID] = $x_array['mat1name'];
        } else {
          $product_qty[$x_array['mat1']] += $x_array['mat1qty'];
    			$product_name[$x_array['mat1']] = $x_array['mat1name'];
        }


  		}
  		if (!($x_array['mat2name'] == '')) {
  			$summarytext .= "<div class='title-div'><span class='report-title'>Base Layer Product:</span><br />" . $x_array['mat2name'] . "</div>\n";
        if ( is_object($x_array['mat2']) ){
          $product_qty[$x_array['mat2']->ID] += $x_array['mat2qty'];
    			$product_name[$x_array['mat2']->ID] = $x_array['mat2name'];
        } else {
          $product_qty[$x_array['mat2']] += $x_array['mat2qty'];
    			$product_name[$x_array['mat2']] = $x_array['mat2name'];
        }

  		}

  		$summarytext .= "<div class='report-values'>\n";
  		$summarytext .= "<div class='report-table-title'>Measurements:</div>\n";
		$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  		$summarytext .= "<tr><td>Area (sq. ft)</td><td>" . $x_array['squarefeet'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Home Plate Radius (feet)</td><td>" . $x_array['radius1'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Depth of Finishing Layer (inches)</td><td>" . $x_array['depth1'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Depth of Base Layer (inches)</td><td>" . $x_array['depth2'] . "</td></tr>\n";
  		$summarytext .= "</table></div>\n";


  		if (! (($x_array['bbox'] == 'none') || ($x_array['bbox'] == '')) ) {
  			$summarytext .= "<div class='report-table-title'>Batters Boxes:</div>\n";
  			$summarytext .= "<div style='margin-top:5px;'>" . $x_array['bboxqty'] . "</div>\n";
			$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  			$summarytext .= "<tr><td>Size</td><td>" . $x_array['bbox'] . "</td></tr>\n";
  			$summarytext .= "<tr><td>Use Field Bricks</td><td>" . $x_array['bboxbricks'] . "</td></tr>\n";
  			if (!($x_array['bboxmatname'] == '')) {
  				$summarytext .= "<tr><td>Product</td><td>" . $x_array['bboxmatname'] . "</td></tr>\n";
  				$summarytext .= "<tr><td>Bulk or Bags</td><td>" . $x_array['bboxmattype'] . "</td></tr>\n";
  			}
  			$summarytext .= "</table></div>\n";
  		}

  		if (! (($x_array['cbox'] == 'none') || ($x_array['cbox'] == '')) ) {
  			$summarytext .= "<div class='report-table-title'>Catchers Box:</div>\n";
  			$summarytext .= "<div style='margin-top:5px;'>" . $x_array['cboxqty'] . "</div>\n";
			$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  			$summarytext .= "<tr><td>Size</td><td>" . $x_array['cbox'] . "</td></tr>\n";
  			$summarytext .= "<tr><td>Use Field Bricks</td><td>" . $x_array['cboxbricks'] . "</td></tr>\n";
  			if (!($x_array['cboxmatname'] == '')) {
  				$summarytext .= "<tr><td>Product</td><td>" . $x_array['cboxmatname'] . "</td></tr>\n";
  				$summarytext .= "<tr><td>Bulk or Bags</td><td>" . $x_array['cboxmattype'] . "</td></tr>\n";
  			}
  			$summarytext .= "</table></div>\n";
  		}

  		if ($x_array['matbulk'] > 0) {
  			$product_qty[$x_array['bboxmat']] += $x_array['matbulk'];
  			$product_name[$x_array['bboxmat']] = $x_array['bboxmatname'];
  		}
  		if ($x_array['matbags'] > 0) {
  			$product_bags[$x_array['bboxmat']] += $x_array['matbags'];
  			$product_name[$x_array['bboxmat']] = $x_array['bboxmatname'];
  		}
  		if ($x_array['brickbags'] > 0) {
  			$product_bags[15] += $x_array['brickbags'];
  			$product_name[15] = "Field Bricks (8 per bag)";
  		}

  		$summarytext .= "</div>\n ";


  		$summarytext .= "<div class='report-results'>\n";

  			$summarytext .= "<div class='report-table-title'>Results</div>\n";

  			if (!($x_array['mat1name'] == '')) {
  				$material1 = $x_array['mat1'];

  				$lookup_mat = self::get_material($material1);
  				$matweight1 = $lookup_mat['weight_factor'];
  				$matshrink1 = $lookup_mat['shrink_factor'];

  				$summarytext .= "<div>\n";
  				$summarytext .= "<div class='material-name'>" . $x_array['mat1name'] . "</div>\n";
				$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  				$summarytext .= "<tr><td>Weight:</td><td>" . round(($x_array['mat1qty'] / $matshrink1), 1) . "</td></tr>\n";
  				$summarytext .= "<tr><td>Shrinkage:</td><td>" . round(($x_array['mat1qty'] - ($x_array['mat1qty'] / $matshrink1)), 1) . "</td></tr>\n";
  				$summarytext .= "<tr class='border-top'><td><strong>Tons of Material</strong></td><td><strong>" . $x_array['mat1qty'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";
  				$summarytext .= "</div>\n";

  				$totalmaterial = self::total_material_value( 'bulk', $x_array['mat1name'], $x_array['mat1qty'], $totalmaterial );
  			}

  			if (!($x_array['mat2name'] == '')) {
  				$material2 = $x_array['mat2'];

  				$lookup2_mat = self::get_material($material2);
  				$matweight2 = $lookup2_mat['weight_factor'];
  				$matshrink2 = $lookup2_mat['shrink_factor'];

  				$summarytext .= "<div>\n";
  				$summarytext .= "<div class='material-name'>" . $x_array['mat2name'] . "</div>\n";
				$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  				$summarytext .= "<tr><td>Weight:</td><td>" . round(($x_array['mat2qty'] / $matshrink2),1) . "</td></tr>\n";
  				$summarytext .= "<tr><td>Shrinkage:</td><td>" . round(($x_array['mat2qty'] - ($x_array['mat2qty'] / $matshrink2)),1) . "</td></tr>\n";
  				$summarytext .= "<tr class='border-top'><td><strong>Tons of Material</strong></td><td><strong>" . $x_array['mat2qty'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";
  				$summarytext .= "</div>\n";

  				$totalmaterial = self::total_material_value( 'bulk', $x_array['mat2name'], $x_array['mat2qty'], $totalmaterial );

  			}

  			if ($x_array['matbulk'] > 0 ) {
  				$summarytext .= "<div>\n";
  				$summarytext .= "<div class='material-name'>" . $x_array['bboxmatname'] . "</div>\n";
				$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  				$summarytext .= "<tr><td>Tons of Material</td><td><strong>" . $x_array['matbulk'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";
  				$summarytext .= "</div>\n";

  				$totalmaterial = self::total_material_value( 'bulk', $x_array['bboxmatname'], $x_array['matbulk'], $totalmaterial );
  			}

  			if ($x_array['matbags'] > 0 ) {
  				$summarytext .= "<div>\n";
  				$summarytext .= "<div class='material-name'>" . $x_array['bboxmatname'] . "</div>\n";
				$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  				$summarytext .= "<tr><td>Bags of Material</td><td><strong>" . $x_array['matbags'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";
  				$summarytext .= "</div>\n";

  				$totalmaterial = self::total_material_value( 'bag', $x_array['bboxmatname'], $x_array['matbags'], $totalmaterial );
  			}

  			if ($x_array['brickbags'] > 0 ) {
  				$summarytext .= "<div>\n";
  				$summarytext .= "<div class='material-name'>Mar-Co Field Bricks</div> (8 per bag)\n";
				$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  				$summarytext .= "<tr><td>Bags of Bricks</td><td><strong>" . $x_array['brickbags'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";
  				$summarytext .= "</div>\n";

  				$totalmaterial = self::total_material_value( 'bag', 'Field Bricks', $x_array['brickbags'], $totalmaterial );
  			}

  			$summarytext .= "</div>\n";
  			$summarytext .= "<div style='clear:both;'></div>\n";

    }
    if ( get_field('has_warning_track_area', $quote_id) == "1" ){

    $summarytext .= "<div class='report-section-title warning-track'><h6><b>Warning Track Area - Results</b></h6><span class='report-adjust-link'><a href='/quote/modify/warning-track-area/?qid=" . $quote_id .  "'>Adjust</a></span></div>\n";

      $x_array = self::generate_totals_for_form( $quote_id, 4, 'array' );

      if (!($x_array['mat1name'] == '')) {
  			$summarytext .= "<div class='title-div'><span class='report-title'>Finishing Layer Product:</span><br />" . $x_array['mat1name'] . "</div>\n";
        if ( is_object($x_array['mat1']) ){
          $product_qty[$x_array['mat1']->ID] += $x_array['mat1qty'];
    			$product_name[$x_array['mat1']->ID] = $x_array['mat1name'];
        } else {
          $product_qty[$x_array['mat1']] += $x_array['mat1qty'];
    			$product_name[$x_array['mat1']] = $x_array['mat1name'];
        }


  		}
  		if (!($x_array['mat2name'] == '')) {
  			$summarytext .= "<div class='title-div'><span class='report-title'>Base Layer Product:</span><br />" . $x_array['mat2name'] . "</div>\n";
        if ( is_object($x_array['mat2']) ){
          $product_qty[$x_array['mat2']->ID] += $x_array['mat2qty'];
    			$product_name[$x_array['mat2']->ID] = $x_array['mat2name'];
        } else {
          $product_qty[$x_array['mat2']] += $x_array['mat2qty'];
    			$product_name[$x_array['mat2']] = $x_array['mat2name'];
        }

  		}

  		$summarytext .= "<div class='report-values'>\n";
  		$summarytext .= "<div class='report-table-title'>Measurements:</div>\n";
		$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  		$summarytext .= "<tr><td>Area (sq. ft)</td><td>" . $x_array['squarefeet'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Length (feet)</td><td>" . $x_array['length1'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Width (feet)</td><td>" . $x_array['width1'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Depth of Finishing Layer (inches)</td><td>" . $x_array['depth1'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Depth of Base Layer (inches)</td><td>" . $x_array['depth2'] . "</td></tr>\n";
  		$summarytext .= "</table></div>\n";
  		$summarytext .= "</div>\n";



  		$summarytext .= "<div class='report-results'>\n";

  			$summarytext .= "<div class='report-table-title'>Results</div>\n";

  			if (!($x_array['mat1name'] == '')) {
  				$material1 = $x_array['mat1'];

  				$lookup_mat = self::get_material($material1);
  				$matweight1 = $lookup_mat['weight_factor'];
  				$matshrink1 = $lookup_mat['shrink_factor'];

  				$summarytext .= "<div>\n";
  				$summarytext .= "<div class='material-name'>" . $x_array['mat1name'] . "</div>\n";
				$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  				$summarytext .= "<tr><td>Weight:</td><td>" . round(($x_array['mat1qty'] / $matshrink1), 1) . "</td></tr>\n";
  				$summarytext .= "<tr><td>Shrinkage:</td><td>" . round(($x_array['mat1qty'] - ($x_array['mat1qty'] / $matshrink1)), 1) . "</td></tr>\n";
  				$summarytext .= "<tr class='border-top'><td><strong>Tons of Material</strong></td><td><strong>" . $x_array['mat1qty'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";
  				$summarytext .= "</div>\n";

  				$totalmaterial = self::total_material_value( 'bulk', $x_array['mat1name'], $x_array['mat1qty'], $totalmaterial );
  			}

  			if (!($x_array['mat2name'] == '')) {
  				$material2 = $x_array['mat2'];

  				$lookup2_mat = self::get_material($material2);
  				$matweight2 = $lookup2_mat['weight_factor'];
  				$matshrink2 = $lookup2_mat['shrink_factor'];

  				$summarytext .= "<div>\n";
  				$summarytext .= "<div class='material-name'>" . $x_array['mat2name'] . "</div>\n";
				$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  				$summarytext .= "<tr><td>Weight:</td><td>" . round(($x_array['mat2qty'] / $matshrink2),1) . "</td></tr>\n";
  				$summarytext .= "<tr><td>Shrinkage:</td><td>" . round(($x_array['mat2qty'] - ($x_array['mat2qty'] / $matshrink2)),1) . "</td></tr>\n";
  				$summarytext .= "<tr class='border-top'><td><strong>Tons of Material</strong></td><td><strong>" . $x_array['mat2qty'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";
  				$summarytext .= "</div>\n";

  				$totalmaterial = self::total_material_value( 'bulk', $x_array['mat2name'], $x_array['mat2qty'], $totalmaterial );
  			}

  			$summarytext .= "</div>\n";
  			$summarytext .= "<div style='clear:both;'></div>\n";


    }
    if ( get_field('has_bull_pen_area', $quote_id) == "1" ){

    $summarytext .= "<div class='report-section-title bull-pen'><h6><b>Bull Pen Area - Results</b></h6><span class='report-adjust-link'><a href='/quote/modify/bull-pen-area/?qid=" . $quote_id .  "'>Adjust</a></span></div>\n";

      $x_array = self::generate_totals_for_form( $quote_id, 5, 'array' );

      if (!($x_array['mat1name'] == '')) {
  			$summarytext .= "<div class='title-div'><span class='report-title'>Finishing Layer Product:</span><br />" . $x_array['mat1name'] . "</div>\n";
        if ( is_object($x_array['mat1']) ){
          $product_qty[$x_array['mat1']->ID] += $x_array['mat1qty'];
    			$product_name[$x_array['mat1']->ID] = $x_array['mat1name'];
        } else {
			$product_qty[$x_array['mat1']] += $x_array['mat1qty'];
			$product_name[$x_array['mat1']] = $x_array['mat1name'];
        }


  		}
  		if (!($x_array['mat2name'] == '')) {
  			$summarytext .= "<div class='title-div'><span class='report-title'>Base Layer Product:</span><br />" . $x_array['mat2name'] . "</div>\n";
        if ( is_object($x_array['mat2']) ){
          $product_qty[$x_array['mat2']->ID] += $x_array['mat2qty'];
    			$product_name[$x_array['mat2']->ID] = $x_array['mat2name'];
        } else {
          $product_qty[$x_array['mat2']] += $x_array['mat2qty'];
    			$product_name[$x_array['mat2']] = $x_array['mat2name'];
        }

  		}

  		$summarytext .= "<div class='report-values'>\n";
  		$summarytext .= "<div class='report-table-title'>Measurements:</div>\n";
		$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  		$summarytext .= "<tr><td>Number of Bull Pens</td><td>" . $x_array['quantity'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Area (sq. ft)</td><td>" . $x_array['squarefeet'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Length (feet)</td><td>" . $x_array['length1'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Width (feet)</td><td>" . $x_array['width1'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Depth of Finishing Layer (inches)</td><td>" . $x_array['depth1'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Depth of Base Layer (inches)</td><td>" . $x_array['depth2'] . "</td></tr>\n";
  		$summarytext .= "</table></div>\n";
  		$summarytext .= "</div>\n";


  		$summarytext .= "<div class='report-results'>\n";

  			$summarytext .= "<div class='report-table-title'>Results</div>\n";

  			if (!($x_array['mat1name'] == '')) {
  				$material1 = $x_array['mat1'];

  				$lookup_mat = self::get_material($material1);
  				$matweight1 = $lookup_mat['weight_factor'];
  				$matshrink1 = $lookup_mat['shrink_factor'];

  				$summarytext .= "<div>\n";
  				$summarytext .= "<div class='material-name'>" . $x_array['mat1name'] . "</div>\n";
				$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  				$summarytext .= "<tr><td>Weight:</td><td>" . round(($x_array['mat1qty'] / $matshrink1), 1) . "</td></tr>\n";
  				$summarytext .= "<tr><td>Shrinkage:</td><td>" . round(($x_array['mat1qty'] - ($x_array['mat1qty'] / $matshrink1)), 1) . "</td></tr>\n";
  				$summarytext .= "<tr class='border-top'><td><strong>Tons of Material</strong></td><td><strong>" . $x_array['mat1qty'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";
  				$summarytext .= "</div>\n";

  				$totalmaterial = self::total_material_value( 'bulk', $x_array['mat1name'], $x_array['mat1qty'], $totalmaterial );

  			}

  			if (!($x_array['mat2name'] == '')) {
  				$material2 = $x_array['mat2'];

  				$lookup2_mat = self::get_material($material2);
  				$matweight2 = $lookup2_mat['weight_factor'];
  				$matshrink2 = $lookup2_mat['shrink_factor'];

  				$summarytext .= "<div>\n";
  				$summarytext .= "<div class='material-name'>" . $x_array['mat2name'] . "</div>\n";
				$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  				$summarytext .= "<tr><td>Weight:</td><td>" . round(($x_array['mat2qty'] / $matshrink2),1) . "</td></tr>\n";
  				$summarytext .= "<tr><td>Shrinkage:</td><td>" . round(($x_array['mat2qty'] - ($x_array['mat2qty'] / $matshrink2)),1) . "</td></tr>\n";
  				$summarytext .= "<tr class='border-top'><td><strong>Tons of Material</strong></td><td><strong>" . $x_array['mat2qty'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";
  				$summarytext .= "</div>\n";

  				$totalmaterial = self::total_material_value( 'bulk', $x_array['mat2name'], $x_array['mat2qty'], $totalmaterial );
  			}

  			$summarytext .= "</div>\n";
  			$summarytext .= "<div style='clear:both;'></div>\n";


    }
    if ( get_field('has_misc_area', $quote_id) == "1" ){

    $summarytext .= "<div class='report-section-title misc-area'><h6><b>Miscellaneous Area - Results</b></h6><span class='report-adjust-link'><a href='/quote/modify/miscellaneous-area/?qid=" . $quote_id .  "'>Adjust</a></span></div>\n";

      $x_array = self::generate_totals_for_form( $quote_id, 6, 'array' );

      $summarytext .= "<div>\n";
  		$summarytext .= "<div>\n";
  		$summarytext .= "<strong>Area Name: " . $x_array['description'] . "</strong></div>\n";
  		$summarytext .= "</div>\n";

  		$summarytext .= "<div>\n";

  		if (!($x_array['mat1name'] == '')) {
  			$summarytext .= "<div class='title-div' style='margin-top:10px;'><span class='report-title'>Finishing Layer Product:</span><br />" . $x_array['mat1name'] . "</div>\n";
        if ( is_object($x_array['mat1']) ){
          $product_qty[$x_array['mat1']->ID] += $x_array['mat1qty'];
    			$product_name[$x_array['mat1']->ID] = $x_array['mat1name'];
        } else {
          $product_qty[$x_array['mat1']] += $x_array['mat1qty'];
    			$product_name[$x_array['mat1']] = $x_array['mat1name'];
        }


  		}
  		if (!($x_array['mat2name'] == '')) {
  			$summarytext .= "<div class='title-div'><span class='report-title'>Base Layer Product:</span><br />" . $x_array['mat2name'] . "</div>\n";
        if ( is_object($x_array['mat2']) ){
          $product_qty[$x_array['mat2']->ID] += $x_array['mat2qty'];
    			$product_name[$x_array['mat2']->ID] = $x_array['mat2name'];
        } else {
          $product_qty[$x_array['mat2']] += $x_array['mat2qty'];
    			$product_name[$x_array['mat2']] = $x_array['mat2name'];
        }

  		}

  		$summarytext .= "<div class='report-values'>\n";
  		$summarytext .= "<div class='report-table-title'>Measurements:</div>\n";
		$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  		$summarytext .= "<tr><td>Quantity</td><td>" . $x_array['quantity'] . "</td></tr>\n";

  		if ($x_array['width1'] == '1') {
  			$summarytext .= "<tr><td>Area (sq. ft)</td><td>" . $x_array['length1'] . "</td></tr>\n";
  		} else {
            $summarytext .= "<tr><td>Area (sq. ft)</td><td>" . $x_array['squarefeet'] . "</td></tr>\n";
  			$summarytext .= "<tr><td>Length (feet)</td><td>" . $x_array['length1'] . "</td></tr>\n";
  			$summarytext .= "<tr><td>Width (feet)</td><td>" . $x_array['width1'] . "</td></tr>\n";
  		}
  		$summarytext .= "<tr><td>Depth of Finishing Layer (inches)</td><td>" . $x_array['depth1'] . "</td></tr>\n";
  		$summarytext .= "<tr><td>Depth of Base Layer (inches)</td><td>" . $x_array['depth2'] . "</td></tr>\n";
  		$summarytext .= "</table></div>\n";
  		$summarytext .= "</div>\n";



  		$summarytext .= "<div class='report-results'>\n";

  			$summarytext .= "<div class='report-table-title'>Results</div>\n";

  			if (!($x_array['mat1name'] == '')) {
  				$material1 = $x_array['mat1'];

  				$lookup_mat = self::get_material($material1);
  				$matweight1 = $lookup_mat['weight_factor'];
  				$matshrink1 = $lookup_mat['shrink_factor'];

  				$summarytext .= "<div>\n";
  				$summarytext .= "<div class='material-name'>" . $x_array['mat1name'] . "</div>\n";
				$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  				$summarytext .= "<tr><td>Weight:</td><td>" . round(($x_array['mat1qty'] / $matshrink1), 1) . "</td></tr>\n";
  				$summarytext .= "<tr><td>Shrinkage:</td><td>" . round(($x_array['mat1qty'] - ($x_array['mat1qty'] / $matshrink1)), 1) . "</td></tr>\n";
  				$summarytext .= "<tr class='border-top'><td><strong>Tons of Material</strong></td><td><strong>" . $x_array['mat1qty'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";
  				$summarytext .= "</div>\n";

  				$totalmaterial = self::total_material_value( 'bulk', $x_array['mat1name'], $x_array['mat1qty'], $totalmaterial );
  			}

  			if (!($x_array['mat2name'] == '')) {
  				$material2 = $x_array['mat2'];

  				$lookup2_mat = self::get_material($material2);
  				$matweight2 = $lookup2_mat['weight_factor'];
  				$matshrink2 = $lookup2_mat['shrink_factor'];

  				$summarytext .= "<div>\n";
  				$summarytext .= "<div class='material-name'>" . $x_array['mat2name'] . "</div>\n";
				$summarytext .= "<div class='report-table'><table class='values-table'>\n";
  				$summarytext .= "<tr><td>Weight:</td><td>" . round(($x_array['mat2qty'] / $matshrink2),1) . "</td></tr>\n";
  				$summarytext .= "<tr><td>Shrinkage:</td><td>" . round(($x_array['mat2qty'] - ($x_array['mat2qty'] / $matshrink2)),1) . "</td></tr>\n";
  				$summarytext .= "<tr class='border-top'><td><strong>Tons of Material</strong></td><td><strong>" . $x_array['mat2qty'] . "</strong></td></tr>\n";
  				$summarytext .= "</table></div>\n";
  				$summarytext .= "</div>\n";

  				$totalmaterial = self::total_material_value( 'bulk', $x_array['mat2name'], $x_array['mat2qty'], $totalmaterial );
  			}

  			$summarytext .= "</div>\n";
  			$summarytext .= "<div style='clear:both;'></div>\n";

    }
		$summarytext .= "</div>";

    /// This is for the total break down of all the materials
    $subtotalbulk = '';

    $totaltable = "<div class='report-section-container totals'><div class='report-total'><b>TOTALS</b></div>\n";

    $totaltable .= "<div class='report-table'><table class='values-table'>";
    $totaltable .= "<tr class='border-bottom background-orange'><td class='material-name'>PRODUCTS:</td><td class='material-name'>QUANTITY Bulk (tons)</td></tr>";

	// List all of the bulk
    foreach ($totalmaterial as $category => $cat ) {
			if ($category == 'bulk'){
				foreach ($cat as $material => $value) {
			    	$totaltable .= "<tr><td>" . $material . "</td><td>" . $value . "</td></tr>";
					$subtotalbulk .= $value;
		    	}
			}
    }

    $totaltable .= "<tr class='border-top no-background-colour'><td class='material-name'>Sub-Total (Bulk)	</td><td class='material-name'>". $subtotalbulk . "</td></tr>";
    $totaltable .= "<tr class='border-bottom background-orange'><td class='material-name'>Bags (40 lb)	</td><td class='material-name'></td></tr>";

	// List all of the bagged producs
    foreach ($totalmaterial as $category => $cat ) {
			if ($category == 'bag'){
				foreach ($cat as $material => $value) {
			    	$totaltable .= "<tr><td>" . $material . "</td><td>" . $value . "</td></tr>";

		    	}
			}
    }


    $totaltable .= "</table></div></div>";


    $totalmatsummary .= $totaltable;

    $totalmatsummary .= $summarytext;

    return $totalmatsummary;
  }

	///////////////////////////////////
   //      Sidebar results Code
   ///////////////////////////////////

  // if type equals html, output the html results.
  // if type equals array, output an array of the metrics
  private static function generate_totals_for_form( $quote_id, $form_id, $type = 'html' ){
    $html = "<table class='side-table'>";
    switch( $form_id ){
        case 1:


        $material1 = get_field('marco_infield_skin_materials', $quote_id);
        $lookup_mat = self::get_material($material1);

        $matname1 = $lookup_mat['name'];
        $matweight1 = $lookup_mat['weight_factor'];
        //echo("Wt Fct - " . $matweight1 . "<br />");
        $matshrink1 = $lookup_mat['shrink_factor'];
        //echo("Shrk Fct - " . $matshrink1 . "<br />");

        $infield1 = get_field('marco_infield_skin_grass_infield', $quote_id);
        //echo("Grass Infield - " . $infield1 . "<br />");

        $sideline1 = get_field('marco_infield_skin_grass_sidelines', $quote_id);
        //echo("Grass Sidelines - " . $sideline1 . "<br />");

        $radius1 = get_field('marco_infield_skin_radius_feet', $quote_id);
        if (!(is_numeric($radius1))) {
          $radius1 = 0;
        }
        //echo("Radius - " . $radius1 . "<br />");

        $baselength1 = get_field('marco_infield_skin_base_length_feet', $quote_id);
        if (!(is_numeric($baselength1))) {
          $baselength1 = 0;
        }
        //echo("Base Length - " . $baselength1 . "<br />");

        $basepath1 = get_field('marco_infield_skin_base_path_width_feet', $quote_id);
        if (!(is_numeric($basepath1))) {
          $basepath1 = 0;
        }
        //echo("Base Path Width - " . $basepath1 . "<br />");

        $sidelength1 = get_field('marco_infield_skin_sidelines_length_feet', $quote_id);
        if (!(is_numeric($sidelength1))) {
          $sidelength1 = 0;
        }
        //echo("Sideline Length - " . $sidelength1 . "<br />");

        $sidewidth1 = get_field('maco_infield_skin_sidelines_width_feet', $quote_id);
        if (!(is_numeric($sidewidth1))) {
          $sidewidth1 = 0;
        }
        //echo("Sideline Width - " . $sidewidth1 . "<br />");

        $depth1 = get_field('marco_infiedl_skin_depth_of_finishing_layer_material_inches', $quote_id);
        //echo("Depth 1 - " . $depth1 . "<br />");
        if (!(is_numeric($depth1))) {
          $depth1 = 0;
        }
        //echo("Depth 1 - " . $depth1 . "<br />");

        $material2 = get_field('marco_infield_skin_base_layer', $quote_id);
        $lookup2_mat = self::get_material($material2);
        $matname2 = $lookup2_mat['name'];
        $matweight2 = $lookup2_mat['weight_factor'];
        //echo("Wt Fct - " . $matweight2 . "<br />");
        $matshrink2 = $lookup2_mat['shrink_factor'];
        //echo("Shrk Fct - " . $matshrink2 . "<br />");

        $depth2 = get_field('marco_infield_skin_base_material_depth_of_base_layer_material_inches', $quote_id);
        if (!(is_numeric($depth2))) {
          $depth2 = 0;
        }
        //echo("Depth 2 - " . $depth2 . "<br /><br />");

        $subtotal = 0;
        $total1 = 0;
        $total2 = 0;

        //radius area
        $subtotal += $radius1 * $radius1 * pi() * 0.5;
        //echo("Subtotal Radius- " . $subtotal . "<br />");
        //echo pi();

        //grass infield area
        if ($infield1 == 'Yes' || $infield1 == 'yes' ) {
          $subtotal -= ($baselength1 - 2) * ($baselength1 - 2) * 0.5;
		  //echo("Subtotal Infield = yes - " . $subtotal . "<br />");
        } else {
          $subtotal += $baselength1 * $baselength1 * 0.5;
		  //echo("Subtotal Infield = no - " . $subtotal . "<br />");
        }
        //base path area
        if ($infield1 == 'Yes' ||  $infield1 == 'yes') {
          $subtotal += $baselength1 * $basepath1 * 2;
          //echo("Subtotal - " . $subtotal . "<br />");
        }
        if ($sideline1 == 'no' || $sideline1 == 'No' ) {
          //sideline area
          $subtotal += $sidelength1 * $sidewidth1 * 2;
		  //echo("Subtotal - " . $subtotal . "<br />");
          //backstop area
          $subtotal += $sidewidth1 * $sidewidth1;
		  //echo("Subtotal - " . $subtotal . "<br />");
        }
            
        $sqft = $subtotal;
        $sqft = round($sqft /10) * 10;
        $subtotal = ($subtotal / 27) / 12;
//        if( $_SERVER['REMOTE_ADDR']=='135.23.126.180' ) echo("LOOK HERE Subtotal - " . $subtotal . "<br /><br />");
        $total1 = $subtotal * $depth1 * $matweight1 * $matshrink1;
        //echo("Subtotal - " . $subtotal . "<br /><br />");
        //echo("Depth - " . $depth1 . "<br /><br />");
        //echo("Material Weight - " . $matweight1 . "<br /><br />");
        //echo("Material Shrink - " . $matshrink1 . "<br /><br />");
        $total1 = round($total1, 1);
        if ($total1 < 0) {
          $total1 = 0.0;
        }
        //echo("Total1 - " . $total1 . "<br /><br />");

        $total2 = $subtotal * $depth2 * $matweight2 * $matshrink2;
        $total2 = round($total2, 1);
        if ($total2 < 0) {
          $total2 = 0.0;
        }


        $total1 = number_format($total1, 1, '.', ',');
        $total2 = number_format($total2, 1, '.', ',');

            if ($matname1 != '') {
              $html .= "<tr><td>" . $matname1 . "</td><td>" . $total1 . "</td></tr>";
            }
            if ($matname2 != '') {
              $html .= "<tr><td>" . $matname2 . "</td><td>" . $total2 . "</td></tr>";
            }


            /*mat1=$material1, mat1name='$matname1', grass1='$infield1', " .
        			"grass2='$sideline1', measure1=$radius1, measure2=$baselength1, measure3=$basepath1, measure4=$sidelength1, " .
        			"measure5=$sidewidth1, depth1=$depth1, mat2=$material2, mat2name='$matname2', depth2=$depth2, " .
        			"mat1qty=$total1, mat2qty=$total2*/

              if ( $type == 'array' ){
                return array(
                  'mat1' => $material1,
                  'mat1name' => $matname1,
                  'grass1' => $infield1,
                  'grass2' => $sideline1,
                  'measure1' => $radius1,
                  'measure2' => $baselength1,
                  'measure3' => $basepath1,
                  'measure4' => $sidelength1,
                  'measure5' => $sidewidth1,
                  'depth1' => $depth1,
                  'mat2' => $material2,
                  'mat2name' => $matname2,
                  'depth2' => $depth2,
                  'mat1qty' => $total1,
                  'mat2qty' => $total2,
                  'squarefeet' => $sqft
                );
              }



          break;
        case 2:


        $moundstyle = get_field('marco_pitchers_mound_select_a_mound_construction_method', $quote_id);

        $material1 = get_field('marco_pitchers_mound_materials', $quote_id);
        $lookup1_mat = self::get_material($material1);
        $matname1 = $lookup1_mat['name'];
        $matweight1 = $lookup1_mat['weight_factor'];
        $matshrink1 = $lookup1_mat['shrink_factor'];




      	$mat1type = get_field('marco_pitchers_mound_materials_packaging', $quote_id);
      	$usebricks = get_field('marco_pitchers_mound_use_field_bricks', $quote_id);
      	$brickstyle = get_field('marco_pitchers_mound_select_brick_layout', $quote_id);

      	$radius1 = get_field('marco_pitchers_mount_mound_radius_feet', $quote_id);
      	if (!(is_numeric($radius1))) {
      		$radius1 = 0;
      	}

      	if ($moundstyle == 'cap_construction') {
      		$height1 = get_field('marco_pitchers_mound_depth_of_mound_cap_inches', $quote_id);
      	} else {
      		$height1 = get_field('marco_pitchers_mound_pitching_rubber_height_inches', $quote_id);
      	}
      	if (!(is_numeric($height1))) {
      		$height1 = 0;
      	}


        $material2 = get_field('marco_pitchers_mound_second_material', $quote_id);
        $lookup2_mat = self::get_material($material2);
        $matname2 = $lookup2_mat['name'];
        $matweight2 = $lookup2_mat['weight_factor'];
        $matshrink2 = $lookup2_mat['shrink_factor'];


      	$depth2 = get_field('marco_pitchers_mound_depth_of_base_layer_material_inches', $quote_id);
      	if (!(is_numeric($depth2))) {
      		$depth2 = 0;
      	}

      	$subtotal = 0;
      	$subtotalsub = 0;
      	$total1 = 0;
      	$total2 = 0;
      	$bricktotal = 0;

      	//radius area
      	if ($moundstyle == 'cap_construction') {
      		$subtotal += $height1 * $radius1 * $radius1 * pi() / 27 / 12;
      	} else if ($moundstyle == 'standard') {
      		$subtotal += $height1 * $radius1 * $radius1 * pi() / 27 / 12 * 0.5;
      	} else if ($moundstyle == 'bricks_only_construction') {
      		$subtotalsub += $radius1 * $radius1 * pi() / 27 / 12 * 0.5;
      	} else if ($moundstyle == 'softball_pitchers_pad') {
      		$subtotalsub += 8 * 3.333 / 27 / 12;
      		$radius1 = 0;
      	}
      	$subtotal1 = $subtotal * $matweight1 * $matshrink1;
      	if ($mat1type == 'bagged') {
      		$subtotal1 = ceil($subtotal1 * 2000 / 40);
      	} else {
      		$subtotal1 = round($subtotal1, 1);
      	}

      	if ($moundstyle == 'softball_pitchers_pad') {
      		$usebricks = 'yes';
      		$brickstyle = 'standard';
      		$bricktotal = 15;
      		if ($mat1type == 'bagged') {
      			$subtotal1 = 15;
      		} else {
      			$subtotal1 = 0.3;
      		}
      	} else if (($usebricks == 'yes' || $usebricks == 'Yes' ) && (!($moundstyle == 'bricks_only_construction'))) {
      		if ($brickstyle == 'expanded' || $brickstyle == 'Expanded') {
      			$bricktotal = 35;
      			if ($mat1type == 'bagged') {
      				$subtotal1 = $subtotal1 - 45;
      			} else {
      				$subtotal1 = $subtotal1 - 0.9;
      			}
      		} else {
      			$bricktotal = 23;
      			if ($mat1type == 'bagged') {
      				$subtotal1 = $subtotal1 - 30;
      			} else {
      				$subtotal1 = $subtotal1 - 0.6;
      			}
      		}
      	} else if ($moundstyle == 'bricks_only_construction') {
      		if ($brickstyle == 'expanded' || $brickstyle == 'Expanded') {
      			$bricktotal = 35;
      			if ($mat1type == 'bagged') {
      				$subtotal1 = 35;
      			} else {
      				$subtotal1 = 0.7;
      			}
      		} else {
      			$bricktotal = 23;
      			if ($mat1type == 'bagged') {
      				$subtotal1 = 23;
      			} else {
      				$subtotal1 = 0.5;
      			}
      		}
      	}

      	//$total1 =
      	$total1 = $subtotal1;
      	//echo("Total1 - " . $total1 . "<br /><br />");

      	if ( ($moundstyle == 'bricks_only_construction') || ($moundstyle == 'softball_pitchers_pad')) {
      		$total2 = $subtotalsub * $depth2 * $matweight2 * $matshrink2;
      		$total2 = round($total2, 1);
      	} else {
      		$total2 = $subtotal * $depth2 * $matweight2 * $matshrink2;
      		$total2 = round($total2, 1);
      	}


        $total1 = number_format($total1, 1, '.', ',');
        $total2 = number_format($total2, 1, '.', ',');

          if ($mat1type == 'in_bulk' && $total1 > 0) {
            $html .= "<tr><td>" . $matname1 . "</td><td>" . $total1 . "</td></tr>";
          }
          if ($mat1type == 'bagged' && $total1 > 0) {
            $html .= "<tr><td >" . $matname1 . " </td><td> " . $total1 . " Bags </td></tr>";
          }
          if ($bricktotal > 0) {
            $html .= "<tr><td >Field Bricks </td><td> " . $bricktotal . " Bags </td></tr>";
          }

          if ($matname2 != '') {
            $html .= "<tr><td>" . $matname2 . "</td><td>" . $total2 . "</td></tr>";
          }



          /*mat1=$material1, mat1name='$matname1', mat1type='$mat1type', " .
      			"moundstyle='$moundstyle', usebricks='$usebricks', brickstyle='$brickstyle', brickbags=$bricktotal, " .
      			"radius1=$radius1, height1=$height1, mat2=$material2, mat2name='$matname2', depth2=$depth2, ";

      			if ($mat1type == 'bulk') {
      				$build_sql .= "mat1bulk=$total1, mat1bags=0, ";
      			} else if ($mat1type == 'bags') {
      				$build_sql .= "mat1bags=$total1, mat1bulk=0, ";
      			}
      		$build_sql .= "mat2qty=$total2*/


          if ( $type == 'array' ){
            $t = array(
              'mat1' => $material1,
              'mat1name' => $matname1,
              'mat1type' => $mat1type,
              'moundstyle' => $moundstyle,
              'usebricks' => $usebricks,
              'brickstyle' => $brickstyle,
              'brickbags' => $bricktotal,
              'radius1' => $radius1,
              'height1' => $height1,
              'mat2' => $material2,
              'mat2name' => $matname2,
              'depth2' => $depth2,
              'mat2qty' => $total2
            );
            if ( $mat1type == 'in_bulk' ){
                $t['mat1bulk'] = $total1;
                $t['mat1bags'] = 0;
            } else if ( $mat1type == 'bagged' ){
                $t['mat1bags'] = $total1;
                $t['mat1bulk'] = 0;
            }
            return $t;
          }


          break;
        case 3:


        $material1 = get_field('marco_home_plate_material', $quote_id);
        $lookup1_mat = self::get_material($material1);
        $matname1 = $lookup1_mat['name'];
        $matweight1 = $lookup1_mat['weight_factor'];
        $matshrink1 = $lookup1_mat['shrink_factor'];





      	$radius1 = get_field('marco_home_plate_home_plate_radius_feet', $quote_id);
      	if (!(is_numeric($radius1))) {
      		$radius1 = 0;
      	}

      	$depth1 = get_field('marco_home_plate_depth_of_home_plate_materials_inches', $quote_id);
      	if (!(is_numeric($depth1))) {
      		$depth1 = 0;
      	}

      	$totalbricks = 0;
      	$totalbags = 0;
      	$totalbulk = 0;

      	$bbox = get_field('marco_home_plate_batters_boxes', $quote_id);
      	$bboxmat = get_field('marco_home_plate_select_the_finishing_layer_material_for_the_batters_boxes', $quote_id);
      	$bboxmattype = get_field('marco_home_plate_batters_box_materials_packaging_type', $quote_id); //bags, bulk
      	$bboxbricks = get_field('marco_home_plate_batters_box_use_field_bricks', $quote_id); //Use Field Bricks yes, no


        //$material2 = get_field('marco_pitchers_mound_second_material', $quote_id);
        $lookupb_mat = self::get_material($bboxmat);

      	$bboxmatname = $lookupb_mat['name'];

      	if ($bbox == '') {
      		$bbox = 'none';
      	} else if ($bbox == '3_x_5') {
	      	$bbox = '3 x 5';
      		if ($bboxbricks == 'yes' || $bboxbricks == 'yes') {
      			$totalbricks += 20;
      			if ($bboxmattype == 'bagged') {
      				$totalbags += 20;
      			} else {
      				$totalbulk += 0.4;
      			}
      		} else {
      			if ($bboxmattype == 'bagged') {
      				$totalbags += 34;
      			} else {
      				$totalbulk += 0.7;
      			}
      		}
      	} else if ($bbox == '4_x_6') {
	      	$bbox = '4 x 6';
      		if ($bboxbricks == 'yes' || $bboxbricks == 'Yes' ) {
      			$totalbricks += 28;
      			if ($bboxmattype == 'bagged') {
      				$totalbags += 28;
      			} else {
      				$totalbulk += 0.6;
      			}
      		} else {
      			if ($bboxmattype == 'bagged') {
      				$totalbags += 54;
      			} else {
      				$totalbulk += 1.2;
      			}
      		}
      	}

      	$cbox = get_field('marco_home_plate_catcher_box', $quote_id);
      	$cboxmat = get_field('macro_home_plate_select_the_finishing_layer_material_for_the_catchers_box', $quote_id);
      	$cboxmattype = get_field('marco_home_plate_catchers_box_materials_packaging_type', $quote_id); //bags, bulk
      	$cboxbricks = get_field('marco_home_plate_catchers_box_use_field_bricks', $quote_id); // Use Field Brick yes, no



      //  $material1 = get_field('marco_home_plate_material', $quote_id);
        $lookupc_mat = self::get_material($cboxmat);
        $cboxmatname = $lookupc_mat['name'];


      	if ($cbox == '') {
      		$cbox = 'none';
      	} else if ($cbox == '3_x_5') {
	      	$cbox = '3 x 5';
      		if ($cboxbricks == 'yes' || $cboxbricks == 'Yes' ) {
      			$totalbricks += 10;
      			if ($cboxmattype == 'bagged') {
      				$totalbags += 10;
      			} else {
      				$totalbulk += 0.2;
      			}
      		} else {
      			if ($cboxmattype == 'bagged') {
      				$totalbags += 17;
      			} else {
      				$totalbulk += 0.4;
      			}
      		}
      	} else if ($cbox == '4_x_6') {
	      	$cbox = '4 x 6';
      		if ($cboxbricks == 'yes' || $cboxbricks == 'Yes') {
      			$totalbricks += 14;
      			if ($cboxmattype == 'bagged') {
      				$totalbags += 14;
      			} else {
      				$totalbulk += 0.3;
      			}
      		} else {
      			if ($cboxmattype == 'bagged') {
      				$totalbags += 27;
      			} else {
      				$totalbulk += 0.6;
      			}
      		}
      	}

        $material2 = get_field('marco_home_plate_select_the_base_layer_material_for_the_home_plate_area', $quote_id);
        $lookup2_mat = self::get_material($material2);
        $matname2 = $lookup2_mat['name'];
        $matweight2 = $lookup2_mat['weight_factor'];
        $matshrink2 = $lookup2_mat['shrink_factor'];



      	$depth2 = get_field('marco_home_plate_depth_of_base_layer_second_material_inches', $quote_id);
      	if (!(is_numeric($depth2))) {
      		$depth2 = 0;
      	}

      	$subtotal = 0;
      	$total1 = 0;
      	$total2 = 0;

      	//radius area
      	$subtotal += $radius1 * $radius1 * pi() / 27 / 12;
        $sqft = $subtotal * 27 * 12;
        $sqft = round($sqft /10) * 10;

      	//echo("Subtotal - " . $subtotal . "<br />");

      	$total1 = $subtotal * $depth1 * $matweight1 * $matshrink1;
      	$total1 = round($total1, 1);
      	//echo("Total1 - " . $total1 . "<br /><br />");

      	$total2 = $subtotal * $depth2 * $matweight2 * $matshrink2;
      	$total2 = round($total2, 1);

        $total1 = number_format($total1, 1, '.', ',');
        $total2 = number_format($total2, 1, '.', ',');

          if ($matname1 != '') {
            $html .= "<tr><td>" . $matname1 . "</td><td>" . $total1 . "</td></tr>";
          }
          if ($matname2 > 0 ) {
            $html .= "<tr><td>" . $matname2 . "</td><td>" . $total2 . "</td></tr>";
          }

          if (($bbox != 'none') || ($cbox != 'none')) {
            $html .= "<tr><td colspan='2'><strong>Boxes:</strong></td></tr>";

            if ($totalbulk > 0) {
              $html .= "<tr><td >" . $bboxmatname . "</td><td>" . $totalbulk . "</td></tr>";
            }
            if ($totalbags > 0) {
              $html .= "<tr><td >" . $bboxmatname . "</td><td> " . $totalbags . " Bags </td></tr>";
            }

            if ($totalbricks > 0) {
              $html .= "<tr><td>Field Bricks </td><td>" . $totalbricks . " Bags</td></tr>";
            }
          }





          /*mat1=$material1, mat1name='$matname1', " .
      			"radius1=$radius1, depth1=$depth1, mat2=$material2, mat2name='$matname2', depth2=$depth2, " .
      			"bbox='$bbox', bboxmat=$bboxmat, bboxmatname='$bboxmatname', bboxmattype='$bboxmattype', bboxbricks='$bboxbricks', " .
      			"cbox='$cbox', cboxmat=$cboxmat, cboxmatname='$cboxmatname', cboxmattype='$cboxmattype', cboxbricks='$cboxbricks', " .
      			"brickbags=$totalbricks, matbags=$totalbags, matbulk=$totalbulk, " .
      			"mat1qty=$total1, mat2qty=$total2*/


            if ( $type == 'array' ){
              return array(
                'mat1' => $material1,
                'mat1name' => $matname1,
                'radius1' => $radius1,
                'depth1' => $depth1,
                'mat2' => $material2,
                'mat2name' => $matname2,
                'depth2' => $depth2,
                'bbox' => $bbox,
                'bboxmat' => $bboxmat,
                'bboxmatname' => $bboxmatname,
                'bboxmattype' => $bboxmattype,
                'bboxbricks' => $bboxbricks,
                'cbox' => $cbox,
                'cboxmat' => $cboxmat,
                'cboxmatname' => $cboxmatname,
                'cboxmattype' => $cboxmattype,
                'cboxbricks' => $cboxbricks,
                'brickbags' => $totalbricks,
                'matbags' => $totalbags,
                'matbulk' => $totalbulk,
                'mat1qty' => $total1,
                'mat2qty' => $total2,
                'squarefeet' => $sqft
              );
            }


          break;
        case 4:


        $material1 = get_field('marco_warning_track_select_the_material_for_the_warning_track', $quote_id);
        $lookup1_mat = self::get_material($material1);
        $matname1 = $lookup1_mat['name'];
        $matweight1 = $lookup1_mat['weight_factor'];
        $matshrink1 = $lookup1_mat['shrink_factor'];



      	$length1 = get_field('marco_warning_track_perimeter_feet', $quote_id);
      	if (!(is_numeric($length1))) {
      		$length1 = 0;
      	}

      	$width1 = get_field('marco_warning_track_width_feet', $quote_id);
      	if (!(is_numeric($width1))) {
      		$width1 = 0;
      	}

      	$depth1 = get_field('marco_warning_track_depth_of_warning_track_materials_inches', $quote_id);
      	if (!(is_numeric($depth1))) {
      		$depth1 = 0;
      	}


        $material2 = get_field('marco_warning_track_select_the_base_layer_material_for_the_warning_track', $quote_id);
        $lookup2_mat = self::get_material($material2);
        $matname2 = $lookup2_mat['name'];
        $matweight2 = $lookup2_mat['weight_factor'];
        $matshrink2 = $lookup2_mat['shrink_factor'];



      	$depth2 = get_field('marco_warning_track_depth_of_base_layer_material_inches', $quote_id);
      	if (!(is_numeric($depth2))) {
      		$depth2 = 0;
      	}

      	$subtotal = 0;
      	$total1 = 0;
      	$total2 = 0;

      	//radius area
      	$subtotal += $length1 * $width1 / 27 / 12;
        $sqft = $subtotal * 27 * 12;
        $sqft = round($sqft /10) * 10;
      	//echo("Subtotal - " . $subtotal . "<br />");

      	$total1 = $subtotal * $depth1 * $matweight1 * $matshrink1;
      	$total1 = round($total1, 1);
      	//echo("Total1 - " . $total1 . "<br /><br />");

      	$total2 = $subtotal * $depth2 * $matweight2 * $matshrink2;
      	//echo 'sub total - ' . $subtotal . '<br/>';
      	//echo 'depth - ' . $depth2 . '<br/>';
      	//echo 'mat weight - ' . $matweight2 . '<br/>';
      	//echo 'mat shrink - ' . $matshrink2 . '<br/>';
      	//echo 'warning track - before round sub total - ' . $total2;

      	$total2 = round($total2, 1);

	  	//echo 'warning track - sub total - ' . $total2;
      $total1 = number_format($total1, 1, '.', ',');
      $total2 = number_format($total2, 1, '.', ',');

          if ($matname1 != '') {
            $html .= "<tr><td>" . $matname1 . "</td><td>" . $total1 . "</td></tr>";
          }
          if ($matname2 > 0) {
            $html .= "<tr><td>" . $matname2 . "</td><td>" . $total2 . "</td></tr>";
          }


          /*mat1=$material1, mat1name='$matname1', " .
      			"length1=$length1, width1=$width1, depth1=$depth1, mat2=$material2, mat2name='$matname2', depth2=$depth2, " .
      			"mat1qty=$total1, mat2qty=$total2*/


            if ( $type == 'array' ){
              return array(
                'mat1' => $material1,
                'mat1name' => $matname1,
                'length1' => $length1,
                'width1' => $width1,
                'depth1' => $depth1,
                'mat2' => $material2,
                'mat2name' => $matname2,
                'depth2' => $depth2,
                'mat1qty' => $total1,
                'mat2qty' => $total2,
                'squarefeet' => $sqft
              );
            }


          break;
        case 5:


        $qty1 = get_field('marco_bull_pen_quantity', $quote_id);
      	if (!(is_numeric($qty1))) {
      		$qty1 = 0;
      	}

        $material1 = get_field('marco_bull_pen_select_the_finishing_layer_material_of_the_bull_pen', $quote_id);
        $lookup1_mat = self::get_material($material1);
        $matname1 = $lookup1_mat['name'];
        $matweight1 = $lookup1_mat['weight_factor'];
        $matshrink1 = $lookup1_mat['shrink_factor'];



      	$length1 = get_field('marco_bull_pen_length_feet', $quote_id);
      	if (!(is_numeric($length1))) {
      		$length1 = 0;
      	}

      	$width1 = get_field('marco_bull_pen_width_feet', $quote_id);
      	if (!(is_numeric($width1))) {
      		$width1 = 0;
      	}

      	$depth1 = get_field('marco_bull_pen_depth_of_materials_inches', $quote_id);
      	if (!(is_numeric($depth1))) {
      		$depth1 = 0;
      	}


        $material2 = get_field('marco_bull_pen_select_the_base_layer_material_for_the_bull_pen', $quote_id);
        $lookup2_mat = self::get_material($material2);
        $matname2 = $lookup2_mat['name'];
        $matweight2 = $lookup2_mat['weight_factor'];
        $matshrink2 = $lookup2_mat['shrink_factor'];



      	$depth2 = get_field('marco_bull_pen_depth_of_base_layer_material_inches', $quote_id);
      	if (!(is_numeric($depth2))) {
      		$depth2 = 0;
      	}

      	$subtotal = 0;
      	$total1 = 0;
      	$total2 = 0;

      	//radius area
      	$subtotal += $qty1 * $length1 * $width1 / 27 / 12;
        $sqft = $subtotal * 27 * 12;
        $sqft = round($sqft /10) * 10;
      	//echo("Subtotal - " . $subtotal . "<br />");

      	$total1 = $subtotal * $depth1 * $matweight1 * $matshrink1;
      	$total1 = round($total1, 1);
      	//echo("Total1 - " . $total1 . "<br /><br />");

      	$total2 = $subtotal * $depth2 * $matweight2 * $matshrink2;
      	$total2 = round($total2, 1);

        $total1 = number_format($total1, 1, '.', ',');
        $total2 = number_format($total2, 1, '.', ',');

          if ($matname1 != '') {
            $html .= "<tr><td>" . $matname1 . "</td><td>" . $total1 . "</td></tr>";
          }
          if ($matname2 != '') {
            $html .= "<tr><td>" . $matname2 . "</td><td>" . $total2 . "</td></tr>";
          }

          /*mat1=$material1, mat1name='$matname1', " .
      			"length1=$length1, width1=$width1, depth1=$depth1, mat2=$material2, mat2name='$matname2', depth2=$depth2, " .
      			"mat1qty=$total1, mat2qty=$total2, quantity=$qty1*/


            if ( $type == 'array' ){
              return array(
                'mat1' => $material1,
                'mat1name' => $matname1,
                'length1' => $length1,
                'width1' => $width1,
                'depth1' => $depth1,
                'mat2' => $material2,
                'mat2name' => $matname2,
                'depth2' => $depth2,
                'mat1qty' => $total1,
                'mat2qty' => $total2,
                'quantity' => $qty1,
                'squarefeet' => $sqft
              );
            }

          break;
        case 6:


        $material1 = get_field('marco_miscellaneous_select_the_finishing_layer_material', $quote_id);
        $lookup1_mat = self::get_material($material1);
        $matname1 = $lookup1_mat['name'];
        $matweight1 = $lookup1_mat['weight_factor'];
        $matshrink1 = $lookup1_mat['shrink_factor'];



      	$areaname = get_field('marco_miscellaneous_enter_a_name_for_this_area', $quote_id);

      	$qty1 = get_field('marco_miscellaneous_quantity', $quote_id);
      	if (!(is_numeric($qty1))) {
      		$qty1 = 1;
      	}

      	$measure_choice = get_field('marco_miscellaneous_enter_the_following_measurements:', $quote_id);
      	if ($measure_choice == 'area') {

      		$area1 = get_field('marco_miscellaneous_area', $quote_id);
      		if ( (!(is_numeric($area1))) || ($area1 == '') ) {
      			$area1 = 0;
      		}
      		if ($area1 < 0) {
      			$area1 = 0;
      		}
      		$length1 = $area1;
      		$width1 = 1;

      	} else {

      		$length1 = get_field('marco_miscellaneous_length_feet', $quote_id);
      		if (!(is_numeric($length1))) {
      			$length1 = 0;
      		}
      		if ($length1 < 0) {
      			$length1 = 0;
      		}

      		$width1 = get_field('marco_miscellaneous_width_feet', $quote_id);
      		if (!(is_numeric($width1))) {
      			$width1 = 0;
      		}
      		if ($width1 < 0) {
      			$width1 = 0;
      		}

      	}

      	$depth1 = get_field('marco_miscellaneous_depth_of_materials_inches', $quote_id);
      	if (!(is_numeric($depth1))) {
      		$depth1 = 0;
      	}
      	if ($depth1 < 0) {
      		$depth1 = 0;
      	}


        $material2 = get_field('marco_miscellaneous_select_the_base_layer_material', $quote_id);
        $lookup2_mat = self::get_material($material2);
        $matname2 = $lookup2_mat['name'];
        $matweight2 = $lookup2_mat['weight_factor'];
        $matshrink2 = $lookup2_mat['shrink_factor'];



      	$depth2 = get_field('marco_miscellaneous_depth_of_base_layer_material_inches', $quote_id);
      	if (!(is_numeric($depth2))) {
      		$depth2 = 0;
      	}
      	if ($depth2 < 0) {
      		$depth2 = 0;
      	}

      	$subtotal = 0;
      	$total1 = 0;
      	$total2 = 0;

      	//radius area
      	$subtotal += $qty1 * $length1 * $width1 / 27 / 12;
        $sqft = $subtotal * 27 * 12;
        $sqft = round($sqft /10) * 10;
      	//echo("Subtotal - " . $subtotal . "<br />");

      	$total1 = $subtotal * $depth1 * $matweight1 * $matshrink1;
      	$total1 = round($total1, 1);
      	//echo("Total1 - " . $total1 . "<br /><br />");

      	$total2 = $subtotal * $depth2 * $matweight2 * $matshrink2;
      	$total2 = round($total2, 1);
      	//echo("Total2 - " . $total2 . "<br /><br />");

      	/*$mid = get_field('mid'];
      	if ($mid == '') {
      		$mid = -1;
      	}*/
        $total1 = number_format($total1, 1, '.', ',');
        $total2 = number_format($total2, 1, '.', ',');


            $html .= "<tr><td colspan='2'><strong>" . $areaname . "</strong>";
            $html .= '<div class="quote-options" style="float:right;">';
      			$html .= '	<a href="/quote/modify/miscellaneous-area/?qid=' . $quote_id . '"><i class="fa fa-pencil" aria-hidden="true"></i></a> |';
      			$html .= '	<a href="/quote/delete/?qid=' . $quote_id . '&amp;f=6" onclick="return confirm(\'Are you sure you want to delete this?\');"><i class="fa fa-trash" aria-hidden="true"></i></a>';
      			$html .= '</div>';
      			$html .= '<div class="clear"></div></td></tr>';;
            if ($matname1 != '') {
              $html .= "<tr><td >" . $matname1 . "</td><td>" . $total1 . "</td></tr>";
            }
            if ($matname2 > 0) {
              $html .= "<tr><td >" . $matname2 . "</td><td>" . $total2 . "</td></tr>";
            }


            /*mat1=$material1, mat1name='$matname1', " .
        			"length1=$length1, width1=$width1, depth1=$depth1, mat2=$material2, mat2name='$matname2', depth2=$depth2, " .
        			"mat1qty=$total1, mat2qty=$total2, description='$areaname', quantity=$qty1*/

            if ( $type == 'array' ){
              return array(
                'mat1' => $material1,
                'mat1name' => $matname1,
                'length1' => $length1,
                'width1' => $width1,
                'depth1' => $depth1,
                'mat2' => $material2,
                'mat2name' => $matname2,
                'depth2' => $depth2,
                'mat1qty' => $total1,
                'mat2qty' => $total2,
                'description' => $areaname,
                'quantity' => $qty1,
                'squarefeet' => $sqft
              );
            }

          $argsE = array(
            'posts_per_page' => -1,
            'post_type' => 'quotes-misc',
            'meta_query' => array(
              array(
                'key' => 'quote_id',
                'value' => $quote_id
              ),
              array(
                'key' => 'has_been_saved',
                'value' => '1'
              )
            )
          );
          $extra_misc_areas = new WP_Query($argsE);

          $old_quote_id = $quote_id;
          if ( $extra_misc_areas->have_posts() ){
              while( $extra_misc_areas->have_posts() ){
                  $extra_misc_areas->the_post();

                  $quote_id = get_the_ID();

                  $material1 = get_field('marco_miscellaneous_select_the_finishing_layer_material', $quote_id);
                  $lookup1_mat = self::get_material($material1);
                  $matname1 = $lookup1_mat['name'];
                  $matweight1 = $lookup1_mat['weight_factor'];
                  $matshrink1 = $lookup1_mat['shrink_factor'];



                	$areaname = get_field('marco_miscellaneous_enter_a_name_for_this_area', $quote_id);

                	$qty1 = get_field('marco_miscellaneous_quantity', $quote_id);
                	if (!(is_numeric($qty1))) {
                		$qty1 = 1;
                	}

                	$measure_choice = get_field('marco_miscellaneous_enter_the_following_measurements:', $quote_id);
                	if ($measure_choice == 'area') {

                		$area1 = get_field('marco_miscellaneous_area', $quote_id);
                		if ( (!(is_numeric($area1))) || ($area1 == '') ) {
                			$area1 = 0;
                		}
                		if ($area1 < 0) {
                			$area1 = 0;
                		}
                		$length1 = $area1;
                		$width1 = 1;

                	} else {

                		$length1 = get_field('marco_miscellaneous_length_feet', $quote_id);
                		if (!(is_numeric($length1))) {
                			$length1 = 0;
                		}
                		if ($length1 < 0) {
                			$length1 = 0;
                		}

                		$width1 = get_field('marco_miscellaneous_width_feet', $quote_id);
                		if (!(is_numeric($width1))) {
                			$width1 = 0;
                		}
                		if ($width1 < 0) {
                			$width1 = 0;
                		}

                	}

                	$depth1 = get_field('marco_miscellaneous_depth_of_materials_inches', $quote_id);
                	if (!(is_numeric($depth1))) {
                		$depth1 = 0;
                	}
                	if ($depth1 < 0) {
                		$depth1 = 0;
                	}


                  $material2 = get_field('marco_miscellaneous_select_the_base_layer_material', $quote_id);
                  $lookup2_mat = self::get_material($material2);
                  $matname2 = $lookup2_mat['name'];
                  $matweight2 = $lookup2_mat['weight_factor'];
                  $matshrink2 = $lookup2_mat['shrink_factor'];



                	$depth2 = get_field('marco_miscellaneous_depth_of_base_layer_material_inches', $quote_id);
                	if (!(is_numeric($depth2))) {
                		$depth2 = 0;
                	}
                	if ($depth2 < 0) {
                		$depth2 = 0;
                	}

                	$subtotal = 0;
                	$total1 = 0;
                	$total2 = 0;

                	//radius area
                	$subtotal += $qty1 * $length1 * $width1 / 27 / 12;
                	//echo("Subtotal - " . $subtotal . "<br />");

                	$total1 = $subtotal * $depth1 * $matweight1 * $matshrink1;
                	$total1 = round($total1, 1);
                	//echo("Total1 - " . $total1 . "<br /><br />");

                	$total2 = $subtotal * $depth2 * $matweight2 * $matshrink2;
                	$total2 = round($total2, 1);
                	//echo("Total2 - " . $total2 . "<br /><br />");

                	/*$mid = get_field('mid'];
                	if ($mid == '') {
                		$mid = -1;
                	}*/
                  $total1 = number_format($total1, 1, '.', ',');
                  $total2 = number_format($total2, 1, '.', ',');


                      $html .= "<tr><td colspan='2'><strong>" . $areaname . "</strong>";
                      $html .= '<div class="quote-options" style="float:right;">';
                			$html .= '	<a href="/quote/modify/miscellaneous-area-extra/?qid=' . $old_quote_id . '&amp;qfid=' . $quote_id . '"><i class="fa fa-pencil" aria-hidden="true"></i></a> |';
                			$html .= '	<a href="/quote/delete/?qid=' . $quote_id . '&amp;f=8" onclick="return confirm(\'Are you sure you want to delete this?\');"><i class="fa fa-trash" aria-hidden="true"></i></a>';
                			$html .= '</div>';
                			$html .= '<div class="clear"></div></td></tr>';;
                      if ($matname1 != '') {
                        $html .= "<tr><td >" . $matname1 . "</td><td>" . $total1 . "</td></tr>";
                      }
                      if ($matname2 > 0) {
                        $html .= "<tr><td >" . $matname2 . "</td><td>" . $total2 . "</td></tr>";
                      }


                      /*mat1=$material1, mat1name='$matname1', " .
                  			"length1=$length1, width1=$width1, depth1=$depth1, mat2=$material2, mat2name='$matname2', depth2=$depth2, " .
                  			"mat1qty=$total1, mat2qty=$total2, description='$areaname', quantity=$qty1*/

                      if ( $type == 'array' ){
                        return array(
                          'mat1' => $material1,
                          'mat1name' => $matname1,
                          'length1' => $length1,
                          'width1' => $width1,
                          'depth1' => $depth1,
                          'mat2' => $material2,
                          'mat2name' => $matname2,
                          'depth2' => $depth2,
                          'mat1qty' => $total1,
                          'mat2qty' => $total2,
                          'description' => $areaname,
                          'quantity' => $qty1
                        );
                      }


              }
              wp_reset_postdata();
          }

          break;
    }
    $html = $html . "</table>";
    return $html;
  }

  public static function get_material( $material_id ){
		if ( $material_id <= 0 || $material_id === null ){
			$p = array(
        'name' => '',
        'weight_factor' => 1,
        'shrink_factor' => 1
    	);
		} else {
			$p = array(
        'name' => get_the_title( $material_id ),
        'weight_factor' => get_field('material_weight_factor', $material_id),
        'shrink_factor' => get_field('material_compact_factor', $material_id)
    	);
		}
    
    return $p;
  }


  /*
    $category: bag, bulk
    $material: the material used that will be summed up under the given category
    $amount: value to add to current material sum
    $totalmaterial: the array passed in to keep track of values
  */
  public static function total_material_value( $category ,$material, $amount, $totalmaterial ){

    if ( !array_key_exists( $category, $totalmaterial ) ){
      // category has not been added yet to the array, add it
      $totalmaterial[$category] = array();
    }

    // pull out the element we want to work with to make the following steps easier
    $current_iteration = $totalmaterial[$category];

    // material doesn't exist yet under current category, add it
    if ( !array_key_exists( $material, $current_iteration ) ){
      $current_iteration[$material] = $amount;
    } else {
      // material exists, so add to it
      $current_iteration[$material] += $amount;
    }
    // add the element back to the working array
    $totalmaterial[$category] = $current_iteration;

    // return the resulting array
		return $totalmaterial;

  }

  public static function create_extra_misc_quote($qid){
    $args = array(
      'post_status'    => 'publish',
      'post_title'     => 'Quote-Temp',
      'post_type'      => 'quotes-misc'
    );

    /*
     * insert the post by wp_insert_post() function
     */
    $new_post_id = wp_insert_post( $args );
    update_post_meta( $new_post_id, 'quote_id', $qid );
    update_post_meta( $new_post_id, 'has_been_saved', '0' );
    return $new_post_id;
  }

  public static function save_extra_misc_quote( $mqid ){
    return update_post_meta( $mqid, 'has_been_saved', '1' );
  }



}




?>
