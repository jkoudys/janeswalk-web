// Flux
import {t, t2} from 'janeswalk/stores/I18nStore';

/**
 * Select options to choose your time.
 * This is an important one, considering how complex timezones and localizing
 * date formats can be when you're an international organization.
 */

export default class TimePicker extends React.Component {
  constructor() {
    super();
    this.state = {startTimes: []};
  }

  // Date management is slow, so avoid rebuilding unless needed
  setStartTimes(start, step) {
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
  }

  componentWillMount() {
    this.setStartTimes(new Date(this.props.valueLinkStart.value));
  }

  render() {
    // Count walk times in 30 min increments
    const linkDuration = this.props.valueLinkDuration;
    const requestChange = linkDuration.requestChange;
    const linkStart = this.props.valueLinkStart;

    // Cast duration as a number
    linkDuration.requestChange = value => requestChange(+value);

    return (
      <div className="time-picker">
        <label htmlFor="walk-time">{ t('Start Time') }:</label>
        <select name="start" id="walk-start" valueLink={linkStart}>
          {this.state.startTimes.map((time, i) => (
            <option key={'walk-start' + i} value={time.asMs}>
              {time.asString}
            </option>
          ))}
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
}
