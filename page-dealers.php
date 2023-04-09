<?php
/* Template Name: Dealers Dashboard */
get_header();
?>

<?php get_template_part('/framework/templates/quotes/dealer', 'header'); ?>

<div class="item-container">
        <a href="<?php bloginfo('url'); ?>/quote">
        <div class="card-panel black">
            <i class="small material-icons">dashboard</i><h2 class="card-title">Material Calculator</h2>
            <p>Material Calculator is a tool to help you determine the quantity of product you will need for your next baseball diamond project.</p>
        </div>
        </a>

        <a href="<?php bloginfo('url'); ?>/dealer/dealer-drawings">
        <div class="card-panel black">

            <i class="small material-icons">description</i><h2 class="card-title">Design Drawings</h2>
            <p>To assist with your promotions, Mar-Co Design Drawings are available for dealers to download.<br/>&nbsp;</p>
        </div>
        </a>
        <a href="<?php bloginfo('url'); ?>/dealer/dealer-product-spec-sheets">
        <div class="card-panel black">

            <i class="small material-icons">assessment</i><h2 class="card-title">Product Spec Data Sheets</h2>
            <p>To assist with your promotions, Mar-Co Product Spec Sheets are available for dealers to download.<br/>&nbsp;</p>
        </div>
        </a>
        <a href="<?php bloginfo('url'); ?>/dealer/dealer-ad-materials">
        <div class="card-panel black">
            <i class="small material-icons">business</i><h2 class="card-title">Advertising / Promotional</h2>
            <p>To assist with your promotions, Mar-Co Logos and Brochures are available for dealers to download.<br/>&nbsp;</p>
        </div>
        </a>
</div>
<?php get_footer(); ?>
