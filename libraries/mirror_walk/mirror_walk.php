<?php
/**
 * Mirror walks from JW to an external event service
 *
 * TODO: switch this to use guzzle promises instead of direct curl
 *
 * PHP Version 5.4
 *
 * @category  Events
 * @package   Janeswalk
 * @author    Joshua Koudys <josh@qaribou.com>
 * @copyright 2014 Jane's Walk
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://janeswalk.org
 */
namespace JanesWalk\Libraries\MirrorWalk;

use \JanesWalk\Models\PageTypes\Walk;
use \JanesWalk\Libraries\MirrorWalk\Eventbrite;

class MirrorWalk
{
    /**
     * Curl requires we match each event to a handler
     * @type [[resource<curl> 'ch', EventInterface 'event']] $handleTuples
     *  Pairs of curl handles and their event
     */
    protected $handleTuples = [],
              $eventServices = [],
              $mh,
              $active,
              $walk;

    /**
     * Instantiate list of event services
     *
     * @param Walk $walk    The Walk model we're mirroring
     * @param bool $publish Whether or not these events should be made public
     */
    public function __construct(Walk $walk, $publish = false)
    {
        $this->walk = $walk;
        $this->mh = \curl_multi_init();

        // TODO: Create config to choose event services to mirror on for which walks
        $eb = new Eventbrite($walk);
        if ($publish) {
            $eb->setStatusPublic(); 
        }
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
     * Launch non-blocking service requests to update the 3rd-party event
     * services. This should be run as early as possible, since processing may
     * continue while these external services are being updated.
     *
     * @return void
     */
    public function mirrorStart()
    {
        /**
         * Loop through configured Event services
         * @type EventInterface $ei 
         */
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
     * Blocking code to wait for the results of the service requests. If not
     * all services have completed, it will wait here until they have or have
     * timed out.
     * @return null
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
            while ($info = curl_multi_info_read($this->mh)) {
                // Check which object the response is for
                foreach ($this->handleTuples as $tuple) {
                    // If curl handlers match, this is the object that made it
                    if ($info['handle'] === $tuple['ch']) {
                        $response = json_decode(
                            curl_multi_getcontent($info['handle']),
                            true
                        );
                        // Process each event response in the order they return
                        $tuple['event']->receiveEvent((array) $response);
                    }
                }
            }
        }
    }
}
