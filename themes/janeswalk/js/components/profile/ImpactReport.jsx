import {LineChart, PieChart} from 'react-d3';
import {BarChart} from 'react-d3/barchart';
import HBarChart from './HBarChart.jsx';

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

const WalksPerWard = ({wardWalkCount}) => (
  <section className="walks-per-ward">
    <h3>Walks per Region</h3>
    <HBarChart data={buildWardWalkData(wardWalkCount)} width={'100%'} />
  </section>
);

// <BarChart data={buildWardWalkData(wardWalkCount)} width={400} height={400} />
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
    values: values.map(v => {v.x = v.x + ' (' + v.y + ')'; return v})
  }];
}

function buildWardWalkData(walksPerWard) {
  const values = Object.keys(walksPerWard).map((k, i) => ({y: k, x: walksPerWard[k]}));

  // Some magic to sort and sort parsed numbers, so 10 comes after 2.
  const sorted = values.map(i => [i.y.match(/(\d+)/)[1], i]).sort((a,b) => a[0] - b[0]).map(i => i[1]);

  return [Object.assign({}, {label: '1'}, {values: sorted})];
}

const WalksPerYear = ({dates}) => (
  <section className="walks-per-year">
    <h3>Walks per Year</h3>
    <BarChart data={buildWalksByYear(dates)} width={400} height={400} />
  </section>
);

const WalkLeaders = ({leaders, limit, showAll, showSome}) => (
  <section className="walk-leaders">
    <h3>Most Active Walk Leaders</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>email</th>
          <th>Total Walks</th>
        </tr>
      </thead>
      <tbody>
        {leaders.sort((a, b) => b.walkIds.length - a.walkIds.length).slice(0, limit).map(leader => (
          <tr>
            <td>{leader['name-first'] + ' ' + leader['name-last']}</td>
            <td>{leader['email']}</td>
            <td>{leader.walkIds.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {limit ? <a onClick={showAll}>Show All</a> : <a onClick={showSome}>Collapse</a>}
  </section>
);

class ImpactReport extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {leadersLimit: 6};
  }

  /**
   * Print this whole element
   */
  printReport() {
    const win = window.open();
    const styles = document.querySelectorAll('style[rel=stylesheet]');
    window.focus();
    [].forEach.call(styles, s => win.appendChild(s.cloneNode()));
    win.document.body.appendChild(React.findDOMNode(this).cloneNode(true));
    win.print();
    win.close();
  }

  render() {
    const {city, leaders, walks, details, dates, startDate, wardWalkCount} = this.props;
    return (
      <section>
        <p>
          <a className="print-button" onClick={() => this.printReport()}><i className="fa fa-print" /> Print Report</a>
        </p>
        <h3>In {city.name}, there have been {Object.keys(leaders).length} registered walk leaders, who led {dates.length} walks since {startDate}!</h3>
        <WalkLeaders leaders={Object.keys(leaders).filter(k => k).map(k => leaders[k])} limit={this.state.leadersLimit} showAll={() => this.setState({leadersLimit: undefined})} showSome={() => this.setState({leadersLimit: 6})} />
        <ReturningWalkLeaders walks={walks} dates={dates} year={2015} />
        <WalksPerWard wardWalkCount={wardWalkCount} />
        <WalksPerYear dates={dates} />
      </section>
    );
  }
}

export default ImpactReport;
