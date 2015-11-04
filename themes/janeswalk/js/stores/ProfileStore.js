import ImpactReport from '../components/profile/ImpactReport.jsx';
import RemoveSelfAsCO from '../components/profile/RemoveSelfAsCO.jsx';

/**
 * Events-based first-pass of simple store
 * Receive events with data, to render React components from
 * TODO: migrate completely to this and drop old mixed html/jQuery use
 * TODO: move out the render binding into the router
 */
const dtfDate = new Intl.DateTimeFormat(undefined, {year: 'numeric', month: 'long', timeZone: 'UTC'});

// Normalized data describing city and walks
let _walks = [];
let _details = {};
let _dates = [];
let _leaders = {};
let _city = {};

function receiveCity(city) {
  // Load the stores
  // Normalize our data for impact reports
  city.walks.forEach(walk => {
    const details = Object.assign({}, walk);
    delete details.id;
    delete details.slots;
    _walks.push(walk.id);
    _details[walk.id] = details;
    if ('slots' in walk.time) {
      _dates = _dates.concat(walk.time.slots.map(slot => Object.assign({}, {range: slot}, {walkId: walk.id})));
    }
    // Sort our dates by the start time
    _dates.sort((a, b) => a.range[0] - b.range[0]);

    // Normalize the members indexed by email, then names if unavailable
    walk.team.forEach(member => {
      let type = '';
      let walkIds = [];
      if ('role' in member) {
        type = member.role;
      } else if ('type' in member) {
        type = member.type;
      }
      // Check if this is a leader. Co-walk leaders count *deprecated concept
      if (type.indexOf('leader') > -1) {
        let name;
        let walkIds = [];
        // Assume walk leaders with same email are same person; if no email, use name
        if (member.email) {
          name = member.email;
        } else {
          name = member['name-first'] + member['name-last'];
        }
        name = name.toLowerCase();
        // Track an array of all the walks this member was on
        if (_leaders[name]) {
           walkIds = _leaders[name]['walkIds'];
        }
        walkIds.push(walk.id);
        _leaders[name.toLowerCase()] = Object.assign({}, member, {walkIds: walkIds});
      }
    });
  });
  _city = city;
  delete _city.walks;
}

// TODO: Move these tou a router class
JanesWalk.event.on('profile.receive', function({city}) {
  receiveCity(city);

  React.render(<ImpactReport startDate={dtfDate.format(_dates[0]['range'][0] * 1000)} city={_city} walks={_walks} details={_details} dates={_dates} leaders={_leaders} />, document.getElementById('impactBlock'));
});

JanesWalk.event.on('profile.co.receive', function({cID}) {
  React.render(<RemoveSelfAsCO city={cID} />, document.getElementById('remove-co'));
});
