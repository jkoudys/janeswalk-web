<style>
.dateList input, .dateList select {
  display:inline-block !important;
}
ul.dateList {
  margin-left:0;
}
ul.dateList legend {
  margin-bottom:5px;
}
</style>

<label class="checkbox">
  <?=$fh->checkbox('Open Booking', 'open', $data['open'])?>
  Open Booking
</label>
<label class="select">
  Booking Type
<?=$fh->select('type', ['' => 'No Booking', 'set' => 'Scheduled', 'all' => 'By Request'], $data['type'] )?>
</label>
<ul class="dateList" id="ak<?=$this->attributeKey->getAttributeKeyID()?>_eventTimeList">
<?php
if($data['slots']) foreach($data['slots'] as $key=>$slot) { ?>
  <fieldset>
    <legend>Date <?=$key?></legend>
    <label class='datetime'>
      Start<br/>
      <?=$dt->datetime("eventtime[$key][start]", str_replace('-','/',$slot['eb_start'])) ?>
    </label>
    <label class='datetime'>
      End<br/>
      <?=$dt->datetime("eventtime[$key][end]", str_replace('-','/',$slot['eb_end']))?>
    </label>
  </fieldset>
<?php
}
?>
</ul>

<?php /* 
<ul class="thumbnailSort" id="ak<?php echo $this->attributeKey->getAttributeKeyID() ?>_attachedFilesList"> 
		<li class="fileAttachmentRow" id="ak<?php echo $this->attributeKey->getAttributeKeyID() ?>_fileAttachmentRow<?php echo  $file->getFileID() ?>"
      style="background-image:url(<?php echo $im->getThumbnail($fv->getPath(), 160, 160)->src ?>)" >
			<input name="akID[<?php echo $this->attributeKey->getAttributeKeyID() ?>][fID][]" type="checkbox" checked="checked" value="<?php echo  $file->getFileID() ?>" /> 
		</li> 
  <li id="image-uploader-fm-display" class="addImage"> <a onclick="assignChooseMultiFileAttrFunc<?php echo $this->attributeKey->getAttributeKeyID() ?>();ccm_alLaunchSelectorFileUpload('image-uploader'); return false" href="#"><?php echo t('Click to Add') ?></a>
  <input type="hidden" name="fType" class="ccm-file-manager-filter" value="<?=FileType::T_IMAGE?>" />
  <input type="hidden" name="fMenu" class="ccm-file-manager-filter" value="simple" />
  </li>
</ul> 
 */

