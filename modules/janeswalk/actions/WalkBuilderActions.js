/**
 * Walk Builder
 *
 * Actions for building a new/editing an old Walk.
 */
import moment from 'moment';
import { dispatch } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';

// Load the walk builder from the full object
export function receiveWalk(walk) {
  dispatch({ type: AT.WB_RECEIVE_WALK, walk });
}

export function setTitle(value) {
  dispatch({ type: AT.WB_SET_TITLE, value });
}

export function setLongDescription(value) {
  dispatch({ type: AT.WB_SET_LONG_DESCRIPTION, value });
}

export function setShortDescription(value) {
  dispatch({ type: AT.WB_SET_SHORT_DESCRIPTION, value });
}

export function setAccessibleInfo(value) {
  dispatch({ type: AT.WB_SET_ACCESSIBLE_INFO, value });
}

export function setAccessibleTransit(value) {
  dispatch({ type: AT.WB_SET_ACCESSIBLE_TRANSIT, value });
}

export function setAccessibleFind(value) {
  dispatch({ type: AT.WB_SET_ACCESSIBLE_FIND, value });
}

export function setTime(value, time) {
  if (moment.isMoment(value)) {
    // Round to nearest 30 minutes before creating action
    value.minute(value.minute() + 30 - (value.minute() % 30));
    value.second(0);
  }
  dispatch({ type: AT.WB_SET_TIME, value, time });
}

export function setImage(value) {
  dispatch({ type: AT.WB_SET_IMAGE, value });
}

export function removeImage() {
  dispatch({ type: AT.WB_REMOVE_IMAGE });
}

export function setTheme(value) {
  dispatch({ type: AT.WB_SET_THEME, value });
}

export function removeTheme(value) {
  dispatch({ type: AT.WB_REMOVE_THEME, value });
}

export function setAccessible(value) {
  dispatch({ type: AT.WB_SET_ACCESSIBLE, value });
}

export function removeAccessible(value) {
  dispatch({ type: AT.WB_REMOVE_ACCESSIBLE, value });
}

export function setDuration(value) {
  dispatch({ type: AT.WB_SET_DURATION, value });
}

export function updateMember(member, props) {
  dispatch({ type: AT.WB_TEAM_UPDATE, member, props });
}

export function removeMember(member) {
  dispatch({ type: AT.WB_TEAM_REMOVE, member });
}

export function addMember(props) {
  dispatch({ type: AT.WB_TEAM_ADD, props });
}

export function updatePoint(point, { properties, coordinates }) {
  dispatch({ type: AT.WB_POINT_UPDATE, point, properties, coordinates });
}

export function removePoint(point) {
  dispatch({ type: AT.WB_POINT_REMOVE, point });
}

export function addPoint(coordinates) {
  dispatch({ type: AT.WB_POINT_ADD, coordinates });
}

export function setPointIndex(point, { change }) {
  dispatch({ type: AT.WB_POINT_INDEX, change });
}
