<?php
/* Template Name: Quote - Rename */

$qid = $_GET['qid'];
$qname = $_GET['qname'];

if ( $qid == '' || $qname == '' ){
	wp_redirect('/quote');
	exit;
}

\GMCT_Marco_Quote_Manager::rename_quote($qid, $qname);

wp_redirect('/quote/modify/?qid=' . $qid);
exit;




get_header();
get_footer(); ?>
