<?php 
defined('C5_EXECUTE') or die("Access Denied.");

class EventTimeAttributeTypeController extends DateTimeAttributeTypeController {
	public function form() {
		$f = Loader::helper('form');
		$dtt = Loader::helper('form/date_time');
		echo $dtt->datetime('walkdate', $this->getStart() ? $this->getStart() : "2013-05-05 12:00:00");
		echo $f->select('walkduration', array('60 minutes' => '1 hour', '90 minutes' => '1.5 hours', '120 minutes' => '2 hours', '150 minutes' => '2.5 hours', '180 minutes' => '3 hours', '210 minutes' => '3.5 hours'), $this->getDuration() ? $this->getDuration() : "60 minutes" );
	}
	public function saveValue($data) {
		$startTime = date('Y-m-d H:i:s', strtotime($data['start']));
		$endTime   = date('Y-m-d H:i:s', strtotime($data['start'] . " + " . $data['duration']));

                $db = Loader::db();
                $db->Replace('atEventTime', array('avID' => $this->getAttributeValueID(), 'start' => $startTime, 'end' => $endTime), 'avID', true);
        }
	public function saveForm($data) {
		$values = array();
		$f = Loader::helper('form');
		$dtt = Loader::helper('form/date_time');
		$values['start'] = $dtt->translate('walkdate');
		$values['duration'] = $_POST['walkduration'];
		$this->saveValue($values);
	}
	public function getStart() {
		$db = Loader::db();
                $value = $db->GetOne("select start from atEventTime where avID = ?", array($this->getAttributeValueID()));
                return $value;
	}
	public function getDuration() {
		$db = Loader::db();
                $value = $db->GetOne("select TIMESTAMPDIFF(MINUTE,start,end) from atEventTime where avID = ?", array($this->getAttributeValueID())) . " minutes";
                return $value;
	}
	public function getDurationHours() {
		$duration = $this->getDuration();
		if($duration == 60) {
			return "1 hour";
		}
		else {
			return $duration / 60 . " hours";
		}
	}
	public function getDisplayValue() {
		/* TODO - see about moving this formatting in to a block, and just returning an array/json somehow instead */
		$walkdate = strtotime($this->getStart());
		$datearray = getdate($walkdate);
		$number = $datearray['mday'];
		$ends = array('th','st','nd','rd','th','th','th','th','th','th');
		if (($number %100) >= 11 && ($number%100) <= 13)
		   $abbreviation = 'th';
		else
		  $abbreviation = $ends[$number % 10];

		return "<ul class='eventtime'><li><h2>Date</h2><p>" . strftime("%A, %B %e", $walkdate) . $abbreviation . "</p></li>" .
			"<li><h2>Start Time</h2><p>" . strftime("%l:%M %p", $walkdate) . "</p></li>" .
			"<li><h2>Est. Duration</h2><p>" . $this->getDurationHours() . "</p></li></ul>"; 
	}
	public function getValue() {
		$values =  array();
		$values['start'] = $this->getStart();
		$values['hours'] = $this->getDurationHours();
		return $values;
	}
}

