<?php
namespace JanesWalk\Libraries\MirrorWalk;

use \Exception;
use \JanesWalk\Libraries\WalkSync\EventInterface;
use \JanesWalk\Models\PageTypes\Walk;

class Eventbrite implements EventInterface {
    /**
     *  @type int $eid The EventBrite ID, used to identify event + build URLs
     *  @type string[] $eventParams The various parameters taken by the EB API
     *  @type string[] $ticketParams Parameters taken by the EB ticket endpoint
     */
    protected $eid;
              $eventParams,
              $ticketParams;

    public function __construct(Walk $walk = null)
    {
        // EB Constants set in config/site.php
        $this->ebHandle = new Eventbrite([
            'app_key' => EVENTBRITE_APP_KEY,
            'user_key' => EVENTBRITE_USER_KEY 
        ]);

        // Set EB ticket defaults upfront
        $ticketParams = [
            // Jane's Walks are always free
            'price' => '0.00',
            'min' => '1',
            'max' => '20',
            'quantity_available' => '250',
            // Default ticket availability start to today
            'start_date' => date('Y-m-d H:i:s', time())
        ];

        // Walk may be loaded after construction
        if ($walk) {
            $this->loadWalk($walk);
        }
    }

    public function loadWalk(Walk $walk)
    {
        $this->eid = $walk->getPage()->getAttribute('eventbrite');
        $this->eventParams = [
            'id' => $this->eid,
            'privacy' => '1',
            'confirmation_page' => 'http://janeswalk.org/donate',
            'title' => (string) $walk,
            'description' => $walk->longdescription,
            'end_date' => date('Y-m-d H:i:s', time() + (365 * 24 * 60 * 60)),
            'status' => 'draft',
            'timezone' => $walk->timezone
        ];

        // Load the available time slots
        $slots = (array) $walk->time['slots'];
        if ($scheduled['open']) {
            $this->eventParams['start_date'] = date('Y-m-d', time());
            $this->eventParams['end_date'] = date('Y-m-d', time());
            $this->eventParams['repeats'] = 'yes';
        } elseif (isset($slots[0]['date'])) {
            // Until 'repeats' is working by eb, just assume the next available date is the one that's open to book
            $this->eventParams['start_date'] = $slots[0]['eb_start'];
            $this->eventParams['end_date'] = $slots[0]['eb_end'];
        }
    }

    public function createEvent()
    {
        try {
            $response = $eb_client->event_new($this->eventParams);
            $this->ticketParams['event_id'] = $response->process->id;
            $c->setAttribute("eventbrite", $response->process->id);
        } catch (Exception $e) {
            // application-specific error handling goes here
            $response = $e->error;
            Log::addEntry("EventBrite Error creating new event for cID={$c->getCollectionID()}: {$e->getMessage()}");
        }
        $this->ticketParams['end_date'] = $this->eventParams['end_date'];
        foreach ($slots as $walkDate) {
            $this->ticketParams['name'] = $walkDate['date'] . ' Walk';
            try {
                $response = $eb_client->ticket_new($this->ticketParams);
            } catch (Exception $e) {
                $response = $e->error;
                Log::addEntry("EventBrite Error updating ticket for cID={$c->getCollectionID()}: {$e->getMessage()}");
            }
        }
    }

    public function updateEvent()
    {
        try {
            $this->eventParams['id'] = $eid;
            $this->ticketParams['event_id'] = $eid;
            $response = $eb_client->event_update($this->eventParams);
        } catch (Exception $e) {
            $response = $e->error;
            Log::addEntry("EventBrite Error updating event for cID={$c->getCollectionID()}: {$e->getMessage()}");
        }
    }

    public function setStatus($status = 'draft')
    {
        $this->eventParams['status'] = $status;
    }

    public function setStatusPublic() {
        $this->setStatus('public');
    }

    public function setStatusPrivate() {
        $this->setStatus('draft');
    }

    public function isCreated()
    {
        return isset($this->eid);
    }
}

