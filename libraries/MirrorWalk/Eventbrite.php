<?php
namespace JanesWalk\Libraries\MirrorWalk;

use \JanesWalk\Models\PageTypes\Walk;

/**
 * Loaders
 * FIXME: on c5.7 upgrade, move to consistent autoloader approach
 */
require_once 'EventInterface.php';
\Loader::model('page_types/Walk');

class Eventbrite implements EventInterface
{
    /**
     *  @type int $eid The EventBrite ID, used to identify event + build URLs
     *  @type string[] $eventParams The various parameters taken by the EB API
     *  @type string[] $ticketParams Parameters taken by the EB ticket endpoint
     */
    protected $eid,
              $eventParams,
              $ticketParams;

    /**
     * @type string $apiEndpoint The endpoint we're connecting to EB on
     * @type Page $page concrete5 Collection for this walk
     */
    private static $apiEndpoint = 'https://www.eventbrite.com/json/';
    private $page;

    /**
     * Load default parameters for EB events, and optionally load Walk data
     */
    public function __construct(Walk $walk = null)
    {
        // Set EB ticket defaults upfront
        $this->ticketParams = [
            // Jane's Walks are always free
            'price' => '0.00',
            'min' => '1',
            'max' => '20',
            'quantity_available' => '250',
            // Default ticket availability start to today
            'start_date' => gmdate('Y-m-d H:i:s', time())
        ];

        // Walk may be loaded after construction
        if ($walk) {
            $this->loadWalk($walk);
        }
    }

    /**
     * Set EB API params based on Walk model data
     */
    public function loadWalk(Walk $walk)
    {
        $this->page = $walk->getPage();
        $this->eid = $this->page->getAttribute('eventbrite');
        $this->eventParams = [
            'id' => $this->eid,
            'privacy' => '1',
            'confirmation_page' => 'http://janeswalk.org/donate',
            'title' => (string) $walk,
            'description' => $walk->longdescription,
            // Default status to draft, so only explicit calls publish an event
            'status' => 'draft',
            'timezone' => $walk->getTimezone(),
            'app_key' => EVENTBRITE_APP_KEY,
            'user_key' => EVENTBRITE_USER_KEY
        ];

        // Load the available time slots
        // TODO: just syncing the next time -- check if the EB API supports
        // easily setting multi-date events;
        if ($walk->time['open']) {
            $this->eventParams['repeats'] = 'yes';
        }
        foreach ((array) $walk->time['slots'] as $time) {
            $this->eventParams['start_date'] = gmdate('Y-m-d H:i:s', $time[0]);
            $this->eventParams['end_date'] = gmdate('Y-m-d H:i:s', $time[1]);
        }
    }

    /**
     * Set up a new event
     */
    public function requestCreateEvent()
    {
        $ch = self::curlIni('event_new', $this->eventParams);

        return $ch;
    }

    /**
     * Update an existing event - eid MUST be set in order for this to be called
     */
    public function requestUpdateEvent()
    {
        $ch = self::curlIni('event_update', $this->eventParams);

        return $ch;
    }

    /**
     * Receive response from creating/updating event
     * Unforunately ticket_new needs a separate request, so we'll just blast
     * out a bunch of creates for new tickets
     * FIXME: either delete all old unused tickets, or disable them so we don't
     * get duplicate ticket entries.
     *
     * @return void
     */
    public function receiveEvent(array $reply)
    {
        // Get the eid from response, if needed
        if (!$this->isCreated() && $reply['process']) {
            $this->ticketParams['event_id'] = $reply['process']['id'];
            $this->page->setAttribute('eventbrite', $reply['process']['id']);
        }

        // Setup our multi-handler
        $mh = curl_multi_init();

        // FIXME: Loop through each date

        $ch = self::curlIni('ticket_update', $this->ticketParams);

        curl_multi_add_handle($mh, $ch);

        /**
         * Execute the handles.
         * We're not interested enough in the results of creating tickets
         * to bother blocking the rest of the application for the results.
         */
        do {
            $mrc = curl_multi_exec($mh, $active);
        } while ($mrc == CURLM_CALL_MULTI_PERFORM);
    }

    /**
     * requestAuth
     * We're using an API key, so do not authenticate via username
     *
     * @return null This tells the caller not to attempt any auth connection
     */
    public function requestAuth()
    {
        return null;
    }

    /**
     * receiveAuth
     * No need to receive auth, as we do not request it.
     *
     * @return void
     */
    public function receiveAuth(array $authReply)
    {
    }

    public function setStatus($status = 'draft')
    {
        $this->eventParams['status'] = $status;
    }

    public function setStatusPublic()
    {
        $this->setStatus('live');
    }

    public function setStatusPrivate()
    {
        $this->setStatus('draft');
    }

    /**
     * isCreated
     * Use the eid - if its value is set and non-zero, this event has been made.
     *
     * return bool Has this event been created
     */
    public function isCreated()
    {
        return (bool) $this->eid;
    }

    /**
     * Build the basic curl handle. All common config goes here.
     *
     * @return resource<curl>
     */
    private static function curlIni($method, array $params)
    {
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_URL => self::$apiEndpoint . $method . '?' . http_build_query($params),
            CURLOPT_VERBOSE => true,
            CURLOPT_POST => 1
        ]);
        return $ch;
    }
}
