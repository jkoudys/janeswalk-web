<div id="ccm-form-attribute-<?= $akID ?>" class="ccm-form-attribute-date-range">
    <dialog class="ccm-form-date-repeats">
    <header>
        <h3>Repeat</h3>
    </header>
    <section>
        <fieldset>
            <label>
                <?= t('Repeats') ?> 
                <?=
                $fh->select(
                    'akID[' . $akID . '][repeat]',
                    [
                        'daily' => t('Daily'),
                            'weekly' => t('Weekly'),
                            'monthly' => t('Monthly'),
                            'yearly' => t('Yearly')
                        ],
                    $data['repeat']
                )
                ?>
            </label>
            <label>
                <?= t('Repeat for') ?> 
                <?= $fh->select('akID[' . $akID . '][repeat]', range(1, 30), $data['repeat']) ?> <span class="repeat-frequency"></span>
            </label>
            <label>
                <?= t('Repeats') ?> 
                <?= $fh->select('akID[' . $akID . '][repeat]', ['' => 'No Booking', 'set' => 'Scheduled', 'all' => 'By Request'], $data['repeat']) ?>
            </label>
        </fieldset>
    </section>
    <footer>
    </footer>
    </dialog>
    <ul class="dateList" id="ak<?= $akID ?>_eventTimeList">
        <a class="ccm-add-option"><img src="<?= ASSETS_URL_IMAGES ?>/icons/add.png" /></a>
        <?php
        if ($data['slots']) { foreach ($data['slots'] as $key => $slot) { ?>
        <script>new EventDate(<?= $akID ?>);</script>
        <fieldset>
            <a class="ccm-search-remove-option"><img src="<?= ASSETS_URL_IMAGES ?>/icons/remove_minus.png" /></a>
            <legend><?= t('Date') ?> #<?=$key?></legend>
            <label class='datetime'>
                <?= $dt->datetime("akID[$akID][times][$key][start]", str_replace('-', '/', $slot['start'])) ?>
            </label>
            <span><?= t('to') ?></span>
            <label class='datetime'>
                End<br/>
                <?= $dt->datetime("akID[$akID][times][$key][end]", str_replace('-', '/', $slot['end'])) ?>
            </label>
            <label class="checkbox">
                <?= $fh->checkbox("akID[$akID][all-day]", 'all-day', $data['all-day']) ?>
                All Day
            </label>
            <label class="checkbox">
                <?= $fh->checkbox("akID[$akID][repeat]", 'repeat', $data['repeat']) ?>
                Repeats
            </label>
        </fieldset>
        <?php
        } 
        }
        ?>
    </ul>
</div>
