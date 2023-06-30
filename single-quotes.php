<?php
  $redirect = get_bloginfo('url');
  wp_redirect($redirect . '/quote/modify/?qid=' . get_the_ID());
  exit;
?>

<?php get_header(); ?>
<?php get_footer(); ?>
