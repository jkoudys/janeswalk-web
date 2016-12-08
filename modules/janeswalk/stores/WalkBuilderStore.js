/**
 * Walk Builder
 *
 * An 'in-progress' walk being built. Not quite a "walk" yet, so it doesn't go in that store.
 * This is a store for data needed in building it, like updating the map, validating what's set,
 * doing "save the date", etc.
 */

import moment from 'moment';
import { register } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';
import Store from './Store';

let title = '';
let shortDescription = '';
let longDescription = '';
let ward;
// Default walk is 1h long
let duration = 60 * 60 * 1000;
// Has this walk been published?
let published = false;
// Open booking? Available to book at any request
let open = false;
// geojson-standard Points array
// { type: 'Feature', geometry: { type: 'Point', coordinates: [lat, lng] }, properties: { title, description, media } }
// We use sets for the route builder, so we can easily remove markers
const points = new Set();
// array of tuples for route points
const route = new Set();
// Members of the Walk team
const team = [];
// Walk images
const images = [];
// Times when a walk begins
const times = [];
const themes = new Set();
const accessibles = new Set();

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
  }),

  getWalk: () => ({
    title,
    shortDescription,
    longDescription,
    team,
    published,
    images,
    open,
    times,
    duration,
    themes,
    accessibles,
    ward,
  }),

  dispatchToken: register({
    [AT.WB_SET_TITLE]: ({ value }) => { title = value; },
    [AT.WB_SET_SHORT_DESCRIPTION]: ({ value }) => { shortDescription = value; },
    [AT.WB_SET_LONG_DESCRIPTION]: ({ value }) => { longDescription = value; },
    [AT.WB_SET_WARD]: ({ value }) => { ward = value; },
    // TODO: allow multiple images in a Walk
    [AT.WB_SET_IMAGE]: ({ value }) => {
      const saved = { ...value };
      if (value.response) {
        const { id, url, thumb: { src: thumbUrl } } = value.response;
        Object.assign(saved, { id, url, thumbUrl });
      }
      images[0] = saved;
    },
    [AT.WB_SET_TIME]: ({ value, time = moment() }) => {
      // See if we're editing or adding a new time
      let idx = times.indexOf(time);
      if (idx === -1) {
        times.push(time);
        return;
      }
      times[idx] = value;
    },
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
      features.filter(f => f.geometry.type === 'Point').forEach(p => points.add(p));
      if (time.slots.length > 0) {
        duration = time.slots[0][1] - time.slots[0][0];
        times.push(...time.slots.map(s => s[0]));
      }
      if (receivedRoute) receivedRoute.geometry.coordinates.forEach(c => route.add(c));
    },
  }, () => WalkBuilderStore.emitChange()),
};

export default WalkBuilderStore;
