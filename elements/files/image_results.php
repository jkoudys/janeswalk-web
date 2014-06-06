<?php
defined('C5_EXECUTE') || die('Access Denied.');
if (isset($_REQUEST['searchInstance'])) {
	$searchInstance = Loader::helper('text')->entities($_REQUEST['searchInstance']);
}
$valt = Loader::helper('validation/token');
$form = Loader::helper('form');
?>
<script type="text/javascript">
	var CCM_STAR_STATES = {
		'unstarred':'star_grey.png',
		'starred':'star_yellow.png'
	};
	var CCM_STAR_ACTION    = 'files/star.php';
</script>

<div id="ccm-<?=$searchInstance?>-search-results" class="ccm-file-list">
  <div class="ccm-pane-body">
    <div id="ccm-list-wrapper"><a name="ccm-<?=$searchInstance?>-list-wrapper-anchor"></a>
      <div style="float: right">
        <div id="ccm-files-add-asset" class="clearfix" >
          <form method="post" enctype="multipart/form-data" action="<?=REL_DIR_FILES_TOOLS_REQUIRED?>/files/importers/quick" class="ccm-file-manager-submit-single">
            <input type="file" name="Filedata" class="ccm-al-upload-single-file"  />
            <input class="ccm-al-upload-single-submit btn" type="submit" value="<?=t('Upload File')?>" />    
            <a style="display:none" href="<?=REL_DIR_FILES_TOOLS_REQUIRED?>/files/import?ocID=<?=$ocID?>&searchInstance=<?=$searchInstance?>" class="dialog-launch btn info" dialog-title="<?=t('Add Files')?>" dialog-on-close="if(swfu && swfu.highlight) { ccm_alRefresh(swfu.highlight, '<?=$searchInstance?>') }" dialog-modal="false" dialog-width="450" dialog-height="370" dialog-append-buttons="true"><?=t('Upload Multiple')?></a>
            <img class="ccm-al-upload-single-loader" style="display:none;" src="<?=ASSETS_URL_IMAGES?>/loader_intelligent_search.gif" />
            <input type="hidden" name="searchInstance" value="<?=$searchInstance?>" />
            <?=$valt->output('upload');?>
            <input type="hidden" name="ocID" value="<?=$ocID?>" />
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
