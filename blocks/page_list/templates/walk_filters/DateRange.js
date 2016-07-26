/**
 * Date Range
 * a jQueryUI based React component for picking a to/from date range
 */
/* global React $ */
const { createElement: ce, Component } = React;

const dateFormat = 'yy-mm-dd';
const offset = (new Date()).getTimezoneOffset() * 60000;
const DAY = 24 * 60 * 60 * 1000 - 10;

export default class DateRange extends Component {
  constructor(props) {
    super(props);
    const {
      value: [from, to] = ['', ''],
    } = props;

    this.state = {
      from: from ? $.datepicker.formatDate(dateFormat, new Date(from + offset)) : '',
      to: to ? $.datepicker.formatDate(dateFormat, new Date(to + offset)) : '',
      fromInt: from || '',
      toInt: to || '',
    };
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
      dateFormat,
      onSelect: selectedDate => {
        fromTime = $.datepicker.parseDate(dateFormat, selectedDate) - offset;
        $to.datepicker('option', 'minDate', selectedDate);
        this.setState({ from: selectedDate });
        this.props.onChange(fromTime, toTime);
      },
    });

    $to.datepicker({
      defaultDate: '+5w',
      changeMonth: true,
      changeYear: true,
      dateFormat,
      onSelect: selectedDate => {
        toTime = $.datepicker.parseDate(dateFormat, selectedDate) - offset + DAY;
        $from.datepicker('option', 'maxDate', selectedDate);
        this.setState({ to: selectedDate });
        this.props.onChange(fromTime, toTime);
      },
    });
  }

  render() {
    return (
      ce('fieldset', { className: 'daterange' },
        ce('input', { type: 'text', ref: 'from', placeholder: 'From', defaultValue: this.state.from }),
        ce('input', { type: 'text', ref: 'to', placeholder: 'To', defaultValue: this.state.to }),
      )
    );
  }
}
