import { EventEmitter } from 'events';
import {ActionsTypes} from '../../../constants/JWConstants';
import {dashboard} from './DashboardStaticData';

//TODO: If below is received via JW.emit, need to have a Action.RECEIVE_DATA event to store data in Store.js
const {city, walks, resources, blog, impact} = dashboard;
const {walks: cityWalks, filters} = city;

let filteredWalks = [];
let activeLeaders = [];

const generateWalkLeaders = (walks) => {
  let walkLeaders = [];
  walks.forEach(w => {
    if (w.team && w.team.length > 0) {
      w.team.forEach(m => {
        const role = m.role ? m.role.toLowerCase() : '';
        if (role.includes('leader') || role.includes('organizer')) {
          let leaderExists = walkLeaders.findIndex(l => l.firstName === m['name-first'] && l.lastName === m['name-last']);
          if (leaderExists !== -1) walkLeaders[leaderExists].walks.push(w);
          else walkLeaders.push({firstName: m['name-first'], lastName: m['name-last'], walks: [w], email: m['email']});
        }
      });
    }
  });
  return walkLeaders;
};

const _walkLeaders = generateWalkLeaders(walks);

const menuItems = [ { display: `${city.name} Walks`, link: '/cityWalks', active: false, componentName: 'Walks', activeFilters: {}, filterByDate: 'all', filteredWalks: cityWalks},
  { display:'My Walks', link: '/userWalks', active: false, componentName: 'Walks', activeFilters: {}, filterByDate: 'all', filteredWalks: walks},
  { display:'Walk Leaders and Volunteers', link: '/walkLeaders', active: false, componentName: 'WalkLeaders', filterByDate: 'all', activeLeaders: _walkLeaders, sortBy: null},
  { display:'My Blog Posts', link: '/posts', active: false, componentName: 'MyBlogPosts'},
  //TODO: Complete with Data
  //{ display:'Impact Report Builder', link: '/impact', active: false, componentName: 'ImpactReport'},
  { display:'Resources', link: 'resources', active: false, componentName: 'DashboardResources'},
];

const CHANGE_EVENT = 'change';

// location is the link, and item being the specific piece of data: activeFilters, filterByDate, filteredWalks
const _getData = (location, item) => menuItems.find(i => i.link === location)[item];
const _setData = (location, item, data) => { menuItems.find(i => i.link === location)[item] = data };

const _firstWalkYear = (year, walks) => {
  return walks.reduce((firstYear,walk)=>{
    const walkYear = new Date((walk.time.slots[0][0])*1000).getFullYear();
    return walkYear < year ? walkYear : year;
  }, year);
};

const _walkLeadersPerYear = (year, walkLeaders) => {
  return walkLeaders.reduce((sum, walkLeader)=>{
    const ledWalkThisYear = walkLeader.walks.find(w => new Date(JSON.parse(w.time.slots[0][0]) * 1000).getFullYear() === year);
    return ledWalkThisYear ? sum + 1 : sum;
  }, 0);
};

const _walksPerYear = (year, walks) => {
  return walks.reduce((sum, walk)=>{
    const walkThisYear = new Date((walk.time.slots[0][0]) * 1000).getFullYear() === year;
    return walkThisYear ? sum + 1 : sum;
  }, 0);
};

const _generateRegionSummary = (walks) => {
  const year = (new Date()).getFullYear();
  return {
    year,
    walkLeaders: _walkLeadersPerYear(year, _walkLeaders),
    walks: _walksPerYear(year, walks),
    //TODO: This information is not available
    participants: 111,
    originalYear: _firstWalkYear(year, walks),
    totalWalkLeaders: _walkLeaders.length,
    totalWalks: walks.length,
    name: city.name,
  };
};

const _regionSummary = _generateRegionSummary(walks);

const _retrieveWalks = (location) => {
  if (location === '/cityWalks') return cityWalks;
  if (location === '/userWalks') return walks;
};

//TODO Could you make Filter by Region an `or` filter instead of an `and` filter
const _filterWalks = ({location}) => {
  let allWalks = _retrieveWalks(location);

  const filters = _getData(location, 'activeFilters');
  const filterByDate = _getData(location, 'filterByDate');

  //grab all filters whose state:true
  const filtersArray = Object.keys(filters).reduce((array, key) => array.concat(filters[key].filter(f => f.state)), []);

  if (!filtersArray.length) filteredWalks = allWalks;
  else {
    filteredWalks = allWalks.filter(walk => {
      return filtersArray.reduce((bool, {filter})=> {
        //TODO: Assumed wards is a single string
        const ward = walk.wards ? walk.wards.indexOf(filter) !== -1 : false;
        const theme = walk.checkboxes ? Object.keys(walk.checkboxes).indexOf('theme-' + filter) !== -1 : false;
        const accessibility = walk.checkboxes ? Object.keys(walk.checkboxes).indexOf('accessible-' + filter) !== -1 : false;

        return (bool && (ward || theme || accessibility));
      }, true);
    });
  }

  if (!filterByDate.length || filterByDate === 'all') {
    //do nothing, move to _setData below
  } else {
    filteredWalks = filteredWalks.filter(walk => {
      const currentDate = Date.now();
      if (filterByDate === 'past')  return walk.time.slots[0][0] * 1000 <= currentDate;
      else if (filterByDate === 'future') return walk.time.slots[0][0] * 1000 >= currentDate;
    });
  }

  _setData(location, 'filteredWalks', filteredWalks);
};

//TODO: (Post-PR) Create a common filter and list Component

const _filterWalkLeaders = ({location}) => {

  const filterByDate = _getData(location, 'filterByDate');

  if (!filterByDate.length || filterByDate === 'all') activeLeaders = _walkLeaders;
  else {
    activeLeaders = _walkLeaders.filter(leader => {
      const currentDate = Date.now();
      if (filterByDate === 'past') {
        return leader.walks.reduce((p, walk) => {
          if (p) return p;
          return walk.time.slots[0][0] * 1000 <= currentDate;
        }, false);
      }
      if (filterByDate === 'future') {
        return leader.walks.reduce((p, walk) => {
          if (p) return p;
          return walk.time.slots[0][0] * 1000 >= currentDate;
        }, false);
      }
      return true; //filterByDate === 'all'
    });
  }

  _setData(location, 'activeLeaders', activeLeaders);
};

const _sortWalkLeaders = ({sortSelected, location}) => {

  let sortBy = _getData(location, 'sortBy');
  let activeLeaders = _getData(location, 'activeLeaders');

  if (sortBy === sortSelected) {
    sortSelected = null;
    activeLeaders = _walkLeaders.slice();
  }
  else if (sortSelected === 'alpha') {
    activeLeaders.sort((pLeader, cLeader)=>{
      return pLeader.firstName > cLeader.firstName;
    });
  }
  else { //'count'
    activeLeaders.sort((pLeader, cLeader)=>{
      return pLeader.walks.length < cLeader.walks.length;
    });
  }

  _setData(location, 'activeLeaders', activeLeaders);
  _setData(location, 'sortBy', sortSelected);
};

const _toggleWalkFilter = ({filter, filterName, location}) => {
  let activeFilters = _getData(location, 'activeFilters');
  let activeFilterIndex = -1;

  if (activeFilters[filterName]) {
    activeFilterIndex = activeFilters[filterName].findIndex(f => f.filter === filter);
  } else {
    activeFilters[filterName] = [];
  }

  if (activeFilterIndex === -1) {
    let display = filters[filterName].data[filter];
    activeFilters[filterName].push({filter, display, state: true});
  } else {
    let filter = activeFilters[filterName][activeFilterIndex];
    filter.state = !filter.state;
  }
};

const _removeWalkFilter = ({filter, filterName, location}) => {
  let activeFilters = _getData(location, 'activeFilters');
  let activeFilterIndex = -1;

  if (activeFilters[filterName]) {
    activeFilterIndex = activeFilters[filterName].findIndex(f => f.filter === filter);
  }

  if (activeFilterIndex !== -1) activeFilters[filterName].splice(activeFilterIndex, 1);
};

//TODO: To be done server side, not client side: I think there is an issue with the `export spreadsheet` feature—the csv only includes walk titles
const _generateCSV = () => {
  //TODO: Configuration (what to export) + Complete Functionality
  return encodeURI("data:text/csv;charset=utf-8,Title \n" + (filteredWalks.map(w => (`\"${w.title} \"`))).join('\n'));
};

const DashboardStore = Object.assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCityData() {
    return city;
  },

  getFilters() {
    return filters;
  },

  getActiveFilters(location) {
    return _getData(location, 'activeFilters');
  },

  getDateFilter(location) {
    return _getData(location, 'filterByDate');
  },

  getSortBy(location) {
    return _getData(location, 'sortBy');
  },

  generateCSV() {
    return _generateCSV();
  },

  getWalks(location) {
    return _getData(location, 'filteredWalks');
  },

  getWalkLeadersAndVolunteers(location) {
    return _getData(location, 'activeLeaders');
  },

  getResources() {
    return resources;
  },

  getMyBlogPosts() {
    return blog;
  },

  getLatestPost() {
    return {post: blog[0]};
  },

  getRegionSummary() {
    return _regionSummary;
  },

  getMenuItems() {
    return menuItems;
  },

  dispatcherIndex: register(function(action) {
    switch (action.type) {
      case ActionsTypes.TOGGLE_WALK_FILTER:
        _toggleWalkFilter(action);
        _filterWalks(action);
        break;
      case ActionsTypes.REMOVE_WALK_FILTER:
        _removeWalkFilter(action);
        _filterWalks(action);
        break;
      case ActionsTypes.FILTER_WALKS_BY_DATE:
        _setData(action.location, 'filterByDate', action.filter);
        _filterWalks(action);
        break;
      case ActionsTypes.FILTER_LEADERS_BY_DATE:
        _setData(action.location, 'filterByDate', action.filter);
        _filterWalkLeaders(action);
        break;
      case ActionsTypes.SORT_LEADERS:
        _sortWalkLeaders(action);
        break;
      case ActionsTypes.TOGGLE_MENU:
        let menuItem = menuItems.find(i => i.display === action.item);
        menuItem.active = !menuItem.active;
    }

    DashboardStore.emitChange();
  }),
});

export default DashboardStore;