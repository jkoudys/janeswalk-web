<?php 
defined('C5_EXECUTE') or die("Access Denied.");

$this->inc('elements/header.php'); 
?>
  <?php $this->inc('elements/navbar.php');  ?>
			<?php 

			print $innerContent;
			
			?>

<?php 
// $this->inc('elements/footer.php'); 
?>
</html>
