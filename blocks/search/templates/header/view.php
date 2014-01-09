<?php  defined('C5_EXECUTE') or die("Access Denied."); ?>
<?= $error ?: null ?>

<form action="<?=$this->url( $resultTargetURL )?>" method="get" class="ccm-search-block-form">
	<?php if(strlen($query)==0){ ?>
	<input name="search_paths[]" type="hidden" value="<?=htmlentities($baseSearchPath, ENT_COMPAT, APP_CHARSET) ?>" />
	<?php  } else if (is_array($_REQUEST['search_paths'])) { 
		foreach($_REQUEST['search_paths'] as $search_path){ ?>
			<input name="search_paths[]" type="hidden" value="<?=htmlentities($search_path, ENT_COMPAT, APP_CHARSET) ?>" />
	<?php   }
	} ?>
  <fieldset class="search">
    <input name="query" type="text" value="<?=htmlentities($query, ENT_COMPAT, APP_CHARSET)?>" class="ccm-search-block-text" placeholder="<?=$title?>" />
    <input name="submit" type="submit" value="<?=$buttonText?>" class="ccm-search-block-submit" />
  </fieldset>
<?php  
if ($do_search) {
	if(count($results)==0){ ?>
		<h4><?=t('0 results found.')?></h4>	
	<?php }else{ 
    $tt = Loader::helper('text');
  ?>
		<div id="searchResults">
		<?php foreach($results as $r) { 
			$currentPageBody = $this->controller->highlightedExtendedMarkup($r->getBodyContent(), $query);?>
      <a href="<?=$r->getPath()?>">
        <div class="searchResult">
          <h4><?=$r->getName()?></h4>
          <?php if($currentPageBody) { ?><p>
            <?php if ($r->getDescription()) { ?>
              <?=$this->controller->highlightedMarkup($tt->shortText($r->getDescription()),$query)?>
            <?php  } ?>
            <?=$currentPageBody;?>
          </p><?php } ?>
        </div>
      </a>
		<?php  	}//foreach search result ?>
		
		<?php 
		if($paginator && strlen($paginator->getPages())>0){ ?>	
		<div class="ccm-pagination">	
			 <span><a href="<?=$paginator->getPreviousURL()?>"><i class="icon-angle-left"></i></a></span>
			 <?=$paginator->getPages()?>
			 <span><a href="<?=$paginator->getNextURL()?>"><i class="icon-angle-right"></i></a></span>
		</div>	
		<?php  } ?>
  </div>
<?php	} //results found
} 
?>
</form>
