import { EventEmitter } from 'events';
import {dashboard} from './DashboardStaticData';

const {city, walks, resources, blog} = dashboard;

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
    const {latlng, cityOrganizer, name, users, walks, impact} = city;
    return {latlng, cityOrganizer, name, users, walks, impact}; //TODO: What is the best way to do this? (PR)
  },

  getCityWalks() {
    const {walks, filters} = city;
    return {walks, filters};
  },

  getMyWalks() {
    return walks;
  },

  getWalkLeadersAndVolunteers() {
    const {walkLeaders} = city;
    return {walkLeaders};
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

  //TODO: dispatcher index

});

export default DashboardStore