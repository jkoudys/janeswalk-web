/**
 * Date Range
 * a jQueryUI based React component for picking a to/from date range
 */

const df = 'yy-mm-dd';
const offset = (new Date()).getTimezoneOffset();
const oneDay = 24 * 60 * 60 * 1000;

export default class DateRange extends React.Component {
  constructor(props) {
    super(props);
    if (Array.isArray(props.value) && props.value.length === 2) {
      this.state = {
        from: props.value[0] ? $.datepicker.formatDate(df, new Date(props.value[0] + offset)) : '',
        to: props.value[1] ? $.datepicker.formatDate(df, new Date(props.value[1] + offset)) : '',
        fromInt: props.value[0] ? props.value[0] + offset : '',
        toInt: props.value[1] ? props.value[1] + offset : ''
      };
    } else {
      this.state = {from: '', to: ''};
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
        this.setState({from: selectedDate});
        this.props.onChange(fromTime, toTime);
      }
    });

    $to.datepicker({
      defaultDate: '+5w',
      changeMonth: true,
      changeYear: true,
      dateFormat: df,
      onSelect: selectedDate => {
        toTime = $.datepicker.parseDate(df, selectedDate) - offset;
        $from.datepicker('option', 'maxDate', selectedDate)
        this.setState({to: selectedDate});
        this.props.onChange(fromTime, toTime);
      }
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
