<?php
use Concrete\Core\Legacy\CollectionAttributeKey;
use Concrete\Core\Legacy\FormPageSelectorHelper;

defined('C5_EXECUTE') or die("Access Denied.");
$c = Page::getCurrentPage();
?>
<div class="ccm-ui"><!-- Open C5 UI Wrapper -->

    <ul id="ccm-pagelist-tabs" class="unstyled ccm-dialog-tabs">
        <li class="ccm-nav-active"><a id="ccm-pagelist-tab-add" href="javascript:void(0);"><?= ($bID>0)? t('Edit') : t('Add') ?></a></li>
        <li class=""><a id="ccm-pagelist-tab-preview"  href="javascript:void(0);"><?= t('Preview')?></a></li>
    </ul>

    <input type="hidden" name="pageListToolsDir" value="<?= $uh->getBlockTypeToolsURL($bt)?>/" />
    <div id="ccm-pagelistPane-add" class="ccm-pagelistPane">
        <div class="ccm-block-field-group">
            <h2><?= t('Number and Type of Pages')?></h2>
            <?= t('Display')?>
            <input type="text" name="num" value="<?= $num?>" style="width: 30px">
            <?= t('pages of type')?>
            <?php
            $ctArray = CollectionType::getList();

            if (is_array($ctArray)) { ?>
            <select name="ctID" id="selectCTID">
                <option value="0">** <?php  echo t('All')?> **</option>
                <?php  foreach ($ctArray as $ct) { ?>
                <option value="<?= $ct->getCollectionTypeID()?>" <?php  if ($ctID == $ct->getCollectionTypeID()) {
                ?> selected <?php
                } ?>>
                <?= $ct->getCollectionTypeName()?>
                </option>
                <?php  } ?>
            </select>
            <?php                                                                                                                                                                                                                                                                                                                                          } ?>
        </div>
        <div class="ccm-block-field-group">
            <h2><?= t('Filter')?></h2>

            <?php
            $cadf = CollectionAttributeKey::getByHandle('is_featured');
            ?>
            <label class="checkbox">
                <input <?php  if (!is_object($cadf)) {
                ?> disabled <?php
                } ?> type="checkbox" name="displayFeaturedOnly" value="1" <?php  if ($displayFeaturedOnly == 1) {
                ?> checked <?php
                } ?> style="vertical-align: middle" />
                <?= t('Featured pages only.')?>
                <?php  if (!is_object($cadf)) { ?>
                <span><?= t('(<strong>Note</strong>: You must create the "is_featured" page attribute first.)');?></span>
                <?php  } ?>
            </label>
            <label class="checkbox">
                <input type="checkbox" name="displayAliases" value="1" <?php  if ($displayAliases == 1) {
                ?> checked <?php
                } ?> />
                <?= t('Display page aliases.')?>
            </label>
        </div>
        <div class="ccm-block-field-group">
            <h2><?= t('Filter by Owner') ?></h2>
            <label class="checkbox">
                <input type="checkbox" name="filterUserBlacklist" <?= $filterUserBlacklist ? 'checked' : '' ?>> <?= t('Blacklist') ?>
            </label>
            <input type="text" name="filterUser" value="<?= $filterUser ?>" placeholder="User emails, comma separated">
        </div>
        </div>
        <div class="ccm-block-field-group">
            <h2><?= t('Pagination')?></h2>
            <label class="checkbox">
                <input type="checkbox" name="paginate" value="1" <?php  if ($paginate == 1) {
                ?> checked <?php
                } ?> />
                <?= t('Display pagination interface if more items are available than are displayed.')?>
            </label>
        </div>
        <div class="ccm-block-field-group">
            <h2><?= t('Location in Website')?></h2>
            <?= t('Display pages that are located')?>:<br/>
            <br/>
            <label class="radio inline">
                <input type="radio" name="cParentID" id="cEverywhereField" value="0" <?php  if ($cParentID == 0) {
                ?> checked<?php
                } ?> />
                <?= t('everywhere')?>
            </label>

            <label class="radio inline">
                <input type="radio" name="cParentID" id="cThisPageField" value="<?= $c->getCollectionID()?>" <?php  if ($cParentID == $c->getCollectionID() || $cThis) {
                ?> checked<?php
                } ?>>
                <?= t('beneath this page')?>
            </label>

            <label class="radio inline">
                <input type="radio" name="cParentID" id="cOtherField" value="OTHER" <?php  if ($isOtherPage) {
                ?> checked<?php
                } ?>>
                <?= t('beneath another page')?>
            </label>

            <div class="ccm-page-list-page-other" <?php  if (!$isOtherPage) {
                ?> style="display: none" <?php
                } ?>>

                <?php  $form = new FormPageSelectorHelper();
                if ($isOtherPage) {
                print $form->selectPage('cParentIDValue', $cParentID);
                } else {
                print $form->selectPage('cParentIDValue');
                }
                ?>

            </div>

            <div class="ccm-page-list-all-descendents" style="margin: 5px 0 0 0px;<?php  echo (!$isOtherPage && !$cThis) ? ' display: none;' : ''; ?>">
                <label class="checkbox">
                    <input type="checkbox" name="includeAllDescendents" id="includeAllDescendents" value="1" <?php  echo $includeAllDescendents ? 'checked="checked"' : '' ?> />
                    <?php  echo t('Include all child pages') ?>
                </label>
            </div>
        </div>
        <div class="ccm-block-field-group">
            <h2><?= t('Sort Pages')?></h2>
            <?= t('Pages should appear')?>
            <select name="orderBy">
                <option value="display_asc" <?php  if ($orderBy == 'display_asc') {
                ?> selected <?php
                } ?>><?= t('in their sitemap order')?></option>
                <option value="chrono_desc" <?php  if ($orderBy == 'chrono_desc') {
                ?> selected <?php
                } ?>><?= t('with the most recent first')?></option>
                <option value="chrono_asc" <?php  if ($orderBy == 'chrono_asc') {
                ?> selected <?php
                } ?>><?= t('with the earliest first')?></option>
                <option value="alpha_asc" <?php  if ($orderBy == 'alpha_asc') {
                ?> selected <?php
                } ?>><?= t('in alphabetical order')?></option>
                <option value="alpha_desc" <?php  if ($orderBy == 'alpha_desc') {
                ?> selected <?php
                } ?>><?= t('in reverse alphabetical order')?></option>
                <option value="random" <?php  if ($orderBy == 'random') {
                ?> selected <?php
                } ?>><?= t('in random order')?></option>
            </select>
        </div>

        <div class="ccm-block-field-group">
            <h2><?= t('Provide RSS Feed')?></h2>
            <label class="radio inline">
                <input id="ccm-pagelist-rssSelectorOn" type="radio" name="rss" class="rssSelector" value="1" <?= ($rss?"checked=\"checked\"":"")?>/> <?= t('Yes')?>
            </label>
            <label class="radio inline">
                <input type="radio" name="rss" class="rssSelector" value="0" <?= ($rss?"":"checked=\"checked\"")?>/> <?= t('No')?>
            </label>
            <div id="ccm-pagelist-rssDetails" <?= ($rss?"":"style=\"display:none;\"")?>>
                <strong><?= t('RSS Feed Title')?></strong><br />
                <input id="ccm-pagelist-rssTitle" type="text" name="rssTitle" style="width:250px" value="<?= $rssTitle?>" /><br /><br />
                <strong><?= t('RSS Feed Description')?></strong><br />
                <textarea name="rssDescription" style="width:250px" ><?= $rssDescription?></textarea>
            </div>
        </div>

        <style type="text/css">
            #ccm-pagelist-truncateTxt.faintText{ color:#999; }
            <?php  if ($truncateChars==0 && !$truncateSummaries) {
                $truncateChars=128;
            } ?>
        </style>
        <div class="ccm-block-field-group">
            <h2><?= t('Truncate Summaries')?></h2>
            <input id="ccm-pagelist-truncateSummariesOn" name="truncateSummaries" type="checkbox" value="1" <?= ($truncateSummaries?"checked=\"checked\"":"")?> />
            <span id="ccm-pagelist-truncateTxt" <?= ($truncateSummaries?"":"class=\"faintText\"")?>>
                <?= t('Truncate descriptions after')?>
                <input id="ccm-pagelist-truncateChars" <?= ($truncateSummaries?"":"disabled=\"disabled\"")?> type="text" name="truncateChars" size="3" value="<?= intval($truncateChars)?>" />
                <?= t('characters')?>
            </span>
        </div>

    </div>

    <div id="ccm-pagelistPane-preview" style="display:none" class="ccm-preview-pane ccm-pagelistPane">
        <div id="pagelist-preview-content"><?= t('Preview Pane') ?></div>
    </div>

</div><!-- Close C5 UI Wrapper -->
