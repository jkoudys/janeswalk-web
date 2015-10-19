// Components
const DatePicker = require('./date/DatePicker.jsx');
const TimePicker = require('./date/TimePicker.jsx');
const TimeSetTable = require('./date/TimeSetTable.jsx');
const TimeOpenTable = require('./date/TimeOpenTable.jsx');

// Flux
const t = require('../../stores/I18nStore.js').getTranslate();

// Default to a 1-hour walk time
const ONE_HOUR = 60 * 60 * 1000;

// TODO: Make 'intiatives' build as separate selectors
export default class DateSelect extends React.Component {
  constructor() {
    super();

    const today = new Date();
    const start = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate() + 7,
        11,
        0
      )
    );

    // Bind class methods
    this.setDay = this._setDay.bind(this);
    this.addDate = this._addDate.bind(this);

    // Note: we're only keeping the 'date' on there to use Date's string
    // parsing. This method is concerned only with the Time
    // TODO: Support proper time localization - ultimately these times are just
    // strings, so we're using GMT, but that's bad practice.
    this.state = {start: start, duration: ONE_HOUR};
  }

  _setDay(date) {
    const startDate = this.state.start;

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
  }

  /**
   * Set the time
   * @param Date time The current time of day
   * @param Int duration Number of minutes the walk lasts
   */
  setTime(time, duration) {
    const startDate = this.state.start;

    startDate.setUTCHours(time.getUTCHours());
    startDate.setUTCMinutes(time.getUTCMinutes());

    this.setState({start: startDate});
  }

  /**
   * Build a valueLink object for updating the time
   */
  linkTime() {
    return {
      value: this.state.start.getTime(),
      requestChange: value => this.setState({start: new Date(Number(value))})
    };
  }

  // Push the date we built here to the linked state
  _addDate() {
    const valueLink = this.props.valueLink;
    const value = valueLink.value || {};
    const slots = (value.slots || []).slice();
    const start = this.state.start.getTime();
    const end = start + this.state.duration;

    // Store the timeslot state as seconds, not ms
    slots.push([start / 1000, end / 1000]);

    value.slots = slots;
    valueLink.requestChange(value);
  }

  render() {
    const valueLink = this.props.valueLink;

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
}

// Load mixins
Object.assign(DateSelect.prototype, React.addons.LinkedStateMixin);
