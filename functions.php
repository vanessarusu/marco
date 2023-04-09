<?php

// Defines
define( 'FL_CHILD_THEME_DIR', get_stylesheet_directory() );
define( 'FL_CHILD_THEME_URL', get_stylesheet_directory_uri() );

// Classes
require_once 'classes/class-fl-child-theme.php';

// Actions
add_action( 'wp_enqueue_scripts', 'FLChildTheme::enqueue_scripts', 1000 );


function _marco_assets() {
    wp_enqueue_style( '_webfonts', 'https://fonts.googleapis.com/css2?family=Overpass:wght@100;200;300;400;500;600;700;800&display=swap', false );
    wp_enqueue_style( '_admin-stylesheet', get_stylesheet_directory_uri() . '/dist/css/admin.css', array(), '1.0.0', 'all' );
    wp_enqueue_style( '_slick-stylesheet', get_stylesheet_directory_uri() . '/dist/css/slick.css' );
    wp_enqueue_style( '_stylesheet', get_stylesheet_directory_uri() . '/dist/css/bundle.css', array(), '1.0.0', 'all' );

    wp_enqueue_script( '_slick', get_stylesheet_directory_uri() . '/dist/js/slick.min.js' );
    wp_enqueue_script( '_scripts', get_stylesheet_directory_uri() . '/dist/js/bundle.js', array(), '1.0.0', true );

}

add_action('wp_enqueue_scripts', '_marco_assets', 1000 );



// ============================== //
// ======== WOOCOMMERCE ========= //
// ============================== //

// Add theme support for WooCommerce
add_theme_support( 'woocommerce' );
include(get_stylesheet_directory() . '/includes/quote-manager.php');






// =============================== //
// =========== INCLUDES ========== //
// =============================== //

// Core Functions
require_once(locate_template('functions/functions-core.php'));

// Tiny MCE
require_once(locate_template('functions/functions-tiny-mce.php'));

// Flexible Content
require_once(locate_template('functions/functions-flexible-content.php'));

// include_once( get_stylesheet_directory() . '/framework/templates/shortcodes/user-nav.php' );



/**************************/
/*** Custom Post Types ***/
/**************************/

include_once( get_stylesheet_directory() . '/framework/lib/functions/meta_tools.php' );
include_once( get_stylesheet_directory() . '/framework/lib/custom_posts/marco_posts.php' );
include_once( get_stylesheet_directory() . '/framework/lib/custom_taxonomies/materials_taxonomies.php' );
include_once( get_stylesheet_directory() . '/framework/lib/auto_populate_fields/update_quote_fields.php' );
include_once( get_stylesheet_directory() . '/framework/lib/acf/quotes.php' );
include_once( get_stylesheet_directory() . '/framework/lib/acf/brochures.php' );
include_once( get_stylesheet_directory() . '/framework/lib/shortcodes/brochure_listing.php' );




// if( is_page(1078) ){ // page ID or page slug here
//     add_action( 'wp_enqueue_scripts', 'quote_scripts' );
// }

// function quote_scripts() {
//     wp_enqueue_script( '_quotes', get_stylesheet_directory_uri() . '/js/script-quotes.js', array(), '1.0.0', true );
// }


function topbar_header_nav() {
    ob_start();
    get_template_part('/framework/templates/shortcodes/shortcodes', 'nav' );
    $content = ob_get_clean();
    return $content;
}

add_shortcode('topbar_header', 'topbar_header_nav');
