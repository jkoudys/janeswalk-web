<?php  
defined("C5_EXECUTE") or die(_("Access Denied."));
?>
<?php   if (($op=='add_provider'||$op=='edit_provider')&&!$confirm): ?>
<h1>
	<span><?php   echo $op=='add_provider'?t('Add provider'):t('Edit provider') ?>
	</span>
</h1>
<div class="ccm-dashboard-inner">
	<form action="#" method="POST">
		<h2 style="padding-bottom: 8px; padding-top: 16px; float: left">
		<?php   echo $op=='add_provider'?t('Adding'):t('Editing'); ?>
		<?php   echo $provider['providerName'] ?>
		<?php   echo t('provider'); ?>
		</h2>
		<div class="ccm-spacer">&nbsp;</div>
		<div style="margin: 0px; padding: 0px; width: 100%; height: auto">
		<?php   if(!is_array($provider['required'])||(count($provider['required'])==0)): ?>
		<?php   echo t('No settings required for this provider') ?>
		<?php   endif; ?>
			<table class="grid-list" width="100%" cellspacing="1" cellpadding="0"
				border="0">
				<?php   foreach($provider['required'] as $req): ?>
				<tr>
					<td><?php   echo $req['name'] ?></td>
					<td><?php   echo $form->text('provider_'.$req['id'], $co->get('provider_'.$provider['providerID'].'_keys_'.$req['id']), array('style' => 'width: 300px')) ?>
					</td>
				</tr>
				<?php   endforeach; ?>
			</table>
		</div>
		<p>
		<?php   echo $provider['helpd'] ?>
		</p>
		<hr />
		<p>
			<a target="_blank" href="<?php   echo $provider['help'] ?>"><?php   echo t('Information and instructions about the provider') ?>
			</a>
		</p>
		<?php   echo $token->output('sociallogin_updateprovider'); ?>
		<?php   echo $form->hidden('op','add_provider'); ?>
		<?php   echo $form->hidden('provider',$provider['providerID']); ?>
		<?php   echo $form->hidden('confirm','1'); ?>
		<?php   echo $form->submit('submit', $op=='add_provider'?t('Add provider'):t('Update provider'), array('style'=>'float: right; margin-top:10px'), 'ccm-button-v2') ?>
	</form>
	<div class="ccm-spacer" style="clear: both">&nbsp;</div>
</div>
		<?php   elseif ($op=='remove_provider'&&!$confirm): ?>
<h1>
	<span><?php   echo t('Remove provider') ?> </span>
</h1>
<div class="ccm-dashboard-inner">
	<form action="#" method="POST">
		<h2 style="padding-bottom: 8px; padding-top: 16px; float: left">
		<?php   echo t('Removing'); ?>
		<?php   echo $provider['providerName'] ?>
		<?php   echo t('provider'); ?>
		</h2>
		<div class="ccm-spacer">&nbsp;</div>
		<h2>
		<?php   echo t('Configuration:');?>
			<p>
				<a target="_blank" href="<?php   echo $provider['help'] ?>"><?php   echo t('Information and instructions about the provider') ?>
				</a>
			</p>
			<?php   echo $token->output('sociallogin_updateprovider'); ?>
			<?php   echo $form->hidden('op','remove_provider'); ?>
			<?php   echo $form->hidden('provider',$provider['providerID']); ?>
			<?php   echo $form->hidden('confirm','1'); ?>
			<?php   echo $form->submit('submit', t('Remove provider'), array('style'=>'float: right; margin-top:10px'), 'ccm-button-v2') ?>
	
	</form>
	<div class="ccm-spacer" style="clear: both">&nbsp;</div>
</div>
			<?php   else: ?>
<h1>
	<span><?php   echo t('Providers')?> </span>
</h1>
<div class="ccm-dashboard-inner">
<?php   if(count($inactive_providers)!=0): ?>
	<p>
	
	
	<form action="#" method="GET">
	<?php   echo t('Add provider:'); ?>
	<?php   echo $form->hidden('op','add_provider'); ?>
		<select name="provider">
		<?php   foreach($inactive_providers as $provider): ?>
			<option value="<?php   echo $provider['providerID'] ?>">
			<?php   echo $provider['providerName'] ?>
			</option>
			<?php   endforeach; ?>
		</select> <input type="submit" value="<?php   echo t('Add') ?>" />
	</form>
	</p>
	<?php   endif; ?>
	<div class="ccm-spacer">&nbsp;</div>
	<div style="margin: 0px; padding: 0px; width: 100%; height: auto">
	<?php   if(count($active_providers)!=0): ?>
		<style type="text/css">
table.provider-grid-list {
	width: 700px;
}

table.provider-grid-list .odd {
	background-color: #DDD;
}

table.provider-grid-list td {
	padding: 5px;
}

table.provider-grid-list td img {
	height: 20px;
	width: 20px;
}
</style>
		<h2>
		<?php   echo t('Active list') ?>
		</h2>
		<table class="provider-grid-list" width="100%" cellspacing="1"
			cellpadding="0" border="0">
			<tr>
				<th width="22px"></th>
				<th><?php   echo t('Provider name') ?></th>
				<th><?php   echo t('Edit') ?></th>
				<th><?php   echo t('Remove') ?></th>
			</tr>
			<?php    $odd=false;  foreach($active_providers as $provider): $odd=!$odd;?>
			<tr <?php   echo $odd?' class="odd"':''; ?>>
				<td><img
					src="<?php   echo $urls->getPackageURL(Package::getByHandle("social_login")).'/images/icons/'.$provider['providerID'].'.png'; ?>" />
				</td>
				<td><?php   echo $provider['providerName'] ?></td>
				<td><a
					href="<?php   echo $this->url('/dashboard/social_login/?op=edit_provider&provider='.$provider['providerID']); ?>"><?php   echo t('Edit') ?>
				</a></td>
				<td><a
					href="<?php   echo $this->url('/dashboard/social_login/?op=remove_provider&provider='.$provider['providerID']); ?>"><?php   echo t('Remove') ?>
				</a></td>
			</tr>
			<?php   endforeach; ?>
		</table>
		<?php   endif; ?>
	</div>
	<div class="ccm-spacer" style="clear: both">&nbsp;</div>
</div>

<h1>
	<span><?php   echo t('Configuration')?> </span>
</h1>
<div class="ccm-dashboard-inner">
	<form action="#" method="POST">
	<?php   echo $form->submit('submit', t('Update Configuration'), array('style'=>'float: right;'), 'ccm-button-v2') ?>
		<h2 style="padding-bottom: 8px; padding-top: 16px; float: left">
		<?php   echo t('Subscription'); ?>
		</h2>
		<div class="ccm-spacer">&nbsp;</div>
		<div style="margin: 0px; padding: 0px; width: 100%; height: auto">
			<table class="grid-list" width="100%" cellspacing="1" cellpadding="0"
				border="0">
				<tr>
					<td><?php   echo t('User email required (eg. when provider doesn\'t share it)')?>
					</td>
					<td><?php   echo $form->checkbox('sociallogin_requireemail','1',$sociallogin_requireemail=='1') ?>
					</td>
				</tr>
				<?php   /*<tr><td><?php   echo t('Email validation required (when manually entered)')?></td><td><?php   echo $form->checkbox('sociallogin_requireemailconfirm','1',$sociallogin_requireemailconfirm=='1') ?></td></tr> */?>
				<input type="hidden" name="sociallogin_requireemailconfirm"
					value="0"></input>
				<tr>
					<td><?php   echo t('Subscribe email sender')?></td>
					<td><?php   echo $form->text('subscribeemail_sender', $subscribeemail_sender, array('style' => 'width: 300px')) ?>
					</td>
				</tr>
				<tr>
					<td><?php   echo t('Subscribe email subject')?></td>
					<td><?php   echo $form->text('subscribeemail_subject', $subscribeemail_subject, array('style' => 'width: 300px')) ?>
					</td>
				</tr>
				<tr>
					<td><?php   echo t('Subscribe email text (you can use %unsername% and %password%)')?>
					</td>
					<td><?php   echo $form->textarea('subscribeemail_text', $subscribeemail_text, array('style' => 'width: 500px; height:200px;')) ?>
					</td>
				</tr>
				<tr>
					<td><?php   echo t('Disallow registration with already registered email (existing users registering with same email using an other service)')?>
					</td>
					<td><?php   echo $form->checkbox('sociallogin_nodoubleemail','1',$sociallogin_nodoubleemail=='1') ?>
					</td>
				</tr>	
				<tr>
					<td><?php   echo t('Warning message advising people that email is already present (you can use %linkpasswordrecovery%).')?>
					</td>
					<td><?php   echo $form->textarea('sociallogin_nodoubleemailtext', $sociallogin_nodoubleemailtext, array('style' => 'width: 500px; height:200px;')) ?>
					</td>
				</tr>				
			</table>
		</div>
		<?php   echo $token->output('sociallogin_changeconfiguration'); ?>
		<?php   echo $form->hidden('op','configuration'); ?>
		<?php   echo $form->submit('submit', t('Update Configuration'), array('style'=>'float: right; margin-top:10px'), 'ccm-button-v2') ?>
	</form>
	<div class="ccm-spacer" style="clear: both">&nbsp;</div>
</div>
		<?php   endif; ?>