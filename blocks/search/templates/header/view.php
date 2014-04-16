<?php  defined('C5_EXECUTE') or die("Access Denied."); ?>
<?= $error ?: null ?>
<form action="<?= str_replace('&amp;','&',$this->action('resultsJson')) ?>" method="get" class="ccm-search-block-form" id="ccm-search-header">
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
  <div id="searchResults">
    <a>
      <div class="searchResult">
        <h4></h4>
        <p>
        </p>
      </div>
    </a>
    <div class="ccm-pagination">	
       <span class="prev"><a><i class="icon-angle-left"></i></a></span>
       <span class="next"><a><i class="icon-angle-right"></i></a></span>
    </div>
  </div>
</form>
