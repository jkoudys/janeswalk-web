'use strict';
/**
 * The table with all the times that the walks are scheduled
 */
function TimeSetTable() {}

TimeSetTable.prototype = Object.create(React.Component.prototype, {
  constructor: {value: TimeSetTable},

  // Remove a scheduled time
  removeSlot: {
    value: function(i) {
      var valueLink = this.props.valueLink;
      var value = valueLink.value;
      var slots = (value.slots || []).slice();

      slots.splice(i, 1);
      value.slots = slots;

      valueLink.requestChange(value);
    }
  },

  render: {
    value: function() {
      var slots = this.props.valueLink.value.slots || [];
      var t = this.props.i18n.translate.bind(this.props.i18n);
      var t2 = this.props.i18n.translatePlural.bind(this.props.i18n);

      var dtfDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'});
      var dtfDuration = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: '2-digit', timeZone: 'UTC'});

      return (
        <table className="table table-bordered table-hover" id="date-list-all">
          <thead>
            <tr>
              <th>{t('Date')}</th>
              <th>{t('Start Time')}</th>
              <th>{t('Duration')}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {slots.map(function(slot, i) {
              var start = (new Date(slot[0] * 1000));
              var duration = (new Date((slot[1] - slot[0]) * 1000));

              var hours = duration.getUTCHours();
              var minutes = duration.getUTCMinutes();
              var durationFmt = [];
              if (hours) {
                durationFmt.push(t2('%d Hour', '%d Hours', hours));
              }
              if (minutes) {
                durationFmt.push(t2('%d Minute', '%d Minutes', minutes));
              }

              return (
                <tr key={i}>
                  <td>{dtfDate.format(start)}</td>
                  <td>{dtfDuration.format(start)}</td>
                  <td>{durationFmt.join(', ')}</td>
                  <td><a onClick={this.removeSlot.bind(this, i)}><i className="fa fa-times-circle-o" />&nbsp;{t('Remove')}</a></td>
                </tr>
                )
            }.bind(this))}
          </tbody>
        </table>
      );
    }
  }
});

module.exports = TimeSetTable;
