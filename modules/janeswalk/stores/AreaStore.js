import { register2 } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';
import Store from './Store';

const _areas = {};

const AreaStore = Object.assign({}, Store, {
  getAreas: () => _areas,
  getArea: (name) => _areas[name],

  dispatcherIndex: register2({
    [AT.AREA_RECEIVE]: ({ name, content }) => { _areas[name] = content; },
  }, () => AreaStore.emitChange()),
});

export default AreaStore;
