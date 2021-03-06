/**
 * Walk Builder
 *
 * An 'in-progress' walk being built. Not quite a "walk" yet, so it doesn't go in that store.
 * This is a store for data needed in building it, like updating the map, validating what's set,
 * doing "save the date", etc.
 */

import { List as iList, Set as iSet } from 'immutable';
import moment from 'moment';
import { register } from 'janeswalk/dispatcher';
import { ActionTypes as AT } from 'janeswalk/constants/JWConstants';
import Store from './Store';

const buildPoint = ({ geometry: { coordinates } = {}, properties }) => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: coordinates || [-79.412173615033, 43.66431003337],
  },
  properties: {
    title: '',
    description: '',
    media: [],
    ...properties,
  },
});

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
// Keep a history of points when removed/added, so we can undo
const pointsHistory = [];
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

// Error messages
let error;

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
// FIXME: this would probably be faster with Object.assign/direct prop assignment
// instead of the many spreads.
const getSchema = (props = [
  'accessible',
  'accessibleFind',
  'accessibleInfo',
  'accessibleTransit',
  'duration',
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
      .map(({ id, url, response: { id: rId, url: rUrl } = {} }) => ({ id: id || rId, url: url || rUrl }))
      .filter(({ id }) => !!id);
      return { ...a, images: imgIDs };
    }
    case 'longDescription': return { ...a, longDescription };
    case 'shortDescription': return { ...a, shortDescription };
    case 'team': return { ...a, team };
    case 'themes': return { ...a, themes: [...themes] };
    case 'duration':
    case 'times':
      return { ...a, time: getTimeSchema() };
    case 'title': return { ...a, title };
    case 'ward': return { ...a, wards: ward };
    default: return a;
  }
}, {
  type: 'FeatureCollection',
  id: cID,
});

const WalkBuilderStore = {
  ...Store,

  getAccessibles: () => accessibles,
  getError: () => error,
  getImages: () => images,
  getLongDescripton: () => longDescription,
  getOpen: () => open,
  getPoints: () => points,
  getPointsHistory: () => pointsHistory,
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

  reducer: register(async ({ type, value, ...props }) => {
    switch (type) {
      case AT.WB_SET_TITLE:
        title = value;
        break;

      case AT.WB_SET_SHORT_DESCRIPTION:
        shortDescription = value;
        break;

      case AT.WB_SET_LONG_DESCRIPTION:
        longDescription = value;
        break;

      case AT.WB_SET_WARD:
        ward = value;
        break;

      case AT.WB_SET_DURATION:
        duration = +value;
        break;

      // TODO: allow multiple images in a Walk
      case AT.WB_SET_IMAGE: {
        const saved = { ...value };
        if (value.response) {
          const { id, url, thumb: { src: thumbUrl } } = value.response;
          Object.assign(saved, { id, url, thumbUrl });
        }
        images = images.set(0, saved);
        break;
      }

      case AT.WB_REMOVE_IMAGE:
        images = iList();
        break;

      case AT.WB_SET_TIME: {
        const { time = moment.utc() } = props;
        // See if we're editing or adding a new time
        const idx = times.indexOf(time);
        if (idx === -1) {
          times = times.push(value);
        } else if (value) {
          times = times.set(idx, value);
        } else {
          // If it's an empty time, remove from array
          times = times.delete(idx);
        }
        break;
      }

      case AT.WB_SET_THEME:
        themes = themes.add(value);
        break;

      case AT.WB_REMOVE_THEME:
        themes = themes.delete(value);
        break;

      case AT.WB_SET_ACCESSIBLE:
        accessibles = accessibles.add(value);
        break;

      case AT.WB_REMOVE_ACCESSIBLE:
        accessibles = accessibles.delete(value);
        break;

      case AT.WB_SET_ACCESSIBLE_INFO:
        accessibleInfo = value;
        break;

      case AT.WB_SET_ACCESSIBLE_TRANSIT:
        accessibleTransit = value;
        break;

      case AT.WB_SET_ACCESSIBLE_FIND:
        accessibleFind = value;
        break;

      case AT.WB_ERROR_SET:
        error = value;
        break;

      // Load a Walk API response into the store
      case AT.WB_RECEIVE_WALK: {
        const {
          walk,
          walk: {
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
            images: newImages = [],
            wards = '',
          },
        } = props;
        const receivedRoute = features.find(f => f.geometry.type === 'LineString');
        published = walk.published;
        title = t;
        shortDescription = sd;
        longDescription = ld;
        open = time.open;
        cID = +walkId;
        team = iList(newTeam);
        ward = wards;
        accessibleInfo = newAI;
        accessibleTransit = newAT;
        accessibleFind = newAF;
        // Watch out for this odd historic naming - dropping the s
        accessibles = iSet(newAccessibles);
        themes = iSet(newThemes);
        points = iList(features.filter(f => f.geometry.type === 'Point').map((p) => ({ ...p })));
        images = iList(newImages.map((img, i) => ({ ...img, uid: -1 - i })));

        // Convert 'time slots' [[begin, end]] tuples to start times and durations
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
        break;
      }

      case AT.WB_TEAM_UPDATE: {
        const { member, props: details } = props;
        team = team.set(team.indexOf(member), { ...member, ...details });
        break;
      }

      case AT.WB_TEAM_ADD:
        team = team.push({ ...props.props });
        break;

      case AT.WB_TEAM_REMOVE:
        team = team.delete(team.indexOf(props.member));
        break;

      case AT.WB_POINT_ADD:
        pointsHistory.push(points);
        points = points.push(buildPoint({
          geometry: { coordinates: props.coordinates },
        }));
        break;

      case AT.WB_POINT_REMOVE:
        pointsHistory.push(points);
        points = points.delete(points.indexOf(props.point));
        break;

      case AT.WB_POINT_UPDATE: {
        const { point, coordinates, properties } = props;
        const i = points.indexOf(point);
        const newPoint = { ...point };
        pointsHistory.push(points);
        if (coordinates) Object.assign(newPoint.geometry, { coordinates });
        if (properties) Object.assign(newPoint.properties, properties);
        points = points.set(i, newPoint);
        break;
      }

      case AT.WB_POINT_INDEX: {
        const { point, change } = props;
        const i = points.indexOf(point);
        pointsHistory.push(points);
        // Don't let it move the point off the end of the array
        if (i + change >= 0 && i + change <= points.size) {
          // Yank it out and put it back in
          points = points.delete(i);
          points = points.insert(i + change, point);
        }
        break;
      }

      case AT.WB_POINT_UNDO:
        if (pointsHistory.length) points = pointsHistory.pop();
        break;

      default:
        return;
    }
    WalkBuilderStore.emitChange();
  }),
};

export default WalkBuilderStore;
