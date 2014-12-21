<?php
defined('C5_EXECUTE') or die("Access Denied.");

class EventTimeAttributeTypeController extends DateTimeAttributeTypeController
{
    public function getScheduledEventTimes()
    {
        $db = Loader::db();
        $events = $db->GetAll("select start, end from atEventTime ev where ev.atScheduledId = ? order by ev.start", array($this->getAttributeValueID()));
    }

    public function getDurationsMinutes()
    {
        $db = Loader::db();

        return $db->GetAll("select TIMESTAMPDIFF(MINUTE,start,end) from atEventTime where atScheduleID = ?", array($this->getAttributeValueID()));
    }

    public function getDurationsHours()
    {
        $db = Loader::db();

        return $db->GetAll("select TIMESTAMPDIFF(HOUR,start,end) from atEventTime where atScheduleID = ?", array($this->getAttributeValueID()));
    }

    /* Will human-format here to simplify transfer to JSON response */
    public function getValue()
    {
        $db = Loader::db();
        $reArr = $db->GetRow("select open, type from atSchedule where avID = ?", array($this->getAttributeValueID()));
        if (sizeof($reArr) > 0) {
            /* Searched but couldn't find a prebuilt function - spent WAY too much time writing this. Bonus is, it runs much faster than PHP. */
            $reArr["slots"] = (object) $db->GetAll(
                "select DATE_FORMAT(start, '%M %e, %Y') as date, DATE_FORMAT(start, '%h:%i %p') as time,
                CONCAT(
                    CASE WHEN FLOOR(TIMESTAMPDIFF(HOUR,start,end)) > 0 THEN
                    CONCAT((TIMESTAMPDIFF(HOUR,start,end)),
                        CASE
                        WHEN FLOOR(TIMESTAMPDIFF(HOUR,start,end)) = 1 THEN
                        ' Hour'
                        ELSE
                        ' Hours'
                        END
                    )
                    ELSE
                    ''
                    END,
                    CASE
                    WHEN MOD(TIMESTAMPDIFF(MINUTE,start,end),60) > 0 THEN
                    CONCAT(
                        CASE
                        WHEN FLOOR(TIMESTAMPDIFF(HOUR,start,end)) > 0 THEN ', ' ELSE ''
                        END
                        , MOD(TIMESTAMPDIFF(MINUTE,start,end),60), ' Minutes')
                        ELSE
                        ''
                        END
                    ) as duration,
                    DATE_FORMAT(start, '%Y-%m-%d %H:%i:%S') as eb_start,
                    DATE_FORMAT(end, '%Y-%m-%d %H:%i:%S') as eb_end
                    from atSchedule, atEventTime where atSchedule.avID = atEventTime.atScheduleID and atSchedule.avID = ? ORDER BY start < CURRENT_DATE, start", array($this->getAttributeValueID())
            );

            return array_filter($reArr);
        }
    }

    /**
     * Save a value, usually from setAttribute()
     * @param Array $data The array data, as formatted by CAW
     * ['slots' => [], 'times' => []]
     */
    public function saveValue($data)
    {
        $db = Loader::db();
        $db->Replace('atSchedule', array('avID' => $this->getAttributeValueID(), 'open' => $data['open'], 'type' => $data['type']), 'avID', true);

        /* slots are set by the walk form, and are in a format: start time, duration
         * times are set by the c5 forms, and are start time array, end time array
         */
        $sanitizedTimes = [];
        foreach ((array) $data['slots'] as $time) {
            $sanitizedTimes[] = [
                'start' => date('Y-m-d H:i:s', strtotime("{$time['date']} {$time['time']}")),
                    'end' => date('Y-m-d H:i:s', strtotime("{$time['date']} {$time['time']} + {$time['duration']}"))
                ];
        }
        // Complex logic for parsing out start and end times
        foreach ((array) $data['times'] as $key=>$time) {
            // Timestamp is in ms - so "/ 1000" is needed
            foreach (['start','end'] as $field) {
                $dt = date('Y-m-d', floor($time[$field . '_dt'] / 1000));
                $str = $dt . ' ' . $time[$field . '_h'] . ':' . $time[$field . '_m'] . ' ' . $time[$field . '_a'];
                if (DATE_FORM_HELPER_FORMAT_HOUR == '12') {
                    $str = $dt . ' ' . $time[$field . '_h'] . ':' . $time[$field . '_m'] . ' ' . $time[$field . '_a'];
                } else {
                    $str = $dt . ' ' . $time[$field . '_h'] . ':' . $time[$field . '_m'];
                }
                $sanitizedTimes[$key][$field] = date('Y-m-d H:i:s', strtotime($str));
            }
        }
        $this->setScheduledEventTimes($sanitizedTimes);
    }

    /* $scheduledTimes = array of 'start' and 'duration' */
    public function setScheduledEventTimes($scheduledTimes)
    {
        $db = Loader::db();
        $db->BeginTrans();
        $ok = $db->Execute("delete from atEventTime where atScheduleID = ?", array($this->getAttributeValueID()));
        $ok = true;
        foreach ($scheduledTimes as $time) {
            if ($ok) { $ok = $db->AutoExecute('atEventTime', array('atScheduleID' => $this->getAttributeValueID(), 'start' => $time['start'], 'end' => $time['end']), 'INSERT'); 
            }
        }
        if ($ok) { $db->CommitTrans(); 
        }
        else { $db->RollbackTrans(); 
        }
    }

    public function form()
    {
        $this->load();
        $html = Loader::helper('html');
        $this->addHeaderItem($html->css('jquery.ui.css'));
        $this->addHeaderItem($html->javascript('jquery.ui.js'));

        $this->set('dt', Loader::helper('form/date_time'));
        $this->set('fh', Loader::helper('form'));
        $this->set('data', $this->getValue());
        $this->set('akID', $this->attributeKey->getAttributeKeyID());
    }

    /* Example input $data generated by form:
    array(3) {
    ["open"]=&gt;
    string(4) "open"
    ["type"]=&gt;
    string(3) "all"
    ["times"]=&gt;
    array(1) {
    [0]=&gt;
    array(8) {
      ["start_dt"]=&gt;
      string(13) "1399003200000"
      ["start_h"]=&gt;
      string(1) "5"
      ["start_m"]=&gt;
      string(2) "00"
      ["start_a"]=&gt;
      string(2) "PM"
      ["end_dt"]=&gt;
      string(13) "1399003200000"
      ["end_h"]=&gt;
      string(1) "8"
      ["end_m"]=&gt;
      string(2) "00"
      ["end_a"]=&gt;
      string(2) "PM"
    }
    }
    }
    */
    public function saveForm($data)
    {
        $this->load();
        $dt = Loader::helper('form/date_time');
        $values = [
            'open' => !!$data['open'],
            'type' => $data['type'],
            'times' => $data['times'] ];
        $this->saveValue((object) $values);
    }
}

class EventTimeAttributeTypeValue extends Object
{
}
