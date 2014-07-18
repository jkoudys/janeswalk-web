<?php
  defined('C5_EXECUTE') or die("Access Denied.");
  $th = Loader::helper('text');

?>
  <select class="pageListSelect">
<?php
  // Sort the city pages by the country they're in
  uasort(
    $pages,
    function ($a,$b) {
      return (($ap = $a->getCollectionParentID()) == ($bp = $b->getCollectionParentID()))
        ? strcmp($a->getCollectionName(),$b->getCollectionName())
        : strcmp(Page::getByID($ap)->getCollectionName(),Page::getByID($bp)->getCollectionName());
    }
  );

  // Show the country parent list and city pages
  $lastCountryPage = null;
  foreach ($pages as $cityPage):
    $countryPage = Page::getByID($cityPage->getCollectionParentID())->getCollectionName();
    if ($countryPage !== $lastCountryPage) {
      if ($lastCountryPage !== null) {
        echo '</optgroup>';
      }
      echo '<optgroup label="' . ($countryPage) . '">';
      $lastCountryPage = $countryPage;
    }
?>
      <option value="<?= ($nh->getLinkToCollection($cityPage)) ?>"><?= ($th->entities($cityPage->getCollectionName())) ?></option>
<?php
  endforeach;
?>
  </optgroup>
</select>
