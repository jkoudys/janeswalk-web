/**
 * Walk Builder
 *
 * An 'in-progress' walk being built. Not quite a "walk" yet, so it doesn't go in that store.
 * This is a store for data needed in building it, like updating the map, validating what's set,
 * doing "save the date", etc.
 */

import { List as iList, Set as iSet } from 'immutable';
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
// Collection ID, for saving
let cID;
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
let route = iList();
// Members of the Walk team
let team = iList();
// Walk images
let images = iList();
// Times when a walk begins
let times = iList();
let themes = iSet();
let accessibles = iSet();

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

function getFeatures() {
  return [...points, {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: route,
    },
  }];
}

// Get as the full schema - slots with start and end times, if it's open or not, etc.
function getTimeSchema() {
  return {
    open: false,
    type: '',
    slots: times.map(time => [
      (time.valueOf() / 1000) + (time.utcOffset() * 60),
      ((time.valueOf() + duration) / 1000) + (time.utcOffset() * 60),
    ]),
  };
}

// Take an array of props we want to build a schema from, and return
// only those. Used mainly so we don't have to re-save the entire Walk
// on every single update.
const getSchema = (props = [
  'accessible',
  'accessibleFind',
  'accessibleInfo',
  'accessibleTransit',
  'features',
  'points',
  'route',
  'images',
  'longDescription',
  'shortDescription',
  'team',
  'themes',
  'times',
  'title',
  'ward',
]) => props.reduce((a, e) => {
  switch (e) {
    case 'accessibles': return { ...a, accessibles: [...accessibles] };
    case 'accessibleFind': return { ...a, accessibleFind };
    case 'accessibleInfo': return { ...a, accessibleInfo };
    case 'accessibleTransit': return { ...a, accessibleTransit };
    case 'features':
    case 'points':
    case 'route':
      return { ...a, features: getFeatures() };
    case 'images': {
      // Get the IDs from the image
      const imgIDs = images
      .map(({ response: { id } = {} }) => ({ id }))
      .filter(({ id }) => !!id);
      if (imgIDs.length) {
        return { ...a, images: imgIDs };
      }
      return a;
    }
    case 'longDescription': return { ...a, longDescription };
    case 'shortDescription': return { ...a, shortDescription };
    case 'team': return { ...a, team };
    case 'themes': return { ...a, themes: [...themes] };
    case 'times': return { ...a, time: getTimeSchema() };
    case 'title': return { ...a, [e]: title };
    case 'ward': return { ...a, ward };
    default: return a;
  }
}, {
  type: 'FeatureCollection',
  id: cID,
});

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
  getFeatures,
  getTimeSchema,
  getSchema,

  // Validate the Walk and return any fields a Walk needs.
  getEmptyRequiredFields() {
    const empty = [];
    if (!title.trim()) empty.push('Title is empty');
    if (!shortDescription.trim()) empty.push('Short description is empty');
    if (!longDescription.trim()) empty.push('Long description is empty');
    if (times.size === 0) empty.push('No walk date is set');

    return empty;
  },

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
    cID,
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
      images = images.set(0, saved);
    },
    [AT.WB_REMOVE_IMAGE]: () => { images.size = 0; },
    [AT.WB_SET_TIME]: ({ value, time = moment.utc() }) => {
      // See if we're editing or adding a new time
      const idx = times.indexOf(time);
      if (idx === -1) {
        times = times.push(value);
        return;
      }
      if (value) {
        times = times.set(idx, value);
        return;
      }
      // If it's an empty time, remove from array
      times = times.delete(idx);
    },
    [AT.WB_SET_THEME]: ({ value }) => { themes = themes.add(value); },
    [AT.WB_REMOVE_THEME]: ({ value }) => { themes = themes.delete(value); },
    [AT.WB_SET_ACCESSIBLE]: ({ value }) => { accessibles = accessibles.add(value); },
    [AT.WB_REMOVE_ACCESSIBLE]: ({ value }) => { accessibles = accessibles.delete(value); },
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
      id: walkId,
      accessibleInfo: newAI,
      accessibleTransit: newAT,
      accessibleFind: newAF,
      themes: newThemes,
      accessibles: newAccessibles,
    } }) => {
      const receivedRoute = features.find(f => f.geometry.type === 'LineString');
      published = walk.published;
      title = t;
      shortDescription = sd;
      longDescription = ld;
      open = time.open;
      cID = +walkId;
      team = iList(newTeam);
      accessibleInfo = newAI;
      accessibleTransit = newAT;
      accessibleFind = newAF;
      // Watch out for this odd historic naming - dropping the s
      accessibles = iSet(newAccessibles);
      themes = iSet(newThemes);
      points = iList(features.filter(f => f.geometry.type === 'Point').map((p) => ({ ...p })));
      if (time.slots.length > 0) {
        // Times come in in seconds, not milliseconds
        // TODO: migrate this server-side to favour the JavaScript, not PHP, conventions
        duration = (time.slots[0][1] - time.slots[0][0]) * 1000;
        times = iList(time.slots.map(([start]) => moment.utc(+start * 1000)));
      }
      if (receivedRoute) {
        const { geometry: { coordinates = [] } = {} } = receivedRoute;
        route = route.push(...coordinates);
      }
    },
    [AT.WB_TEAM_UPDATE]: ({ member, props }) => {
      team = team.set(team.indexOf(member), { ...member, ...props });
    },
    [AT.WB_TEAM_ADD]: ({ props }) => { team = team.push({ ...props }); },
    [AT.WB_TEAM_REMOVE]: ({ member }) => { team = team.delete(team.indexOf(member)); },
    [AT.WB_POINT_ADD]: ({ coordinates }) => {
      points = points.push({
        ...defaultPoint,
        geometry: {
          ...defaultPoint.geometry,
          coordinates,
        },
      });
    },
    [AT.WB_POINT_REMOVE]: ({ point }) => { points = points.delete(points.indexOf(point)); },
    [AT.WB_POINT_UPDATE]: ({ point, coordinates, properties }) => {
      const i = points.indexOf(point);
      const newPoint = { ...point };
      if (coordinates) newPoint.geometry.coordinates = coordinates;
      if (properties) Object.assign(newPoint.properties, properties);
      points = points.set(i, newPoint);
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
