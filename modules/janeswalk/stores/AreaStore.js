import { register } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';
import Store from './Store';

const _areas = {};

const AreaStore = {
  ...Store,
  getAreas: () => _areas,
  getArea: (name) => _areas[name],

  dispatcherIndex: register({
    [AT.AREA_RECEIVE]: ({ name, content }) => { _areas[name] = content; },
  }, () => AreaStore.emitChange()),
};

export default AreaStore;
