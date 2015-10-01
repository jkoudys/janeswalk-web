'use strict';

/**
 * Basic wrapper around jQuery.datepicker(), so it can be loaded
 * as a React class
 */

function DatePicker() {}

DatePicker.prototype = Object.create(React.Component.prototype, {
  constructor: {value: DatePicker},

  componentDidMount: {
    value: function() {
      // Setup sorting on the walk-stops list
      $(React.findDOMNode(this)).datepicker({
        defaultDate: this.props.defaultDate,
        onSelect: function(dateText) {
          // Silly, but needed for inconsistent date formats across libs
          var dateMDY = dateText.split('/');
          this.props.setDay(new Date(Date.UTC(dateMDY[2], dateMDY[0] - 1, dateMDY[1])));
        }.bind(this)
      });
    }
  },

  render: {
    value: function() {
      return (
        <div className="date-picker" />
      );
    }
  }
});

module.exports = DatePicker;
