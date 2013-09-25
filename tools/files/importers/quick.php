<?

defined('C5_EXECUTE') or die("Access Denied.");
$u = new User();
$valt = Loader::helper('validation/token');
Loader::library("file/importer");
$cf = Loader::helper('file');

$fp = FilePermissions::getGlobal();
if (!$fp->canAddFiles()) {
	die(t("Unable to add files."));
}

$error = "";
$errorCode = -1;

if (isset($_GET['fID'])) {
	// we are replacing a file
	$fr = File::getByID($_REQUEST['fID']);
} else {
	$fr = false;
$searchInstance = $_POST['searchInstance'];

if ($valt->validate('upload')) {
	if (isset($_FILES['Filedata']) && (is_uploaded_file($_FILES['Filedata']['tmp_name']))) {
		if (!$fp->canAddFileType($cf->getExtension($_FILES['Filedata']['name']))) {
			$resp = FileImporter::E_FILE_INVALID_EXTENSION;
		} else {
			$fi = new FileImporter();
			$resp = $fi->import($_FILES['Filedata']['tmp_name'], $_FILES['Filedata']['name'], $fr);
		}
		if (!($resp instanceof FileVersion)) {
			$errorCode = $resp;
		} else if (!is_object($fr)) {
			// we check $fr because we don't want to set it if we are replacing an existing file
			$respf = $resp->getFile();
			$respf->setOriginalPage($_POST['ocID']);
		}
	} else {
		$errorCode = $_FILES['Filedata']['error'];
	}
} else if (isset($_FILES['Filedata'])) {
	// first, we check for validate upload token. If the posting of a file fails because of
	// post_max_size then this may not even be set, leading to misleading errors

	$error = $valt->getErrorMessage();
} else {
	$errorCode = FileImporter::E_PHP_FILE_ERROR_DEFAULT;
}

if ($errorCode > -1 && $error == '') {
	$error = FileImporter::getErrorMessage($errorCode);
}
}
?>
<html>
<head>
</head>
<body style="text-align:center">
	<? if(strlen($error)) { ?>
		window.parent.ccmAlert.notice("<?=t('Upload Error')?>", "<?=str_replace("\n", '', nl2br($error))?>");
		window.parent.ccm_alResetSingle();
	<? } else { 
  $im = Loader::helper('image');
  $f = File::getByID(isset($resp) ? $resp->getFileID() : $_REQUEST['fID']);
  $im->outputThumbnail($f,260,300);
  ?>
  <a href="<?php echo REL_DIR_FILES_TOOLS?>/files/image_upload" class="btn fileupload-exists" data-dismiss="fileupload">Remove</a>
    
<script language="javascript">
    window.parent.walkSetImage(<?=$resp->getFileID()?>);
	<? } ?>
</script>
</body>
</html>
