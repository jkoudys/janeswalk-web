import { createElement as ce } from 'react';

// Date formatter
let dtfDate;
let dtfTime;
if (typeof Intl === 'object') {
  dtfDate = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  dtfTime = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}

export default function ListItem({
  walk: {
    features: [{
      properties: { title: meeting, description: meetingDetails } = {},
    }] = [],
    url,
    title,
  },
  slot,
}) {
  let startDate;
  let startTime;

  const start = slot[0] * 1000;
  // TODO: safari?
  if (dtfDate) {
    startDate = dtfDate.format(start);
    startTime = dtfTime.format(start);
  }

  return (
    ce('tr', null,
      ce('td', null, startDate),
      ce('td', null, startTime),
      ce('td', null,
        ce('a', { href: url, target: '_blank' }, title),
      ),
      meeting ? ce('td', null, `${meeting} - ${meetingDetails}`) : null,
    )
  );
}
