<?php
$v = View::getInstance();

if (ENABLE_REGISTRATION_CAPTCHA) { ?>
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<script>
function concrete_handleSubmitRegistration() {
    document.querySelector('.concrete-registration-form').submit();
}
</script>
<?php } ?>

<div id="ccm-profile-wrapper">
  <div class="row">
    <div class="col-md-10">
      <div class="page-header">
        <h1><?= t('Join Jane\'s Walk') ?></h1>
      </div>
    </div>
  </div>

  <div class="ccm-form">
<?php  if (isset($error) && $error != '') {
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
        <?= implode('<br />', $_error) ?>
    </div>
<?php
} ?>

    <?php
    $attribs = UserAttributeKey::getRegistrationList();

    if ($success) { ?>
    <div class="row">
      <div class="col-md-10">
        <?php     switch ($success) {
        case "registered":
?>
        <p><strong><?= $successMsg ?></strong><br/><br/>
        <p>Welcome to our global community! We're so glad you joined the constellation of incredible citizen urbanists that make their cities better every day, by walking and prompting open discussion with their neighbours. Let's get started.</p>
        <a href="<?= $v->url('/') ?>"><?= t('Take me back to the home page!') ?></a></p>
        <?php
        break;
        case "validate":
        ?>
        <p><?= $successMsg[0] ?></p>
        <p><?= $successMsg[1] ?></p>
        <p><a href="<?= $v->url('/') ?>"><?= t('Take me back to the home page!')?></a></p>
        <?php
        break;
        case "pending":
        ?>
        <p><?= $successMsg ?></p>
        <p><a href="<?= $v->url('/') ?>"><?= t('Take me back to the home page!')?></a></p>
        <?php
        break;
        } ?>
      </div>
    </div>
    <?php
    } else { ?>

    <form method="post" action="<?= $v->url('/register', 'do_register') ?>" class="form-horizontal concrete-registration-form">
      <div class="row">

        <?php  if (count($attribs) > 0) { ?>
        <div class="col-md-10">
          <fieldset>
            <legend><?= t('Your Details')?></legend>
            <?php  if ($displayUserName) { ?>
            <div class="control-group">
              <?= $form->label('uName',t('Username')) ?>
              <div class="controls">
                <?= $form->text('uName') ?>
              </div>
            </div>
            <?php  } ?>

            <div class="control-group">
              <?= $form->label('uEmail', t('Email Address')) ?>
              <div class="controls">
                <?= $form->text('uEmail') ?>
              </div>
            </div>
            <div class="control-group">
              <?= $form->label('uPassword', t('Password')) ?>
              <div class="controls">
                <?= $form->password('uPassword'); ?>
              </div>
            </div>
            <div class="control-group">
              <?= $form->label('uPasswordConfirm', t('Confirm Password')) ?>
              <div class="controls">
                <?= $form->password('uPasswordConfirm'); ?>
              </div>
            </div>

          </fieldset>
          <Br/>
          <fieldset>
            <legend><?= t('Options')?></legend>
            <?php
            $af = Loader::helper('form/attribute');

            foreach ($attribs as $ak) { ?>
            <?= $af->display($ak, $ak->isAttributeKeyRequiredOnRegister()) ?>
            <?php } ?>
          </fieldset>
        </div>
        <?php  } ?>
        <div class="col-md-10 ">
          <div class="actions">
            <?= $form->hidden('rcID', $rcID); ?>
            <button
                class="g-recaptcha"
                data-sitekey="<?= GOOGLE_RECAPTCHA_KEY ?>"
                data-callback="concrete_handleSubmitRegistration"
            >
                Submit
            </button>
          </div>
        </div>

      </div>
    </form>
    <?php  } ?>
  </div>
</div>
