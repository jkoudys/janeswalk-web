<?php defined('C5_EXECUTE') or die("Access Denied."); ?>
<html>
<?php $this->inc('elements/header.php'); 
$dh = Loader::helper('concrete/dashboard');
global $u; global $cp;
?>
<body class="site-page <?=($dh->canRead()) ? "logged_in" : ""; ?>" <?php if(is_object($fullbg)) { echo "style='background-image:url({$fullbg->getURL()})'"; } ?>>
  <?php $this->inc('elements/navbar.php'); ?>
			<?php 
			print $innerContent;
			?>
<?php $this->inc('elements/footer.php'); ?>
