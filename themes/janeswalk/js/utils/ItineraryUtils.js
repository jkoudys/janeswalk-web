// Default formatter
let dtfDate;
// Date formatted
if (typeof(Intl) === 'object') {
  dtfDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}

// Cache the parsed dates
const _dateCache = {};

function formatDate(dateInMs) {
  if (dtfDate) {
    return dtfDate.format(dateInMs);
  } else {
    const date = new Date(dateInMs);
    const dateString = date.toUTCString();
    return dateString.slice(0, dateString.indexOf(' GMT'));
  }
}

export function dateFormatted(dateInSeconds) {
  let fromCache = _dateCache[dateInSeconds];
  let fromFormat;
  if (fromCache) {
    return fromCache;
  } else {
    fromFormat = formatDate(dateInSeconds * 1000);
    _dateCache[dateInSeconds] = fromFormat;
    return fromFormat;
  }
}
