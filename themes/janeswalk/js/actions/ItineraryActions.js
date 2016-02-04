import {ActionTypes} from 'janeswalk/constants/JWConstants';
import {dispatch} from 'janeswalk/dispatcher/AppDispatcher';

//TODO: API call before dispatch

export function remove(list, walk) {
  dispatch({type: ActionTypes.ITINERARY_REMOVE_WALK, list, walk});
}

export function add(list, walk) {
  dispatch({type: ActionTypes.ITINERARY_ADD_WALK, list, walk});
}

export function updateTitle(list, title) {
  dispatch({type: ActionTypes.ITINERARY_UPDATE_TITLE, title, list});
}

export function updateDescription(list, description) {
  dispatch({type: ActionTypes.ITINERARY_UPDATE_DESCRIPTION, description, list});
}

export function createList(title, description) {
  dispatch({type: ActionTypes.ITINERARY_CREATE_LIST, title, description});
}

export function receiveAll(itineraries) {
  dispatch({type: ActionTypes.ITINERARY_RECEIVE_ALL, itineraries});
}

export function syncEnd(start) {
  dispatch({type: ActionTypes.ITINERARY_SYNC_END, start});
}
