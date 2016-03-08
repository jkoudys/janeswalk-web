import {dispatch, register2} from 'janeswalk/dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import {ActionTypes as AT} from 'janeswalk/constants/JWConstants';
import {changeMethods} from 'janeswalk/utils/Stores';

const _areas = {};

const AreaStore = Object.assign({}, EventEmitter.prototype, changeMethods, {
  getAreas: () => _areas,
  getArea: (name) => _areas[name],

  dispatcherIndex: register2({
    [AT.AREA_RECEIVE]: ({name, content}) => _areas[name] = content
  }, () => AreaStore.emitChange())
});

export default AreaStore;
