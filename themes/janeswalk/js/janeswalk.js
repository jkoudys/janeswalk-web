(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Initialization code goes here. This is not to be a dumping ground for
 * miscellaneous functions, and especially not a place to stick new global
 * variables.
 */
// Translations for i18n L10n
'use strict';

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _defaultProps(defaultProps, props) { if (defaultProps) { for (var propName in defaultProps) { if (typeof props[propName] === 'undefined') { props[propName] = defaultProps[propName]; } } } return props; }

var _utilsI18nUtilsJs = require('./utils/I18nUtils.js');

var I18nUtils = _interopRequireWildcard(_utilsI18nUtilsJs);

// Page Views
var PageViews = {
  PageView: require('./components/Page.jsx'),
  CityPageView: require('./components/pages/City.jsx'),
  HomePageView: require('./components/pages/Home.jsx'),
  ProfilePageView: require('./components/pages/Profile.jsx'),
  WalkPageView: require('./components/pages/Walk.jsx')
};
var ReactViews = {
  CreateWalkView: require('./components/CreateWalk.jsx')
};
// load modals
var Login = require('./components/Login.jsx');

// Shims
// Used for Intl.DateTimeFormat
if (!window.Intl) {
  window.Intl = require('intl/Intl.en');
}

/**
 * Let hitting 'm' make the menu pop up
 */
function initKeyEvents() {
  // Init keyboard shortcuts
  var toolbar = document.getElementById('ccm-toolbar');
  if (toolbar) {
    window.addEventListener('keyup', function (ev) {
      /* Don't capture inputs going into a form */
      if (ev.target.tagName !== "INPUT") {
        ev.preventDefault();
        switch (String(ev.key || ev.keyCode && String.fromCharCode(ev.keyCode) || ev.char).toUpperCase()) {
          case "M":
            if (toolbar.style.display === 'block' || !toolbar.style.display) {
              toolbar.style.display = 'none';
            } else {
              toolbar.style.display = 'block';
            }
            break;
          default:
            break;
        }
      }
    });
  }
}

/**
 * Route the JSX view, for either an old v1 page, or a React component
 */
function routePage() {
  var pageViewName = document.body.getAttribute('data-pageViewName') || 'PageView';
  var ReactView = ReactViews[pageViewName];

  try {
    // Render modals we need on each page
    var loginEl = {
      $$typeof: _typeofReactElement,
      type: Login,
      key: null,
      ref: null,
      props: _defaultProps(Login.defaultProps, {
        socialLogin: (JanesWalk.stacks || { "Social Logins": "" })['Social Logins']
      }),
      _owner: null
    };

    // FIXME: once site's all-react, move this out of the JanesWalk object. Don't follow this approach
    // or we'll end up with massive spaghetti.
    window.JanesWalk.react = { login: loginEl };

    React.render(loginEl, document.getElementById('modals'));

    // Load our translations upfront
    I18nUtils.getTranslations(JanesWalk.locale);

    // Hybrid-routing. First check if there's a React view (which will render
    // nearly all the DOM), or a POJO view (which manipulates PHP-built HTML)
    if (ReactView) {
      switch (pageViewName) {
        case 'CreateWalkView':
          React.render({
            $$typeof: _typeofReactElement,
            type: ReactView,
            key: null,
            ref: null,
            props: _defaultProps(ReactView.defaultProps, {
              data: JanesWalk.walk.data,
              city: JanesWalk.city,
              user: JanesWalk.user,
              url: JanesWalk.walk.url,
              valt: JanesWalk.form.valt
            }),
            _owner: null
          }, document.getElementById('createwalk'));
          break;
      }
    } else {
      // FIXME: I'm not in-love with such a heavy jQuery reliance
      new PageViews[pageViewName]($(document.body));
    }
  } catch (e) {
    console.error('Error instantiating page view ' + pageViewName + ': ' + e.stack);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Process all deferred events
  JanesWalk.event.activate();

  // TODO: emit the city without needing to load JanesWalk with static data
  JanesWalk.event.emit('city.receive', JanesWalk.city);
  routePage();
  initKeyEvents();
});


},{"./components/CreateWalk.jsx":9,"./components/Login.jsx":11,"./components/Page.jsx":12,"./components/pages/City.jsx":34,"./components/pages/Home.jsx":35,"./components/pages/Profile.jsx":36,"./components/pages/Walk.jsx":37,"./utils/I18nUtils.js":44,"intl/Intl.en":7}],2:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],3:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher');

},{"./lib/Dispatcher":5}],5:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * 
 * @preventMunge
 */

'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var invariant = require('fbjs/lib/invariant');

var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *         case 'city-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */

  Dispatcher.prototype.register = function register(callback) {
    var id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   */

  Dispatcher.prototype.unregister = function unregister(id) {
    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
    delete this._callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */

  Dispatcher.prototype.waitFor = function waitFor(ids) {
    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this._isPending[id]) {
        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
        continue;
      }
      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
      this._invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   */

  Dispatcher.prototype.dispatch = function dispatch(payload) {
    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
    this._startDispatching(payload);
    try {
      for (var id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   */

  Dispatcher.prototype.isDispatching = function isDispatching() {
    return this._isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */

  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
    for (var id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
    delete this._pendingPayload;
    this._isDispatching = false;
  };

  return Dispatcher;
})();

module.exports = Dispatcher;
}).call(this,require('_process'))
},{"_process":3,"fbjs/lib/invariant":6}],6:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;
}).call(this,require('_process'))
},{"_process":3}],7:[function(require,module,exports){
(function (global){
(function(global,factory){var IntlPolyfill=factory();if(typeof define==="function"&&define.amd){define(IntlPolyfill)}if(typeof exports==="object"){module.exports=IntlPolyfill}if(global){global.IntlPolyfill=IntlPolyfill}})(typeof global!=="undefined"?global:this,function(){"use strict";var Intl={},realDefineProp=function(){try{return!!Object.defineProperty({},"a",{})}catch(e){return false}}(),es3=!realDefineProp&&!Object.prototype.__defineGetter__,hop=Object.prototype.hasOwnProperty,tls=1.23.toLocaleString(undefined,{style:"currency",currency:"ZZZ"}).indexOf("ZZZ")>-1,defineProperty=realDefineProp?Object.defineProperty:function(obj,name,desc){if("get"in desc&&obj.__defineGetter__)obj.__defineGetter__(name,desc.get);else if(!hop.call(obj,name)||"value"in desc)obj[name]=desc.value},arrIndexOf=Array.prototype.indexOf||function(search){var t=this;if(!t.length)return-1;for(var i=arguments[1]||0,max=t.length;i<max;i++){if(t[i]===search)return i}return-1},objCreate=Object.create||function(proto,props){var obj;function F(){}F.prototype=proto;obj=new F;for(var k in props){if(hop.call(props,k))defineProperty(obj,k,props[k])}return obj},arrSlice=Array.prototype.slice,arrConcat=Array.prototype.concat,arrPush=Array.prototype.push,arrJoin=Array.prototype.join,arrShift=Array.prototype.shift,arrUnshift=Array.prototype.unshift,fnBind=Function.prototype.bind||function(thisObj){var fn=this,args=arrSlice.call(arguments,1);if(fn.length===1){return function(a){return fn.apply(thisObj,arrConcat.call(args,arrSlice.call(arguments)))}}else{return function(){return fn.apply(thisObj,arrConcat.call(args,arrSlice.call(arguments)))}}},defaultLocale,internals=objCreate(null),secret=Math.random(),dateWidths=objCreate(null,{narrow:{},"short":{},"long":{}}),numberFormatProtoInitialised=false,dateTimeFormatProtoInitialised=false,expCurrencyCode=/^[A-Z]{3}$/,expUnicodeExSeq=/-u(?:-[0-9a-z]{2,8})+/gi,expBCP47Syntax,expExtSequences,expVariantDupes,expSingletonDupes,redundantTags={tags:{"art-lojban":"jbo","i-ami":"ami","i-bnn":"bnn","i-hak":"hak","i-klingon":"tlh","i-lux":"lb","i-navajo":"nv","i-pwn":"pwn","i-tao":"tao","i-tay":"tay","i-tsu":"tsu","no-bok":"nb","no-nyn":"nn","sgn-BE-FR":"sfb","sgn-BE-NL":"vgt","sgn-CH-DE":"sgg","zh-guoyu":"cmn","zh-hakka":"hak","zh-min-nan":"nan","zh-xiang":"hsn","sgn-BR":"bzs","sgn-CO":"csn","sgn-DE":"gsg","sgn-DK":"dsl","sgn-ES":"ssp","sgn-FR":"fsl","sgn-GB":"bfi","sgn-GR":"gss","sgn-IE":"isg","sgn-IT":"ise","sgn-JP":"jsl","sgn-MX":"mfs","sgn-NI":"ncs","sgn-NL":"dse","sgn-NO":"nsl","sgn-PT":"psr","sgn-SE":"swl","sgn-US":"ase","sgn-ZA":"sfs","zh-cmn":"cmn","zh-cmn-Hans":"cmn-Hans","zh-cmn-Hant":"cmn-Hant","zh-gan":"gan","zh-wuu":"wuu","zh-yue":"yue"},subtags:{BU:"MM",DD:"DE",FX:"FR",TP:"TL",YD:"YE",ZR:"CD",heploc:"alalc97","in":"id",iw:"he",ji:"yi",jw:"jv",mo:"ro",ayx:"nun",bjd:"drl",ccq:"rki",cjr:"mom",cka:"cmr",cmk:"xch",drh:"khk",drw:"prs",gav:"dev",hrr:"jal",ibi:"opa",kgh:"kml",lcq:"ppr",mst:"mry",myt:"mry",sca:"hle",tie:"ras",tkk:"twm",tlw:"weo",tnf:"prs",ybd:"rki",yma:"lrr"},extLang:{aao:["aao","ar"],abh:["abh","ar"],abv:["abv","ar"],acm:["acm","ar"],acq:["acq","ar"],acw:["acw","ar"],acx:["acx","ar"],acy:["acy","ar"],adf:["adf","ar"],ads:["ads","sgn"],aeb:["aeb","ar"],aec:["aec","ar"],aed:["aed","sgn"],aen:["aen","sgn"],afb:["afb","ar"],afg:["afg","sgn"],ajp:["ajp","ar"],apc:["apc","ar"],apd:["apd","ar"],arb:["arb","ar"],arq:["arq","ar"],ars:["ars","ar"],ary:["ary","ar"],arz:["arz","ar"],ase:["ase","sgn"],asf:["asf","sgn"],asp:["asp","sgn"],asq:["asq","sgn"],asw:["asw","sgn"],auz:["auz","ar"],avl:["avl","ar"],ayh:["ayh","ar"],ayl:["ayl","ar"],ayn:["ayn","ar"],ayp:["ayp","ar"],bbz:["bbz","ar"],bfi:["bfi","sgn"],bfk:["bfk","sgn"],bjn:["bjn","ms"],bog:["bog","sgn"],bqn:["bqn","sgn"],bqy:["bqy","sgn"],btj:["btj","ms"],bve:["bve","ms"],bvl:["bvl","sgn"],bvu:["bvu","ms"],bzs:["bzs","sgn"],cdo:["cdo","zh"],cds:["cds","sgn"],cjy:["cjy","zh"],cmn:["cmn","zh"],coa:["coa","ms"],cpx:["cpx","zh"],csc:["csc","sgn"],csd:["csd","sgn"],cse:["cse","sgn"],csf:["csf","sgn"],csg:["csg","sgn"],csl:["csl","sgn"],csn:["csn","sgn"],csq:["csq","sgn"],csr:["csr","sgn"],czh:["czh","zh"],czo:["czo","zh"],doq:["doq","sgn"],dse:["dse","sgn"],dsl:["dsl","sgn"],dup:["dup","ms"],ecs:["ecs","sgn"],esl:["esl","sgn"],esn:["esn","sgn"],eso:["eso","sgn"],eth:["eth","sgn"],fcs:["fcs","sgn"],fse:["fse","sgn"],fsl:["fsl","sgn"],fss:["fss","sgn"],gan:["gan","zh"],gds:["gds","sgn"],gom:["gom","kok"],gse:["gse","sgn"],gsg:["gsg","sgn"],gsm:["gsm","sgn"],gss:["gss","sgn"],gus:["gus","sgn"],hab:["hab","sgn"],haf:["haf","sgn"],hak:["hak","zh"],hds:["hds","sgn"],hji:["hji","ms"],hks:["hks","sgn"],hos:["hos","sgn"],hps:["hps","sgn"],hsh:["hsh","sgn"],hsl:["hsl","sgn"],hsn:["hsn","zh"],icl:["icl","sgn"],ils:["ils","sgn"],inl:["inl","sgn"],ins:["ins","sgn"],ise:["ise","sgn"],isg:["isg","sgn"],isr:["isr","sgn"],jak:["jak","ms"],jax:["jax","ms"],jcs:["jcs","sgn"],jhs:["jhs","sgn"],jls:["jls","sgn"],jos:["jos","sgn"],jsl:["jsl","sgn"],jus:["jus","sgn"],kgi:["kgi","sgn"],knn:["knn","kok"],kvb:["kvb","ms"],kvk:["kvk","sgn"],kvr:["kvr","ms"],kxd:["kxd","ms"],lbs:["lbs","sgn"],lce:["lce","ms"],lcf:["lcf","ms"],liw:["liw","ms"],lls:["lls","sgn"],lsg:["lsg","sgn"],lsl:["lsl","sgn"],lso:["lso","sgn"],lsp:["lsp","sgn"],lst:["lst","sgn"],lsy:["lsy","sgn"],ltg:["ltg","lv"],lvs:["lvs","lv"],lzh:["lzh","zh"],max:["max","ms"],mdl:["mdl","sgn"],meo:["meo","ms"],mfa:["mfa","ms"],mfb:["mfb","ms"],mfs:["mfs","sgn"],min:["min","ms"],mnp:["mnp","zh"],mqg:["mqg","ms"],mre:["mre","sgn"],msd:["msd","sgn"],msi:["msi","ms"],msr:["msr","sgn"],mui:["mui","ms"],mzc:["mzc","sgn"],mzg:["mzg","sgn"],mzy:["mzy","sgn"],nan:["nan","zh"],nbs:["nbs","sgn"],ncs:["ncs","sgn"],nsi:["nsi","sgn"],nsl:["nsl","sgn"],nsp:["nsp","sgn"],nsr:["nsr","sgn"],nzs:["nzs","sgn"],okl:["okl","sgn"],orn:["orn","ms"],ors:["ors","ms"],pel:["pel","ms"],pga:["pga","ar"],pks:["pks","sgn"],prl:["prl","sgn"],prz:["prz","sgn"],psc:["psc","sgn"],psd:["psd","sgn"],pse:["pse","ms"],psg:["psg","sgn"],psl:["psl","sgn"],pso:["pso","sgn"],psp:["psp","sgn"],psr:["psr","sgn"],pys:["pys","sgn"],rms:["rms","sgn"],rsi:["rsi","sgn"],rsl:["rsl","sgn"],sdl:["sdl","sgn"],sfb:["sfb","sgn"],sfs:["sfs","sgn"],sgg:["sgg","sgn"],sgx:["sgx","sgn"],shu:["shu","ar"],slf:["slf","sgn"],sls:["sls","sgn"],sqk:["sqk","sgn"],sqs:["sqs","sgn"],ssh:["ssh","ar"],ssp:["ssp","sgn"],ssr:["ssr","sgn"],svk:["svk","sgn"],swc:["swc","sw"],swh:["swh","sw"],swl:["swl","sgn"],syy:["syy","sgn"],tmw:["tmw","ms"],tse:["tse","sgn"],tsm:["tsm","sgn"],tsq:["tsq","sgn"],tss:["tss","sgn"],tsy:["tsy","sgn"],tza:["tza","sgn"],ugn:["ugn","sgn"],ugy:["ugy","sgn"],ukl:["ukl","sgn"],uks:["uks","sgn"],urk:["urk","ms"],uzn:["uzn","uz"],uzs:["uzs","uz"],vgt:["vgt","sgn"],vkk:["vkk","ms"],vkt:["vkt","ms"],vsi:["vsi","sgn"],vsl:["vsl","sgn"],vsv:["vsv","sgn"],wuu:["wuu","zh"],xki:["xki","sgn"],xml:["xml","sgn"],xmm:["xmm","ms"],xms:["xms","sgn"],yds:["yds","sgn"],ysl:["ysl","sgn"],yue:["yue","zh"],zib:["zib","sgn"],zlm:["zlm","ms"],zmi:["zmi","ms"],zsl:["zsl","sgn"],zsm:["zsm","ms"]}},currencyMinorUnits={BHD:3,BYR:0,XOF:0,BIF:0,XAF:0,CLF:0,CLP:0,KMF:0,DJF:0,XPF:0,GNF:0,ISK:0,IQD:3,JPY:0,JOD:3,KRW:0,KWD:3,LYD:3,OMR:3,PYG:0,RWF:0,TND:3,UGX:0,UYI:0,VUV:0,VND:0};(function(){var extlang="[a-z]{3}(?:-[a-z]{3}){0,2}",language="(?:[a-z]{2,3}(?:-"+extlang+")?|[a-z]{4}|[a-z]{5,8})",script="[a-z]{4}",region="(?:[a-z]{2}|\\d{3})",variant="(?:[a-z0-9]{5,8}|\\d[a-z0-9]{3})",singleton="[0-9a-wy-z]",extension=singleton+"(?:-[a-z0-9]{2,8})+",privateuse="x(?:-[a-z0-9]{1,8})+",irregular="(?:en-GB-oed"+"|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|tao|tay|tsu)"+"|sgn-(?:BE-FR|BE-NL|CH-DE))",regular="(?:art-lojban|cel-gaulish|no-bok|no-nyn"+"|zh-(?:guoyu|hakka|min|min-nan|xiang))",grandfathered="(?:"+irregular+"|"+regular+")",langtag=language+"(?:-"+script+")?(?:-"+region+")?(?:-"+variant+")*(?:-"+extension+")*(?:-"+privateuse+")?";expBCP47Syntax=RegExp("^(?:"+langtag+"|"+privateuse+"|"+grandfathered+")$","i");expVariantDupes=RegExp("^(?!x).*?-("+variant+")-(?:\\w{4,8}-(?!x-))*\\1\\b","i");expSingletonDupes=RegExp("^(?!x).*?-("+singleton+")-(?:\\w+-(?!x-))*\\1\\b","i");expExtSequences=RegExp("-"+extension,"ig")})();function IsStructurallyValidLanguageTag(locale){if(!expBCP47Syntax.test(locale))return false;if(expVariantDupes.test(locale))return false;if(expSingletonDupes.test(locale))return false;return true}function CanonicalizeLanguageTag(locale){var match,parts;locale=locale.toLowerCase();parts=locale.split("-");for(var i=1,max=parts.length;i<max;i++){if(parts[i].length===2)parts[i]=parts[i].toUpperCase();else if(parts[i].length===4)parts[i]=parts[i].charAt(0).toUpperCase()+parts[i].slice(1);else if(parts[i].length===1&&parts[i]!="x")break}locale=arrJoin.call(parts,"-");if((match=locale.match(expExtSequences))&&match.length>1){match.sort();locale=locale.replace(RegExp("(?:"+expExtSequences.source+")+","i"),arrJoin.call(match,""))}if(hop.call(redundantTags.tags,locale))locale=redundantTags.tags[locale];parts=locale.split("-");for(var i=1,max=parts.length;i<max;i++){if(hop.call(redundantTags.subtags,parts[i]))parts[i]=redundantTags.subtags[parts[i]];else if(hop.call(redundantTags.extLang,parts[i])){parts[i]=redundantTags.extLang[parts[i]][0];if(i===1&&redundantTags.extLang[parts[1]][1]===parts[0]){parts=arrSlice.call(parts,i++);max-=1}}}return arrJoin.call(parts,"-")}function DefaultLocale(){return defaultLocale}function IsWellFormedCurrencyCode(currency){var c=String(currency),normalized=toLatinUpperCase(c);if(expCurrencyCode.test(normalized)===false)return false;return true}function CanonicalizeLocaleList(locales){if(locales===undefined)return new List;var seen=new List,locales=typeof locales==="string"?[locales]:locales,O=toObject(locales),len=O.length,k=0;while(k<len){var Pk=String(k),kPresent=Pk in O;if(kPresent){var kValue=O[Pk];if(kValue==null||typeof kValue!=="string"&&typeof kValue!=="object")throw new TypeError("String or Object type expected");var tag=String(kValue);if(!IsStructurallyValidLanguageTag(tag))throw new RangeError("'"+tag+"' is not a structurally valid language tag");tag=CanonicalizeLanguageTag(tag);if(arrIndexOf.call(seen,tag)===-1)arrPush.call(seen,tag)}k++}return seen}function BestAvailableLocale(availableLocales,locale){var candidate=locale;while(true){if(arrIndexOf.call(availableLocales,candidate)>-1)return candidate;var pos=candidate.lastIndexOf("-");if(pos<0)return;if(pos>=2&&candidate.charAt(pos-2)=="-")pos-=2;candidate=candidate.substring(0,pos)}}function LookupMatcher(availableLocales,requestedLocales){var i=0,len=requestedLocales.length,availableLocale;while(i<len&&!availableLocale){var locale=requestedLocales[i],noExtensionsLocale=String(locale).replace(expUnicodeExSeq,""),availableLocale=BestAvailableLocale(availableLocales,noExtensionsLocale);i++}var result=new Record;if(availableLocale!==undefined){result["[[locale]]"]=availableLocale;if(String(locale)!==String(noExtensionsLocale)){var extension=locale.match(expUnicodeExSeq)[0],extensionIndex=locale.indexOf("-u-");result["[[extension]]"]=extension;result["[[extensionIndex]]"]=extensionIndex}}else result["[[locale]]"]=DefaultLocale();return result}function BestFitMatcher(availableLocales,requestedLocales){return LookupMatcher(availableLocales,requestedLocales)}function ResolveLocale(availableLocales,requestedLocales,options,relevantExtensionKeys,localeData){if(availableLocales.length===0){throw new ReferenceError("No locale data has been provided for this object yet.")}var matcher=options["[[localeMatcher]]"];if(matcher==="lookup")var r=LookupMatcher(availableLocales,requestedLocales);else var r=BestFitMatcher(availableLocales,requestedLocales);var foundLocale=r["[[locale]]"];if(hop.call(r,"[[extension]]"))var extension=r["[[extension]]"],extensionIndex=r["[[extensionIndex]]"],split=String.prototype.split,extensionSubtags=split.call(extension,"-"),extensionSubtagsLength=extensionSubtags.length;var result=new Record;result["[[dataLocale]]"]=foundLocale;var supportedExtension="-u",i=0,len=relevantExtensionKeys.length;while(i<len){var key=relevantExtensionKeys[i],foundLocaleData=localeData[foundLocale],keyLocaleData=foundLocaleData[key],value=keyLocaleData["0"],supportedExtensionAddition="",indexOf=arrIndexOf;if(extensionSubtags!==undefined){var keyPos=indexOf.call(extensionSubtags,key);if(keyPos!==-1){if(keyPos+1<extensionSubtagsLength&&extensionSubtags[keyPos+1].length>2){var requestedValue=extensionSubtags[keyPos+1],valuePos=indexOf.call(keyLocaleData,requestedValue);if(valuePos!==-1)var value=requestedValue,supportedExtensionAddition="-"+key+"-"+value}else{var valuePos=indexOf(keyLocaleData,"true");if(valuePos!==-1)var value="true"}}}if(hop.call(options,"[["+key+"]]")){var optionsValue=options["[["+key+"]]"];if(indexOf.call(keyLocaleData,optionsValue)!==-1){if(optionsValue!==value){value=optionsValue;supportedExtensionAddition=""}}}result["[["+key+"]]"]=value;supportedExtension+=supportedExtensionAddition;i++}if(supportedExtension.length>2){var preExtension=foundLocale.substring(0,extensionIndex),postExtension=foundLocale.substring(extensionIndex),foundLocale=preExtension+supportedExtension+postExtension}result["[[locale]]"]=foundLocale;return result}function LookupSupportedLocales(availableLocales,requestedLocales){var len=requestedLocales.length,subset=new List,k=0;while(k<len){var locale=requestedLocales[k],noExtensionsLocale=String(locale).replace(expUnicodeExSeq,""),availableLocale=BestAvailableLocale(availableLocales,noExtensionsLocale);if(availableLocale!==undefined)arrPush.call(subset,locale);k++}var subsetArray=arrSlice.call(subset);return subsetArray}function BestFitSupportedLocales(availableLocales,requestedLocales){return LookupSupportedLocales(availableLocales,requestedLocales)}function SupportedLocales(availableLocales,requestedLocales,options){if(options!==undefined){var options=new Record(toObject(options)),matcher=options.localeMatcher;if(matcher!==undefined){matcher=String(matcher);if(matcher!=="lookup"&&matcher!=="best fit")throw new RangeError('matcher should be "lookup" or "best fit"')}}if(matcher===undefined||matcher==="best fit")var subset=BestFitSupportedLocales(availableLocales,requestedLocales);else var subset=LookupSupportedLocales(availableLocales,requestedLocales);for(var P in subset){if(!hop.call(subset,P))continue;defineProperty(subset,P,{writable:false,configurable:false,value:subset[P]})}defineProperty(subset,"length",{writable:false});return subset}function GetOption(options,property,type,values,fallback){var value=options[property];if(value!==undefined){value=type==="boolean"?Boolean(value):type==="string"?String(value):value;if(values!==undefined){if(arrIndexOf.call(values,value)===-1)throw new RangeError("'"+value+"' is not an allowed value for `"+property+"`")}return value}return fallback}function GetNumberOption(options,property,minimum,maximum,fallback){var value=options[property];if(value!==undefined){value=Number(value);if(isNaN(value)||value<minimum||value>maximum)throw new RangeError("Value is not a number or outside accepted range");return Math.floor(value)}return fallback}function NumberFormatConstructor(){var locales=arguments[0];var options=arguments[1];if(!this||this===Intl){return new Intl.NumberFormat(locales,options)}return InitializeNumberFormat(toObject(this),locales,options)}defineProperty(Intl,"NumberFormat",{configurable:true,writable:true,value:NumberFormatConstructor});defineProperty(Intl.NumberFormat,"prototype",{writable:false});function InitializeNumberFormat(numberFormat,locales,options){var internal=getInternalProperties(numberFormat),regexpState=createRegExpRestore();if(internal["[[initializedIntlObject]]"]===true)throw new TypeError("`this` object has already been initialized as an Intl object");defineProperty(numberFormat,"__getInternalProperties",{value:function(){if(arguments[0]===secret)return internal}});internal["[[initializedIntlObject]]"]=true;var requestedLocales=CanonicalizeLocaleList(locales);if(options===undefined)options={};else options=toObject(options);var opt=new Record,matcher=GetOption(options,"localeMatcher","string",new List("lookup","best fit"),"best fit");opt["[[localeMatcher]]"]=matcher;var localeData=internals.NumberFormat["[[localeData]]"],r=ResolveLocale(internals.NumberFormat["[[availableLocales]]"],requestedLocales,opt,internals.NumberFormat["[[relevantExtensionKeys]]"],localeData);internal["[[locale]]"]=r["[[locale]]"];internal["[[numberingSystem]]"]=r["[[nu]]"];internal["[[dataLocale]]"]=r["[[dataLocale]]"];var dataLocale=r["[[dataLocale]]"],s=GetOption(options,"style","string",new List("decimal","percent","currency"),"decimal");internal["[[style]]"]=s;var c=GetOption(options,"currency","string");if(c!==undefined&&!IsWellFormedCurrencyCode(c))throw new RangeError("'"+c+"' is not a valid currency code");if(s==="currency"&&c===undefined)throw new TypeError("Currency code is required when style is currency");if(s==="currency"){c=c.toUpperCase();internal["[[currency]]"]=c;var cDigits=CurrencyDigits(c)}var cd=GetOption(options,"currencyDisplay","string",new List("code","symbol","name"),"symbol");if(s==="currency")internal["[[currencyDisplay]]"]=cd;var mnid=GetNumberOption(options,"minimumIntegerDigits",1,21,1);internal["[[minimumIntegerDigits]]"]=mnid;var mnfdDefault=s==="currency"?cDigits:0,mnfd=GetNumberOption(options,"minimumFractionDigits",0,20,mnfdDefault);internal["[[minimumFractionDigits]]"]=mnfd;var mxfdDefault=s==="currency"?Math.max(mnfd,cDigits):s==="percent"?Math.max(mnfd,0):Math.max(mnfd,3),mxfd=GetNumberOption(options,"maximumFractionDigits",mnfd,20,mxfdDefault);internal["[[maximumFractionDigits]]"]=mxfd;var mnsd=options.minimumSignificantDigits,mxsd=options.maximumSignificantDigits;if(mnsd!==undefined||mxsd!==undefined){mnsd=GetNumberOption(options,"minimumSignificantDigits",1,21,1);mxsd=GetNumberOption(options,"maximumSignificantDigits",mnsd,21,21);internal["[[minimumSignificantDigits]]"]=mnsd;internal["[[maximumSignificantDigits]]"]=mxsd}var g=GetOption(options,"useGrouping","boolean",undefined,true);internal["[[useGrouping]]"]=g;var dataLocaleData=localeData[dataLocale],patterns=dataLocaleData.patterns;var stylePatterns=patterns[s];internal["[[positivePattern]]"]=stylePatterns.positivePattern;internal["[[negativePattern]]"]=stylePatterns.negativePattern;internal["[[boundFormat]]"]=undefined;internal["[[initializedNumberFormat]]"]=true;if(es3)numberFormat.format=GetFormatNumber.call(numberFormat);regexpState.exp.test(regexpState.input);return numberFormat}function CurrencyDigits(currency){return currencyMinorUnits[currency]!==undefined?currencyMinorUnits[currency]:2}internals.NumberFormat={"[[availableLocales]]":[],"[[relevantExtensionKeys]]":["nu"],"[[localeData]]":{}};defineProperty(Intl.NumberFormat,"supportedLocalesOf",{configurable:true,writable:true,value:fnBind.call(supportedLocalesOf,internals.NumberFormat)});defineProperty(Intl.NumberFormat.prototype,"format",{configurable:true,get:GetFormatNumber});function GetFormatNumber(){var internal=this!=null&&typeof this==="object"&&getInternalProperties(this);if(!internal||!internal["[[initializedNumberFormat]]"])throw new TypeError("`this` value for format() is not an initialized Intl.NumberFormat object.");if(internal["[[boundFormat]]"]===undefined){var F=function(value){return FormatNumber(this,Number(value))},bf=fnBind.call(F,this);internal["[[boundFormat]]"]=bf}return internal["[[boundFormat]]"]}function FormatNumber(numberFormat,x){var n,regexpState=createRegExpRestore(),internal=getInternalProperties(numberFormat),locale=internal["[[dataLocale]]"],nums=internal["[[numberingSystem]]"],data=internals.NumberFormat["[[localeData]]"][locale],ild=data.symbols[nums]||data.symbols.latn,negative=false;if(isFinite(x)===false){if(isNaN(x))n=ild.nan;else{n=ild.infinity;if(x<0)negative=true}}else{if(x<0){negative=true;x=-x}if(internal["[[style]]"]==="percent")x*=100;if(hop.call(internal,"[[minimumSignificantDigits]]")&&hop.call(internal,"[[maximumSignificantDigits]]"))n=ToRawPrecision(x,internal["[[minimumSignificantDigits]]"],internal["[[maximumSignificantDigits]]"]);else n=ToRawFixed(x,internal["[[minimumIntegerDigits]]"],internal["[[minimumFractionDigits]]"],internal["[[maximumFractionDigits]]"]);if(numSys[nums]){var digits=numSys[internal["[[numberingSystem]]"]];n=String(n).replace(/\d/g,function(digit){return digits[digit]})}else n=String(n);n=n.replace(/\./g,ild.decimal);if(internal["[[useGrouping]]"]===true){var parts=n.split(ild.decimal),igr=parts[0],pgSize=data.patterns.primaryGroupSize||3,sgSize=data.patterns.secondaryGroupSize||pgSize;if(igr.length>pgSize){var groups=new List,end=igr.length-pgSize,idx=end%sgSize,start=igr.slice(0,idx);if(start.length)arrPush.call(groups,start);while(idx<end){arrPush.call(groups,igr.slice(idx,idx+sgSize));idx+=sgSize}arrPush.call(groups,igr.slice(end));parts[0]=arrJoin.call(groups,ild.group)}n=arrJoin.call(parts,ild.decimal)}}var result=internal[negative===true?"[[negativePattern]]":"[[positivePattern]]"];result=result.replace("{number}",n);if(internal["[[style]]"]==="currency"){var cd,currency=internal["[[currency]]"],cData=data.currencies[currency];switch(internal["[[currencyDisplay]]"]){case"symbol":cd=cData||currency;break;default:case"code":case"name":cd=currency}result=result.replace("{currency}",cd)}regexpState.exp.test(regexpState.input);return result}function ToRawPrecision(x,minPrecision,maxPrecision){var p=maxPrecision;if(x===0){var m=arrJoin.call(Array(p+1),"0"),e=0}else{var e=Math.floor(Math.log(Math.abs(x))/Math.LN10),f=Math.round(Math.exp(Math.abs(e-p+1)*Math.LN10)),m=String(Math.round(e-p+1<0?x*f:x/f))}if(e>=p)return m+arrJoin.call(Array(e-p+1+1),"0");else if(e===p-1)return m;else if(e>=0)m=m.slice(0,e+1)+"."+m.slice(e+1);else if(e<0)m="0."+arrJoin.call(Array(-(e+1)+1),"0")+m;if(m.indexOf(".")>=0&&maxPrecision>minPrecision){var cut=maxPrecision-minPrecision;while(cut>0&&m.charAt(m.length-1)==="0"){m=m.slice(0,-1);cut--}if(m.charAt(m.length-1)===".")m=m.slice(0,-1)}return m}function ToRawFixed(x,minInteger,minFraction,maxFraction){var idx,m=Number.prototype.toFixed.call(x,maxFraction),igr=m.split(".")[0].length,cut=maxFraction-minFraction,exp=(idx=m.indexOf("e"))>-1?m.slice(idx+1):0;if(exp){m=m.slice(0,idx).replace(".","");m+=arrJoin.call(Array(exp-(m.length-1)+1),"0")+"."+arrJoin.call(Array(maxFraction+1),"0");igr=m.length}while(cut>0&&m.slice(-1)==="0"){m=m.slice(0,-1);cut--}if(m.slice(-1)===".")m=m.slice(0,-1);if(igr<minInteger)var z=arrJoin.call(Array(minInteger-igr+1),"0");return(z?z:"")+m}var numSys={arab:["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"],arabext:["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"],bali:["᭐","᭑","᭒","᭓","᭔","᭕","᭖","᭗","᭘","᭙"],beng:["০","১","২","৩","৪","৫","৬","৭","৮","৯"],deva:["०","१","२","३","४","५","६","७","८","९"],fullwide:["０","１","２","３","４","５","６","７","８","９"],gujr:["૦","૧","૨","૩","૪","૫","૬","૭","૮","૯"],guru:["੦","੧","੨","੩","੪","੫","੬","੭","੮","੯"],hanidec:["〇","一","二","三","四","五","六","七","八","九"],khmr:["០","១","២","៣","៤","៥","៦","៧","៨","៩"],knda:["೦","೧","೨","೩","೪","೫","೬","೭","೮","೯"],laoo:["໐","໑","໒","໓","໔","໕","໖","໗","໘","໙"],latn:["0","1","2","3","4","5","6","7","8","9"],limb:["᥆","᥇","᥈","᥉","᥊","᥋","᥌","᥍","᥎","᥏"],mlym:["൦","൧","൨","൩","൪","൫","൬","൭","൮","൯"],mong:["᠐","᠑","᠒","᠓","᠔","᠕","᠖","᠗","᠘","᠙"],mymr:["၀","၁","၂","၃","၄","၅","၆","၇","၈","၉"],orya:["୦","୧","୨","୩","୪","୫","୬","୭","୮","୯"],tamldec:["௦","௧","௨","௩","௪","௫","௬","௭","௮","௯"],telu:["౦","౧","౨","౩","౪","౫","౬","౭","౮","౯"],thai:["๐","๑","๒","๓","๔","๕","๖","๗","๘","๙"],tibt:["༠","༡","༢","༣","༤","༥","༦","༧","༨","༩"]};defineProperty(Intl.NumberFormat.prototype,"resolvedOptions",{configurable:true,writable:true,value:function(){var prop,descs=new Record,props=["locale","numberingSystem","style","currency","currencyDisplay","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","useGrouping"],internal=this!=null&&typeof this==="object"&&getInternalProperties(this);if(!internal||!internal["[[initializedNumberFormat]]"])throw new TypeError("`this` value for resolvedOptions() is not an initialized Intl.NumberFormat object.");for(var i=0,max=props.length;i<max;i++){if(hop.call(internal,prop="[["+props[i]+"]]"))descs[props[i]]={value:internal[prop],writable:true,configurable:true,enumerable:true}}return objCreate({},descs)}});function DateTimeFormatConstructor(){var locales=arguments[0];var options=arguments[1];if(!this||this===Intl){return new Intl.DateTimeFormat(locales,options)}return InitializeDateTimeFormat(toObject(this),locales,options)}defineProperty(Intl,"DateTimeFormat",{configurable:true,writable:true,value:DateTimeFormatConstructor});defineProperty(DateTimeFormatConstructor,"prototype",{writable:false});function InitializeDateTimeFormat(dateTimeFormat,locales,options){var internal=getInternalProperties(dateTimeFormat),regexpState=createRegExpRestore();if(internal["[[initializedIntlObject]]"]===true)throw new TypeError("`this` object has already been initialized as an Intl object");defineProperty(dateTimeFormat,"__getInternalProperties",{value:function(){if(arguments[0]===secret)return internal}});internal["[[initializedIntlObject]]"]=true;var requestedLocales=CanonicalizeLocaleList(locales),options=ToDateTimeOptions(options,"any","date"),opt=new Record;matcher=GetOption(options,"localeMatcher","string",new List("lookup","best fit"),"best fit");opt["[[localeMatcher]]"]=matcher;var DateTimeFormat=internals.DateTimeFormat,localeData=DateTimeFormat["[[localeData]]"],r=ResolveLocale(DateTimeFormat["[[availableLocales]]"],requestedLocales,opt,DateTimeFormat["[[relevantExtensionKeys]]"],localeData);internal["[[locale]]"]=r["[[locale]]"];internal["[[calendar]]"]=r["[[ca]]"];internal["[[numberingSystem]]"]=r["[[nu]]"];internal["[[dataLocale]]"]=r["[[dataLocale]]"];var dataLocale=r["[[dataLocale]]"],tz=options.timeZone;if(tz!==undefined){tz=toLatinUpperCase(tz);if(tz!=="UTC")throw new RangeError("timeZone is not supported.")}internal["[[timeZone]]"]=tz;opt=new Record;for(var prop in dateTimeComponents){if(!hop.call(dateTimeComponents,prop))continue;var value=GetOption(options,prop,"string",dateTimeComponents[prop]);opt["[["+prop+"]]"]=value}var bestFormat,dataLocaleData=localeData[dataLocale],formats=dataLocaleData.formats,matcher=GetOption(options,"formatMatcher","string",new List("basic","best fit"),"best fit");if(matcher==="basic")bestFormat=BasicFormatMatcher(opt,formats);else bestFormat=BestFitFormatMatcher(opt,formats);for(var prop in dateTimeComponents){if(!hop.call(dateTimeComponents,prop))continue;if(hop.call(bestFormat,prop)){var p=bestFormat[prop];internal["[["+prop+"]]"]=p}}var pattern,hr12=GetOption(options,"hour12","boolean");if(internal["[[hour]]"]){hr12=hr12===undefined?dataLocaleData.hour12:hr12;internal["[[hour12]]"]=hr12;if(hr12===true){var hourNo0=dataLocaleData.hourNo0;internal["[[hourNo0]]"]=hourNo0;pattern=bestFormat.pattern12}else pattern=bestFormat.pattern}else pattern=bestFormat.pattern;internal["[[pattern]]"]=pattern;internal["[[boundFormat]]"]=undefined;internal["[[initializedDateTimeFormat]]"]=true;if(es3)dateTimeFormat.format=GetFormatDateTime.call(dateTimeFormat);regexpState.exp.test(regexpState.input);return dateTimeFormat}var dateTimeComponents={weekday:["narrow","short","long"],era:["narrow","short","long"],year:["2-digit","numeric"],month:["2-digit","numeric","narrow","short","long"],day:["2-digit","numeric"],hour:["2-digit","numeric"],minute:["2-digit","numeric"],second:["2-digit","numeric"],timeZoneName:["short","long"]};function ToDateTimeOptions(options,required,defaults){if(options===undefined)options=null;else{var opt2=toObject(options);options=new Record;for(var k in opt2)options[k]=opt2[k]}var create=objCreate,options=create(options),needDefaults=true;if(required==="date"||required==="any"){if(options.weekday!==undefined||options.year!==undefined||options.month!==undefined||options.day!==undefined)needDefaults=false}if(required==="time"||required==="any"){if(options.hour!==undefined||options.minute!==undefined||options.second!==undefined)needDefaults=false}if(needDefaults&&(defaults==="date"||defaults==="all"))options.year=options.month=options.day="numeric";if(needDefaults&&(defaults==="time"||defaults==="all"))options.hour=options.minute=options.second="numeric";return options}function BasicFormatMatcher(options,formats){var removalPenalty=120,additionPenalty=20,longLessPenalty=8,longMorePenalty=6,shortLessPenalty=6,shortMorePenalty=3,bestScore=-Infinity,bestFormat,i=0,len=formats.length;while(i<len){var format=formats[i],score=0;for(var property in dateTimeComponents){if(!hop.call(dateTimeComponents,property))continue;var optionsProp=options["[["+property+"]]"],formatProp=hop.call(format,property)?format[property]:undefined;if(optionsProp===undefined&&formatProp!==undefined)score-=additionPenalty;else if(optionsProp!==undefined&&formatProp===undefined)score-=removalPenalty;else{var values=["2-digit","numeric","narrow","short","long"],optionsPropIndex=arrIndexOf.call(values,optionsProp),formatPropIndex=arrIndexOf.call(values,formatProp),delta=Math.max(Math.min(formatPropIndex-optionsPropIndex,2),-2);if(delta===2)score-=longMorePenalty;else if(delta===1)score-=shortMorePenalty;else if(delta===-1)score-=shortLessPenalty;else if(delta===-2)score-=longLessPenalty}}if(score>bestScore){bestScore=score;bestFormat=format}i++}return bestFormat}function BestFitFormatMatcher(options,formats){return BasicFormatMatcher(options,formats)}internals.DateTimeFormat={"[[availableLocales]]":[],"[[relevantExtensionKeys]]":["ca","nu"],"[[localeData]]":{}};defineProperty(Intl.DateTimeFormat,"supportedLocalesOf",{configurable:true,writable:true,value:fnBind.call(supportedLocalesOf,internals.DateTimeFormat)});defineProperty(Intl.DateTimeFormat.prototype,"format",{configurable:true,get:GetFormatDateTime});function GetFormatDateTime(){var internal=this!=null&&typeof this==="object"&&getInternalProperties(this);if(!internal||!internal["[[initializedDateTimeFormat]]"])throw new TypeError("`this` value for format() is not an initialized Intl.DateTimeFormat object.");if(internal["[[boundFormat]]"]===undefined){var F=function(){var x=Number(arguments.length===0?Date.now():arguments[0]);return FormatDateTime(this,x)},bf=fnBind.call(F,this);internal["[[boundFormat]]"]=bf}return internal["[[boundFormat]]"]}function FormatDateTime(dateTimeFormat,x){if(!isFinite(x))throw new RangeError("Invalid valid date passed to format");var internal=dateTimeFormat.__getInternalProperties(secret),regexpState=createRegExpRestore(),locale=internal["[[locale]]"],nf=new Intl.NumberFormat([locale],{useGrouping:false}),nf2=new Intl.NumberFormat([locale],{minimumIntegerDigits:2,useGrouping:false}),tm=ToLocalTime(x,internal["[[calendar]]"],internal["[[timeZone]]"]),result=internal["[[pattern]]"],dataLocale=internal["[[dataLocale]]"],localeData=internals.DateTimeFormat["[[localeData]]"][dataLocale].calendars,ca=internal["[[calendar]]"];for(var p in dateTimeComponents){if(hop.call(internal,"[["+p+"]]")){var pm,fv,f=internal["[["+p+"]]"],v=tm["[["+p+"]]"];if(p==="year"&&v<=0)v=1-v;else if(p==="month")v++;else if(p==="hour"&&internal["[[hour12]]"]===true){v=v%12;pm=v!==tm["[["+p+"]]"];if(v===0&&internal["[[hourNo0]]"]===true)v=12}if(f==="numeric")fv=FormatNumber(nf,v);else if(f==="2-digit"){fv=FormatNumber(nf2,v);if(fv.length>2)fv=fv.slice(-2)}else if(f in dateWidths){switch(p){case"month":fv=resolveDateString(localeData,ca,"months",f,tm["[["+p+"]]"]);break;case"weekday":try{fv=resolveDateString(localeData,ca,"days",f,tm["[["+p+"]]"])}catch(e){throw new Error("Could not find weekday data for locale "+locale)}break;case"timeZoneName":fv="";break;default:fv=tm["[["+p+"]]"]}}result=result.replace("{"+p+"}",fv)}}if(internal["[[hour12]]"]===true){fv=resolveDateString(localeData,ca,"dayPeriods",pm?"pm":"am");result=result.replace("{ampm}",fv)}regexpState.exp.test(regexpState.input);return result}function ToLocalTime(date,calendar,timeZone){var d=new Date(date),m="get"+(timeZone||"");
return new Record({"[[weekday]]":d[m+"Day"](),"[[era]]":+(d[m+"FullYear"]()>=0),"[[year]]":d[m+"FullYear"](),"[[month]]":d[m+"Month"](),"[[day]]":d[m+"Date"](),"[[hour]]":d[m+"Hours"](),"[[minute]]":d[m+"Minutes"](),"[[second]]":d[m+"Seconds"](),"[[inDST]]":false})}defineProperty(Intl.DateTimeFormat.prototype,"resolvedOptions",{writable:true,configurable:true,value:function(){var prop,descs=new Record,props=["locale","calendar","numberingSystem","timeZone","hour12","weekday","era","year","month","day","hour","minute","second","timeZoneName"],internal=this!=null&&typeof this==="object"&&getInternalProperties(this);if(!internal||!internal["[[initializedDateTimeFormat]]"])throw new TypeError("`this` value for resolvedOptions() is not an initialized Intl.DateTimeFormat object.");for(var i=0,max=props.length;i<max;i++){if(hop.call(internal,prop="[["+props[i]+"]]"))descs[props[i]]={value:internal[prop],writable:true,configurable:true,enumerable:true}}return objCreate({},descs)}});if(tls){defineProperty(Number.prototype,"toLocaleString",{writable:true,configurable:true,value:function(){if(Object.prototype.toString.call(this)!=="[object Number]")throw new TypeError("`this` value must be a number for Number.prototype.toLocaleString()");return FormatNumber(new NumberFormatConstructor(arguments[0],arguments[1]),this)}});defineProperty(Date.prototype,"toLocaleString",{writable:true,configurable:true,value:function(){if(Object.prototype.toString.call(this)!=="[object Date]")throw new TypeError("`this` value must be a Date instance for Date.prototype.toLocaleString()");var x=+this;if(isNaN(x))return"Invalid Date";var locales=arguments[0],options=arguments[1],options=ToDateTimeOptions(options,"any","all"),dateTimeFormat=new DateTimeFormatConstructor(locales,options);return FormatDateTime(dateTimeFormat,x)}});defineProperty(Date.prototype,"toLocaleDateString",{writable:true,configurable:true,value:function(){if(Object.prototype.toString.call(this)!=="[object Date]")throw new TypeError("`this` value must be a Date instance for Date.prototype.toLocaleDateString()");var x=+this;if(isNaN(x))return"Invalid Date";var locales=arguments[0],options=arguments[1],options=ToDateTimeOptions(options,"date","date"),dateTimeFormat=new DateTimeFormatConstructor(locales,options);return FormatDateTime(dateTimeFormat,x)}});defineProperty(Date.prototype,"toLocaleTimeString",{writable:true,configurable:true,value:function(){if(Object.prototype.toString.call(this)!=="[object Date]")throw new TypeError("`this` value must be a Date instance for Date.prototype.toLocaleTimeString()");var x=+this;if(isNaN(x))return"Invalid Date";var locales=arguments[0],options=arguments[1],options=ToDateTimeOptions(options,"time","time"),dateTimeFormat=new DateTimeFormatConstructor(locales,options);return FormatDateTime(dateTimeFormat,x)}})}defineProperty(Intl,"__addLocaleData",{value:function(data){if(!IsStructurallyValidLanguageTag(data.locale))throw new Error("Object passed doesn't identify itself with a valid language tag");addLocaleData(data,data.locale)}});function addLocaleData(data,tag){if(!data.number)throw new Error("Object passed doesn't contain locale data for Intl.NumberFormat");var locale,locales=[tag],parts=tag.split("-");if(parts.length>2&&parts[1].length==4)arrPush.call(locales,parts[0]+"-"+parts[2]);while(locale=arrShift.call(locales)){arrPush.call(internals.NumberFormat["[[availableLocales]]"],locale);internals.NumberFormat["[[localeData]]"][locale]=data.number;if(data.date){data.date.nu=data.number.nu;arrPush.call(internals.DateTimeFormat["[[availableLocales]]"],locale);internals.DateTimeFormat["[[localeData]]"][locale]=data.date}}if(defaultLocale===undefined)defaultLocale=tag;if(!numberFormatProtoInitialised){InitializeNumberFormat(Intl.NumberFormat.prototype);numberFormatProtoInitialised=true}if(data.date&&!dateTimeFormatProtoInitialised){InitializeDateTimeFormat(Intl.DateTimeFormat.prototype);dateTimeFormatProtoInitialised=true}}function supportedLocalesOf(locales){if(!hop.call(this,"[[availableLocales]]"))throw new TypeError("supportedLocalesOf() is not a constructor");var regexpState=createRegExpRestore(),options=arguments[1],availableLocales=this["[[availableLocales]]"],requestedLocales=CanonicalizeLocaleList(locales);regexpState.exp.test(regexpState.input);return SupportedLocales(availableLocales,requestedLocales,options)}function resolveDateString(data,ca,component,width,key){var obj=data[ca]&&data[ca][component]?data[ca][component]:data.gregory[component],alts={narrow:["short","long"],"short":["long","narrow"],"long":["short","narrow"]},resolved=hop.call(obj,width)?obj[width]:hop.call(obj,alts[width][0])?obj[alts[width][0]]:obj[alts[width][1]];return key!=null?resolved[key]:resolved}Record.prototype=objCreate(null);function Record(obj){for(var k in obj){if(obj instanceof Record||hop.call(obj,k))defineProperty(this,k,{value:obj[k],enumerable:true,writable:true,configurable:true})}}List.prototype=objCreate(null);function List(){defineProperty(this,"length",{writable:true,value:0});if(arguments.length)arrPush.apply(this,arrSlice.call(arguments))}function createRegExpRestore(){var esc=/[.?*+^$[\]\\(){}|-]/g,lm=RegExp.lastMatch,ml=RegExp.multiline?"m":"",ret={input:RegExp.input},reg=new List,has=false,cap={};for(var i=1;i<=9;i++)has=(cap["$"+i]=RegExp["$"+i])||has;lm=lm.replace(esc,"\\$&");if(has){for(var i=1;i<=9;i++){var m=cap["$"+i];if(!m)lm="()"+lm;else{m=m.replace(esc,"\\$&");lm=lm.replace(m,"("+m+")")}arrPush.call(reg,lm.slice(0,lm.indexOf("(")+1));lm=lm.slice(lm.indexOf("(")+1)}}ret.exp=new RegExp(arrJoin.call(reg,"")+lm,ml);return ret}function toLatinUpperCase(str){var i=str.length;while(i--){var ch=str.charAt(i);if(ch>="a"&&ch<="z")str=str.slice(0,i)+ch.toUpperCase()+str.slice(i+1)}return str}function toObject(arg){if(arg==null)throw new TypeError("Cannot convert null or undefined to object");return Object(arg)}function getInternalProperties(obj){if(hop.call(obj,"__getInternalProperties"))return obj.__getInternalProperties(secret);else return objCreate(null)}(function(){var a=["gregory","buddhist","chinese","coptic","ethioaa","ethiopic","generic","hebrew","indian","islamic","japanese","persian","roc","short","numeric","2-digit","{weekday}, {month} {day}, {year}, {hour}:{minute}:{second}","{weekday}, {month} {day}, {year}, {hour}:{minute}:{second} {ampm}","{weekday}, {month} {day}, {year}","{month} {day}, {year}","{month}/{day}/{year}","{month}/{year}","{month} {year}","{month} {day}","{month}/{day}","{hour}:{minute}:{second}","{hour}:{minute}:{second} {ampm}","{hour}:{minute}","{hour}:{minute} {ampm}","BE","Mo1","Mo2","Mo3","Mo4","Mo5","Mo6","Mo7","Mo8","Mo9","Mo10","Mo11","Mo12","Month1","Month2","Month3","Month4","Month5","Month6","Month7","Month8","Month9","Month10","Month11","Month12","Tout","Baba","Hator","Kiahk","Toba","Amshir","Baramhat","Baramouda","Bashans","Paona","Epep","Mesra","Nasie","ERA0","ERA1","Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen","M01","M02","M03","M04","M05","M06","M07","M08","M09","M10","M11","M12","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","June","July","August","September","October","November","December","Su","Mo","Tu","We","Th","Fr","Sa","Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","B","A","BC","AD","BCE","CE","Before Christ","Anno Domini","Before Common Era","Common Era","AM","PM","Tishri","Heshvan","Kislev","Tevet","Shevat","Adar I","Adar","Nisan","Iyar","Sivan","Tamuz","Av","Elul","Adar II","Chaitra","Vaisakha","Jyaistha","Asadha","Sravana","Bhadra","Asvina","Kartika","Agrahayana","Pausa","Magha","Phalguna","SAKA","Muh.","Saf.","Rab. I","Rab. II","Jum. I","Jum. II","Raj.","Sha.","Ram.","Shaw.","Dhuʻl-Q.","Dhuʻl-H.","Muharram","Safar","Rabiʻ I","Rabiʻ II","Jumada I","Jumada II","Rajab","Shaʻban","Ramadan","Shawwal","Dhuʻl-Qiʻdah","Dhuʻl-Hijjah","AH","Taika (645-650)","Hakuchi (650-671)","Hakuhō (672-686)","Shuchō (686-701)","Taihō (701-704)","Keiun (704-708)","Wadō (708-715)","Reiki (715-717)","Yōrō (717-724)","Jinki (724-729)","Tempyō (729-749)","Tempyō-kampō (749-749)","Tempyō-shōhō (749-757)","Tempyō-hōji (757-765)","Temphō-jingo (765-767)","Jingo-keiun (767-770)","Hōki (770-780)","Ten-ō (781-782)","Enryaku (782-806)","Daidō (806-810)","Kōnin (810-824)","Tenchō (824-834)","Jōwa (834-848)","Kajō (848-851)","Ninju (851-854)","Saiko (854-857)","Tennan (857-859)","Jōgan (859-877)","Genkei (877-885)","Ninna (885-889)","Kampyō (889-898)","Shōtai (898-901)","Engi (901-923)","Enchō (923-931)","Shōhei (931-938)","Tengyō (938-947)","Tenryaku (947-957)","Tentoku (957-961)","Ōwa (961-964)","Kōhō (964-968)","Anna (968-970)","Tenroku (970-973)","Ten-en (973-976)","Jōgen (976-978)","Tengen (978-983)","Eikan (983-985)","Kanna (985-987)","Ei-en (987-989)","Eiso (989-990)","Shōryaku (990-995)","Chōtoku (995-999)","Chōhō (999-1004)","Kankō (1004-1012)","Chōwa (1012-1017)","Kannin (1017-1021)","Jian (1021-1024)","Manju (1024-1028)","Chōgen (1028-1037)","Chōryaku (1037-1040)","Chōkyū (1040-1044)","Kantoku (1044-1046)","Eishō (1046-1053)","Tengi (1053-1058)","Kōhei (1058-1065)","Jiryaku (1065-1069)","Enkyū (1069-1074)","Shōho (1074-1077)","Shōryaku (1077-1081)","Eiho (1081-1084)","Ōtoku (1084-1087)","Kanji (1087-1094)","Kaho (1094-1096)","Eichō (1096-1097)","Shōtoku (1097-1099)","Kōwa (1099-1104)","Chōji (1104-1106)","Kashō (1106-1108)","Tennin (1108-1110)","Ten-ei (1110-1113)","Eikyū (1113-1118)","Gen-ei (1118-1120)","Hoan (1120-1124)","Tenji (1124-1126)","Daiji (1126-1131)","Tenshō (1131-1132)","Chōshō (1132-1135)","Hoen (1135-1141)","Eiji (1141-1142)","Kōji (1142-1144)","Tenyō (1144-1145)","Kyūan (1145-1151)","Ninpei (1151-1154)","Kyūju (1154-1156)","Hogen (1156-1159)","Heiji (1159-1160)","Eiryaku (1160-1161)","Ōho (1161-1163)","Chōkan (1163-1165)","Eiman (1165-1166)","Nin-an (1166-1169)","Kaō (1169-1171)","Shōan (1171-1175)","Angen (1175-1177)","Jishō (1177-1181)","Yōwa (1181-1182)","Juei (1182-1184)","Genryuku (1184-1185)","Bunji (1185-1190)","Kenkyū (1190-1199)","Shōji (1199-1201)","Kennin (1201-1204)","Genkyū (1204-1206)","Ken-ei (1206-1207)","Shōgen (1207-1211)","Kenryaku (1211-1213)","Kenpō (1213-1219)","Shōkyū (1219-1222)","Jōō (1222-1224)","Gennin (1224-1225)","Karoku (1225-1227)","Antei (1227-1229)","Kanki (1229-1232)","Jōei (1232-1233)","Tempuku (1233-1234)","Bunryaku (1234-1235)","Katei (1235-1238)","Ryakunin (1238-1239)","En-ō (1239-1240)","Ninji (1240-1243)","Kangen (1243-1247)","Hōji (1247-1249)","Kenchō (1249-1256)","Kōgen (1256-1257)","Shōka (1257-1259)","Shōgen (1259-1260)","Bun-ō (1260-1261)","Kōchō (1261-1264)","Bun-ei (1264-1275)","Kenji (1275-1278)","Kōan (1278-1288)","Shōō (1288-1293)","Einin (1293-1299)","Shōan (1299-1302)","Kengen (1302-1303)","Kagen (1303-1306)","Tokuji (1306-1308)","Enkei (1308-1311)","Ōchō (1311-1312)","Shōwa (1312-1317)","Bunpō (1317-1319)","Genō (1319-1321)","Genkyō (1321-1324)","Shōchū (1324-1326)","Kareki (1326-1329)","Gentoku (1329-1331)","Genkō (1331-1334)","Kemmu (1334-1336)","Engen (1336-1340)","Kōkoku (1340-1346)","Shōhei (1346-1370)","Kentoku (1370-1372)","Bunchũ (1372-1375)","Tenju (1375-1379)","Kōryaku (1379-1381)","Kōwa (1381-1384)","Genchũ (1384-1392)","Meitoku (1384-1387)","Kakei (1387-1389)","Kōō (1389-1390)","Meitoku (1390-1394)","Ōei (1394-1428)","Shōchō (1428-1429)","Eikyō (1429-1441)","Kakitsu (1441-1444)","Bun-an (1444-1449)","Hōtoku (1449-1452)","Kyōtoku (1452-1455)","Kōshō (1455-1457)","Chōroku (1457-1460)","Kanshō (1460-1466)","Bunshō (1466-1467)","Ōnin (1467-1469)","Bunmei (1469-1487)","Chōkyō (1487-1489)","Entoku (1489-1492)","Meiō (1492-1501)","Bunki (1501-1504)","Eishō (1504-1521)","Taiei (1521-1528)","Kyōroku (1528-1532)","Tenmon (1532-1555)","Kōji (1555-1558)","Eiroku (1558-1570)","Genki (1570-1573)","Tenshō (1573-1592)","Bunroku (1592-1596)","Keichō (1596-1615)","Genwa (1615-1624)","Kan-ei (1624-1644)","Shōho (1644-1648)","Keian (1648-1652)","Shōō (1652-1655)","Meiryaku (1655-1658)","Manji (1658-1661)","Kanbun (1661-1673)","Enpō (1673-1681)","Tenwa (1681-1684)","Jōkyō (1684-1688)","Genroku (1688-1704)","Hōei (1704-1711)","Shōtoku (1711-1716)","Kyōhō (1716-1736)","Genbun (1736-1741)","Kanpō (1741-1744)","Enkyō (1744-1748)","Kan-en (1748-1751)","Hōryaku (1751-1764)","Meiwa (1764-1772)","An-ei (1772-1781)","Tenmei (1781-1789)","Kansei (1789-1801)","Kyōwa (1801-1804)","Bunka (1804-1818)","Bunsei (1818-1830)","Tenpō (1830-1844)","Kōka (1844-1848)","Kaei (1848-1854)","Ansei (1854-1860)","Man-en (1860-1861)","Bunkyū (1861-1864)","Genji (1864-1865)","Keiō (1865-1868)","M","T","S","H","Bunchū (1372-1375)","Genchū (1384-1392)","Meiji","Taishō","Shōwa","Heisei","Farvardin","Ordibehesht","Khordad","Tir","Mordad","Shahrivar","Mehr","Aban","Azar","Dey","Bahman","Esfand","AP","Before R.O.C.","Minguo","latn","{number}","-{number}","{currency}{number}","-{currency}{number}","{number}%","-{number}%",".",",","NaN","%","∞","US$","¥","A$","R$","CA$","CN¥","€","£","HK$","₪","₹","₩","MX$","NZ$","฿","NT$","₫","FCFA","EC$","CFA","CFPF","{weekday} {day} {month} {year}, {hour}:{minute}:{second}","{weekday} {day} {month} {year}, {hour}:{minute}:{second} {ampm}","{weekday} {day} {month} {year}","{day}/{month}/{year}","{day}/{month}","{number} {currency}","-{number} {currency}","$","{day} {month} {year}","{day} {month}","P","𐐖","𐐙","𐐣","𐐁","𐐂","𐐝","𐐉","𐐤","𐐔","𐐖𐐰𐑌","𐐙𐐯𐐺","𐐣𐐪𐑉","𐐁𐐹𐑉","𐐣𐐩","𐐖𐐭𐑌","𐐖𐐭𐑊","𐐂𐑀","𐐝𐐯𐐹","𐐉𐐿𐐻","𐐤𐐬𐑂","𐐔𐐨𐑅","𐐖𐐰𐑌𐐷𐐭𐐯𐑉𐐨","𐐙𐐯𐐺𐑉𐐭𐐯𐑉𐐨","𐐣𐐪𐑉𐐽","𐐁𐐹𐑉𐐮𐑊","𐐖𐐭𐑊𐐴","𐐂𐑀𐐲𐑅𐐻","𐐝𐐯𐐹𐐻𐐯𐑋𐐺𐐲𐑉","𐐉𐐿𐐻𐐬𐐺𐐲𐑉","𐐤𐐬𐑂𐐯𐑋𐐺𐐲𐑉","𐐔𐐨𐑅𐐯𐑋𐐺𐐲𐑉","𐐝𐐲𐑌","𐐣𐐲𐑌","𐐓𐐭𐑆","𐐎𐐯𐑌","𐐛𐐲𐑉","𐐙𐑉𐐴","𐐝𐐰𐐻","𐐝𐐲𐑌𐐼𐐩","𐐣𐐲𐑌𐐼𐐩","𐐓𐐭𐑆𐐼𐐩","𐐎𐐯𐑌𐑆𐐼𐐩","𐐛𐐲𐑉𐑆𐐼𐐩","𐐙𐑉𐐴𐐼𐐩","𐐝𐐰𐐻𐐲𐑉𐐼𐐩","𐐒","𐐈","𐐒𐐗","𐐈𐐔","𐐒𐐲𐑁𐐬𐑉 𐐗𐑉𐐴𐑅𐐻","𐐈𐑌𐐬 𐐔𐐱𐑋𐐮𐑌𐐨","𐐈𐐣","𐐑𐐣","Nfk","GB£","{weekday}, {day} {month} {year} {hour}:{minute}:{second}","{weekday}, {day} {month} {year} {hour}:{minute}:{second} {ampm}","{weekday}, {day} {month} {year}","1","2","3","4","5","6","7","8","9","10","11","12","am","pm","AU$","GH₵","D","{weekday}, {day} {month}, {year}, {hour}:{minute}:{second}","{weekday}, {day} {month}, {year}, {hour}:{minute}:{second} {ampm}","{weekday}, {day} {month}, {year}","{day} {month}, {year}","Bunchū","Genchū","a.m.","p.m.","{weekday} {day} {month}, {year}, {hour}:{minute}:{second}","{weekday} {day} {month}, {year}, {hour}:{minute}:{second} {ampm}","{weekday} {day} {month}, {year}","{currency} {number}","-{currency} {number}","Ksh","R","Ar","MOP$","{weekday}, {day} {month} {year}, {hour}:{minute}:{second}","{weekday}, {day} {month} {year}, {hour}:{minute}:{second} {ampm}","Rs","MK","₦","K","₱","RF","SR","Le","NAf.","E","T$","TSh","USh","VT","WS$","{year}/{month}/{day}"," "],b=[];b[0]=[[a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12]],{weekday:a[13],month:a[13],day:a[14],year:a[14],hour:a[14],minute:a[15],second:a[15],pattern:a[16],pattern12:a[17]},{weekday:a[13],month:a[13],day:a[14],year:a[14],pattern:a[18]},{month:a[13],day:a[14],year:a[14],pattern:a[19]},{month:a[14],day:a[14],year:a[14],pattern:a[20]},{month:a[14],year:a[14],pattern:a[21]},{month:a[13],year:a[14],pattern:a[22]},{month:a[13],day:a[14],pattern:a[23]},{month:a[14],day:a[14],pattern:a[24]},{hour:a[14],minute:a[15],second:a[15],pattern:a[25],pattern12:a[26]},{hour:a[14],minute:a[15],pattern:a[27],pattern12:a[28]},[a[29]],[a[30],a[31],a[32],a[33],a[34],a[35],a[36],a[37],a[38],a[39],a[40],a[41]],[a[42],a[43],a[44],a[45],a[46],a[47],a[48],a[49],a[50],a[51],a[52],a[53]],[a[54],a[55],a[56],a[57],a[58],a[59],a[60],a[61],a[62],a[63],a[64],a[65],a[66]],[a[67],a[68]],[a[69],a[70],a[71],a[72],a[73],a[74],a[75],a[76],a[77],a[78],a[79],a[80],a[81]],[a[67]],[a[82],a[83],a[84],a[85],a[86],a[87],a[88],a[89],a[90],a[91],a[92],a[93]],[a[94],a[95],a[96],a[97],a[98],a[99],a[100],a[101],a[102],a[103],a[104],a[105]],[a[106],a[107],a[108],a[109],a[98],a[110],a[111],a[112],a[113],a[114],a[115],a[116]],[a[117],a[118],a[119],a[120],a[121],a[122],a[123]],[a[124],a[125],a[126],a[127],a[128],a[129],a[130]],[a[131],a[132],a[133],a[134],a[135],a[136],a[137]],[a[138],a[139]],[a[140],a[141],a[142],a[143]],[a[144],a[145],a[146],a[147]],{am:a[148],pm:a[149]},[a[150],a[151],a[152],a[153],a[154],a[155],a[156],a[157],a[158],a[159],a[160],a[161],a[162],a[163]],[a[148]],[a[164],a[165],a[166],a[167],a[168],a[169],a[170],a[171],a[172],a[173],a[174],a[175]],[a[176]],[a[177],a[178],a[179],a[180],a[181],a[182],a[183],a[184],a[185],a[186],a[187],a[188]],[a[189],a[190],a[191],a[192],a[193],a[194],a[195],a[196],a[197],a[198],a[199],a[200]],[a[201]],[a[202],a[203],a[204],a[205],a[206],a[207],a[208],a[209],a[210],a[211],a[212],a[213],a[214],a[215],a[216],a[217],a[218],a[219],a[220],a[221],a[222],a[223],a[224],a[225],a[226],a[227],a[228],a[229],a[230],a[231],a[232],a[233],a[234],a[235],a[236],a[237],a[238],a[239],a[240],a[241],a[242],a[243],a[244],a[245],a[246],a[247],a[248],a[249],a[250],a[251],a[252],a[253],a[254],a[255],a[256],a[257],a[258],a[259],a[260],a[261],a[262],a[263],a[264],a[265],a[266],a[267],a[268],a[269],a[270],a[271],a[272],a[273],a[274],a[275],a[276],a[277],a[278],a[279],a[280],a[281],a[282],a[283],a[284],a[285],a[286],a[287],a[288],a[289],a[290],a[291],a[292],a[293],a[294],a[295],a[296],a[297],a[298],a[299],a[300],a[301],a[302],a[303],a[304],a[305],a[306],a[307],a[308],a[309],a[310],a[311],a[312],a[313],a[314],a[315],a[316],a[317],a[318],a[319],a[320],a[321],a[322],a[323],a[324],a[325],a[326],a[327],a[328],a[329],a[330],a[331],a[332],a[333],a[334],a[335],a[336],a[337],a[338],a[339],a[340],a[341],a[342],a[343],a[344],a[345],a[346],a[347],a[348],a[349],a[350],a[351],a[352],a[353],a[354],a[355],a[356],a[357],a[358],a[359],a[360],a[361],a[362],a[363],a[364],a[365],a[366],a[367],a[368],a[369],a[370],a[371],a[372],a[373],a[374],a[375],a[376],a[377],a[378],a[379],a[380],a[381],a[382],a[383],a[384],a[385],a[386],a[387],a[388],a[389],a[390],a[391],a[392],a[393],a[394],a[395],a[396],a[397],a[398],a[399],a[400],a[401],a[402],a[403],a[404],a[405],a[406],a[407],a[408],a[409],a[410],a[411],a[412],a[413],a[414],a[415],a[416],a[417],a[418],a[419],a[420],a[421],a[422],a[423],a[424],a[425],a[426],a[427],a[428],a[429],a[430],a[431],a[432],a[433],a[434],a[435],a[436],a[437]],[a[202],a[203],a[204],a[205],a[206],a[207],a[208],a[209],a[210],a[211],a[212],a[213],a[214],a[215],a[216],a[217],a[218],a[219],a[220],a[221],a[222],a[223],a[224],a[225],a[226],a[227],a[228],a[229],a[230],a[231],a[232],a[233],a[234],a[235],a[236],a[237],a[238],a[239],a[240],a[241],a[242],a[243],a[244],a[245],a[246],a[247],a[248],a[249],a[250],a[251],a[252],a[253],a[254],a[255],a[256],a[257],a[258],a[259],a[260],a[261],a[262],a[263],a[264],a[265],a[266],a[267],a[268],a[269],a[270],a[271],a[272],a[273],a[274],a[275],a[276],a[277],a[278],a[279],a[280],a[281],a[282],a[283],a[284],a[285],a[286],a[287],a[288],a[289],a[290],a[291],a[292],a[293],a[294],a[295],a[296],a[297],a[298],a[299],a[300],a[301],a[302],a[303],a[304],a[305],a[306],a[307],a[308],a[309],a[310],a[311],a[312],a[313],a[314],a[315],a[316],a[317],a[318],a[319],a[320],a[321],a[322],a[323],a[324],a[325],a[326],a[327],a[328],a[329],a[330],a[331],a[332],a[333],a[334],a[335],a[336],a[337],a[338],a[339],a[340],a[341],a[342],a[343],a[344],a[345],a[346],a[347],a[348],a[349],a[350],a[351],a[352],a[353],a[354],a[355],a[356],a[357],a[358],a[359],a[360],a[361],a[362],a[438],a[364],a[365],a[366],a[439],a[368],a[369],a[370],a[371],a[372],a[373],a[374],a[375],a[376],a[377],a[378],a[379],a[380],a[381],a[382],a[383],a[384],a[385],a[386],a[387],a[388],a[389],a[390],a[391],a[392],a[393],a[394],a[395],a[396],a[397],a[398],a[399],a[400],a[401],a[402],a[403],a[404],a[405],a[406],a[407],a[408],a[409],a[410],a[411],a[412],a[413],a[414],a[415],a[416],a[417],a[418],a[419],a[420],a[421],a[422],a[423],a[424],a[425],a[426],a[427],a[428],a[429],a[430],a[431],a[432],a[433],a[440],a[441],a[442],a[443]],[a[444],a[445],a[446],a[447],a[448],a[449],a[450],a[451],a[452],a[453],a[454],a[455]],[a[456]],[a[457],a[458]],[a[459]],{positivePattern:a[460],negativePattern:a[461]},{positivePattern:a[462],negativePattern:a[463]},{positivePattern:a[464],negativePattern:a[465]},{decimal:a[466],group:a[467],nan:a[468],percent:a[469],infinity:a[470]},{USD:a[471],JPY:a[472],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{weekday:a[13],day:a[14],month:a[13],year:a[14],hour:a[14],minute:a[15],second:a[15],pattern:a[492],pattern12:a[493]},{weekday:a[13],day:a[14],month:a[13],year:a[14],pattern:a[494]},{day:a[14],month:a[14],year:a[14],pattern:a[495]},{day:a[14],month:a[14],pattern:a[496]},{positivePattern:a[497],negativePattern:a[498]},{decimal:a[467],group:a[466],nan:a[468],percent:a[469],infinity:a[470]},{JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{AUD:a[499],USD:a[471],JPY:a[472],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{BBD:a[499],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{BMD:a[499],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{BSD:a[499],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{weekday:a[13],day:a[15],month:a[13],year:a[14],hour:a[14],minute:a[15],second:a[15],pattern:a[492],pattern12:a[493]},{weekday:a[13],day:a[15],month:a[13],year:a[14],pattern:a[494]},{day:a[15],month:a[13],year:a[14],pattern:a[500]},{day:a[15],month:a[15],year:a[14],pattern:a[495]},{month:a[15],year:a[14],pattern:a[21]},{day:a[15],month:a[13],pattern:a[501]},{day:a[15],month:a[15],pattern:a[496]},{BWP:a[502],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{BZD:a[499],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{CAD:a[499],USD:a[471],JPY:a[472],AUD:a[473],BRL:a[474],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{AUD:a[499],JPY:a[472],USD:a[499],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{NZD:a[499],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},[a[503],a[504],a[505],a[506],a[505],a[503],a[503],a[507],a[508],a[509],a[510],a[511]],[a[512],a[513],a[514],a[515],a[516],a[517],a[518],a[519],a[520],a[521],a[522],a[523]],[a[524],a[525],a[526],a[527],a[516],a[517],a[528],a[529],a[530],a[531],a[532],a[533]],[a[534],a[535],a[536],a[537],a[538],a[539],a[540]],[a[541],a[542],a[543],a[544],a[545],a[546],a[547]],[a[548],a[549]],[a[550],a[551],a[142],a[143]],[a[552],a[553],a[146],a[147]],{am:a[554],pm:a[555]},{USD:a[499],JPY:a[472],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{ERN:a[556],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{FJD:a[499],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{FKP:a[478],GBP:a[557],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{weekday:a[13],day:a[14],month:a[13],year:a[14],hour:a[14],minute:a[15],second:a[15],pattern:a[558],pattern12:a[559]},{weekday:a[13],day:a[14],month:a[13],year:a[14],pattern:a[560]},{day:a[14],month:a[13],year:a[14],pattern:a[500]},{day:a[14],month:a[13],pattern:a[501]},[a[561],a[562],a[563],a[564],a[565],a[566],a[567],a[568],a[569],a[570],a[571],a[572]],{am:a[573],pm:a[574]},{AUD:a[575],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],USD:a[499],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491],JPY:a[472]},{GHS:a[576],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{GBP:a[557],GIP:a[478],USD:a[471],JPY:a[472],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{GMD:a[577],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{GYD:a[499],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{weekday:a[13],day:a[14],month:a[13],year:a[14],hour:a[14],minute:a[15],second:a[15],pattern:a[578],pattern12:a[579]},{weekday:a[13],day:a[14],month:a[13],year:a[14],pattern:a[580]},{day:a[14],month:a[13],year:a[14],pattern:a[581]},[a[202],a[203],a[204],a[205],a[206],a[207],a[208],a[209],a[210],a[211],a[212],a[213],a[214],a[215],a[216],a[217],a[218],a[219],a[220],a[221],a[222],a[223],a[224],a[225],a[226],a[227],a[228],a[229],a[230],a[231],a[232],a[233],a[234],a[235],a[236],a[237],a[238],a[239],a[240],a[241],a[242],a[243],a[244],a[245],a[246],a[247],a[248],a[249],a[250],a[251],a[252],a[253],a[254],a[255],a[256],a[257],a[258],a[259],a[260],a[261],a[262],a[263],a[264],a[265],a[266],a[267],a[268],a[269],a[270],a[271],a[272],a[273],a[274],a[275],a[276],a[277],a[278],a[279],a[280],a[281],a[282],a[283],a[284],a[285],a[286],a[287],a[288],a[289],a[290],a[291],a[292],a[293],a[294],a[295],a[296],a[297],a[298],a[299],a[300],a[301],a[302],a[303],a[304],a[305],a[306],a[307],a[308],a[309],a[310],a[311],a[312],a[313],a[314],a[315],a[316],a[317],a[318],a[319],a[320],a[321],a[322],a[323],a[324],a[325],a[326],a[327],a[328],a[329],a[330],a[331],a[332],a[333],a[334],a[335],a[336],a[337],a[338],a[339],a[340],a[341],a[342],a[343],a[344],a[345],a[346],a[347],a[348],a[349],a[350],a[351],a[352],a[353],a[354],a[355],a[356],a[357],a[358],a[359],a[360],a[361],a[362],a[582],a[364],a[365],a[366],a[583],a[368],a[369],a[370],a[371],a[372],a[373],a[374],a[375],a[376],a[377],a[378],a[379],a[380],a[381],a[382],a[383],a[384],a[385],a[386],a[387],a[388],a[389],a[390],a[391],a[392],a[393],a[394],a[395],a[396],a[397],a[398],a[399],a[400],a[401],a[402],a[403],a[404],a[405],a[406],a[407],a[408],a[409],a[410],a[411],a[412],a[413],a[414],a[415],a[416],a[417],a[418],a[419],a[420],a[421],a[422],a[423],a[424],a[425],a[426],a[427],a[428],a[429],a[430],a[431],a[432],a[433],a[440],a[441],a[442],a[443]],{HKD:a[499],USD:a[471],JPY:a[472],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{am:a[584],pm:a[585]},{weekday:a[13],day:a[14],month:a[13],year:a[14],hour:a[14],minute:a[15],second:a[15],pattern:a[586],pattern12:a[587]},{weekday:a[13],day:a[14],month:a[13],year:a[14],pattern:a[588]},{positivePattern:a[589],negativePattern:a[590]},{JMD:a[499],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{KES:a[591],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{KYD:a[499],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{LRD:a[499],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{ZAR:a[592],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{MGA:a[593],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{MOP:a[594],USD:a[471],JPY:a[472],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{weekday:a[13],day:a[15],month:a[13],year:a[14],hour:a[14],minute:a[15],second:a[15],pattern:a[595],pattern12:a[596]},{weekday:a[13],day:a[15],month:a[13],year:a[14],pattern:a[560]},{GBP:a[557],USD:a[471],JPY:a[472],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{MUR:a[597],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{MWK:a[598],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{NAD:a[499],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{NGN:a[599],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{day:a[14],month:a[15],year:a[14],pattern:a[495]},{NZD:a[499],USD:a[471],JPY:a[472],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{PGK:a[600],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{PHP:a[601],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{PKR:a[597],USD:a[471],JPY:a[472],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{RWF:a[602],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{SBD:a[499],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{SCR:a[603],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{SGD:a[499],USD:a[471],JPY:a[472],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{GBP:a[557],SHP:a[478],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{SLL:a[604],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{GBP:a[557],SSP:a[478],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{ANG:a[605],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{SZL:a[606],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{TOP:a[607],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{TTD:a[499],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{TZS:a[608],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{UGX:a[609],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{VUV:a[610],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{WST:a[611],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{year:a[14],month:a[15],day:a[15],pattern:a[612]},{month:a[15],day:a[15],pattern:a[24]},{decimal:a[467],group:a[613],nan:a[468],percent:a[469],infinity:a[470]},{ZMW:a[600],JPY:a[472],USD:a[499],AUD:a[473],BRL:a[474],CAD:a[475],CNY:a[476],EUR:a[477],GBP:a[478],HKD:a[479],ILS:a[480],INR:a[481],KRW:a[482],MXN:a[483],NZD:a[484],THB:a[485],TWD:a[486],VND:a[487],XAF:a[488],XCD:a[489],XOF:a[490],XPF:a[491]},{weekday:a[13],day:a[15],month:a[13],year:a[14],hour:a[14],minute:a[15],second:a[15],pattern:a[578],pattern12:a[579]},{weekday:a[13],day:a[15],month:a[13],year:a[14],pattern:a[580]},{day:a[15],month:a[13],year:a[14],pattern:a[581]}];
b[1]=[[b[0][1],b[0][2],b[0][3],b[0][4],b[0][5],b[0][6],b[0][7],b[0][8],b[0][9],b[0][10]],{"short":b[0][11]},{"short":b[0][12],"long":b[0][13]},{"long":b[0][14]},{"short":b[0][15]},{"long":b[0][16]},{"short":b[0][17]},{"long":b[0][18]},{"short":b[0][19],"long":b[0][20]},{narrow:b[0][21],"short":b[0][22],"long":b[0][23]},{narrow:b[0][24],"short":b[0][25],"long":b[0][26]},{"long":b[0][28]},{"short":b[0][29]},{"long":b[0][30]},{"short":b[0][31]},{"short":b[0][32],"long":b[0][33]},{"short":b[0][34]},{narrow:b[0][35],"short":b[0][36]},{"long":b[0][37]},{"short":b[0][38]},{"short":b[0][39]},{decimal:b[0][41],currency:b[0][42],percent:b[0][43]},{latn:b[0][44]},[b[0][46],b[0][47],b[0][3],b[0][48],b[0][5],b[0][6],b[0][7],b[0][49],b[0][9],b[0][10]],{decimal:b[0][41],currency:b[0][50],percent:b[0][43]},{latn:b[0][51]},[b[0][1],b[0][2],b[0][3],b[0][48],b[0][5],b[0][6],b[0][7],b[0][8],b[0][9],b[0][10]],[b[0][57],b[0][58],b[0][59],b[0][60],b[0][61],b[0][6],b[0][62],b[0][63],b[0][9],b[0][10]],{narrow:b[0][69],"short":b[0][70],"long":b[0][71]},{narrow:b[0][21],"short":b[0][72],"long":b[0][73]},{narrow:b[0][74],"short":b[0][75],"long":b[0][76]},[b[0][82],b[0][83],b[0][84],b[0][60],b[0][61],b[0][6],b[0][85],b[0][63],b[0][9],b[0][10]],{narrow:b[0][86],"short":b[0][86],"long":b[0][86]},{narrow:b[0][86],"short":b[0][30],"long":b[0][30]},{narrow:b[0][86],"short":b[0][32],"long":b[0][33]},[b[0][93],b[0][94],b[0][95],b[0][48],b[0][5],b[0][6],b[0][7],b[0][8],b[0][9],b[0][10]],{narrow:b[0][35],"short":b[0][96]},[b[0][99],b[0][100],b[0][3],b[0][48],b[0][5],b[0][6],b[0][7],b[0][8],b[0][9],b[0][10]],{decimal:b[0][41],currency:b[0][101],percent:b[0][43],secondaryGroupSize:2},[b[0][1],b[0][2],b[0][3],b[0][4],b[0][5],b[0][6],b[0][7],b[0][49],b[0][9],b[0][10]],[b[0][109],b[0][110],b[0][59],b[0][4],b[0][5],b[0][6],b[0][62],b[0][8],b[0][9],b[0][10]],[b[0][1],b[0][2],b[0][3],b[0][116],b[0][5],b[0][6],b[0][7],b[0][49],b[0][9],b[0][10]],[b[0][109],b[0][110],b[0][59],b[0][136],b[0][5],b[0][6],b[0][62],b[0][137],b[0][9],b[0][10]],{latn:b[0][138]},[b[0][140],b[0][141],b[0][142],b[0][48],b[0][5],b[0][6],b[0][62],b[0][49],b[0][9],b[0][10]]];b[2]=[{eras:b[1][1]},{months:b[1][2]},{months:b[1][3],eras:b[1][4]},{months:b[1][5],eras:b[1][4]},{eras:b[1][6]},{months:b[1][7],eras:b[1][4]},{months:b[1][8],days:b[1][9],eras:b[1][10],dayPeriods:b[0][27]},{months:b[1][11],eras:b[1][12]},{months:b[1][13],eras:b[1][14]},{months:b[1][15],eras:b[1][16]},{eras:b[1][17]},{months:b[1][18],eras:b[1][19]},{eras:b[1][20]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][45]},{nu:b[0][40],patterns:b[1][24],symbols:b[1][25],currencies:b[0][52]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][52]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][53]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][54]},{nu:b[0][40],patterns:b[1][24],symbols:b[1][25],currencies:b[0][45]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][55]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][56]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][64]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][65]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][66]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][67]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][68]},{months:b[1][28],days:b[1][29],eras:b[1][30],dayPeriods:b[0][77]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][78]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][79]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][80]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][81]},{months:b[1][32]},{months:b[1][8],days:b[1][9],eras:b[1][10],dayPeriods:b[0][87]},{months:b[1][33],eras:b[1][14]},{months:b[1][34],eras:b[1][16]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][88]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][89]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][90]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][91]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][92]},{eras:b[1][36]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][97]},{months:b[1][8],days:b[1][9],eras:b[1][10],dayPeriods:b[0][98]},{nu:b[0][40],patterns:b[1][38],symbols:b[1][22],currencies:b[0][45]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][102]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][103]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][104]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][105]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][106]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][107]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][108]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][111]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][112]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][113]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][114]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][115]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][117]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][118]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][119]},{nu:b[0][40],patterns:b[1][38],symbols:b[1][22],currencies:b[0][120]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][121]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][122]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][123]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][124]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][125]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][126]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][127]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][128]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][129]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][130]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][131]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][132]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][133]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][134]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][135]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][43],currencies:b[0][106]},{nu:b[0][40],patterns:b[1][21],symbols:b[1][22],currencies:b[0][139]}];b[3]=[{buddhist:b[2][0],chinese:b[2][1],coptic:b[2][2],ethiopic:b[2][3],ethioaa:b[2][4],generic:b[2][5],gregory:b[2][6],hebrew:b[2][7],indian:b[2][8],islamic:b[2][9],japanese:b[2][10],persian:b[2][11],roc:b[2][12]},{buddhist:b[2][0],chinese:b[2][1],coptic:b[2][2],ethiopic:b[2][3],ethioaa:b[2][4],generic:b[2][5],gregory:b[2][26],hebrew:b[2][7],indian:b[2][8],islamic:b[2][9],japanese:b[2][10],persian:b[2][11],roc:b[2][12]},{buddhist:b[2][0],chinese:b[2][31],coptic:b[2][2],ethiopic:b[2][3],ethioaa:b[2][4],generic:b[2][5],gregory:b[2][32],hebrew:b[2][7],indian:b[2][33],islamic:b[2][34],japanese:b[2][10],persian:b[2][11],roc:b[2][12]},{buddhist:b[2][0],chinese:b[2][1],coptic:b[2][2],ethiopic:b[2][3],ethioaa:b[2][4],generic:b[2][5],gregory:b[2][6],hebrew:b[2][7],indian:b[2][8],islamic:b[2][9],japanese:b[2][40],persian:b[2][11],roc:b[2][12]},{buddhist:b[2][0],chinese:b[2][1],coptic:b[2][2],ethiopic:b[2][3],ethioaa:b[2][4],generic:b[2][5],gregory:b[2][42],hebrew:b[2][7],indian:b[2][8],islamic:b[2][9],japanese:b[2][10],persian:b[2][11],roc:b[2][12]}];b[4]=[{ca:b[0][0],hourNo0:true,hour12:true,formats:b[1][0],calendars:b[3][0]},{ca:b[0][0],hourNo0:true,hour12:false,formats:b[1][23],calendars:b[3][0]},{ca:b[0][0],hourNo0:true,hour12:true,formats:b[1][26],calendars:b[3][0]},{ca:b[0][0],hourNo0:true,hour12:true,formats:b[1][27],calendars:b[3][0]},{ca:b[0][0],hourNo0:true,hour12:false,formats:b[1][27],calendars:b[3][0]},{ca:b[0][0],hourNo0:true,hour12:true,formats:b[1][0],calendars:b[3][1]},{ca:b[0][0],hourNo0:true,hour12:false,formats:b[1][31],calendars:b[3][2]},{ca:b[0][0],hourNo0:true,hour12:true,formats:b[1][35],calendars:b[3][3]},{ca:b[0][0],hourNo0:true,hour12:true,formats:b[1][23],calendars:b[3][4]},{ca:b[0][0],hourNo0:true,hour12:true,formats:b[1][37],calendars:b[3][0]},{ca:b[0][0],hourNo0:true,hour12:true,formats:b[1][39],calendars:b[3][0]},{ca:b[0][0],hourNo0:true,hour12:true,formats:b[1][40],calendars:b[3][0]},{ca:b[0][0],hourNo0:true,hour12:true,formats:b[1][41],calendars:b[3][0]},{ca:b[0][0],hourNo0:true,hour12:true,formats:b[1][42],calendars:b[3][0]},{ca:b[0][0],hourNo0:true,hour12:true,formats:b[1][44],calendars:b[3][0]}];b[5]=[{date:b[4][0],number:b[2][13]},{date:b[4][1],number:b[2][14]},{date:b[4][0],number:b[2][15]},{date:b[4][2],number:b[2][16]},{date:b[4][0],number:b[2][17]},{date:b[4][1],number:b[2][18]},{date:b[4][0],number:b[2][19]},{date:b[4][0],number:b[2][20]},{date:b[4][3],number:b[2][21]},{date:b[4][4],number:b[2][22]},{date:b[4][0],number:b[2][23]},{date:b[4][0],number:b[2][24]},{date:b[4][0],number:b[2][25]},{date:b[4][5],number:b[2][27]},{date:b[4][0],number:b[2][28]},{date:b[4][0],number:b[2][29]},{date:b[4][0],number:b[2][30]},{date:b[4][6],number:b[2][35]},{date:b[4][0],number:b[2][36]},{date:b[4][0],number:b[2][37]},{date:b[4][0],number:b[2][38]},{date:b[4][0],number:b[2][39]},{date:b[4][7],number:b[2][41]},{date:b[4][8],number:b[2][15]},{date:b[4][9],number:b[2][43]},{date:b[4][10],number:b[2][44]},{date:b[4][0],number:b[2][45]},{date:b[4][0],number:b[2][46]},{date:b[4][0],number:b[2][47]},{date:b[4][0],number:b[2][48]},{date:b[4][0],number:b[2][49]},{date:b[4][0],number:b[2][50]},{date:b[4][11],number:b[2][51]},{date:b[4][0],number:b[2][52]},{date:b[4][0],number:b[2][53]},{date:b[4][0],number:b[2][54]},{date:b[4][0],number:b[2][55]},{date:b[4][12],number:b[2][56]},{date:b[4][0],number:b[2][57]},{date:b[4][0],number:b[2][58]},{date:b[4][0],number:b[2][59]},{date:b[4][0],number:b[2][60]},{date:b[4][0],number:b[2][61]},{date:b[4][0],number:b[2][62]},{date:b[4][0],number:b[2][63]},{date:b[4][0],number:b[2][64]},{date:b[4][0],number:b[2][65]},{date:b[4][0],number:b[2][66]},{date:b[4][0],number:b[2][67]},{date:b[4][0],number:b[2][68]},{date:b[4][0],number:b[2][69]},{date:b[4][0],number:b[2][70]},{date:b[4][0],number:b[2][71]},{date:b[4][0],number:b[2][72]},{date:b[4][0],number:b[2][73]},{date:b[4][0],number:b[2][74]},{date:b[4][13],number:b[2][75]},{date:b[4][0],number:b[2][76]},{date:b[4][14],number:b[2][15]}];addLocaleData(b[5][0],"en-001");addLocaleData(b[5][1],"en-150");addLocaleData(b[5][2],"en-AG");addLocaleData(b[5][2],"en-AI");addLocaleData(b[5][2],"en-AS");addLocaleData(b[5][3],"en-AU");addLocaleData(b[5][4],"en-BB");addLocaleData(b[5][5],"en-BE");addLocaleData(b[5][6],"en-BM");addLocaleData(b[5][7],"en-BS");addLocaleData(b[5][8],"en-BW");addLocaleData(b[5][9],"en-BZ");addLocaleData(b[5][10],"en-CA");addLocaleData(b[5][11],"en-CC");addLocaleData(b[5][12],"en-CK");addLocaleData(b[5][2],"en-CM");addLocaleData(b[5][11],"en-CX");addLocaleData(b[5][2],"en-DG");addLocaleData(b[5][2],"en-DM");addLocaleData(b[5][2],"en-Dsrt-US");addLocaleData(b[5][13],"en-Dsrt");addLocaleData(b[5][14],"en-ER");addLocaleData(b[5][15],"en-FJ");addLocaleData(b[5][16],"en-FK");addLocaleData(b[5][2],"en-FM");addLocaleData(b[5][17],"en-GB");addLocaleData(b[5][2],"en-GD");addLocaleData(b[5][2],"en-GG");addLocaleData(b[5][18],"en-GH");addLocaleData(b[5][19],"en-GI");addLocaleData(b[5][20],"en-GM");addLocaleData(b[5][2],"en-GU");addLocaleData(b[5][21],"en-GY");addLocaleData(b[5][22],"en-HK");addLocaleData(b[5][23],"en-IE");addLocaleData(b[5][2],"en-IM");addLocaleData(b[5][24],"en-IN");addLocaleData(b[5][2],"en-IO");addLocaleData(b[5][2],"en-JE");addLocaleData(b[5][25],"en-JM");addLocaleData(b[5][26],"en-KE");addLocaleData(b[5][11],"en-KI");addLocaleData(b[5][2],"en-KN");addLocaleData(b[5][27],"en-KY");addLocaleData(b[5][2],"en-LC");addLocaleData(b[5][28],"en-LR");addLocaleData(b[5][29],"en-LS");addLocaleData(b[5][30],"en-MG");addLocaleData(b[5][2],"en-MH");addLocaleData(b[5][31],"en-MO");addLocaleData(b[5][2],"en-MP");addLocaleData(b[5][2],"en-MS");addLocaleData(b[5][32],"en-MT");addLocaleData(b[5][33],"en-MU");addLocaleData(b[5][34],"en-MW");addLocaleData(b[5][35],"en-NA");addLocaleData(b[5][11],"en-NF");addLocaleData(b[5][36],"en-NG");addLocaleData(b[5][11],"en-NR");addLocaleData(b[5][12],"en-NU");addLocaleData(b[5][37],"en-NZ");addLocaleData(b[5][38],"en-PG");addLocaleData(b[5][39],"en-PH");addLocaleData(b[5][40],"en-PK");addLocaleData(b[5][12],"en-PN");addLocaleData(b[5][2],"en-PR");addLocaleData(b[5][2],"en-PW");addLocaleData(b[5][41],"en-RW");addLocaleData(b[5][42],"en-SB");addLocaleData(b[5][43],"en-SC");addLocaleData(b[5][2],"en-SD");addLocaleData(b[5][44],"en-SG");addLocaleData(b[5][45],"en-SH");addLocaleData(b[5][46],"en-SL");addLocaleData(b[5][47],"en-SS");addLocaleData(b[5][48],"en-SX");addLocaleData(b[5][49],"en-SZ");addLocaleData(b[5][2],"en-TC");addLocaleData(b[5][12],"en-TK");addLocaleData(b[5][50],"en-TO");addLocaleData(b[5][51],"en-TT");addLocaleData(b[5][11],"en-TV");addLocaleData(b[5][52],"en-TZ");addLocaleData(b[5][53],"en-UG");addLocaleData(b[5][2],"en-UM");addLocaleData(b[5][2],"en-US");addLocaleData(b[5][2],"en-VC");addLocaleData(b[5][2],"en-VG");addLocaleData(b[5][2],"en-VI");addLocaleData(b[5][54],"en-VU");addLocaleData(b[5][55],"en-WS");addLocaleData(b[5][56],"en-ZA");addLocaleData(b[5][57],"en-ZM");addLocaleData(b[5][58],"en-ZW");addLocaleData(b[5][2],"en")})();return Intl});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
/**
 * i18n Translations
 *
 * Translate text content into our available translations using
 * the i18n standard.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.receive = receive;

var _dispatcherAppDispatcherJs = require('../dispatcher/AppDispatcher.js');

var _constantsJWConstantsJs = require('../constants/JWConstants.js');

// Load all loop data

function receive(translations) {
  (0, _dispatcherAppDispatcherJs.dispatch)({
    type: _constantsJWConstantsJs.ActionTypes.I18N_RECEIVE,
    translations: translations
  });
}


},{"../constants/JWConstants.js":38,"../dispatcher/AppDispatcher.js":39}],9:[function(require,module,exports){
// Create a Walk
//
// Form for creating new walks. Includes a map builder, team builder, scheduler
//

// Load create-a-walk View components
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaultProps(defaultProps, props) { if (defaultProps) { for (var propName in defaultProps) { if (typeof props[propName] === 'undefined') { props[propName] = defaultProps[propName]; } } } return props; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _cawImageUploadJsx = require('./caw/ImageUpload.jsx');

var _cawImageUploadJsx2 = _interopRequireDefault(_cawImageUploadJsx);

var _cawThemeSelectJsx = require('./caw/ThemeSelect.jsx');

var _cawThemeSelectJsx2 = _interopRequireDefault(_cawThemeSelectJsx);

var _cawMapBuilderJsx = require('./caw/MapBuilder.jsx');

var _cawMapBuilderJsx2 = _interopRequireDefault(_cawMapBuilderJsx);

var _cawDateSelectJsx = require('./caw/DateSelect.jsx');

var _cawDateSelectJsx2 = _interopRequireDefault(_cawDateSelectJsx);

var _cawWardSelectJsx = require('./caw/WardSelect.jsx');

var _cawWardSelectJsx2 = _interopRequireDefault(_cawWardSelectJsx);

var _cawAccessibleSelectJsx = require('./caw/AccessibleSelect.jsx');

var _cawAccessibleSelectJsx2 = _interopRequireDefault(_cawAccessibleSelectJsx);

var _cawTeamBuilderJsx = require('./caw/TeamBuilder.jsx');

var _cawTeamBuilderJsx2 = _interopRequireDefault(_cawTeamBuilderJsx);

var _cawWalkPublishJsx = require('./caw/WalkPublish.jsx');

var _cawWalkPublishJsx2 = _interopRequireDefault(_cawWalkPublishJsx);

var _TextAreaLimitJsx = require('./TextAreaLimit.jsx');

var _TextAreaLimitJsx2 = _interopRequireDefault(_TextAreaLimitJsx);

// Flux
var I18nStore = require('../stores/I18nStore.js');
var t = I18nStore.getTranslate();
var t2 = I18nStore.getTranslatePlural();
var I18nActions = require('../actions/I18nActions.js');

// Helpers
var Helper = require('../helpers/helpers.jsx');

var CreateWalk = (function (_React$Component) {
  _inherits(CreateWalk, _React$Component);

  function CreateWalk(props) {
    _classCallCheck(this, CreateWalk);

    _get(Object.getPrototypeOf(CreateWalk.prototype), 'constructor', this).call(this);
    var data = props.data;
    // TODO: move this into its own model js
    // Keep these defaults to type, ie don't pre-seed data here, aside from
    // data loaded by passing it in
    var walk = {
      name: '',
      shortDescription: '',
      longDescription: '',
      accessibleInfo: '',
      accessibleTransit: '',
      accessibleParking: '',
      accessibleFind: '',
      map: {
        markers: [],
        route: []
      },
      team: [{
        id: -1,
        type: 'you',
        "name-first": '',
        "name-last": '',
        role: 'walk-leader',
        primary: 'on',
        bio: '',
        twitter: '',
        facebook: '',
        website: '',
        email: '',
        phone: ''
      }],
      time: { type: '', slots: [] },
      thumbnails: [],
      wards: '',
      checkboxes: {},
      notifications: [],
      mirrors: {},
      url: props.url
    };

    // Convert old {0: marker, 1: marker} indexing to a proper array
    if (data) {
      // Convert markers
      if (data.map && !Array.isArray(data.map.markers)) {
        data.map.markers = Helper.objectToArray(data.map.markers);
      }
      // Convert routes
      if (data.map && !Array.isArray(data.map.route)) {
        data.map.route = Helper.objectToArray(data.map.route);
      }
      // Convert time slots
      if (data.time && !Array.isArray(data.time.slots)) {
        data.time.slots = Helper.objectToArray(data.time.slots);
      }
      // Turn all 'false' values into empty strings
      for (var i in data) {
        if (data[i] === false) {
          data[i] = '';
        } else if (data[i] === null) {
          // Clear out 'nulls' so we instead take their state from defaults
          delete data[i];
        }
      }

      // Init the leader as creator, if none set
      data.team = data.team || [];
      if (data.team.length === 0) {
        var user = props.user;
        data.team = [{
          type: 'you',
          "name-first": user.firstName,
          "name-last": user.lastName,
          role: 'walk-leader',
          primary: 'on',
          bio: user.bio,
          twitter: user.twitter,
          facebook: user.facebook,
          website: user.website,
          email: user.email,
          phone: ''
        }];
      }
      Object.assign(walk, data);
    }

    this.state = walk;
  }

  // Mixins

  _createClass(CreateWalk, [{
    key: 'saveWalk',
    value: function saveWalk(options, cb) {
      var _this = this;

      // TODO: separate the notifications logic
      /* Send in the updated walk to save, but keep working */
      var notifications = this.state.notifications.slice();
      var removeNotice = function removeNotice() {
        var notifications = _this.state.notifications.slice();
        _this.setState({ notifications: notifications.slice(1) });
      };

      var defaultOptions = {
        messageTimeout: 1200
      };
      options = Object.assign({}, defaultOptions, options);

      notifications.push({ type: 'info', name: 'Saving walk' });

      // Build a simplified map from the Google objects
      this.setState({
        map: this.refs.mapBuilder.getStateSimple(),
        notifications: notifications
      }, function () {
        $.ajax({
          url: _this.state.url,
          type: options.publish ? 'PUT' : 'POST',
          data: { json: JSON.stringify(_this.state) },
          dataType: 'json',
          success: (function (data) {
            var notifications = this.state.notifications.slice();
            notifications.push({ type: 'success', name: 'Walk saved' });
            this.setState({ notifications: notifications, url: data.url || this.state.url }, function () {
              if (cb && cb instanceof Function) {
                // The 'this' in each callback should be the <CreateWalk>
                cb.call(this);
              }
            });
            setTimeout(removeNotice, 1200);
          }).bind(_this),
          error: (function (xhr, status, err) {
            var notifications = this.state.notifications.slice();
            notifications.push({ type: 'danger', name: 'Walk failed to save', message: 'Keep this window open and contact Jane\'s Walk for assistance' });
            this.setState({ notifications: notifications });
            setTimeout(removeNotice, 6000);
            console.error(this.url, status, err.toString());
          }).bind(_this)
        });
      });
      setTimeout(removeNotice, 1200);
    }
  }, {
    key: 'handleNext',
    value: function handleNext() {
      // Bootstrap's managing the tabs, so trigger a jQuery click on the next
      var next = $('#progress-panel > .nav > li.active + li > a');
      window.scrollTo(0, 0);
      if (next.length) {
        this.saveWalk();
        next.trigger('click');
      } else {
        // If no 'next' tab, next step is to publish
        $(React.findDOMNode(this.refs.publish)).trigger('click');
      }
    }
  }, {
    key: 'handleSave',
    value: function handleSave() {
      this.saveWalk();
    }
  }, {
    key: 'handlePublish',
    value: function handlePublish() {
      this.saveWalk({ publish: true }, function () {
        return console.log('Walk published');
      });
    }
  }, {
    key: 'handlePreview',
    value: function handlePreview(e) {
      var _this2 = this;

      this.saveWalk({}, function () {
        return _this2.setState({ preview: true });
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      I18nStore.addChangeListener(this._onChange.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      I18nStore.removeChangeListener(this._onChange.bind(this));
    }

    // Simple trigger to re-render the components
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState({});
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      // Used to let the map pass a callback
      var linkStateMap = {
        value: this.state.map,
        requestChange: function requestChange(newVal, cb) {
          _this3.setState({ map: newVal }, cb);
        }
      };

      return {
        $$typeof: _typeofReactElement,
        type: 'main',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'section',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'nav',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'ul',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'li',
                        key: null,
                        ref: null,
                        props: {
                          children: {
                            $$typeof: _typeofReactElement,
                            type: 'a',
                            key: null,
                            ref: null,
                            props: {
                              children: [{
                                $$typeof: _typeofReactElement,
                                type: 'i',
                                key: null,
                                ref: null,
                                props: {
                                  className: 'fa fa-list-ol'
                                },
                                _owner: null
                              }, t('Describe Your Walk')],
                              'data-toggle': 'tab',
                              className: 'description',
                              href: '#description'
                            },
                            _owner: null
                          },
                          className: 'active'
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'li',
                        key: null,
                        ref: null,
                        props: {
                          children: {
                            $$typeof: _typeofReactElement,
                            type: 'a',
                            key: null,
                            ref: null,
                            props: {
                              children: [{
                                $$typeof: _typeofReactElement,
                                type: 'i',
                                key: null,
                                ref: null,
                                props: {
                                  className: 'fa fa-map-marker'
                                },
                                _owner: null
                              }, t('Share Your Route')],
                              'data-toggle': 'tab',
                              className: 'route',
                              href: '#route'
                            },
                            _owner: null
                          }
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'li',
                        key: null,
                        ref: null,
                        props: {
                          children: {
                            $$typeof: _typeofReactElement,
                            type: 'a',
                            key: null,
                            ref: null,
                            props: {
                              children: [{
                                $$typeof: _typeofReactElement,
                                type: 'i',
                                key: null,
                                ref: null,
                                props: {
                                  className: 'fa fa-calendar'
                                },
                                _owner: null
                              }, t('Set the Time & Date')],
                              'data-toggle': 'tab',
                              className: 'time-and-date',
                              href: '#time-and-date'
                            },
                            _owner: null
                          }
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'li',
                        key: null,
                        ref: null,
                        props: {
                          children: {
                            $$typeof: _typeofReactElement,
                            type: 'a',
                            key: null,
                            ref: null,
                            props: {
                              children: [{
                                $$typeof: _typeofReactElement,
                                type: 'i',
                                key: null,
                                ref: null,
                                props: {
                                  className: 'fa fa-flag'
                                },
                                _owner: null
                              }, t('Make it Accessible')],
                              'data-toggle': 'tab',
                              className: 'accessibility',
                              href: '#accessibility'
                            },
                            _owner: null
                          }
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'li',
                        key: null,
                        ref: null,
                        props: {
                          children: {
                            $$typeof: _typeofReactElement,
                            type: 'a',
                            key: null,
                            ref: null,
                            props: {
                              children: [{
                                $$typeof: _typeofReactElement,
                                type: 'i',
                                key: null,
                                ref: null,
                                props: {
                                  className: 'fa fa-users'
                                },
                                _owner: null
                              }, t('Build Your Team')],
                              'data-toggle': 'tab',
                              className: 'team',
                              href: '#team'
                            },
                            _owner: null
                          }
                        },
                        _owner: null
                      }],
                      className: 'nav nav-tabs'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'section',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'button',
                        key: null,
                        ref: null,
                        props: {
                          children: t('Preview Walk'),
                          className: 'btn btn-info btn-preview',
                          id: 'preview-walk',
                          title: 'Preview what you have so far.',
                          onClick: this.handlePreview
                        },
                        _owner: null
                      }, React.createElement(
                        'button',
                        { className: 'btn btn-info btn-submit', id: 'btn-submit', title: 'Publishing will make your visible to all.', onClick: (function () {
                            this.setState({ publish: true });
                          }).bind(this), ref: 'publish' },
                        t('Publish Walk')
                      ), {
                        $$typeof: _typeofReactElement,
                        type: 'button',
                        key: null,
                        ref: null,
                        props: {
                          children: t('Save'),
                          className: 'btn btn-info save',
                          title: 'Save',
                          id: 'btn-save',
                          onClick: this.handleSave
                        },
                        _owner: null
                      }],
                      id: 'button-group'
                    },
                    _owner: null
                  }],
                  id: 'progress-panel'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'div',
                        key: null,
                        ref: null,
                        props: {
                          children: [{
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              children: [{
                                $$typeof: _typeofReactElement,
                                type: 'div',
                                key: null,
                                ref: null,
                                props: {
                                  children: {
                                    $$typeof: _typeofReactElement,
                                    type: 'img',
                                    key: null,
                                    ref: null,
                                    props: {
                                      id: 'convo-marker',
                                      src: CCM_THEME_PATH + '/img/jw-intro-graphic.svg',
                                      alt: 'Jane\'s Walks are walking conversations.'
                                    },
                                    _owner: null
                                  },
                                  className: 'col-md-4'
                                },
                                _owner: null
                              }, {
                                $$typeof: _typeofReactElement,
                                type: 'div',
                                key: null,
                                ref: null,
                                props: {
                                  children: [{
                                    $$typeof: _typeofReactElement,
                                    type: 'h1',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: t('Hey there, %s!', this.props.user.firstName)
                                    },
                                    _owner: null
                                  }, {
                                    $$typeof: _typeofReactElement,
                                    type: 'p',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: t('Jane’s Walks are walking conversations about neighbourhoods. You can return to this form at any time, so there\'s no need to finish everything at once.')
                                    },
                                    _owner: null
                                  }],
                                  className: 'col-md-8'
                                },
                                _owner: null
                              }],
                              className: 'walk-submit lead clearfix'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              children: {
                                $$typeof: _typeofReactElement,
                                type: 'h1',
                                key: null,
                                ref: null,
                                props: {
                                  children: t('Describe Your Walk')
                                },
                                _owner: null
                              },
                              className: 'page-header',
                              'data-section': 'description'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'form',
                            key: null,
                            ref: null,
                            props: {
                              children: {
                                $$typeof: _typeofReactElement,
                                type: 'fieldset',
                                key: null,
                                ref: null,
                                props: {
                                  children: {
                                    $$typeof: _typeofReactElement,
                                    type: 'div',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [{
                                        $$typeof: _typeofReactElement,
                                        type: 'label',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: t('Walk Title'),
                                          htmlFor: 'title'
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'div',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: t('Something short and memorable.'),
                                          className: 'alert alert-info'
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'input',
                                        key: null,
                                        ref: null,
                                        props: {
                                          type: 'text',
                                          valueLink: this.linkState('title')
                                        },
                                        _owner: null
                                      }],
                                      className: 'item required'
                                    },
                                    _owner: null
                                  }
                                },
                                _owner: null
                              }
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: _cawImageUploadJsx2['default'],
                            key: null,
                            ref: null,
                            props: _defaultProps(_cawImageUploadJsx2['default'].defaultProps, {
                              valueLink: this.linkState('thumbnails'),
                              valt: this.props.valt
                            }),
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'form',
                            key: null,
                            ref: null,
                            props: {
                              children: [{
                                $$typeof: _typeofReactElement,
                                type: 'hr',
                                key: null,
                                ref: null,
                                props: {},
                                _owner: null
                              }, {
                                $$typeof: _typeofReactElement,
                                type: 'fieldset',
                                key: null,
                                ref: null,
                                props: {
                                  children: [{
                                    $$typeof: _typeofReactElement,
                                    type: 'div',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [{
                                        $$typeof: _typeofReactElement,
                                        type: 'label',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: t('Your Walk in a Nutshell'),
                                          htmlFor: 'shortdescription'
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'div',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: t('Build intrigue! This is what people see when browsing our walk listings.'),
                                          className: 'alert alert-info'
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: _TextAreaLimitJsx2['default'],
                                        key: null,
                                        ref: null,
                                        props: _defaultProps(_TextAreaLimitJsx2['default'].defaultProps, {
                                          id: 'shortdescription',
                                          name: 'shortdescription',
                                          rows: '6',
                                          maxLength: '140',
                                          valueLink: this.linkState('shortDescription'),
                                          required: true
                                        }),
                                        _owner: null
                                      }],
                                      className: 'item required'
                                    },
                                    _owner: null
                                  }, {
                                    $$typeof: _typeofReactElement,
                                    type: 'hr',
                                    key: null,
                                    ref: null,
                                    props: {},
                                    _owner: null
                                  }, {
                                    $$typeof: _typeofReactElement,
                                    type: 'div',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [{
                                        $$typeof: _typeofReactElement,
                                        type: 'label',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: t('Walk Description'),
                                          htmlFor: 'longdescription',
                                          id: 'longwalkdescription'
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'div',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: t('Help jump start the conversation on your walk by giving readers an idea of the discussions you\'ll be having on the walk together. We suggest including a couple of questions to get people thinking about how they can contribute to the dialog on the walk. To keep this engaging, we recommend keeping your description to 200 words.'),
                                          className: 'alert alert-info'
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'textarea',
                                        key: null,
                                        ref: null,
                                        props: {
                                          id: 'longdescription',
                                          name: 'longdescription',
                                          rows: '14',
                                          valueLink: this.linkState('longDescription')
                                        },
                                        _owner: null
                                      }],
                                      className: 'item required'
                                    },
                                    _owner: null
                                  }]
                                },
                                _owner: null
                              }, {
                                $$typeof: _typeofReactElement,
                                type: _cawThemeSelectJsx2['default'],
                                key: null,
                                ref: null,
                                props: _defaultProps(_cawThemeSelectJsx2['default'].defaultProps, {
                                  valueLink: this.linkState('checkboxes')
                                }),
                                _owner: null
                              }, (this.props.city.wards || []).length > 0 ? {
                                $$typeof: _typeofReactElement,
                                type: _cawWardSelectJsx2['default'],
                                key: null,
                                ref: null,
                                props: _defaultProps(_cawWardSelectJsx2['default'].defaultProps, {
                                  wards: this.props.city.wards,
                                  valueLink: this.linkState('wards')
                                }),
                                _owner: null
                              } : null, {
                                $$typeof: _typeofReactElement,
                                type: 'hr',
                                key: null,
                                ref: null,
                                props: {},
                                _owner: null
                              }]
                            },
                            _owner: null
                          }],
                          className: 'tab-pane active',
                          id: 'description'
                        },
                        _owner: null
                      }, React.createElement(_cawMapBuilderJsx2['default'], { ref: 'mapBuilder', valueLink: linkStateMap, city: this.props.city }), {
                        $$typeof: _typeofReactElement,
                        type: _cawDateSelectJsx2['default'],
                        key: null,
                        ref: null,
                        props: _defaultProps(_cawDateSelectJsx2['default'].defaultProps, {
                          valueLink: this.linkState('time')
                        }),
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'div',
                        key: null,
                        ref: null,
                        props: {
                          children: [{
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              children: {
                                $$typeof: _typeofReactElement,
                                type: 'h1',
                                key: null,
                                ref: null,
                                props: {
                                  children: t('Make it Accessible')
                                },
                                _owner: null
                              },
                              className: 'page-header',
                              'data-section': 'accessibility'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              children: {
                                $$typeof: _typeofReactElement,
                                type: _cawAccessibleSelectJsx2['default'],
                                key: null,
                                ref: null,
                                props: _defaultProps(_cawAccessibleSelectJsx2['default'].defaultProps, {
                                  valueLink: this.linkState('checkboxes')
                                }),
                                _owner: null
                              },
                              className: 'item'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              children: {
                                $$typeof: _typeofReactElement,
                                type: 'fieldset',
                                key: null,
                                ref: null,
                                props: {
                                  children: [{
                                    $$typeof: _typeofReactElement,
                                    type: 'legend',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [t('What else do people need to know about the accessibility of this walk?'), ' (', t('Optional'), ')']
                                    },
                                    _owner: null
                                  }, {
                                    $$typeof: _typeofReactElement,
                                    type: _TextAreaLimitJsx2['default'],
                                    key: null,
                                    ref: null,
                                    props: _defaultProps(_TextAreaLimitJsx2['default'].defaultProps, {
                                      name: 'accessible-info',
                                      rows: '3',
                                      maxLength: '500',
                                      valueLink: this.linkState('accessibleInfo')
                                    }),
                                    _owner: null
                                  }]
                                },
                                _owner: null
                              },
                              className: 'item'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              children: {
                                $$typeof: _typeofReactElement,
                                type: 'fieldset',
                                key: null,
                                ref: null,
                                props: {
                                  children: [{
                                    $$typeof: _typeofReactElement,
                                    type: 'legend',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [t('How can someone get to the meeting spot by public transit?'), ' (', t('Optional'), ')'],
                                      id: 'transit'
                                    },
                                    _owner: null
                                  }, {
                                    $$typeof: _typeofReactElement,
                                    type: 'div',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: t('Nearest subway stop, closest bus or streetcar lines, etc.'),
                                      className: 'alert alert-info'
                                    },
                                    _owner: null
                                  }, {
                                    $$typeof: _typeofReactElement,
                                    type: 'textarea',
                                    key: null,
                                    ref: null,
                                    props: {
                                      rows: '3',
                                      name: 'accessible-transit',
                                      valueLink: this.linkState('accessibleTransit')
                                    },
                                    _owner: null
                                  }]
                                },
                                _owner: null
                              },
                              className: 'item'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              children: {
                                $$typeof: _typeofReactElement,
                                type: 'fieldset',
                                key: null,
                                ref: null,
                                props: {
                                  children: [{
                                    $$typeof: _typeofReactElement,
                                    type: 'legend',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [t('Where are the nearest places to park?'), ' (', t('Optional'), ')']
                                    },
                                    _owner: null
                                  }, {
                                    $$typeof: _typeofReactElement,
                                    type: 'textarea',
                                    key: null,
                                    ref: null,
                                    props: {
                                      rows: '3',
                                      name: 'accessible-parking',
                                      valueLink: this.linkState('accessibleParking')
                                    },
                                    _owner: null
                                  }]
                                },
                                _owner: null
                              },
                              className: 'item'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              children: {
                                $$typeof: _typeofReactElement,
                                type: 'fieldset',
                                key: null,
                                ref: null,
                                props: {
                                  children: [{
                                    $$typeof: _typeofReactElement,
                                    type: 'legend',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: t('How will people find you?'),
                                      className: 'required-legend'
                                    },
                                    _owner: null
                                  }, {
                                    $$typeof: _typeofReactElement,
                                    type: 'div',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: t('Perhaps you will be holding a sign, wearing a special t-shirt or holding up an object that relates to the theme of your walk. Whatever it is, let people know how to identify you.'),
                                      className: 'alert alert-info'
                                    },
                                    _owner: null
                                  }, {
                                    $$typeof: _typeofReactElement,
                                    type: 'textarea',
                                    key: null,
                                    ref: null,
                                    props: {
                                      rows: '3',
                                      name: 'accessible-find',
                                      valueLink: this.linkState('accessibleFind')
                                    },
                                    _owner: null
                                  }]
                                },
                                _owner: null
                              },
                              className: 'item'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'hr',
                            key: null,
                            ref: null,
                            props: {},
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'br',
                            key: null,
                            ref: null,
                            props: {},
                            _owner: null
                          }],
                          className: 'tab-pane',
                          id: 'accessibility'
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: _cawTeamBuilderJsx2['default'],
                        key: null,
                        ref: null,
                        props: _defaultProps(_cawTeamBuilderJsx2['default'].defaultProps, {
                          onChange: function (v) {
                            return _this3.setState({ team: v });
                          },
                          value: this.state.team
                        }),
                        _owner: null
                      }],
                      className: 'tab-content'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'button',
                    key: null,
                    ref: null,
                    props: {
                      children: 'Next',
                      type: 'button',
                      onClick: this.handleNext,
                      className: 'btn'
                    },
                    _owner: null
                  }],
                  id: 'main-panel',
                  role: 'main'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'aside',
                key: null,
                ref: null,
                props: {
                  children: {
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'h3',
                        key: null,
                        ref: null,
                        props: {
                          children: [{
                            $$typeof: _typeofReactElement,
                            type: 'i',
                            key: null,
                            ref: null,
                            props: {
                              className: 'fa fa-envelope'
                            },
                            _owner: null
                          }, t('Contact City Organizer for help')],
                          className: 'popover-title',
                          'data-toggle': 'collapse',
                          'data-target': '#popover-content'
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'div',
                        key: null,
                        ref: null,
                        props: {
                          children: [this.props.city.cityOrganizer.photo ? {
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              className: 'u-avatar',
                              style: { backgroundImage: 'url(' + this.props.city.cityOrganizer.photo + ')' }
                            },
                            _owner: null
                          } : null, {
                            $$typeof: _typeofReactElement,
                            type: 'p',
                            key: null,
                            ref: null,
                            props: {
                              children: [t('Hi! I\'m %s, the City Organizer for Jane\'s Walk %s. I\'m here to help, so if you have any questions, please', this.props.city.cityOrganizer.firstName, this.props.city.name), ' ', {
                                $$typeof: _typeofReactElement,
                                type: 'strong',
                                key: null,
                                ref: null,
                                props: {
                                  children: {
                                    $$typeof: _typeofReactElement,
                                    type: 'a',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [t('email me'), '!'],
                                      href: 'mailto:' + this.props.city.cityOrganizer.email
                                    },
                                    _owner: null
                                  }
                                },
                                _owner: null
                              }]
                            },
                            _owner: null
                          }],
                          className: 'popover-content collapse in',
                          id: 'popover-content'
                        },
                        _owner: null
                      }],
                      className: 'popover right',
                      id: 'city-organizer',
                      style: { display: 'block' }
                    },
                    _owner: null
                  },
                  id: 'tips-panel',
                  role: 'complementary'
                },
                _owner: null
              }]
            },
            _owner: null
          }, this.state.publish ? {
            $$typeof: _typeofReactElement,
            type: _cawWalkPublishJsx2['default'],
            key: null,
            ref: null,
            props: _defaultProps(_cawWalkPublishJsx2['default'].defaultProps, {
              url: this.state.url,
              saveWalk: this.saveWalk.bind(this),
              close: this.setState.bind(this, { publish: false }),
              city: this.props.city,
              mirrors: this.state.mirrors
            }),
            _owner: null
          } : null, this.state.preview ? {
            $$typeof: _typeofReactElement,
            type: WalkPreview,
            key: null,
            ref: null,
            props: _defaultProps(WalkPreview.defaultProps, {
              url: this.state.url,
              close: this.setState.bind(this, { preview: false })
            }),
            _owner: null
          } : null, {
            $$typeof: _typeofReactElement,
            type: 'aside',
            key: null,
            ref: null,
            props: {
              children: this.state.notifications.map(function (note) {
                return {
                  $$typeof: _typeofReactElement,
                  type: 'div',
                  key: note.message,
                  ref: null,
                  props: {
                    children: [{
                      $$typeof: _typeofReactElement,
                      type: 'strong',
                      key: null,
                      ref: null,
                      props: {
                        children: [note.name || '', ': ']
                      },
                      _owner: null
                    }, note.message || ''],
                    className: 'alert alert-' + note.type
                  },
                  _owner: null
                };
              }),
              id: 'notifications'
            },
            _owner: null
          }],
          id: 'create-walk'
        },
        _owner: null
      };
    }
  }]);

  return CreateWalk;
})(React.Component);

exports['default'] = CreateWalk;
Object.assign(CreateWalk.prototype, React.addons.LinkedStateMixin), (function (_React$Component2) {
  _inherits(WalkPreview, _React$Component2);

  function WalkPreview() {
    _classCallCheck(this, WalkPreview);

    _get(Object.getPrototypeOf(WalkPreview.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(WalkPreview, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this4 = this;

      var el = React.findDOMNode(this);
      // Bootstrap Modal
      $(el).modal();
      // Close the modal when modal closes
      $(el).bind('hidden.bs.modal', function () {
        return _this4.props.close();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return {
        $$typeof: _typeofReactElement,
        type: 'dialog',
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: {
                $$typeof: _typeofReactElement,
                type: 'article',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'header',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'button',
                        key: null,
                        ref: null,
                        props: {
                          children: '×',
                          type: 'button',
                          className: 'close',
                          'aria-hidden': 'true',
                          'data-dismiss': 'modal'
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'h3',
                        key: null,
                        ref: null,
                        props: {
                          children: t('Preview of your Walk')
                        },
                        _owner: null
                      }]
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: {
                        $$typeof: _typeofReactElement,
                        type: 'iframe',
                        key: null,
                        ref: null,
                        props: {
                          src: this.props.url,
                          frameBorder: '0'
                        },
                        _owner: null
                      },
                      className: 'modal-body'
                    },
                    _owner: null
                  }]
                },
                _owner: null
              }
            },
            _owner: null
          },
          id: 'preview-modal'
        },
        _owner: null
      };
    }
  }]);

  return WalkPreview;
})(React.Component);
module.exports = exports['default'];


},{"../actions/I18nActions.js":8,"../helpers/helpers.jsx":40,"../stores/I18nStore.js":43,"./TextAreaLimit.jsx":13,"./caw/AccessibleSelect.jsx":16,"./caw/DateSelect.jsx":17,"./caw/ImageUpload.jsx":18,"./caw/MapBuilder.jsx":19,"./caw/TeamBuilder.jsx":20,"./caw/ThemeSelect.jsx":21,"./caw/WalkPublish.jsx":22,"./caw/WardSelect.jsx":23}],10:[function(require,module,exports){
'use strict';
/**
* The dialogue to share on facebook
* 
* @public
* @param  Object shareObj
* @return void
*/
var FacebookShareDialog = function FacebookShareDialog(shareObj) {
  this._shareObj = shareObj;
  this._shareObj.method = 'feed';
};
Object.defineProperties(FacebookShareDialog.prototype, {
  /**
   * _shareObj
   * 
   * @protected
   * @var       Object (default: null)
   */
  _shareObj: { value: null, writable: true },

  /**
   * show
   * 
   * @public
   * @param  Function failed
   * @param  Function successful
   * @return void
   */
  show: {
    value: function value(failed, successful) {
      var _this = this;
      FB.ui(this._shareObj, function (response) {
        if (response !== undefined) {
          if (response === null) {
            if (failed) failed();
          } else {
            if (successful) successful();
          }
        }
      });
    }
  }
});

module.exports = FacebookShareDialog;


},{}],11:[function(require,module,exports){
// TODO: link to the i18n
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function t(str) {
  var args = Array.from(arguments);
  return args.shift().replace(/%(s|d)/g, function () {
    return args.shift();
  });
}

var Message = function Message(props) {
  return {
    $$typeof: _typeofReactElement,
    type: 'div',
    key: null,
    ref: null,
    props: {
      children: [props.msg, props.error],
      className: 'alert alert-' + (props.success ? 'info' : 'danger')
    },
    _owner: null
  };
};

/**
 * The 'login' modal that comes up on standard login, not to be confused
 * with the login page.
 */

var Login = (function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login() {
    _classCallCheck(this, Login);

    _get(Object.getPrototypeOf(Login.prototype), 'constructor', this).call(this);
    this.state = {
      email: '',
      password: '',
      maintainLogin: false,
      message: {}
    };
    this.handleReset = this.handleReset.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeMaintainLogin = this.handleChangeMaintainLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _createClass(Login, [{
    key: 'handleReset',
    value: function handleReset(ev) {
      var _this = this;

      // Post a reset request to the c5 endpoint for resets
      $.ajax({
        type: 'POST',
        url: CCM_REL + '/login/forgot_password',
        data: {
          uEmail: this.state.email,
          uName: this.state.email,
          format: 'JSON'
        },
        dataType: 'json',
        success: function success(data) {
          return _this.setState({ message: data });
        }
      });
    }
  }, {
    key: 'handleChangeEmail',
    value: function handleChangeEmail(ev) {
      this.setState({ email: ev.target.value });
    }
  }, {
    key: 'handleChangePassword',
    value: function handleChangePassword(ev) {
      this.setState({ password: ev.target.value });
    }
  }, {
    key: 'handleChangeMaintainLogin',
    value: function handleChangeMaintainLogin(ev) {
      this.setState({ maintainLogin: ev.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(ev) {
      var _this2 = this;

      ev.preventDefault();
      // Post the login to the c5 endpoint for logins
      $.ajax({
        type: 'POST',
        url: CCM_REL + '/login/do_login',
        data: {
          uEmail: this.state.email,
          uName: this.state.email,
          uPassword: this.state.password,
          uMaintainLogin: this.state.maintainLogin,
          format: 'JSON'
        },
        dataType: 'json',
        success: function success(data) {
          _this2.setState({ message: data }, function () {
            if (data.success === 1) {
              if (_this2.props.redirectURL) {
                window.location.replace(_this2.props.redirectURL);
              } else {
                window.location.reload();
              }
            }
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var message = undefined;
      if (Number.isInteger(this.state.message.success)) {
        message = React.createElement(Message, this.state.message);
      }

      return {
        $$typeof: _typeofReactElement,
        type: 'dialog',
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: {
                $$typeof: _typeofReactElement,
                type: 'article',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'header',
                    key: null,
                    ref: null,
                    props: {
                      children: {
                        $$typeof: _typeofReactElement,
                        type: 'h3',
                        key: null,
                        ref: null,
                        props: {
                          children: t('Sign in to %s', 'Jane\'s Walk'),
                          className: 'form-lead'
                        },
                        _owner: null
                      }
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'form',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'section',
                        key: null,
                        ref: null,
                        props: {
                          dangerouslySetInnerHTML: { __html: this.props.socialLogin }
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'section',
                        key: null,
                        ref: null,
                        props: {
                          children: [{
                            $$typeof: _typeofReactElement,
                            type: 'h4',
                            key: null,
                            ref: null,
                            props: {
                              children: t('or, log-in using your email & password')
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'label',
                            key: null,
                            ref: null,
                            props: {
                              children: [t('Email'), React.createElement('input', { type: 'text', name: 'uEmail', id: 'uEmail', ref: 'uEmail', value: this.state.email, onChange: this.handleChangeEmail, className: 'ccm-input-text input-large' })],
                              htmlFor: 'uEmail'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'label',
                            key: null,
                            ref: null,
                            props: {
                              children: [t('Password'), {
                                $$typeof: _typeofReactElement,
                                type: 'input',
                                key: null,
                                ref: null,
                                props: {
                                  type: 'password',
                                  name: 'uPassword',
                                  id: 'uPassword',
                                  value: this.state.password,
                                  onChange: this.handleChangePassword,
                                  className: 'ccm-input-text input-large'
                                },
                                _owner: null
                              }],
                              htmlFor: 'uPassword'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'label',
                            key: null,
                            ref: null,
                            props: {
                              children: [{
                                $$typeof: _typeofReactElement,
                                type: 'input',
                                key: null,
                                ref: null,
                                props: {
                                  type: 'checkbox',
                                  name: 'uMaintainLogin',
                                  checked: this.maintainLogin,
                                  onChange: this.handleChangeMaintainLogin
                                },
                                _owner: null
                              }, ' ', t('Keep me signed in.')]
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'a',
                            key: null,
                            ref: null,
                            props: {
                              children: t('Request a new password'),
                              onClick: this.handleReset
                            },
                            _owner: null
                          }]
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'footer',
                        key: null,
                        ref: null,
                        props: {
                          children: [message, {
                            $$typeof: _typeofReactElement,
                            type: 'a',
                            key: null,
                            ref: null,
                            props: {
                              children: t('Register for a new account.'),
                              href: CCM_REL + '/register?uEmail=' + this.state.email
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'input',
                            key: null,
                            ref: null,
                            props: {
                              type: 'submit',
                              className: 'btn ccm-input-submit',
                              id: 'submit',
                              value: t('Go!')
                            },
                            _owner: null
                          }]
                        },
                        _owner: null
                      }],
                      rel: 'form',
                      method: 'post',
                      onSubmit: this.handleSubmit
                    },
                    _owner: null
                  }]
                },
                _owner: null
              }
            },
            _owner: null
          },
          id: 'login'
        },
        _owner: null
      };
    }
  }]);

  return Login;
})(React.Component);

exports['default'] = Login;
module.exports = exports['default'];


},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ViewJsx = require('./View.jsx');

var _ViewJsx2 = _interopRequireDefault(_ViewJsx);

/**
 * Basic View info for a regular ol' page
 * 
 * @param  jQuery element
 * @return void
 */

var PageView = (function (_View) {
  _inherits(PageView, _View);

  function PageView(element) {
    _classCallCheck(this, PageView);

    _get(Object.getPrototypeOf(PageView.prototype), 'constructor', this).call(this, element);
    this._addNavEvents();
    this._addOverlayCloseEvent();
  }

  /**
   * _addOverlayCloseEvent
   * 
   * @protected
   * @return    void
   */

  _createClass(PageView, [{
    key: '_addOverlayCloseEvent',
    value: function _addOverlayCloseEvent() {
      var _this = this;
      this._element.find('.o-background').click(function (event) {
        _this._element.find('.overlay').hide();
      });
      this._element.find('a.closeModalCta').click(function (event) {
        event.preventDefault();
        _this._element.find('.overlay').hide();
      });
    }

    /**
     * _addNavEvents
     * 
     * @protected
     * @return    void
     */
  }, {
    key: '_addNavEvents',
    value: function _addNavEvents() {
      this._element.find('a.search-open').click(function () {
        $('html, body').animate({
          scrollTop: 0
        }, 300);
        $('body > header').addClass('dropped');

        // If there's a text-field in the drop, move caret to it
        var textInput = document.querySelector('body > header input[type=text]');
        if (textInput) {
          textInput.focus();
        }
      });
      this._element.find('a.search-close').click(function () {
        $('body > header').removeClass('dropped');
      });
    }

    /**
     * _makeGaCall
     * 
     * @protected
     * @param     Array call
     * @return    void
     */
  }, {
    key: '_makeGaCall',
    value: function _makeGaCall(call) {
      _gaq.push(call);
    }

    /**
     * trackCustomVar
     * 
     * @see    http://www.sitepoint.com/google-analytics-custom-variables/
     * @see    http://online-behavior.com/analytics/custom-variables-segmentation
     * @public
     * @param  String index
     * @param  String name
     * @param  String value
     * @param  String scope (optional)
     * @return void
     */
  }, {
    key: 'trackCustomVar',
    value: function trackCustomVar(index, name, value, scope) {
      this._makeGaCall(['_setCustomVar', index, name, value, scope]);
    }

    /**
     * trackEvent
     * 
     * @see    https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
     * @public
     * @param  String category The name you supply for the group of objects you want to track.
     * @param  String action A string that is uniquely paired with each category, and commonly used to define the type of user interaction for the web object.
     * @param  String optLabel (optional) An optional string to provide additional dimensions to the event data.
     * @param  Number optValue (optional) An integer that you can use to provide numerical data about the user event.
     * @param  Boolean override (optional)
     * @return void
     */
  }, {
    key: 'trackEvent',
    value: function trackEvent(category, action, optLabel, optValue, override) {
      var call = ['_trackEvent'];
      if (category !== undefined) {
        call.push(category);
      }
      if (action !== undefined) {
        call.push(action);
      }
      if (optLabel !== undefined) {
        call.push(optLabel);
      }
      if (optValue !== undefined) {
        call.push(optValue);
      }
      this._makeGaCall(call, override);
    }

    /**
     * trackView
     * 
     * @public
     * @param  String path
     * @return void
     */
  }, {
    key: 'trackView',
    value: function trackView(path) {
      this._makeGaCall(['_trackPageview', path]);
    }
  }]);

  return PageView;
})(_ViewJsx2['default']);

exports['default'] = PageView;
module.exports = exports['default'];


},{"./View.jsx":14}],13:[function(require,module,exports){
// Flux
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var t2 = require('../stores/I18nStore.js').getTranslatePlural();

/**
 * Text areas with a 'remaining characters' limit
 */
var TextAreaLimit = function TextAreaLimit(props) {
  return {
    $$typeof: _typeofReactElement,
    type: 'div',
    key: null,
    ref: null,
    props: {
      children: [React.createElement('textarea', props), {
        $$typeof: _typeofReactElement,
        type: 'span',
        key: null,
        ref: null,
        props: {
          children: t2('%s character remaining', '%s characters remaining', props.maxLength - props.valueLink.value.length)
        },
        _owner: null
      }],
      className: 'text-area-limit'
    },
    _owner: null
  };
};

exports['default'] = TextAreaLimit;
module.exports = exports['default'];


},{"../stores/I18nStore.js":43}],14:[function(require,module,exports){
/**
* View constructor
* 
* @public
* @param  jQuery element
* @return void
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = (function () {
  function View(element) {
    _classCallCheck(this, View);

    this._element = element;
  }

  /**
   * getElement
   * 
   * @public
   * @return HTMLFormElement
   */

  _createClass(View, [{
    key: "getElement",
    value: function getElement() {
      return this._element;
    }
  }]);

  return View;
})();

exports["default"] = View;
module.exports = exports["default"];


},{}],15:[function(require,module,exports){
'use strict';

/**
 * WalkMap
 * constructor
 *
 * @param object mapData Input data with {route, markers}
 * @param object DOMElement mapCanvas Target to render the map to
 *
 */

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var WalkMap = function WalkMap(mapData, mapCanvas) {
  // Default to #map-canvas
  this.mapCanvas = mapCanvas;

  // Initialize the map on our canvas
  this.map = new google.maps.Map(mapCanvas, this.mapOptions);

  // Load markers and build as google.maps.Marker
  this.markers = this.buildMarkers(this.buildArray(mapData.markers));
  this.route = this.buildRoute(this.buildArray(mapData.route));

  // Style Map
  this.map.mapTypes.set('map_style', this.styledMap);
  this.map.setMapTypeId('map_style');
  // TODO: Replace hard-coded selectors with ReactJS
  document.querySelector('.walk-stops').style.display = 'block';

  // Center our map after first building it
  this.centerMap();

  // Make the text menu with walk stops linked to the map
  this.addWalkStopMenuEvents();
};

Object.defineProperties(WalkMap.prototype, {
  /* @prop Array Markers on the map */
  markers: {
    value: [],
    writable: true
  },

  /* @prop Array Route the map follows */
  route: {
    value: [],
    writable: true
  },

  /* @prop DOMElement Canvas we'll render to */
  mapCanvas: {
    value: null,
    writable: true
  },

  /* @prop DOMElement of the list of stops you can select */
  stopList: {
    value: null,
    writable: true
  },

  // Static map display options
  mapOptions: {
    value: {
      zoom: 16,
      scrollwheel: false,
      zoomControl: true,
      disableDefaultUI: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    }
  },

  /**
   * styledMap
   * The very verbose styling information for this map
   *
   * @type      StyledMapType
   * @protected
   */
  styledMap: {
    value: new google.maps.StyledMapType([{
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#ffffff" }]
    }, {
      "featureType": "road.arterial",
      "elementType": "labels.text.stroke",
      "stylers": [{ "visibility": "off" }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [{ "visibility": "on" }, { "saturation": -100 }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry.stroke",
      "stylers": [{ "saturation": -100 }]
    }, {
      "featureType": "landscape.natural",
      "stylers": [{ "saturation": -100 }, { "lightness": 36 }]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [{ "visibility": "on" }, { "saturation": 37 }]
    }, {
      "featureType": "landscape.man_made",
      "stylers": [{ "saturation": -100 }]
    }], {
      name: "Styled Map"
    }),
    writable: false,
    enumerable: true,
    configurable: true
  },

  // Map Markers
  mapMarker: { value: new google.maps.MarkerImage(CCM_THEME_PATH + '/images/marker.png') },
  mapMarkerActive: { value: new google.maps.MarkerImage(CCM_THEME_PATH + '/images/marker-active.png') },

  // google map object
  map: {
    value: null,
    writable: true
  },

  // Path of the walk
  walkPath: {
    value: {},
    writable: true
  },

  // The information in the window that pops up
  // TODO: remove this InfoBox and use React w/ InfoWindow
  infobox: {
    value: new InfoBox({
      content: document.getElementById('infobox'),
      maxWidth: 150,
      pixelOffset: new google.maps.Size(-3, -25),
      alignBottom: true,
      boxStyle: {
        background: '#fff',
        width: '280px',
        padding: '10px',
        border: '1px solid #eee'
      },
      closeBoxMargin: '-22px -22px 2px -8px',
      closeBoxURL: CCM_THEME_PATH + '/images/map-close.png',
      infoBoxClearance: new google.maps.Size(20, 20)
    })
  },

  // @param Function Pop up the info box
  showInfoBox: {
    value: function value(marker, i, markerContent) {
      // Set active icon + menu to active, others inactive
      this.markers.forEach((function (mk) {
        if (mk === marker) {
          marker.setIcon(this.mapMarkerActive);
          this.selectWalkStopMenuItem(i);
        } else {
          mk.setIcon(this.mapMarker);
        }
      }).bind(this));

      this.map.panTo(marker.getPosition());

      // FIXME: is there a smarter way to hold both a name and description in
      // the title? We were using a separate array to store them before, which
      // is even worse, but JSON encoding the title is weird. gmaps won't let
      // it be anything but a string.
      this.infobox.setContent(React.renderToStaticMarkup({
        $$typeof: _typeofReactElement,
        type: 'span',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'h4',
            key: null,
            ref: null,
            props: {
              children: JSON.parse(this.markers[i].getTitle()).name
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'p',
            key: null,
            ref: null,
            props: {
              children: JSON.parse(this.markers[i].getTitle()).description
            },
            _owner: null
          }, markerContent]
        },
        _owner: null
      }));
      this.infobox.open(this.map, marker);

      [].forEach.call(document.querySelectorAll('.walk-stops'), function (stop) {
        if (stop.dataset.key == i) {
          stop.classList.add('active');
        } else {
          stop.classList.remove('active');
        }
      });
    }
  },

  /**
   * Data-loading methods
   */
  /**
   * The old JSON had objects used in many places where arrays made more sense
   * This method is for backwards-compatibility to ensure old walks still load
   * @param (Array|Object) collection Either an array or a number-mapped object
   */
  buildArray: {
    value: function value(collection) {
      // Check if it's already an array, and if not it's an obj
      if (Array.isArray(collection)) {
        return collection.slice();
      } else {
        var newArray = [];
        for (var i in collection) {
          newArray[i] = collection[i];
        }
        return newArray;
      }
    }
  },

  // Build you google markers
  // @param Array markers of [{lat, lng}]
  // @return Array [google.maps.Marker]
  buildMarkers: {
    value: function value(markers) {
      return markers.map((function (marker, i) {
        var _this = this;
        var gMarker = new google.maps.Marker({
          position: new google.maps.LatLng(marker.lat, marker.lng),
          map: this.map,
          icon: this.mapMarker,
          title: JSON.stringify({
            name: marker.title,
            description: marker.description
          }),
          id: i
        });

        google.maps.event.addListener(gMarker, 'click', function (ev) {
          _this.showInfoBox(this, i);
        });

        return gMarker;
      }).bind(this));
    }
  },

  // Build your google path
  // @param Array route points [{lat, lng}]
  // @return google.maps.PolyLine
  buildRoute: {
    value: function value(route) {
      // Draw the path based on the route
      var walkPath = new google.maps.Polyline({
        path: route.map(function (rp) {
          return new google.maps.LatLng(rp.lat, rp.lng);
        }),
        strokeColor: '#F16725',
        strokeOpacity: 0.8,
        strokeWeight: 4
      });

      walkPath.setMap(this.map);

      return walkPath;
    }
  },

  // Bind click handlers to our markers
  addWalkStopMenuEvents: {
    value: function value() {
      var _this = this;
      [].forEach.call(document.querySelectorAll('.walk-stop'), function (stopEl, i) {
        stopEl.addEventListener('click', function () {
          if (this.dataset.key == i) {
            google.maps.event.trigger(_this.markers[i], 'click');
          }
        });
      });
    }
  },

  /**
   * Map formatting
   */
  // Center the map based on its contents
  centerMap: {
    value: function value() {
      var bounds = new google.maps.LatLngBounds();
      var totalPlotted = 0;
      this.markers.forEach(function (marker) {
        bounds.extend(marker.getPosition());
        ++totalPlotted;
      });
      this.route.getPath().getArray().forEach(function (pathMark) {
        bounds.extend(pathMark);
        ++totalPlotted;
      });
      if (totalPlotted) {
        this.map.fitBounds(bounds);
      }
      // Zoom out a bit from the centered/zoomed setting
      google.maps.event.addListenerOnce(this.map, 'zoom_changed', (function () {
        var oldZoom = this.map.getZoom();
        this.map.setZoom(Math.min(16, oldZoom));
      }).bind(this));
    }
  },

  selectWalkStopMenuItem: {
    value: function value(i) {
      // Set the marker menu active as well
      [].forEach.call(document.querySelectorAll('.walk-stop'), function (stopEl) {
        if (stopEl.dataset.key == i) {
          stopEl.classList.add('active');
          document.querySelector('.walk-stops-meta').scrollTop = stopEl.offsetTop - 10;
        } else {
          stopEl.classList.remove('active');
        }
      });
    }
  }
});

module.exports = WalkMap;


},{}],16:[function(require,module,exports){
/**
 * Menu to select accessibility requirements
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _helpersMixinsJsx = require('../../helpers/mixins.jsx');

// Flux
var t = require('../../stores/I18nStore.js').getTranslate();

var options = [{ id: 'accessible-familyfriendly', name: t('Family friendly') }, { id: 'accessible-wheelchair', name: t('Wheelchair accessible') }, { id: 'accessible-dogs', name: t('Dogs welcome') }, { id: 'accessible-strollers', name: t('Strollers welcome') }, { id: 'accessible-bicycles', name: t('Bicycles welcome') }, { id: 'accessible-steephills', name: t('Steep hills') }, { id: 'accessible-uneven', name: t('Wear sensible shoes (uneven terrain)') }, { id: 'accessible-busy', name: t('Busy sidewalks') }, { id: 'accessible-bicyclesonly', name: t('Bicycles only') }, { id: 'accessible-lowlight', name: t('Low light or nighttime') }, { id: 'accessible-seniors', name: t('Senior Friendly') }];

var AccessibleSelect = (function (_React$Component) {
  _inherits(AccessibleSelect, _React$Component);

  function AccessibleSelect() {
    _classCallCheck(this, AccessibleSelect);

    _get(Object.getPrototypeOf(AccessibleSelect.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(AccessibleSelect, [{
    key: 'render',
    value: function render() {
      var _this = this;

      return {
        $$typeof: _typeofReactElement,
        type: 'fieldset',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'legend',
            key: null,
            ref: null,
            props: {
              children: t('How accessible is this walk?'),
              className: 'required-legend'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'fieldset',
            key: null,
            ref: null,
            props: {
              children: options.map(function (option) {
                return {
                  $$typeof: _typeofReactElement,
                  type: 'label',
                  key: null,
                  ref: null,
                  props: {
                    children: [{
                      $$typeof: _typeofReactElement,
                      type: 'input',
                      key: null,
                      ref: null,
                      props: {
                        type: 'checkbox',
                        checkedLink: _this.linkParentState(option.id)
                      },
                      _owner: null
                    }, option.name],
                    className: 'checkbox'
                  },
                  _owner: null
                };
              })
            },
            _owner: null
          }],
          id: 'accessibilities'
        },
        _owner: null
      };
    }
  }]);

  return AccessibleSelect;
})(React.Component);

exports['default'] = AccessibleSelect;

Object.assign(AccessibleSelect.prototype, _helpersMixinsJsx.linkedParentState);
module.exports = exports['default'];


},{"../../helpers/mixins.jsx":41,"../../stores/I18nStore.js":43}],17:[function(require,module,exports){
// Components
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _defaultProps(defaultProps, props) { if (defaultProps) { for (var propName in defaultProps) { if (typeof props[propName] === 'undefined') { props[propName] = defaultProps[propName]; } } } return props; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePicker = require('./date/DatePicker.jsx');
var TimePicker = require('./date/TimePicker.jsx');
var TimeSetTable = require('./date/TimeSetTable.jsx');
var TimeOpenTable = require('./date/TimeOpenTable.jsx');

// Flux
var t = require('../../stores/I18nStore.js').getTranslate();

// Default to a 1-hour walk time
var ONE_HOUR = 60 * 60 * 1000;

// TODO: Make 'intiatives' build as separate selectors

var DateSelect = (function (_React$Component) {
  _inherits(DateSelect, _React$Component);

  function DateSelect() {
    _classCallCheck(this, DateSelect);

    _get(Object.getPrototypeOf(DateSelect.prototype), 'constructor', this).call(this);

    var today = new Date();
    var start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 7, 11, 0));

    // Bind class methods
    this.setDay = this._setDay.bind(this);
    this.addDate = this._addDate.bind(this);

    // Note: we're only keeping the 'date' on there to use Date's string
    // parsing. This method is concerned only with the Time
    // TODO: Support proper time localization - ultimately these times are just
    // strings, so we're using GMT, but that's bad practice.
    this.state = { start: start, duration: ONE_HOUR };
  }

  // Load mixins

  _createClass(DateSelect, [{
    key: '_setDay',
    value: function _setDay(date) {
      var startDate = this.state.start;

      // Set the Day we're choosing
      startDate.setUTCFullYear(date.getUTCFullYear());
      startDate.setUTCMonth(date.getUTCMonth());
      startDate.setUTCDate(date.getUTCDate());

      // Refresh the timepicker
      this.refs.timePicker.setStartTimes(startDate);

      // Update our state
      // FIXME: This is an overly-complex pattern, but done to avoid frequent
      // date rebuilding, which is very slow. See if it can be done through
      // state updates instead.
      this.setState({ start: startDate });
    }

    /**
     * Set the time
     * @param Date time The current time of day
     * @param Int duration Number of minutes the walk lasts
     */
  }, {
    key: 'setTime',
    value: function setTime(time, duration) {
      var startDate = this.state.start;

      startDate.setUTCHours(time.getUTCHours());
      startDate.setUTCMinutes(time.getUTCMinutes());

      this.setState({ start: startDate });
    }

    /**
     * Build a valueLink object for updating the time
     */
  }, {
    key: 'linkTime',
    value: function linkTime() {
      var _this = this;

      return {
        value: this.state.start.getTime(),
        requestChange: function requestChange(value) {
          return _this.setState({ start: new Date(Number(value)) });
        }
      };
    }

    // Push the date we built here to the linked state
  }, {
    key: '_addDate',
    value: function _addDate() {
      var valueLink = this.props.valueLink;
      var value = valueLink.value || {};
      var slots = (value.slots || []).slice();
      var start = this.state.start.getTime();
      var end = start + this.state.duration;

      // Store the timeslot state as seconds, not ms
      slots.push([start / 1000, end / 1000]);

      value.slots = slots;
      valueLink.requestChange(value);
    }
  }, {
    key: 'render',
    value: function render() {
      var valueLink = this.props.valueLink;

      return {
        $$typeof: _typeofReactElement,
        type: 'div',
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: {
                        $$typeof: _typeofReactElement,
                        type: 'h1',
                        key: null,
                        ref: null,
                        props: {
                          children: t('Set the Time and Date')
                        },
                        _owner: null
                      },
                      className: 'page-header',
                      'data-section': 'time-and-date'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'legend',
                    key: null,
                    ref: null,
                    props: {
                      children: t('Pick one of the following:')
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: {
                        $$typeof: _typeofReactElement,
                        type: 'ul',
                        key: null,
                        ref: null,
                        props: {
                          children: [{
                            $$typeof: _typeofReactElement,
                            type: 'li',
                            key: null,
                            ref: null,
                            props: {
                              children: {
                                $$typeof: _typeofReactElement,
                                type: 'a',
                                key: null,
                                ref: null,
                                props: {
                                  children: {
                                    $$typeof: _typeofReactElement,
                                    type: 'div',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [{
                                        $$typeof: _typeofReactElement,
                                        type: 'img',
                                        key: null,
                                        ref: null,
                                        props: {
                                          src: CCM_THEME_PATH + '/img/time-and-date-full.png'
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'div',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: [{
                                            $$typeof: _typeofReactElement,
                                            type: 'div',
                                            key: null,
                                            ref: null,
                                            props: {
                                              children: {
                                                $$typeof: _typeofReactElement,
                                                type: 'h4',
                                                key: null,
                                                ref: null,
                                                props: {
                                                  children: t('By Request')
                                                },
                                                _owner: null
                                              },
                                              className: 'text-center'
                                            },
                                            _owner: null
                                          }, {
                                            $$typeof: _typeofReactElement,
                                            type: 'p',
                                            key: null,
                                            ref: null,
                                            props: {
                                              children: t('Highlight times that you\'re available to lead the walk, or leave your availability open. People will be asked to contact you to set up a walk.')
                                            },
                                            _owner: null
                                          }],
                                          className: 'caption'
                                        },
                                        _owner: null
                                      }],
                                      className: 'thumbnail'
                                    },
                                    _owner: null
                                  },
                                  href: '#time-and-date-all',
                                  'data-toggle': 'tab'
                                },
                                _owner: null
                              }
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'li',
                            key: null,
                            ref: null,
                            props: {
                              children: {
                                $$typeof: _typeofReactElement,
                                type: 'a',
                                key: null,
                                ref: null,
                                props: {
                                  children: {
                                    $$typeof: _typeofReactElement,
                                    type: 'div',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [{
                                        $$typeof: _typeofReactElement,
                                        type: 'img',
                                        key: null,
                                        ref: null,
                                        props: {
                                          src: CCM_THEME_PATH + '/img/time-and-date-some.png'
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'div',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: [{
                                            $$typeof: _typeofReactElement,
                                            type: 'div',
                                            key: null,
                                            ref: null,
                                            props: {
                                              children: {
                                                $$typeof: _typeofReactElement,
                                                type: 'h4',
                                                key: null,
                                                ref: null,
                                                props: {
                                                  children: t('Pick Your Date')
                                                },
                                                _owner: null
                                              },
                                              className: 'text-center'
                                            },
                                            _owner: null
                                          }, {
                                            $$typeof: _typeofReactElement,
                                            type: 'p',
                                            key: null,
                                            ref: null,
                                            props: {
                                              children: t('Set specific dates and times that this walk is happening.')
                                            },
                                            _owner: null
                                          }],
                                          className: 'caption'
                                        },
                                        _owner: null
                                      }],
                                      className: 'thumbnail'
                                    },
                                    _owner: null
                                  },
                                  href: '#time-and-date-set',
                                  'data-toggle': 'tab'
                                },
                                _owner: null
                              }
                            },
                            _owner: null
                          }],
                          className: 'thumbnails',
                          id: 'block-select'
                        },
                        _owner: null
                      },
                      className: 'row'
                    },
                    _owner: null
                  }],
                  className: 'tab-pane hide',
                  id: 'time-and-date-select'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'h1',
                        key: null,
                        ref: null,
                        props: {
                          children: t('Time and Date')
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'p',
                        key: null,
                        ref: null,
                        props: {
                          children: t('Select the date and time your walk is happening.'),
                          className: 'lead'
                        },
                        _owner: null
                      }],
                      className: 'page-header',
                      'data-section': 'time-and-date'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'div',
                        key: null,
                        ref: null,
                        props: {
                          children: {
                            $$typeof: _typeofReactElement,
                            type: DatePicker,
                            key: null,
                            ref: null,
                            props: _defaultProps(DatePicker.defaultProps, {
                              setDay: this.setDay,
                              defaultDate: this.state.start
                            }),
                            _owner: null
                          },
                          className: 'col-md-6'
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'div',
                        key: null,
                        ref: null,
                        props: {
                          children: {
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              children: {
                                $$typeof: _typeofReactElement,
                                type: 'div',
                                key: null,
                                ref: null,
                                props: {
                                  children: [{
                                    $$typeof: _typeofReactElement,
                                    type: 'h4',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [{
                                        $$typeof: _typeofReactElement,
                                        type: 'small',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: [t('Date selected'), ':']
                                        },
                                        _owner: null
                                      }, this.state.start.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' })],
                                      className: 'date-indicate-set'
                                    },
                                    _owner: null
                                  }, {
                                    $$typeof: _typeofReactElement,
                                    type: 'hr',
                                    key: null,
                                    ref: null,
                                    props: {},
                                    _owner: null
                                  }, React.createElement(TimePicker, { ref: 'timePicker', i18n: this.props.i18n, valueLinkDuration: this.linkState('duration'), valueLinkStart: this.linkTime() }), {
                                    $$typeof: _typeofReactElement,
                                    type: 'hr',
                                    key: null,
                                    ref: null,
                                    props: {},
                                    _owner: null
                                  }, {
                                    $$typeof: _typeofReactElement,
                                    type: 'button',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: t('Add Date'),
                                      className: 'btn btn-primary',
                                      id: 'save-date-set',
                                      onClick: this.addDate
                                    },
                                    _owner: null
                                  }],
                                  className: 'caption'
                                },
                                _owner: null
                              },
                              className: 'thumbnail'
                            },
                            _owner: null
                          },
                          className: 'col-md-6'
                        },
                        _owner: null
                      }],
                      className: 'row'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'br',
                    key: null,
                    ref: null,
                    props: {},
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: TimeSetTable,
                    key: null,
                    ref: null,
                    props: _defaultProps(TimeSetTable.defaultProps, {
                      i18n: this.props.i18n,
                      valueLink: valueLink
                    }),
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'hr',
                    key: null,
                    ref: null,
                    props: {},
                    _owner: null
                  }],
                  className: 'tab-pane active',
                  id: 'time-and-date-set'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'h1',
                        key: null,
                        ref: null,
                        props: {
                          children: t('Time and Date')
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'p',
                        key: null,
                        ref: null,
                        props: {
                          children: t('Your availability will be visible to people on your walk page and they’ll be able to send you a walk request.'),
                          className: 'lead'
                        },
                        _owner: null
                      }],
                      className: 'page-header',
                      'data-section': 'time-and-date'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'label',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'input',
                        key: null,
                        ref: null,
                        props: {
                          type: 'checkbox',
                          name: 'open'
                        },
                        _owner: null
                      }, t('Leave my availability open. Allow people to contact you to set up a walk.')],
                      className: 'checkbox'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'br',
                    key: null,
                    ref: null,
                    props: {},
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'div',
                        key: null,
                        ref: null,
                        props: {
                          children: {
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              className: 'date-picker'
                            },
                            _owner: null
                          },
                          className: 'col-md-6'
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'div',
                        key: null,
                        ref: null,
                        props: {
                          children: {
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              children: {
                                $$typeof: _typeofReactElement,
                                type: 'div',
                                key: null,
                                ref: null,
                                props: {
                                  children: [{
                                    $$typeof: _typeofReactElement,
                                    type: 'div',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [{
                                        $$typeof: _typeofReactElement,
                                        type: 'small',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: [t('Date selected'), ':']
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'h4',
                                        key: null,
                                        ref: null,
                                        props: {
                                          className: 'date-indicate-all'
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'hr',
                                        key: null,
                                        ref: null,
                                        props: {},
                                        _owner: null
                                      }],
                                      className: 'date-select-group'
                                    },
                                    _owner: null
                                  }, {
                                    $$typeof: _typeofReactElement,
                                    type: 'label',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [t('Approximate Duration of Walk'), ':'],
                                      htmlFor: 'walk-duration'
                                    },
                                    _owner: null
                                  }, {
                                    $$typeof: _typeofReactElement,
                                    type: 'select',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [{
                                        $$typeof: _typeofReactElement,
                                        type: 'option',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: '30 Minutes',
                                          value: '30 Minutes'
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'option',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: '1 Hour',
                                          value: '1 Hour'
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'option',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: '1 Hour, 30 Minutes',
                                          value: '1 Hour, 30 Minutes'
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'option',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: '2 Hours',
                                          value: '2 Hours'
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'option',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: '2 Hours, 30 Minutes',
                                          value: '2 Hours, 30 Minutes'
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'option',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: '3 Hours',
                                          value: '3 Hours'
                                        },
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'option',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: '3 Hours, 30 Minutes',
                                          value: '3 Hours, 30 Minutes'
                                        },
                                        _owner: null
                                      }],
                                      name: 'duration',
                                      id: 'walk-duration',
                                      defaultValue: '1 Hour, 30 Minutes'
                                    },
                                    _owner: null
                                  }, {
                                    $$typeof: _typeofReactElement,
                                    type: 'div',
                                    key: null,
                                    ref: null,
                                    props: {
                                      children: [{
                                        $$typeof: _typeofReactElement,
                                        type: 'hr',
                                        key: null,
                                        ref: null,
                                        props: {},
                                        _owner: null
                                      }, {
                                        $$typeof: _typeofReactElement,
                                        type: 'button',
                                        key: null,
                                        ref: null,
                                        props: {
                                          children: t('Add Date'),
                                          className: 'btn btn-primary',
                                          id: 'save-date-all',
                                          onClick: this.addDate
                                        },
                                        _owner: null
                                      }],
                                      className: 'date-select-group'
                                    },
                                    _owner: null
                                  }],
                                  className: 'caption'
                                },
                                _owner: null
                              },
                              className: 'thumbnail'
                            },
                            _owner: null
                          },
                          className: 'col-md-6'
                        },
                        _owner: null
                      }],
                      className: 'row'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'br',
                    key: null,
                    ref: null,
                    props: {},
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: TimeOpenTable,
                    key: null,
                    ref: null,
                    props: _defaultProps(TimeOpenTable.defaultProps, {}),
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'hr',
                    key: null,
                    ref: null,
                    props: {},
                    _owner: null
                  }],
                  className: 'tab-pane hide',
                  id: 'time-and-date-all'
                },
                _owner: null
              }],
              className: 'tab-content',
              id: 'walkduration'
            },
            _owner: null
          },
          className: 'tab-pane',
          id: 'time-and-date'
        },
        _owner: null
      };
    }
  }]);

  return DateSelect;
})(React.Component);

exports['default'] = DateSelect;
Object.assign(DateSelect.prototype, React.addons.LinkedStateMixin);
module.exports = exports['default'];


},{"../../stores/I18nStore.js":43,"./date/DatePicker.jsx":24,"./date/TimeOpenTable.jsx":25,"./date/TimePicker.jsx":26,"./date/TimeSetTable.jsx":27}],18:[function(require,module,exports){
// Flux
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var t = require('../../stores/I18nStore.js').getTranslate();

var ImageUpload = (function (_React$Component) {
  _inherits(ImageUpload, _React$Component);

  function ImageUpload() {
    _classCallCheck(this, ImageUpload);

    _get(Object.getPrototypeOf(ImageUpload.prototype), 'constructor', this).call(this);

    this.handleUpload = this.handleUpload.bind(this);
  }

  _createClass(ImageUpload, [{
    key: 'removeImage',
    value: function removeImage(i) {
      var thumbnails = this.props.valueLink.value;
      thumbnails.splice(i, 1);
      this.props.valueLink.requestChange(thumbnails);
    }
  }, {
    key: 'handleUpload',
    value: function handleUpload(e) {
      var fd = new FormData();
      var xhr = new XMLHttpRequest();
      var _this = this;

      if (e.currentTarget.files) {
        // TODO: Update to support uploading multiple files at once
        // TODO: display a spinner w/ the local file as the BG until
        // TODO: Move to flux
        // it's fully uploaded
        // Load one file
        fd.append('Filedata', e.currentTarget.files[0]);

        // Form validation token, generated by concrete5
        fd.append('ccm_token', this.props.valt);

        xhr.open('POST', CCM_TOOLS_PATH + '/files/importers/quick');
        xhr.onload = function () {
          try {
            var thumbnails = _this.props.valueLink.value;
            var data = JSON.parse(this.responseText);
            thumbnails.push(data);
            _this.props.valueLink.requestChange(thumbnails);
          } catch (e) {}
        };
        xhr.send(fd);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var thumbnails = this.props.valueLink.value;
      // TODO: include an upload callback that loads the uploaded image locally,
      // instead of the one off the server
      // TODO: Implement server-side support for multiple thumbnails, then
      // remove limit here
      return {
        $$typeof: _typeofReactElement,
        type: 'form',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'label',
            key: null,
            ref: null,
            props: {
              children: t('Upload a photo that best represents your walk.'),
              htmlFor: 'walkphotos',
              id: 'photo-tip'
            },
            _owner: null
          }, thumbnails.map(function (thumb, i) {
            // Grab just the name, so local files being uploaded have the same key as the hosted URL
            var filename = (thumb.url || '' + i).replace(/^.*[\\\/]/, '');
            return {
              $$typeof: _typeofReactElement,
              type: 'div',
              key: filename,
              ref: null,
              props: {
                children: {
                  $$typeof: _typeofReactElement,
                  type: 'a',
                  key: null,
                  ref: null,
                  props: {
                    children: {
                      $$typeof: _typeofReactElement,
                      type: 'i',
                      key: null,
                      ref: null,
                      props: {
                        className: 'fa fa-times-circle'
                      },
                      _owner: null
                    },
                    className: 'remove',
                    onClick: _this2.removeImage.bind(_this2, i)
                  },
                  _owner: null
                },
                className: 'thumbnail',
                style: { backgroundImage: 'url(' + thumb.url + ')' }
              },
              _owner: null
            };
          }), thumbnails.length < 1 ? {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'input',
                key: null,
                ref: null,
                props: {
                  className: 'ccm-al-upload-single-file',
                  type: 'file',
                  onChange: this.handleUpload
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'i',
                key: null,
                ref: null,
                props: {
                  className: 'fa fa-camera-retro fa-5x'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'span',
                key: null,
                ref: null,
                props: {
                  children: t('Click to upload an image'),
                  className: 'fileupload-new'
                },
                _owner: null
              }],
              className: 'thumbnail fileupload'
            },
            _owner: null
          } : null],
          className: 'upload-image'
        },
        _owner: null
      };
    }
  }]);

  return ImageUpload;
})(React.Component);

exports['default'] = ImageUpload;
module.exports = exports['default'];


},{"../../stores/I18nStore.js":43}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaultProps(defaultProps, props) { if (defaultProps) { for (var propName in defaultProps) { if (typeof props[propName] === 'undefined') { props[propName] = defaultProps[propName]; } } } return props; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mapWalkStopTableJsx = require('./map/WalkStopTable.jsx');

var _mapWalkStopTableJsx2 = _interopRequireDefault(_mapWalkStopTableJsx);

var _mapWalkInfoWindowJsx = require('./map/WalkInfoWindow.jsx');

var _mapWalkInfoWindowJsx2 = _interopRequireDefault(_mapWalkInfoWindowJsx);

var _mapInstagramConnectJsx = require('./map/InstagramConnect.jsx');

var _mapInstagramConnectJsx2 = _interopRequireDefault(_mapInstagramConnectJsx);

var _mapSoundCloudConnectJsx = require('./map/SoundCloudConnect.jsx');

var _mapSoundCloudConnectJsx2 = _interopRequireDefault(_mapSoundCloudConnectJsx);

var _mapTwitterConnectJsx = require('./map/TwitterConnect.jsx');

var _mapTwitterConnectJsx2 = _interopRequireDefault(_mapTwitterConnectJsx);

var _mapConnectFiltersJsx = require('./map/ConnectFilters.jsx');

var _mapConnectFiltersJsx2 = _interopRequireDefault(_mapConnectFiltersJsx);

// Flux
var Helper = require('../../helpers/helpers.jsx');
var t = require('../../stores/I18nStore.js').getTranslate();

// Map parameters
var stopMarker = {
  url: CCM_THEME_PATH + '/images/marker.png',
  // This marker is 20 pixels wide by 32 pixels tall.
  size: new google.maps.Size(30, 46),
  // The origin for this image is 0,0.
  origin: new google.maps.Point(0, 0),
  // The anchor for this image is the base of the flagpole at 0,32.
  anchor: new google.maps.Point(11, 44)
};

var MapBuilder = (function (_React$Component) {
  _inherits(MapBuilder, _React$Component);

  function MapBuilder() {
    _classCallCheck(this, MapBuilder);

    _get(Object.getPrototypeOf(MapBuilder.prototype), 'constructor', this).call(this);

    // State for this component should only track the map editor
    this.state = {
      // The 'mode' we're in: 'addPoint', 'addRoute'
      mode: {},
      map: null,
      markers: new google.maps.MVCArray(),
      route: null,
      infowindow: new google.maps.InfoWindow(),
      // The collection of search terms boxes
      filters: []
    };
  }

  // Static properties

  _createClass(MapBuilder, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      var map = new google.maps.Map(React.findDOMNode(this.refs.gmap), {
        center: new google.maps.LatLng(this.props.city.latlng[0], this.props.city.latlng[1]),
        zoom: this.props.initialZoom,
        scrollwheel: false,
        rotateControl: true,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
        }
      });

      // Map won't size properly on a hidden tab, so refresh on tab shown
      $('a[href="#route"]').on('shown.bs.tab', function (e) {
        return _this.boundMapByWalk();
      });

      this.setState({ map: map }, this.refreshGMap);
    }

    // Build a google map from our serialized map state
  }, {
    key: 'refreshGMap',
    value: function refreshGMap() {
      var _this2 = this;

      var valueLink = this.props.valueLink;
      var markers = new google.maps.MVCArray();
      var route = null;

      if (this.state.route) {
        this.state.route.setMap(null);
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.state.markers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var marker = _step.value;
          marker.setMap(null);
        } // Draw the route
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (valueLink.value) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = valueLink.value.markers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var marker = _step2.value;

            var latlng = undefined;
            // Set to the markers latlng if available, otherwise place at center
            if (marker.lat && marker.lng) {
              latlng = new google.maps.LatLng(marker.lat, marker.lng);
            } else {
              latlng = this.state.map.center;
            }

            markers.push(this.buildMarker({
              latlng: latlng,
              title: marker.title,
              description: marker.description,
              media: marker.media
            }));
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        route = this.buildRoute(valueLink.value.route);
      } else {
        route = this.buildRoute([]);
      }

      // Set marker/route adding
      google.maps.event.addListener(this.state.map, 'click', function (ev) {
        _this2.state.infowindow.setMap(null);
        if (_this2.state.mode.addRoute) {
          route.setPath(route.getPath().push(ev.latLng));
          _this2.setState({ route: route });
        }
      });

      this.setState({ markers: markers, route: route });
    }

    /**
     * Make the map fit the markers in this walk
     */
  }, {
    key: 'boundMapByWalk',
    value: function boundMapByWalk() {
      // Don't include the route - it can be too expensive to compute.
      var bounds = new google.maps.LatLngBounds();
      google.maps.event.trigger(this.state.map, 'resize');
      if (this.state.markers.getLength()) {
        for (var i = 0, len = this.state.markers.getLength(); i < len; i++) {
          bounds.extend(this.state.markers.getAt(i).getPosition());
        }

        this.state.map.fitBounds(bounds);
      }
    }

    // Map related functions
    // Build gmaps Marker object from base data
    // @param google.maps.LatLng latlng The position to add
    // @param Object title {title, description}
  }, {
    key: 'buildMarker',
    value: function buildMarker(options) {
      var _this3 = this;

      var map = this.state.map;
      var gMarkerOptions = {
        animation: google.maps.Animation.DROP,
        draggable: true,
        style: 'stop',
        map: map,
        icon: stopMarker
      };
      var marker = undefined;

      // Assign default options
      options = Object.assign({}, {
        latlng: null,
        title: '',
        description: '',
        media: null
      }, options);

      // If we passed in a position
      if (options.latlng instanceof google.maps.LatLng) {
        gMarkerOptions.position = options.latlng;
      } else {
        gMarkerOptions.position = this.state.map.center;
      }

      // Set to an empty title/description object.
      // Google maps has a limited amount of marker data we
      gMarkerOptions.title = JSON.stringify({
        title: options.title,
        description: options.description,
        media: options.media
      });

      marker = new google.maps.Marker(gMarkerOptions);

      google.maps.event.addListener(marker, 'click', function (ev) {
        return _this3.showInfoWindow(marker);
      });

      google.maps.event.addListener(marker, 'drag', function (ev) {});

      return marker;
    }

    /**
     * Show the info box for editing this marker
     *
     * @param google.maps.Marker marker
     */
  }, {
    key: 'showInfoWindow',
    value: function showInfoWindow(marker) {
      var infoDOM = document.createElement('div');

      React.render({
        $$typeof: _typeofReactElement,
        type: _mapWalkInfoWindowJsx2['default'],
        key: null,
        ref: null,
        props: _defaultProps(_mapWalkInfoWindowJsx2['default'].defaultProps, {
          marker: marker,
          deleteMarker: this.deleteMarker.bind(this, marker),
          refresh: this.syncState.bind(this)
        }),
        _owner: null
      }, infoDOM);

      // Center the marker and display its info window
      this.state.map.panTo(marker.getPosition());
      this.state.infowindow.setContent(infoDOM);
      this.state.infowindow.open(this.state.map, marker);
    }
  }, {
    key: 'buildRoute',
    value: function buildRoute(routeArray) {
      var _this4 = this;

      var poly = new google.maps.Polyline({
        strokeColor: '#F16725',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        editable: true,
        map: this.state.map
      });

      // Remove vertices when right-clicked
      google.maps.event.addListener(poly, 'rightclick', function (ev) {
        // Check if we clicked a vertex
        if (ev.vertex !== undefined) {
          poly.setPath(poly.getPath().removeAt(ev.vertex));
        }
      });

      // Hide the infowindow if we click outside it
      google.maps.event.addListener(poly, 'mousedown', function (ev) {
        return _this4.state.infowindow.setMap(null);
      });

      if (routeArray.length > 0) {
        poly.setPath(routeArray.map(function (point) {
          return new google.maps.LatLng(point.lat, point.lng);
        }));
      }

      return poly;
    }

    /**
     * @param google.maps.Marker marker
     */
  }, {
    key: 'deleteMarker',
    value: function deleteMarker(marker) {
      var markers = this.state.markers;

      // Clear marker from map
      marker.setMap(null);

      // Remove reference in state
      markers.removeAt(markers.indexOf(marker));

      this.setState({ markers: markers });
    }

    /**
     * Reorder the marker at index to a new position, pushing up those after
     * @param int from
     * @param int to
     */
  }, {
    key: 'moveBefore',
    value: function moveBefore(from, to) {
      var markers = this.state.markers;
      var fMarker = markers.getAt(from);
      markers.removeAt(from);
      markers.insertAt(to, fMarker);

      this.setState({ markers: markers }, this.syncState);
    }

    // Button Actions
  }, {
    key: 'toggleAddPoint',
    value: function toggleAddPoint() {
      var _this5 = this;

      var markers = this.state.markers;
      var marker = this.buildMarker();
      markers.push(marker);

      this.setState({ markers: markers, mode: {} }, function () {
        _this5.syncState();
        _this5.showInfoWindow(marker);
      });

      this.state.infowindow.setMap(null);
    }
  }, {
    key: 'toggleAddRoute',
    value: function toggleAddRoute() {
      var _this6 = this;

      this.setState({
        mode: {
          addRoute: !this.state.mode.addRoute
        }
      });
      (function () {
        return _this6.state.infowindow.setMap(null);
      });
    }
  }, {
    key: 'clearRoute',
    value: function clearRoute() {
      this.state.infowindow.setMap(null);
      this.state.route.setPath([]);
      this.setState({ mode: {} });
    }

    // Build a version of state appropriate for persistence
  }, {
    key: 'getStateSimple',
    value: function getStateSimple() {
      var markers = this.state.markers.getArray().map(function (marker) {
        var titleObj = JSON.parse(marker.title);
        return {
          lat: marker.position.lat(),
          lng: marker.position.lng(),
          title: titleObj.title,
          description: titleObj.description,
          media: titleObj.media,
          style: 'stop'
        };
      });
      var route = [];

      if (this.state.route) {
        route = this.state.route.getPath().getArray().map(function (point) {
          return {
            lat: point.lat(),
            lng: point.lng()
          };
        });
      }

      return {
        markers: markers,
        route: route
      };
    }

    // Sync what's on the gmap to what's stored in our state
  }, {
    key: 'syncState',
    value: function syncState() {
      this.props.valueLink.requestChange(this.getStateSimple());
    }

    // Manage the filters for loading data from external APIs
  }, {
    key: 'handleRemoveFilter',
    value: function handleRemoveFilter(i) {
      var filters = this.state.filters.slice();
      filters.splice(i, 1);
      this.setState({ filters: filters });
    }

    // Update the _text_ of a filter
  }, {
    key: 'handleChangeFilter',
    value: function handleChangeFilter(i, val) {
      var filters = this.state.filters.slice();
      filters[i].value = val;
      this.setState({ filters: filters });
    }

    // Push a new filter to our box, usually done by the buttons
  }, {
    key: 'handleAddFilter',
    value: function handleAddFilter(filter) {
      var filters = this.state.filters.slice();
      filters.push(filter);
      this.setState({ filters: filters });
    }
  }, {
    key: 'render',
    value: function render() {
      var walkStops = undefined;

      // Standard properties the filter buttons need
      var filterProps = {
        valueLink: this.props.valueLink,
        refreshGMap: this.refreshGMap.bind(this),
        boundMapByWalk: this.boundMapByWalk.bind(this),
        addFilter: this.handleAddFilter.bind(this),
        city: this.props.city
      };

      if (this.state.markers && this.state.markers.length) {
        walkStops = [{
          $$typeof: _typeofReactElement,
          type: 'h3',
          key: 'stops',
          ref: null,
          props: {
            children: t('Walk Stops')
          },
          _owner: null
        }, React.createElement(_mapWalkStopTableJsx2['default'], {
          ref: 'walkStopTable',
          key: 1,
          markers: this.state.markers,
          deleteMarker: this.deleteMarker.bind(this),
          moveBefore: this.moveBefore.bind(this),
          showInfoWindow: this.showInfoWindow.bind(this)
        })];
      }

      return React.createElement(
        'div',
        { className: 'tab-pane', id: 'route', ref: 'route' },
        {
          $$typeof: _typeofReactElement,
          type: 'div',
          key: null,
          ref: null,
          props: {
            children: {
              $$typeof: _typeofReactElement,
              type: 'h1',
              key: null,
              ref: null,
              props: {
                children: t('Share Your Route')
              },
              _owner: null
            },
            className: 'page-header',
            'data-section': 'route'
          },
          _owner: null
        },
        {
          $$typeof: _typeofReactElement,
          type: 'div',
          key: null,
          ref: null,
          props: {
            children: t('Make sure to add a description to your meeting place, and the last stop. This is how people will find you on the day of your walk.'),
            className: 'alert alert-info'
          },
          _owner: null
        },
        {
          $$typeof: _typeofReactElement,
          type: 'div',
          key: null,
          ref: null,
          props: {
            children: [React.createElement(
              'button',
              {
                ref: 'addPoint',
                className: this.state.mode.addPoint ? 'active' : '',
                onClick: this.toggleAddPoint.bind(this) },
              {
                $$typeof: _typeofReactElement,
                type: 'i',
                key: null,
                ref: null,
                props: {
                  className: 'fa fa-map-marker'
                },
                _owner: null
              },
              t('Add Stop')
            ), React.createElement(
              'button',
              {
                ref: 'addRoute',
                className: this.state.mode.addRoute ? 'active' : '',
                onClick: this.toggleAddRoute.bind(this) },
              {
                $$typeof: _typeofReactElement,
                type: 'i',
                key: null,
                ref: null,
                props: {
                  className: 'fa fa-arrows'
                },
                _owner: null
              },
              t('Add Route')
            ), React.createElement(
              'button',
              { ref: 'clearroute', onClick: this.clearRoute.bind(this) },
              {
                $$typeof: _typeofReactElement,
                type: 'i',
                key: null,
                ref: null,
                props: {
                  className: 'fa fa-eraser'
                },
                _owner: null
              },
              t('Clear Route')
            ), React.createElement(_mapTwitterConnectJsx2['default'], filterProps), React.createElement(_mapInstagramConnectJsx2['default'], filterProps), React.createElement(_mapSoundCloudConnectJsx2['default'], filterProps)],
            id: 'map-control-bar'
          },
          _owner: null
        },
        {
          $$typeof: _typeofReactElement,
          type: _mapConnectFiltersJsx2['default'],
          key: null,
          ref: null,
          props: _defaultProps(_mapConnectFiltersJsx2['default'].defaultProps, {
            filters: this.state.filters,
            changeFilter: this.handleChangeFilter.bind(this),
            remove: this.handleRemoveFilter.bind(this)
          }),
          _owner: null
        },
        {
          $$typeof: _typeofReactElement,
          type: 'div',
          key: null,
          ref: null,
          props: {
            className: 'map-notifications'
          },
          _owner: null
        },
        React.createElement('div', { id: 'map-canvas', ref: 'gmap' }),
        walkStops,
        {
          $$typeof: _typeofReactElement,
          type: 'hr',
          key: null,
          ref: null,
          props: {},
          _owner: null
        }
      );
    }
  }]);

  return MapBuilder;
})(React.Component);

exports['default'] = MapBuilder;
Object.assign(MapBuilder, {
  defaultProps: {
    initialZoom: 15
  }
});
module.exports = exports['default'];


},{"../../helpers/helpers.jsx":40,"../../stores/I18nStore.js":43,"./map/ConnectFilters.jsx":28,"./map/InstagramConnect.jsx":29,"./map/SoundCloudConnect.jsx":30,"./map/TwitterConnect.jsx":31,"./map/WalkInfoWindow.jsx":32,"./map/WalkStopTable.jsx":33}],20:[function(require,module,exports){
// Flux
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var i18n = require('../../stores/I18nStore.js');
var t = i18n.getTranslate();
var t2 = i18n.getTranslatePlural();

// Update a field for a team member
function linkMember(field, _ref) {
  var value = _ref.value;
  var onChange = _ref.onChange;
  var index = _ref.index;

  return {
    value: value[field],
    onChange: (function (_onChange) {
      function onChange(_x) {
        return _onChange.apply(this, arguments);
      }

      onChange.toString = function () {
        return _onChange.toString();
      };

      return onChange;
    })(function (e) {
      return onChange(field, e.target.value, index);
    })
  };
}

/* Data models
 * TODO: move to flux stores
 */
var memberTypes = {
  'leader': { "name-first": '', "name-last": '', bio: '', primary: '', twitter: '', facebook: '', website: '', email: '', phone: '' },
  'organizer': { "name-first": '', "name-last": '', institution: '', website: '' },
  'community': { "name-first": '', "name-last": '', bio: '', twitter: '', facebook: '', website: '' },
  'volunteer': { "name-first": '', "name-last": '', role: '', website: '' }
};

var TeamBuilder = (function (_React$Component) {
  _inherits(TeamBuilder, _React$Component);

  function TeamBuilder() {
    _classCallCheck(this, TeamBuilder);

    _get(Object.getPrototypeOf(TeamBuilder.prototype), 'constructor', this).call(this);
    // So we know if this is the first loading, or changed after
    this.state = { initialized: false };
    this.handleTeamMemberChange = this.handleTeamMemberChange.bind(this);
  }

  _createClass(TeamBuilder, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ initialized: true });
    }
  }, {
    key: 'handleTeamMemberChange',
    value: function handleTeamMemberChange(propname, memberValue, id) {
      props.value[id][propname] = memberValue;
      props.onChange(props.value);
    }
  }, {
    key: 'addMember',
    value: function addMember(props) {
      props.team.push(props);
      onChange(props.team);
    }
  }, {
    key: 'deleteMember',
    value: function deleteMember(i) {
      var value = props.value.slice();
      value.splice(i, 1);
      onChange(value);
    }

    // Set the member at that specific index
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      // If there's no 'you', create one as the current user
      var valueLink = this.props.valueLink;

      // Loop through all the users and render the appropriate user type
      var teamMemberProps = {
        onChange: this.handleTeamMemberChange
      };

      var users = props.value.map(function (user, i) {
        var teamMember = undefined;
        // Use empty strings for unset/false
        user.phone = user.phone || '';
        var thisUser = Object.assign({}, teamMemberProps, {
          key: i,
          index: i,
          value: user,
          onDelete: _this.deleteMember.bind(_this, i)
        });

        if (user.type === 'you') {
          teamMember = React.createElement(TeamOwner, thisUser);
        } else if (user.type === 'leader') {
          teamMember = React.createElement(TeamLeader, thisUser);
        } else if (user.type === 'organizer') {
          teamMember = React.createElement(TeamOrganizer, thisUser);
        } else if (user.type === 'community') {
          teamMember = React.createElement(TeamCommunityVoice, thisUser);
        } else if (user.type === 'volunteer') {
          teamMember = React.createElement(TeamVolunteer, thisUser);
        }
        return teamMember;
      });

      return {
        $$typeof: _typeofReactElement,
        type: 'div',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: {
                $$typeof: _typeofReactElement,
                type: 'h1',
                key: null,
                ref: null,
                props: {
                  children: t('Build Your Team')
                },
                _owner: null
              },
              className: 'page-header',
              'data-section': 'team'
            },
            _owner: null
          }, users, {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'h2',
                key: null,
                ref: null,
                props: {
                  children: t('Who else is involved with this walk?')
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'h3',
                key: null,
                ref: null,
                props: {
                  children: [t('Click to add team members to your walk'), ' (', t('Optional'), ')'],
                  className: 'lead'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'section',
                        key: null,
                        ref: null,
                        props: {
                          children: [{
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              className: 'icon'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'h4',
                            key: null,
                            ref: null,
                            props: {
                              children: t('Walk Leader'),
                              className: 'title text-center'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'p',
                            key: null,
                            ref: null,
                            props: {
                              children: t('A person presenting information, telling stories, and fostering discussion during the Jane\'s Walk.')
                            },
                            _owner: null
                          }],
                          className: 'new-member',
                          id: 'new-walkleader',
                          title: 'Add New Walk Leader',
                          onClick: function () {
                            return _this.addMember(memberTypes.leader);
                          }
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'section',
                        key: null,
                        ref: null,
                        props: {
                          children: [{
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              className: 'icon'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'h4',
                            key: null,
                            ref: null,
                            props: {
                              children: t('Walk Organizer'),
                              className: 'title text-center'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'p',
                            key: null,
                            ref: null,
                            props: {
                              children: t('A person responsible for outreach to new and returning Walk Leaders and Community Voices.')
                            },
                            _owner: null
                          }],
                          className: 'new-member',
                          id: 'new-walkorganizer',
                          title: 'Add New Walk Organizer',
                          onClick: function () {
                            return _this.addMember(memberTypes.organizer);
                          }
                        },
                        _owner: null
                      }],
                      className: 'team-row'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'section',
                        key: null,
                        ref: null,
                        props: {
                          children: [{
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              className: 'icon'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'h4',
                            key: null,
                            ref: null,
                            props: {
                              children: t('Community Voice'),
                              className: 'title text-center'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'p',
                            key: null,
                            ref: null,
                            props: {
                              children: t('A community member with stories and/or personal experiences to share.')
                            },
                            _owner: null
                          }],
                          className: 'new-member',
                          id: 'new-communityvoice',
                          title: 'Add A Community Voice',
                          onClick: function () {
                            return _this.addMember(memberTypes.community);
                          }
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'section',
                        key: null,
                        ref: null,
                        props: {
                          children: [{
                            $$typeof: _typeofReactElement,
                            type: 'div',
                            key: null,
                            ref: null,
                            props: {
                              className: 'icon'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'h4',
                            key: null,
                            ref: null,
                            props: {
                              children: t('Volunteers'),
                              className: 'title text-center'
                            },
                            _owner: null
                          }, {
                            $$typeof: _typeofReactElement,
                            type: 'p',
                            key: null,
                            ref: null,
                            props: {
                              children: t('Other people who are helping to make your walk happen.')
                            },
                            _owner: null
                          }],
                          className: 'new-member',
                          id: 'new-othermember',
                          title: 'Add another helper to your walk',
                          onClick: function () {
                            return _this.addMember(memberTypes.volunteer);
                          }
                        },
                        _owner: null
                      }],
                      className: 'team-row'
                    },
                    _owner: null
                  }],
                  className: 'team-set'
                },
                _owner: null
              }],
              id: 'add-member'
            },
            _owner: null
          }],
          className: 'tab-pane',
          id: 'team'
        },
        _owner: null
      };
    }
  }]);

  return TeamBuilder;
})(React.Component);

exports['default'] = TeamBuilder;

var TeamOwner = function TeamOwner(props) {
  return {
    $$typeof: _typeofReactElement,
    type: 'fieldset',
    key: null,
    ref: null,
    props: {
      children: [{
        $$typeof: _typeofReactElement,
        type: 'span',
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'legend',
            key: null,
            ref: null,
            props: {
              children: t('You')
            },
            _owner: null
          }
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'fieldset',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'label',
            key: null,
            ref: null,
            props: {
              children: t('Name')
            },
            _owner: null
          }, React.createElement('input', _extends({ type: 'text', placeholder: 'First' }, linkMember('name-first', props))), React.createElement('input', _extends({ type: 'text', placeholder: 'Last' }, linkMember('name-last', props)))],
          className: 'name item required'
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'fieldset',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'label',
            key: null,
            ref: null,
            props: {
              children: t('Role')
            },
            _owner: null
          }, React.createElement(
            'select',
            linkMember('role', props),
            {
              $$typeof: _typeofReactElement,
              type: 'option',
              key: null,
              ref: null,
              props: {
                children: t('Walk Leader'),
                defaultValue: 'walk-leader'
              },
              _owner: null
            },
            {
              $$typeof: _typeofReactElement,
              type: 'option',
              key: null,
              ref: null,
              props: {
                children: t('Co-Walk Leader'),
                defaultValue: 'co-walk-leader'
              },
              _owner: null
            },
            {
              $$typeof: _typeofReactElement,
              type: 'option',
              key: null,
              ref: null,
              props: {
                children: t('Walk Organizer'),
                defaultValue: 'walk-organizer'
              },
              _owner: null
            }
          )],
          className: 'role item required'
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'fieldset',
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'label',
            key: null,
            ref: null,
            props: {
              children: [React.createElement('input', _extends({ type: 'checkbox', className: 'role-check' }, linkMember('primary', props))), t('Primary Walk Leader')],
              className: 'checkbox'
            },
            _owner: null
          },
          className: 'item'
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'fieldset',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'label',
            key: null,
            ref: null,
            props: {
              children: t('Introduce yourself'),
              htmlFor: 'bio'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'p',
            key: null,
            ref: null,
            props: {
              children: t('We recommend keeping your bio under 60 words'),
              className: 'alert alert-info'
            },
            _owner: null
          }, React.createElement('textarea', _extends({ rows: '6' }, linkMember('bio', props)))],
          className: 'item required'
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'fieldset',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'fieldset',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'label',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'i',
                    key: null,
                    ref: null,
                    props: {
                      className: 'fa fa-envelope'
                    },
                    _owner: null
                  }, ' ', t('Email')]
                },
                _owner: null
              }, React.createElement('input', _extends({ type: 'email', placeholder: '' }, linkMember('email', props)))],
              className: 'item'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'fieldset',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'label',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'i',
                    key: null,
                    ref: null,
                    props: {
                      className: 'fa fa-twitter'
                    },
                    _owner: null
                  }, ' Twitter'],
                  htmlFor: 'leader-twitter'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'span',
                    key: null,
                    ref: null,
                    props: {
                      children: '@',
                      className: 'input-group-addon'
                    },
                    _owner: null
                  }, React.createElement('input', _extends({ className: 'col-md-12', type: 'text', placeholder: 'Username' }, linkMember('twitter', props)))],
                  className: 'input-group'
                },
                _owner: null
              }],
              className: 'item'
            },
            _owner: null
          }],
          className: 'contact'
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'fieldset',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'fieldset',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'label',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'i',
                    key: null,
                    ref: null,
                    props: {
                      className: 'fa fa-facebook-square'
                    },
                    _owner: null
                  }, ' Facebook'],
                  htmlFor: 'facebook'
                },
                _owner: null
              }, React.createElement('input', _extends({ type: 'text', placeholder: '' }, linkMember('facebook', props)))],
              className: 'item'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'fieldset',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'label',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'i',
                    key: null,
                    ref: null,
                    props: {
                      className: 'fa fa-link'
                    },
                    _owner: null
                  }, ' ', t('Website')],
                  htmlFor: 'website'
                },
                _owner: null
              }, React.createElement('input', _extends({ type: 'text', placeholder: '' }, linkMember('website', props)))],
              className: 'item'
            },
            _owner: null
          }],
          className: 'social'
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'hr',
        key: null,
        ref: null,
        props: {},
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'section',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'h4',
            key: null,
            ref: null,
            props: {
              children: t('We\'ll keep this part private')
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'p',
            key: null,
            ref: null,
            props: {
              children: t('We\'ll use this information to contact you about your walk submission. We wont share this information with 3rd parties.'),
              className: 'alert alert-info'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'fieldset',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'label',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'i',
                    key: null,
                    ref: null,
                    props: {
                      className: 'fa fa-phone-square'
                    },
                    _owner: null
                  }, t('Phone Number')]
                },
                _owner: null
              }, React.createElement('input', _extends({ type: 'tel', maxLength: '18', placeholder: '' }, linkMember('phone', props)))],
              className: 'tel required'
            },
            _owner: null
          }],
          className: 'private'
        },
        _owner: null
      }],
      className: 'team-member walk-owner'
    },
    _owner: null
  };
};

var TeamLeader = function TeamLeader(props) {
  return {
    $$typeof: _typeofReactElement,
    type: 'fieldset',
    key: null,
    ref: null,
    props: {
      children: [{
        $$typeof: _typeofReactElement,
        type: 'legend',
        key: null,
        ref: null,
        props: {
          children: t('Walk Leader')
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'div',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'label',
                key: null,
                ref: null,
                props: {
                  children: t('Name'),
                  htmlFor: 'name'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: {
                    $$typeof: _typeofReactElement,
                    type: 'form',
                    key: null,
                    ref: null,
                    props: {
                      children: [React.createElement('input', _extends({ type: 'text', placeholder: 'First' }, linkMember('name-first', props))), React.createElement('input', _extends({ type: 'text', placeholder: 'Last' }, linkMember('name-last', props)))],
                      className: 'form-inline'
                    },
                    _owner: null
                  },
                  className: 'item'
                },
                _owner: null
              }],
              className: 'item required'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: {
                $$typeof: _typeofReactElement,
                type: 'label',
                key: null,
                ref: null,
                props: {
                  children: [React.createElement('input', _extends({ type: 'checkbox', className: 'role-check' }, linkMember('primary', props))), t('Primary Walk Leader')],
                  className: 'checkbox'
                },
                _owner: null
              },
              className: 'item'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'label',
                key: null,
                ref: null,
                props: {
                  children: t('Introduce the walk leader'),
                  htmlFor: 'bio'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: t('We recommend keeping the bio under 60 words'),
                  className: 'alert alert-info'
                },
                _owner: null
              }, React.createElement('textarea', _extends({ className: 'col-md-12', rows: '6' }, linkMember('bio', props)))],
              className: 'item required'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'label',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'i',
                        key: null,
                        ref: null,
                        props: {
                          className: 'fa fa-twitter'
                        },
                        _owner: null
                      }, ' Twitter'],
                      htmlFor: 'prependedInput'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'span',
                        key: null,
                        ref: null,
                        props: {
                          children: '@',
                          className: 'add-on'
                        },
                        _owner: null
                      }, React.createElement('input', _extends({ className: 'col-md-12', type: 'text', placeholder: 'Username' }, linkMember('twitter', props)))],
                      className: 'input-prepend'
                    },
                    _owner: null
                  }],
                  className: 'col-md-6'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'label',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'i',
                        key: null,
                        ref: null,
                        props: {
                          className: 'fa fa-facebook-square'
                        },
                        _owner: null
                      }, ' Facebook'],
                      htmlFor: 'facebook'
                    },
                    _owner: null
                  }, React.createElement('input', _extends({ type: 'text', placeholder: '' }, linkMember('facebook', props)))],
                  className: 'col-md-6'
                },
                _owner: null
              }],
              className: 'row'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'label',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'i',
                        key: null,
                        ref: null,
                        props: {
                          className: 'fa fa-link'
                        },
                        _owner: null
                      }, t('Website')],
                      htmlFor: 'website'
                    },
                    _owner: null
                  }, React.createElement('input', _extends({ type: 'text', placeholder: '' }, linkMember('website', props)))],
                  className: 'col-md-6'
                },
                _owner: null
              },
              className: 'row'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'hr',
            key: null,
            ref: null,
            props: {},
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'h4',
            key: null,
            ref: null,
            props: {
              children: t('Private')
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: t('We\'ll use this information to contact you about your walk submission. We wont share this information with 3rd parties.'),
              className: 'alert alert-info'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'label',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'i',
                        key: null,
                        ref: null,
                        props: {
                          className: 'fa fa-envelope'
                        },
                        _owner: null
                      }, t('Email')],
                      htmlFor: 'email'
                    },
                    _owner: null
                  }, React.createElement('input', _extends({ type: 'email', placeholder: 'Email' }, linkMember('email', props)))],
                  className: 'col-md-6 required'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'label',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'i',
                        key: null,
                        ref: null,
                        props: {
                          className: 'fa fa-phone-square'
                        },
                        _owner: null
                      }, t('Phone Number')],
                      htmlFor: 'phone'
                    },
                    _owner: null
                  }, React.createElement('input', _extends({ type: 'tel', maxLength: '16', placeholder: '' }, linkMember('phone', props)))],
                  className: 'col-md-6 tel'
                },
                _owner: null
              }],
              className: 'row'
            },
            _owner: null
          }]
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'footer',
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'button',
            key: null,
            ref: null,
            props: {
              children: t('Remove Team Member'),
              className: 'btn remove-team-member',
              onClick: props.onDelete
            },
            _owner: null
          }
        },
        _owner: null
      }],
      className: 'team-member walk-leader clearfix'
    },
    _owner: null
  };
};

var TeamOrganizer = function TeamOrganizer(props) {
  return {
    $$typeof: _typeofReactElement,
    type: 'fieldset',
    key: null,
    ref: null,
    props: {
      children: [{
        $$typeof: _typeofReactElement,
        type: 'legend',
        key: null,
        ref: null,
        props: {
          children: t('Walk Organizer')
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'div',
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'label',
                    key: null,
                    ref: null,
                    props: {
                      children: t('Name'),
                      htmlFor: 'name'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'form',
                    key: null,
                    ref: null,
                    props: {
                      children: [React.createElement('input', _extends({ type: 'text', placeholder: 'First' }, linkMember('name-first', props))), React.createElement('input', _extends({ type: 'text', placeholder: 'Last' }, linkMember('name-last', props)))],
                      className: 'form-inline'
                    },
                    _owner: null
                  }],
                  className: 'item required'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'label',
                key: null,
                ref: null,
                props: {
                  children: [t('Affilated Institution'), ' (', t('Optional'), ')'],
                  htmlFor: 'affiliation'
                },
                _owner: null
              }, React.createElement('input', _extends({ type: 'text', placeholder: 'e.g. City of Toronto' }, linkMember('institution', props))), {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: {
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'label',
                        key: null,
                        ref: null,
                        props: {
                          children: [{
                            $$typeof: _typeofReactElement,
                            type: 'i',
                            key: null,
                            ref: null,
                            props: {
                              className: 'fa fa-link'
                            },
                            _owner: null
                          }, t('Website')],
                          htmlFor: 'website'
                        },
                        _owner: null
                      }, React.createElement('input', _extends({ type: 'text', className: 'col-md-12', placeholder: '' }, linkMember('website', props)))],
                      className: 'col-md-6'
                    },
                    _owner: null
                  },
                  className: 'row'
                },
                _owner: null
              }],
              className: 'col-md-9'
            },
            _owner: null
          },
          className: 'row'
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'footer',
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'button',
            key: null,
            ref: null,
            props: {
              children: t('Remove Team Member'),
              className: 'btn remove-team-member',
              onClick: props.onDelete
            },
            _owner: null
          }
        },
        _owner: null
      }],
      className: 'team-member walk-organizer'
    },
    _owner: null
  };
};

var TeamCommunityVoice = function TeamCommunityVoice(props) {
  return {
    $$typeof: _typeofReactElement,
    type: 'fieldset',
    key: null,
    ref: null,
    props: {
      children: [{
        $$typeof: _typeofReactElement,
        type: 'legend',
        key: null,
        ref: null,
        props: {
          children: t('Community Voice')
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'div',
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'label',
                    key: null,
                    ref: null,
                    props: {
                      children: t('Name'),
                      htmlFor: 'name'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'form',
                    key: null,
                    ref: null,
                    props: {
                      children: [React.createElement('input', _extends({ type: 'text', placeholder: 'First' }, linkMember('name-first', props))), React.createElement('input', _extends({ type: 'text', placeholder: 'Last' }, linkMember('name-last', props)))],
                      className: 'form-inline'
                    },
                    _owner: null
                  }],
                  className: 'item required'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'label',
                    key: null,
                    ref: null,
                    props: {
                      children: t('Tell everyone about this person'),
                      htmlFor: 'bio'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: t('We recommend keeping the bio under 60 words'),
                      className: 'alert alert-info'
                    },
                    _owner: null
                  }, React.createElement('textarea', _extends({ className: 'col-md-12', rows: '6' }, linkMember('bio', props)))],
                  className: 'item'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'label',
                        key: null,
                        ref: null,
                        props: {
                          children: [{
                            $$typeof: _typeofReactElement,
                            type: 'i',
                            key: null,
                            ref: null,
                            props: {
                              className: 'fa fa-twitter'
                            },
                            _owner: null
                          }, ' Twitter'],
                          htmlFor: 'prependedInput'
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'div',
                        key: null,
                        ref: null,
                        props: {
                          children: [{
                            $$typeof: _typeofReactElement,
                            type: 'span',
                            key: null,
                            ref: null,
                            props: {
                              children: '@',
                              className: 'add-on'
                            },
                            _owner: null
                          }, React.createElement('input', _extends({ className: 'col-md-12', type: 'text', placeholder: 'Username' }, linkMember('twitter', props)))],
                          className: 'input-prepend'
                        },
                        _owner: null
                      }],
                      className: 'col-md-6'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'label',
                        key: null,
                        ref: null,
                        props: {
                          children: [{
                            $$typeof: _typeofReactElement,
                            type: 'i',
                            key: null,
                            ref: null,
                            props: {
                              className: 'fa fa-facebook-square'
                            },
                            _owner: null
                          }, ' Facebook'],
                          htmlFor: 'facebook'
                        },
                        _owner: null
                      }, React.createElement('input', _extends({ type: 'text', placeholder: '' }, linkMember('facebook', props)))],
                      className: 'col-md-6'
                    },
                    _owner: null
                  }],
                  className: 'row'
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: {
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'label',
                        key: null,
                        ref: null,
                        props: {
                          children: [{
                            $$typeof: _typeofReactElement,
                            type: 'i',
                            key: null,
                            ref: null,
                            props: {
                              className: 'fa fa-link'
                            },
                            _owner: null
                          }, t('Website')],
                          htmlFor: 'website'
                        },
                        _owner: null
                      }, React.createElement('input', _extends({ type: 'text', className: 'col-md-12', placeholder: '' }, linkMember('website', props)))],
                      className: 'col-md-6'
                    },
                    _owner: null
                  },
                  className: 'row'
                },
                _owner: null
              }],
              className: 'col-md-9'
            },
            _owner: null
          },
          className: 'row'
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'footer',
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'button',
            key: null,
            ref: null,
            props: {
              children: t('Remove Team Member'),
              className: 'btn remove-team-member',
              onClick: props.onDelete
            },
            _owner: null
          }
        },
        _owner: null
      }],
      className: 'team-member community-voice'
    },
    _owner: null
  };
};

var TeamVolunteer = function TeamVolunteer(props) {
  return {
    $$typeof: _typeofReactElement,
    type: 'div',
    key: null,
    ref: null,
    props: {
      children: [{
        $$typeof: _typeofReactElement,
        type: 'fieldset',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'legend',
            key: null,
            ref: null,
            props: {
              children: t('Volunteers')
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: {
                $$typeof: _typeofReactElement,
                type: 'div',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'label',
                        key: null,
                        ref: null,
                        props: {
                          children: t('Name'),
                          htmlFor: 'name'
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'form',
                        key: null,
                        ref: null,
                        props: {
                          children: [React.createElement('input', _extends({ type: 'text', placeholder: 'First' }, linkMember('name-first', props))), React.createElement('input', _extends({ type: 'text', placeholder: 'Last' }, linkMember('name-last', props)))],
                          className: 'form-inline'
                        },
                        _owner: null
                      }],
                      className: 'item required'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'label',
                        key: null,
                        ref: null,
                        props: {
                          children: t('Role'),
                          htmlFor: 'role'
                        },
                        _owner: null
                      }, React.createElement('input', _extends({ type: 'text' }, linkMember('role', props)))],
                      className: 'item required'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: {
                        $$typeof: _typeofReactElement,
                        type: 'div',
                        key: null,
                        ref: null,
                        props: {
                          children: [{
                            $$typeof: _typeofReactElement,
                            type: 'label',
                            key: null,
                            ref: null,
                            props: {
                              children: [{
                                $$typeof: _typeofReactElement,
                                type: 'i',
                                key: null,
                                ref: null,
                                props: {
                                  className: 'fa fa-link'
                                },
                                _owner: null
                              }, t('Website')],
                              htmlFor: 'website'
                            },
                            _owner: null
                          }, React.createElement('input', _extends({ type: 'text', className: 'col-md-12', placeholder: '' }, linkMember('website', props)))],
                          className: 'col-md-6'
                        },
                        _owner: null
                      },
                      className: 'row'
                    },
                    _owner: null
                  }],
                  className: 'col-md-9'
                },
                _owner: null
              },
              className: 'row'
            },
            _owner: null
          }]
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: 'footer',
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'button',
            key: null,
            ref: null,
            props: {
              children: t('Remove Team Member'),
              className: 'btn remove-team-member',
              onClick: props.onDelete
            },
            _owner: null
          }
        },
        _owner: null
      }],
      className: 'thumbnail team-member othermember'
    },
    _owner: null
  };
};
module.exports = exports['default'];


},{"../../stores/I18nStore.js":43}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mixins = require('../../helpers/mixins.jsx');

// Flux
var t = require('../../stores/I18nStore.js').getTranslate();

var ThemeSelect = (function (_React$Component) {
  _inherits(ThemeSelect, _React$Component);

  function ThemeSelect() {
    _classCallCheck(this, ThemeSelect);

    _get(Object.getPrototypeOf(ThemeSelect.prototype), 'constructor', this).call(this);
    this.state = {
      maxChecked: 3,
      totalChecked: 0
    };
  }

  _createClass(ThemeSelect, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _this = this;
      var checkboxes = this.props.valueLink.value;
      var totalChecked = 0;

      for (var i in checkboxes) {
        if (checkboxes[i] && i.substring(0, 6) === 'theme-') {
          totalChecked++;
        }
      }

      // TODO: Don't select themes for NYC
      return {
        $$typeof: _typeofReactElement,
        type: 'fieldset',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'legend',
            key: null,
            ref: null,
            props: {
              children: t('Themes'),
              className: 'required-legend'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: t('Pick between %d and %d boxes.', 1, this.state.maxChecked),
              className: 'alert alert-info'
            },
            _owner: null
          }, this.props.themeCategories.map(function (category) {
            return {
              $$typeof: _typeofReactElement,
              type: 'fieldset',
              key: category.name,
              ref: null,
              props: {
                children: [{
                  $$typeof: _typeofReactElement,
                  type: 'legend',
                  key: null,
                  ref: null,
                  props: {
                    children: t(category.name)
                  },
                  _owner: null
                }, category.themes.map(function (theme) {
                  // Don't let a checkbox be checked if it pushes over limit
                  var disabled = totalChecked >= _this.state.maxChecked && !checkboxes[theme.id];
                  return {
                    $$typeof: _typeofReactElement,
                    type: 'label',
                    key: theme.id,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'input',
                        key: null,
                        ref: null,
                        props: {
                          type: 'checkbox',
                          disabled: disabled,
                          checkedLink: _this2.linkParentState(theme.id)
                        },
                        _owner: null
                      }, t(theme.name)],
                      className: 'checkbox'
                    },
                    _owner: null
                  };
                })]
              },
              _owner: null
            };
          }), ';'],
          id: 'theme-select'
        },
        _owner: null
      };
    }
  }]);

  return ThemeSelect;
})(React.Component);

exports['default'] = ThemeSelect;

Object.assign(ThemeSelect.prototype, mixins.linkedParentState);
ThemeSelect.defaultProps = {
  // Using array for themes to enforce order
  themeCategories: [{
    name: 'Community',
    themes: [{
      id: 'theme-civic-activist',
      name: 'Activism'
    }, {
      id: 'theme-civic-truecitizen',
      name: 'Citizenry'
    }, {
      id: 'theme-civic-goodneighbour',
      name: 'Community'
    }, {
      id: 'theme-culture-writer',
      name: 'Storytelling'
    }]
  }, {
    name: 'City-building',
    themes: [{
      id: 'theme-urban-architecturalenthusiast',
      name: 'Architecture'
    }, {
      id: 'theme-culture-aesthete',
      name: 'Design'
    }, {
      id: 'theme-urban-suburbanexplorer',
      name: 'Suburbs'
    }, {
      id: 'theme-urban-moversandshakers',
      name: 'Transportation'
    }]
  }, {
    name: 'Society',
    themes: [{
      id: 'theme-civic-gender',
      name: 'Gender'
    }, {
      id: 'theme-civic-health',
      name: 'Health'
    }, {
      id: 'theme-culture-historybuff',
      name: 'Heritage'
    }, {
      id: 'theme-civic-nativeissues',
      name: 'Native Issues'
    }, {
      id: 'theme-civic-religion',
      name: 'Religion'
    }]
  }, {
    name: 'Expression',
    themes: [{
      id: 'theme-culture-artist',
      name: 'Art'
    }, {
      id: 'theme-urban-film',
      name: 'Film'
    }, {
      id: 'theme-culture-bookworm',
      name: 'Literature'
    }, {
      id: 'theme-urban-music',
      name: 'Music'
    }, {
      id: 'theme-urban-play',
      name: 'Play'
    }]
  }, {
    name: 'The Natural World',
    themes: [{
      id: 'theme-nature-petlover',
      name: 'Animals'
    }, {
      id: 'theme-nature-greenthumb',
      name: 'Gardening'
    }, {
      id: 'theme-nature-naturelover',
      name: 'Nature'
    }, {
      id: 'theme-urban-water',
      name: 'Water'
    }]
  }, {
    name: 'Modernity',
    themes: [{
      id: 'theme-civic-international',
      name: 'International Issues'
    }, {
      id: 'theme-civic-military',
      name: 'Military'
    }, {
      id: 'theme-civic-commerce',
      name: 'Commerce'
    }, {
      id: 'theme-culture-nightowl',
      name: 'Night Life'
    }, {
      id: 'theme-culture-techie',
      name: 'Technology'
    }, {
      id: 'theme-urban-sports',
      name: 'Sports'
    }, {
      id: 'theme-culture-foodie',
      name: 'Food'
    }]
  }]
};
module.exports = exports['default'];


},{"../../helpers/mixins.jsx":41,"../../stores/I18nStore.js":43}],22:[function(require,module,exports){
// Flux
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var t = require('../../stores/I18nStore.js').getTranslate();

var WalkPublish = (function (_React$Component) {
  _inherits(WalkPublish, _React$Component);

  function WalkPublish(props) {
    _classCallCheck(this, WalkPublish);

    _get(Object.getPrototypeOf(WalkPublish.prototype), 'constructor', this).call(this, props);
    this.state = {
      eventbrite: !!(props.mirrors && props.mirrors.eventbrite)
    };

    this.handlePublish = this.handlePublish.bind(this);
  }

  _createClass(WalkPublish, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      // Bootstrap Modal
      $(React.findDOMNode(this)).modal();

      // Close the modal when modal closes
      $(React.findDOMNode(this)).bind('hidden.bs.modal', function () {
        return _this.props.close();
      });
    }
  }, {
    key: 'handlePublish',
    value: function handlePublish() {
      var _this2 = this;

      // This function's meant for callbacks, so it grabs the URL from the caller's state
      this.props.saveWalk({ publish: true }, function () {
        return window.location = _this2.props.url;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      // Check city config for which walk mirroring services to expose
      var mirrorWalk = undefined;
      if (this.props.city.mirrors.indexOf('eventbrite') > -1) {
        mirrorWalk = {
          $$typeof: _typeofReactElement,
          type: 'label',
          key: null,
          ref: null,
          props: {
            children: [{
              $$typeof: _typeofReactElement,
              type: 'input',
              key: null,
              ref: null,
              props: {
                type: 'checkbox',
                checkedLink: this.linkState('eventbrite')
              },
              _owner: null
            }, t('Publish walk to EventBrite')],
            className: 'checkbox'
          },
          _owner: null
        };
      }

      return {
        $$typeof: _typeofReactElement,
        type: 'dialog',
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'div',
            key: null,
            ref: null,
            props: {
              children: {
                $$typeof: _typeofReactElement,
                type: 'article',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'header',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'button',
                        key: null,
                        ref: null,
                        props: {
                          children: '×',
                          type: 'button',
                          className: 'close',
                          'data-dismiss': 'modal',
                          'aria-hidden': 'true'
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'h3',
                        key: null,
                        ref: null,
                        props: {
                          children: t('Okay, You\'re Ready to Publish')
                        },
                        _owner: null
                      }]
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'div',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'p',
                        key: null,
                        ref: null,
                        props: {
                          children: t('Just one more thing! Once you hit publish your walk will be live on Jane\'s Walk right away. You can return at any time to make changes.')
                        },
                        _owner: null
                      }, mirrorWalk],
                      className: 'modal-body'
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'footer',
                    key: null,
                    ref: null,
                    props: {
                      children: [{
                        $$typeof: _typeofReactElement,
                        type: 'div',
                        key: null,
                        ref: null,
                        props: {
                          children: {
                            $$typeof: _typeofReactElement,
                            type: 'a',
                            key: null,
                            ref: null,
                            props: {
                              children: [' ', t('Bring me back to edit')],
                              className: 'walkthrough close',
                              'data-dismiss': 'modal',
                              onClick: this.props.close.bind(this)
                            },
                            _owner: null
                          },
                          className: 'pull-left'
                        },
                        _owner: null
                      }, {
                        $$typeof: _typeofReactElement,
                        type: 'a',
                        key: null,
                        ref: null,
                        props: {
                          children: {
                            $$typeof: _typeofReactElement,
                            type: 'button',
                            key: null,
                            ref: null,
                            props: {
                              children: t('Publish'),
                              className: 'btn btn-primary walkthrough',
                              'data-step': 'publish-confirmation',
                              onClick: this.handlePublish
                            },
                            _owner: null
                          }
                        },
                        _owner: null
                      }]
                    },
                    _owner: null
                  }]
                },
                _owner: null
              }
            },
            _owner: null
          },
          id: 'publish-warning'
        },
        _owner: null
      };
    }
  }]);

  return WalkPublish;
})(React.Component);

exports['default'] = WalkPublish;

Object.assign(WalkPublish.prototype, React.addons.LinkedStateMixin);
module.exports = exports['default'];


},{"../../stores/I18nStore.js":43}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mixins = require('../../helpers/mixins.jsx');

// Flux
var i18n = require('../../stores/I18nStore.js');
var t = i18n.getTranslate();

var WardSelect = (function (_React$Component) {
  _inherits(WardSelect, _React$Component);

  function WardSelect() {
    _classCallCheck(this, WardSelect);

    _get(Object.getPrototypeOf(WardSelect.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(WardSelect, [{
    key: 'render',
    value: function render() {
      var wards = this.props.wards;
      if (wards && this.props.valueLink) {
        return {
          $$typeof: _typeofReactElement,
          type: 'fieldset',
          key: null,
          ref: null,
          props: {
            children: [{
              $$typeof: _typeofReactElement,
              type: 'legend',
              key: null,
              ref: null,
              props: {
                children: t('Sub-locality')
              },
              _owner: null
            }, {
              $$typeof: _typeofReactElement,
              type: 'div',
              key: null,
              ref: null,
              props: {
                children: [{
                  $$typeof: _typeofReactElement,
                  type: 'div',
                  key: null,
                  ref: null,
                  props: {
                    children: t('Choose a specific neighbourhood or area where your walk will take place.'),
                    className: 'alert alert-info'
                  },
                  _owner: null
                }, {
                  $$typeof: _typeofReactElement,
                  type: 'select',
                  key: null,
                  ref: null,
                  props: {
                    children: [{
                      $$typeof: _typeofReactElement,
                      type: 'option',
                      key: null,
                      ref: null,
                      props: {
                        children: 'Choose a region',
                        value: ''
                      },
                      _owner: null
                    }, wards.map(function (e, i) {
                      return {
                        $$typeof: _typeofReactElement,
                        type: 'option',
                        key: i,
                        ref: null,
                        props: {
                          children: e.value,
                          value: e.value
                        },
                        _owner: null
                      };
                    })],
                    id: 'ward',
                    name: 'ward',
                    valueLink: this.props.valueLink
                  },
                  _owner: null
                }],
                className: 'item'
              },
              _owner: null
            }],
            id: 'wards'
          },
          _owner: null
        };
      } else {
        return {
          $$typeof: _typeofReactElement,
          type: 'fieldset',
          key: null,
          ref: null,
          props: {
            id: 'wards'
          },
          _owner: null
        };
      }
    }
  }]);

  return WardSelect;
})(React.Component);

exports['default'] = WardSelect;

Object.assign(WardSelect.prototype, mixins.linkedParentState);
module.exports = exports['default'];


},{"../../helpers/mixins.jsx":41,"../../stores/I18nStore.js":43}],24:[function(require,module,exports){
/**
 * Basic wrapper around jQuery.datepicker(), so it can be loaded
 * as a React class
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeofReactElement = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePicker = (function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker() {
    _classCallCheck(this, DatePicker);

    _get(Object.getPrototypeOf(DatePicker.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(DatePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Setup sorting on the walk-stops list
      $(React.findDOMNode(this)).datepicker({
        defaultDate: this.props.defaultDate,
        onSelect: (function (dateText) {
          // Silly, but needed for inconsistent date formats across libs
          var dateMDY = dateText.split('/');
          this.props.setDay(new Date(Date.UTC(dateMDY[2], dateMDY[0] - 1, dateMDY[1])));
        }).bind(this)
      });
    }
  }, {
    key: "render",
    value: function render() {
      return {
        $$typeof: _typeofReactElement,
        type: "div",
        key: null,
        ref: null,
        props: {
          className: "date-picker"
        },
        _owner: null
      };
    }
  }]);

  return DatePicker;
})(React.Component);

exports["default"] = DatePicker;
module.exports = exports["default"];


},{}],25:[function(require,module,exports){
/**
 * The table showing open-schedule walks and their times
 */

// TODO: Once 'open' walk schedules are implemented on festivals
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeofReactElement = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeOpenTable = (function (_React$Component) {
  _inherits(TimeOpenTable, _React$Component);

  function TimeOpenTable() {
    _classCallCheck(this, TimeOpenTable);

    _get(Object.getPrototypeOf(TimeOpenTable.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(TimeOpenTable, [{
    key: "render",
    value: function render() {
      return {
        $$typeof: _typeofReactElement,
        type: "table",
        key: null,
        ref: null,
        props: {},
        _owner: null
      };
    }
  }]);

  return TimeOpenTable;
})(React.Component);

exports["default"] = TimeOpenTable;
module.exports = exports["default"];


},{}],26:[function(require,module,exports){
// Flux
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var i18n = require('../../../stores/I18nStore.js');
var t = i18n.getTranslate();

/**
 * Select options to choose your time.
 * This is an important one, considering how complex timezones and localizing
 * date formats can be when you're an international organization.
 */

var TimePicker = (function (_React$Component) {
  _inherits(TimePicker, _React$Component);

  function TimePicker() {
    _classCallCheck(this, TimePicker);

    _get(Object.getPrototypeOf(TimePicker.prototype), 'constructor', this).call(this);
    this.state = { startTimes: [] };
  }

  // Date management is slow, so avoid rebuilding unless needed

  _createClass(TimePicker, [{
    key: 'setStartTimes',
    value: function setStartTimes(start, step) {
      if (this.state.start !== start) {
        // It's fastest to build our date formatter once upfront
        var dtfTime = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' });
        // All start times begin on the date's 0:00, and by default step every 30 min
        var yrMoDay = [start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()];
        var firstTime = Date.UTC.apply(this, yrMoDay);
        var lastTime = Date.UTC.apply(this, yrMoDay.concat([23, 30]));
        var startTimes = [];
        step = step || 1800000;

        for (var i = 0, time = firstTime; time <= lastTime; time += step) {
          startTimes.push({
            asMs: time,
            asString: dtfTime.format(time)
          });
        }

        this.setState({
          start: start,
          startTimes: startTimes
        });
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setStartTimes(new Date(this.props.valueLinkStart.value));
    }
  }, {
    key: 'render',
    value: function render() {
      // Count walk times in 30 min increments
      var linkDuration = this.props.valueLinkDuration;
      var requestChange = linkDuration.requestChange;
      var linkStart = this.props.valueLinkStart;

      // Cast duration as a number
      linkDuration.requestChange = function (value) {
        return requestChange(+value);
      };

      return {
        $$typeof: _typeofReactElement,
        type: 'div',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'label',
            key: null,
            ref: null,
            props: {
              children: [t('Start Time'), ':'],
              htmlFor: 'walk-time'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'select',
            key: null,
            ref: null,
            props: {
              children: this.state.startTimes.map(function (time, i) {
                return {
                  $$typeof: _typeofReactElement,
                  type: 'option',
                  key: 'walk-start' + i,
                  ref: null,
                  props: {
                    children: time.asString,
                    value: time.asMs
                  },
                  _owner: null
                };
              }),
              name: 'start',
              id: 'walk-start',
              valueLink: linkStart
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'label',
            key: null,
            ref: null,
            props: {
              children: [t('Approximate Duration of Walk'), ':'],
              htmlFor: 'walk-time'
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'select',
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: 'option',
                key: null,
                ref: null,
                props: {
                  children: '30 Minutes',
                  value: 30 * 60000
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'option',
                key: null,
                ref: null,
                props: {
                  children: '1 Hour',
                  value: 60 * 60000
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'option',
                key: null,
                ref: null,
                props: {
                  children: '1 Hour, 30 Minutes',
                  value: 90 * 60000
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'option',
                key: null,
                ref: null,
                props: {
                  children: '2 Hours',
                  value: 120 * 60000
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'option',
                key: null,
                ref: null,
                props: {
                  children: '2 Hours, 30 Minutes',
                  value: 150 * 60000
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'option',
                key: null,
                ref: null,
                props: {
                  children: '3 Hours',
                  value: 180 * 60000
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: 'option',
                key: null,
                ref: null,
                props: {
                  children: '3 Hours, 30 Minutes',
                  value: 210 * 60000
                },
                _owner: null
              }],
              name: 'duration',
              id: 'walk-duration',
              valueLink: linkDuration
            },
            _owner: null
          }],
          className: 'time-picker'
        },
        _owner: null
      };
    }
  }]);

  return TimePicker;
})(React.Component);

exports['default'] = TimePicker;
module.exports = exports['default'];


},{"../../../stores/I18nStore.js":43}],27:[function(require,module,exports){
// Flux
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var i18n = require('../../../stores/I18nStore.js');
var t = i18n.getTranslate();
var t2 = i18n.getTranslatePlural();

/**
 * The table with all the times that the walks are scheduled
 */

var TimeSetTable = (function (_React$Component) {
  _inherits(TimeSetTable, _React$Component);

  function TimeSetTable() {
    _classCallCheck(this, TimeSetTable);

    _get(Object.getPrototypeOf(TimeSetTable.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(TimeSetTable, [{
    key: 'removeSlot',

    // Remove a scheduled time
    value: function removeSlot(i) {
      var valueLink = this.props.valueLink;
      var value = valueLink.value;
      var slots = (value.slots || []).slice();

      slots.splice(i, 1);
      value.slots = slots;

      valueLink.requestChange(value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var slots = this.props.valueLink.value.slots || [];

      var dtfDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
      var dtfDuration = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' });

      return {
        $$typeof: _typeofReactElement,
        type: 'table',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'thead',
            key: null,
            ref: null,
            props: {
              children: {
                $$typeof: _typeofReactElement,
                type: 'tr',
                key: null,
                ref: null,
                props: {
                  children: [{
                    $$typeof: _typeofReactElement,
                    type: 'th',
                    key: null,
                    ref: null,
                    props: {
                      children: t('Date')
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'th',
                    key: null,
                    ref: null,
                    props: {
                      children: t('Start Time')
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'th',
                    key: null,
                    ref: null,
                    props: {
                      children: t('Duration')
                    },
                    _owner: null
                  }, {
                    $$typeof: _typeofReactElement,
                    type: 'th',
                    key: null,
                    ref: null,
                    props: {},
                    _owner: null
                  }]
                },
                _owner: null
              }
            },
            _owner: null
          }, {
            $$typeof: _typeofReactElement,
            type: 'tbody',
            key: null,
            ref: null,
            props: {
              children: slots.map(function (slot, i) {
                var start = new Date(slot[0] * 1000);
                var duration = new Date((slot[1] - slot[0]) * 1000);

                var hours = duration.getUTCHours();
                var minutes = duration.getUTCMinutes();
                var durationFmt = [];
                if (hours) {
                  durationFmt.push(t2('%d Hour', '%d Hours', hours));
                }
                if (minutes) {
                  durationFmt.push(t2('%d Minute', '%d Minutes', minutes));
                }

                return {
                  $$typeof: _typeofReactElement,
                  type: 'tr',
                  key: i,
                  ref: null,
                  props: {
                    children: [{
                      $$typeof: _typeofReactElement,
                      type: 'td',
                      key: null,
                      ref: null,
                      props: {
                        children: dtfDate.format(start)
                      },
                      _owner: null
                    }, {
                      $$typeof: _typeofReactElement,
                      type: 'td',
                      key: null,
                      ref: null,
                      props: {
                        children: dtfDuration.format(start)
                      },
                      _owner: null
                    }, {
                      $$typeof: _typeofReactElement,
                      type: 'td',
                      key: null,
                      ref: null,
                      props: {
                        children: durationFmt.join(', ')
                      },
                      _owner: null
                    }, {
                      $$typeof: _typeofReactElement,
                      type: 'td',
                      key: null,
                      ref: null,
                      props: {
                        children: {
                          $$typeof: _typeofReactElement,
                          type: 'a',
                          key: null,
                          ref: null,
                          props: {
                            children: [{
                              $$typeof: _typeofReactElement,
                              type: 'i',
                              key: null,
                              ref: null,
                              props: {
                                className: 'fa fa-times-circle-o'
                              },
                              _owner: null
                            }, ' ', t('Remove')],
                            onClick: _this.removeSlot.bind(_this, i)
                          },
                          _owner: null
                        }
                      },
                      _owner: null
                    }]
                  },
                  _owner: null
                };
              })
            },
            _owner: null
          }],
          className: 'table table-bordered table-hover',
          id: 'date-list-all'
        },
        _owner: null
      };
    }
  }]);

  return TimeSetTable;
})(React.Component);

exports['default'] = TimeSetTable;
module.exports = exports['default'];


},{"../../../stores/I18nStore.js":43}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeofReactElement = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 60103;

function _defaultProps(defaultProps, props) { if (defaultProps) { for (var propName in defaultProps) { if (typeof props[propName] === "undefined") { props[propName] = defaultProps[propName]; } } } return props; }

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

exports["default"] = function (_ref) {
  var filters = _ref.filters;
  var remove = _ref.remove;
  var changeFilter = _ref.changeFilter;
  return {
    $$typeof: _typeofReactElement,
    type: "div",
    key: null,
    ref: null,
    props: {
      children: {
        $$typeof: _typeofReactElement,
        type: ReactCSSTransitionGroup,
        key: null,
        ref: null,
        props: _defaultProps(ReactCSSTransitionGroup.defaultProps, {
          children: filters.map(function (filter, i) {
            var cbAndRemove = function cbAndRemove(ev) {
              ev.preventDefault();
              filter.cb(filter.value);
              remove(i);
            };
            var handleChange = function handleChange(ev) {
              return changeFilter(i, ev.target.value);
            };
            var input = null;

            if (filter.type === 'text') {
              input = {
                $$typeof: _typeofReactElement,
                type: "input",
                key: null,
                ref: null,
                props: {
                  type: "text",
                  placeholder: filter.placeholder,
                  value: filter.text,
                  onChange: handleChange
                },
                _owner: null
              };
            } else if (filter.type === 'select') {
              input = {
                $$typeof: _typeofReactElement,
                type: "select",
                key: null,
                ref: null,
                props: {
                  children: filter.options.map(function (option, i) {
                    return {
                      $$typeof: _typeofReactElement,
                      type: "option",
                      key: 'option' + i,
                      ref: null,
                      props: {
                        children: option.title,
                        value: i
                      },
                      _owner: null
                    };
                  }),
                  selected: filter.value,
                  onChange: handleChange
                },
                _owner: null
              };
            }

            // FIXME: these spans are rather silly, but needed to play nice with bootstrap
            return {
              $$typeof: _typeofReactElement,
              type: "form",
              key: null,
              ref: null,
              props: {
                children: [{
                  $$typeof: _typeofReactElement,
                  type: "i",
                  key: null,
                  ref: null,
                  props: {
                    className: filter.icon
                  },
                  _owner: null
                }, {
                  $$typeof: _typeofReactElement,
                  type: "span",
                  key: null,
                  ref: null,
                  props: {
                    children: input,
                    className: "input"
                  },
                  _owner: null
                }, {
                  $$typeof: _typeofReactElement,
                  type: "span",
                  key: null,
                  ref: null,
                  props: {
                    children: {
                      $$typeof: _typeofReactElement,
                      type: "input",
                      key: null,
                      ref: null,
                      props: {
                        type: "submit",
                        value: 'Go'
                      },
                      _owner: null
                    },
                    className: "button"
                  },
                  _owner: null
                }, {
                  $$typeof: _typeofReactElement,
                  type: "span",
                  key: null,
                  ref: null,
                  props: {
                    children: {
                      $$typeof: _typeofReactElement,
                      type: "input",
                      key: null,
                      ref: null,
                      props: {
                        type: "button",
                        value: 'Cancel',
                        onClick: function () {
                          return remove(i);
                        }
                      },
                      _owner: null
                    },
                    className: "button"
                  },
                  _owner: null
                }],
                className: "filter",
                onSubmit: cbAndRemove
              },
              _owner: null
            };
          }),
          transitionName: "fade"
        }),
        _owner: null
      },
      className: "filterInputs"
    },
    _owner: null
  };
};

module.exports = exports["default"];


},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InstagramConnect = (function (_React$Component) {
  _inherits(InstagramConnect, _React$Component);

  function InstagramConnect() {
    _classCallCheck(this, InstagramConnect);

    _get(Object.getPrototypeOf(InstagramConnect.prototype), 'constructor', this).call(this);
    this.state = { accessToken: null };
  }

  _createClass(InstagramConnect, [{
    key: 'handleConnect',
    value: function handleConnect(cb) {
      var _this = this;

      var clientID = 'af1d04f3e16940f3801ee06461c9e4bb';
      var redirectURI = 'http://janeswalk.org/connected';

      // Race-condition prone, but safest way to pull this from a child window
      window.loadAccessToken = function (accessToken) {
        return _this.setState({ accessToken: accessToken }, cb);
      };

      var authWindow = window.open('https://instagram.com/oauth/authorize/?client_id=' + clientID + '&redirect_uri=' + redirectURI + '&response_type=token');
      this.setState({ authWindow: authWindow });
    }
  }, {
    key: 'handleLoadFeed',
    value: function handleLoadFeed(query) {
      var _this2 = this;

      $.ajax({
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        url: 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + this.state.accessToken,
        success: function success(data) {
          var markers = (_this2.props.valueLink.value || { markers: [] }).markers.slice();
          var walkMap = data.data.filter(function (gram) {
            var tagMatch = true;
            if (query) {
              tagMatch = gram.tags.indexOf(query) !== -1;
            }
            return !!(gram.location && tagMatch);
          }).reverse().map(function (gram) {
            // If the first comment is from the owner, use that as the description
            var description = '';
            if (gram.comments && gram.comments.data.length > 0) {
              if (gram.comments.data[0].from.id === gram.user.id) {
                description = gram.comments.data[0].text;
              }
            }

            return {
              title: gram.caption ? gram.caption.text.replace(/\#\w+/g, '').trim() : '',
              description: description,
              media: {
                id: gram.id,
                url: gram.link,
                type: 'instagram'
              },
              lat: gram.location.latitude,
              lng: gram.location.longitude
            };
          });

          _this2.props.valueLink.requestChange({
            markers: markers.concat(walkMap),
            route: _this2.props.valueLink.value.route
          }, function () {
            _this2.props.refreshGMap();
            _this2.props.boundMapByWalk();
          });
        }
      });
    }
  }, {
    key: 'addFilter',
    value: function addFilter() {
      var _this3 = this;

      var filterProps = {
        type: 'text',
        icon: 'fa fa-instagram',
        placeholder: 'Type in the tag you used on the geocoded photos for your walk',
        value: '',
        cb: this.handleLoadFeed.bind(this)
      };
      if (this.state.accessToken) {
        this.props.addFilter(filterProps);
      } else {
        // Connect, and add the box when done
        this.handleConnect(function () {
          return _this3.props.addFilter(filterProps);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return {
        $$typeof: _typeofReactElement,
        type: 'button',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'i',
            key: null,
            ref: null,
            props: {
              className: 'fa fa-instagram'
            },
            _owner: null
          }, 'Instagram'],
          onClick: function () {
            return _this4.addFilter();
          }
        },
        _owner: null
      };
    }
  }]);

  return InstagramConnect;
})(React.Component);

exports['default'] = InstagramConnect;
module.exports = exports['default'];


},{}],30:[function(require,module,exports){
/**
 * Get some sounds from SoundCloud!
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SoundCloudConnect = (function (_React$Component) {
  _inherits(SoundCloudConnect, _React$Component);

  function SoundCloudConnect() {
    _classCallCheck(this, SoundCloudConnect);

    _get(Object.getPrototypeOf(SoundCloudConnect.prototype), 'constructor', this).call(this);
    this.state = {
      playlists: []
    };
  }

  _createClass(SoundCloudConnect, [{
    key: 'handleConnect',
    value: function handleConnect(cb) {
      var _this2 = this;

      var clientID = '3a4c85d0eb4f8579fb680bb738bd0ba8';
      var redirectURI = 'http://janeswalk.org/connected';

      // FIXME Race-condition prone if you open multiple services in parallel
      window.loadAccessToken = function (accessToken) {
        _this2.setState({ accessToken: accessToken }, _this2.handleLoadPlaylists(accessToken, cb));
      };

      var authWindow = window.open('https://soundcloud.com/connect/?client_id=' + clientID + '&redirect_uri=' + redirectURI + '&response_type=token&state=soundcloud');
      this.setState({ authWindow: authWindow });
    }
  }, {
    key: 'handleLoadPlaylists',
    value: function handleLoadPlaylists(accessToken, cb) {
      accessToken = accessToken || this.state.accessToken;

      $.ajax({
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        url: 'https://api.soundcloud.com/me/playlists.json?oauth_token=' + accessToken,
        success: function success(data) {
          _this.setState({ playlists: data });
          cb();
        }
      });
    }
  }, {
    key: 'loadPointsFromPlaylist',
    value: function loadPointsFromPlaylist(i) {
      var _this3 = this;

      var markers = (this.props.valueLink.value || { markers: [] }).markers.slice();

      var points = this.state.playlists[i].tracks.map(function (track) {
        var point = {
          title: track.title || '',
          description: track.description || '',
          media: {
            type: 'soundcloud',
            id: track.id,
            url: track.uri
          }
        };

        // Soundcloud puts geotags in the regular tags, as geo:lat=
        track.tag_list.split(' ').forEach(function (tag) {
          var idx = undefined;
          idx = tag.indexOf('geo:lat=');
          if (idx > -1) {
            point.lat = tag.substr(idx + 8);
          }
          idx = tag.indexOf('geo:lon=');
          if (idx > -1) {
            point.lng = tag.substr(idx + 8);
          }
        });

        return point;
      });

      this.props.valueLink.requestChange({ markers: markers.concat(points), route: this.props.valueLink.value.route }, function () {
        _this3.props.refreshGMap();
        _this3.props.boundMapByWalk();
      });
    }
  }, {
    key: 'addFilter',
    value: function addFilter() {
      var _this4 = this;

      var filterProps = {
        type: 'select',
        icon: 'fa fa-soundcloud',
        options: this.state.playlists,
        value: 0,
        cb: this.loadPointsFromPlaylist
      };

      if (this.state.accessToken) {
        this.props.addFilter(filterProps);
      } else {
        // Connect, and add the box when done
        this.handleConnect(function () {
          filterProps.options = _this4.state.playlists;
          _this4.props.addFilter(filterProps);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      return {
        $$typeof: _typeofReactElement,
        type: 'button',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'i',
            key: null,
            ref: null,
            props: {
              className: 'fa fa-soundcloud'
            },
            _owner: null
          }, 'SoundCloud'],
          onClick: function () {
            return _this5.addFilter();
          }
        },
        _owner: null
      };
    }
  }]);

  return SoundCloudConnect;
})(React.Component);

exports['default'] = SoundCloudConnect;
module.exports = exports['default'];


},{}],31:[function(require,module,exports){
/**
 * Pull all the tweets
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TwitterConnect = (function (_React$Component) {
  _inherits(TwitterConnect, _React$Component);

  function TwitterConnect() {
    _classCallCheck(this, TwitterConnect);

    _get(Object.getPrototypeOf(TwitterConnect.prototype), 'constructor', this).call(this);
    this.state = {
      query: '',
      accessToken: true
    };
  }

  _createClass(TwitterConnect, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this = this;

      window.setAccessToken = function (accessToken) {
        return _this.setState({ accessToken: accessToken });
      };
    }
  }, {
    key: 'handleLoadToken',
    value: function handleLoadToken() {
      var _this2 = this;

      // Twitter requires a server-side auth with secret, so clients get token from JW
      $.ajax({
        method: 'GET',
        url: '/api/twitter',
        dataType: 'json',
        success: function success(data) {
          if (data.access_token) {
            _this2.setState({ accessToken: data.access_token });
          }
        }
      });
    }
  }, {
    key: 'loadFeed',
    value: function loadFeed(query) {
      var _this3 = this;

      query = encodeURIComponent(query);

      $.ajax({
        type: 'GET',
        url: '/api/twitter?q=' + query + '&coords=' + this.props.city.latlng[0] + ',' + this.props.city.latlng[1],
        success: function success(data) {
          var markers = (_this3.props.valueLink.value || { markers: [] }).markers.slice();

          _this3.props.valueLink.requestChange({
            markers: markers.concat(data.map(function (tweet) {
              return {
                // Take first 5 words as the title
                title: tweet.description.split(' ').slice(0, 5).join(' '),
                description: tweet.description,
                lat: tweet.lat,
                lng: tweet.lng
              };
            })),
            route: _this3.props.valueLink.value.route
          }, function () {
            // kludge - need to find if there's a callback we can pass into gmaps for this
            setTimeout(function () {
              _this3.props.refreshGMap();
              _this3.props.boundMapByWalk();
            }, 100);
          });
        }
      });
    }
  }, {
    key: 'handleQueryChange',
    value: function handleQueryChange(ev) {
      this.setState({ query: ev.target.value });
    }
  }, {
    key: 'addFilter',
    value: function addFilter() {
      // The filter we set to the 'filter box'
      this.props.addFilter({
        type: 'text',
        icon: 'fa fa-twitter',
        placeholder: 'Type in a standard twitter search for geocoded tweets, e.g. "#ParkStroll #janeswalk from:MyName"',
        value: '',
        cb: this.loadFeed
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return {
        $$typeof: _typeofReactElement,
        type: 'button',
        key: null,
        ref: null,
        props: {
          children: [{
            $$typeof: _typeofReactElement,
            type: 'i',
            key: null,
            ref: null,
            props: {
              className: 'fa fa-twitter'
            },
            _owner: null
          }, 'twitter'],
          onClick: function () {
            return _this4.addFilter;
          }
        },
        _owner: null
      };
    }
  }]);

  return TwitterConnect;
})(React.Component);

exports['default'] = TwitterConnect;
module.exports = exports['default'];


},{}],32:[function(require,module,exports){
/**
 * The 'info window', aka the input box that pops up over markers in maps
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WalkInfoWindow = (function (_React$Component) {
  _inherits(WalkInfoWindow, _React$Component);

  function WalkInfoWindow(props) {
    _classCallCheck(this, WalkInfoWindow);

    _get(Object.getPrototypeOf(WalkInfoWindow.prototype), 'constructor', this).call(this);
    // Weird, but needed since it's rendering to a DOM node
    this.state = { marker: props.marker };

    // Bind methods
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  /**
   * Set the content of this marker
   * @param Object props The properties to set
   */

  _createClass(WalkInfoWindow, [{
    key: 'setMarkerContent',
    value: function setMarkerContent(props) {
      var marker = this.state.marker;
      // Parse, apply new properties, re-encode then assign as new title. Needed
      // as gmaps doesn't give you multiple fields, so we encode in the title.
      marker.setTitle(JSON.stringify(Object.assign({}, JSON.parse(marker.getTitle()), props)));
      this.setState({ marker: marker }, this.props.refresh);
    }

    // Simple method to set title property
  }, {
    key: 'handleTitleChange',
    value: function handleTitleChange(ev) {
      this.setMarkerContent({ title: ev.target.value });
    }

    // Simple method to set description property
  }, {
    key: 'handleDescriptionChange',
    value: function handleDescriptionChange(ev) {
      this.setMarkerContent({ description: ev.target.value });
    }
  }, {
    key: 'render',
    value: function render() {
      var marker = this.state.marker;
      if (marker) {
        var markerContent = JSON.parse(marker.getTitle());
        var media = undefined;

        // Load rich media
        if (markerContent.media) {
          if (markerContent.media.type === 'instagram') {
            media = {
              $$typeof: _typeofReactElement,
              type: 'img',
              key: null,
              ref: null,
              props: {
                className: 'media',
                src: markerContent.media.url + 'media?size=t'
              },
              _owner: null
            };
          } else if (markerContent.media.type === 'soundcloud') {
            media = {
              $$typeof: _typeofReactElement,
              type: 'iframe',
              key: null,
              ref: null,
              props: {
                className: 'media',
                width: '150',
                height: '100%',
                scrolling: 'no',
                frameborder: 'no',
                src: 'https://w.soundcloud.com/player/?url=' + markerContent.media.url + '&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true'
              },
              _owner: null
            };
          }
        }

        return {
          $$typeof: _typeofReactElement,
          type: 'div',
          key: null,
          ref: null,
          props: {
            children: [media, {
              $$typeof: _typeofReactElement,
              type: 'section',
              key: null,
              ref: null,
              props: {
                children: [{
                  $$typeof: _typeofReactElement,
                  type: 'input',
                  key: null,
                  ref: null,
                  props: {
                    type: 'text',
                    onChange: this.handleTitleChange,
                    value: markerContent.title,
                    placeholder: 'Title of this stop',
                    className: 'marker-title'
                  },
                  _owner: null
                }, {
                  $$typeof: _typeofReactElement,
                  type: 'textarea',
                  key: null,
                  ref: null,
                  props: {
                    className: 'marker-description box-sizing',
                    onChange: this.handleDescriptionChange,
                    placeholder: 'Description of this stop',
                    value: markerContent.description
                  },
                  _owner: null
                }],
                className: 'details'
              },
              _owner: null
            }, {
              $$typeof: _typeofReactElement,
              type: 'a',
              key: null,
              ref: null,
              props: {
                children: {
                  $$typeof: _typeofReactElement,
                  type: 'i',
                  key: null,
                  ref: null,
                  props: {
                    className: 'fa fa-trash-o'
                  },
                  _owner: null
                },
                onClick: this.props.deleteMarker
              },
              _owner: null
            }],
            className: 'stop-form'
          },
          _owner: null
        };
      }
    }
  }]);

  return WalkInfoWindow;
})(React.Component);

exports['default'] = WalkInfoWindow;
module.exports = exports['default'];


},{}],33:[function(require,module,exports){
// Flux
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeofReactElement = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 60103;

function _defaultProps(defaultProps, props) { if (defaultProps) { for (var propName in defaultProps) { if (typeof props[propName] === "undefined") { props[propName] = defaultProps[propName]; } } } return props; }

var t = require('../../../stores/I18nStore.js').getTranslate();

var UpArrow = function UpArrow(props) {
  return React.createElement(
    "a",
    _extends({ className: "move-marker-up" }, props),
    {
      $$typeof: _typeofReactElement,
      type: "i",
      key: null,
      ref: null,
      props: {
        className: "fa fa-arrow-up"
      },
      _owner: null
    }
  );
};

var DownArrow = function DownArrow(props) {
  return React.createElement(
    "a",
    _extends({ className: "move-marker-down" }, props),
    {
      $$typeof: _typeofReactElement,
      type: "i",
      key: null,
      ref: null,
      props: {
        className: "fa fa-arrow-down"
      },
      _owner: null
    }
  );
};

var DeleteStop = function DeleteStop(props) {
  return React.createElement(
    "a",
    _extends({ className: "delete-stop" }, props),
    {
      $$typeof: _typeofReactElement,
      type: "i",
      key: null,
      ref: null,
      props: {
        className: "fa fa-times-circle-o"
      },
      _owner: null
    }
  );
};

var MarkerRow = function MarkerRow(props) {
  var titleObj = JSON.parse(props.marker.title);
  var i = props.index;
  var showInfoWindow = function showInfoWindow() {
    return props.showInfoWindow(props.marker);
  };
  var meetingPlace = undefined;
  var imageThumb = undefined;
  var upArrow = undefined,
      downArrow = undefined;

  // Up/down arrows
  if (i > 0) {
    upArrow = {
      $$typeof: _typeofReactElement,
      type: UpArrow,
      key: null,
      ref: null,
      props: _defaultProps(UpArrow.defaultProps, {
        onClick: function () {
          return props.moveBefore(i, i - 1);
        }
      }),
      _owner: null
    };
  } else {
    meetingPlace = t('Meeting Place') + ': ';
  }

  if (i < props.length - 1) {
    downArrow = {
      $$typeof: _typeofReactElement,
      type: DownArrow,
      key: null,
      ref: null,
      props: _defaultProps(DownArrow.defaultProps, {
        onClick: function () {
          return props.moveBefore(i, i + 1);
        }
      }),
      _owner: null
    };
  }

  // The picture of the stop given in media
  if (titleObj.media) {
    if (titleObj.media.type === 'instagram') {
      imageThumb = {
        $$typeof: _typeofReactElement,
        type: "img",
        key: null,
        ref: null,
        props: {
          src: titleObj.media.url + 'media?size=t'
        },
        _owner: null
      };
    }
  }
  return {
    $$typeof: _typeofReactElement,
    type: "tr",
    key: null,
    ref: null,
    props: {
      children: [{
        $$typeof: _typeofReactElement,
        type: "td",
        key: null,
        ref: null,
        props: {
          children: [meetingPlace, imageThumb, titleObj.title],
          onClick: showInfoWindow
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: "td",
        key: null,
        ref: null,
        props: {
          children: titleObj.description,
          onClick: showInfoWindow
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: "td",
        key: null,
        ref: null,
        props: {
          children: [downArrow, upArrow]
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: "td",
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: DeleteStop,
            key: null,
            ref: null,
            props: _defaultProps(DeleteStop.defaultProps, {
              onClick: function () {
                return props.deleteMarker(marker);
              }
            }),
            _owner: null
          }
        },
        _owner: null
      }]
    },
    _owner: null
  };
};

/**
 * The table with all the walk stops on it, in CAW
 */
var WalkStopTable = function WalkStopTable(props) {
  var markersSet = props.markers.getArray();
  return {
    $$typeof: _typeofReactElement,
    type: "table",
    key: null,
    ref: null,
    props: {
      children: [{
        $$typeof: _typeofReactElement,
        type: "thead",
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: "tr",
            key: null,
            ref: null,
            props: {
              children: [{
                $$typeof: _typeofReactElement,
                type: "th",
                key: null,
                ref: null,
                props: {
                  children: t('Title')
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: "th",
                key: null,
                ref: null,
                props: {
                  children: t('Description')
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: "th",
                key: null,
                ref: null,
                props: {
                  children: {
                    $$typeof: _typeofReactElement,
                    type: "i",
                    key: null,
                    ref: null,
                    props: {
                      className: "fa fa-arrows"
                    },
                    _owner: null
                  },
                  className: "controls"
                },
                _owner: null
              }, {
                $$typeof: _typeofReactElement,
                type: "th",
                key: null,
                ref: null,
                props: {
                  children: {
                    $$typeof: _typeofReactElement,
                    type: "i",
                    key: null,
                    ref: null,
                    props: {
                      className: "fa fa-trash-o"
                    },
                    _owner: null
                  }
                },
                _owner: null
              }]
            },
            _owner: null
          }
        },
        _owner: null
      }, {
        $$typeof: _typeofReactElement,
        type: "tbody",
        key: null,
        ref: null,
        props: {
          children: markersSet.map(function (marker, i) {
            return React.createElement(MarkerRow, _extends({ marker: marker, key: 'marker' + i, index: i, length: markersSet.length }, props));
          })
        },
        _owner: null
      }],
      className: "table-hover routeStops"
    },
    _owner: null
  };
};

exports["default"] = WalkStopTable;
module.exports = exports["default"];


},{"../../../stores/I18nStore.js":43}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _PageJsx = require('../Page.jsx');

var _PageJsx2 = _interopRequireDefault(_PageJsx);

/**
 * _isMobile
 *
 * @static
 * @var bool
 */
var _isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

var facebookDialogDonate = {
  link: 'http://janeswalk.org',
  // picture: 'http://janeswalk.org',
  name: 'Jane\'s Walk'
};

function shareOnTwitter(event) {
  var url = encodeURIComponent('http://janeswalk.org/');
  var text = encodeURIComponent($(this).closest('.option').find('.copy').text().trim());
  var link = 'https://twitter.com/intent/tweet' + '?url=' + url + '&via=janeswalk' + '&text=' + text;

  window.open(link, 'Twitter Share', 'width=640, height=320');

  event.preventDefault();
}

function shareOnFacebook(event) {
  var shareObj = Object.assign({}, facebookDialogDonate, {
    description: $(this).closest('.option').find('.copy').text().trim()
  });
  new FacebookShareDialog(shareObj).show();
  event.preventDefault();
}

/**
 * CityPageView
 * 
 * @extends PageView
 * 
 * @public
 * @param  jQuery element
 * @return void
 */

var CityPageView = (function (_PageView) {
  _inherits(CityPageView, _PageView);

  function CityPageView(element) {
    _classCallCheck(this, CityPageView);

    _get(Object.getPrototypeOf(CityPageView.prototype), 'constructor', this).call(this, element);
    this._addCreateWalkEvent();
  }

  /**
   * _addCreateWalkEvent
   *
   * @protected
   * @return    void
   */

  _createClass(CityPageView, [{
    key: '_addCreateWalkEvent',
    value: function _addCreateWalkEvent() {
      $btn = this._element.find('.create-walk');
      $btn.click(function (event) {
        if (!JanesWalk.user) {
          event.preventDefault();
          // Redirect to the CAW you were attempting
          // FIXME: bad approach - should be dispatcher based
          JanesWalk.react.login.props.redirectURL = this.href;
          $('#login').modal();
        }
      });
    }
  }]);

  return CityPageView;
})(_PageJsx2['default']);

exports['default'] = CityPageView;
module.exports = exports['default'];


},{"../Page.jsx":12}],35:[function(require,module,exports){
'use strict';

var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;

var PageView = require('../Page.jsx');

/**
 * HomePageView
 * 
 * @extends PageView
 * 
 * @public
 * @param  jQuery element
 * @return void
 */
var HomePageView = function HomePageView(element) {
  PageView.call(this, element);
  this._addMapToggleEvents();
  this._addBgImage();
  this._addCityDropdownEvent();
  this._addCreateWalkEvent();
};
HomePageView.prototype = Object.create(PageView.prototype, {
  /**
   * _addCreateWalkEvent
   * 
   * @protected
   * @return    void
   */
  _addCreateWalkEvent: { value: function value() {
      var _this = this,
          $btn = this._element.find('.calltoaction li a[href="/walk/form/"]');
      $btn.click(function (event) {
        event.preventDefault();
        if (_this._element.find('a[href="/index.php/login/logout/"]').length) {
          location.href = $(this).attr('href');
        } else {
          _this._element.find('.overlay').show();
        }
      });
    } },

  /**
   * _addCityDropdownEvent
   * 
   * @protected
   * @return    void
   */
  _addCityDropdownEvent: { value: function value() {
      var $select = this._element.find('select.pageListSelect');
      $select.change(function (event) {
        location.href = $select.val();
      });
    } },

  /**
   * _addBgImage
   * 
   * @protected
   * @return    void
   */
  _addBgImage: { value: function value() {
      var backgroundImageUrl = this._element.attr('data-backgroundImageUrl'),
          $backgroundImageBanner = this._element.find('.backgroundImageBanner'),
          image = document.createElement("img");
      image.onload = function () {
        $backgroundImageBanner.css({
          backgroundImage: 'url(' + backgroundImageUrl + ')'
        });
        $backgroundImageBanner.removeClass('faded');
      };
      image.src = backgroundImageUrl;
    } },

  /**
   * _addCityButtonCta
   * 
   * @protected
   * @param     String cityName
   * @param     String cityPath
   * @return    void
   */
  _addCityButtonCta: { value: function value(cityName, cityPath) {
      React.render(this._element.find('.calltoaction ul').first(), {
        $$typeof: _typeofReactElement,
        type: 'li',
        key: null,
        ref: null,
        props: {
          children: {
            $$typeof: _typeofReactElement,
            type: 'a',
            key: null,
            ref: null,
            props: {
              children: ['View walks in ', cityName],
              href: cityPath,
              className: 'btn btn-primary'
            },
            _owner: null
          },
          className: 'cityButtonCta'
        },
        _owner: null
      });
    } },

  /**
   * _addMapToggleEvents
   * 
   * @protected
   * @return    void
   */
  _addMapToggleEvents: { value: function value() {
      var $showButton = this._element.find('.overlap .controls a.showButton'),
          $closeButton = this._element.find('.overlap .controls a.closeButton');
      $showButton.click(function () {
        $('.overlap').addClass('fullmap');
        $(this).fadeOut(400, function () {
          $closeButton.fadeIn();
        });
        $('html, body').animate({
          scrollTop: $(this).offset().top - 100
        }, 800);
      });
      $closeButton.click(function () {
        $('.overlap').removeClass('fullmap');
        $(this).fadeOut(400, function () {
          $showButton.fadeIn();
        });
      });
    } }
});

module.exports = HomePageView;


},{"../Page.jsx":12}],36:[function(require,module,exports){
'use strict';
var PageView = require('../Page.jsx');

/**
 * ProfilePageView
 * 
 * @extends PageView
 *
 * init
 * 
 * @public
 * @param  jQuery element
 * @return void
 */
var ProfilePageView = function ProfilePageView(element) {
  try {
    PageView.call(this, element);
    this._showProperStep();
    this._addTabClickEvents();
    this._setupDisplayPictureFlashWidget();
    this._addPictureDeleteEvent();
    this._addPromoteWalkClickEvent();
    this._addPromoteCityClickEvent();
    this._addPromoteBlogPostClickEvent();
    this._setupCityPromoteModalEvents();
    this._setupWalkPromoteModalEvents();
    this._setupBlogPostPromoteModalEvents();
    this._setupPromoteSlideshows();
    this._setupTransferWalkEvents();
    this._setupUnpublishWalkEvents();
  } catch (e) {
    console.error("Error initializing profile: " + e.stack);
  }
};

ProfilePageView.prototype = Object.create(PageView.prototype, {
  /**
   * _slideIndexes
   *
   * @protected
   * @var       Object
   */
  _slideIndexes: {
    value: { blogPost: 0, city: 0, walk: 0 },
    writable: true
  },

  /**
   * _currentTab
   * 
   * @protected
   * @var       String|null (default: null)
   */
  _currentTab: {
    value: null,
    writable: true
  },

  /**
   * _addPictureDeleteEvent
   * 
   * @protected
   * @return    void
   */
  _addPictureDeleteEvent: {
    value: function value() {
      this._element.find('a[href="/index.php/profile/delete/"]').click(function (event) {
        event.preventDefault();
        $.ajax({
          type: 'DELETE',
          url: $(this).attr('href'),
          success: function success() {
            location.href = '/index.php/profile/#tab=picture&success=1';
          }
        });
      });
    }
  },

  /**
   * _addPromoteBlogPostClickEvent
   *
   * @protected
   * @return    void
   */
  _addPromoteBlogPostClickEvent: {
    value: function value() {
      var _this = this,
          $btn = this._element.find('.column.blogPosts .subactions .promote');
      $btn.click(function (event) {
        event.preventDefault();
        var blogPostObj = _this._getBlogPostObjById($(this).data('blogpostid'));
        _this._element.find('.blogPostPromoteOverlay .copy').each(function (index, copy) {
          var $copy = $(copy);
          $copy.data('blogpostpath', blogPostObj.path);
          $copy.find('.objTitle').text(blogPostObj.title);
        });
        _this._element.find('.blogPostPromoteOverlay').show();
      });
    }
  },

  /**
   * _addPromoteCityClickEvent
   *
   * @protected
   * @return    void
   */
  _addPromoteCityClickEvent: {
    value: function value() {
      var _this = this,
          $btn = this._element.find('#cityBlock .promoteBtn');
      $btn.click(function (event) {
        event.preventDefault();
        _this._element.find('.cityPromoteOverlay').show();
      });
    }
  },

  /**
   * _getBlogPostObjById
   *
   * @protected
   * @param     Number blogPostId
   * @return    void
   */
  _getBlogPostObjById: {
    value: function value(blogPostId) {
      var $link = this._element.find('[data-blogpostid="' + blogPostId + '"]');
      return {
        title: $link.first().data('blogposttitle'),
        path: $link.first().data('blogpostpath')
      };
    }
  },

  /**
   * _getWalkObjById
   *
   * @protected
   * @param     Number walkId
   * @return    void
   */
  _getWalkObjById: {
    value: function value(walkId) {
      var $link = this._element.find('[data-walkid="' + walkId + '"]');
      return {
        title: $link.first().data('walktitle'),
        path: $link.first().data('walkpath')
      };
    }
  },

  /**
   * _addPromoteWalkClickEvent
   *
   * @protected
   * @return    void
   */
  _addPromoteWalkClickEvent: {
    value: function value() {
      var _this = this,
          $btn = this._element.find('.column.city .subactions .promote,' + '.column.walks .subactions .promote');
      $btn.click(function (event) {
        event.preventDefault();
        var walkObj = _this._getWalkObjById($(this).data('walkid'));
        _this._element.find('.walkPromoteOverlay .copy').each(function (index, copy) {
          copy.dataset.walkpath = walkObj.path;
          copy.textContent = copy.textContent.replace(/\[WALKNAME\]/, walkObj.title);
        });
        _this._element.find('.walkPromoteOverlay').show();
      });
    }
  },

  /**
   * _addTabClickEvents
   *
   * @protected
   * @return    void
   */
  _addTabClickEvents: {
    value: function value() {
      // Nav tabs
      var _this = this;
      this._element.find('ul.nav-tabs li a').click(function (event) {
        event.preventDefault();
        _this._currentTab = $(this).attr('data-tab');
        _this._showCurrentTab();
      });

      // Stand alone links
      this._element.find('.tabLink').click(function (event) {
        event.preventDefault();
        _this._currentTab = $(this).attr('data-tab');
        _this._showCurrentTab();
      });
    }
  },

  /**
   * _setupBlogPostPromoteModalEvents
   *
   * @protected
   * @return    void
   */
  _setupBlogPostPromoteModalEvents: {
    value: function value() {
      var _this = this;
      this._element.find('.blogPostPromoteOverlay').find('.icon-twitter').click(function (event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showTwitterShareWindow('http://janeswalk.org' + $copy.data('blogpostpath'), $copy.text().trim());
      });
      this._element.find('.blogPostPromoteOverlay').find('.icon-facebook').click(function (event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showFacebookShareWindow('http://janeswalk.org' + $copy.data('blogpostpath'), 'Jane\'s Walk', $copy.text().trim());
      });
      this._element.find('.blogPostPromoteOverlay').find('.icon-envelope').click(function (event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showEmailShareWindow('Jane\'s Walk in ' + _this._element.find('#profileWrapper').data('city'), $copy.text().trim());
      });
    }
  },

  /**
   * _setupCityPromoteModalEvents
   *
   * @protected
   * @return    void
   */
  _setupCityPromoteModalEvents: {
    value: function value() {
      var cityPath = this._element.find('.cityPromoteOverlay').data('citypath'),
          cityName = this._element.find('.cityPromoteOverlay').data('cityname');
      var _this = this;
      this._element.find('.cityPromoteOverlay').find('.icon-twitter').click(function (event) {
        event.preventDefault();
        _this._showTwitterShareWindow('http://janeswalk.org' + cityPath, $(this).closest('.option').find('.copy').text().trim());
      });
      this._element.find('.cityPromoteOverlay').find('.icon-facebook').click(function (event) {
        event.preventDefault();
        _this._showFacebookShareWindow('http://janeswalk.org' + cityPath, 'Jane\'s Walk', $(this).closest('.option').find('.copy').text().trim());
      });
      this._element.find('.cityPromoteOverlay').find('.icon-envelope').click(function (event) {
        event.preventDefault();
        _this._showEmailShareWindow('Jane\'s Walk in ' + cityName, $(this).closest('.option').find('.copy').text().trim());
      });
    }
  },

  /**
   * _setupTransferWalkEvents
   *
   * @protected
   * @return  void
   */
  _setupTransferWalkEvents: {
    value: function value() {
      var _this = this;
      // Set the requests when clicking the modal links
      this._element.find('#walk-transfer .users a').click(function (event) {
        event.preventDefault();
        $.get(this.getAttribute('href'), function (data) {
          if (data.error) {
            console.error(data.error);
          } else {
            // Just refresh the page for now
            window.location = window.location;
          }
        });
      });

      // Set the 'transfer' buttons in the walks columns
      this._element.find('a.transfer').removeClass('hidden').click(function (event) {
        event.preventDefault();
        var modal = _this._element.find('#walk-transfer'),
            href = this.getAttribute('href'),
            links = modal.find('.users a');
        for (var i = 0, len = links.length; i < len; i++) {
          links[i].setAttribute('href', href + 'transfer/' + links[i].getAttribute('data-uid'));
        }
        modal.modal();
      });
    }
  },

  /**
   * _setupUnpublishWalkEvents
   *
   * @protected
   * @return  void
   */
  _setupUnpublishWalkEvents: {
    value: function value() {
      var _this = this;
      // Set the 'unpublish' buttons in the walks columns
      this._element.find('a.delete').click(function (event) {
        event.preventDefault();
        $.ajax({
          url: this.getAttribute('href'),
          type: 'DELETE',
          success: function success() {
            window.location = window.location;
          }
        });
      });
    }
  },

  /**
   * _setupDisplayPictureFlashWidget
   *
   * @protected
   * @return    void
   */
  _setupDisplayPictureFlashWidget: {
    value: function value() {
      window.ThumbnailBuilder_onSaveCompleted = function () {
        location.href = '/index.php/profile/#tab=picture&success=1';
      };
      var params = {
        bgcolor: '#ffffff',
        wmode: 'transparent',
        quality: 'high'
      },
          flashvars = {
        width: this._element.find('#flashContainer').attr('data-width'),
        height: this._element.find('#flashContainer').attr('data-height'),
        image: this._element.find('#flashContainer').attr('data-imagepath'),
        save: this._element.find('#flashContainer').attr('data-savepath')
      };
      if (typeof swfobject !== "undefined") {
        swfobject.embedSWF(this._element.find('#flashContainer').attr('data-flashpath'), 'flashContainer', '500', '400', '10,0,0,0', 'includes/expressInstall.swf', flashvars, params);
      }
    }
  },

  /**
   * _showSlide
   *
   * @protected
   * @param     String slideshowName
   * @return    void
   */
  _showSlide: {
    value: function value(slideshowName) {
      var index = this._slideIndexes[slideshowName],
          $overlay = this._element.find('[data-slideshow="' + slideshowName + '"]'),
          $options = $overlay.find('.options .option');
      $options.addClass('hidden');
      $($options[index]).removeClass('hidden');
    }
  },

  /**
   * _setupPromoteSlideshows
   *
   * @protected
   * @return    void
   */
  _setupPromoteSlideshows: {
    value: function value() {
      var _this = this;
      this._element.find('.promoteOverlay .nav > a.left').click(function (event) {
        event.preventDefault();
        var $anchor = $(this),
            slideshow = $anchor.data('slideshow'),
            $overlay = $anchor.closest('.promoteOverlay'),
            numOptions = $overlay.find('.options .option').length,
            $options = $overlay.find('.options .option');
        if (_this._slideIndexes[slideshow] === 0) {
          _this._slideIndexes[slideshow] = numOptions - 1;
        } else {
          --_this._slideIndexes[slideshow];
        }
        _this._showSlide(slideshow);
      });
      this._element.find('.promoteOverlay .nav > a.right').click(function (event) {
        event.preventDefault();
        var $anchor = $(this),
            slideshow = $anchor.data('slideshow'),
            $overlay = $anchor.closest('.promoteOverlay'),
            numOptions = $overlay.find('.options .option').length,
            $options = $overlay.find('.options .option');
        if (_this._slideIndexes[slideshow] === numOptions - 1) {
          _this._slideIndexes[slideshow] = 0;
        } else {
          ++_this._slideIndexes[slideshow];
        }
        _this._showSlide(slideshow);
      });
    }
  },

  /**
   * _setupWalkPromoteModalEvents
   *
   * @protected
   * @return    void
   */
  _setupWalkPromoteModalEvents: {
    value: function value() {
      var _this = this;
      this._element.find('.walkPromoteOverlay').find('.icon-twitter').click(function (event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showTwitterShareWindow('http://janeswalk.org' + $copy.data('walkpath'), $copy.text().trim());
      });
      this._element.find('.walkPromoteOverlay').find('.icon-facebook').click(function (event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showFacebookShareWindow('http://janeswalk.org' + $copy.data('walkpath'), 'Jane\'s Walk', $copy.text().trim());
      });
      this._element.find('.walkPromoteOverlay').find('.icon-envelope').click(function (event) {
        event.preventDefault();
        var $copy = $(this).closest('.option').find('.copy');
        _this._showEmailShareWindow('Jane\'s Walk in ' + _this._element.find('#profileWrapper').data('city'), $copy.text().trim());
      });
    }
  },

  /**
   * _showCurrentTab
   *
   * @protected
   * @return    void
   */
  _showCurrentTab: {
    value: function value() {
      this._element.find('ul.nav-tabs li.active').removeClass('active');
      this._element.find('ul.nav-tabs li a[data-tab="' + this._currentTab + '"]').parent().addClass('active');
      this._element.find('div.content div.block').addClass('hidden');
      this._element.find('div.content div.block[data-tab="' + this._currentTab + '"]').removeClass('hidden');
      location.hash = 'tab=' + this._currentTab;
    }
  },

  /**
   * _showEmailShareWindow
   *
   * @protected
   * @param     String subject
   * @param     String body
   * @return    void
   */
  _showEmailShareWindow: {
    value: function value(subject, body) {
      subject = encodeURIComponent(subject);
      body = encodeURIComponent(body);
      var link = 'mailto:?subject=' + subject + '&body=' + body;
      window.open(link);
    }
  },

  /**
   * _showFacebookShareWindow
   *
   * @protected
   * @param     String link
   * @param     String title
   * @param     String text
   * @return    void
   */
  _showFacebookShareWindow: {
    value: function value(link, title, text) {
      new FacebookShareDialog({
        link: link,
        name: title,
        description: text
      }).show();
    }
  },

  /**
   * _showProperStep
   *
   * @protected
   * @return    void
   */
  _showProperStep: {
    value: function value() {
      if (location.hash !== '') {
        var pieces = location.hash.split('&'),
            hash = {},
            again;
        $(pieces).each(function (index, piece) {
          again = piece.split('=');
          hash[again[0].replace('#', '')] = again[1];
        });
        this._currentTab = hash.tab;
        this._showCurrentTab();
        if (typeof hash.success !== 'undefined' && parseInt(hash.success) === 1) {
          this._element.find('div.content div.block[data-tab="' + this._currentTab + '"]').addClass('success');
        }
      }
    }
  },

  /**
   * _showTwitterShareWindow
   *
   * @protected
   * @param     String link
   * @param     String text
   * @return    void
   */
  _showTwitterShareWindow: {
    value: function value(link, text) {
      link = encodeURIComponent(link);
      text = encodeURIComponent(text);
      if (text.length > 130) {
        text = text.substring(0, 130) + '...';
      }
      link = 'https://twitter.com/intent/tweet' + '?url=' + link + '&via=janeswalk' + '&text=' + text;
      window.open(link, 'Twitter Share', 'width=640, height=320');
    }
  }
});

module.exports = ProfilePageView;


},{"../Page.jsx":12}],37:[function(require,module,exports){
'use strict';

var PageView = require('../Page.jsx');
var FacebookShareDialog = require('../FacebookShareDialog.jsx');
var WalkMap = require('../WalkMap.jsx');

/**
 * WalkPageView
 * 
 * @extends PageView
 * 
 * init
 * 
 * @public
 * @param  jQuery element
 * @return void
 */
var WalkPageView = function WalkPageView(element) {
  PageView.call(this, element);

  var mapCanvas = document.getElementById('map-canvas');

  this._addFacebookDialogEvents();

  // Check if there's a map to init first
  if (mapCanvas) {
    new WalkMap(JanesWalk.walk.map, mapCanvas);
  }
};
WalkPageView.prototype = Object.create(PageView.prototype, {
  /**
   * _addFacebookDialogEvents
   * 
   * @protected
   * @return    void
   */
  _addFacebookDialogEvents: {
    value: function value() {
      var _this = this;
      this._element.find('.facebookShareLink').click(function (event) {
        event.preventDefault();
        _this.trackEvent('Walk', 'share.attempted', 'facebook');
        var shareObj = _this._getFacebookDialogObj();
        new FacebookShareDialog(shareObj).show(_this._facebookShareFailed, _this._facebookShareSuccessful);
      });
    }
  },

  /**
   * _facebookShareFailed
   * 
   * @protected
   * @return    void
   */
  _facebookShareFailed: {
    value: function value() {
      this.trackEvent('Walk', 'share.failed', 'facebook');
    }
  },

  /**
   * _facebookShareSuccessful
   * 
   * @protected
   * @return    void
   */
  _facebookShareSuccessful: {
    value: function value() {
      this.trackEvent('Walk', 'share.successful', 'facebook');
    }
  },

  /**
   * _getFacebookDialogObj
   * 
   * @see       http://scotch.io/tutorials/how-to-share-webpages-with-facebook
   * @see       http://www.local-pc-guy.com/web-dev/facebook-feed-dialog-vs-share-link-dialog
   * @protected
   * @return    Object
   */
  _getFacebookDialogObj: {
    value: function value() {
      return {
        link: JanesWalk.page.url,
        picture: JanesWalk.page.pictureUrl,
        name: JanesWalk.page.title,
        description: JanesWalk.page.description,
        actions: {
          name: 'View Jane\'s Walks in ' + JanesWalk.page.city.name,
          link: JanesWalk.page.city.url
        }
      };
    }
  }

});

module.exports = WalkPageView;


},{"../FacebookShareDialog.jsx":10,"../Page.jsx":12,"../WalkMap.jsx":15}],38:[function(require,module,exports){
/**
 * Basic constants for route app
 */

// The action names sent to the Dispatcher
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var ActionTypes = [
// i18n translations
'I18N_RECEIVE',

// Walks
'WALK_RECEIVE', 'WALK_SAVE', 'WALK_PUBLISH'].reduce(function (p, k) {
  p[k] = k;return p;
}, {});

exports.ActionTypes = ActionTypes;


},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _flux = require('flux');

var AppDispatcher = new _flux.Dispatcher();
var register = AppDispatcher.register.bind(AppDispatcher);
var dispatch = AppDispatcher.dispatch.bind(AppDispatcher);

exports['default'] = AppDispatcher;
exports.register = register;
exports.dispatch = dispatch;


},{"flux":4}],40:[function(require,module,exports){
/*
 * Helpers for building React pages with
 *
 * Try to only put things in here after exhausting all possible other options,
 * and review this file periodically to see what can be removed as new features
 * are added to React.
 */

// Render a JSX fragment into a <span> wrapper. Helpful when an API takes a Node
// as the input, e.g. Google Maps
'use strict';

exports.renderAsNode = function (reactElement) {
  var returnEl = document.createElement('span');
  React.render(returnEl, reactElement);
  return returnEl;
};

// Not a generalized Object => Array, rather a convertor to change
// {0: 'a', 1: 'b', 2: 'c'} into ['a','b','c']. Use only to convert
// obsolete encodings of walks into proper arrays
exports.objectToArray = function (obj) {
  var destination = [];

  // Assign numeric index in object as array index
  for (var i in obj) {
    destination[i] = obj[i];
  }

  // Needed to remove any empty elements, e.g. if input obj counts from 1 not 0
  return destination.filter(function (n) {
    return n !== undefined;
  });
};


},{}],41:[function(require,module,exports){
/**
 * TODO: replace both of these silly 2-way binding helpers with flux
 */

// Link this component's state to the linkState() parent
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var linkedParentState = {
  linkParentState: function linkParentState(propname) {
    var valueLink = this.props.valueLink;
    var parentState = valueLink.value;

    return {
      value: parentState[propname],
      requestChange: function requestChange(value) {
        parentState[propname] = value;
        valueLink.requestChange(parentState);
      }
    };
  }
};
exports.linkedParentState = linkedParentState;


},{}],42:[function(require,module,exports){
/**
 * i18n translation class
 *
 * @param object translations A map of i18next-format translations
 */

// sprintf tokenizer
'use strict';

function sprintf(str) {
  var args = Array.prototype.slice.call(arguments);
  return args.shift().replace(/%(s|d)/g, function () {
    return args.shift();
  });
}

function I18nTranslator(translations) {
  if (translations) {
    this.translations = translations;
  }
}

// Prototype methods
Object.defineProperties(I18nTranslator.prototype, {
  // The big translations map
  translations: {
    value: {},
    writable: true,
    enumerable: true
  },

  /**
   * Basic translation.
   * sprintf syntax used to replace %d and %s tokens with arguments
   */
  translate: {
    value: function value(str) {
      var translated = Array.prototype.slice.call(arguments);
      translated[0] = (this.translations[str] || [str])[0];
      return sprintf.apply(this, translated);
    }
  },

  /**
   * Plural translations
   * Different languages make different numbers plural (eg is 0 plural or not)
   * Translations should provide conjugation only, and make no assumptions about
   * the nature of the data.
   *
   * @param string singular
   * @param string plural
   * @param int count
   * @return string
   * @example t2('%d ox', '%d oxen', numberOfOxen)
   */
  translatePlural: {
    value: function value(singular, plural, count) {
      // TODO Use the plural rules for the language, not just English
      var isPlural = count !== 1 ? 1 : 0;

      var translateTo = (this.translations[singular + '_' + plural] || [singular, plural])[isPlural];

      return sprintf(translateTo, count);
    }
  },

  /**
  * Translate with context
  * Some words mean different things based on context, so
  * use tc to give context.
  *
  * @param string context
  * @param string str Sprintf-formatted string
  * @return string
  * @example tc('make or manufacture', 'produce'); tc('food', 'produce');
  */
  translateContext: {
    value: function value(context, str) {
      // Grab the values to apply to the string
      var args = Array.prototype.slice.call(arguments, 2);
      // i18n lib makes context keys simply an underscore between them
      var key = context + '_' + str;
      sprintf.apply(this, [context, args]);
    }
  }
});

module.exports = I18nTranslator;


},{}],43:[function(require,module,exports){
/**
 * i18n Store
 *
 * Store for i18n language translations
 */

// Basic flux setup
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _events = require('events');

var _dispatcherAppDispatcher = require('../dispatcher/AppDispatcher');

var _constantsJWConstants = require('../constants/JWConstants');

// The library for managing translations

var _helpersTranslateJs = require('../helpers/translate.js');

var _helpersTranslateJs2 = _interopRequireDefault(_helpersTranslateJs);

// Simple 'something has changed' event
var CHANGE_EVENT = 'change';

// Local vars
var _i18n = new _helpersTranslateJs2['default']();

var I18nStore = Object.assign({}, _events.EventEmitter.prototype, {
  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  getTranslate: function getTranslate() {
    return _i18n.translate.bind(_i18n);
  },

  getTranslatePlural: function getTranslatePlural() {
    return _i18n.translatePlural.bind(_i18n);
  }
});

// Register our dispatch token as a static method
I18nStore.dispatchToken = (0, _dispatcherAppDispatcher.register)(function (payload) {
  // Go through the various actions
  switch (payload.type) {
    // POI actions
    case _constantsJWConstants.ActionTypes.I18N_RECEIVE:
      _i18n.constructor(payload.translations);
      I18nStore.emitChange();
      break;
    default:
    // do nothing
  }
});

exports['default'] = I18nStore;
module.exports = exports['default'];


},{"../constants/JWConstants":38,"../dispatcher/AppDispatcher":39,"../helpers/translate.js":42,"events":2}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getTranslations = getTranslations;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _actionsI18nActionsJs = require('../actions/I18nActions.js');

var _actionsI18nActionsJs2 = _interopRequireDefault(_actionsI18nActionsJs);

/**
 * Load translations file from JanesWalk
 *
 * @param object locale The locale definition, including name and url to messages
 */

function getTranslations(locale) {
  // Check that we have a translations file set
  if (locale && locale.translation) {
    // Grab from session if we have it
    var translation = window.sessionStorage.getItem('i18n_' + locale.name);
    if (translation) {
      _actionsI18nActionsJs2['default'].receive(JSON.parse(translation).translations['']);
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open('get', locale.translation, true);
      xhr.onload = function () {
        var data = JSON.parse(this.responseText);

        // Store with the session
        window.sessionStorage.setItem('i18n_' + locale.name, this.responseText);

        // Trigger i18n change on complete
        _actionsI18nActionsJs2['default'].receive(data.translations['']);
      };
      xhr.send();
    }
  }
}


},{"../actions/I18nActions.js":8}]},{},[1]);
