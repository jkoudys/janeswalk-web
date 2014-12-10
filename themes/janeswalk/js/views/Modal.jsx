'use strict';
var View = require('../View.jsx');

/**
 * ModalView
 * 
 * @extends View
 * @param element jQuery element
 */
var ModalView = function(element) {
  View.call(this, element);
  this._addCloseEvents();
};

ModalView.prototype = Object.create(View.prototype, {
  /**
   * _addCloseEvents
   * 
   * @protected
   * @return    void
   */
  _addCloseEvents: {
    value: function() {
      var _this = this;
      this._element.find('.closeModalSource').click(
        function(event) {
        event.preventDefault();
        _this.close();
      }
      );
    }
  }
});

modules.extend = ModalView;
