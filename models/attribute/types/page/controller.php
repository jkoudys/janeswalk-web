<?php
use Concrete\Core\Legacy\NavigationHelper;
use Qaribou\Collection\CallbackHeap;

class PageAttributeTypeController extends AttributeTypeController
{
    protected $searchIndexFieldDefinition = 'I DEFAULT 0 NULL';

    public function getValue()
    {
        $db = Loader::db();
        $value = $db->GetOne('select cID from atPage where avID = ?', [$this->getAttributeValueID()]);
        if ($value > 0) {
            $p = Page::getByID($value);

            return $p;
        }
    }

    public function getDisplayValue()
    {
        $nh = new NavigationHelper();
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
        $lastParent = '';
        $selected = $_REQUEST['akID'][$this->getAttributeKey()->getAttributeKeyID()]['value'];
        if (!$selected && $this->getAttributeValueID() > 0) {
            $selected = $this->getValue()->cID;
        }

        // Get all the cities
        $pl = new PageList();
        $pl->filterByCollectionTypeHandle('city');
        $pl->sortByName();

        // Organize them by ID
        $countriesByID = array_reduce(
            (array) $pl->get(),
            function ($a, $e) {
                $countryID = $e->getCollectionParentID();
                $a[$countryID] = array_merge($a[$countryID] ?? [], [$e]);
                return $a;
            },
            []
        );

        // Build an array sorted by their city name
        $countriesByName = array_combine(
            array_map(
                function ($cID): string {
                    return Page::getByID($cID)->getCollectionName();
                },
                array_keys($countriesByID)
            ),
            array_values($countriesByID)
        );
        ksort($countriesByName);

        // Render the form element
        echo '<select id="' . $this->field('value') . '" name="' . $this->field('value') . '">' .
            '<option value="">--</option>';
        foreach ($countriesByName as $countryName => $cities) {
            echo '<optgroup label="' . $countryName . '">';
            foreach ($cities as $city) {
                $selectedAttr = ($selected === $city->getCollectionID()) ? 'selected="selected"' : '';
                echo '<option ' .
                    'value="' . $city->getCollectionID() . '" ' .
                    (($selected === $city->getCollectionID()) ? 'selected' : '') .
                    '>' .
                    $city->getCollectionName() .
                    '</option>';
            }
            echo '</optgroup>';
        }
        echo '</select>';
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
