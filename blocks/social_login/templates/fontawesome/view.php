<?php
defined('C5_EXECUTE') || die(_('Access Denied.'));

// Map fontawesome icons of the providers
function socialLoginIcon($providerID)
{
    switch ($providerID) {
    case 'Facebook':
        return 'fa-facebook-square';
        break;
    case 'Twitter':
        return 'fa-twitter-square';
        break;
    case 'LinkedIn':
        return 'fa-linkedin-square';
        break;
    case 'Google':
        return 'fa-google-plus-square';
        break;
    default:
        // Make a best guess at the name
        return 'fa-' . strtolower($providerID);
        break;
    }
}

$u = new User;
if (!$u->isLoggedIn()) {
?>
<ul class="social-login-providers template-fontawesome">
    <?php foreach ($active_providers as $provider) { ?>
        <li>
            <a href="?provider=<?= $provider['providerID'] ?>"><i class="fa <?= socialLoginIcon($provider['providerID']) ?>" alt="<?= $provider['providerName'] ?>" /></i></a>
        </li>
    <?php } ?>
</ul>
<?php }
