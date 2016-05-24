/**
 * Setup the JanesWalk namespace
 */
import EventEmitter from 'events';

/**
 * A deferred event emitter, so events can be queued up
 */
class DeferredEventEmitter extends EventEmitter {
  constructor() {
    super();
    // Is our emitter currently broadcasting events
    this.active = false;
    // If we're not emitting, queue them up here
    this.emits = [];
  }

  /**
   * Emit an event if we're active, or queue it up if we're not
   */
  emit() {
    if (this.active) {
      super.emit.apply(this, arguments);
    } else {
      this.emits.push(arguments);
    }
  }

  /**
   * Activate, and process our queued up events
   */
  activate() {
    let event;
    this.active = true;

    while (event = this.emits.shift()) {
      super.emit.apply(this, event);
    }
  }

  /**
   * Deactivate
   */
  deactivate() {
    this.active = false;
  }
}

window.JanesWalk = Object.assign({}, window.JanesWalk, {event: new DeferredEventEmitter()});
