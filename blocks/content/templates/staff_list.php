<?php
defined('C5_EXECUTE') or die("Access Denied.");
Loader::model('user_list');
$av = Loader::helper('concrete/avatar');

// Filter to show only the staff members, or customize
// by 'custom template' and choose a block name
$ul = new UserList;
$ul->filterByGroup((string) $this->getBlockObject()->getBlockName() ?: 'Staff');
$ul->sortBy('ak_order', 'asc');

/**
 * Build doc with all the 'member's in it, and load the values we'll
 * need to display.
 */
$members = [];
foreach ($ul->get(100) as $staffMember) {
    $member = [];
    $avatar = $av->getImagePath($staffMember);
    if ($avatar) {
        $member['background'] = $avatar;
    } else {
        $member['placeholder'] = 'placeholder' . (ord($staffMember->getUserID()) % 3);
    }
    $member['shortbio'] = $staffMember->getAttribute('first_name') . ' ' .
        $staffMember->getAttribute('last_name') . ', ' .
        ($staffMember->getAttribute('job_title') ?: 'Jane\'s Walk');
    
    $member['email'] = $staffMember->getUserEmail();
    $member['bio'] = $staffMember->getAttribute('bio');
    $members[] = $member;
}

echo $controller->getContent();

?>
<ul class="ccm-staff-list">
<?php foreach ($members as $member) { ?>
    <li>
        <div 
            class="u-avatar <?= $member['placeholder'] ?>"
            <?= $member['background'] ? (' style="background-image:url(' . $member['background'] . '"') : '' ?>>
        </div>
        <div class="ccm-staff-list-details">
            <h3>
                <?= $member['shortbio'] ?>
            </h3>
            <a href="mailto:<?= $member['email'] ?>">
                <?= $member['email'] ?>        
            </a>
            <p class="ccm-staff-list-bio">
                <?= $member['bio'] ?>
            </p>
        </div>
    </li>
<?php } ?>
</ul>
