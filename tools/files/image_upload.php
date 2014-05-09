<?php
$valt = Loader::helper('validation/token');
$theme = PageTheme::getByHandle("janeswalk");
$turl = $theme->getThemeUrl();
?>
<html id="tool">
<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet" />
<link rel="stylesheet" href="<?php echo $turl . '/css/screen.css'?>">
<link rel="stylesheet" href="<?php echo $turl . '/css/main.css'?>">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<body style="margin:0;padding:0;">
<form method="post" enctype="multipart/form-data" action="<?=REL_DIR_FILES_TOOLS_REQUIRED?>/files/importers/quick" class="ccm-file-manager-submit-single">
      <div class="fileupload fileupload-new" data-provides="fileupload">
        <div class="upload-image">
          <div class="upload-item text-center">
            <span class="btn-file">
            <div class="fileupload-preview thumbnail" style="width: 200px; height: 170px;"><br><br><i class="icon-camera-retro icon-4x"></i></div>
            <br>
            <span class="fileupload-new"><?= t('Click to upload an image') ?></span><span class="fileupload-exists"><?= t('Choose a different image') ?></span><input name="Filedata" class="ccm-al-upload-single-file" type="file" />
            <input style="display:none;" class="ccm-al-upload-single-submit btn" type="submit" value="<?=t('Upload File')?>" />    
            <?=$valt->output('upload');?>
            <a href="#" class="btn fileupload-exists" data-dismiss="fileupload">Remove</a>
            </span>
          </div>
        </div>
      </div>
</form>
<script>
  // select the file input
  $('.fileupload input[type=file]').change(function() { 
    // select the form and submit
    $(this).parents("form").first().submit(); 
  });
</script>

</body>
</html>
