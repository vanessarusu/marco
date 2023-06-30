<?php
  wp_redirect(bloginfo('url');'/quote/modify/?qid=' . get_the_ID());
  exit;
?>

<?php get_header(); ?>
<?php get_footer(); ?>
