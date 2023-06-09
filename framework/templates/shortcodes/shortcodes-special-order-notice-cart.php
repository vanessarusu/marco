<?php 
if( is_cart() || is_checkout() ) {

$is_special_order = false;

// check each cart item for our category
foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {

    $product = $cart_item['data'];

    if ( has_term( 'special-order', 'product_cat', $product->id ) ) {
        $is_special_order = true;
        break;
    }
}

// if has special order products, show notice
if ( $is_special_order ) { ?>

    <section class="section-so-notice">
        <div>
            <div>
                <div class="wc-cart-so-notice">

                    <h1 class="required-red">Order Warning</h1>

                    <h4>Your order contains products which require freight shipping and cannot be quoted accurately online.</h4>

                    <p>On the cart page, click "Calculate Shipping", then select one of the following options:</p>

                    <ul>
                        <li>Select <b>"Local Pickup"</b> if you prefer picking up your order at our Bright, Ontario location. You may pay for your order online.</li>
                        <li>Select <b>"Ground Delivery"</b> if you require delivery. Proceed with the checkout and use the <i>Offline Payment</i> option. After your order is placed, a Mar-Co Sales Rep will contact you to finalize delivery costs and payment.</li>
                    </ul>

                    <p>You may <a href="<?php bloginfo('url'); ?>/contact/">contact Mar-Co Clay</a> for assistance.</p>

                </div>
            </div>
        </div>
    </section>

    <?php }
}