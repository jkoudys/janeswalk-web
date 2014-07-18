<?php
defined('C5_EXECUTE') or die("Access Denied.");

class PageAttributeTypeController extends AttributeTypeController
{
    protected $searchIndexFieldDefinition = 'I DEFAULT 0 NULL';

    public function getValue()
    {
        $db = Loader::db();
        $value = $db->GetOne("select cID from atPage where avID = ?", array($this->getAttributeValueID()));
        if ($value > 0) {
            $p = Page::getByID($value);

            return $p;
    }
  }

  public function getDisplayValue()
  {
      $nh = Loader::helper('navigation');
      $p = $this->getValue();
      if (is_object($p)) {
          return "<a href='{$nh->getCollectionURL($p)}'>{$p->getCollectionName()}</a>";
    }
  }

  public function getDisplaySanitizedValue()
  {
      return $this->getDisplayValue();
  }

  public function searchForm($list)
  {
      $cID = $this->request('value');
      $list->filterByAttribute($this->attributeKey->getAttributeKeyHandle(), $cID);

      return $list;
  }

  public function getSearchIndexValue()
  {
      $db = Loader::db();
      $value = $db->GetOne("select cID from atPage where avID = ?", array($this->getAttributeValueID()));

      return $value;
  }

  public function importValue(SimpleXMLElement $akv)
  {
      if (isset($akv->value->cID)) {
          $cIDVal = (string) $akv->value->cID;
          $cID = ContentImporter::getValue($cIDVal);
          if ($cID) {
              return Page::getByID($cID);
      }
    }
  }

  public function search()
  {
  }

  public function form()
  {
      Loader::model('page_list');
      $pl = new PageList();
      $lastParent = '';
      $selected = $_REQUEST['akID'][$this->getAttributeKey()->getAttributeKeyID()]['value'];
      if (!$selected && $this->getAttributeValueID() > 0) {
          $selected = $this->getValue()->cID;
    }
    $selectString = "<select id='{$this->field('value')}' name='{$this->field('value')}' ><option value=''>--</option>";
    $pl->filterByCollectionTypeHandle('city');
    $pages = $pl->get();
    uasort($pages,
        function ($a,$b) {
            $ap = $a->getCollectionParentID();
            $bp = $b->getCollectionParentID();

            return ($ap === $bp) ? 0 : strcmp(Page::getByID($ap)->getCollectionName(), Page::getByID($bp)->getCollectionName());
      });
    foreach ($pages as $page) {
        $parent = Page::getByID($page->getCollectionParentID())->getCollectionName();
        if ($lastParent != $parent) {
            if ($lastParent !== '') { $selectString .= '</optgroup>'; }
      $selectString .= "<optgroup label='$parent'>";
      $lastParent = $parent;
      }
      $selectedAttributeVal = '';
      if ($selected === $page->cID) {
          $selectedAttributeVal = ' selected="selected"';
      }
      $selectString .= "<option value=\"{$page->getCollectionID()}\"" . ($selectedAttributeVal) . ">{$page->getCollectionName()}</option>";
    }
    $selectString .= '</select>';
    echo $selectString;
  }

  // run when we call setAttribute(), instead of saving through the UI
  public function saveValue($obj)
  {
      $db = Loader::db();
      if (is_object($obj) && (!$obj->isError())) {
          $db->Replace('atPage', array('avID' => $this->getAttributeValueID(), 'cID' => $obj->getCollectionID()), 'avID', true);
    }
  }

  public function deleteKey()
  {
      $db = Loader::db();
      $arr = $this->attributeKey->getAttributeValueIDList();
      foreach ($arr as $id) {
          $db->Execute('delete from atPage where avID = ?', array($id));
    }
  }

  public function saveForm($data)
  {
      if ($data['value'] > 0) {
          $p = Page::getByID($data['value']);
          $this->saveValue($p);
    } else {
        $db = Loader::db();
        $db->Replace('atPage', array('avID' => $this->getAttributeValueID(), 'cID' => 0), 'avID', true);
    }
  }

  public function deleteValue()
  {
      $db = Loader::db();
      $db->Execute('delete from atPage where avID = ?', array($this->getAttributeValueID()));
  }

}
