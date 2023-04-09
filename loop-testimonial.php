<div class="testimonial">

  <?php
  // Quotes
  e_svgi('quotes-open');
  e_svgi('quotes-close');
  ?>

  <div class="helper">

    <?php
    // Image
    $test_id = get_field('testimonial_image');

    if($test_id != ''){
      $test_img = wp_get_attachment_image_src($test_id, 'medium');
      echo '<img src="' . $test_img[0] . '" width="' . $test_img[1] . '" height="' . $test_img[2] . '" alt="Mar-Co Clay testimonial ' . get_field('testimonial_author') . '" class="t-image" />';
    }

    // Highlight
    echo '<p class="t-highlight">"' . get_field('testimonial_highlight') . '"</p>';

    // Full Text
    echo '<p class="t-text">"' . get_field('full_testimonial') . '"</p>';

    // Author/Role
    echo '<h5 class="t-author"><strong>' . get_field('testimonial_author') . '</strong></h5>';

    $role = get_field('testimonial_role');
    if($role != '') echo '<p class="t-role">' . $role . '</p>';
    ?>

  </div>

</div>
