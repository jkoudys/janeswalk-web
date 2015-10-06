/**
 * Setup the JanesWalk namespace
 */
require('./shims.js');
import EventEmitter from 'events';

window.JanesWalk = Object.assign({}, window.JanesWalk, {event: new EventEmitter()});
