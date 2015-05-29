'use strict';

/**
 * The table showing open-schedule walks and their times
 */

// TODO: Once 'open' walk schedules are implemented on festivals
function TimeOpenTable() {}
TimeOpenTable.prototype = Object.create(React.Component.prototype, {
  constructor: {value: TimeOpenTable},

  render: {
    value: function() {
      return (
        <table />
      );
    }
  }
});

module.exports = TimeOpenTable;
