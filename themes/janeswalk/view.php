<?php 
defined('C5_EXECUTE') or die("Access Denied.");

$this->inc('elements/header.php'); 
global $u;
?>
<body class="site-page <?php echo ($u->isLoggedIn() || $c->isEditMode()) ? "logged_in" : ""; ?>" <?php if(is_object($fullbg)) {  echo "style='background-image:url(" . $fullbg->getURL() . ")'"; } ?>>
  <?php $this->inc('elements/navbar.php');  ?>
			<?php 

			print $innerContent;
			
			?>

<?php 
 $this->inc('elements/footer.php'); 
?>
</html>
