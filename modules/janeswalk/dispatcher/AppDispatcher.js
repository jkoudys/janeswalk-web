import {Dispatcher} from 'flux';

const AppDispatcher = new Dispatcher();
const register = AppDispatcher.register.bind(AppDispatcher);
const dispatch = AppDispatcher.dispatch.bind(AppDispatcher);

export default AppDispatcher;
export {register, dispatch};
