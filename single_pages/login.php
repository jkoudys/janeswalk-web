<?php  defined('C5_EXECUTE') or die("Access Denied.");
Loader::library('authentication/open_id');
$form = Loader::helper('form'); ?>
<script type="text/javascript">
    $(document).ready(function () {
        $("html").addClass("index-bg");
    });
    $(function () {
        $("input[name=uName]").focus();
    });
</script>
<div class="modal fade in" id="signup-panel" data-keyboard="false" data-backdrop="static" style="display: block;" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <?php  if ($changePasswordForm) { ?>
            <p><?= t('Enter your new password below.') ?></p>
            <div class="ccm-form modal-body">
                <form method="post" action="<?php echo $this->url('/login', 'change_password', $uHash)?>">
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
            <?php  
} elseif ($validated) { ?>
            <h3><?= t('Email Address Verified') ?></h3>
            <div class="success alert-message block-message modal-body">
                <p>
                    <?= t('The email address <b>%s</b> has been verified and you are now a fully validated member of this website.', $uEmail) ?>
                </p>
                <div class="alert-actions"><a class="btn small" href="<?php echo $this->url('/')?>"><?php echo t('Continue to Site')?></a></div>
            </div>

            <?php  
} elseif (isset($_SESSION['uOpenIDError']) && isset($_SESSION['uOpenIDRequested'])) { ?>
            <div class="ccm-form modal-body">
                <?php  switch ($_SESSION['uOpenIDError']) {
                case OpenIDAuth::E_REGISTRATION_EMAIL_INCOMPLETE: ?>

                <form method="post" action="<?php echo $this->url('/login', 'complete_openid_email')?>">
                    <p><?php echo t('To complete the signup process, you must provide a valid email address.')?></p>
                    <label for="uEmail"><?php echo t('Email Address')?></label><br/>
                    <?php echo $form->text('uEmail')?>

                    <div class="ccm-button">
                        <?php echo $form->submit('submit', t('Sign In') . ' &gt;')?>
                    </div>
                </form>

                <?php  
                    break;
                case OpenIDAuth::E_REGISTRATION_EMAIL_EXISTS:
                    $ui = UserInfo::getByID($_SESSION['uOpenIDExistingUser']);
                    break;
}?>
            </div>
            <?php  
} elseif ($invalidRegistrationFields) { ?>
            <div class="ccm-form modal fade in">
                <div class="modal-header">
                    <h3 class="form-lead"><?php echo t('Sign into %s', SITE)?></h3>
                </div>
                <div class="modal-body">
                    <p><?= t('Welcome back! We\'ve updated the website, as you can see. We need just a few more things from you to get started.') ?></p>
                    <form method="post" action="<?= $this->url('/login', 'do_login') ?>">
<?php
                        $attribs = UserAttributeKey::getRegistrationList();
                        $af = Loader::helper('form/attribute');

                        $i = 0;
                        foreach ($unfilledAttributes as $ak) {
                            print $af->display($ak, $ak->isAttributeKeyRequiredOnRegister());
                            $i++;
                        }
                        echo $form->hidden('uName', Loader::helper('text')->entities($_POST['uName'])),
                            $form->hidden('uPassword', Loader::helper('text')->entities($_POST['uPassword'])),
                            $form->hidden('uOpenID', $uOpenID),
                            $form->hidden('completePartialProfile', true);
?>
                    </div>
                    <div class="modal-footer">
                        <div class="ccm-button">
                            <?= $form->submit('submit', t('Sign In')) ?>
                            <?= $form->hidden('rcID', $rcID) ?>
                        </div>
                    </div>

                </form>
            </div>

            <?php 
} else { ?>
            <div class="modal-header">
                <h3 class="form-lead"><?= t('Sign into %s', SITE) ?></h3>
            </div>
            <form method="post" action="<?php echo $this->url('/login', 'do_login')?>">
                <div class="modal-body">
                    <?php  if (isset($intro_msg)) { ?>
                    <div class="alert-message block-message success"><p><?= $intro_msg ?></p></div>
                    <?php  
} ?>
                    <?php  if ($passwordChanged) { ?>

                    <div class="block-message info alert-message"><p><?= t('Password changed.  Please login to continue. ') ?></p></div>

                    <?php  
} ?>

                    <label for="uName"><?php  if (USER_REGISTRATION_WITH_EMAIL_ADDRESS) { ?>
                        <?= t('Email') ?>
                        <?php  
} else { ?>
                        <?= t('User name') ?>
                        <?php  
} ?></label>
                    <input type="text" name="uName" id="uName" <?= isset($uName) ? 'value="' . $uName . '"' : '' ?> class="ccm-input-text input-large">
                    <label for="uPassword"><?= t('Password') ?></label>
                    <input type="password" name="uPassword" id="uPassword" class="ccm-input-text input-large">
                    <label class="checkbox">
                        <input type="checkbox"> Keep me signed in.
                    </label>
                    <input type="hidden" name="uEmail" id="uEmail" />
                    <input type="hidden" name="redirectURL" value="/information" />
                    <input type="hidden" name="format" value="json" />
                    <input class="plaintext" type="submit" onmousedown="$('#uEmail').val($('#uName').val());$(this).parents('form').first().attr('action', '<?= $this->url('/login', 'forgot_password') ?>')" value="Request a new password"></input>
                </div>
                <div class="modal-footer">
                    <div class="pull-left">
                        <?php  if (ENABLE_REGISTRATION == 1) { ?>
                        <input class="plaintext" type="submit" onmousedown="$('#uEmail').val($('#uName').val());$(this).parents('form').first().attr('action', '<?= $this->url('/register') ?>')" value="Register for a new account."></input>
                        <?php  
} ?>
                    </div>
                    <?= $form->submit('submit', t('Go!'), null, '') ?>
<?php
if (isset($error) && $error != '') {
    if ($error instanceof Exception) {
        $_error[] = $error->getMessage();
    } elseif ($error instanceof ValidationErrorHelper) {
        $_error = $error->getList();
    } elseif (is_array($error)) {
        $_error = $error;
    } elseif (is_string($error)) {
        $_error[] = $error;
    }
?>
<div class="ccm-error">
<?php  foreach ($_error as $e) {
    echo $e, '<br />';
} ?>
</div>
<?php
}
?>
                </div>
            </form>
            <?php  
} ?>
        </div>
    </div>
</div>
