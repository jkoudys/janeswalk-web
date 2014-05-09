<style>
.dateList input, .dateList select { display:inline-block !important; }
ul.dateList { margin-left:0; }
ul.dateList legend { margin-bottom:5px; }
</style>

<label class="checkbox">
  <?= $fh->checkbox("akID[$akID][open]", 'open', $data['open']) ?>
  Open Booking
</label>
<label class="select">
  Booking Type
<?= $fh->select("akID[$akID][type]", ['' => 'No Booking', 'set' => 'Scheduled', 'all' => 'By Request'], $data['type'] ) ?>
</label>
<ul class="dateList" id="ak<?= $akID ?>_eventTimeList">
<?php
if($data['slots']) foreach($data['slots'] as $key=>$slot) { ?>
  <fieldset>
    <legend>Date <?=$key?></legend>
    <label class='datetime'>
      Start<br/>
      <?= $dt->datetime("akID[$akID][times][$key][start]", str_replace('-','/',$slot['eb_start'])) ?>
    </label>
    <label class='datetime'>
      End<br/>
      <?= $dt->datetime("akID[$akID][times][$key][end]", str_replace('-','/',$slot['eb_end'])) ?>
    </label>
  </fieldset>
<?php
}
?>
</ul>
