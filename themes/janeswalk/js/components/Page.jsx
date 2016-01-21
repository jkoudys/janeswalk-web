import View from './View.jsx';

/**
 * Basic View info for a regular ol' page
 * 
 * @param  jQuery element
 * @return void
 */
export default class PageView extends View {
  constructor(element) {
    super(element);
    this._addOverlayCloseEvent();
  }

  /**
   * _addOverlayCloseEvent
   * 
   * @protected
   * @return    void
   */
  _addOverlayCloseEvent() {
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

  /**
   * _makeGaCall
   * 
   * @protected
   * @param     Array call
   * @return    void
   */
  _makeGaCall(call) {
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
  trackCustomVar(index, name, value, scope) {
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
  trackEvent(category, action, optLabel, optValue, override) {
    const call = ['_trackEvent'];
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
  trackView(path) {
    this._makeGaCall(['_trackPageview', path]);
  }
}
