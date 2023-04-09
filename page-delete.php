<?php
/* Template Name: Quote - Delete */

$qid = $_GET['qid'];
$fid = $_GET['f'];

if ( $qid == '' ){
	wp_redirect('/quote');
	exit;
}
if ( $fid == '' ){
	$fid = null;
}
if ( $fid == 8 ){
	$real_quote_id = \GMCT_Marco_Quote_Manager::get_quote_id_from_extra_id($qid);
}
\GMCT_Marco_Quote_Manager::delete_for_quote($qid, $fid);
if ( $fid != null ){
	if ( $fid == 8 ){
		wp_redirect('/quote/modify/?qid=' . $real_quote_id);
		exit;
	} else {
		wp_redirect('/quote/modify/?qid=' . $qid);
		exit;
	}
} else {
	wp_redirect('/quote');
	exit;
}




get_header();
get_footer(); ?>
