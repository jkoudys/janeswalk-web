<?php
namespace \JanesWalk\Libraries\MirrorWalk;

use \JanesWalk\Models\PageTypes\Walk;
use \JanesWalk\Libraries\MirrorWalk\Eventbrite;

require_once 'Eventbrite.php';

class MirrorWalk
{
    /**
     * @type [[resource<curl> 'ch', EventInterface 'event']] $handleTuples Pairs of curl handles and their event
     */
    protected $handleTuples = [],
              $eventServices = [],
              $mh,
              $active,
              $walk;

    /**
     * Instantiate list of event services
     *
     * @param Walk $walk The Walk model we're mirroring
     * @param bool $publish Whether or not these events should be made public
     */
    public function __construct(Walk $walk, $publish = false)
    {
        $this->walk = $walk;
        $this->mh = curl_multi_init();

        // TODO: Create config to pick + choose which event services to mirror on for which walks
        $eb = new Eventbrite($walk);
        if ($publish) $eb->setStatusPublic();
        $this->eventServices = [
            $eb
        ];
    }

    /**
     * Close out connections when done.
     */
    public function __destruct()
    {
        curl_multi_close($this->mh);
    }

    /**
     * mirrorStart
     * Launch non-blocking service requests to update the 3rd-party event
     * services. This should be run as early as possible, since processing may
     * continue while these external services are being updated.
     *
     * @return void
     */
    public function mirrorStart()
    {
        /** @type EventInterface $ei */
        foreach ($this->eventServices as $ei) {
            if ($ei->isCreated()) {
                curl_multi_add_handle($this->mh, $ei->requestUpdateEvent());
            } else {
                $ch = $ei->requestCreateEvent();
                $this->handleTuples[] = [
                    'ch' => $ch,
                    'event' => $ei
                ];
                curl_multi_add_handle($this->mh, $ch);
            }
        }

        // Start service requests as non-blocking
        do {
            $mrc = curl_multi_exec($this->mh, $this->active);
        } while ($mrc === CURLM_CALL_MULTI_PERFORM);
    }

    /**
     * mirrorEnd
     * Blocking code to wait for the results of the service requests. If not
     * all services have completed, it will wait here until they have or have
     * timed out.
     */
    public function mirrorEnd()
    {
        $mrc = CURLM_OK;
        while (
            count($this->handleTuples) && 
            $this->active &&
            $mrc === CURLM_OK
        ) {
            curl_multi_select($this->mh);
            do {
                $mrc = curl_multi_exec($this->mh, $this->active);
            } while ($mrc === CURLM_CALL_MULTI_PERFORM);

            // Block until a service responds
            while ($info = curl_multi_info_read($mh)) {
                // Check which object the response is for
                foreach ($this->handleTuples as $tuple) {
                    // If curl handlers match, this is the object that made it
                    if ($info['handle'] === $tuple['ch']) {
                        $response = json_decode(
                            curl_multi_getcontent($info['handle']),
                            true
                        );
                        // Process each event response in the order they return
                        $tuple['ei']->receiveEvent($response);
                    }
                }
            }
        }
    }
}
