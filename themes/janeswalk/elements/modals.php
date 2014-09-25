<?php
/* Home for all modals which are hidden on page load */
// Helpers
$form = Loader::helper('form');

// Error modal
if (isset($error) && $error !== '') {
    if ($error instanceof Exception) {
        $_error[] = $error->getMessage();
    } elseif ($error instanceof ValidationErrorHelper) {
        $_error = $error->getList();
    } elseif (is_array($error)) {
        $_error = $error;
    } elseif (is_string($error)) {
        $_error[] = $error;
    }
}

// Login
$loginMethod = USER_REGISTRATION_WITH_EMAIL_ADDRESS ? t('Email') : t('User name');
?>
<dialog id="login">
    <article>
        <header>
            <h3 class="form-lead"><?= t('Sign into %s', SITE) ?></h3>
        </header>
        <form method="post" action="<?= $this->url('/login', 'do_login') ?>">
            <section>
                <label for="uName"><?= $loginMethod ?>
                    <input type="text" name="uName" id="uName" <?= (isset($uName) ? 'value="' . $uName . '"' : '') ?> class="ccm-input-text input-large">
                </label>
                <label for="uPassword"><?= t('Password') ?>
                    <input type="password" name="uPassword" id="uPassword" class="ccm-input-text input-large">
                </label>
                <label>
                    <input type="checkbox" /> <?= t('Keep me signed in.') ?>
                </label>
                <input type="hidden" name="uEmail" id="uEmail" />
                <input class="plaintext" type="submit" onmousedown="$('#uEmail').val($('#uName').val());$(this).parents('form').first().attr('action', '<?= $this->url('/login','forgot_password') ?>')" value="Request a new password" />
            </section>
            <footer>
                <?php  if (ENABLE_REGISTRATION) { ?>
                <input class="plaintext" type="submit" onmousedown="$('#uEmail').val($('#uName').val());$(this).parents('form').first().attr('action', '<?= $this->url('/register') ?>')" value="Register for a new account." />
                <?php  } ?>
                <?= $form->submit('submit', t('Go!'), null, '') ?>
            </footer>
        </form>
    </article>
</dialog>
