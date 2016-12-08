<?php
Loader::library("file/importer");

$cf = Loader::helper('file');
$valt = Loader::helper('validation/token');
$im = Loader::helper('image');
$fp = FilePermissions::getGlobal();
if (!$fp->canAddFiles()) {
    die(t('Unable to add files.'));
}

$u = new User();
$error = '';
$errorCode = -1;

if (isset($_REQUEST['fID'])) {
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
            } elseif (!is_object($fr)) {
                // we check $fr because we don't want to set it if we are replacing an existing file
                $respf = $resp->getFile();
                $respf->setOriginalPage($_POST['ocID']);
            }
        } else {
            $errorCode = $_FILES['Filedata']['error'];
        }
    } elseif (isset($_FILES['Filedata'])) {
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

header('Content-Type: application/json');
// Response is json
if ($error) {
    http_response_code(400);
    echo json_encode(['error' => $error, 'errorCode' => $errorCode]);
} else {
    $f = File::getByID(isset($resp) ? $resp->getFileID() : $_REQUEST['fID']);
    echo json_encode([
        'id' => $resp->getFileID(),
        'url' => $resp->getURL(),
        'thumb' => $im->getThumbnail($f, 260, 300)
    ]);
}
