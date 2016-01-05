import { EventEmitter } from 'events';
import {ActionsTypes} from '../../../constants/JWConstants';
import {dashboard} from './DashboardStaticData';

const {city, walks, resources, blog, impact} = dashboard;
const {walks: cityWalks, filters} = city;
let filteredWalks = [];
let activeLeaders = [];
let activeFilters = [];
let filterByDate = 'all';
let currentRoute = null;
let sortBy = null;

const menuItems = [ { display: `${city.name} Walks`, link: '/cityWalks'},
  { display:'Walks', link: '/userWalks'},
  { display:'Walk Leaders and Volunteers', link: '/walkLeaders'},
  { display:'My Blog Posts', link: '/posts'},
  //{ display:'Impact Report Builder', link: '/impact'}, //TODO: Complete with Data
  { display:'Resources', link: 'resources'},
];

const CHANGE_EVENT = 'change';

const _firstWalkYear = (year, walks) => {
  return walks.reduce((firstYear,walk)=>{
    const walkYear = new Date((walk.time.slots[0][0])*1000).getFullYear();
    return walkYear < year ? walkYear : year;
  }, year);
};

const generateWalkLeaders = (walks) => {
  let walkLeaders = [];
  walks.forEach(w => {
    if (w.team && w.team.length > 0) {
      w.team.forEach(m => {
        const role = m.role ? m.role.toLowerCase() : '';
        if (role.includes('leader') || role.includes('organizer')) {
          let leaderExists = walkLeaders.findIndex(l => l.firstName === m['name-first'] && l.lastName === m['name-last']);
          if (leaderExists !== -1) walkLeaders[leaderExists].walks.push(w);
          else walkLeaders.push({firstName:m['name-first'], lastName:m['name-last'], walks: [w], email:m['email']});
        }
      });
    }
  });
  return walkLeaders;
};

const _walkLeaders = generateWalkLeaders(walks);

const _walkLeadersPerYear = (year, walkLeaders) => {
  return walkLeaders.reduce((sum, walkLeader)=>{
    const ledWalkThisYear = walkLeader.walks.find(w => new Date(JSON.parse(w.time.slots[0][0])*1000).getFullYear() === year);
    return ledWalkThisYear ? sum + 1 : sum;
  }, 0);
};

const _walksPerYear = (year, walks) => {
  return walks.reduce((sum,walk)=>{
    const walkThisYear = new Date((walk.time.slots[0][0])*1000).getFullYear() === year;
    return walkThisYear ? sum + 1 : sum;
  }, 0);
};

const _generateRegionSummary = (walks) => {
  const year = (new Date()).getFullYear();
  return {
    year,
    walkLeaders: _walkLeadersPerYear(year, _walkLeaders),
    walks: _walksPerYear(year, walks),
    participants: 111, //TODO: This information is not available
    originalYear: _firstWalkYear(year, walks),
    totalWalkLeaders: _walkLeaders.length,
    totalWalks: walks.length,
    name: city.name,
  }
};

const _regionSummary = _generateRegionSummary(walks);

const _retrieveWalks = () => {
  if (currentRoute === '/cityWalks') return cityWalks;
  if (currentRoute === '/myWalks') return walks;
}

const _filterWalks = (filters = activeFilters, filterByDate = 'all') => {
  let allWalks = _retrieveWalks();

  if (!filters.length) filteredWalks = allWalks;
  else {
    filteredWalks = allWalks.filter(walk => {
      return filters.reduce((p, c)=> {
        //TODO: Assumed wards is a single string
        const ward = walk.wards ? walk.wards.indexOf(c) !== -1 : false;
        const theme = walk.checkboxes ? Object.keys(walk.checkboxes).indexOf('theme-' + c) !== -1 : false;
        const accessibility = walk.checkboxes ? Object.keys(walk.checkboxes).indexOf('accessible-' + c) !== -1 : false;

        return (p && (ward || theme || accessibility));
      }, true);
    });
  }

  if (!filterByDate.length || filterByDate === 'all') return;
  else {
    filteredWalks = filteredWalks.filter(walk => {
      const currentDate = Date.now();
      if (filterByDate === 'past')  return walk.time.slots[0][0] * 1000 <= currentDate;
      else if (filterByDate === 'future') return walk.time.slots[0][0] * 1000 >= currentDate;
    });
  }
};

//TODO: (Post-PR) Create a common filter and list Component

const _filterWalkLeaders = (filterByDate = '') => {

  if (!filterByDate.length || filterByDate === 'all') activeLeaders = _walkLeaders;
  else {
    activeLeaders = _walkLeaders.filter(leader => {
      const currentDate = Date.now();
      if (filterByDate === 'past') {
        return leader.walks.reduce((p, walk) => {
          if(p) return p;
          return walk.time.slots[0][0] * 1000 <= currentDate;
        }, false);
      }
      if (filterByDate === 'future') {
        return leader.walks.reduce((p, walk) => {
          if(p) return p;
          return walk.time.slots[0][0] * 1000 >= currentDate;
        }, false);
      }
      return true; //filterByDate === 'all'
    });
  }
}

const _sortWalkLeaders = (sortSelected) => {
  //TODO: Toggle off and on or reset
  if (sortBy === sortSelected) return;
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
};

const _addWalkFilter = (filter) => {
  if (activeFilters.findIndex(f => f === filter) === -1) activeFilters.push(filter);
};

const _removeWalkFilter = (filter) => {

  activeFilters.splice(activeFilters.findIndex(f => f === filter), 1);
};

const _generateCSV = () => {
  //TODO: Configuration (what to export) + Complete Functionality
  return encodeURI("data:text/csv;charset=utf-8,Title \n" + (filteredWalks.map(w => (`\"${w.title} \"`))).join('\n'));
}

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

  getMyWalks() {
    return walks;
  },

  getActiveFilters() {
    return activeFilters;
  },

  getDateFilter() {
    return filterByDate;
  },

  getSortBy() {
    return sortBy;
  },

  generateCSV() {
    return _generateCSV();
  },

  getWalks(route) {
    const {pathname} = route;

    if (pathname !== currentRoute) {
      currentRoute = pathname;
      filteredWalks = _retrieveWalks();
      activeFilters = [];
      filterByDate = 'all';
    }

    return filteredWalks;
  },

  getWalkLeadersAndVolunteers(route) {
    const {pathname} = route;

    if (pathname !== currentRoute) {
      currentRoute = pathname;
      filterByDate = 'all';
      sortBy = null;
      activeLeaders = _walkLeaders;
    }

    return activeLeaders;
  },

  getResources() {
    return resources;
  },

  getMyBlogPosts() {
    return blog;
  },

  getLatestPost() {
    return {post:blog[0]};
  },

  getRegionSummary() {
    return _regionSummary;
  },

  getMenuItems() {
    return {menuItems};
  },

  dispatcherIndex: register(function(action) {
    switch (action.type) {
      case ActionsTypes.FILTER_WALKS:
        _filterWalks(action.filters);
        break;
      case ActionsTypes.ADD_WALK_FILTER:
        _addWalkFilter(action.filter);
        _filterWalks();
        break;
      case ActionsTypes.REMOVE_WALK_FILTER:
        _removeWalkFilter(action.filter);
        _filterWalks();
        break;
      case ActionsTypes.FILTER_WALKS_BY_DATE:
        _filterWalks(activeFilters,action.filter);
        filterByDate = action.filter;
        break;
      case ActionsTypes.FILTER_LEADERS_BY_DATE:
        debugger;
        _filterWalkLeaders(action.filter);
        filterByDate = action.filter;
        break;
      case ActionsTypes.SORT_LEADERS:
        _sortWalkLeaders(action.sortBy);
        sortBy = action.sortBy;
        break;
    }

    DashboardStore.emitChange();
  }),
});

export default DashboardStore;