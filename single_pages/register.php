<?php  defined('C5_EXECUTE') or die("Access Denied."); ?>
<div id="ccm-profile-wrapper">
  <div class="row">
    <div class="span10">
      <div class="page-header">
        <h1><?php echo t('Join Jane\'s Walk')?></h1>
      </div>
    </div>
  </div>

  <div class="ccm-form">
<?php  if (isset($error) && $error != '') {
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

    <?php  
    $attribs = UserAttributeKey::getRegistrationList();

    if($success) { ?>
    <div class="row">
      <div class="span10">
        <?php 	switch($success) { 
        case "registered": 
        ?>
        <p><strong><?php echo $successMsg ?></strong><br/><br/>
        <a href="<?php echo $this->url('/')?>"><?php echo t('Take me back to the home page!')?></a></p>
        <?php  
        break;
        case "validate": 
        ?>
        <p><?=$successMsg[0]?></p>
        <p><?=$successMsg[1]?></p>
        <p><a href="<?php echo $this->url('/')?>"><?php echo t('Take me back to the home page!')?></a></p>
        <?php 
        break;
        case "pending":
        ?>
        <p><?php echo $successMsg ?></p>
        <p><a href="<?php echo $this->url('/')?>"><?php echo t('Take me back to the home page!')?></a></p>
        <?php 
        break;
        } ?>
      </div>
    </div>
    <?php  
    } else { ?>

    <form method="post" action="<?php echo $this->url('/register', 'do_register')?>" class="form-horizontal">
      <div class="row">
 
        <?php  if (count($attribs) > 0) { ?>
        <div class="span10">
          <fieldset>
            <legend><?php echo t('Your Details')?></legend>
            <?php  if ($displayUserName) { ?>
            <div class="control-group">
              <?php echo  $form->label('uName',t('Username')); ?>
              <div class="controls">
                <?php echo  $form->text('uName'); ?>
              </div>
            </div>
            <?php  } ?>

            <div class="control-group">
              <?php  echo $form->label('uEmail',t('Email Address')); ?>
              <div class="controls">
                <?php  echo $form->text('uEmail'); ?>
              </div>
            </div>
            <div class="control-group">
              <?php  echo $form->label('uPassword',t('Password')); ?>
              <div class="controls">
                <?php  echo $form->password('uPassword'); ?>
              </div>
            </div>
            <div class="control-group">
              <?php  echo $form->label('uPasswordConfirm',t('Confirm Password')); ?>
              <div class="controls">
                <?php  echo $form->password('uPasswordConfirm'); ?>
              </div>
            </div>

          </fieldset>
          <Br/>
          <fieldset>
            <legend><?php echo t('Options')?></legend>
            <?php 

            $af = Loader::helper('form/attribute');

            foreach($attribs as $ak) { ?> 
            <?php echo  $af->display($ak, $ak->isAttributeKeyRequiredOnRegister());	?>
            <?php  }?>
          </fieldset>
        </div>
        <?php  } ?>
        <div class="span10  ">
          <?php  if (ENABLE_REGISTRATION_CAPTCHA) { ?>

          <div class="control-group">
            <?php  $captcha = Loader::helper('validation/captcha'); ?>			
            <?php echo $captcha->label()?>
            <div class="controls">
              <?php 
              $captcha->showInput(); 
              $captcha->display();
              ?>
            </div>
          </div>
          
          <?php  } ?>

        </div>
        <div class="span10 ">
          <div class="actions">
            <?php echo $form->hidden('rcID', $rcID); ?>
            <?php echo $form->submit('register', t('Register') . ' &gt;', array('class' => 'primary'))?>
          </div>
        </div>

      </div>
    </form>
    <?php  } ?>

  </div>
</div>
