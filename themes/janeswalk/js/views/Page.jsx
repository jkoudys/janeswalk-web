'use strict';
var View = require('./View.jsx');

/**
 * Basic View info for a regular ol' page
 * 
 * @param  jQuery element
 * @return void
 */
var PageView = function(element) {
  View.call(this, element);
  this._addNavEvents();
  this._addOverlayCloseEvent();
};
PageView.prototype = Object.create(View.prototype, {
  /**
   * _addOverlayCloseEvent
   * 
   * @protected
   * @return    void
   */
  _addOverlayCloseEvent: {
    value: function() {
      var _this = this;
      this._element.find('.o-background').click(
        function(event) {
        _this._element.find('.overlay').hide();
      }
      );
      this._element.find('a.closeModalCta').click(
        function(event) {
        event.preventDefault();
        _this._element.find('.overlay').hide();
      }
      );
    }
  },

  /**
   * _addNavEvents
   * 
   * @protected
   * @return    void
   */
  _addNavEvents: {
    value: function() {
      this._element.find('a.search-open').click(
        function() {
        $('html, body').animate(
          {
          scrollTop: 0
        },
        300
        );
        $('body > header').addClass('dropped');
      }
      );
      this._element.find('a.search-close').click(
        function() {
        $('body > header').removeClass('dropped');
      }
      );
    }
  },

  /**
   * _makeGaCall
   * 
   * @protected
   * @param     Array call
   * @return    void
   */
  _makeGaCall: {
    value: function(call) {
      _gaq.push(call);
    }
  },

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
  trackCustomVar: {
    value: function(index, name, value, scope) {
      var call = ['_setCustomVar', index, name, value, scope];
      this._makeGaCall(call);
    }
  },

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
  trackEvent: {
    value: function(category, action, optLabel, optValue, override) {
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
  },

  /**
   * trackView
   * 
   * @public
   * @param  String path
   * @return void
   */
  trackView: {
    value: function(path) {
      var call = ['_trackPageview', path];
      this._makeGaCall(call);
    }
  }
});

module.exports = PageView;
