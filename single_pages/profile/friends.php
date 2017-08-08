<div id="ccm-profile-wrapper">
	<div id="ccm-profile-body">
		<h1><?= t('My Friends') ?></h1>
		<?php
		$friendsData = UsersFriends::getUsersFriendsData( $profile->getUserID() );
		if (!$friendsData) { ?>
			<div style="padding:16px 0px;">
				<?=t('No results found.')?>
			</div>
		<?php
		}
		else {
			$dh = Loader::helper('date');
			/* @var $dh DateHelper */
			foreach($friendsData as $friendsData) {
				$friendUID = $friendsData['friendUID'];
				$friendUI = UserInfo::getById( $friendUID );
				if (!is_object($friendUI)) { ?>
					<div class="ccm-users-friend" style="margin-bottom:16px;">
						<div style="float:left; width:100px;">
							<?= $av->outputNoAvatar() ?>
						</div>
						<div >
							<?= t('Unknown User') ?>
						</div>
						<div class="ccm-spacer"></div>
					</div>
				<?php }
				else { ?>
					<div class="ccm-users-friend" style="margin-bottom:16px;">
						<div style="float:left; width:100px; margin-right:10px;">
							<a href="<?= View::url('/profile', $friendUID) ?>"><?= $av->outputUserAvatar($friendUI) ?></a>
						</div>
						<div >
							<a href="<?= View::url('/profile', $friendUID) ?>"><?= $friendUI->getUsername(); ?></a>
							<div style=" font-size:90%; line-height:90%; margin-top:4px;">
							<?= t('Member Since %s', $dh->formatDate($friendUI->getUserDateAdded(), true)) ?>
							</div>
						</div>
						<div class="ccm-spacer"></div>
					</div>
				<?php }
			}
		}
?>
	</div>
	<div class="ccm-spacer"></div>
</div>
