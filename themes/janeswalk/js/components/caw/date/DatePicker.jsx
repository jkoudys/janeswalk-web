/**
 * Basic wrapper around jQuery.datepicker(), so it can be loaded
 * as a React class
 */

class DatePicker extends React.Component {
  componentDidMount() {
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

  render() {
    return (
      <div className="date-picker" />
    );
  }
}

export default DatePicker;
