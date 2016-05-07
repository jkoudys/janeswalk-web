/**
 * Date Range
 * a jQueryUI based React component for picking a to/from date range
 */
/* global React $ */

const df = 'yy-mm-dd';
const offset = (new Date()).getTimezoneOffset() * 60000;
const DAY = 24 * 60 * 60 * 1000 - 10;

export default class DateRange extends React.Component {
  constructor(props) {
    super(props);
    if (Array.isArray(props.value) && props.value.length === 2) {
      const [from, to] = props.value;
      this.state = {
        from: from ? $.datepicker.formatDate(df, new Date(from + offset)) : '',
        to: to ? $.datepicker.formatDate(df, new Date(to + offset)) : '',
        fromInt: from || '',
        toInt: to || '',
      };
    } else {
      this.state = { from: '', to: '' };
    }
  }

  componentDidMount() {
    const $to = $(this.refs.to);
    const $from = $(this.refs.from);

    let toTime = this.state.toInt;
    let fromTime = this.state.fromInt;

    $from.datepicker({
      defaultDate: '+1w',
      changeMonth: true,
      changeYear: true,
      dateFormat: df,
      onSelect: selectedDate => {
        fromTime = $.datepicker.parseDate(df, selectedDate) - offset;
        $to.datepicker('option', 'minDate', selectedDate);
        this.setState({ from: selectedDate });
        this.props.onChange(fromTime, toTime);
      },
    });

    $to.datepicker({
      defaultDate: '+5w',
      changeMonth: true,
      changeYear: true,
      dateFormat: df,
      onSelect: selectedDate => {
        toTime = $.datepicker.parseDate(df, selectedDate) - offset + DAY;
        $from.datepicker('option', 'maxDate', selectedDate);
        this.setState({ to: selectedDate });
        this.props.onChange(fromTime, toTime);
      },
    });
  }

  render() {
    return (
      <fieldset className="daterange">
        <input type="text" ref="from" placeholder="From" defaultValue={this.state.from} />
        <input type="text" ref="to" placeholder="To" defaultValue={this.state.to} />
      </fieldset>
    );
  }
}
