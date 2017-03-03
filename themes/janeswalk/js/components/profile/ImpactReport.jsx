import { createElement as ce, Component } from 'react';
import { render } from 'react-dom';
import t from 'es2015-i18n-tag';
import { LineChart, PieChart } from 'react-d3';
import { BarChart } from 'react-d3/barchart';
import { printElement } from 'janeswalk/utils/print';
import HBarChart from './HBarChart.jsx';

const pieData = [
  { label: 'Returning', value: 65.0 },
  { label: 'New', value: 25.0 },
];

// <BarChart data={buildWardWalkData(wardWalkCount)} width={400} height={400} />
const buildWalksByYear = (dates) => ({
  label: '1',
  values: Object.entries(dates.reduce((a, date) => {
    const year = (new Date(date)).getUTCYear();
    return { ...a, [year]: (a[year] || 0) + 1 };
  }, {}))
  .map(([year, count]) => ({ x: `${year} (${count})`, y: count })),
});

function buildWardWalkData(walksPerWard) {
  const values = Object.entries(walksPerWard).map(([k, v]) => ({ y: k, x: v }));

  // Some magic to sort and sort parsed numbers, so 10 comes after 2.
  // FIXME: magic is bad.
  const sorted = values.map(i => [i.y.match(/(\d+)/)[1], i]).sort(([a], [b]) => a - b).map(i => i[1]);

  return [{ label: '1', values: sorted }];
}

const ReturningWalkLeaders = ({ walks, leaders, year }) => (
  ce('section', { className: 'returning-walk-leaders' },
    ce('h3', {}, year),
    ce(PieChart, { data: pieData, width: 400, height: 400, radius: 100, innerRadius: 30 }),
  )
);

const walksPerLeaderData = [
  { label: '1', values: [{ x: 1, y: 60 }, { x: 2, y: 20 }, { x: 3, y: 3 }, { x: 4, y: 5 }] },
];

const WalksPerLeader = ({ walks, leaders, dates }) => (
  ce('section', { className: 'walks-per-leader' },
    ce('h3', {}, t`Walks per Leader`),
    ce(BarChart, { data: walksPerLeaderData, width: 400, height: 400 }),
  )
);

const WalksPerWard = ({ wardWalkCount }) => (
  ce('section', { className: 'walks-per-ward' },
    ce('h3', {}, t`Walks per Region`),
    ce(HBarChart, { data: buildWardWalkData(wardWalkCount), width: '100%' }),
  )
);

const WalksPerYear = ({ dates }) => (
  ce('section', { className: 'walks-per-year' },
    ce('h3', {}, t`Walks per Year`),
    ce(BarChart, { data: buildWalksByYear(dates), width: 400, height: 400 }),
  )
);

const WalkLeaders = ({ leaders, limit, showAll, showSome }) => (
  ce('section', { className: 'walk-leaders' },
    ce('h3', {}, 'Most Active Walk Leaders'),
    ce('table', {},
      ce('thead', {},
        ce('tr', {},
          ce('th', {}, t`Name`),
          ce('th', {}, t`email`),
          ce('th', {}, t`Total Walks`),
        ),
      ),
      ce('tbody', {}, leaders
        .sort(({ walkIds: { a } }, { walkIds: { b } }) => b - a)
        .slice(0, limit)
        .map(({ name, email, walkIds }) => (
          ce('tr', {},
            ce('td', {}, name),
            ce('td', {}, email),
            ce('td', {}, walkIds.length),
          )
        ))
      ),
    ),
    limit ?
      ce('a', { onClick: showAll }, t`Show All`) :
      ce('a', { onClick: showSome }, t`Collapse`),
  )
);

export default class ImpactReport extends Component {
  state = { leadersLimit: 6 };

  /**
   * Print this whole element
   */
  printReport() {
    printElement(this);
  }

  render() {
    const {
      city,
      dates,
      details,
      leaders,
      startDate,
      walks,
      wardWalkCount,
    } = this.props;

    return (
      ce('section', {},
        ce('p', {},
          ce('a', { className: 'print-button', onClick: this.printReport() },
            ce('i', { className: 'fa fa-print' }),
            t` Print Report`,
          ),
        ),
        ce('h3', {}, t`In ${city.name}, there have been ${Object.keys(leaders).length} registered walk leaders, who led ${dates.length} walks since ${startDate}!`),
        ce(WalkLeaders, {
          leaders: Object.keys(leaders).filter(k => k).map(k => leaders[k]),
          limit: this.state.leadersLimit,
          showAll: () => this.setState({ leadersLimit: undefined }),
          showSome: () => this.setState({ leadersLimit: 6 }),
        }),
        ce(ReturningWalkLeaders, { walks, dates, year: 2015 }),
        ce(WalksPerWard, { wardWalkCount }),
        ce(WalksPerYear, { dates }),
      )
    );
  }
}
