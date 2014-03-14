<?php  
defined('C5_EXECUTE') or die(_("Access Denied."));
global $c;
$urls=Loader::helper('concrete/urls');
if ($askemail): //Dialog that asks user for email if not available from provider
$html = Loader::helper('html');
echo $html->css('ccm.forms.css');
?>
<div id="social_login_askemail_<?php  echo $controller->bID ?>" style="display: none">
	<form action="#" id="social_login_askemail_form" method="GET">
		<p>
		<?php   echo t('Email'); ?>
			<input style="float: right; margin-top: -3px;" type="text"
				name="reg_email" />
		</p>
		<p>
		<?php   echo t('Confirm Email'); ?>
			<input type="text" style="float: right; margin-top: -3px;"
				name="email_confirm" />
		</p>
		<br />
		<div style="display: none; float: left; color: red" id="email_message"></div>
		<input type="submit" class="ccm-button-v2 ccm-input-submit"
			id="submit" style="float: right" value="<?php   echo t('Send') ?>" /> <input
			type="hidden" name="provider"
			value="<?php   echo htmlentities($_GET['provider'],ENT_QUOTES)?>" />
	</form>
</div>

<script type="text/javascript">
$(document).ready(function() {
	$('#social_login_askemail_<?php  echo $controller->bID ?>').submit(function(){
		if($('input[name="reg_email"]').val()!=''&&$('input[name="reg_email"]').val()==$('input[name="email_confirm"]').val())
			return true;
		else
		{	$('#email_message').html('<?php   echo t('Please check your email') ?>');
			$('#email_message').show();
		}
		return false;
	});
	$('#social_login_askemail_<?php  echo $controller->bID ?>').dialog({
		title: '<?php   echo t('Please insert information below'); ?>',
		element: '#social_login_askemail_<?php  echo $controller->bID ?>',
		width: 400,
		modal: false,
		height: 220
	});
});
</script>
		<?php   endif; ?>
<?php  if ($emailpresent): //Dialog that warns the user of already existing email
$html = Loader::helper('html');
echo $html->css('ccm.forms.css');
?>
<div id="social_login_existingemail_<?php  echo $controller->bID ?>" style="display: none">
<p>
<?php  echo $emailpresentmessage; ?>	
</p>						
</div>
<script type="text/javascript">
$(document).ready(function() {
	$('#social_login_existingemail_<?php  echo $controller->bID ?>').dialog({
		title: '<?php   echo t('Please check message below'); ?>',
		element: '#social_login_existingemail_<?php  echo $controller->bID ?>',
		width: 400,
		modal: false,
		height: 220
	});
});
</script>
		<?php   endif; //emailpresent ?>			
		<?php  
		$u=new User();
		if(!$u->isLoggedIn()): //If user not logged in
		?>
<div class="socialLogin">
<?php   foreach($active_providers as $provider){ ?>
	<div class="socialProvider">
		<a href="?provider=<?php   echo $provider['providerID'] ?>"> <img
			src="<?php   echo $urls->getPackageURL(Package::getByHandle("social_login")).'/images/icons/'.$provider['providerID'].'.png' ?>"
			alt="<?php   echo $provider['providerName'] ?>" /> </a>
	</div>
	<?php   } ?>
</div>
	<?php  
	else: //If user is logged in
	?>
<div class="socialLogin">
<?php   foreach($active_providers as $provider){ if(!SocialLoginModel::isAssociatedWith($provider['providerID'])){ //Associate links ?>
	<div class="socialProvider">
		<a href="?provider=<?php   echo $provider['providerID'] ?>"> <img
			src="<?php   echo $urls->getPackageURL(Package::getByHandle("social_login")).'/images/icons/'.$provider['providerID'].'.png' ?>"
			alt="<?php   echo $provider['providerName'] ?>" /> </a>
	</div>
	<?php   }} ?>
</div>
<br style="clear:both" />
<div class="login">
	<h3>
	<?php   echo t('Logged!') ?>
	</h3>
	<p>
	<?php   echo t('Welcome') ?>
	<?php   echo $u->getUserName()?>
	</p>
	<a href="<?php   echo $this->action('logout') ?>"><?php   echo t('Logout')?>
	</a>
</div>
<?php  
endif;
?>