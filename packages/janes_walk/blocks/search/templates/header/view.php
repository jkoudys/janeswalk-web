<?php  defined('C5_EXECUTE') || die('Access Denied.'); ?>
<?= $error ?: null ?>
<div class="ccm-search-block-form" data-placeholder="<?= $title ?>" data-action="<?= $this->action('resultsJson') ?>"></div>
