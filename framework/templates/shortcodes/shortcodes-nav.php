<?php
global $current_user;

$params = array(
	'theme_location' => 'bar',
	'menu' => '2023 Top Bar Menu'
);

//get_currentuserinfo();
?>
<ul id="userNav">
<?php if ( is_user_logged_in() ) : ?>
    <li>
        <a href="<?php bloginfo('url'); ?>/dealer" target="blank"><span class="header-contact-text">Dealer Dashboard</span></a>
    </li>
    <li>
        <a href="<?php echo wp_logout_url(); ?>"><span class="header-contact-text">Logout</span></a>
    </li>

<?php else: ?>
    <li><a href="<?php bloginfo('url'); ?>/wp-admin" target="blank"><span class="header-contact-text">Dealer &amp; Architect Login</span></a></li>
<?php endif; ?>
<?php wp_nav_menu($params); ?>

</ul>