<style>
.dateList input, .dateList select { display:inline-block !important; }
ul.dateList { margin-left:0; position:relative; }
ul.dateList .ccm-add-option { position:absolute; top:-25px; right:5px; display:none; }
ul.dateList legend { margin-bottom:5px; }
ul.dateList fieldset { position:relative; }
ul.dateList fieldset .ccm-search-remove-option { position:absolute; top:0; right:2px; }
ul.dateList fieldset .ccm-search-remove-option:hover { cursor:pointer; }
</style>
<script>
var closeField = function () {
    var eventdate = this.parentNode;
    eventdate.parentNode.removeChild(eventdate);
};

function EventDate(akID)
{
    var dateList = document.getElementById("ak" + akID);
    var dates = dateList.querySelectorAll("fieldset .ccm-search-remove-option");
    for (var i = 0, e = dates[i]; e; i++, e = dates[i]) {
        e.addEventListener("click", closeField);
  }
}
</script>

<label class="checkbox">
  <?= $fh->checkbox("akID[$akID][open]", 'open', $data['open']) ?>
  Open Booking
</label>
<label class="select">
  Booking Type
<?= $fh->select("akID[$akID][type]", ['' => 'No Booking', 'set' => 'Scheduled', 'all' => 'By Request'], $data['type'] ) ?>
</label>
<ul class="dateList" id="ak<?= $akID ?>_eventTimeList">
  <a class="ccm-add-option"><img src="<?= ASSETS_URL_IMAGES ?>/icons/add.png" /></a>
<?php
if ($data['slots']) foreach ($data['slots'] as $key=>$slot) { ?>
    <script>new EventDate(<?= $akID ?>);</script>
    <fieldset>
    <a class="ccm-search-remove-option"><img src="<?= ASSETS_URL_IMAGES ?>/icons/remove_minus.png" /></a>
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
