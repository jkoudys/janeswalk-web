import {Dispatcher} from 'flux';

const AppDispatcher = new Dispatcher();
const dispatch = AppDispatcher.dispatch.bind(AppDispatcher);
const register = AppDispatcher.register.bind(AppDispatcher);
const waitFor = AppDispatcher.waitFor.bind(AppDispatcher);

function register2(receivers, onComplete) {
  return AppDispatcher.register(payload => {
    if (payload.type in receivers) {
      receivers[payload.type](payload);
      if (onComplete) onComplete(payload);
    }
  });
}

export default AppDispatcher;
export {register, register2, dispatch, waitFor};
