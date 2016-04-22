/**
 * Basic wrapper around jQuery.datepicker(), so it can be loaded
 * as a React class
 */
/* global React ReactDOM $ */

export default class DatePicker extends React.Component {
  componentDidMount() {
    const { setDay, defaultDate } = this.props;

    // Setup sorting on the walk-stops list
    $(ReactDOM.findDOMNode(this)).datepicker({
      defaultDate,
      onSelect: dateText => {
        // Silly, but needed for inconsistent date formats across libs
        const [month, day, year] = dateText.split('/');
        setDay(new Date(Date.UTC(year, month - 1, day)));
      },
    });
  }

  render() {
    return <div className="date-picker" />;
  }
}
