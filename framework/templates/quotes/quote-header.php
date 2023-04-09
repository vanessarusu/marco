<?php
global $current_user;
//get_currentuserinfo();
?>

<div class="dealer-header">
	<div class="dealer-container">
		<div class="quote-header">
			<p class="hello">Hello <?php echo $current_user->display_name; ?></p>
		</div>
		<div class="dealer-header-links">
			<a class="dealer-header-link" href="<?php bloginfo('url'); ?>/dealer" class="button no-print">Return to Dashboard</a>
			<a class="dealer-header-link" href="<?php bloginfo('url'); ?>/quote/create/" class="button no-print">New Material Calculation</a>
			<a class="dealer-header-link" href="<?php bloginfo('url'); ?>/quote" class="button no-print">Manage Material Calculations</a>
		</div>
	</div>
</div>
