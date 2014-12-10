// TODO: Make 'intiatives' build as separate selectors
var DateSelect = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    // Note: we're only keeping the 'date' on there to use Date's string
    // parsing. This method is concerned only with the Time
    // TODO: use a Date for the end time; duration is for historical purposes
    // but it's a bad design.
    // TODO: Support proper time localization - ultimately these times are just
    // strings, so we're using GMT, but that's bad practice.
    var defaultTime = '12:00';
    return {
      start: new Date((new Date).toLocaleDateString() + ' ' + defaultTime),
      duration: '1 Hour'
    };
  },
  setDay: function(date) {
    var startDate = this.state.start;

    startDate.setFullYear(date.getFullYear());
    startDate.setMonth(date.getMonth());
    startDate.setDate(date.getDate());

    this.setState({start: startDate});
  },
  /* @param Date time The current time of day
   * @param Int duration Number of minutes the walk lasts
   */
  setTime: function(time, duration) {
    var startDate = this.state.start;

    startDate.setHours(time.getHours());
    startDate.setMinutes(time.getMinutes());

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
    slots.push({
      date: this.state.start.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}),
      time: this.state.start.toLocaleString('en-US', {hour: '2-digit', minute: '2-digit'}),
      duration: this.state.duration
    });

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
                <DatePicker setDay={this.setDay} />
              </div>
              <div className="col-md-6">
                <div className="thumbnail">
                  <div className="caption"> 
                    <h4 className="date-indicate-set">
                      <small>{ t('Date selected') }:</small>
                      {this.state.start.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'})}
                    </h4>
                    <hr />
                    <TimePicker i18n={this.props.i18n} valueLinkDuration={this.linkState('duration')} valueLinkStart={this.linkTime()} />
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
            <a href="#time-and-date-select" data-toggle="tab" className="clear-date">{ t('Clear schedule and return to main Time and Date page') }</a>
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
      this.setState({start: start})
      var firstTime = new Date(start + ' 00:00');
      var lastTime = new Date(start + ' 23:30');
      var startTimes = [];
      step = step || 1800000;

      for (var i = 0, time = firstTime; time.getTime() <= lastTime.getTime(); time.setTime(time.getTime() + step), i++) {
        startTimes.push({
          time: time.getTime(),
          string: time.toLocaleString({}, {hour: '2-digit', minute: '2-digit'})
        });
      }

      this.setState({
        start: start,
        startTimes: startTimes
      });
    }
  },

  componentWillUpdate: function() {
    var startDate = new Date(this.props.valueLinkStart.value);
    this.setStartTimes(startDate.toLocaleDateString());
  },

  componentWillMount: function() {
    this.componentWillUpdate();
  },

  render: function() {
    // Count walk times in 30 min increments
    var linkDuration = this.props.valueLinkDuration;
    var linkStart = this.props.valueLinkStart;
    var t = this.props.i18n.translate.bind(this.props.i18n);

    return (
      <div className="time-picker">
        <label htmlFor="walk-time">{ t('Start Time') }:</label>
        <select name="start" id="walk-start" valueLink={linkStart}>
          {this.state.startTimes.map(function(time, i) {
            return <option key={i} value={time.time}>{time.string}</option>;
          })}
        </select>
        <label htmlFor="walk-time">{ t('Approximate Duration of Walk') }:</label>
        <select name="duration" id="walk-duration" valueLink={linkDuration}>
          <option value="30 Minutes">30 Minutes</option>
          <option value="1 Hour">1 Hour</option>
          <option value="1 Hour, 30 Minutes">1 Hour, 30 Minutes</option>
          <option value="2 Hours">2 Hours</option>
          <option value="2 Hours, 30 Minutes">2 Hours, 30 Minutes</option>
          <option value="3 Hours">3 Hours</option>
          <option value="3 Hours, 30 Minutes">3 Hours, 30 Minutes</option>
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

    return (
      <table className="table table-bordered table-hover" id="date-list-all">
        <thead>
          <tr>
            <th>{ t('Date') }</th>
            <th>{ t('Start Time') }</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {slots.map(function(e, i) {
            return (
              <tr key={i}>
                <td>{e.date}</td>
                <td>{e.time}</td>
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
