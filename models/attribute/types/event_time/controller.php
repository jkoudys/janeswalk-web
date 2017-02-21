<?php
use Concrete\Core\Legacy\HtmlHelper;
use Concrete\Core\Legacy\FormHelper;
use Concrete\Core\Legacy\FormDateTimeHelper;

class EventTimeAttributeTypeController extends DateTimeAttributeTypeController
{
    /**
     * Get the type of schedule, and all the slotted dates
     *
     * @return array Tuples of the start and end times
     */
    public function getValue(): array
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
        $reArr['slots'] = array_map(
            function ($slot) {
                return [(int) $slot[0], (int) $slot[1]];
            },
            $db->GetAll(
                'SELECT UNIX_TIMESTAMP(atet.start) AS "0", UNIX_TIMESTAMP(atet.end) AS "1" FROM atEventTime atet INNER JOIN atSchedule ats ON (ats.avID = atet.atScheduleID AND ats.avID = ?) ORDER BY start < CURRENT_DATE, start',
                [$this->getAttributeValueID()]
            )
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
    public function saveValue(array $data)
    {
        $db = Loader::db();
        $db->Replace(
            'atSchedule',
            [
                'avID' => $this->getAttributeValueID(),
                'open' => (int) $data['open'],
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
        $localTimezone = new DateTimeZone(date_default_timezone_get());
        $utc = new DateTimeZone('UTC');
        // Setup our formatter
        if (DATE_FORM_HELPER_FORMAT_HOUR == '12') {
            $dtFormat = 'n/j/Y g:i a';
        } else {
            $dtFormat = 'n/j/Y h:i';
        }
        foreach ((array) $data['times'] as $key => $time) {
            // Timestamp is in ms - so "/ 1000" is needed
            foreach (['start', 'end'] as $field) {
                // Collapse the fields into a parseable string
                $str = $time[$field . '_dt'] . ' ' . $time[$field . '_h'] . ':' . $time[$field . '_m'];
                if (DATE_FORM_HELPER_FORMAT_HOUR == '12') {
                    $str .= ' ' . $time[$field . '_a'];
                }
                // Make a date object from that string
                $date = DateTime::createFromFormat($dtFormat, $str, $utc);
                // TODO: implement proper timezone support, and remove this kludge
                // of swapping back to local time before save
                $date->setTimezone($localTimezone);
                // format for SQL inserts
                $sanitizedTimes[$key][$field] =  $date->format('Y-m-d H:i:s');
            }
        }
        $this->setScheduledEventTimes($sanitizedTimes);
    }

    /* $scheduledTimes = array of 'start' and 'duration' */
    protected function setScheduledEventTimes(array $scheduledTimes)
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
        $html = new HtmlHelper();
        $this->addHeaderItem($html->css('jquery.ui.css'));
        $this->addHeaderItem($html->javascript('jquery.ui.js'));

        $this->set('dt', new FormDateTimeHelper());
        $this->set('fh', new FormHelper());
        $this->set('data', $this->getValue());
        $this->set('akID', $this->attributeKey->getAttributeKeyID());
    }

    public function saveForm(array $data)
    {
        $this->load();
        $dt = new FormDateTimeHelper();
        $values = [
            'open' => (bool) $data['open'],
            'type' => $data['type'],
            'times' => $data['times'],
        ];
        $this->saveValue((array) $values);
    }
}

class EventTimeAttributeTypeValue extends Object
{
}
