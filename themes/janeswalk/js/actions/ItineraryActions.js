import {ActionTypes} from 'janeswalk/constants/JWConstants';
import {dispatch} from 'janeswalk/dispatcher/AppDispatcher';

//TODO: API call before dispatch

export function remove(id, listId) {
  dispatch({type: ActionTypes.ITINERARY_REMOVE_WALK, id, listId});
}

export function add(id, listId) {
  dispatch({type: ActionTypes.ITINERARY_ADD_WALK, id, listId});
}

export function updateTitle(title) {
  dispatch({type: ActionTypes.ITINERARY_UPDATE_TITLE, title});
}

export function updateDescription(description) {
  dispatch({type: ActionTypes.ITINERARY_UPDATE_DESCRIPTION, description});
}

export function viewList(title) {
  dispatch({type: ActionTypes.ITINERARY_VIEW_LIST, title});
}

export function createList(title, id, walk) {
  dispatch({type: ActionTypes.ITINERARY_CREATE_LIST, id, title, walk});
}

export function walkSelected(id) {
  dispatch({type: ActionTypes.ITINERARY_WALK_SELECTED, id});
}
