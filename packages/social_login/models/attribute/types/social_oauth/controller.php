<?php   
defined('C5_EXECUTE') or die("Access Denied.");

class SocialOauthAttributeTypeController extends AttributeTypeController  {

	public $helpers = array('form');
	
	public function searchKeywords($keywords) {
		$db = Loader::db();
		$qkeywords = $db->quote('%' . $keywords . '%');
		// todo make this less hardcoded (with ak_ in front of it)
		$str = '(ak_' . $this->attributeKey->getAttributeKeyHandle() . '_displayName like '.$qkeywords.' or ';
		$str .= 'ak_' . $this->attributeKey->getAttributeKeyHandle() . '_identifier like '.$qkeywords.' )';
		return $str;
	}
	
	public function searchForm($list) {
		$displayName = $this->request('displayName');
		$identifier = $this->request('identifier');
		if ($displayName) {
			$list->filterByAttribute(array('displayName' => $this->attributeKey->getAttributeKeyHandle()), '%' . $displayName . '%', 'like');
		}
		if ($identifier) {
			$list->filterByAttribute(array('identifier' => $this->attributeKey->getAttributeKeyHandle()), '%' . $identifier . '%', 'like');
		}
		return $list;
	}

	protected $searchIndexFieldDefinition = array(
		'identifier' => 'C 255 NULL',
		'displayName' => 'C 255 NULL',
	);
	
	public function search() {
		print $this->form();
		$v = $this->getView();
		$this->set('search', true);
		$v->render('form');
	}

	public function saveForm($data) {
		$this->saveValue($data);
	}

	public function validateForm($data) {
		return ($data['providerID'] != '' && $data['identifier'] != '');	
	}	
	
	public function getSearchIndexValue() {
		$v = $this->getValue();
		$args = array();
		if(!empty($v)){
			$args['providerID'] = $v->getConcProviderID();
			$args['identifier'] = $v->getConcIdentifier();
		}
		return $args;
	}
	
	public function deleteKey() {
		$db = Loader::db();
		$arr = $this->attributeKey->getAttributeValueIDList();
		foreach($arr as $id) {
			$db->Execute('delete from atSocialOauth where avID = ?', array($id));
			$db->Execute('delete from atSocialOauthValues where avID = ?', array($id));
		}
	}
	public function deleteValue() {
		$db = Loader::db();
		$db->Execute('delete from atSocialOauth where avID = ?', array($this->getAttributeValueID()));
		$db->Execute('delete from atSocialOauthValues where avID = ?', array($this->getAttributeValueID()));
	}
	
	public function saveValue($data) {
		$db = Loader::db();
		if ($data instanceof SocialOauthAttributeTypeValue) {
			$data = (array) $data->value;
		}
		$db->Execute('delete from atSocialOauthValues where avID = ?', array($this->getAttributeValueID()));
		foreach($data as $d){
			if(is_array($d)){
				extract($d);
				if(!empty($providerID)){
					$db->Replace('atSocialOauthValues', array('avID' => $this->getAttributeValueID(),
						'providerID' => $providerID,
						'identifier' => $identifier,
						'profileUrl' => $profileUrl,
						'displayName' => $displayName,
						'sessionData' => $sessionData,
						'mixedData' => $mixedData
						),
						array('avID','providerID','identifier'), true
					);
				}
			}
		}
	}
	
	public function getValue() {
		$val = SocialOauthAttributeTypeValue::getByID($this->getAttributeValueID());		
		return $val;
	}
	
	public function getDisplayValue() {
		$v = Loader::helper('text')->entities($this->getValue());
		$ret = nl2br($v);
		return $ret;
	}
	
	public function form() {
		/*if (is_object($this->attributeValue)) {
			$value = $this->getAttributeValue()->getValue();
			$this->set('providerID', $value->getProviderID());
			$this->set('identifier', $value->getIdentifier());
			$this->set('profileUrl', $value->getProfileUrl());
			$this->set('displayName', $value->getDisplayName());
			$this->set('sessionData', $value->getSessionData());
			$this->set('mixedData', $value->getMixedData());
		}
		$this->set('key', $this->attributeKey);*/
	}
}


class SocialOauthAttributeTypeValue extends Object {
	
	public static function getByID($avID) {
		$db = Loader::db();
		$values = $db->GetAll("select avID, providerID, identifier, profileUrl, displayName, sessionData, mixedData from atSocialOauthValues where avID = ?", array($avID));
		$aa = new SocialOauthAttributeTypeValue();
		$aa->setPropertiesFromArray(array('avID'=>$avID,'values'=>$values));
		if (count($values)>0) {
			return $aa;
		}
	}
	
	private function getConcMultiple($key){
		$ret=array();
		foreach($this->values as $values){
			$ret[]=$values[$key];
		}
		return implode(';',$ret);
	}
	
	public function getConcProviderID() {return $this->getConcMultiple('providerID');}
	public function getConcIdentifier() {return $this->getConcMultiple('identifier');}
	public function getConcProfileUrl() {return $this->getConcMultiple('profileUrl');}
	public function getConcDisplayName() {return $this->getConcMultiple('displayName');}
	public function getConcSessionData() {return $this->getConcMultiple('sessionData');}
	public function getConcMixedData() {return $this->getConcMultiple('mixedData');}

	public function __toString() {
		$ret = '';
		foreach($this->values as $values){
			if ($values['providerID']) {
				$ret .= $values['providerID'] . " {\n";
			}
			if ($values['identifier']) {
				$ret .= t(' Identifier: ').$values['identifier'] . "\n";
			}
			/*if ($values['profileUrl']) {
				$ret .= $values['profileUrl'];
			}*/
			if ($values['displayName']) {
				$ret .=  t(' Name: ').$values['displayName'] . "\n";
			}
			/*if ($values['sessionData']) {
				$ret .= " " . print_r($values['sessionData'],true);
			}		
			if ($values['mixedData']) {
				$ret .= " " . print_r($values['mixedData'],true);
			}*/
			$ret.="}\n";
		}
		return $ret;		
	}
}