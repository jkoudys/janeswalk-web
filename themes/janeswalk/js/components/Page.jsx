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
    this._addNavEvents();
    this._addOverlayCloseEvent();
  }

  /**
   * _addOverlayCloseEvent
   *
   * @protected
   * @return    void
   */
  _addOverlayCloseEvent() {
    const el = this.getElement();

    el.find('.o-background').click(ev => el.find('.overlay').hide());
    el.find('a.closeModalCta').click(ev => {
      event.preventDefault();
      el.find('.overlay').hide();
    });
  }

  /**
   * _addNavEvents
   * 
   * @protected
   * @return    void
   */
  _addNavEvents() {
    const el = this.getElement();
    const header = document.querySelector('body > header');

    el.find('a.search-open').click(() => {
      // If there's a text-field in the drop, move caret to it
      const textInput = document.querySelector('body > header input[type=text]');

      $('html, body').animate({
        scrollTop: 0
      }, 300);
      header.classList.add('dropped');

      if (textInput) {
        textInput.focus();
      }
    });
    el.find('a.search-close').click(() => header.classList.remove('dropped'));
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
    const call = ['_setCustomVar', index, name, value, scope];
    this._makeGaCall(call);
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
    const call = ['_trackPageview', path];
    this._makeGaCall(call);
  }
}
