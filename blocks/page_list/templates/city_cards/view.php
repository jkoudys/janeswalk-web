<?php
use Concrete\Core\Legacy\ImageHelper;
use JanesWalk\Models\PageTypes\City;

// Load helpers
$im = new ImageHelper();
?>
<ul class="ccm-page-list-city-cards">
<?php
    foreach ($pages as $key => $page) { 
        $city = new City($page);
?>
    <li>
        <figure>
            <a href="<?= $city->url ?>" class="thumbnail placeholder<?= $key % 3 ?>" <?php if ($city->fullbg) { ?> style="background-image:url(<?= $im->getThumbnail($city->fullbg, 640, 640)->src ?>)" <?php } ?>></a>
            <figcaption>
                <h4><a href="<?= $city->url ?>"><?= (string) $city ?></a></h4>
                <p><?= trim(strip_tags($page->getCollectionDescription())) ?></p>
                <h5>City Organizer<br /><?= trim($city->cityOrganizer->getAttribute('first_name') . ' ' . $city->cityOrganizer->getAttribute('last_name')) ?></h5>
            </figcaption>
        <?php if ($city->avatar) { ?><div class="tag" style="background-image:url(<?= $city->avatar ?>)"></div><?php } ?>
        </figure>
    </li>
<?php
    }
?>
</ul>
