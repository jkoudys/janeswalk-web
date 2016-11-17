/**
 * Walk Builder
 *
 * An 'in-progress' walk being built. Not quite a "walk" yet, so it doesn't go in that store.
 * This is a store for data needed in building it, like updating the map, validating what's set,
 * doing "save the date", etc.
 */

import { register } from 'janeswalk/dispatcher/AppDispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';
import Store from './Store';

let title = '';
let shortDescription = '';
let longDescription = '';
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
// Time slot tuples for when the walk begins + ends
const slots = new Set();
const themes = new Set();
const accessibles = new Set();

const WalkBuilderStore = {
  ...Store,

  getTitle: () => title,

  // Validate the Walk and return any fields a Walk needs.
  getEmptyRequiredFields() {
    const empty = [];
    if (!title.trim()) empty.push('title');
    if (!shortDescription.trim()) empty.push('shortDescription');
    if (!longDescription.trim()) empty.push('longDescription');
    if (slots.length === 0) empty.push('slots');

    return empty;
  },

  // Build our walk in the API schema, usually to serialize as JSON
  getAsSchema() {
    return {
      type: 'FeatureCollection',
      features: [...points, { type: 'Feature', geometry: { type: 'LineString', coordinates: route } }],
      title,
      shortDescription,
      longDescription,
      team,
      published,
      images,
      time: { open, slots },
      themes: [...themes],
      accessibles: [...accessibles],
    };
  },

  dispatchToken: register({
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
      time.slots.forEach(s => slots.add(s));
      if (receivedRoute) receivedRoute.geometry.coordinates.forEach(c => route.add(c));
    },
  }, () => WalkBuilderStore.emitChange()),
};

export default WalkBuilderStore;
