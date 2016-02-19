/**
 * The generic 'store', which more complex stores are composed from
 */

// Requires
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

const Store = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

export default Store;
