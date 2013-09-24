<?php

Loader::model('attribute/type');
Loader::model('attribute/categories/collection');
$th = Loader::helper('theme');
$ak = CollectionAttributeKey::getByHandle('theme');
$satc = new SelectAttributeTypeController(AttributeType::getByHandle('select'));
$satc->setAttributeKey($ak);
$values = $satc->getOptions(); ?>
<div style="background-color:#00f;color:#fff;"> 
<?php
foreach ($values as $v) {
    echo 'handle: "' . $v->value .'" friendly: "' . $th->getIcon($v->value) . '"<br />';
}
?>
</div>

