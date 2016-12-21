/**
 * Walk Builder
 *
 * An 'in-progress' walk being built. Not quite a "walk" yet, so it doesn't go in that store.
 * This is a store for data needed in building it, like updating the map, validating what's set,
 * doing "save the date", etc.
 */

import { List } from 'immutable';
import moment from 'moment';
import { register } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';
import Store from './Store';

const defaultPoint = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [-79.412173615033, 43.66431003337],
  },
  properties: {
    title: '',
    description: '',
    media: [],
  },
};

let title = '';
let shortDescription = '';
let longDescription = '';
let accessibleInfo = '';
let accessibleTransit = '';
let accessibleFind = '';
let ward;
// Default walk is 1h long
let duration = 60 * 60 * 1000;
// Has this walk been published?
let published = false;
// Open booking? Available to book at any request
let open = false;
// geojson-standard Points array
// { type: 'Feature', geometry: { type: 'Point', coordinates: [lng, lat] }, properties: { title, description, media } }
let points;
// array of tuples for route points
let route;
// Members of the Walk team
const team = [];
// Walk images
const images = [];
// Times when a walk begins
const times = [];
const themes = new Set();
const accessibles = new Set();

export const memberDefaults = {
  leader: {
    type: 'leader',
    // TODO: load and save this as first-name last-name
    name: '',
    bio: '',
    twitter: '',
    facebook: '',
    website: '',
    email: '',
    phone: '',
  },
  organizer: { type: 'organizer', name: '', email: '', institution: '', website: '' },
  voice: { type: 'voice', name: '', bio: '', twitter: '', facebook: '', website: '' },
  volunteer: { type: 'volunteer', name: '', role: '', website: '' },
};

const WalkBuilderStore = {
  ...Store,

  getAccessibles: () => accessibles,
  getImages: () => images,
  getLongDescripton: () => longDescription,
  getOpen: () => open,
  getPoints: () => points,
  getPublished: () => published,
  getRoute: () => route,
  getShortDescripton: () => shortDescription,
  getTimes: () => times,
  getTeam: () => team,
  getThemes: () => themes,
  getTitle: () => title,
  getWard: () => ward,

  // Validate the Walk and return any fields a Walk needs.
  getEmptyRequiredFields() {
    const empty = [];
    if (!title.trim()) empty.push('Title is empty');
    if (!shortDescription.trim()) empty.push('Short description is empty');
    if (!longDescription.trim()) empty.push('Long description is empty');
    if (times.length === 0) empty.push('No walk date is set');

    return empty;
  },

  // Build our walk in the API schema, usually to serialize as JSON
  getAsSchema: () => ({
    type: 'FeatureCollection',
    features: [...points, { type: 'Feature', geometry: { type: 'LineString', coordinates: route } }],
    title,
    shortDescription,
    longDescription,
    team,
    published,
    images,
    ward,
    time: { open, slots: times.map(time => [time, time + duration]) },
    themes: [...themes],
    accessibles: [...accessibles],
    accessibleInfo,
    accessibleTransit,
    accessibleFind,
  }),

  getWalk: () => ({
    accessibleInfo,
    accessibleTransit,
    accessibleFind,
    accessibles,
    duration,
    images,
    longDescription,
    open,
    points,
    published,
    route,
    shortDescription,
    team,
    themes,
    times,
    title,
    ward,
  }),

  dispatchToken: register({
    [AT.WB_SET_TITLE]: ({ value }) => { title = value; },
    [AT.WB_SET_SHORT_DESCRIPTION]: ({ value }) => { shortDescription = value; },
    [AT.WB_SET_LONG_DESCRIPTION]: ({ value }) => { longDescription = value; },
    [AT.WB_SET_WARD]: ({ value }) => { ward = value; },
    [AT.WB_SET_DURATION]: ({ value }) => { duration = value; },
    // TODO: allow multiple images in a Walk
    [AT.WB_SET_IMAGE]: ({ value }) => {
      const saved = { ...value };
      if (value.response) {
        const { id, url, thumb: { src: thumbUrl } } = value.response;
        Object.assign(saved, { id, url, thumbUrl });
      }
      images[0] = saved;
    },
    [AT.WB_REMOVE_IMAGE]: () => { images.length = 0; },
    [AT.WB_SET_TIME]: ({ value, time = moment() }) => {
      // See if we're editing or adding a new time
      const idx = times.indexOf(time);
      if (idx === -1) {
        times.push(value);
        return;
      }
      if (value) {
        times[idx] = value;
        return;
      }
      // If it's an empty time, remove from array
      times.splice(idx, 1);
    },
    [AT.WB_SET_THEME]: ({ value }) => themes.add(value),
    [AT.WB_REMOVE_THEME]: ({ value }) => themes.delete(value),
    [AT.WB_SET_ACCESSIBLE]: ({ value }) => accessibles.add(value),
    [AT.WB_REMOVE_ACCESSIBLE]: ({ value }) => accessibles.delete(value),
    [AT.WB_SET_ACCESSIBLE_INFO]: ({ value }) => { accessibleInfo = value; },
    [AT.WB_SET_ACCESSIBLE_TRANSIT]: ({ value }) => { accessibleTransit = value; },
    [AT.WB_SET_ACCESSIBLE_FIND]: ({ value }) => { accessibleFind = value; },
    [AT.WB_RECEIVE_WALK]: ({ walk, walk: {
      time = { slots: [] },
      team: newTeam = [],
      features = [],
      title: t = '',
      shortDescription: sd = '',
      longDescription: ld = '',
    } }) => {
      const receivedRoute = features.find(f => f.geometry.type === 'LineString');
      published = walk.published;
      title = t;
      shortDescription = sd;
      longDescription = ld;
      open = time.open;
      team.push(...newTeam);
      points = List(features.filter(f => f.geometry.type === 'Point').map((p) => ({ ...p })));
      if (time.slots.length > 0) {
        duration = time.slots[0][1] - time.slots[0][0];
        times.push(...time.slots.map(s => s[0]));
      }
      if (receivedRoute) receivedRoute.geometry.coordinates.forEach(c => route.add(c));
    },
    [AT.WB_TEAM_UPDATE]: ({ member, props }) => {
      team[team.indexOf(member)] = { ...member, ...props };
    },
    [AT.WB_TEAM_ADD]: ({ props }) => team.push({ ...props }),
    [AT.WB_TEAM_REMOVE]: ({ member }) => team.splice(team.indexOf(member), 1),
    [AT.WB_POINT_ADD]: ({ coordinates }) => {
      points = points.push({
        ...defaultPoint,
        geometry: {
          ...defaultPoint.geometry,
          coordinates,
        },
      });
    },
    [AT.WB_POINT_REMOVE]: ({ point }) => { points = points.splice(points.indexOf(point), 1); },
    [AT.WB_POINT_UPDATE]: ({ point, coordinates, properties }) => {
      const i = points.indexOf(point);
      const newPoint = { ...point };
      if (coordinates) newPoint.geometry.coordinates = coordinates;
      if (properties) Object.assign(newPoint.properties, properties);
      points[i] = newPoint;
    },
    [AT.WB_POINT_INDEX]: ({ point, change }) => {
      const i = points.indexOf(point);
      // Don't let it move the point off the end of the array
      if (i + change < 0 || i + change > points.size) return;
      // Yank it out and put it back in
      points = points.delete(i);
      points = points.insert(i + change, point);
    },
  }, () => WalkBuilderStore.emitChange()),
};

export default WalkBuilderStore;
