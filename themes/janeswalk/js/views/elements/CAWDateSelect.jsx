// TODO: Make 'intiatives' build as separate selectors
var DateSelect = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    var today = new Date;
    var start = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate() + 7,
        11,
        00
      )
    );
    // Default to a 1-hour walk time
    var duration = 60 * 60 * 1000;

    // Note: we're only keeping the 'date' on there to use Date's string
    // parsing. This method is concerned only with the Time
    // TODO: Support proper time localization - ultimately these times are just
    // strings, so we're using GMT, but that's bad practice.
    return {start: start, duration: duration};
  },
  setDay: function(date) {
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
    this.setState({start: startDate});
  },
  /* @param Date time The current time of day
   * @param Int duration Number of minutes the walk lasts
   */
  setTime: function(time, duration) {
    var startDate = this.state.start;

    startDate.setUTCHours(time.getUTCHours());
    startDate.setUTCMinutes(time.getUTCMinutes());

    this.setState({start: startDate});
  },
  linkTime: function() {
    var _this = this;
    return {
      value: _this.state.start.getTime(),
      requestChange: function(value) {
        _this.setState({start: new Date(Number(value))});
      }
    };
  },
  // Push the date we built here to the linked state
  addDate: function() {
    var valueLink = this.props.valueLink;
    var value = valueLink.value || {};
    var slots = (value.slots || []).slice();
    var start = this.state.start.getTime();
    var end = start + this.state.duration;

    // Store the timeslot state as seconds, not ms
    slots.push([start / 1000, end / 1000]);

    value.slots = slots;
    valueLink.requestChange(value);
  },
  render: function() {
    var valueLink = this.props.valueLink;
    var t = this.props.i18n.translate.bind(this.props.i18n);

    return (
      <div className="tab-pane" id="time-and-date">
        <div className="tab-content" id="walkduration">
          <div className="tab-pane hide" id="time-and-date-select">
            <div className="page-header" data-section='time-and-date'>
              <h1>{ t('Set the Time and Date') }</h1>
            </div>
            <legend >{ t('Pick one of the following:') }</legend>
            <div className="row">
              <ul className="thumbnails" id="block-select">
                <li>
                  <a href="#time-and-date-all" data-toggle="tab">
                    <div className="thumbnail">
                      <img src={CCM_THEME_PATH + '/img/time-and-date-full.png'} />
                      <div className="caption">
                        <div className="text-center">
                          <h4>{ t('By Request') }</h4>
                        </div>
                        <p>{ t('Highlight times that you\'re available to lead the walk, or leave your availability open. People will be asked to contact you to set up a walk.') }</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#time-and-date-set" data-toggle="tab">
                    <div className="thumbnail">
                      <img src={CCM_THEME_PATH + '/img/time-and-date-some.png'} />
                      <div className="caption">
                        <div className="text-center">
                          <h4>{ t('Pick Your Date') }</h4>
                        </div>
                        <p>{ t('Set specific dates and times that this walk is happening.') }</p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-pane active" id="time-and-date-set">
            <div className="page-header" data-section='time-and-date'>
              <h1>{ t('Time and Date') }</h1>
              <p className="lead">{ t('Select the date and time your walk is happening.') }</p>
            </div>

            <div className="row">
              <div className="col-md-6">
                <DatePicker setDay={this.setDay} defaultDate={this.state.start} />
              </div>
              <div className="col-md-6">
                <div className="thumbnail">
                  <div className="caption"> 
                    <h4 className="date-indicate-set">
                      <small>{ t('Date selected') }:</small>
                      {this.state.start.toLocaleDateString(undefined, {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC'})}
                    </h4>
                    <hr />
                    <TimePicker ref="timePicker" i18n={this.props.i18n} valueLinkDuration={this.linkState('duration')} valueLinkStart={this.linkTime()} />
                    <hr />
                    <button className="btn btn-primary" id="save-date-set" onClick={this.addDate}>{ t('Add Date') }</button>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <TimeSetTable i18n={this.props.i18n} valueLink={valueLink} />
            <hr />
          </div>
          <div className="tab-pane hide" id="time-and-date-all">
            <div className="page-header" data-section='time-and-date'>
              <h1>{ t('Time and Date') }</h1>
              <p className="lead">{ t('Your availability will be visible to people on your walk page and they’ll be able to send you a walk request.') }</p>
            </div>
            <label className="checkbox">
              <input type="checkbox" name="open" />{ t('Leave my availability open. Allow people to contact you to set up a walk.')} 
            </label>
            <br />
            <div className="row">
              <div className="col-md-6">
                <div className="date-picker" />
              </div>
              <div className="col-md-6">
                <div className="thumbnail">
                  <div className="caption">
                    <div className="date-select-group">
                      <small>{ t('Date selected') }:</small>
                      <h4 className="date-indicate-all" />
                      <hr />
                    </div>
                    <label htmlFor="walk-duration">{ t('Approximate Duration of Walk') }:</label>
                    <select name="duration" id="walk-duration" defaultValue="1 Hour, 30 Minutes">
                      <option value="30 Minutes">30 Minutes</option>
                      <option value="1 Hour">1 Hour</option>
                      <option value="1 Hour, 30 Minutes">1 Hour, 30 Minutes</option>
                      <option value="2 Hours">2 Hours</option>
                      <option value="2 Hours, 30 Minutes">2 Hours, 30 Minutes</option>
                      <option value="3 Hours">3 Hours</option>
                      <option value="3 Hours, 30 Minutes">3 Hours, 30 Minutes</option>
                    </select>
                    <div className="date-select-group">
                      <hr />
                      <button className="btn btn-primary" id="save-date-all" onClick={this.addDate}>{ t('Add Date') }</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <TimeOpenTable />
            <hr />
          </div>
        </div>
      </div>
    );
  }
});

var DatePicker = React.createClass({
  componentDidMount: function() {
    // Setup sorting on the walk-stops list
    $(this.getDOMNode()).datepicker({
      defaultDate: this.props.defaultDate,
      onSelect: function(dateText) {
        this.props.setDay(new Date(dateText));
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="date-picker" />
    );
  }
});

var TimePicker = React.createClass({
  getInitialState: function() {
    return {startTimes: []};
  },

  // Date management is slow, so avoid rebuilding unless needed
  setStartTimes: function(start, step) {
    if (this.state.start !== start) {
      // It's fastest to build our date formatter once upfront
      var dtfTime = new Intl.DateTimeFormat(undefined, {hour: 'numeric', minute: '2-digit', timeZone: 'UTC'});
      // All start times begin on the date's 0:00, and by default step every 30 min
      var yrMoDay = [start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()];
      var firstTime = Date.UTC.apply(this, yrMoDay);
      var lastTime = Date.UTC.apply(this, yrMoDay.concat([23, 30]));
      var startTimes = [];
      step = step || 1800000;

      for (var i = 0, time = firstTime;
           time <= lastTime;
           time += step) {
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
  },

  componentWillUpdate: function() {
  },

  componentWillMount: function() {
    this.componentWillUpdate();
    var startDate = new Date(this.props.valueLinkStart.value);
    this.setStartTimes(startDate);
  },

  render: function() {
    // Count walk times in 30 min increments
    var linkDuration = this.props.valueLinkDuration;
    var requestChange = linkDuration.requestChange;
    var linkStart = this.props.valueLinkStart;
    var t = this.props.i18n.translate.bind(this.props.i18n);

    // Cast duration as a number
    linkDuration.requestChange = function(value) {
      requestChange(Number(value));
    };

    return (
      <div className="time-picker">
        <label htmlFor="walk-time">{ t('Start Time') }:</label>
        <select name="start" id="walk-start" valueLink={linkStart}>
          {this.state.startTimes.map(function(time, i) {
            return (
              <option key={'walk-start' + i} value={time.asMs}>
                {time.asString}
              </option>
              );
          })}
        </select>
        <label htmlFor="walk-time">{ t('Approximate Duration of Walk') }:</label>
        <select name="duration" id="walk-duration" valueLink={linkDuration}>
          <option value={30 * 60000}>30 Minutes</option>
          <option value={60 * 60000}>1 Hour</option>
          <option value={90 * 60000}>1 Hour, 30 Minutes</option>
          <option value={120 * 60000}>2 Hours</option>
          <option value={150 * 60000}>2 Hours, 30 Minutes</option>
          <option value={180 * 60000}>3 Hours</option>
          <option value={210 * 60000}>3 Hours, 30 Minutes</option>
        </select>
      </div>
    );
  }
});

var TimeSetTable = React.createClass({
  removeSlot: function(i) {
    var valueLink = this.props.valueLink;
    var value = valueLink.value;
    var slots = (value.slots || []).slice();

    slots.splice(i, 1);
    value.slots = slots;

    valueLink.requestChange(value);
  },
  render: function() {
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
});

// TODO: Once 'open' walk schedules are implemented on festivals
var TimeOpenTable = React.createClass({
  render: function() {
    return (
      <table />
    );
  }
});

module.exports = DateSelect;
