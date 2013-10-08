<?php  defined('C5_EXECUTE') or die("Access Denied."); ?>
<?php  Loader::library('authentication/open_id');?>
<?php  $form = Loader::helper('form'); ?>
<body class="index">
<link href="<?php echo $this->getStyleSheet('/css/main.css')?>" media="screen" rel="stylesheet" type="text/css" />

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

<?php  if($changePasswordForm){ ?>

	<p><?php echo t('Enter your new password below.') ?></p>

	<div class="ccm-form modal-body">	

	<form method="post" action="<?php echo $this->url( '/login', 'change_password', $uHash )?>"> 

		<div class="control-group">
		<label for="uPassword" class="control-label"><?php echo t('New Password')?></label>
		<div class="controls">
			<input type="password" name="uPassword" id="uPassword" class="ccm-input-text">
		</div>
		</div>
		<div class="control-group">
		<label for="uPasswordConfirm"  class="control-label"><?php echo t('Confirm Password')?></label>
		<div class="controls">
			<input type="password" name="uPasswordConfirm" id="uPasswordConfirm" class="ccm-input-text">
		</div>
		</div>

		<div class="actions">
		<?php echo $form->submit('submit', t('Sign In') . ' &gt;')?>
		</div>
	</form>
	
	</div>

<?php  }elseif($validated) { ?>

<h3><?php echo t('Email Address Verified')?></h3>

<div class="success alert-message block-message modal-body">
<p>
<?php echo t('The email address <b>%s</b> has been verified and you are now a fully validated member of this website.', $uEmail)?>
</p>
<div class="alert-actions"><a class="btn small" href="<?php echo $this->url('/')?>"><?php echo t('Continue to Site')?></a></div>
</div>

<?php  } else if (isset($_SESSION['uOpenIDError']) && isset($_SESSION['uOpenIDRequested'])) { ?>
<div class="ccm-form modal-body">
<?php  switch($_SESSION['uOpenIDError']) {
	case OpenIDAuth::E_REGISTRATION_EMAIL_INCOMPLETE: ?>

		<form method="post" action="<?php echo $this->url('/login', 'complete_openid_email')?>">
			<p><?php echo t('To complete the signup process, you must provide a valid email address.')?></p>
			<label for="uEmail"><?php echo t('Email Address')?></label><br/>
			<?php echo $form->text('uEmail')?>
				
			<div class="ccm-button">
			<?php echo $form->submit('submit', t('Sign In') . ' &gt;')?>
			</div>
		</form>

	<?php  break;
	case OpenIDAuth::E_REGISTRATION_EMAIL_EXISTS:
	
	$ui = UserInfo::getByID($_SESSION['uOpenIDExistingUser']);
	
	?>

	<?php  break;

	}
?>

</div>

<?php  } else if ($invalidRegistrationFields == true) { ?>

<div class="ccm-form">

	<p><?php echo t('You must provide the following information before you may login.')?></p>
	
<form method="post" action="<?php echo $this->url('/login', 'do_login')?>">
	<?php  
	$attribs = UserAttributeKey::getRegistrationList();
	$af = Loader::helper('form/attribute');
	
	$i = 0;
	foreach($unfilledAttributes as $ak) { 
		if ($i > 0) { 
			print '<br/><br/>';
		}
		print $af->display($ak, $ak->isAttributeKeyRequiredOnRegister());	
		$i++;
	}
	?>
	
	<?php echo $form->hidden('uName', Loader::helper('text')->entities($_POST['uName']))?>
	<?php echo $form->hidden('uPassword', Loader::helper('text')->entities($_POST['uPassword']))?>
	<?php echo $form->hidden('uOpenID', $uOpenID)?>
	<?php echo $form->hidden('completePartialProfile', true)?>

	<div class="ccm-button">
		<?php echo $form->submit('submit', t('Sign In'))?>
		<?php echo $form->hidden('rcID', $rcID); ?>
	</div>
	
</form>
</div>	

<?php } else { ?>
  <div class="modal-header">
    <h3 class="form-lead"><?php echo t('Sign into %s', SITE)?></h3>
  </div>
  <form method="post" action="<?php echo $this->url('/login', 'do_login')?>">
  <div class="modal-body">
      <?php  if (isset($intro_msg)) { ?>
      <div class="alert-message block-message success"><p><?php echo $intro_msg?></p></div>
      <?php  } ?>
      <?php  if( $passwordChanged ){ ?>

        <div class="block-message info alert-message"><p><?php echo t('Password changed.  Please login to continue. ') ?></p></div>

      <?php  } ?> 

    <label for="uName"><?php  if (USER_REGISTRATION_WITH_EMAIL_ADDRESS == true) { ?>
      <?php echo t('Email')?>
    <?php  } else { ?>
      <?php echo t('User name')?>
    <?php  } ?></label>
    <input type="text" name="uName" id="uName" <?php echo  (isset($uName)?'value="'.$uName.'"':'');?> class="ccm-input-text input-large">

    <label for="uPassword"><?php echo t('Password')?></label>
    <input type="password" name="uPassword" id="uPassword" class="ccm-input-text input-large">

    <label class="checkbox">
      <input type="checkbox"> Keep me signed in.
    </label>
    <input type="hidden" name="uEmail" id="uEmail" />
    <input class="plaintext" type="submit" onmousedown="$('#uEmail').val($('#uName').val());$(this).parents('form').first().attr('action', '<?php echo $this->url('/login','forgot_password') ?>')" value="Request a new password"></input>
</div>
    <div class="modal-footer">
    <div class="pull-left">
      <?php  if (ENABLE_REGISTRATION == 1) { ?>
        <a href="<?php echo $this->url('/register')?>"><?php echo t('Sign up using your email')?></a>
      <?php  } ?>
    </div>

      <?php echo $form->submit('submit', t('Sign In'), null, "" )?>
      <?php  if (isset($error) && $error != '') { ?>
         <?php  
         if ($error instanceof Exception) {
            $_error[] = $error->getMessage();
         } else if ($error instanceof ValidationErrorHelper) { 
            $_error = $error->getList();
         } else if (is_array($error)) {
            $_error = $error;
         } else if (is_string($error)) {
            $_error[] = $error;
         }
        ?>
        <div class="ccm-error">
        <?php  foreach($_error as $e) { ?><?php echo $e?><br /><?php  } ?>
        </div>
     <?php  
      } ?>

    </div>
   </form>

<?php  } ?>

</body>
