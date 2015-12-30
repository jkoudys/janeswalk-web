import {dispatch, register} from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes} from '../constants/JWConstants.js';

const CHANGE_EVENT = 'change';

const _areas = {};

const AreaStore = Object.assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAreas() {
    return _areas;
  },

  getArea(name) {
    return _areas[name];
  },

  dispatcherIndex: register(function(action) {
    switch (action.type) {
    case ActionTypes.AREA_RECEIVE:
      _areas[action.name] = action.content;
      break;
    }

    AreaStore.emitChange();
  }),

});

export default AreaStore;
