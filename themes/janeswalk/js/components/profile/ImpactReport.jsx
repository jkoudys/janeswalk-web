import {LineChart, PieChart} from 'react-d3';
import {BarChart} from 'react-d3/barchart';

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
  {label: '1', values: [60]},
  {label: '2', values: [20]},
  {label: '3', values: [3]},
  {label: '4 or more', values: [5]}
];

const WalksPerLeader = ({walks, leaders, dates}) => (
  <section className="walks-per-leader">
    <h3>Walks per Leader</h3>
    <BarChart data={walksPerLeaderData} width={400} height={400} />
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
        <p>
          <a className="print-button" onClick={() => this.printReport()}><i className="fa fa-print" /> Print Report</a>
        </p>
      </section>
    );
  }
}

export default ImpactReport;
