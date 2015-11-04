import {LineChart, PieChart} from 'react-d3';
import {BarChart} from 'react-d3/barchart';

const YEARS = {
  '2015': Date.UTC(2015, 0),
  '2014': Date.UTC(2014, 0),
  '2013': Date.UTC(2013, 0)
};

const WalksByYear = ({walks, dates}) => {
  debugger;
  <LineChart />
};

const pieData = [
  {label: 'Returning', value: 65.0},
  {label: 'New', value: 25.0}
];
const ReturningWalkLeaders = ({walks, leaders, dates, year}) => (
  <section className="returning-walk-leaders">
    <h3>{year}</h3>
    <PieChart data={pieData} width={400} height={400} radius={100} innerRadius={30} />
  </section>
);

const walksPerLeaderData = [
  {label: '1', values: [{x: 1, y: 60}, {x: 2, y: 20}, {x: 3, y: 3}, {x: 4, y: 5}]},
];

const WalksPerLeader = ({walks, leaders, dates}) => (
  <section className="walks-per-leader">
    <h3>Walks per Leader</h3>
    <BarChart data={walksPerLeaderData} width={400} height={400} />
  </section>
);

// TODO: this function isn't very well written. Should be in the store, too
function buildWalksByYear(dates) {
  // 2014, 2015
  const values = [{x: 2014, y: 0}, {x: 2015, y: 0}];
  dates.forEach(date => {
    if (date.range[0] * 1000 < YEARS['2015']) {
      values[0]['y']++;
    } else {
      values[1]['y']++;
    }
  });
  return [{
    label: '1',
    values: values
  }];
}

const WalksPerYear = ({dates}) => (
  <section className="walks-per-year">
    <h3>Walks per Year</h3>
    <BarChart data={buildWalksByYear(dates)} width={400} height={400} />
  </section>
);

class ImpactReport extends React.Component {
  /**
   * Print this whole element
   */
  printReport() {
    const win = window.open();
    window.focus();
    win.document.body.appendChild(React.findDOMNode(this).cloneNode(true));
    win.print();
    win.close();
  }

  render() {
    const {city, leaders, walks, details, dates, startDate} = this.props;
    return (
      <section>
        <h3>In {city.name}, there have been {Object.keys(leaders).length} registered walk leaders, who led {dates.length} walks since {startDate}!</h3>
        <ReturningWalkLeaders walks={walks} dates={dates} year={2015} />
        <WalksPerYear dates={dates} />
        <WalksPerLeader walks={walks} leaders={leaders} dates={dates} />
        <p>
          <a className="print-button" onClick={() => this.printReport()}><i className="fa fa-print" /> Print Report</a>
        </p>
      </section>
    );
  }
}

export default ImpactReport;
