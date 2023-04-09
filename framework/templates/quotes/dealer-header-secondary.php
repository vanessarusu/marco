<?php
global $current_user;
//get_currentuserinfo();
?>

<div class="dealer-header">
	<div class="dealer-container">
		<div>
			<p class="hello">Hello <?php echo $current_user->display_name; ?></p>
			<h2>Mar-co Clay Dealer Dashboard</h2>
			<div class="dealer-header-links">
				<a href="<?php bloginfo('url'); ?>/dealer" class="dealer-header-link">Return to Dashboard</a>
			</div>
		</div>
	</div>
</div>
