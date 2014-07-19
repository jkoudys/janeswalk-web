<?php
namespace JanesWalk\Libraries\MirrorWalk;

/**
 * EventInterface
 * Defines the basic methods required for mirroring walk events created on
 * janeswalk.org to other services.
 * Mirroring should be run asynchronously, as depending on configuration one
 * walk could potentially be mirrored to multiple sites, so the savings from
 * async processing can easily reach the 5+ seconds range. EventInterface
 * based classes should essentially just build resource<curl>s to send back,
 * so they can be run as the needs of the site require (sync or async.)
 */
interface EventInterface
{

    /**
     * Load a Walk model into a data structure used by the 3rd-party service.
     * Must be run before an event may be created/updated. This is a good one
     * to run from __construct()
     *
     * @param Walk $walk    A loaded Jane's Walk
     * @return void
     */
    public function loadWalk(Walk $walk);

    /**
     * Create a new event via service call.
     *
     * @return resource<curl> Connection handle for call
     */
    public function createEvent();

    /**
     * Call service to update an existing event.
     *
     * @return resource<curl> Connection handle for call
     */
    public function updateEvent();

    /**
     * Set the event's status.
     * 
     * @param string $status  The status of the event. Should default to a 
     *                        non-public status, so events are only public when
     *                        explicitly defined.
     * @return void
     */
    public function setStatus($status);

    /**
     * Set the event to public. Typically a wrapper for setStatus
     *
     * @return void
     */
    public function setStatusPublic();

    /**
     * Set the event to private. Typically a wrapper for setStatus
     *
     * @return void
     */
    public function setStatusPrivate();

    /**
     * Checks if this is an event that already exists, or one that has not yet
     * been mirrored.
     *
     * @return bool
     */
    public function isCreated();
}

