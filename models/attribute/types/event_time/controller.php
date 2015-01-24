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

    /**
     * Human-format the date response in SQL. Useful in legacy PHP, but deprecated
     * in favour of client-side templating based on ms from unix epoch
     *
     * @return array
     */
    public function getHumanValue()
    {
        $db = Loader::db();
        $reArr = $db->GetRow("select open, type from atSchedule where avID = ?", array($this->getAttributeValueID()));
        if (sizeof($reArr) > 0) {
            // Fast-running formatting function; quick but a silly place for this
            $reArr['slots'] = $db->GetAll(
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
                    from atSchedule, atEventTime where atSchedule.avID = atEventTime.atScheduleID and atSchedule.avID = ? ORDER BY start < CURRENT_DATE, start", [$this->getAttributeValueID()]
            );

            return array_filter($reArr);
        }
    }

    /**
     * Get the type of schedule, and all the slotted dates
     *
     * @return array Tuples of the start and end times
     */
    public function getValue()
    {
        $db = Loader::db();

        // Load the date-description: is it an open booking, what type of booking
        $reArr = $db->GetRow(
            'SELECT open, type FROM atSchedule WHERE avID = ?',
            [$this->getAttributeValueID()]
        );

        // Add the 'slots' that this could be scheduled on
        // Note that this is seconds since epoch, not ms; MySQL and PHP both
        // assume seconds, while javascript likes ms
        $reArr['slots'] = $db->GetAll(
            'SELECT UNIX_TIMESTAMP(atet.start) AS "0", UNIX_TIMESTAMP(atet.end) AS "1" FROM atEventTime atet INNER JOIN atSchedule ats ON (ats.avID = atet.atScheduleID AND ats.avID = ?) ORDER BY start < CURRENT_DATE, start',
            [$this->getAttributeValueID()]
        );

        // Cast our values to expected types
        $reArr['open'] = (bool) $reArr['open'];
 
        return $reArr;
    }

    /**
     * Save a value, usually from setAttribute()
     * @param Array $data The array data, as formatted by CAW
     * ['slots' => [], 'times' => []]
     */
    public function saveValue($data)
    {
        $db = Loader::db();
        $db->Replace(
            'atSchedule',
            [
                'avID' => $this->getAttributeValueID(),
                'open' => (bool) $data['open'],
                'type' => $data['type']
            ],
            'avID',
            true
        );

        /* slots are set by the walk form, and are in a format: start time, end time
         * times are set by the c5 forms, and are start time array, end time array
         */
        $sanitizedTimes = [];
        foreach ((array) $data['slots'] as $time) {
            $sanitizedTimes[] = [
                'start' => date('Y-m-d H:i:s', $time[0]),
                'end' => date('Y-m-d H:i:s', $time[1]),
            ];
        }

        // Loops through all times set from c5 - edit properties, composer, etc.
        foreach ((array) $data['times'] as $key => $time) {
            // Timestamp is in ms - so "/ 1000" is needed
            foreach (['start', 'end'] as $field) {
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
        $db->Execute(
            'delete from atEventTime where atScheduleID = ?',
            [$this->getAttributeValueID()]
        );
        $ok = true;
        foreach ($scheduledTimes as $time) {
            if ($ok) {
                $ok = $db->AutoExecute(
                    'atEventTime',
                    [
                        'atScheduleID' => $this->getAttributeValueID(),
                        'start' => $time['start'],
                        'end' => $time['end']
                    ],
                    'INSERT'
                );
            }
        }
        if ($ok) {
            $db->CommitTrans();
        }
        else {
            $db->RollbackTrans();
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

    public function saveForm($data)
    {
        $this->load();
        $dt = Loader::helper('form/date_time');
        $values = [
            'open' => (bool) $data['open'],
            'type' => $data['type'],
            'times' => $data['times']
        ];
        $this->saveValue((array) $values);
    }
}

class EventTimeAttributeTypeValue extends Object
{
}
