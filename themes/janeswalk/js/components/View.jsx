'use strict';

/**
* View constructor
* 
* @public
* @param  jQuery element
* @return void
*/
var View = function(element) {
  this._element = element;
};
Object.defineProperties(View.prototype, {
  /**
   * _element
   * 
   * @protected
   * @var       jQuery (default: null)
   */
  _element: {value: null, writable: true, configurable: true},

  /**
   * getElement
   * 
   * @public
   * @return HTMLFormElement
   */
  getElement: {
    value: function() {
      return this._element;
    }
  }
});

module.exports = View;

