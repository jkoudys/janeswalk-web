<?php  defined('C5_EXECUTE') or die("Access Denied."); 
$this->inc('elements/header.php'); 
global $u;
?>
<body class="index <?php echo ($u->isLoggedIn() || $c->isEditMode()) ? "logged_in" : ""; ?>">
<link href="<?php echo $this->getStyleSheet('css/main.css')?>" media="screen" rel="stylesheet" type="text/css" />

<script type="text/javascript">
$(document).ready(function() {
  $("html").addClass("index-bg");
  });
$(function() {
	$("input[name=uName]").focus();
});
</script>

<div class="modal-backdrop fade in"></div>
<div class="modal hide fade in" id="signup-panel" data-keyboard="false" data-backdrop="static" style="display: block;" aria-hidden="false">
  <div class="modal-header">
    <?php
      $a = new Area('Header');
      $a->display($c);
    ?>
  </div>
  <div class="modal-body">
    <?php
      $a = new Area('Body');
      $a->display($c);
    ?>
  </div>
  <div class="modal-footer">
    <div class="pull-left">
      <?php
        $a = new Area('Footer');
        $a->display($c);
      ?>
    </div>

    <?php  if (isset($error) && $error != '') { 
      echo '<div class="ccm-error">';
      if ($error instanceof Exception) {
         $_error[] = $error->getMessage();
      } else if ($error instanceof ValidationErrorHelper) { 
         $_error = $error->getList();
      } else if (is_array($error)) {
         $_error = $error;
      } else if (is_string($error)) {
         $_error[] = $error;
      }
      foreach($_error as $e) { 
        echo $e . "<br />";  
      }
      echo '</div>';
    }
    ?>
  </div>
</div>
<?php Loader::element('footer_required'); ?>
</body>
